import { NextRequest, NextResponse } from 'next/server';
import { getAllStudioPosts } from '@/lib/posts';
import { deleteAndPushPostFromGit } from '@/lib/studio-git';

// GET /api/studio/posts - Ambil semua artikel untuk direktori admin (semua status)
export async function GET() {
  try {
    const posts = getAllStudioPosts();

    const data = posts.map((p) => {
      const fm = p.frontmatter;
      const status =
        typeof fm.status === 'string' && fm.status.trim()
          ? fm.status.toLowerCase()
          : fm.published === false
          ? 'draft'
          : 'published';

      return {
        slug: p.slug,
        status,
        titleId: fm.title_id || p.slug,
        titleEn: fm.title_en || fm.title_id || p.slug,
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
        contentId: p.contentId,
        contentEn: p.contentEn,
        directusId: fm.directus_id != null ? String(fm.directus_id) : '',
      };
    });

    return NextResponse.json({
      count: data.length,
      posts: data,
    });
  } catch (error: any) {
    console.error('[API Studio Posts] GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/studio/posts - Hapus artikel dan auto push ke Git
export async function DELETE(request: NextRequest) {
  try {
    let slug = request.nextUrl.searchParams.get('slug');
    if (!slug) {
      try {
        const body = await request.json();
        slug = body?.slug;
      } catch {
        // no body
      }
    }

    if (!slug || !slug.trim()) {
      return NextResponse.json(
        { error: 'Parameter slug diperlukan untuk menghapus.' },
        { status: 400 },
      );
    }

    const cleanSlug = slug.trim().toLowerCase();
    const gitResult = await deleteAndPushPostFromGit(cleanSlug);

    return NextResponse.json({
      ok: true,
      slug: cleanSlug,
      message: `Artikel "${cleanSlug}" berhasil dihapus.`,
      git: gitResult,
    });
  } catch (error: any) {
    console.error('[API Studio Posts] DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
