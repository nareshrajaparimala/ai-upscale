/**
 * Fixed Paddle Integration
 * Using correct Paddle Billing API v1 endpoints
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

    // Use Paddle Billing API v1 (correct endpoint)
    const paddleResponse = await fetch('https://api.paddle.com/checkout-sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [{
          price_id: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
          quantity: 1
        }],
        customer_email: user.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        custom_data: {
          user_id: user.id,
          plan_id: planId,
          credits: credits
        }
      })
    })

    const paddleData = await paddleResponse.json()

    if (!paddleResponse.ok) {
      console.error('Paddle API error:', paddleData)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: paddleData.data.checkout_url,
      sessionId: paddleData.data.id
    })
  } catch (error) {
    console.error('Paddle checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}