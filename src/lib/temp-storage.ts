import { supabase } from './supabase'

export class TempStorage {
  private static readonly BUCKET_NAME = 'images'
  private static readonly CLEANUP_INTERVAL = 60 * 60 * 1000 // 1 hour

  static async uploadTempImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(fileName)

    // Schedule cleanup
    this.scheduleCleanup(fileName)

    return publicUrl
  }

  static async uploadProcessedImage(imageBuffer: ArrayBuffer, originalFileName: string, suffix: string): Promise<string> {
    const fileExt = originalFileName.split('.').pop()?.split('?')[0] || 'jpg'
    const fileName = `processed-${suffix}-${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(fileName, imageBuffer, {
        contentType: `image/${fileExt}`,
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(fileName)

    // Schedule cleanup
    this.scheduleCleanup(fileName)

    return publicUrl
  }

  private static scheduleCleanup(fileName: string) {
    setTimeout(async () => {
      try {
        await supabase.storage
          .from(this.BUCKET_NAME)
          .remove([fileName])
        console.log(`Cleaned up temporary file: ${fileName}`)
      } catch (error) {
        console.error(`Failed to cleanup file ${fileName}:`, error)
      }
    }, this.CLEANUP_INTERVAL)
  }

  static async cleanupOldFiles() {
    try {
      const { data: files, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .list()

      if (error) throw error

      const now = Date.now()
      const filesToDelete = files
        .filter(file => {
          const fileName = file.name
          if (fileName.startsWith('temp-') || fileName.startsWith('processed-')) {
            // Extract timestamp from filename
            const timestampMatch = fileName.match(/-(\d+)-/)
            if (timestampMatch) {
              const fileTimestamp = parseInt(timestampMatch[1])
              return now - fileTimestamp > this.CLEANUP_INTERVAL
            }
          }
          return false
        })
        .map(file => file.name)

      if (filesToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from(this.BUCKET_NAME)
          .remove(filesToDelete)

        if (deleteError) throw deleteError
        console.log(`Cleaned up ${filesToDelete.length} old temporary files`)
      }
    } catch (error) {
      console.error('Failed to cleanup old files:', error)
    }
  }
}