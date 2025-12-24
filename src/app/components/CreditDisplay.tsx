'use client'

import { useCredits } from '@/contexts/CreditContext'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function CreditDisplay() {
  const { credits, loading } = useCredits()
  const { user } = useAuth()

  if (!user || loading) return null

  return (
    <Link 
      href="/dashboard"
      className="flex items-center gap-2 bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 px-3 py-2 rounded-full transition-all duration-200 border border-violet-200"
    >
      <div className="w-5 h-5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">⚡</span>
      </div>
      <span className="text-sm font-bold text-violet-700">
        {credits} credits
      </span>
    </Link>
  )
}