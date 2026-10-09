import { NextRequest, NextResponse } from 'next/server';
import { deleteAndPushPostFromGit } from '@/lib/studio-git';

// DELETE & POST /api/studio/posts/delete — Hapus artikel dari file/Git repo + auto push.
// Alias eksplisit sesuai spec Phase 2.4 (logika sama dengan DELETE /api/studio/posts).
// Menerima slug via query param (?slug=...) atau JSON body ({ slug }).
async function handleDelete(request: NextRequest) {
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
    console.error('[API Studio Posts Delete] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  return handleDelete(request);
}

export async function POST(request: NextRequest) {
  return handleDelete(request);
}
