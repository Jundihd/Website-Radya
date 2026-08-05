'use client';
import React from 'react';
import { Language } from '@/types';
import { Video } from 'lucide-react';

interface VideoSectionProps {
  language: Language;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ language }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Video className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'VIDEO PROFIL KAMI' : 'OUR PROFILE VIDEO'}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID' ? 'Lihat Radya Labs Beraksi' : 'See Radya Labs in Action'}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
            {language === 'ID'
              ? 'Sekilas tentang bagaimana kami merancang, membangun, dan menyampaikan produk digital untuk klien kami.'
              : 'A quick look at how we design, build, and deliver digital products for our clients.'}
          </p>
        </div>

        {/* Video Player Box */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-black aspect-video">
          <iframe
            className="w-full h-full border-0"
            src="https://www.youtube.com/embed/HK4W_kxK4KE?rel=0&modestbranding=1"
            title={language === 'ID' ? 'Lihat Radya Labs Beraksi' : 'See Radya Labs in Action'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
