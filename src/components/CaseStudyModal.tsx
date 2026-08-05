'use client';
import React from 'react';
import { Language, CaseStudy } from '@/types';
import { X, CheckCircle2, TrendingUp, ShieldAlert, Cpu, Building2, ArrowRight } from 'lucide-react';

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
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Image */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
          <img
            src={study.image}
            alt={study.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-extrabold text-[#29B6F6] uppercase tracking-wider mb-2 inline-block">
                {study.category[language]}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {study.title[language]}
              </h2>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
          {study.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-black text-[#1793E8]">{m.value}</div>
              <div className="text-xs font-bold text-slate-600">{m.label[language]}</div>
            </div>
          ))}
        </div>

        {/* Challenge vs Solution Breakdown */}
        <div className="space-y-6 mb-8">
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{language === 'ID' ? 'Tantangan Bisnis (Business Challenge)' : 'Business Challenge'}</span>
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {study.challenge[language]}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-200">
            <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ID' ? 'Solusi Arsitektur Radya Labs' : 'Radya Labs Architectural Solution'}</span>
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {study.solution[language]}
            </p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            {language === 'ID' ? 'Teknologi & Stack Utama:' : 'Core Tech Stack:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50"
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
            <span>{language === 'ID' ? 'BANGUN SOLUSI SERUPA' : 'BUILD SIMILAR SOLUTION'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
