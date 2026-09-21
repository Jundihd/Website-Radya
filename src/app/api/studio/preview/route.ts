import { NextResponse } from 'next/server';
import { markdownToHtml } from '@/lib/posts';

// Render Markdown -> HTML untuk tab Preview editor. Diproteksi middleware.
export async function POST(req: Request) {
  let markdown = '';
  try {
    const body = await req.json();
    markdown = String(body?.markdown || '');
  } catch {
    return NextResponse.json({ error: 'Body tidak valid.' }, { status: 400 });
  }
  if (markdown.length > 200_000) {
    return NextResponse.json({ error: 'Konten terlalu panjang.' }, { status: 400 });
  }
  const html = await markdownToHtml(markdown);
  return NextResponse.json({ html });
}
