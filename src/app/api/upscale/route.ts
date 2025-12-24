import { NextRequest, NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';

fal.config({
  credentials: process.env.FAL_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, scale } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    console.log('Upscaling image with scale:', scale);
    
    // Upscale with FAL.AI
    const result = await fal.subscribe('fal-ai/esrgan', {
      input: {
        image_url: imageUrl,
        scale: parseInt(scale) || 2
      }
    });

    console.log('Upscale result:', result);

    return NextResponse.json({
      upscaledImageUrl: result.image.url
    });

  } catch (error) {
    console.error('Upscale error:', error);
    return NextResponse.json({ error: 'Upscaling failed' }, { status: 500 });
  }
}