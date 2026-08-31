'use client';
import React from 'react';
import { Language } from '@/types';
import { ArrowRight, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';

interface FinalCtaBannerProps {
  language: Language;
  onOpenContact: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({
  language,
  onOpenContact,
}) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="rounded-[36px] bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden border border-slate-800">

          {/* Abstract Cloud Mesh Graphic */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radya opacity-25 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#43D3A4] opacity-20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
              {language === 'ID' ? (
                <>
                  Jelaskan masalah Anda dalam beberapa kalimat — senior engineer kami akan merespons dalam 2 hari kerja.
                </>
              ) : (
                <>
                  Describe the problem in a few sentences — a senior engineer will read it and reply within two working days.
                </>
              )}
            </h2>

            {/* Paragraph */}
            <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-10">
              {language === 'ID'
                ? 'Tanpa paksaan sales, tanpa komitmen awal.'
                : 'No sales sequence, no obligation.'}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  trackCtaClick('Book Consultation', 'Final CTA Banner');
                  onOpenContact();
                }}
                className="bg-gradient-radya text-white font-extrabold text-base px-9 py-4 rounded-full shadow-xl hover:shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{language === 'ID' ? 'Bicara dengan Engineer Kami' : 'Talk to an Engineer'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
