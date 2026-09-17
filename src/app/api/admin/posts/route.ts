import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { POSTS_DIR, getAllPosts, PostFrontmatter } from '@/lib/posts';

// Helper slugify
function slugify(text: string): string {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

// GET /api/admin/posts - Ambil semua post atau satu post berdasarkan ?slug=
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const filePath = path.join(POSTS_DIR, `${slug}.md`);
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
      }
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      return NextResponse.json({
        slug,
        frontmatter: data,
        contentId: content.trim(),
        contentEn: data.body_en || '',
      });
    }

    const posts = getAllPosts();
    return NextResponse.json({
      count: posts.length,
      posts: posts.map((p) => ({
        slug: p.slug,
        frontmatter: p.frontmatter,
        contentIdPreview: p.contentId.slice(0, 150),
      })),
    });
  } catch (error: any) {
    console.error('[API Admin Posts] GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/posts - Simpan artikel baru atau update artikel yang ada
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title_id,
      title_en,
      slug: customSlug,
      excerpt_id,
      excerpt_en,
      category_id,
      category_en,
      author,
      date,
      cover,
      tags,
      published = true,
      body_id,
      body_en,
      isEdit,
      originalSlug,
    } = body;

    if (!title_id || !title_id.trim()) {
      return NextResponse.json({ error: 'Judul (Bahasa Indonesia) wajib diisi' }, { status: 400 });
    }

    if (!body_id || !body_id.trim()) {
      return NextResponse.json({ error: 'Konten artikel (Bahasa Indonesia) wajib diisi' }, { status: 400 });
    }

    // Tentukan slug
    const finalSlug = slugify(customSlug || title_id);
    if (!finalSlug) {
      return NextResponse.json({ error: 'Slug tidak valid' }, { status: 400 });
    }

    // Pastikan direktori content/posts ada
    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    // Cek duplikasi slug jika bukan mode edit
    const targetFile = path.join(POSTS_DIR, `${finalSlug}.md`);
    if (!isEdit && fs.existsSync(targetFile)) {
      return NextResponse.json(
        { error: `Artikel dengan slug "${finalSlug}" sudah ada. Gunakan slug lain atau edit artikel tersebut.` },
        { status: 409 }
      );
    }

    // Jika edit dan slug berubah, hapus file lama
    if (isEdit && originalSlug && originalSlug !== finalSlug) {
      const oldFile = path.join(POSTS_DIR, `${originalSlug}.md`);
      if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile);
      }
    }

    // Format tags
    let formattedTags: string[] = ['Technology'];
    if (Array.isArray(tags)) {
      formattedTags = tags.filter(Boolean);
    } else if (typeof tags === 'string') {
      formattedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const todayIso = new Date().toISOString().slice(0, 10);
    const postDate = date ? String(date).slice(0, 10) : todayIso;

    // Susun Frontmatter
    const frontmatter: PostFrontmatter = {
      slug: finalSlug,
      title_id: title_id.trim(),
      title_en: (title_en || title_id).trim(),
      excerpt_id: (excerpt_id || '').trim(),
      excerpt_en: (excerpt_en || excerpt_id || '').trim(),
      date: postDate,
      author: (author || 'Radya Labs Engineering Team').trim(),
      cover: (cover || '').trim(),
      category_id: (category_id || 'INSIGHT').toUpperCase().trim(),
      category_en: (category_en || category_id || 'INSIGHT').toUpperCase().trim(),
      tags: formattedTags.length > 0 ? formattedTags : ['Technology'],
      published: Boolean(published),
    };

    if (body_en && body_en.trim()) {
      frontmatter.body_en = body_en.trim();
    }

    // Buat file Markdown dengan frontmatter
    const fileContent = matter.stringify(body_id.trim(), frontmatter);
    fs.writeFileSync(targetFile, fileContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: isEdit ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!',
      slug: finalSlug,
      url: `/insight/${finalSlug}`,
    });
  } catch (error: any) {
    console.error('[API Admin Posts] POST error:', error);
    return NextResponse.json({ error: error.message || 'Gagal menyimpan artikel' }, { status: 500 });
  }
}

// DELETE /api/admin/posts?slug=<slug>
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Parameter slug diperlukan' }, { status: 400 });
    }

    const targetFile = path.join(POSTS_DIR, `${slug}.md`);
    if (!fs.existsSync(targetFile)) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    fs.unlinkSync(targetFile);
    return NextResponse.json({
      success: true,
      message: `Artikel "${slug}" berhasil dihapus.`,
    });
  } catch (error: any) {
    console.error('[API Admin Posts] DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
