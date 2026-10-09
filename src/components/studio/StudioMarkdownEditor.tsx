'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  Link2,
  List,
  ListOrdered,
  Quote,
  Code,
  PenLine,
  Eye,
  Loader2,
  ImagePlus,
  Video,
  X,
  Upload,
  Check,
} from 'lucide-react';

interface StudioMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  slugHint?: string;
}

export function StudioMarkdownEditor({
  value,
  onChange,
  placeholder,
  minRows = 14,
  slugHint = 'blog-content',
}: StudioMarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [html, setHtml] = useState('');
  const [loadingPreview, setLoadingPreview] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  // History stack for Undo / Redo
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isHistoryAction = useRef(false);

  // Modals for Image and YouTube insertion
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Active state indicators
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    h2: false,
    h3: false,
    h4: false,
    bullet: false,
    numbered: false,
    quote: false,
    code: false,
  });

  // Track history
  useEffect(() => {
    if (isHistoryAction.current) {
      isHistoryAction.current = false;
      return;
    }
    // Only push if different from current history state
    if (history[historyIndex] !== value) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(value);
      if (newHistory.length > 50) newHistory.shift();
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [value, history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isHistoryAction.current = true;
      const prevVal = history[historyIndex - 1];
      setHistoryIndex((i) => i - 1);
      onChange(prevVal);
    }
  }, [historyIndex, history, onChange]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isHistoryAction.current = true;
      const nextVal = history[historyIndex + 1];
      setHistoryIndex((i) => i + 1);
      onChange(nextVal);
    }
  }, [historyIndex, history, onChange]);

  // Inspect cursor position to update active states
  const updateActiveStates = useCallback(() => {
    const el = areaRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const val = el.value;

    // 1. Current line inspection
    const lineStart = val.lastIndexOf('\n', s - 1) + 1;
    let lineEnd = val.indexOf('\n', s);
    if (lineEnd === -1) lineEnd = val.length;
    const currentLine = val.slice(lineStart, lineEnd);

    const isH2 = /^##\s/.test(currentLine);
    const isH3 = /^###\s/.test(currentLine);
    const isH4 = /^####\s/.test(currentLine);
    const isBullet = /^[-*]\s/.test(currentLine);
    const isNumbered = /^\d+\.\s/.test(currentLine);
    const isQuote = /^>\s/.test(currentLine);

    // 2. Inline enclosing inspection around cursor
    // Scan backwards from cursor for tags
    const beforeCursor = val.slice(0, s);
    const afterCursor = val.slice(e);

    const isBold =
      beforeCursor.lastIndexOf('**') !== -1 &&
      afterCursor.indexOf('**') !== -1 &&
      beforeCursor.lastIndexOf('**') > beforeCursor.lastIndexOf('\n');

    const isItalic =
      (beforeCursor.lastIndexOf('_') !== -1 && afterCursor.indexOf('_') !== -1) ||
      (beforeCursor.lastIndexOf('*') !== -1 && afterCursor.indexOf('*') !== -1);

    const isUnderline =
      beforeCursor.lastIndexOf('<u>') !== -1 &&
      afterCursor.indexOf('</u>') !== -1 &&
      beforeCursor.lastIndexOf('<u>') > beforeCursor.lastIndexOf('</u>');

    const isCode =
      beforeCursor.lastIndexOf('`') !== -1 &&
      afterCursor.indexOf('`') !== -1 &&
      beforeCursor.lastIndexOf('`') > beforeCursor.lastIndexOf('\n');

    setActiveStates({
      bold: Boolean(isBold),
      italic: Boolean(isItalic),
      underline: Boolean(isUnderline),
      h2: isH2,
      h3: isH3,
      h4: isH4,
      bullet: isBullet,
      numbered: isNumbered,
      quote: isQuote,
      code: Boolean(isCode),
    });
  }, []);

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
        updateActiveStates();
      });
    },
    [value, onChange, updateActiveStates],
  );

  const applyHeading = useCallback(
    (level: 2 | 3 | 4) => {
      const el = areaRef.current;
      if (!el) return;
      const { selectionStart: s } = el;
      const lineStart = value.lastIndexOf('\n', s - 1) + 1;
      let lineEnd = value.indexOf('\n', s);
      if (lineEnd === -1) lineEnd = value.length;

      const currentLine = value.slice(lineStart, lineEnd);
      const cleanLine = currentLine.replace(/^#{1,6}\s*/, '');
      const prefix = `${'#'.repeat(level)} `;
      const newLine = prefix + cleanLine;

      const next = value.slice(0, lineStart) + newLine + value.slice(lineEnd);
      onChange(next);

      requestAnimationFrame(() => {
        el.focus();
        const newPos = lineStart + prefix.length;
        el.setSelectionRange(newPos, newPos);
        updateActiveStates();
      });
    },
    [value, onChange, updateActiveStates],
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
        updateActiveStates();
      });
    },
    [value, onChange, updateActiveStates],
  );

  // Insert image markdown
  function handleInsertImage(url: string, altText: string) {
    const el = areaRef.current;
    if (!el) return;
    const { selectionStart: s } = el;
    const markdown = `\n![${altText || 'Gambar'}](${url})\n`;
    const next = value.slice(0, s) + markdown + value.slice(s);
    onChange(next);
    setIsImageModalOpen(false);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + markdown.length, s + markdown.length);
    });
  }

  // Insert YouTube video embed
  function handleInsertYoutube(videoId: string) {
    const el = areaRef.current;
    if (!el) return;
    const { selectionStart: s } = el;
    const embedHtml = `\n<div class="aspect-video w-full my-6 rounded-2xl overflow-hidden shadow-lg border border-white/10">\n  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n</div>\n`;
    const next = value.slice(0, s) + embedHtml + value.slice(s);
    onChange(next);
    setIsVideoModalOpen(false);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + embedHtml.length, s + embedHtml.length);
    });
  }

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
      setHtml(
        res.ok
          ? data.html || '<p><em>Konten kosong.</em></p>'
          : '<p>Gagal render preview.</p>',
      );
    } catch {
      setHtml('<p>Gagal render preview.</p>');
    } finally {
      setLoadingPreview(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e14]">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-[#151b26] p-1.5 sm:px-2.5">
        {tab === 'write' && (
          <>
            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5 border-r border-white/10 pr-1.5 mr-1">
              <button
                type="button"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                title="Undo (Ctrl+Z)"
                className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
              >
                <Undo2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                title="Redo (Ctrl+Y)"
                className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
              >
                <Redo2 className="h-4 w-4" />
              </button>
            </div>

            {/* Typography Formatting */}
            <div className="flex items-center gap-0.5 border-r border-white/10 pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => wrap('**', '**', 'teks tebal')}
                title="Bold (Tebal)"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.bold
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => wrap('_', '_', 'teks miring')}
                title="Italic (Miring)"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.italic
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => wrap('<u>', '</u>', 'teks bergaris bawah')}
                title="Underline (Garis Bawah)"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.underline
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <UnderlineIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Headings H2, H3, H4 */}
            <div className="flex items-center gap-0.5 border-r border-white/10 pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => applyHeading(2)}
                title="Heading 2 (Bagian Utama)"
                className={`rounded-lg px-2 py-1 text-xs font-black transition ${
                  activeStates.h2
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => applyHeading(3)}
                title="Heading 3 (Sub-bagian)"
                className={`rounded-lg px-2 py-1 text-xs font-black transition ${
                  activeStates.h3
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => applyHeading(4)}
                title="Heading 4 (Poin Spesifik)"
                className={`rounded-lg px-2 py-1 text-xs font-black transition ${
                  activeStates.h4
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                H4
              </button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex items-center gap-0.5 border-r border-white/10 pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => linePrefix('- ')}
                title="Bullet List"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.bullet
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => linePrefix('1. ')}
                title="Numbered List"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.numbered
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <ListOrdered className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => linePrefix('> ')}
                title="Quote"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.quote
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Quote className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => wrap('`', '`', 'kode')}
                title="Inline Code"
                className={`rounded-lg p-1.5 transition ${
                  activeStates.code
                    ? 'bg-[#1793E8] text-white shadow'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Code className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => wrap('[', '](https://)', 'teks tautan')}
                title="Sisipkan Link"
                className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Link2 className="h-4 w-4" />
              </button>
            </div>

            {/* Media Insert Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                title="Sisipkan Gambar di Tengah Tulisan"
                className="flex items-center gap-1 rounded-lg border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-300 transition hover:bg-sky-500/20"
              >
                <ImagePlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Gambar</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                title="Sisipkan Video YouTube Player"
                className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-300 transition hover:bg-red-500/20"
              >
                <Video className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">YouTube</span>
              </button>
            </div>
          </>
        )}

        {/* View Mode Tabs (Tulis / Preview) */}
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition ${
              tab === 'write'
                ? 'bg-white/15 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PenLine className="h-3.5 w-3.5" /> Tulis
          </button>
          <button
            type="button"
            onClick={openPreview}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition ${
              tab === 'preview'
                ? 'bg-white/15 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {tab === 'write' ? (
        <textarea
          ref={areaRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            updateActiveStates();
          }}
          onSelect={updateActiveStates}
          onClick={updateActiveStates}
          onKeyUp={updateActiveStates}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
              if (e.shiftKey) handleRedo();
              else handleUndo();
              e.preventDefault();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
              handleRedo();
              e.preventDefault();
            }
          }}
          placeholder={placeholder}
          rows={minRows}
          className="w-full bg-[#0b0e14] p-4 font-mono text-[13px] leading-relaxed text-slate-100 outline-none placeholder:text-slate-600 focus:ring-1 focus:ring-[#1793E8]"
        />
      ) : (
        <div className="max-h-[550px] min-h-[240px] overflow-y-auto bg-[#0b0e14] p-5">
          {loadingPreview ? (
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-[#1793E8]" />
              Merender preview…
            </p>
          ) : (
            <article
              className="prose-studio text-sm leading-relaxed text-slate-200"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      )}

      {/* Modal Sisipkan Gambar */}
      {isImageModalOpen && (
        <ImageInsertModal
          isOpen={isImageModalOpen}
          slugHint={slugHint}
          onClose={() => setIsImageModalOpen(false)}
          onInsert={handleInsertImage}
        />
      )}

      {/* Modal Sisipkan YouTube */}
      {isVideoModalOpen && (
        <YoutubeInsertModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          onInsert={handleInsertYoutube}
        />
      )}
    </div>
  );
}

