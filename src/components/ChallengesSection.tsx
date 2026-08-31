'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ChallengesSectionProps {
  language: Language;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ language }) => {
  // 6 Challenges for the Left Card
  const challenges = [
    {
      id: 'ojk-sikepo',
      title: {
        ID: 'Sistem legacy Anda terlalu berisiko untuk diubah',
        EN: 'Your legacy system is too risky to change',
      },
      description: {
        ID: 'Setiap permintaan fitur baru berubah menjadi negosiasi berbulan-bulan karena takut ada sistem yang jebol. Kami merombak portal regulasi perbankan OJK menjadi platform web dan mobile modern berkecepatan tinggi yang terindeks langsung dengan ketentuan perbankan nasional.',
        EN: 'Every new feature request turns into a three-month negotiation about what might break. We rebuilt OJK\'s banking regulation portal into a modern web and mobile platform, indexed to national banking provisions, with sub-second search.',
      },
      caseStudyTag: 'CASE STUDY: OJK — SIKEPO',
      caseStudyHref: '/portofolio/sikepo',
    },
    {
      id: 'biofarma-bioaudit',
      title: {
        ID: 'Proses manual memperlambat pekerjaan krusial Anda',
        EN: 'Your manual processes slow down critical work',
      },
      description: {
        ID: 'Pengelolaan alur kerja berbasis kertas dan verifikasi manual memakan ribuan jam kerja serta rawan kelalaian. Bersama Bio Farma, kami membangun BioAudit — portal audit internal paperless berstandar IIA dengan alur persetujuan terotomatisasi dan penelusuran audit trail real-time.',
        EN: 'Manual paper-based processes and repetitive approvals consume thousands of valuable work hours and invite human error. With Bio Farma, we built BioAudit — an IIA-compliant paperless audit management platform featuring automated verification and real-time audit trails.',
      },
      caseStudyTag: 'CASE STUDY: BIOFARMA — BIOAUDIT',
      caseStudyHref: '/portofolio/bioaudit',
    },
    {
      id: 'imuni',
      title: {
        ID: 'Data operasional Anda tersebar di banyak sistem',
        EN: 'Your operational data is scattered across many systems',
      },
      description: {
        ID: 'Informasi yang terfragmentasi di berbagai aplikasi internal menyulitkan konsolidasi data dan memperlambat keputusan strategis. Melalui platform terpadu IMUNI, kami mengintegrasikan rekam medis pasien, logistik persediaan vaksin, dan pemesanan layanan ke dalam satu data hub terpusat yang sinkron.',
        EN: 'Operational data isolated across siloed systems prevents unified visibility and hampers rapid decision-making. Through IMUNI\'s integrated digital platform, we unified electronic health records, vaccine inventory logistics, and booking workflows into a single centralized, secure data hub.',
      },
      caseStudyTag: 'CASE STUDY: IMUNI — IMUNI',
      caseStudyHref: '/portofolio/imuni',
    },
    {
      id: 'pusmendik-anbk',
      title: {
        ID: 'Sistem Anda tidak dapat berskala untuk rilis nasional',
        EN: 'Your system can\'t scale for a nationwide rollout',
      },
      description: {
        ID: 'Infrastruktur konvensional kerap gagal menangani lonjakan traffic masif saat peluncuran nasional. Pada platform ANBK Kemendikbudristek, kami merancang arsitektur cloud terdistribusi dengan auto-scaling yang andal melayani jutaan peserta ujian di ribuan sekolah serentak dengan 99.99% uptime.',
        EN: 'Legacy infrastructure frequently bottlenecks or crashes under sudden nationwide traffic surges. On the ANBK platform for Ministry of Education, we engineered a high-concurrency distributed cloud architecture with dynamic auto-scaling, reliably serving millions of students nationwide at 99.99% uptime.',
      },
      caseStudyTag: 'CASE STUDY: PUSMENDIK — ANBK',
      caseStudyHref: '/portofolio/anbk',
    },
    {
      id: 'anteraja-aware',
      title: {
        ID: 'Tim IT internal Anda kekurangan kapasitas untuk mengimbangi',
        EN: 'Your internal IT team lacks capacity to keep up',
      },
      description: {
        ID: 'Laju ekspansi bisnis sering kali melampaui ketersediaan resource dan keahlian spesifik tim engineering internal. Radya Labs berkolaborasi erat dengan Anteraja sebagai extended engineering squad untuk mengakselerasi arsitektur dan delivery platform logistik Anteraja Aware tepat waktu.',
        EN: 'Fast-paced market growth often outpaces in-house engineering capacity and specialized technical skillsets. Radya Labs partnered with Anteraja as a dedicated co-engineering partner to accelerate the architecture and delivery of the smart logistics platform Anteraja Aware on schedule.',
      },
      caseStudyTag: 'CASE STUDY: ANTERAJA — ANTERAJA AWARE',
      caseStudyHref: '/portofolio/anteraja-aware',
    },
    {
      id: 'biofarma-bismart',
      title: {
        ID: 'Pelaporan risiko & kepatuhan Anda sulit dilacak',
        EN: 'Your risk & compliance reporting is hard to track',
      },
      description: {
        ID: 'Pemantauan risiko parsial menyulitkan mitigasi masalah sebelum berdampak pada operasional. Melalui sistem BI-SMART Bio Farma, kami menghadirkan dashboard tata kelola risiko terpadu dengan analitik prediktif dan tracking kepatuhan enterprise real-time.',
        EN: 'Fragmented risk monitoring makes it difficult to detect anomalies and enforce compliance before operational disruptions occur. Through Bio Farma\'s BI-SMART, we delivered an enterprise risk governance dashboard equipped with proactive mitigation workflows and real-time compliance tracking.',
      },
      caseStudyTag: 'CASE STUDY: BIOFARMA — BI-SMART',
      caseStudyHref: '/portofolio/bi-smart',
    },
  ];

  // 3 Showcase Photos for the Right Side (Clean, Full Frame)
  const showcasePhotos = [
    {
      id: 'keynote',
      image: '/images/satya-keynote-radya.png',
      alt: 'Radya Labs Featured on Stage at Microsoft Keynote by Satya Nadella',
    },
    {
      id: 'discussion',
      image: '/images/satya-radya-discussion.png',
      alt: 'Radya Labs Direct Technology Discussion with Microsoft CEO Satya Nadella',
    },
    {
      id: 'mosaic',
      image: '/images/radya-ecosystem-mosaic.png',
      alt: 'Radya Labs 15+ Years Tech Ecosystem, .NET Conf, and Awards',
    },
  ];

  // Left Challenge Text State (Auto-Rotate)
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isChallengeHovered, setIsChallengeHovered] = useState(false);

  // Right Photo State (Auto-Rotate)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  // Auto-Rotate Challenge Text Every 4.5 Seconds
  useEffect(() => {
    if (isChallengeHovered) return;
    const timer = setInterval(() => {
      setActiveChallengeIndex((prev) => (prev + 1) % challenges.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isChallengeHovered, challenges.length]);

  // Auto-Rotate Photo Every 4.5 Seconds
  useEffect(() => {
    if (isPhotoHovered) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % showcasePhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPhotoHovered, showcasePhotos.length]);

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

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID' ? 'Enam Masalah Nyata yang Telah Kami Selesaikan' : 'Six Problems We\'ve Actually Solved'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl">
            {language === 'ID'
              ? 'Setiap poin berasal dari sistem klien asli yang dapat Anda telusuri. Temukan yang paling serupa dengan tantangan perusahaan Anda.'
              : 'Each one is a real client system you can look up. Find the one that sounds like yours.'}
          </p>
        </div>

        {/* 2-Column Balanced Layout: Left Text (Vertical), Right Photo (Full Frame) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: Vertical Challenges Card (TEKS DI KIRI, VERTIKAL KEBAWAH)     */}
          {/* ========================================================================= */}
          <div
            className="lg:col-span-6 flex flex-col"
            onMouseEnter={() => setIsChallengeHovered(true)}
            onMouseLeave={() => setIsChallengeHovered(false)}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-slate-50 border border-slate-200/90 shadow-xl p-8 sm:p-10 flex-1 flex flex-col justify-between group transition-all duration-300 min-h-[440px] sm:min-h-[500px]">
              
              {/* Subtle Top Gradient Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1793E8] via-[#29B6F6] to-[#43D3A4]" />

              {/* Challenge Content Area */}
              <div className="my-auto py-4">
                {/* Bold Highlight Title Only (No Icon Above) */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug mb-5 transition-colors">
                  {challenges[activeChallengeIndex].title[language]}
                </h3>

                {/* Narrative Explanation */}
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                  {challenges[activeChallengeIndex].description[language]}
                </p>
              </div>

              {/* Bottom Action Footer & Case Study Tag */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <Link
                  href={challenges[activeChallengeIndex].caseStudyHref}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1793E8] hover:text-[#0284C7] transition-colors tracking-wide uppercase group/link"
                >
                  <span>{challenges[activeChallengeIndex].caseStudyTag}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </Link>

                {/* Interactive Dots Indicator */}
                <div className="flex items-center gap-1">
                  {challenges.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveChallengeIndex(idx);
                      }}
                      aria-label={`Go to challenge ${idx + 1}`}
                      className="p-1.5 group cursor-pointer focus:outline-none"
                    >
                      <span
                        className={`block h-2.5 rounded-full transition-all duration-300 ${
                          idx === activeChallengeIndex
                            ? 'w-7 bg-[#1793E8]'
                            : 'w-2.5 bg-slate-300 group-hover:bg-slate-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: Large Clean Photo Carousel (FULL FRAME, TANPA TEKS & TOMBOL) */}
          {/* ========================================================================= */}
          <div
            className="lg:col-span-6 flex flex-col"
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden bg-slate-950/95 border border-slate-200/90 shadow-xl flex-1 flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
              
              {/* Photo Slides */}
              {showcasePhotos.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                    idx === activePhotoIndex
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  {/* Subtle Ambient Blurred Background for Aspect Ratio Harmony */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover blur-2xl opacity-25 scale-110"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Sharp Full-Frame Foreground Photo (No Cropping) */}
                  <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center z-10">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-contain rounded-2xl drop-shadow-2xl p-2"
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}

              {/* Bottom Clean Dots Indicator */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-1">
                {showcasePhotos.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(idx);
                    }}
                    aria-label={`Go to photo slide ${idx + 1}`}
                    className="p-1.5 group cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`block h-2.5 rounded-full transition-all duration-500 shadow-sm ${
                        idx === activePhotoIndex
                          ? 'w-8 bg-[#29B6F6]'
                          : 'w-2.5 bg-white/40 group-hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
