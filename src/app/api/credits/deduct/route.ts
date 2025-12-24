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

    const { amount } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Get current credits
    const { data: userCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
    }

    if (userCredits.credits < amount) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 })
    }

    // Deduct credits
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .update({ credits: userCredits.credits - amount })
      .eq('user_id', user.id)
      .select('credits')
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to deduct credits' }, { status: 500 })
    }

    return NextResponse.json({ credits: updatedCredits.credits })
  } catch (error) {
    console.error('Deduct credits API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}