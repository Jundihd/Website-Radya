'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { Video, Play, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface VideoSectionProps {
  language: Language;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'HK4W_kxK4KE';

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent('play_video', {
      video_title: 'Radya Labs Profile Video',
      video_id: videoId,
    });
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID' ? 'Lihat Radya Labs Beraksi' : 'See Radya Labs in Action'}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
            {language === 'ID'
              ? 'Sekilas tentang bagaimana kami merancang, membangun, dan menyampaikan produk digital kelas enterprise untuk klien kami.'
              : 'A quick look at how we architect, engineer, and deliver high-impact enterprise digital solutions.'}
          </p>
        </div>

        {/* Video Player Box - Performance Facade */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-black aspect-video group">
          {isPlaying ? (
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={language === 'ID' ? 'Lihat Radya Labs Beraksi' : 'See Radya Labs in Action'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div
              onClick={handlePlay}
              className="relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center"
            >
              {/* High Quality Video Thumbnail via next/image */}
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Radya Labs Profile Video Thumbnail"
                fill
                sizes="(max-width: 1280px) 100vw, 1024px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />

              {/* Dark Overlay with Mesh Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/70 transition-colors" />

              {/* Pulsing Play Button */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-radya p-0.5 shadow-2xl group-hover:scale-110 active:scale-95 transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center text-[#1793E8] shadow-inner pl-1">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#1793E8]" />
                  </div>
                </div>
                <span className="text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {language === 'ID' ? 'Klik untuk Memutar Video' : 'Click to Play Video'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
