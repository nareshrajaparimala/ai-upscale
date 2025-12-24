'use client'

import { Suspense } from 'react'
import ImageEditor from '../components/ImageEditor'

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
        </div>
      }>
        <ImageEditor />
      </Suspense>
    </div>
  )
}