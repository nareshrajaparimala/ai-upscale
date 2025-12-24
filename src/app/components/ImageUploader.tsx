'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'

interface UploadedImage {
  original: string
  upscaled?: string
}

export default function ImageUploader() {
  const router = useRouter()
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // Store in localStorage and redirect to editor
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      localStorage.setItem('uploadedImage', dataUrl)
      setUploadProgress(100)
      setTimeout(() => {
        router.push('/editor')
      }, 500)
    }
    reader.readAsDataURL(file)
  }, [router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.bmp', '.tiff']
    },
    multiple: false
  })

  return (
    <div className="w-full space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors h-78 ${
          isDragActive 
            ? 'border-violet-500 bg-violet-50' 
            : 'border-gray-300 hover:border-violet-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="h-full flex flex-col justify-center items-center space-y-4">
          <div className="w-16 h-15 mx-auto bg-violet-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {isDragActive ? 'Drop your image here' : 'Upload Your Image'}
            </p>
            <p className="text-gray-600 mt-2">
              Drag and drop or click to select • JPEG, PNG, WebP supported
            </p>
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 text-violet-600 mb-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-violet-600 border-t-transparent"></div>
              <span className="font-medium">Processing your image...</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          
          <div className="text-center text-sm text-gray-600">
            {uploadProgress < 30 && 'Uploading image...'}
            {uploadProgress >= 30 && uploadProgress < 70 && 'Analyzing image quality...'}
            {uploadProgress >= 70 && uploadProgress < 100 && 'Preparing editor...'}
            {uploadProgress === 100 && 'Complete! Redirecting...'}
          </div>
        </div>
      )}
    </div>
  )
}