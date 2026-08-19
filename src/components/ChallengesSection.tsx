'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface ChallengesSectionProps {
  language: Language;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ language }) => {
  // 3 Showcase Photos for the Left Carousel
  const showcasePhotos = [
    {
      id: 'keynote',
      image: '/images/satya-keynote-radya.png',
      alt: 'Radya Labs Featured on Stage at Microsoft Keynote by Satya Nadella',
      badge: 'MICROSOFT GLOBAL KEYNOTE',
      title: {
        ID: 'Pengakuan Global Microsoft',
        EN: 'Global Microsoft Keynote Recognition',
      },
      description: {
        ID: 'Solusi Radya Labs dipresentasikan langsung di panggung utama Microsoft: Build the Intelligent Cloud Platform.',
        EN: 'Radya Labs solution highlighted live on Microsoft Mainstage: Build the Intelligent Cloud Platform.',
      },
    },
    {
      id: 'discussion',
      image: '/images/satya-radya-discussion.png',
      alt: 'Radya Labs Direct Technology Discussion with Microsoft CEO Satya Nadella',
      badge: 'STRATEGIC PARTNERSHIP',
      title: {
        ID: 'Dialog Strategis Bersama CEO Microsoft',
        EN: 'Strategic Dialogue with Microsoft CEO',
      },
      description: {
        ID: 'Diskusi arsitektur dan inovasi teknologi enterprise bersama Satya Nadella dan jajaran pemimpin industri.',
        EN: 'In-depth architectural and enterprise innovation dialogue with Satya Nadella and industry leaders.',
      },
    },
    {
      id: 'mosaic',
      image: '/images/radya-ecosystem-mosaic.png',
      alt: 'Radya Labs 15+ Years Tech Ecosystem, .NET Conf, and Awards',
      badge: '15+ YEARS EXCELLENCE',
      title: {
        ID: 'Ekosistem Engineer & Komunitas Inovasi',
        EN: 'Engineering Ecosystem & Innovation Community',
      },
      description: {
        ID: 'Lebih dari 15 tahun konsisten memimpin inovasi .NET Conf, riset AI, dan kolaborasi kementerian.',
        EN: 'Over 15 years pioneering .NET Conf conferences, AI research, and government digital transformation.',
      },
    },
  ];

  // 6 Challenges for the Right Carousel (No icons above bold title, as requested)
  const challenges = [
    {
      id: 'ojk-sikepo',
      title: {
        ID: 'Sistem legacy sulit dikembangkan dan dipelihara',
        EN: 'Legacy systems are hard to develop and maintain',
      },
      description: {
        ID: 'Arsitektur lama yang kaku dan minim dokumentasi sering menghambat penambahan fitur baru dan meningkatkan risiko downtime. Kami memodernisasi portal regulasi SIKePO untuk OJK dengan merombak arsitektur menjadi sistem web dan mobile modern yang lincah, aman, serta terintegrasi langsung dengan ketentuan perbankan nasional.',
        EN: 'Rigid legacy architectures and technical debt slow down feature rollouts and increase operational fragility. We modernized the SIKePO regulatory portal for OJK, refactoring the system into an agile, scalable web and mobile platform seamlessly connected to national banking provisions.',
      },
      caseStudyTag: 'CASE STUDY: OJK — SIKEPO',
      caseStudyHref: '#portofolio',
    },
    {
      id: 'biofarma-bioaudit',
      title: {
        ID: 'Proses manual memperlambat pekerjaan krusial',
        EN: 'Manual processes slow down critical work',
      },
      description: {
        ID: 'Pengelolaan alur kerja berbasis kertas dan verifikasi manual memakan ribuan jam kerja serta rawan kelalaian pencatatan. Bersama Bio Farma, kami membangun BioAudit — portal audit internal paperless berstandar IIA dengan alur persetujuan terotomatisasi dan penelusuran audit trail secara real-time.',
        EN: 'Manual paper-based processes and repetitive approvals consume thousands of valuable work hours and invite human error. With Bio Farma, we built BioAudit — an IIA-compliant paperless audit management platform featuring automated verification and real-time audit trails.',
      },
      caseStudyTag: 'CASE STUDY: BIOFARMA — BIOAUDIT',
      caseStudyHref: '#portofolio',
    },
    {
      id: 'imuni',
      title: {
        ID: 'Data operasional tersebar di banyak sistem',
        EN: 'Operational data scattered across many systems',
      },
      description: {
        ID: 'Informasi yang terfragmentasi di berbagai aplikasi internal menyulitkan konsolidasi data dan memperlambat pengambilan keputusan strategis. Melalui platform terpadu IMUNI, kami mengintegrasikan rekam medis pasien, logistik persediaan vaksin, dan pemesanan layanan ke dalam satu data hub terpusat yang sinkron dan aman.',
        EN: "Operational data isolated across siloed systems prevents unified visibility and hampers rapid decision-making. Through IMUNI's integrated digital platform, we unified electronic health records, vaccine inventory logistics, and booking workflows into a single centralized, secure data hub.",
      },
      caseStudyTag: 'CASE STUDY: IMUNI — IMUNI',
      caseStudyHref: '#portofolio',
    },
    {
      id: 'pusmendik-anbk',
      title: {
        ID: 'Sistem tidak dapat berskala untuk peluncuran nasional',
        EN: "Systems can't scale for a nationwide rollout",
      },
      description: {
        ID: 'Infrastruktur konvensional kerap gagal menangani lonjakan traffic masif secara mendadak saat peluncuran berskala nasional. Pada platform ANBK Pusmendik Kemendikbudristek, kami merancang arsitektur distributed cloud berkinerja tinggi dengan auto-scaling yang andal melayani jutaan peserta ujian di ribuan sekolah serentak tanpa downtime.',
        EN: 'Legacy infrastructure frequently bottlenecks or crashes under sudden nationwide traffic surges. On the ANBK platform for Pusmendik Kemendikbudristek, we engineered a high-concurrency distributed cloud architecture with instant auto-scaling, reliably powering exams for millions of students nationwide.',
      },
      caseStudyTag: 'CASE STUDY: PUSMENDIK — ANBK',
      caseStudyHref: '#portofolio',
    },
    {
      id: 'anteraja-aware',
      title: {
        ID: 'Tim IT internal kekurangan kapasitas untuk mengimbangi',
        EN: 'Internal IT team lacks capacity to keep up',
      },
      description: {
        ID: 'Laju ekspansi bisnis yang pesat sering kali melampaui ketersediaan resource dan keahlian spesifik tim engineering in-house. Radya Labs berkolaborasi erat dengan Anteraja sebagai extended engineering squad untuk mengakselerasi arsitektur dan delivery aplikasi logistik cerdas Anteraja Aware tepat waktu.',
        EN: 'Fast-paced market growth often outpaces in-house engineering capacity and specialized technical skillsets. Radya Labs partnered with Anteraja as a dedicated co-engineering partner to accelerate the architecture and delivery of the smart logistics platform Anteraja Aware on schedule.',
      },
      caseStudyTag: 'CASE STUDY: ANTERAJA — ANTERAJA AWARE',
      caseStudyHref: '#portofolio',
    },
    {
      id: 'biofarma-bismart',
      title: {
        ID: 'Pelaporan risiko & kepatuhan sulit dilacak',
        EN: 'Risk & compliance reporting is hard to track',
      },
      description: {
        ID: 'Pemantauan risiko dan kepatuhan regulasi secara parsial menyulitkan mitigasi masalah sebelum berdampak pada operasional perusahaan. Melalui sistem BI-SMART Bio Farma, kami menghadirkan dashboard tata kelola risiko terpadu dengan analitik prediktif dan tracking kepatuhan enterprise yang transparan.',
        EN: "Fragmented risk monitoring makes it difficult to detect anomalies and enforce compliance before operational disruptions occur. Through Bio Farma's BI-SMART, we delivered an enterprise risk governance dashboard equipped with proactive mitigation workflows and real-time compliance tracking.",
      },
      caseStudyTag: 'CASE STUDY: BIOFARMA — BI-SMART',
      caseStudyHref: '#portofolio',
    },
  ];

  // Left Photo Carousel State
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  // Right Challenge Cards Carousel State
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isChallengeHovered, setIsChallengeHovered] = useState(false);

  // Left Photo Auto-Rotate Timer (Every 5 seconds)
  useEffect(() => {
    if (isPhotoHovered) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % showcasePhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPhotoHovered, showcasePhotos.length]);

  // Right Challenge Cards Auto-Rotate Timer (Every 4.5 seconds)
  useEffect(() => {
    if (isChallengeHovered) return;
    const timer = setInterval(() => {
      setActiveChallengeIndex((prev) => (prev + 1) % challenges.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isChallengeHovered, challenges.length]);

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + showcasePhotos.length) % showcasePhotos.length);
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % showcasePhotos.length);
  };

  const handlePrevChallenge = () => {
    setActiveChallengeIndex((prev) => (prev - 1 + challenges.length) % challenges.length);
  };

  const handleNextChallenge = () => {
    setActiveChallengeIndex((prev) => (prev + 1) % challenges.length);
  };

  return (
    <section id="solusi" className="py-20 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#1793E8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#43D3A4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'KEAHLIAN RADYA LABS' : 'RADYA LABS EXPERTISE'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                {language === 'ID' ? 'Tantangan yang Kami Selesaikan' : 'Challenges We Solve'}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                {language === 'ID'
                  ? 'Masalah nyata yang telah kami bantu klien atasi — bukan sekadar teori.'
                  : "Real problems we've helped our clients overcome — not just theory."}
              </p>
            </div>

            {/* Quick Navigation Dots */}
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1793E8] animate-pulse" />
              <span>{language === 'ID' ? 'Auto-Scrolling Showcase' : 'Live Rotating Showcase'}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Left Photo Carousel & Right Challenges Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: 3 Showcase Photos Auto-Rotating Carousel                       */}
          {/* ========================================================================= */}
          <div
            className="lg:col-span-5 flex flex-col"
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xl flex-1 flex flex-col justify-between min-h-[420px] sm:min-h-[480px] group">
              {/* Photo Slides Container */}
              <div className="absolute inset-0 z-0">
                {showcasePhotos.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      idx === activePhotoIndex
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 pointer-events-none z-0'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    {/* Dark gradient overlay for optimal text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20" />
                  </div>
                ))}
              </div>

              {/* Top Bar on Photo: Badge & Navigation Controls */}
              <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#00D285] animate-ping" />
                  <span>{showcasePhotos[activePhotoIndex].badge}</span>
                </div>

                {/* Next/Prev Arrow Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevPhoto}
                    aria-label="Previous Showcase Photo"
                    className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    aria-label="Next Showcase Photo"
                    className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Content on Photo: Title, Subtitle, & Dot Indicators */}
              <div className="relative z-20 p-6 sm:p-7">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 drop-shadow-md leading-tight">
                    {showcasePhotos[activePhotoIndex].title[language]}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed drop-shadow-sm max-w-md font-medium">
                    {showcasePhotos[activePhotoIndex].description[language]}
                  </p>
                </div>

                {/* Progress Indicators & Dots */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    {showcasePhotos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        aria-label={`Jump to photo slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activePhotoIndex
                            ? 'w-8 bg-[#29B6F6]'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase">
                    {activePhotoIndex + 1} / {showcasePhotos.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: Challenges Auto-Rotating Carousel (NO ICONS, BOLD TITLE ONLY) */}
          {/* ========================================================================= */}
          <div
            className="lg:col-span-7 flex flex-col justify-between"
            onMouseEnter={() => setIsChallengeHovered(true)}
            onMouseLeave={() => setIsChallengeHovered(false)}
          >
            {/* Top Navigation & Status Bar */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  {language === 'ID' ? 'KASUS NYATA KLIEN' : 'REAL CLIENT CASES'}
                </span>
                <span className="text-xs font-bold text-[#1793E8]">
                  ({activeChallengeIndex + 1} of {challenges.length})
                </span>
              </div>

              {/* Arrow Controls for Right Carousel */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevChallenge}
                  aria-label="Previous Challenge"
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-xs transition-all active:scale-95 flex items-center justify-center hover:border-[#1793E8]/40 hover:text-[#1793E8]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextChallenge}
                  aria-label="Next Challenge"
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-xs transition-all active:scale-95 flex items-center justify-center hover:border-[#1793E8]/40 hover:text-[#1793E8]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Container (Card Carousel with Smooth Transition & Right Scroll Feed) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-slate-50 border border-slate-200/90 shadow-xl p-7 sm:p-9 flex-1 flex flex-col justify-between group transition-all duration-300">
              
              {/* Subtle Top Gradient Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1793E8] via-[#29B6F6] to-[#43D3A4]" />

              {/* Challenge Content (Bold Title Highlight + Narrative Explanation) */}
              <div className="transition-all duration-500 ease-out">
                {/* Title Highlight (No Icon Box Above, as requested) */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight leading-snug mb-4 transition-colors">
                  {challenges[activeChallengeIndex].title[language]}
                </h3>

                {/* Narrative Explanation */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
                  {challenges[activeChallengeIndex].description[language]}
                </p>
              </div>

              {/* Bottom Action Footer & Case Study Tag */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={challenges[activeChallengeIndex].caseStudyHref}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1793E8] hover:text-[#0284C7] transition-colors tracking-wide uppercase group/link"
                >
                  <span>{challenges[activeChallengeIndex].caseStudyTag}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </a>

                {/* Step / Slide Dots Indicator */}
                <div className="flex items-center gap-1.5">
                  {challenges.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveChallengeIndex(idx)}
                      aria-label={`Go to challenge ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeChallengeIndex
                          ? 'w-7 bg-[#1793E8]'
                          : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Carousel Preview Thumbnails / Mini-Cards Below */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {challenges.slice(0, 3).map((item, idx) => {
                const isActive = activeChallengeIndex === idx || (activeChallengeIndex >= 3 && idx === activeChallengeIndex % 3);
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveChallengeIndex(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                      activeChallengeIndex === idx
                        ? 'bg-white border-[#1793E8] shadow-md -translate-y-0.5'
                        : 'bg-white/60 hover:bg-white border-slate-200/70 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-slate-800 line-clamp-1">
                      {item.title[language]}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-medium">
                      {item.caseStudyTag}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
