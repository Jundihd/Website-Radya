import { NextResponse } from 'next/server';
import { markdownToHtml } from '@/lib/posts';

// Render Markdown -> HTML untuk tab Preview editor. Diproteksi middleware.
// Selalu mengembalikan JSON (termasuk saat error) agar client tidak
// gagal parse dan bisa menampilkan pesan error yang jelas.
export async function POST(req: Request) {
  let markdown = '';
  try {
    const body = await req.json();
    markdown = String(body?.markdown || '');
  } catch {
    return NextResponse.json({ error: 'Body tidak valid.' }, { status: 400 });
  }
  if (markdown.length > 200_000) {
    return NextResponse.json(
      {
        error:
          'Konten terlalu panjang untuk preview (>200 ribu karakter). Kemungkinan ada gambar tertanam sebagai data-URL base64 — hapus gambar tersebut dan sisipkan ulang sebagai link URL atau file upload biasa.',
      },
      { status: 400 },
    );
  }
  try {
    const html = await markdownToHtml(markdown);
    return NextResponse.json({ html });
  } catch (err: any) {
    console.error('[API Studio Preview] Render error:', err);
    return NextResponse.json(
      { error: `Gagal merender markdown: ${err?.message || 'error tidak dikenal'}` },
      { status: 500 },
    );
  }
}
