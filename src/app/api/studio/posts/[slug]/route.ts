import { NextRequest, NextResponse } from 'next/server';
import { getStudioPostBySlug } from '@/lib/posts';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug?.trim().toLowerCase();
    if (!slug) {
      return NextResponse.json({ error: 'Slug tidak valid' }, { status: 400 });
    }

    const post = getStudioPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    const fm = post.frontmatter;
    const status =
      typeof fm.status === 'string' && fm.status.trim()
        ? fm.status.toLowerCase()
        : fm.published === false
        ? 'draft'
        : 'published';

    return NextResponse.json({
      slug: post.slug,
      status,
      titleId: fm.title_id || post.slug,
      titleEn: fm.title_en || fm.title_id || post.slug,
      subtitleId: fm.subtitle_id || '',
      subtitleEn: fm.subtitle_en || '',
      excerptId: fm.excerpt_id || '',
      excerptEn: fm.excerpt_en || '',
      date: fm.date || '',
      author: fm.author || 'Radya Labs Engineering Team',
      cover: fm.cover || '',
      categoryId: fm.category_id || 'INSIGHT',
      categoryEn: fm.category_en || 'INSIGHT',
      tags: Array.isArray(fm.tags) ? fm.tags : ['Technology'],
      contentId: post.contentId,
      contentEn: post.contentEn,
      directusId: fm.directus_id != null ? String(fm.directus_id) : '',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
