/**
 * Payment Checkout API Endpoint
 * Creates a Paddle checkout session for credit purchases
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { planId, credits, price } = await request.json()

    if (!planId || !credits || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // For demo purposes, directly add credits and simulate successful payment
    // In production, you would use proper Paddle API integration
    
    // Add credits to user account immediately
    const { data: userCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    if (fetchError) {
      console.error('Error fetching user credits:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 })
    }

    const { error: updateError } = await supabase
      .from('user_credits')
      .update({ credits: userCredits.credits + credits })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
    }

    // Record the transaction
    await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        plan_id: planId,
        credits: credits,
        amount: price,
        paddle_transaction_id: `demo_${Date.now()}`,
        status: 'completed'
      })

    return NextResponse.json({
      success: true,
      checkoutUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      message: `Successfully added ${credits} credits to your account (demo mode)`
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
