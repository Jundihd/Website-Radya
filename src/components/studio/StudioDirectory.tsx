'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  FileText,
  Tag,
  Loader2,
  FolderGit2,
} from 'lucide-react';
import { PostStatus, POST_STATUSES } from '@/lib/studio-md';
import {
  FullscreenArticleModal,
  type FullscreenArticleData,
} from './FullscreenArticleModal';
import { ConfirmActionModal } from './ConfirmActionModal';

interface StudioDirectoryProps {
  onNewArticle: () => void;
  onEditArticle: (article: FullscreenArticleData) => void;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; badge: string; dot: string; text: string }
> = {
  published: {
    label: 'Published',
    badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
  },
  draft: {
    label: 'Draft',
    badge: 'bg-slate-500/15 border-slate-500/30 text-slate-300',
    dot: 'bg-slate-400',
    text: 'text-slate-300',
  },
  under_review: {
    label: 'Under Review',
    badge: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
    dot: 'bg-orange-400',
    text: 'text-orange-400',
  },
  archived: {
    label: 'Archived',
    badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
  },
};

export function StudioDirectory({
  onNewArticle,
  onEditArticle,
}: StudioDirectoryProps) {
  const [posts, setPosts] = useState<FullscreenArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | PostStatus>('all');
  const [feedback, setFeedback] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  // Fullscreen Preview Modal
  const [previewArticle, setPreviewArticle] = useState<FullscreenArticleData | null>(null);

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    variant: 'danger' | 'warning' | 'primary';
    action: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: '',
    variant: 'danger',
    action: async () => {},
  });
  const [actionLoading, setActionLoading] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/studio/posts', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      } else {
        setFeedback({ type: 'err', text: data.error || 'Gagal memuat artikel.' });
      }
    } catch {
      setFeedback({ type: 'err', text: 'Gagal memuat artikel (jaringan).' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtered & Searched posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchFilter =
        activeFilter === 'all' || p.status.toLowerCase() === activeFilter;
      if (!matchFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle =
        p.titleId.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q);
      const matchSlug = p.slug.toLowerCase().includes(q);
      const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSlug || matchTags;
    });
  }, [posts, activeFilter, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    const c = { all: posts.length, published: 0, draft: 0, under_review: 0, archived: 0 };
    for (const p of posts) {
      const st = p.status.toLowerCase() as PostStatus;
      if (st in c) c[st]++;
    }
    return c;
  }, [posts]);

  // Minta konfirmasi untuk SEMUA perubahan status (4.2),
  // lalu jalankan PATCH + auto-push Git setelah user menyetujui.
  async function handleStatusChange(slug: string, newStatus: PostStatus) {
    const current = posts.find((p) => p.slug === slug);
    const from = current ? String(current.status).toLowerCase() : '—';
    if (from === newStatus) return;
    const variant =
      newStatus === 'archived'
        ? ('danger' as const)
        : newStatus === 'published'
        ? ('warning' as const)
        : ('primary' as const);
    setConfirmModal({
      isOpen: true,
      title: 'Ubah Status Artikel',
      message: `Ubah status artikel "${slug}" dari "${from}" menjadi "${newStatus}"? Perubahan ini akan disimpan ke file dan di-push ke Git.`,
      confirmLabel: `Ya, Ubah ke ${newStatus}`,
      variant,
      action: async () => {
        await executeStatusChange(slug, newStatus);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  }

  async function executeStatusChange(slug: string, newStatus: PostStatus) {
    setActionLoading(true);
    try {
      const res = await fetch('/api/studio/posts/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFeedback({ type: 'err', text: data.error || 'Gagal mengubah status.' });
        return;
      }

      // Update local state
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, status: newStatus } : p)),
      );

      if (previewArticle?.slug === slug) {
        setPreviewArticle((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      const gitMsg = data.git?.message ? ` (${data.git.message})` : '';
      setFeedback({
        type: 'ok',
        text: `Status artikel "${slug}" diubah ke "${newStatus}".${gitMsg}`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch {
      setFeedback({ type: 'err', text: 'Gagal mengubah status (jaringan).' });
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Delete Article
  function confirmDeleteArticle(slug: string) {
    setConfirmModal({
      isOpen: true,
      title: 'Hapus Artikel',
      message: `Apakah Anda yakin ingin menghapus artikel "${slug}"? Tindakan ini akan menghapus file dari server dan repository Git.`,
      confirmLabel: 'Ya, Hapus Permanen',
      variant: 'danger',
      action: async () => {
        setActionLoading(true);
        try {
          const res = await fetch(`/api/studio/posts?slug=${encodeURIComponent(slug)}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (!res.ok) {
            setFeedback({ type: 'err', text: data.error || 'Gagal menghapus artikel.' });
            return;
          }
          setPosts((prev) => prev.filter((p) => p.slug !== slug));
          if (previewArticle?.slug === slug) setPreviewArticle(null);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
          setFeedback({
            type: 'ok',
            text: `Artikel "${slug}" berhasil dihapus dan dipush ke Git.`,
          });
          setTimeout(() => setFeedback(null), 5000);
        } catch {
          setFeedback({ type: 'err', text: 'Gagal menghapus artikel (jaringan).' });
        } finally {
          setActionLoading(false);
        }
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>📁 Direktori Artikel Studio</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-slate-300">
              {posts.length} Total
            </span>
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Kelola seluruh artikel Radya Labs (Published, Draft, Under Review, & Archived) dengan auto-push ke Git repo.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchPosts}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            title="Muat Ulang"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={onNewArticle}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1793E8] to-[#29B6F6] px-4 py-2 text-xs font-extrabold text-white shadow-lg transition hover:brightness-110 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>+ Buat Artikel Baru</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`flex items-center justify-between rounded-xl border p-3.5 text-xs font-semibold ${
            feedback.type === 'ok'
              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
              : 'border-rose-500/30 bg-rose-950/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'ok' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0f141e] p-3.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              activeFilter === 'all'
                ? 'bg-white/15 text-white shadow'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Semua ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('published')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              activeFilter === 'published'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-emerald-300'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Published ({counts.published})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('draft')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              activeFilter === 'draft'
                ? 'bg-slate-500/20 text-slate-200 border border-slate-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span>Draft ({counts.draft})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('under_review')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              activeFilter === 'under_review'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-orange-300'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            <span>Under Review ({counts.under_review})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('archived')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              activeFilter === 'archived'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-amber-300'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Archived ({counts.archived})</span>
          </button>
        </div>

        {/* Search Box */}
        <div className="relative min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, slug, atau tag…"
            className="w-full rounded-xl border border-white/10 bg-[#0b0e14] py-1.5 pl-9 pr-3 text-xs text-slate-200 outline-none placeholder:text-slate-500 focus:border-[#1793E8]"
          />
        </div>
      </div>

      {/* Grid of Article Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#1793E8]" />
          <p className="text-sm font-semibold">Memuat artikel…</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0f141e] p-12 text-center">
          <FileText className="mx-auto mb-3 h-10 w-10 text-slate-600" />
          <h3 className="text-sm font-bold text-slate-300">
            Tidak ada artikel yang sesuai.
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {searchQuery
              ? `Tidak ditemukan artikel dengan kata kunci "${searchQuery}".`
              : 'Belum ada artikel pada kategori filter ini.'}
          </p>
          <button
            type="button"
            onClick={onNewArticle}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
          >
            <Plus className="h-3.5 w-3.5" /> Buat Artikel Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const st = post.status.toLowerCase();
            const statusConfig = STATUS_CONFIG[st] || STATUS_CONFIG.draft;

            return (
              <div
                key={post.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f141e] transition-all hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/5"
              >
                {/* Cover Image Container */}
                <div
                  onClick={() => setPreviewArticle(post)}
                  className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  {post.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover}
                      alt={post.titleId}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-sky-950 p-4 text-center">
                      <FileText className="h-8 w-8 text-slate-600" />
                    </div>
                  )}

                  {/* Status Overlay Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${statusConfig.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
                      <span>{statusConfig.label}</span>
                    </span>
                  </div>

                  {/* Category Pill Overlay */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-md">
                      {post.categoryId || 'INSIGHT'}
                    </span>
                  </div>

                  {/* Hover Quick Preview Hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                      <Eye className="h-3.5 w-3.5" /> Buka Fullscreen
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#1793E8]" />
                      <span>{post.date || '—'}</span>
                    </span>
                    <span className="truncate max-w-[140px] text-slate-500 font-mono text-[10px]">
                      {post.slug}
                    </span>
                  </div>

                  {/* Title (ID) */}
                  <h3
                    onClick={() => setPreviewArticle(post)}
                    className="line-clamp-2 text-sm font-bold text-white transition hover:text-[#29B6F6] cursor-pointer"
                  >
                    {post.titleId}
                  </h3>

                  {/* Title EN if different */}
                  {post.titleEn && post.titleEn !== post.titleId && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-400 italic">
                      EN: {post.titleEn}
                    </p>
                  )}

                  {/* Excerpt */}
                  {post.excerptId && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                      {post.excerptId}
                    </p>
                  )}

                  {/* Card Bottom Controls */}
                  <div className="mt-auto border-t border-white/5 pt-3 flex items-center justify-between">
                    {/* Status Select on Card */}
                    <div className="relative">
                      <select
                        value={st}
                        onChange={(e) =>
                          handleStatusChange(post.slug, e.target.value as PostStatus)
                        }
                        className="rounded-lg border border-white/10 bg-[#0b0e14] py-1 pl-2 pr-6 text-[11px] font-bold text-slate-300 outline-none hover:border-sky-500 cursor-pointer"
                      >
                        {POST_STATUSES.map((s) => (
                          <option key={s.value} value={s.value} className="bg-[#0b0e14]">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEditArticle(post)}
                        title="Edit Artikel"
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-sky-500/20 hover:text-sky-300"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => confirmDeleteArticle(post.slug)}
                        title="Hapus Artikel"
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-500/20 hover:text-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Article Preview Modal */}
      <FullscreenArticleModal
        isOpen={Boolean(previewArticle)}
        onClose={() => setPreviewArticle(null)}
        article={previewArticle}
        onEdit={(art) => onEditArticle(art)}
        onStatusChange={handleStatusChange}
        onDelete={(slug) => confirmDeleteArticle(slug)}
      />

      {/* Confirmation Modal */}
      <ConfirmActionModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        variant={confirmModal.variant}
        loading={actionLoading}
        onConfirm={confirmModal.action}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