/* ----------------------- Modal Insert Image ----------------------- */

function ImageInsertModal({
  isOpen,
  slugHint,
  onClose,
  onInsert,
}: {
  isOpen: boolean;
  slugHint: string;
  onClose: () => void;
  onInsert: (url: string, alt: string) => void;
}) {
  const [tab, setTab] = useState<'upload' | 'url'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('slug', `${slugHint}-content`);
      const res = await fetch('/api/studio/upload-cover', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload gagal.');
      }
      setImageUrl(data.cover);
      if (!altText) setAltText(file.name.replace(/\.[^/.]+$/, ''));
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar.');
    } finally {
      setUploading(false);
    }
  }

  function handleSave() {
    if (!imageUrl.trim()) {
      setError('URL atau file gambar belum diisi.');
      return;
    }
    onInsert(imageUrl.trim(), altText.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f141e] p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ImagePlus className="h-4 w-4 text-[#29B6F6]" />
            Sisipkan Gambar di Tengah Artikel
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-rose-500/15 p-2 text-xs font-semibold text-rose-300">
            {error}
          </p>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`flex-1 rounded-xl py-1.5 text-xs font-bold transition ${
              tab === 'url' ? 'bg-[#1793E8] text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            Link URL Gambar
          </button>
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`flex-1 rounded-xl py-1.5 text-xs font-bold transition ${
              tab === 'upload' ? 'bg-[#1793E8] text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            Upload dari Komputer
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {tab === 'url' ? (
            <div>
              <label className="text-xs font-semibold text-slate-300">
                Alamat URL Gambar (HTTPS)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... atau /images/..."
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b0e14] px-3.5 py-2 text-xs text-white outline-none focus:border-[#1793E8]"
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-slate-300">
                Pilih File Gambar dari Perangkat
              </label>
              <div className="mt-1 flex items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#0b0e14] p-4 text-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="text-xs text-slate-300 file:mr-2 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-white/20"
                />
              </div>
              {uploading && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-sky-400">
                  <Loader2 className="h-3 w-3 animate-spin" /> Mengupload gambar…
                </p>
              )}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300">
              Keterangan / Teks Alt (Opsional)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Contoh: Ilustrasi Arsitektur Microservices"
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b0e14] px-3.5 py-2 text-xs text-white outline-none focus:border-[#1793E8]"
            />
          </div>

          {imageUrl && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-36 w-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!imageUrl || uploading}
            className="rounded-xl bg-[#1793E8] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-[#29B6F6] disabled:opacity-50"
          >
            Sisipkan ke Artikel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Modal Insert YouTube ----------------------- */

function YoutubeInsertModal({
  isOpen,
  onClose,
  onInsert,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (videoId: string) => void;
}) {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function parseYoutubeId(input: string): string | null {
    const raw = input.trim();
    // 1. Regex standard watch?v=ID
    const matchWatch = raw.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (matchWatch) return matchWatch[1];

    // 2. Regex short youtu.be/ID
    const matchShort = raw.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (matchShort) return matchShort[1];

    // 3. Regex embed/ID or shorts/ID
    const matchEmbed = raw.match(/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
    if (matchEmbed) return matchEmbed[1];

    // 4. If user directly typed 11 character ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

    return null;
  }

  function handleUrlChange(val: string) {
    setUrl(val);
    setError('');
    const id = parseYoutubeId(val);
    setVideoId(id);
  }

  function handleSave() {
    const id = parseYoutubeId(url);
    if (!id) {
      setError('Link YouTube tidak valid. Gunakan format youtube.com/watch?v=... atau youtu.be/...');
      return;
    }
    onInsert(id);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f141e] p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Video className="h-4 w-4 text-red-400" />
            Sisipkan Video YouTube Player
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-rose-500/15 p-2 text-xs font-semibold text-rose-300">
            {error}
          </p>
        )}

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-300">
              Link URL Video YouTube
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... atau youtu.be/..."
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b0e14] px-3.5 py-2 text-xs text-white outline-none focus:border-red-500"
            />
          </div>

          {videoId && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Preview Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!videoId}
            className="rounded-xl bg-red-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
          >
            Sisipkan Player ke Artikel
          </button>
        </div>
      </div>
    </div>
  );
}
