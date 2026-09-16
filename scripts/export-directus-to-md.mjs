/**
 * Migrasi sekali jalan (poin 1): Directus collection `blog` -> /content/posts/*.md
 *
 * Cara pakai:
 *   node scripts/export-directus-to-md.mjs
 *   # dengan URL custom:
 *   NEXT_PUBLIC_DIRECTUS_URL=https://admin.radyalabs.com node scripts/export-directus-to-md.mjs
 *
 * - Paginasi otomatis (limit 50) sampai habis.
 * - HTML -> Markdown via turndown, slug asli dipertahankan (SEO/backlink aman).
 * - Thumbnail dicoba diunduh ke public/images/blog/<slug>.<ext>;
 *   kalau gagal, cover tetap URL remote Directus assets.
 * - Aman dijalankan ulang (overwrite file yang sama, tidak duplikat).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const IMAGES_DIR = path.join(ROOT, 'public', 'images', 'blog');

const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.radyalabs.com';

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

function slugifyFile(text) {
  return (
    String(text || '')
      .toLowerCase()
      .normalize('NFKD')
      // eslint-disable-next-line no-misleading-character-class
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120) || 'artikel'
  );
}

function htmlToMarkdown(input) {
  const raw = String(input || '').trim();
  if (!raw) return '';
  if (/<[a-z][\s\S]*>/i.test(raw)) {
    try {
      return turndown.turndown(raw).trim();
    } catch (err) {
      console.warn('  turndown gagal, pakai teks mentah:', err);
      return raw;
    }
  }
  return raw;
}

async function fetchBlogPage(offset, limit = 50) {
  const fields = [
    '*',
    'translations.*',
    'author_id.*',
    'category_id.*',
    'category_id.translations.*',
    'tags.tags_id.*',
    'tags.tags_id.translations.*',
  ].join(',');
  const url = `${DIRECTUS_URL}/items/blog?fields=${encodeURIComponent(fields)}&limit=${limit}&offset=${offset}&sort=date_created`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Directus HTTP ${res.status} offset=${offset}`);
  const json = await res.json();
  return json.data || [];
}

async function tryDownloadCover(thumbnail, slug) {
  if (!thumbnail) return null;
  const remoteUrl = `${DIRECTUS_URL}/assets/${thumbnail}`;
  try {
    const res = await fetch(remoteUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    const ext = contentType.includes('png')
      ? 'png'
      : contentType.includes('webp')
        ? 'webp'
        : 'jpg';
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    const fileName = `${slug}.${ext}`;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(IMAGES_DIR, fileName), buf);
    return `/images/blog/${fileName}`;
  } catch (err) {
    console.warn(`  cover ${thumbnail} gagal diunduh, pakai URL remote:`, String(err).slice(0, 120));
    return remoteUrl;
  }
}

function resolveAuthor(author) {
  if (!author) return 'Radya Labs Engineering Team';
  if (typeof author === 'string') return author;
  return (
    author.name ||
    [author.first_name, author.last_name].filter(Boolean).join(' ') ||
    'Radya Labs Engineering Team'
  );
}

async function main() {
  console.log(`Directus: ${DIRECTUS_URL}`);
  fs.mkdirSync(POSTS_DIR, { recursive: true });

  let offset = 0;
  const all = [];
  for (;;) {
    const page = await fetchBlogPage(offset);
    all.push(...page);
    console.log(`  fetched offset=${offset} count=${page.length} total=${all.length}`);
    if (page.length < 50) break;
    offset += 50;
  }
  console.log(`Total artikel Directus: ${all.length}`);

  let written = 0;
  for (const art of all) {
    const transId =
      art.translations?.find((t) => t.languages_code === 'id') || art.translations?.[0] || {};
    const transEn =
      art.translations?.find((t) => t.languages_code === 'en') || transId;

    const slug = slugifyFile(transId.slug || art.slug || art.id);
    const catTransId =
      art.category_id?.translations?.find((t) => t.languages_code === 'id') ||
      art.category_id?.translations?.[0] ||
      {};
    const catTransEn =
      art.category_id?.translations?.find((t) => t.languages_code === 'en') || catTransId;

    const tagNames = (art.tags || [])
      .map((t) => {
        const tr =
          t.tags_id?.translations?.find((tr2) => tr2.languages_code === 'id') ||
          t.tags_id?.translations?.[0];
        return tr?.name || t.tags_id?.name || '';
      })
      .filter(Boolean);

    const bodyId = htmlToMarkdown(transId.content);
    const bodyEnRaw = htmlToMarkdown(transEn.content);
    const cover = await tryDownloadCover(art.thumbnail, slug);
    const dateIso = (art.date_created || art.date_updated || '').slice(0, 10);

    const frontmatter = {
      slug,
      directus_id: art.id,
      title_id: transId.title || `Artikel ${art.id}`,
      title_en: transEn.title || transId.title || `Article ${art.id}`,
      excerpt_id: transId.meta_description || transId.excerpt || '',
      excerpt_en: transEn.meta_description || transEn.excerpt || transId.meta_description || '',
      date: dateIso,
      author: resolveAuthor(art.author_id),
      cover: cover || '',
      category_id: (catTransId.name || 'INSIGHT').toUpperCase(),
      category_en: (catTransEn.name || catTransId.name || 'INSIGHT').toUpperCase(),
      tags: tagNames.length > 0 ? tagNames : ['Technology'],
      published: art.status ? art.status === 'published' : true,
    };
    if (bodyEnRaw && bodyEnRaw !== bodyId) frontmatter.body_en = bodyEnRaw;

    const fileContent = matter.stringify(bodyId || '_Konten dalam proses migrasi._', frontmatter);
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fileContent);
    written += 1;
    console.log(`  [${written}/${all.length}] ${slug}.md`);
  }

  console.log(`\nSelesai: ${written} file MD di content/posts/`);
}

main().catch((err) => {
  console.error('Migrasi gagal:', err);
  process.exitCode = 1;
});
