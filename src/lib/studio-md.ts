/**
 * Shared builder untuk Studio Blog Editor.
 * Dipakai di client (live preview .md) dan server (validasi + simpan file)
 * sehingga output selalu identik dan kompatibel dengan src/lib/posts.ts.
 */

export type PostStatus = 'published' | 'draft' | 'archived' | 'under_review';

export const POST_STATUSES: { value: PostStatus; label: string }[] = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
  { value: 'under_review', label: 'Under Review' },
];

export interface StudioPostFields {
  slug: string;
  directusId: string;
  status: PostStatus;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  excerptId: string;
  excerptEn: string;
  date: string; // YYYY-MM-DD
  author: string;
  cover: string;
  categoryId: string;
  categoryEn: string;
  tags: string[];
  contentId: string; // Markdown Bahasa Indonesia (body file)
  contentEn: string; // Markdown English (frontmatter body_en)
}

export const DEFAULT_AUTHOR = 'Radya Labs Engineering Team';

export function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function generateDirectusId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 manual.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Quote aman untuk YAML scalar satu baris (kompatibel js-yaml/gray-matter). */
function yamlInline(value: string): string {
  return JSON.stringify(value ?? '');
}

/**
 * Render Markdown EN sebagai YAML literal block (body_en: |)
 * dengan indent 2 spasi, kompatibel dengan file-file lama.
 */
function yamlLiteralBlock(markdown: string): string {
  const lines = (markdown || '').replace(/\r\n/g, '\n').split('\n');
  // Pangkas baris kosong di awal/akhir, jaga baris kosong di tengah.
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
  if (lines.length === 0) return '""';
  return `|\n${lines.map((l) => (l.trim() === '' ? '' : `  ${l}`)).join('\n')}`;
}

export interface PostValidation {
  valid: boolean;
  errors: string[];
}

export function validatePostFields(f: StudioPostFields): PostValidation {
  const errors: string[] = [];
  if (!f.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug)) {
    errors.push('Slug wajib diisi (huruf kecil, angka, strip).');
  }
  if (!f.titleId.trim()) errors.push('Title (Bahasa Indonesia) wajib diisi.');
  if (!f.titleEn.trim()) errors.push('Title (English) wajib diisi.');
  if (!f.excerptId.trim()) errors.push('Short Description (ID) wajib diisi.');
  if (!f.excerptEn.trim()) errors.push('Short Description (EN) wajib diisi.');
  if (!f.contentId.trim()) errors.push('Content (ID) wajib diisi.');
  if (!f.contentEn.trim()) errors.push('Content (EN) wajib diisi.');
  if (!f.categoryId.trim()) errors.push('Category ID wajib diisi.');
  if (!f.date || !/^\d{4}-\d{2}-\d{2}$/.test(f.date)) {
    errors.push('Date Published wajib format YYYY-MM-DD.');
  }
  if (f.cover && !/^(https?:\/\/|\/)/.test(f.cover)) {
    errors.push('Cover harus berupa URL http(s) atau path lokal (/images/...).');
  }
  return { valid: errors.length === 0, errors };
}

/** Bangun isi file content/posts/<slug>.md persis seperti format lama. */
export function buildPostMarkdown(f: StudioPostFields): string {
  const tags = (f.tags || []).map((t) => t.trim()).filter(Boolean);
  const tagsYaml =
    tags.length === 0
      ? '  - Technology'
      : tags.map((t) => `  - ${yamlInline(t)}`).join('\n');

  const frontmatter = [
    '---',
    `slug: ${yamlInline(f.slug)}`,
    `directus_id: ${yamlInline(f.directusId)}`,
    `status: ${f.status}`,
    `title_id: ${yamlInline(f.titleId)}`,
    `title_en: ${yamlInline(f.titleEn)}`,
    `subtitle_id: ${yamlInline(f.subtitleId)}`,
    `subtitle_en: ${yamlInline(f.subtitleEn)}`,
    `excerpt_id: ${yamlInline(f.excerptId)}`,
    `excerpt_en: ${yamlInline(f.excerptEn)}`,
    `date: ${yamlInline(f.date)}`,
    `author: ${yamlInline(f.author.trim() || DEFAULT_AUTHOR)}`,
    `cover: ${yamlInline(f.cover.trim())}`,
    `category_id: ${yamlInline(f.categoryId.toUpperCase())}`,
    `category_en: ${yamlInline((f.categoryEn || f.categoryId).toUpperCase())}`,
    'tags:',
    tagsYaml,
    `body_en: ${yamlLiteralBlock(f.contentEn)}`,
    '---',
  ].join('\n');

  return `${frontmatter}\n${(f.contentId || '').replace(/\r\n/g, '\n').trim()}\n`;
}
