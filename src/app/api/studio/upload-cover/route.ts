import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);

// Diproteksi middleware (401 jika belum login).
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Form tidak valid.' }, { status: 400 });
  }

  const file = form.get('file');
  const slugRaw = String(form.get('slug') || '').trim().toLowerCase();
  const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugRaw) ? slugRaw : 'cover';

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'File cover wajib disertakan.' },
      { status: 400 },
    );
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: 'Tipe file harus JPG, PNG, WebP, GIF, atau SVG.' },
      { status: 400 },
    );
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'Ukuran file maksimal 5 MB.' },
      { status: 400 },
    );
  }

  const ext =
    file.type === 'image/jpeg'
      ? 'jpg'
      : file.type === 'image/png'
        ? 'png'
        : file.type === 'image/webp'
          ? 'webp'
          : file.type === 'image/gif'
            ? 'gif'
            : 'svg';

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${slug}.${ext}`;
  let coverUrl = `/images/blog/${fileName}`;

  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'blog');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, fileName), buffer);
  } catch (fsErr: any) {
    if (fsErr.code === 'EROFS' || fsErr.message?.includes('read-only')) {
      console.warn('[Upload Cover] Read-only filesystem terdeteksi (Vercel/Serverless). Menggunakan Data URL base64.');
      coverUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
    } else {
      throw fsErr;
    }
  }

  return NextResponse.json({ cover: coverUrl });
}
