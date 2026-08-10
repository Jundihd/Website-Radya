'use client';
import React from 'react';
import { Language } from '@/types';
import { Cpu, Clock, LayoutGrid, Globe, UserCheck, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface ChallengesSectionProps {
  language: Language;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ language }) => {
  const challenges = [
    {
      id: 'ojk-sikepo',
      icon: Cpu,
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
      icon: Clock,
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
      icon: LayoutGrid,
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
      icon: Globe,
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
      icon: UserCheck,
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
      icon: Shield,
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

  return (
    <section id="solusi" className="py-20 sm:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'KEAHLIAN RADYA LABS' : 'RADYA LABS EXPERTISE'}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID' ? 'Tantangan yang Kami Selesaikan' : 'Challenges We Solve'}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
            {language === 'ID'
              ? 'Masalah nyata yang telah kami bantu klien atasi — bukan sekadar teori.'
              : "Real problems we've helped our clients overcome — not just theory."}
          </p>
        </div>

        {/* Challenges 6-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {challenges.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100/90 shadow-xs hover:shadow-lg hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-200 shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug mb-3 group-hover:text-[#1793E8] transition-colors">
                    {item.title[language]}
                  </h3>

                  {/* Narrative Explanation connecting to Case Study */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {item.description[language]}
                  </p>
                </div>

                {/* Footer Link Tag */}
                <a
                  href={item.caseStudyHref}
                  className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] tracking-wider uppercase group-hover:text-[#1793E8] transition-colors"
                >
                  <span className="truncate pr-2">{item.caseStudyTag}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
