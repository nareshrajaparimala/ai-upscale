'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useCredits } from '@/contexts/CreditContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PricingPlan {
  id: string
  name: string
  credits: number
  price: number
  popular?: boolean
  bonus?: number
  features: string[]
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 100,
    price: 9.99,
    features: [
      '100 AI upscaling credits',
      'Up to 4x upscaling',
      'Multiple format support',
      'Basic support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 500,
    price: 39.99,
    popular: true,
    bonus: 50,
    features: [
      '500 AI upscaling credits',
      '50 bonus credits (550 total)',
      'Up to 4x upscaling',
      'Multiple format support',
      'Priority support',
      'Bulk processing'
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pack',
    credits: 1000,
    price: 69.99,
    bonus: 200,
    features: [
      '1000 AI upscaling credits',
      '200 bonus credits (1200 total)',
      'Up to 4x upscaling',
      'Multiple format support',
      'Premium support',
      'Bulk processing',
      'API access',
      'Custom integrations'
    ]
  }
]

export default function Pricing() {
  const { user } = useAuth()
  const { credits, refreshCredits } = useCredits()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (plan: PricingPlan) => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    setLoading(plan.id)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        router.push('/auth/signin')
        return
      }

      // Initialize Paddle checkout
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          planId: plan.id,
          credits: plan.credits + (plan.bonus || 0),
          price: plan.price
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Credits added successfully in demo mode
        await refreshCredits()
        alert(`Success! ${plan.credits + (plan.bonus || 0)} credits have been added to your account.`)
        router.push('/dashboard')
      } else {
        alert('Failed to process payment. Please try again.')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Credit Package
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get more credits to unlock the full power of AI image upscaling. 
            Each upscale costs 10 credits.
          </p>
          {user && (
            <div className="mt-6 inline-flex items-center gap-2 bg-violet-100 px-4 py-2 rounded-full">
              <span className="text-violet-600 font-medium">
                Current balance: {credits} credits
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular 
                  ? 'border-violet-500 transform scale-105' 
                  : 'border-gray-200 hover:border-violet-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    🔥 Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-violet-600">
                      {plan.credits} credits
                    </span>
                    {plan.bonus && (
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        +{plan.bonus} bonus
                      </span>
                    )}
                  </div>
                  {plan.bonus && (
                    <p className="text-sm text-gray-600 mt-2">
                      Total: {plan.credits + plan.bonus} credits
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={loading === plan.id}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:transform-none ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </div>
                  ) : (
                    `💳 Buy ${plan.name}`
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">How do credits work?</h3>
              <p className="text-gray-600">
                Each AI upscaling operation costs 10 credits. Credits never expire and can be used at your own pace.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and other payment methods through our secure payment processor.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I get a refund?</h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do credits expire?</h3>
              <p className="text-gray-600">
                No, your credits never expire. You can use them whenever you need to upscale images.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">💳</span>
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">🔄</span>
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}