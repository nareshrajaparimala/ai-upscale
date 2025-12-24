'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface CreditContextType {
  credits: number
  loading: boolean
  deductCredits: (amount: number) => Promise<boolean>
  addCredits: (amount: number) => Promise<void>
  refreshCredits: () => Promise<void>
}

const CreditContext = createContext<CreditContextType | undefined>(undefined)

export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const refreshCredits = async () => {
    if (!user) {
      setCredits(0)
      setLoading(false)
      return
    }

    try {
      // Get the session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        setCredits(0)
        setLoading(false)
        return
      }

      const response = await fetch('/api/credits', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setCredits(data.credits)
      }
    } catch (error) {
      console.error('Error fetching credits:', error)
    } finally {
      setLoading(false)
    }
  }

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (!user || credits < amount) {
      return false
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) return false

      const response = await fetch('/api/credits/deduct', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ amount })
      })

      if (response.ok) {
        const data = await response.json()
        setCredits(data.credits)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deducting credits:', error)
      return false
    }
  }

  const addCredits = async (amount: number) => {
    if (!user) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) return

      const response = await fetch('/api/credits/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ amount })
      })

      if (response.ok) {
        const data = await response.json()
        setCredits(data.credits)
      }
    } catch (error) {
      console.error('Error adding credits:', error)
    }
  }

  useEffect(() => {
    refreshCredits()
  }, [user])

  return (
    <CreditContext.Provider value={{
      credits,
      loading,
      deductCredits,
      addCredits,
      refreshCredits
    }}>
      {children}
    </CreditContext.Provider>
  )
}

export function useCredits() {
  const context = useContext(CreditContext)
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider')
  }
  return context
}