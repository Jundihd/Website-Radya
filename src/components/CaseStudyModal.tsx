'use client';
import React, { useState, useEffect } from 'react';
import { Language, CaseStudy } from '@/types';
import {
  X,
  ShieldAlert,
  Cpu,
  Building2,
  ArrowRight,
  CheckCircle2,
  Layers,
  Image as ImageIcon,
  ZoomIn,
  Maximize2
} from 'lucide-react';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  language: Language;
  onOpenContact: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  language,
  onOpenContact,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Lock background body scroll ONLY when modal is actively open
  useEffect(() => {
    if (study) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [study]);

  // Close lightbox or modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewImage, onClose]);

  if (!study) return null;

  const heroImages = study.images && study.images.length > 0 ? study.images : (study.image ? [study.image] : []);
  const extraScreenshots = study.screenshots && study.screenshots.length > 0 ? study.screenshots : [];
  const allScreenshots = Array.from(new Set([...heroImages, ...extraScreenshots]));

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain cursor-pointer"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[92vh] overflow-y-auto overscroll-contain cursor-default"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
            title={language === 'ID' ? 'Tutup modal' : 'Close modal'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Header Image */}
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-inner bg-slate-900">
            <img
              src={study.image}
              alt={study.title[language]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] sm:text-xs font-extrabold text-[#29B6F6] uppercase tracking-wider border border-white/10">
                  {study.category[language]}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white">
                  {study.client}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {study.title[language]}
              </h2>
            </div>
          </div>

          {/* Short Description / Summary */}
          {study.summary[language] && (
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed">
              {study.summary[language]}
            </div>
          )}

          {/* Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
            {study.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl sm:text-2xl font-black text-[#1793E8]">{m.value}</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600">{m.label[language]}</div>
              </div>
            ))}
          </div>

          {/* Challenge vs Solution Breakdown */}
          <div className="space-y-4 mb-6">
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-200">
              <h4 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>{language === 'ID' ? 'Tantangan Proyek (Project Challenge)' : 'Project Challenge'}</span>
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {study.challenge[language]}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-200">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ID' ? 'Solusi Radya Labs (Solution Delivered)' : 'Radya Labs Solution Delivered'}</span>
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {study.solution[language]}
              </p>
            </div>
          </div>

          {/* Key Features from CMS */}
          {study.featuresList && study.featuresList.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#1793E8]" />
                <span>{language === 'ID' ? 'Fitur Utama Aplikasi:' : 'Core Application Features:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {study.featuresList.map((feature, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feature.name[language]}</span>
                    </div>
                    {feature.description[language] && (
                      <p className="text-[11px] text-slate-600 leading-normal pl-5">
                        {feature.description[language]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables & Tech Tags */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {language === 'ID' ? 'Deliverables & Dokumen Proyek:' : 'Deliverables & Tech Artifacts:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(study.deliverables && study.deliverables.length > 0 ? study.deliverables : study.tags).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshots / Mockups Preview Grid */}
          {allScreenshots.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#1793E8]" />
                  <span>
                    {language === 'ID'
                      ? `Mockup & Tangkapan Layar Aplikasi (${allScreenshots.length} Foto):`
                      : `Application Mockups & Screenshots (${allScreenshots.length} Photos):`}
                  </span>
                </h4>
                <span className="text-[11px] text-[#1793E8] font-bold flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{language === 'ID' ? 'Klik foto untuk memperbesar' : 'Click photo to enlarge'}</span>
                </span>
              </div>

              <div className={`grid gap-4 ${allScreenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {allScreenshots.map((imgSrc, imgIdx) => (
                  <div
                    key={imgSrc + imgIdx}
                    onClick={() => setPreviewImage(imgSrc)}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 cursor-pointer h-52 sm:h-60 transition-all duration-300 hover:border-[#1793E8] hover:shadow-xl"
                  >
                    <img
                      src={imgSrc}
                      alt={`${study.title[language]} Mockup ${imgIdx + 1}`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-950/40 backdrop-blur-[2px]">
                      <div className="px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-extrabold flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-[#1793E8]" />
                        <span>{language === 'ID' ? 'Lihat Foto Penuh' : 'View Full Photo'}</span>
                      </div>
                    </div>

                    {/* Bottom Pill */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-bold text-white bg-slate-900/85 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10 truncate max-w-[70%]">
                        {study.title[language]} ({imgIdx + 1}/{allScreenshots.length})
                      </span>
                      <span className="text-[9px] font-bold text-[#29B6F6] bg-slate-900/85 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1 shrink-0">
                        <ZoomIn className="w-3 h-3" />
                        <span>{language === 'ID' ? 'Perbesar' : 'Enlarge'}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {language === 'ID' ? 'Tutup' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-radya text-white font-extrabold text-sm shadow-md hover:brightness-110 flex items-center justify-center gap-2"
            >
              <span>{language === 'ID' ? 'KONSULTASIKAN PROYEK ANDA' : 'CONSULT YOUR PROJECT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal Pop-up */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          {/* Close button (X) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewImage(null);
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all border border-white/20 shadow-2xl group cursor-pointer z-30"
            title={language === 'ID' ? 'Tutup foto (Esc)' : 'Close photo (Esc)'}
            aria-label="Close full photo view"
          >
            <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center cursor-default"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900 max-h-[82vh] flex items-center justify-center">
              <img
                src={previewImage}
                alt={`${study.title[language]} Full Screenshot`}
                className="max-w-full max-h-[82vh] w-auto h-auto object-contain select-none"
              />
            </div>

            {/* Bottom Caption & Dismiss Hint */}
            <div className="mt-3.5 flex items-center gap-3">
              <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/15 shadow-md">
                {study.title[language]} — {language === 'ID' ? 'Tangkapan Layar Resolusi Penuh' : 'Full Resolution Screenshot'}
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-white/10"
              >
                {language === 'ID' ? 'Tutup (X)' : 'Close (X)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
