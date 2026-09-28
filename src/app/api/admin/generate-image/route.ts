import { NextResponse } from 'next/server';
import {
  generateBlogImage,
  AVAILABLE_IMAGE_MODELS,
  DEFAULT_IMAGE_MODEL,
} from '@/lib/studio-image';

export async function GET() {
  return NextResponse.json({
    models: AVAILABLE_IMAGE_MODELS,
    defaultModel: DEFAULT_IMAGE_MODEL,
  });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Body tidak valid.' }, { status: 400 });
  }

  const prompt = String(body.prompt || '').trim();
  const requestedModel = String(body.model || body.requestedModel || '').trim() || DEFAULT_IMAGE_MODEL;
  const slug = String(body.slug || '').trim();

  if (!prompt) {
    return NextResponse.json(
      { error: 'Prompt gambar wajib diisi.' },
      { status: 400 },
    );
  }

  try {
    const result = await generateBlogImage({
      prompt,
      requestedModel,
      slug,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[API Admin Generate Image] Error:', err);
    return NextResponse.json(
      {
        error: err.message || 'Gagal generate gambar.',
      },
      { status: 500 },
    );
  }
}
