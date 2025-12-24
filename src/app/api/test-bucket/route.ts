import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test bucket access
    const { data, error } = await supabase.storage
      .from('images')
      .list('', { limit: 1 })

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase bucket is accessible',
      files: data?.length || 0
    })

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Connection failed',
      details: error 
    }, { status: 500 })
  }
}