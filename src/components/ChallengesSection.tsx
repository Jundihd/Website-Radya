'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
            {language === 'ID' ? 'Tantangan yang Kami Selesaikan' : 'Challenges We Solve'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
            {language === 'ID'
              ? 'Masalah nyata yang telah kami bantu klien atasi — bukan sekadar teori.'
              : "Real problems we've helped our clients overcome — not just theory."}
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
                <a
                  href={challenges[activeChallengeIndex].caseStudyHref}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1793E8] hover:text-[#0284C7] transition-colors tracking-wide uppercase group/link"
                >
                  <span>{challenges[activeChallengeIndex].caseStudyTag}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </a>

                {/* Subtle Dots Indicator */}
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
              <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2 pointer-events-none">
                {showcasePhotos.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-500 shadow-sm ${
                      idx === activePhotoIndex
                        ? 'w-8 bg-[#29B6F6]'
                        : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
