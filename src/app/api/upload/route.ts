import { NextRequest, NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';

fal.config({
  credentials: process.env.FAL_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const scale = formData.get('scale') || '2';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Upscale with FAL.AI using base64 data
    const result = await fal.subscribe('fal-ai/esrgan', {
      input: {
        image_url: dataUrl,
        scale: parseInt(scale as string)
      }
    }) as { image: { url: string } };

    return NextResponse.json({
      originalUrl: dataUrl,
      upscaledUrl: result.image.url
    });

  } catch (error) {
    console.error('Upload/upscale error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}