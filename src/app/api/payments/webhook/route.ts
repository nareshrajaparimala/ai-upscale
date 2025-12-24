/**
 * Paddle Webhook Handler
 * Processes payment notifications and adds credits to user accounts
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function verifyPaddleWebhook(body: string, signature: string): boolean {
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET!
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('paddle-signature') || ''
    
    // Verify webhook signature
    if (!verifyPaddleWebhook(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(body)
    
    // Handle successful payment (Paddle v2 format)
    if (data.event_type === 'transaction.completed') {
      const customData = data.data.custom_data
      const { user_id: userId, credits, plan_id: planId } = customData
      
      if (!userId || !credits) {
        return NextResponse.json({ error: 'Invalid custom data' }, { status: 400 })
      }

      // Add credits to user account
      const { data: userCredits, error: fetchError } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', userId)
        .single()

      if (fetchError) {
        console.error('Error fetching user credits:', fetchError)
        return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 })
      }

      const { error: updateError } = await supabase
        .from('user_credits')
        .update({ credits: userCredits.credits + parseInt(credits) })
        .eq('user_id', userId)

      if (updateError) {
        console.error('Error updating credits:', updateError)
        return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
      }

      // Record the transaction
      await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          plan_id: planId,
          credits: parseInt(credits),
          amount: parseFloat(data.data.details.totals.total),
          paddle_transaction_id: data.data.id,
          status: 'completed'
        })

      // Update pending transaction status
      await supabase
        .from('pending_transactions')
        .update({ status: 'completed' })
        .eq('user_id', userId)
        .eq('plan_id', planId)
        .eq('status', 'pending')

      console.log(`Successfully added ${credits} credits to user ${userId}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}