'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Plus,
  ArrowLeft,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  Tag,
  FolderGit2,
  RefreshCw,
  Search,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Link as LinkIcon,
  Code,
  Quote,
  Sparkles,
  Save,
  Check,
  Wand2,
  X,
} from 'lucide-react';
import { AiImageGenerator } from '@/components/studio/AiImageGenerator';

interface BlogPostSummary {
  slug: string;
  frontmatter: {
    title_id?: string;
    title_en?: string;
    date?: string;
    category_id?: string;
    author?: string;
    published?: boolean;
    cover?: string;
    tags?: string[];
  };
  contentIdPreview?: string;
}

const DEFAULT_CATEGORIES = [
  'AI & INOVASI',
  'CLOUD NATIVE',
  'DEVOPS & INFRA',
  'SOFTWARE ENGINEERING',
  'ENTERPRISE ARCHITECTURE',
  'MOBILE & WEB',
  'CYBERSECURITY',
  'INSIGHT',
];

const PRESET_COVERS = [
  { label: 'Cloud / AI', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80' },
  { label: 'Microchip / Hardware', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80' },
  { label: 'Software / Code', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80' },
  { label: 'Data Center / Security', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80' },
  { label: 'Team Collaboration', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80' },
];

function slugify(text: string): string {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export default function AdminBlogCmsPage() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');

  // Form State
  const [isEdit, setIsEdit] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');
  const [titleId, setTitleId] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [categoryId, setCategoryId] = useState('INSIGHT');
  const [categoryEn, setCategoryEn] = useState('INSIGHT');
  const [author, setAuthor] = useState('Radya Labs Engineering Team');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [cover, setCover] = useState('');
  const [excerptId, setExcerptId] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [tagsInput, setTagsInput] = useState('Technology');
  const [published, setPublished] = useState(true);
  const [bodyId, setBodyId] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

  // Status & Feedback State
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; url?: string } | null>(null);

  // AI Integration State
  const [coverMode, setCoverMode] = useState<'ai' | 'preset'>('ai');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiBrief, setAiBrief] = useState('');
  const [aiGenerateCover, setAiGenerateCover] = useState(true);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiStatusStep, setAiStatusStep] = useState('');
  const [aiError, setAiError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Error fetching admin posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewArticle = () => {
    setIsEdit(false);
    setOriginalSlug('');
    setTitleId('');
    setTitleEn('');
    setSlug('');
    setIsSlugManual(false);
    setCategoryId('INSIGHT');
    setCategoryEn('INSIGHT');
    setAuthor('Radya Labs Engineering Team');
    setDate(new Date().toISOString().slice(0, 10));
    setCover(PRESET_COVERS[0].url);
    setExcerptId('');
    setExcerptEn('');
    setTagsInput('Technology, Enterprise');
    setPublished(true);
    setBodyId(`## Pendahuluan\n\nTulis isi artikel di sini...\n\n### Poin Utama\n\n* Keuntungan pertama\n* Keuntungan kedua\n\n### Kesimpulan\n\nRingkasan penutup artikel.`);
    setBodyEn('');
    setFeedback(null);
    setViewMode('editor');
  };

  const handleEditArticle = async (targetSlug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts?slug=${targetSlug}`);
      if (res.ok) {
        const data = await res.json();
        const fm = data.frontmatter || {};
        setIsEdit(true);
        setOriginalSlug(targetSlug);
        setTitleId(fm.title_id || '');
        setTitleEn(fm.title_en || '');
        setSlug(data.slug || targetSlug);
        setIsSlugManual(true);
        setCategoryId(fm.category_id || 'INSIGHT');
        setCategoryEn(fm.category_en || fm.category_id || 'INSIGHT');
        setAuthor(fm.author || 'Radya Labs Engineering Team');
        setDate(fm.date || new Date().toISOString().slice(0, 10));
        setCover(fm.cover || '');
        setExcerptId(fm.excerpt_id || '');
        setExcerptEn(fm.excerpt_en || '');
        setTagsInput(Array.isArray(fm.tags) ? fm.tags.join(', ') : 'Technology');
        setPublished(fm.published !== false);
        setBodyId(data.contentId || '');
        setBodyEn(data.contentEn || '');
        setFeedback(null);
        setViewMode('editor');
      } else {
        alert('Gagal memuat artikel untuk diedit');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat memuat artikel');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (targetSlug: string) => {
    if (!confirm(`Hapus file markdown artikel "${targetSlug}.md"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/posts?slug=${targetSlug}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPosts();
        setFeedback({ type: 'success', message: `Artikel "${targetSlug}" berhasil dihapus dari repo.` });
      } else {
        const errData = await res.json();
        alert(errData.error || 'Gagal menghapus artikel');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi');
    }
  };

  const handleTitleChange = (val: string) => {
    setTitleId(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('body-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || 'teks';
    const replacement = prefix + selectedText + suffix;
    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setBodyId(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const handleGenerateAiDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aiBrief.trim().length < 20) {
      setAiError('Brief minimal 20 karakter agar AI memahami topik.');
      return;
    }
    setAiGenerating(true);
    setAiError('');
    setAiStatusStep('1/2: Menulis artikel lengkap dengan Google Gemini API...');

    try {
      const res = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'full',
          brief: aiBrief,
          length: 'medium',
          titleHintId: titleId,
          titleHintEn: titleEn,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal generate artikel dengan Gemini.');
      }

      if (data.titleId) setTitleId(data.titleId);
      if (data.titleEn) setTitleEn(data.titleEn);
      if (!isSlugManual && data.titleId) setSlug(slugify(data.titleId));
      if (data.excerptId) setExcerptId(data.excerptId);
      if (data.excerptEn) setExcerptEn(data.excerptEn);
      if (data.contentId) setBodyId(data.contentId);
      if (data.contentEn) setBodyEn(data.contentEn);
      if (Array.isArray(data.tags)) setTagsInput(data.tags.join(', '));
      if (data.categoryId) setCategoryId(data.categoryId);

      if (aiGenerateCover) {
        setAiStatusStep('2/2: Merender cover gambar dengan AI (aotianzz.xyz)...');
        try {
          const imgRes = await fetch('/api/admin/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: `Futuristic clean minimal editorial illustration for enterprise tech blog post about "${data.titleId || aiBrief}". Clean corporate aesthetic, glowing digital neon accents, 4k resolution, no text overlay.`,
              slug: slugify(data.titleId || 'blog'),
            }),
          });
          const imgData = await imgRes.json();
          if (imgRes.ok && imgData.cover) {
            setCover(imgData.cover);
          }
        } catch (imgErr) {
          console.warn('[Admin AI Image] Error:', imgErr);
        }
      }

      setShowAiModal(false);
      setFeedback({
        type: 'success',
        message: 'Draf artikel berhasil dibuat oleh Google Gemini AI!',
      });
    } catch (err: any) {
      setAiError(err.message || 'Gagal memproses draf AI.');
    } finally {
      setAiGenerating(false);
      setAiStatusStep('');
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleId.trim()) {
      alert('Judul Artikel wajib diisi!');
      return;
    }
    if (!bodyId.trim()) {
      alert('Konten Artikel wajib diisi!');
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload = {
      isEdit,
      originalSlug,
      title_id: titleId,
      title_en: titleEn || titleId,
      slug: slug || slugify(titleId),
      category_id: categoryId,
      category_en: categoryEn || categoryId,
      author,
      date,
      cover,
      excerpt_id: excerptId,
      excerpt_en: excerptEn,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      published,
      body_id: bodyId,
      body_en: bodyEn,
    };

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({
          type: 'success',
          message: data.message || 'Artikel berhasil disimpan ke folder /content/posts as .md!',
          url: data.url,
        });
        await fetchPosts();
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Gagal menyimpan artikel',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Terjadi kesalahan saat menyimpan artikel',
      });
    } finally {
      setSaving(false);
    }
  };

  // Filtered posts
  const filteredPosts = posts.filter((p) => {
    const q = searchQuery.toLowerCase();
    const title = (p.frontmatter.title_id || '').toLowerCase();
    const s = p.slug.toLowerCase();
    const cat = (p.frontmatter.category_id || '').toLowerCase();
    return title.includes(q) || s.includes(q) || cat.includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1793E8]"></span>
                Radya<span className="text-[#1793E8]">Labs</span>
              </span>
            </Link>
            <div className="h-5 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#1793E8]/20 text-[#38BDF8] border border-[#1793E8]/30">
                Markdown CMS
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-400">
                /content/posts/*.md
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/insight"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <span>Buka Blog Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            {viewMode === 'editor' && (
              <button
                onClick={() => setViewMode('list')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Daftar</span>
              </button>
            )}
            {viewMode === 'list' && (
              <button
                onClick={handleNewArticle}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-lg bg-gradient-radya text-white hover:brightness-110 shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tulis Artikel Baru</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Alert Feedback */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span className="text-sm font-semibold">{feedback.message}</span>
            </div>
            {feedback.url && (
              <Link
                href={feedback.url}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <span>Lihat Artikel di Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        {/* VIEW MODE: LIST OF ARTICLES */}
        {viewMode === 'list' && (
          <div>
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Artikel MD
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#0F172A]">{posts.length}</span>
                  <FileText className="w-6 h-6 text-[#1793E8]/70" />
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Status Published
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-emerald-600">
                    {posts.filter((p) => p.frontmatter.published !== false).length}
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500/70" />
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Arsitektur Konten
                </span>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Git-based Markdown</span>
                    <span className="text-xs text-slate-500">Auto SSG & ISR Revalidation</span>
                  </div>
                  <FolderGit2 className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari judul, slug, kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8] transition-all"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={fetchPosts}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#1793E8] hover:border-[#1793E8] transition-colors"
                  title="Refresh Daftar"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleNewArticle}
                  className="px-4 py-2 rounded-xl bg-gradient-radya text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-110 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Artikel Baru</span>
                </button>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3.5 px-6">Artikel & Judul</th>
                      <th className="py-3.5 px-6">Kategori</th>
                      <th className="py-3.5 px-6">Tanggal</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1793E8]" />
                          <span>Memuat daftar artikel...</span>
                        </td>
                      </tr>
                    ) : filteredPosts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <span>Tidak ada artikel ditemukan.</span>
                        </td>
                      </tr>
                    ) : (
                      filteredPosts.map((post) => (
                        <tr key={post.slug} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900 line-clamp-1">
                              {post.frontmatter.title_id || post.slug}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <span>URL: /insight/{post.slug}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-[11px] font-extrabold uppercase">
                              {post.frontmatter.category_id || 'INSIGHT'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-500 text-xs">
                            {post.frontmatter.date || '-'}
                          </td>
                          <td className="py-4 px-6">
                            {post.frontmatter.published !== false ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/insight/${post.slug}`}
                                target="_blank"
                                className="p-2 rounded-lg text-slate-400 hover:text-[#1793E8] hover:bg-sky-50 transition-colors"
                                title="Buka Halaman Live"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleEditArticle(post.slug)}
                                className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Edit Artikel"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(post.slug)}
                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Hapus Artikel"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE: FORM EDITOR */}
        {viewMode === 'editor' && (
          <form onSubmit={handleSaveArticle} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {isEdit ? 'Edit Artikel Blog (.md)' : 'Tulis Artikel Blog Baru (.md)'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tersimpan langsung sebagai file Markdown di <code className="text-[#1793E8]">/content/posts/{slug || 'judul'}.md</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tulis dengan AI (Gemini)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-radya text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:brightness-110 disabled:opacity-50 transition-all"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Kolom Kiri: Form Utama Konten (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Judul & Slug */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Judul Artikel (Bahasa Indonesia) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Strategi Konsultan IT untuk Integrasi AI yang Efektif"
                      value={titleId}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Slug URL (/insight/&lt;slug&gt;) *
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSlugManual(false);
                          setSlug(slugify(titleId));
                        }}
                        className="text-[11px] text-[#1793E8] hover:underline font-semibold"
                      >
                        Generate Ulang dari Judul
                      </button>
                    </div>
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                      <span className="font-mono text-slate-400">/insight/</span>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => {
                          setIsSlugManual(true);
                          setSlug(slugify(e.target.value));
                        }}
                        className="w-full bg-transparent font-mono text-slate-800 focus:outline-none ml-1 font-semibold"
                        placeholder="strategi-konsultan-it..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Judul Artikel (English - Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IT Consultant Strategy for Effective AI Integration"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  </div>
                </div>

                {/* Ringkasan / Excerpt */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Ringkasan / Excerpt (ID)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ringkasan singkat artikel yang muncul di kartu artikel dan meta description SEO..."
                      value={excerptId}
                      onChange={(e) => setExcerptId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  </div>
                </div>

                {/* Markdown Editor */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Konten Markdown (Bahasa Indonesia) *
                    </label>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setEditorTab('write')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          editorTab === 'write' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorTab('preview')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          editorTab === 'preview' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Live Preview
                      </button>
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  {editorTab === 'write' && (
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
                      <button
                        type="button"
                        onClick={() => insertMarkdown('**', '**')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('*', '*')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('## ')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Heading 2"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('### ')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Heading 3"
                      >
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('* ')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('> ')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Quote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('```\n', '\n```')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Code Block"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('[Judul Link](', ')')}
                        className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {editorTab === 'write' ? (
                    <textarea
                      id="body-editor"
                      rows={16}
                      required
                      value={bodyId}
                      onChange={(e) => setBodyId(e.target.value)}
                      placeholder="Ketik konten artikel dalam format Markdown..."
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 font-mono text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  ) : (
                    <div className="min-h-[380px] p-6 rounded-2xl border border-slate-200 bg-slate-50/50 prose prose-slate max-w-none">
                      <div className="whitespace-pre-line text-slate-800">
                        {bodyId || 'Belum ada konten.'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Konten English (Opsional) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Konten English (Opsional untuk Bilingual)
                  </label>
                  <textarea
                    rows={8}
                    value={bodyEn}
                    onChange={(e) => setBodyEn(e.target.value)}
                    placeholder="English content in Markdown format..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 font-mono text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                  />
                </div>
              </div>

              {/* Kolom Kanan: Metadata & Konfigurasi (1/3) */}
              <div className="space-y-6">
                {/* Status & Publikasi */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Publikasi
                  </h3>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Status Tayang</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Tanggal Tayang
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Penulis (Author)
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  </div>
                </div>

                {/* Kategori & Tags */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Kategori & Topik
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Pilih Kategori
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                        setCategoryEn(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1793E8] bg-white font-semibold"
                    >
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Tags (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      placeholder="AI, Cloud, Microservices"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Cover Image
                    </h3>
                    <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setCoverMode('ai')}
                        className={`rounded-md px-2.5 py-1 transition ${
                          coverMode === 'ai'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        ✨ AI Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoverMode('preset')}
                        className={`rounded-md px-2.5 py-1 transition ${
                          coverMode === 'preset'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        🖼️ Preset / URL
                      </button>
                    </div>
                  </div>

                  {cover && (
                    <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cover} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCover('')}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition"
                        title="Hapus gambar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute bottom-1 left-2 text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded font-mono truncate max-w-[90%]">
                        {cover}
                      </div>
                    </div>
                  )}

                  {coverMode === 'ai' ? (
                    <AiImageGenerator
                      apiEndpoint="/api/admin/generate-image"
                      slug={slug}
                      titleHint={titleId || titleEn}
                      briefHint={excerptId}
                      onImageGenerated={(url) => setCover(url)}
                      compact={true}
                    />
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          URL Cover Image
                        </label>
                        <input
                          type="text"
                          placeholder="https://... atau /images/blog/..."
                          value={cover}
                          onChange={(e) => setCover(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1793E8]"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold text-slate-400 mb-2">
                          Pilih Preset Gambar:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {PRESET_COVERS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCover(preset.url)}
                              className={`p-1.5 rounded-xl border text-[11px] font-semibold text-left transition-all ${
                                cover === preset.url
                                  ? 'border-[#1793E8] bg-[#1793E8]/10 text-[#1793E8]'
                                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tombol Simpan Sticky */}
                <div className="p-4 rounded-3xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">File target:</span>
                    <span className="font-mono text-[#38BDF8]">{slug || 'artikel'}.md</span>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 rounded-2xl bg-gradient-radya text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
                  >
                    {saving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? 'Sedang Menyimpan...' : 'Simpan & Publikasikan'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Modal AI Draft Generator */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Generate Artikel dengan Google Gemini
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      AI menuliskan draf judul, excerpt, dan konten markdown lengkap.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  disabled={aiGenerating}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleGenerateAiDraft} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Brief / Topik Artikel *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={aiBrief}
                    onChange={(e) => setAiBrief(e.target.value)}
                    placeholder="Contoh: Artikel teknis tentang implementasi Microservices dengan Next.js dan Apache Kafka, bahas arsitektur, tantangan skalabilitas, dan praktik terbaik engineering..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs leading-relaxed text-slate-800 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Minimal 20 karakter agar hasil draf artikel relevan & mendalam.
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <input
                    type="checkbox"
                    id="adminAiGenerateCover"
                    checked={aiGenerateCover}
                    onChange={(e) => setAiGenerateCover(e.target.checked)}
                    className="rounded border-slate-300 text-violet-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="adminAiGenerateCover" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                    Generate Foto Cover otomatis dengan AI Image API (aotianzz.xyz)
                  </label>
                </div>

                {aiStatusStep && (
                  <div className="flex items-center gap-2 rounded-xl bg-violet-50 border border-violet-100 p-3 text-xs font-semibold text-violet-700 animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-violet-600" />
                    <span>{aiStatusStep}</span>
                  </div>
                )}

                {aiError && (
                  <div className="rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 font-semibold">
                    {aiError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAiModal(false)}
                    disabled={aiGenerating}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={aiGenerating}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow hover:brightness-110 disabled:opacity-50 transition"
                  >
                    {aiGenerating ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>{aiGenerating ? 'Sedang Menulis...' : 'Mulai Generate Draf'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
