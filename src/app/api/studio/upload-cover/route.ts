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

  const dir = path.join(process.cwd(), 'public', 'images', 'blog');
  fs.mkdirSync(dir, { recursive: true });
  const fileName = `${slug}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, fileName), buffer);

  return NextResponse.json({ cover: `/images/blog/${fileName}` });
}
