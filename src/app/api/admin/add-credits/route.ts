import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Get all user credits
    const { data: users, error: fetchError } = await supabase
      .from('user_credits')
      .select('user_id, credits')

    if (fetchError) {
      console.error('Error fetching users:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    // Update each user's credits
    const updates = users?.map(user => 
      supabase
        .from('user_credits')
        .update({ credits: user.credits + 200 })
        .eq('user_id', user.user_id)
    ) || []

    await Promise.all(updates)

    return NextResponse.json({ 
      success: true, 
      message: 'Added 200 credits to all accounts',
      updated: users?.length || 0
    })
  } catch (error) {
    console.error('Admin credits error:', error)
    return NextResponse.json({ error: 'Failed to add credits' }, { status: 500 })
  }
}