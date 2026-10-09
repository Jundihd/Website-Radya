import { NextRequest, NextResponse } from 'next/server';
import { getStudioPostBySlug } from '@/lib/posts';
import { buildPostMarkdown, type StudioPostFields, type PostStatus } from '@/lib/studio-md';
import { saveAndPushPostToGit } from '@/lib/studio-git';

// PATCH /api/studio/posts/status - Mengubah status artikel dan auto-push ke Git
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, status } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Slug artikel diperlukan.' }, { status: 400 });
    }

    const validStatuses: PostStatus[] = ['published', 'draft', 'archived', 'under_review'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status tidak valid. Pilihan: published, draft, archived, under_review.' },
        { status: 400 },
      );
    }

    const post = getStudioPostBySlug(slug.trim().toLowerCase());
    if (!post) {
      return NextResponse.json({ error: `Artikel "${slug}" tidak ditemukan.` }, { status: 404 });
    }

    const fm = post.frontmatter;
    const fields: StudioPostFields = {
      slug: post.slug,
      directusId: fm.directus_id != null ? String(fm.directus_id) : '',
      status: status as PostStatus,
      titleId: fm.title_id || post.slug,
      titleEn: fm.title_en || fm.title_id || post.slug,
      subtitleId: fm.subtitle_id || '',
      subtitleEn: fm.subtitle_en || '',
      excerptId: fm.excerpt_id || '',
      excerptEn: fm.excerpt_en || '',
      date: fm.date || new Date().toISOString().slice(0, 10),
      author: fm.author || 'Radya Labs Engineering Team',
      cover: fm.cover || '',
      categoryId: fm.category_id || 'INSIGHT',
      categoryEn: fm.category_en || fm.category_id || 'INSIGHT',
      tags: Array.isArray(fm.tags) ? fm.tags : ['Technology'],
      contentId: post.contentId,
      contentEn: post.contentEn,
    };

    const markdown = buildPostMarkdown(fields);
    const gitResult = await saveAndPushPostToGit(post.slug, markdown, 'status_change');

    return NextResponse.json({
      ok: true,
      slug: post.slug,
      status,
      message: `Status artikel "${post.slug}" berhasil diubah menjadi ${status}.`,
      git: gitResult,
    });
  } catch (error: any) {
    console.error('[API Studio Post Status] PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
