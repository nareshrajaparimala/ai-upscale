import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
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

    // Get or create user credits record
    let { data: userCredits, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    if (error && error.code === 'PGRST116') {
      // User doesn't exist, create with 200 initial credits
      const { data: newUserCredits, error: insertError } = await supabase
        .from('user_credits')
        .insert([{ user_id: user.id, credits: 200 }])
        .select('credits')
        .single()

      if (insertError) {
        return NextResponse.json({ error: 'Failed to create user credits' }, { status: 500 })
      }

      userCredits = newUserCredits
    } else if (error) {
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
    }

    return NextResponse.json({ credits: userCredits.credits })
  } catch (error) {
    console.error('Credits API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}