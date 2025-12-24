'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useCredits } from '@/contexts/CreditContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface UserStats {
  totalUpscales: number
  totalCreditsUsed: number
  joinedDate: string
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const { credits, loading: creditsLoading, refreshCredits } = useCredits()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats>({
    totalUpscales: 0,
    totalCreditsUsed: 0,
    joinedDate: ''
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      // Mock stats for now - in real app, fetch from API
      setStats({
        totalUpscales: Math.floor(Math.random() * 50) + 10,
        totalCreditsUsed: 200 - credits,
        joinedDate: new Date(user.created_at || Date.now()).toLocaleDateString()
      })
    }
  }, [user, credits])

  if (authLoading || creditsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.email}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Credits */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <Link 
                href="/pricing"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
              >
                Buy More
              </Link>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{credits}</h3>
            <p className="text-gray-600">Available Credits</p>
          </div>

          {/* Total Upscales */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUpscales}</h3>
            <p className="text-gray-600">Images Upscaled</p>
          </div>

          {/* Credits Used */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalCreditsUsed}</h3>
            <p className="text-gray-600">Credits Used</p>
          </div>

          {/* Member Since */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-xl">📅</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{stats.joinedDate}</h3>
            <p className="text-gray-600">Member Since</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Upload */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🖼️</span>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link
                href="/"
                className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-4 rounded-lg font-bold text-center hover:shadow-lg transition-all transform hover:scale-105"
              >
                ✨ Upload & Upscale New Image
              </Link>
              <Link
                href="/pricing"
                className="block w-full border-2 border-violet-600 text-violet-600 px-6 py-4 rounded-lg font-bold text-center hover:bg-violet-50 transition-all"
              >
                💳 Buy More Credits
              </Link>
            </div>
          </div>

          {/* Credit Packages */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Credit Packages
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Starter Pack</p>
                  <p className="text-sm text-gray-600">100 credits</p>
                </div>
                <span className="font-bold text-violet-600">$9.99</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Pro Pack</p>
                  <p className="text-sm text-gray-600">500 credits</p>
                </div>
                <span className="font-bold text-violet-600">$39.99</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
                <div>
                  <p className="font-medium text-violet-900">Ultimate Pack</p>
                  <p className="text-sm text-violet-700">1000 credits + 20% bonus</p>
                </div>
                <span className="font-bold text-violet-600">$69.99</span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Pro Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">🎯</span>
              <div>
                <p className="font-medium text-blue-900">Optimize Your Credits</p>
                <p className="text-sm text-blue-700">Each upscale costs 10 credits. Choose your images wisely!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">📏</span>
              <div>
                <p className="font-medium text-blue-900">Best Results</p>
                <p className="text-sm text-blue-700">Higher resolution images produce better upscaling results.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">⚡</span>
              <div>
                <p className="font-medium text-blue-900">Bulk Processing</p>
                <p className="text-sm text-blue-700">Consider buying credits in bulk for better value.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-lg">🔄</span>
              <div>
                <p className="font-medium text-blue-900">No Expiry</p>
                <p className="text-sm text-blue-700">Your credits never expire - use them at your own pace.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}