import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { POSTS_DIR } from '@/lib/posts';
import {
  buildPostMarkdown,
  validatePostFields,
  type StudioPostFields,
} from '@/lib/studio-md';
import {
  saveAndPushPostToGit,
  deleteAndPushPostFromGit,
} from '@/lib/studio-git';

// Diproteksi middleware (401 jika belum login).
// Body: { fields: StudioPostFields, overwrite?: boolean, isEdit?: boolean, originalSlug?: string }
export async function POST(req: Request) {
  let payload: {
    fields?: StudioPostFields;
    overwrite?: boolean;
    isEdit?: boolean;
    originalSlug?: string;
  };

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

  try {
    const filePath = path.join(POSTS_DIR, `${normalized.slug}.md`);
    const isEdit = Boolean(payload.isEdit);
    const originalSlug = payload.originalSlug?.trim().toLowerCase();

    // Cek duplikasi slug jika bukan edit atau jika slug berubah ke file lain yang sudah ada
    if (!payload.overwrite && (!isEdit || (originalSlug && originalSlug !== normalized.slug))) {
      if (fs.existsSync(filePath)) {
        return NextResponse.json(
          {
            error: `File ${normalized.slug}.md sudah ada. Gunakan slug lain atau konfirmasi untuk menimpa.`,
            exists: true,
          },
          { status: 409 },
        );
      }
    }

    // Jika mode edit dan slug diubah, hapus file lama dan push penghapusan
    if (isEdit && originalSlug && originalSlug !== normalized.slug) {
      await deleteAndPushPostFromGit(originalSlug);
    }

    const markdown = buildPostMarkdown(normalized);
    const gitResult = await saveAndPushPostToGit(
      normalized.slug,
      markdown,
      isEdit ? 'update' : 'create',
    );

    return NextResponse.json({
      ok: true,
      slug: normalized.slug,
      file: `content/posts/${normalized.slug}.md`,
      status: normalized.status,
      git: gitResult,
    });
  } catch (err: any) {
    console.error('[API Studio Save Post] Error:', err);
    return NextResponse.json(
      {
        error: err.message || 'Gagal menyimpan artikel.',
      },
      { status: 500 },
    );
  }
}
