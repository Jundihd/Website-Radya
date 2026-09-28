'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  Bold,
  Italic,
  Heading2,
  Link2,
  List,
  ListOrdered,
  Quote,
  Code,
  Trash2,
  Plus,
  Download,
  Copy,
  Save,
  LogOut,
  Check,
  Loader2,
  ImagePlus,
  X,
  RefreshCw,
  Eye,
  PenLine,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import {
  POST_STATUSES,
  buildPostMarkdown,
  generateDirectusId,
  slugify,
  validatePostFields,
  type PostStatus,
  type StudioPostFields,
} from '@/lib/studio-md';
import { AiCreatePanel, type AiReady } from './AiCreatePanel';
import { AiImageGenerator } from './AiImageGenerator';

/* ---------------------------------- kecil ---------------------------------- */

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <p className="mb-1.5 text-sm font-extrabold text-white">
      {children}{' '}
      {required && <span className="text-[#29B6F6]">*</span>}
    </p>
  );
}

function LangBadge({ lang }: { lang: 'EN' | 'ID' }) {
  return (
    <span
      className={`ml-2 rounded-md px-2 py-0.5 align-middle text-[11px] font-bold ${
        lang === 'EN'
          ? 'bg-[#1793E8]/15 text-[#29B6F6]'
          : 'bg-pink-500/15 text-pink-300'
      }`}
    >
      {lang === 'EN' ? 'English' : 'Bahasa Indonesia'}
    </span>
  );
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-[#0b0e14] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-[#1793E8]';
const areaCls =
  'w-full rounded-xl border border-white/10 bg-[#0b0e14] px-4 py-3 text-sm leading-relaxed text-slate-100 outline-none placeholder:text-slate-500 focus:border-[#1793E8]';

const STATUS_DOT: Record<PostStatus, string> = {
  published: 'bg-sky-400',
  draft: 'bg-slate-300',
  archived: 'bg-amber-400',
  under_review: 'bg-orange-700',
};

/* ------------------------------- markdown box ------------------------------ */

function MarkdownBox({
  value,
  onChange,
  placeholder,
  minRows = 12,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minRows?: number;
}) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [html, setHtml] = useState('');
  const [loadingPreview, setLoadingPreview] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const wrap = useCallback(
    (before: string, after = '', placeholderText = 'teks') => {
      const el = areaRef.current;
      if (!el) return;
      const { selectionStart: s, selectionEnd: e } = el;
      const selected = value.slice(s, e) || placeholderText;
      const next =
        value.slice(0, s) + before + selected + after + value.slice(e);
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(s + before.length, s + before.length + selected.length);
      });
    },
    [value, onChange],
  );

  const linePrefix = useCallback(
    (prefix: string) => {
      const el = areaRef.current;
      if (!el) return;
      const { selectionStart: s } = el;
      const lineStart = value.lastIndexOf('\n', s - 1) + 1;
      const next =
        value.slice(0, lineStart) + prefix + value.slice(lineStart);
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(s + prefix.length, s + prefix.length);
      });
    },
    [value, onChange],
  );

  async function openPreview() {
    setTab('preview');
    setLoadingPreview(true);
    try {
      const res = await fetch('/api/studio/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: value }),
      });
      const data = await res.json();
      setHtml(res.ok ? data.html || '<p><em>Konten kosong.</em></p>' : '<p>Gagal render preview.</p>');
    } catch {
      setHtml('<p>Gagal render preview.</p>');
    } finally {
      setLoadingPreview(false);
    }
  }

  const tools = [
    { icon: Bold, title: 'Bold', fn: () => wrap('**', '**') },
    { icon: Italic, title: 'Italic', fn: () => wrap('_', '_') },
    { icon: Heading2, title: 'Heading', fn: () => linePrefix('### ') },
    { icon: Link2, title: 'Link', fn: () => wrap('[', '](https://)') },
    { icon: List, title: 'Bullet list', fn: () => linePrefix('- ') },
    { icon: ListOrdered, title: 'Numbered list', fn: () => linePrefix('1. ') },
    { icon: Quote, title: 'Quote', fn: () => linePrefix('> ') },
    { icon: Code, title: 'Inline code', fn: () => wrap('`', '`', 'kode') },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center gap-1 border-b border-white/10 bg-[#151b26] px-2 py-1.5">
        {tab === 'write' &&
          tools.map(({ icon: Icon, title, fn }) => (
            <button
              key={title}
              type="button"
              title={title}
              onClick={fn}
              className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${
              tab === 'write' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PenLine className="h-3.5 w-3.5" /> Tulis
          </button>
          <button
            type="button"
            onClick={openPreview}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${
              tab === 'preview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
        </div>
      </div>
      {tab === 'write' ? (
        <textarea
          ref={areaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className="w-full bg-[#0b0e14] px-4 py-3 font-mono text-[13px] leading-relaxed text-slate-100 outline-none placeholder:text-slate-500"
        />
      ) : (
        <div className="max-h-[480px] min-h-[200px] overflow-y-auto bg-[#0b0e14] px-5 py-4">
          {loadingPreview ? (
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" /> Merender preview…
            </p>
          ) : (
            <article
              className="prose-studio text-sm leading-relaxed text-slate-200"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- form utama ------------------------------ */

const EMPTY: StudioPostFields = {
  slug: '',
  directusId: '',
  status: 'draft',
  titleId: '',
  titleEn: '',
  subtitleId: '',
  subtitleEn: '',
  excerptId: '',
  excerptEn: '',
  date: new Date().toISOString().slice(0, 10),
  author: '',
  cover: '',
  categoryId: 'INSIGHT',
  categoryEn: 'INSIGHT',
  tags: [],
  contentId: '',
  contentEn: '',
};

export function BlogCreateForm() {
  const router = useRouter();
  const [fields, setFields] = useState<StudioPostFields>(() => ({
    ...EMPTY,
    directusId: generateDirectusId(),
  }));
  const [slugTouched, setSlugTouched] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [slugExists, setSlugExists] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmOverwrite, setConfirmOverwrite] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [coverTab, setCoverTab] = useState<'ai' | 'upload'>('ai');
  const coverInputRef = useRef<HTMLInputElement>(null);
  // --- AI ---
  const [aiBrief, setAiBrief] = useState('');
  const [aiLength, setAiLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [aiReady, setAiReady] = useState<AiReady | null>(null);
  const [aiBusy, setAiBusy] = useState<'excerpt' | 'contentId' | 'contentEn' | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/studio/ai-status')
      .then((r) => (r.ok ? r.json() : { configured: false }))
      .then((d) => {
        if (alive) setAiReady({ configured: Boolean(d.configured), provider: d.provider, model: d.model });
      })
      .catch(() => {
        if (alive) setAiReady({ configured: false });
      });
    return () => {
      alive = false;
    };
  }, []);

  const set = useCallback(
    <K extends keyof StudioPostFields>(key: K, value: StudioPostFields[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Slug otomatis dari judul ID sampai user mengubah manual.
  useEffect(() => {
    if (!slugTouched) set('slug', slugify(fields.titleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.titleId, slugTouched]);

  // Cek keunikan slug (debounce).
  useEffect(() => {
    if (!fields.slug) {
      setSlugExists(null);
      return;
    }
    setCheckingSlug(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/studio/check-slug?slug=${encodeURIComponent(fields.slug)}`,
        );
        const data = await res.json();
        setSlugExists(res.ok ? Boolean(data.exists) : null);
      } catch {
        setSlugExists(null);
      } finally {
        setCheckingSlug(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [fields.slug]);

  const mdPreview = useMemo(() => buildPostMarkdown(fields), [fields]);
  const validation = useMemo(() => validatePostFields(fields), [fields]);

  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    if (!fields.tags.some((x) => x.toLowerCase() === t.toLowerCase())) {
      set('tags', [...fields.tags, t]);
    }
    setTagInput('');
  }

  /** Terapkan hasil AI hanya ke field yang masih kosong (tidak menimpa ketikan manual). */
  function applyAiPatch(patch: Partial<StudioPostFields>): string[] {
    const filled: string[] = [];
    setFields((prev) => {
      const next = { ...prev };
      const fillText = (
        key: 'titleId' | 'titleEn' | 'subtitleId' | 'subtitleEn' | 'excerptId' | 'excerptEn' | 'contentId' | 'contentEn',
        label: string,
      ) => {
        const v = patch[key];
        if (typeof v === 'string' && v.trim() && !next[key].trim()) {
          next[key] = v.trim();
          filled.push(label);
        }
      };
      fillText('titleId', 'judul ID');
      fillText('titleEn', 'judul EN');
      fillText('subtitleId', 'subtitle ID');
      fillText('subtitleEn', 'subtitle EN');
      fillText('excerptId', 'excerpt ID');
      fillText('excerptEn', 'excerpt EN');
      fillText('contentId', 'konten ID');
      fillText('contentEn', 'konten EN');
      if (Array.isArray(patch.tags) && patch.tags.length > 0) {
        const fresh = patch.tags
          .map((t) => String(t).trim())
          .filter((t) => t && !next.tags.some((x) => x.toLowerCase() === t.toLowerCase()));
        if (fresh.length > 0) {
          next.tags = [...next.tags, ...fresh];
          filled.push(`${fresh.length} tag`);
        }
      }
      if (next.categoryId.trim().toUpperCase() === 'INSIGHT' && patch.categoryId?.trim()) {
        next.categoryId = patch.categoryId.trim();
        filled.push('kategori');
      }
      if (next.categoryEn.trim().toUpperCase() === 'INSIGHT' && patch.categoryEn?.trim()) {
        next.categoryEn = patch.categoryEn.trim();
      }
      if (typeof patch.cover === 'string' && patch.cover.trim() && !next.cover.trim()) {
        next.cover = patch.cover.trim();
        filled.push('cover');
      }
      return next;
    });
    return filled;
  }

  async function handleAiExcerpt() {
    if (!fields.titleId.trim() || !fields.titleEn.trim()) {
      setMessage({ type: 'err', text: 'Isi Title ID & EN dulu sebelum generate Short Description.' });
      return;
    }
    if (!fields.contentId.trim() && !fields.contentEn.trim()) {
      setMessage({
        type: 'err',
        text: 'Isi Content dulu (atau pakai Create with AI di atas) agar excerpt nyambung dengan isi.',
      });
      return;
    }
    setAiBusy('excerpt');
    setMessage(null);
    try {
      const res = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'excerpt',
          titleId: fields.titleId,
          titleEn: fields.titleEn,
          contentId: fields.contentId,
          contentEn: fields.contentEn,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'err', text: data.error || 'Generate excerpt gagal.' });
        return;
      }
      setFields((prev) => ({
        ...prev,
        excerptId: prev.excerptId.trim() ? prev.excerptId : data.excerptId,
        excerptEn: prev.excerptEn.trim() ? prev.excerptEn : data.excerptEn,
      }));
      setMessage({ type: 'ok', text: 'Short Description terisi dari AI. Silakan review.' });
    } catch {
      setMessage({ type: 'err', text: 'Generate excerpt gagal (jaringan).' });
    } finally {
      setAiBusy(null);
    }
  }

  async function handleAiContent(lang: 'ID' | 'EN') {
    if (!fields.titleId.trim() || !fields.titleEn.trim()) {
      setMessage({ type: 'err', text: 'Isi Title ID & EN dulu sebelum generate content.' });
      return;
    }
    const key = lang === 'ID' ? 'contentId' : 'contentEn';
    if (fields[key].trim()) {
      setMessage({
        type: 'err',
        text: `Content ${lang} sudah terisi — kosongkan dulu jika ingin generate ulang.`,
      });
      return;
    }
    setAiBusy(lang === 'ID' ? 'contentId' : 'contentEn');
    setMessage(null);
    try {
      const res = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'content',
          lang,
          length: aiLength,
          titleId: fields.titleId,
          titleEn: fields.titleEn,
          excerptId: fields.excerptId,
          excerptEn: fields.excerptEn,
          brief: aiBrief,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'err', text: data.error || 'Generate content gagal.' });
        return;
      }
      set(key, data.content);
      setMessage({ type: 'ok', text: `Content ${lang} terisi dari AI. Silakan review & edit.` });
    } catch {
      setMessage({ type: 'err', text: 'Generate content gagal (jaringan).' });
    } finally {
      setAiBusy(null);
    }
  }

  async function uploadCover(file: File) {
    setUploadingCover(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('slug', fields.slug || 'cover');
      const res = await fetch('/api/studio/upload-cover', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'err', text: data.error || 'Upload cover gagal.' });
        return;
      }
      set('cover', data.cover);
      setMessage({ type: 'ok', text: `Cover terupload: ${data.cover}` });
    } catch {
      setMessage({ type: 'err', text: 'Upload cover gagal (jaringan).' });
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleSave(overwrite = false) {
    setMessage(null);
    if (!validation.valid) {
      setMessage({ type: 'err', text: validation.errors.join(' ') });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/studio/save-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, overwrite }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setConfirmOverwrite(true);
        setMessage({
          type: 'err',
          text: data.error || 'Slug sudah dipakai.',
        });
        return;
      }
      if (!res.ok) {
        setMessage({ type: 'err', text: data.error || 'Gagal menyimpan.' });
        return;
      }
      setConfirmOverwrite(false);
      setMessage({
        type: 'ok',
        text:
          data.status === 'published'
            ? `Tersimpan & langsung tayang: /insight/${data.slug} (setelah deploy/rebuild).`
            : `Tersimpan sebagai ${data.status}: content/posts/${data.slug}.md`,
      });
    } catch {
      setMessage({ type: 'err', text: 'Gagal menyimpan (jaringan).' });
    } finally {
      setSaving(false);
    }
  }

  function handleDownload() {
    const blob = new Blob([mdPreview], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fields.slug || 'artikel'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(mdPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setMessage({ type: 'err', text: 'Gagal menyalin ke clipboard.' });
    }
  }

  async function handleLogout() {
    await fetch('/api/studio/logout', { method: 'POST' });
    router.push('/studio/login');
    router.refresh();
  }

  const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0e14]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div>
            <h1 className="text-lg font-extrabold tracking-tight">
              Studio Blog Editor
            </h1>
            <p className="text-xs text-slate-400">
              Tim media · output: <code className="text-slate-300">content/posts/&lt;slug&gt;.md</code>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Tersalin!' : 'Salin .md'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" /> Unduh .md
            </button>
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-xl bg-[#1793E8] px-4 py-2 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Simpan ke Server
            </button>
            <button
              type="button"
              onClick={handleLogout}
              title="Keluar"
              className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        {message && (
          <div
            className={`border-t px-4 py-2.5 text-sm ${
              message.type === 'ok'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                : 'border-red-500/30 bg-red-500/10 text-red-200'
            }`}
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
              <span className="flex-1">{message.text}</span>
              {confirmOverwrite && (
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:brightness-110 disabled:opacity-50"
                >
                  Ya, timpa file
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <AiCreatePanel
          titleId={fields.titleId}
          titleEn={fields.titleEn}
          brief={aiBrief}
          onBriefChange={setAiBrief}
          length={aiLength}
          onLengthChange={setAiLength}
          aiReady={aiReady}
          onApply={applyAiPatch}
        />

        {/* Status */}
        <section>
          <Label>Status</Label>
          <div className="grid gap-2 sm:grid-cols-4">
            {POST_STATUSES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => set('status', s.value)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  fields.status === s.value
                    ? 'border-[#1793E8] bg-[#1793E8]/10 text-white'
                    : 'border-white/10 bg-[#12161f] text-slate-300 hover:border-white/25'
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[s.value]}`} />
                {s.label}
                {fields.status === s.value && <Check className="ml-auto h-4 w-4 text-[#29B6F6]" />}
              </button>
            ))}
          </div>
          {fields.status !== 'published' && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-300/90">
              <AlertTriangle className="h-3.5 w-3.5" />
              Artikel tidak akan tayang di website sampai status = Published.
            </p>
          )}
        </section>

        {/* Author */}
        <section>
          <Label>Author</Label>
          <input
            value={fields.author}
            onChange={(e) => set('author', e.target.value)}
            placeholder="Radya Labs Engineering Team"
            className={inputCls}
          />
          <p className="mt-1.5 text-xs italic text-slate-500">
            Opsional — kosongkan untuk memakai default “Radya Labs Engineering Team”.
          </p>
        </section>

        {/* Category */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label required>Category ID</Label>
            <input
              value={fields.categoryId}
              onChange={(e) => set('categoryId', e.target.value)}
              placeholder="SELF DEVELOPMENT"
              className={inputCls}
            />
          </div>
          <div>
            <Label required>Category EN</Label>
            <input
              value={fields.categoryEn}
              onChange={(e) => set('categoryEn', e.target.value)}
              placeholder="SELF DEVELOPMENT"
              className={inputCls}
            />
          </div>
        </section>

        {/* Cover */}
        <section>
          <div className="flex items-center justify-between mb-1.5">
            <Label>Cover Image</Label>
            <div className="flex rounded-lg bg-white/5 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCoverTab('ai')}
                className={`rounded-md px-3 py-1 transition ${
                  coverTab === 'ai'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ✨ AI Generator
              </button>
              <button
                type="button"
                onClick={() => setCoverTab('upload')}
                className={`rounded-md px-3 py-1 transition ${
                  coverTab === 'upload'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📁 Upload / URL
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#12161f] p-4 space-y-3">
            {fields.cover ? (
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fields.cover} alt="Cover preview" className="max-h-72 w-full object-cover" />
                <div className="absolute right-3 top-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      set('cover', '');
                      setCoverFile(null);
                    }}
                    className="rounded-lg bg-black/70 p-2 text-white transition hover:bg-black/90 shadow"
                    title="Hapus cover"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-slate-300 backdrop-blur-xs font-mono">
                  {fields.cover}
                </div>
              </div>
            ) : null}

            {coverTab === 'ai' ? (
              <AiImageGenerator
                slug={fields.slug}
                titleHint={fields.titleId || fields.titleEn}
                briefHint={aiBrief}
                onImageGenerated={(coverUrl) => {
                  set('cover', coverUrl);
                  setCoverFile(null);
                }}
              />
            ) : (
              <div>
                {!fields.cover && (
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 px-4 py-10 text-sm text-slate-400 transition hover:border-[#1793E8]/60 hover:text-slate-200"
                  >
                    {uploadingCover ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <ImagePlus className="h-6 w-6" />
                    )}
                    {uploadingCover ? 'Mengupload…' : 'Klik untuk upload gambar cover (JPG/PNG/WebP, maks 5 MB)'}
                  </button>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setCoverFile(f);
                      uploadCover(f);
                    }
                    e.target.value = '';
                  }}
                />
                <div className="mt-3 flex items-center gap-2">
                  <input
                    value={coverFile ? '' : fields.cover}
                    onChange={(e) => {
                      set('cover', e.target.value);
                      setCoverFile(null);
                    }}
                    placeholder="…atau tempel URL gambar (https://…)"
                    className={inputCls}
                  />
                  {fields.cover && !coverFile && (
                    <span className="shrink-0 text-xs text-slate-500">URL manual</span>
                  )}
                </div>
                <p className="mt-1.5 text-xs italic text-slate-500">
                  Opsional — kosongkan untuk memakai cover otomatis.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Slug + directus_id */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label required>Slug (otomatis dari judul ID)</Label>
            <input
              value={fields.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set('slug', slugify(e.target.value));
              }}
              placeholder="judul-artikel"
              className={`${inputCls} font-mono ${slugExists ? 'border-red-500/60' : ''}`}
            />
            <p className="mt-1.5 text-xs text-slate-500">
              {checkingSlug ? (
                'Mengecek slug…'
              ) : slugExists === true ? (
                <span className="font-semibold text-red-300">Slug sudah dipakai file lain.</span>
              ) : slugExists === false && fields.slug ? (
                <span className="text-emerald-300">Slug tersedia.</span>
              ) : (
                <>File: <code>content/posts/{fields.slug || '…'}.md</code></>
              )}
            </p>
          </div>
          <div>
            <Label required>directus_id (otomatis)</Label>
            <div className="flex gap-2">
              <input value={fields.directusId} readOnly className={`${inputCls} font-mono text-slate-400`} />
              <button
                type="button"
                onClick={() => set('directusId', generateDirectusId())}
                title="Generate ulang"
                className="shrink-0 rounded-xl border border-white/10 px-3.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Translations */}
        <section>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold text-white">
              Translations <span className="text-[#29B6F6]">*</span>
            </span>
            <button
              type="button"
              onClick={handleAiExcerpt}
              disabled={aiBusy !== null || aiReady !== null && !aiReady.configured}
              title="Generate Short Description ID+EN dari judul & konten"
              className="ml-auto flex items-center gap-1.5 rounded-lg border border-violet-400/40 px-3 py-1.5 text-xs font-bold text-violet-200 transition hover:bg-violet-500/20 disabled:opacity-40"
            >
              {aiBusy === 'excerpt' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              Generate Short Description
            </button>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* EN */}
            <div className="space-y-5 rounded-2xl border border-[#1793E8]/20 bg-[#0e141d] p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold text-[#29B6F6]">
                English
              </p>
              <div>
                <Label required>Title<LangBadge lang="EN" /></Label>
                <input
                  value={fields.titleEn}
                  onChange={(e) => set('titleEn', e.target.value)}
                  placeholder="Article title in English"
                  className={inputCls}
                />
              </div>
              <div>
                <Label>Subtitle<LangBadge lang="EN" /></Label>
                <textarea
                  value={fields.subtitleEn}
                  onChange={(e) => set('subtitleEn', e.target.value)}
                  placeholder="Optional subtitle"
                  rows={2}
                  className={areaCls}
                />
              </div>
              <div>
                <Label required>Short Description<LangBadge lang="EN" /></Label>
                <textarea
                  value={fields.excerptEn}
                  onChange={(e) => set('excerptEn', e.target.value)}
                  placeholder="1–2 kalimat ringkasan untuk kartu artikel"
                  rows={4}
                  className={areaCls}
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">
                    Content <span className="text-[#29B6F6]">*</span>
                  </span>
                  <LangBadge lang="EN" />
                  <button
                    type="button"
                    onClick={() => handleAiContent('EN')}
                    disabled={aiBusy !== null || aiReady !== null && !aiReady.configured}
                    title="Generate draf Content English dari judul (+ brief di panel AI)"
                    className="ml-auto flex items-center gap-1 rounded-md border border-violet-400/40 px-2 py-1 text-[11px] font-bold text-violet-200 transition hover:bg-violet-500/20 disabled:opacity-40"
                  >
                    {aiBusy === 'contentEn' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    Generate
                  </button>
                </div>
                <MarkdownBox
                  value={fields.contentEn}
                  onChange={(v) => set('contentEn', v)}
                  placeholder="Tulis konten English (Markdown)…"
                />
                <p className="mt-1.5 text-xs text-slate-500">{wordCount(fields.contentEn)} kata</p>
              </div>
            </div>
            {/* ID */}
            <div className="space-y-5 rounded-2xl border border-pink-500/20 bg-[#171019] p-5">
              <p className="flex items-center gap-2 text-sm font-extrabold text-pink-300">
                Bahasa Indonesia
              </p>
              <div>
                <Label required>Title<LangBadge lang="ID" /></Label>
                <input
                  value={fields.titleId}
                  onChange={(e) => set('titleId', e.target.value)}
                  placeholder="Judul artikel Bahasa Indonesia"
                  className={inputCls}
                />
              </div>
              <div>
                <Label>Subtitle<LangBadge lang="ID" /></Label>
                <textarea
                  value={fields.subtitleId}
                  onChange={(e) => set('subtitleId', e.target.value)}
                  placeholder="Subjudul opsional"
                  rows={2}
                  className={areaCls}
                />
              </div>
              <div>
                <Label required>Short Description<LangBadge lang="ID" /></Label>
                <textarea
                  value={fields.excerptId}
                  onChange={(e) => set('excerptId', e.target.value)}
                  placeholder="1–2 kalimat ringkasan untuk kartu artikel"
                  rows={4}
                  className={areaCls}
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">
                    Content <span className="text-[#29B6F6]">*</span>
                  </span>
                  <LangBadge lang="ID" />
                  <button
                    type="button"
                    onClick={() => handleAiContent('ID')}
                    disabled={aiBusy !== null || aiReady !== null && !aiReady.configured}
                    title="Generate draf Content Indonesia dari judul (+ brief di panel AI)"
                    className="ml-auto flex items-center gap-1 rounded-md border border-violet-400/40 px-2 py-1 text-[11px] font-bold text-violet-200 transition hover:bg-violet-500/20 disabled:opacity-40"
                  >
                    {aiBusy === 'contentId' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    Generate
                  </button>
                </div>
                <MarkdownBox
                  value={fields.contentId}
                  onChange={(v) => set('contentId', v)}
                  placeholder="Tulis konten Indonesia (Markdown)…"
                />
                <p className="mt-1.5 text-xs text-slate-500">{wordCount(fields.contentId)} kata</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section>
          <Label required>Tags</Label>
          <div className="space-y-2">
            {fields.tags.map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#12161f] px-4 py-3">
                <span className="flex-1 text-sm">{t}</span>
                <button
                  type="button"
                  onClick={() => set('tags', fields.tags.filter((x) => x !== t))}
                  className="text-slate-500 transition hover:text-red-300"
                  title="Hapus tag"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Ketik tag lalu Enter"
                className={inputCls}
              />
              <button
                type="button"
                onClick={addTag}
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#1793E8] px-4 py-2 text-xs font-bold text-white transition hover:brightness-110"
              >
                <Plus className="h-4 w-4" /> Tambah
              </button>
            </div>
          </div>
        </section>

        {/* Date */}
        <section>
          <Label required>Date Published</Label>
          <input
            type="date"
            value={fields.date}
            onChange={(e) => set('date', e.target.value)}
            className={`${inputCls} max-w-xs [color-scheme:dark]`}
          />
        </section>

        {/* MD Preview */}
        <section>
          <Label>Preview file .md (hasil translate semua kotak di atas)</Label>
          <pre className="max-h-[480px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs leading-relaxed text-slate-300">
            {mdPreview}
          </pre>
          {!validation.valid && (
            <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-300/90">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {validation.errors.join(' ')}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
