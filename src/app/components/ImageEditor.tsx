'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCredits } from '@/contexts/CreditContext'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export default function ImageEditor() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { credits, deductCredits } = useCredits()
  const { user } = useAuth()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  
  const [imageUrl, setImageUrl] = useState<string>('')
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [upscaleFactor, setUpscaleFactor] = useState<2 | 4>(2)
  const [isUpscaling, setIsUpscaling] = useState(false)
  const [upscaledImageUrl, setUpscaledImageUrl] = useState<string>('')
  const [downloadFormat, setDownloadFormat] = useState<'jpeg' | 'png' | 'webp' | 'pdf'>('jpeg')
  const [freeUsageCount, setFreeUsageCount] = useState(0)

  useEffect(() => {
    if (user) {
      const freeUsageKey = `free_upscales_${user.id}`
      const count = parseInt(localStorage.getItem(freeUsageKey) || '0')
      setFreeUsageCount(count)
    }
  }, [user])

  useEffect(() => {
    // Check for image from localStorage first
    const storedImage = localStorage.getItem('uploadedImage')
    if (storedImage) {
      setImageUrl(storedImage)
      loadImage(storedImage)
      return
    }
    
    // Fallback to URL params
    const url = searchParams.get('image')
    if (url) {
      setImageUrl(decodeURIComponent(url))
      loadImage(decodeURIComponent(url))
    }
  }, [searchParams])

  const loadImage = (url: string) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setOriginalImage(img)
      setCropArea({ x: 0, y: 0, width: img.width, height: img.height })
      drawImage(img)
    }
    img.src = url
  }

  const drawImage = (img: HTMLImageElement, crop?: CropArea) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const containerWidth = 600
    const containerHeight = 400
    const scale = Math.min(containerWidth / img.width, containerHeight / img.height)
    
    canvas.width = img.width * scale
    canvas.height = img.height * scale

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    if (crop && crop.width > 0 && crop.height > 0) {
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.strokeRect(
        crop.x * scale,
        crop.y * scale,
        crop.width * scale,
        crop.height * scale
      )
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !originalImage) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = originalImage.width / canvas.width
    const scaleY = originalImage.height / canvas.height
    
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setIsDragging(true)
    setDragStart({ x, y })
    setCropArea({ x, y, width: 0, height: 0 })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !originalImage) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = originalImage.width / canvas.width
    const scaleY = originalImage.height / canvas.height
    
    const currentX = (e.clientX - rect.left) * scaleX
    const currentY = (e.clientY - rect.top) * scaleY

    const newCrop = {
      x: Math.min(dragStart.x, currentX),
      y: Math.min(dragStart.y, currentY),
      width: Math.abs(currentX - dragStart.x),
      height: Math.abs(currentY - dragStart.y)
    }

    setCropArea(newCrop)
    drawImage(originalImage, newCrop)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const applyCrop = () => {
    if (!originalImage || cropArea.width === 0 || cropArea.height === 0) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = cropArea.width
    canvas.height = cropArea.height

    ctx.drawImage(
      originalImage,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      0, 0, cropArea.width, cropArea.height
    )

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
        loadImage(url)
      }
    })
  }

  const resetCrop = () => {
    if (originalImage) {
      setCropArea({ x: 0, y: 0, width: originalImage.width, height: originalImage.height })
      drawImage(originalImage)
    }
  }

  const handleUpscale = async () => {
    if (!imageUrl) {
      alert('Please upload an image first')
      return
    }

    // Allow upscaling without signup - no credit system for anonymous users
    setIsUpscaling(true)
    try {
      const response = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl,
          scale: upscaleFactor
        })
      })

      const data = await response.json()
      if (data.upscaledImageUrl) {
        setUpscaledImageUrl(data.upscaledImageUrl)
      }
    } catch (error) {
      console.error('Upscaling error:', error)
    } finally {
      setIsUpscaling(false)
    }
  }

  const downloadImage = async () => {
    const imageToDownload = upscaledImageUrl || imageUrl
    if (!imageToDownload) return

    if (downloadFormat === 'pdf') {
      // For PDF, we'll create a simple PDF with the image
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF()
      
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (img.height * pdfWidth) / img.width

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`upscaled-image-${upscaleFactor}x.pdf`)
      }
      img.src = imageToDownload
    } else {
      // For other formats, convert and download
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const mimeType = `image/${downloadFormat}`
        const quality = downloadFormat === 'jpeg' ? 0.95 : undefined

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `upscaled-image-${upscaleFactor}x.${downloadFormat}`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }
        }, mimeType, quality)
      }
      img.src = imageToDownload
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Upload
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Tools */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 bg-violet-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              Crop Tool
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Click and drag on the image to select crop area
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={applyCrop}
                  disabled={cropArea.width === 0}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-3 rounded-lg text-sm font-bold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                  Apply Crop
                </button>
                <button
                  onClick={resetCrop}
                  className="flex-1 border-2 border-gray-300 text-gray-800 px-4 py-3 rounded-lg text-sm font-bold hover:bg-gray-100 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Upscale Options
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setUpscaleFactor(2)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                    upscaleFactor === 2
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'border-2 border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  2x
                </button>
                <button
                  onClick={() => setUpscaleFactor(4)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                    upscaleFactor === 4
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'border-2 border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  4x
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Free AI upscaling - no signup required!
                </p>
              </div>
              <button
                onClick={handleUpscale}
                disabled={isUpscaling || !imageUrl}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isUpscaling ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Free Upscale {upscaleFactor}x
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              Download
            </h3>
            <div className="space-y-4">
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value as any)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
                <option value="pdf">PDF</option>
              </select>
              <button
                onClick={downloadImage}
                disabled={!imageUrl}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download {downloadFormat.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Image Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Image Editor
              </h2>
              <p className="text-gray-600 text-lg mt-2">✨ Crop, upscale, and download your image with AI precision</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 mb-6">
              {imageUrl ? (
                <div className="flex justify-center">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="max-w-full h-auto border border-gray-200 rounded-lg cursor-crosshair"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No image loaded</p>
                </div>
              )}
            </div>

            {upscaledImageUrl && (
              <div className="border-2 border-green-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Upscaled Result ({upscaleFactor}x)</h3>
                <div className="flex justify-center">
                  <img
                    src={upscaledImageUrl}
                    alt="Upscaled"
                    className="max-w-full h-auto border border-gray-200 rounded-lg"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}