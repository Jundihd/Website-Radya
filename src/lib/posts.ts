import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { InsightArticle } from '@/types';

/**
 * Git-based Markdown CMS reader (poin 3 — disiapkan, belum di-wire ke halaman).
 *
 * Kontrak file: /content/posts/<slug>.md
 * - Body file     = konten Bahasa Indonesia (Markdown)
 * - Frontmatter   = metadata bilingual + body_en (konten English, Markdown)
 *                   supaya Decap CMS bisa pakai 1 editor body (ID) + 1 field
 *                   markdown (EN) tanpa separator hack.
 * - published: false = draft, tidak ikut listing.
 *
 * Contoh frontmatter:
 * ---
 * slug: "judul-artikel"
 * directus_id: 12
 * title_id: "Judul ID"
 * title_en: "Title EN"
 * excerpt_id: "Ringkasan ID"
 * excerpt_en: "Summary EN"
 * date: "2026-09-16"
 * author: "Nama Penulis"
 * cover: "/images/blog/judul-artikel.jpg"
 * category_id: "AI & INOVASI"
 * category_en: "AI & INNOVATION"
 * tags: ["AI", "LLM"]
 * published: true
 * body_en: |
 *   English markdown content...
 * ---
 * Konten markdown Bahasa Indonesia...
 */

export const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export interface PostFrontmatter {
  slug?: string;
  directus_id?: number | string;
  title_id?: string;
  title_en?: string;
  excerpt_id?: string;
  excerpt_en?: string;
  date?: string;
  author?: string;
  cover?: string;
  category_id?: string;
  category_en?: string;
  tags?: string[];
  published?: boolean;
  body_en?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Markdown Bahasa Indonesia (dari body file) */
  contentId: string;
  /** Markdown Bahasa Inggris (dari frontmatter body_en, fallback = contentId) */
  contentEn: string;
}

function parsePostFile(fileName: string): BlogPost | null {
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const slug = (fm.slug || fileName.replace(/\.md$/, '')).trim();
  if (!slug) return null;
  const contentId = content.trim();
  const contentEn = (fm.body_en || '').trim() || contentId;
  return { slug, frontmatter: fm, contentId, contentEn };
}

/** Baca semua post published, sort tanggal terbaru dulu. Aman dipanggil saat folder belum ada. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const posts = files
    .map((f) => {
      try {
        return parsePostFile(f);
      } catch (err) {
        console.warn(`[posts] Gagal parse ${f}:`, err);
        return null;
      }
    })
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => p.frontmatter.published !== false && p.frontmatter.title_id);
  return posts.sort((a, b) => {
    const ta = Date.parse(a.frontmatter.date || '') || 0;
    const tb = Date.parse(b.frontmatter.date || '') || 0;
    return tb - ta;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Render Markdown -> HTML (dipakai halaman detail saat poin 3 di-wire). */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown || '');
  return result.toString();
}

function estimateReadTime(markdown: string): string {
  const words = (markdown || '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Pool cover fallback (diselaraskan dengan directus.ts) untuk post tanpa cover. */
const POST_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
];

function fallbackCover(slug: string): string {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return POST_FALLBACK_IMAGES[hash % POST_FALLBACK_IMAGES.length];
}

function formatDateId(dateIso?: string): string {
  if (!dateIso) return '';
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return dateIso;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Adapter BlogPost -> InsightArticle agar halaman /insight yang ada
 * bisa langsung konsumsi MD tanpa ubah komponen (dipakai saat cutover poin 3).
 * NOTE: content dikirim sebagai Markdown; halaman detail perlu
 * markdownToHtml() sebelum render (saat ini hanya handle HTML/paragraf).
 */
export function postToInsightArticle(post: BlogPost): InsightArticle {
  const fm = post.frontmatter;
  const categoryId = (fm.category_id || 'INSIGHT').toUpperCase();
  return {
    id: fm.directus_id != null ? String(fm.directus_id) : post.slug,
    slug: post.slug,
    title: { ID: fm.title_id || post.slug, EN: fm.title_en || fm.title_id || post.slug },
    summary: { ID: fm.excerpt_id || '', EN: fm.excerpt_en || fm.excerpt_id || '' },
    content: { ID: post.contentId, EN: post.contentEn },
    category: { ID: categoryId, EN: (fm.category_en || categoryId).toUpperCase() },
    date: formatDateId(fm.date),
    readTime: estimateReadTime(post.contentId),
    image: fm.cover || fallbackCover(post.slug),
    tags: fm.tags && fm.tags.length > 0 ? fm.tags : ['Technology'],
  };
}

/** Gabungan MD-first untuk cutover poin 3 (MD > Directus live > statis). Belum dipakai. */
export function mergeArticlesWithMarkdown(
  markdownArticles: InsightArticle[],
  cmsArticles: InsightArticle[],
  staticArticles: InsightArticle[],
): InsightArticle[] {
  const combined = [...markdownArticles];
  const seen = new Set(combined.map((a) => (a.slug || a.id).toLowerCase()));
  for (const art of [...cmsArticles, ...staticArticles]) {
    const key = (art.slug || art.id).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(art);
    }
  }
  return combined;
}
