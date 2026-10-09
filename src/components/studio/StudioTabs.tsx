'use client';

import React, { useState } from 'react';
import { FolderOpen, PenLine, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BlogCreateForm } from './BlogCreateForm';
import { StudioDirectory } from './StudioDirectory';
import type { FullscreenArticleData } from './FullscreenArticleModal';

type StudioTab = 'directory' | 'write';

export function StudioTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StudioTab>('directory');
  const [editingArticle, setEditingArticle] =
    useState<FullscreenArticleData | null>(null);
  const [editNonce, setEditNonce] = useState(0);
  // Bump untuk me-refresh direktori setelah ada simpan/ubah/hapus.
  const [directoryKey, setDirectoryKey] = useState(0);

  function handleNewArticle() {
    setEditingArticle(null);
    setActiveTab('write');
  }

  function handleEditArticle(article: FullscreenArticleData) {
    setEditingArticle(article);
    setEditNonce((n) => n + 1);
    setActiveTab('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSaved() {
    setDirectoryKey((k) => k + 1);
  }

  function handleSavedAndBack() {
    handleSaved();
    setEditingArticle(null);
    setActiveTab('directory');
  }

  function handleCancelEdit() {
    setEditingArticle(null);
  }

  async function handleLogout() {
    await fetch('/api/studio/logout', { method: 'POST' });
    router.push('/studio/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100">
      {/* Studio top nav: tab Direktori & Tulis Baru */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0e14]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="mr-2">
            <p className="text-base font-extrabold tracking-tight">
              Studio Radya Labs
            </p>
            <p className="text-[11px] text-slate-500">
              Kelola artikel · auto-push ke Git
            </p>
          </div>

          <nav className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeTab === 'directory'
                  ? 'bg-[#1793E8] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              📁 Direktori Artikel
            </button>
            <button
              type="button"
              onClick={handleNewArticle}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeTab === 'write'
                  ? 'bg-[#1793E8] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenLine className="h-4 w-4" />
              ✍️ Tulis Artikel Baru
            </button>
          </nav>

          {activeTab === 'write' && editingArticle && (
            <span className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-300">
              Mengedit: {editingArticle.slug}
            </span>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title="Keluar dari Studio"
            className="ml-auto rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {activeTab === 'directory' ? (
          <StudioDirectory
            key={directoryKey}
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
          />
        ) : (
          <BlogCreateForm
            initialArticle={editingArticle}
            editNonce={editNonce}
            onSaved={handleSavedAndBack}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </main>
    </div>
  );
}
