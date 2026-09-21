import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { POSTS_DIR } from '@/lib/posts';
import {
  buildPostMarkdown,
  validatePostFields,
  type StudioPostFields,
} from '@/lib/studio-md';

// Diproteksi middleware (401 jika belum login).
// Body: { fields: StudioPostFields, overwrite?: boolean }
// Server membangun ulang .md dari fields (sumber kebenaran tunggal).
export async function POST(req: Request) {
  let payload: { fields?: StudioPostFields; overwrite?: boolean };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body tidak valid.' }, { status: 400 });
  }

  const fields = payload?.fields;
  if (!fields || typeof fields !== 'object') {
    return NextResponse.json(
      { error: 'Fields tidak lengkap.' },
      { status: 400 },
    );
  }

  const normalized: StudioPostFields = {
    slug: String(fields.slug || '').trim().toLowerCase(),
    directusId: String(fields.directusId || '').trim(),
    status: fields.status,
    titleId: String(fields.titleId || ''),
    titleEn: String(fields.titleEn || ''),
    subtitleId: String(fields.subtitleId || ''),
    subtitleEn: String(fields.subtitleEn || ''),
    excerptId: String(fields.excerptId || ''),
    excerptEn: String(fields.excerptEn || ''),
    date: String(fields.date || ''),
    author: String(fields.author || ''),
    cover: String(fields.cover || ''),
    categoryId: String(fields.categoryId || ''),
    categoryEn: String(fields.categoryEn || ''),
    tags: Array.isArray(fields.tags)
      ? fields.tags.map((t) => String(t))
      : [],
    contentId: String(fields.contentId || ''),
    contentEn: String(fields.contentEn || ''),
  };

  if (!['published', 'draft', 'archived', 'under_review'].includes(normalized.status)) {
    return NextResponse.json({ error: 'Status tidak valid.' }, { status: 400 });
  }

  const validation = validatePostFields(normalized);
  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.errors.join(' ') },
      { status: 400 },
    );
  }

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  const filePath = path.join(POSTS_DIR, `${normalized.slug}.md`);
  if (fs.existsSync(filePath) && !payload.overwrite) {
    return NextResponse.json(
      {
        error: `File ${normalized.slug}.md sudah ada. Ganti slug atau izinkan timpa.`,
        exists: true,
      },
      { status: 409 },
    );
  }

  const markdown = buildPostMarkdown(normalized);
  fs.writeFileSync(filePath, markdown, 'utf8');

  return NextResponse.json({
    ok: true,
    slug: normalized.slug,
    file: `content/posts/${normalized.slug}.md`,
    status: normalized.status,
  });
}
