import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/data';
import { COMPANY_CONFIG } from '@/lib/company-info';
import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Server,
  ShieldCheck,
  Layers,
  ArrowRight,
  PhoneCall,
  ExternalLink,
  Award,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all case studies at build time (SSG)
export async function generateStaticParams() {
  return CASE_STUDIES.filter((study) => Boolean(study.slug)).map((study) => ({
    slug: study.slug as string,
  }));
}

// Generate Dynamic SEO & OpenGraph Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = CASE_STUDIES.find((s) => s.slug === params.slug);

  if (!study) {
    return {
      title: 'Studi Kasus Tidak Ditemukan | Radya Labs',
      description: 'Halaman studi kasus yang Anda cari tidak ditemukan.',
    };
  }

  const pageTitle = `${study.title.ID} — Case Study | Radya Labs`;
  const pageDesc = study.summary.ID;
  const canonicalUrl = `${COMPANY_CONFIG.url}/portofolio/${study.slug}`;
  const ogImage = study.image.startsWith('http')
    ? study.image
    : `${COMPANY_CONFIG.url}${study.image}`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      study.client,
      study.title.ID,
      ...(study.tags || []),
      'Radya Labs Case Study',
      'Cloud Native Solutions Indonesia',
      'AI Software House Bandung',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      siteName: 'Radya Labs',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${study.client} - ${study.title.ID}`,
        },
      ],
      type: 'article',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [ogImage],
    },
  };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = CASE_STUDIES.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  // Case Study Schema JSON-LD (CreativeWork / Article)
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY_CONFIG.url}/portofolio/${study.slug}`,
    },
    headline: study.title.ID,
    description: study.summary.ID,
    image: study.image.startsWith('http')
      ? study.image
      : `${COMPANY_CONFIG.url}${study.image}`,
    author: {
      '@type': 'Organization',
      name: 'Radya Labs Engineering Team',
      url: COMPANY_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: COMPANY_CONFIG.logo,
      },
    },
    about: {
      '@type': 'Organization',
      name: study.client,
    },
    keywords: study.tags?.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: COMPANY_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portofolio',
        item: `${COMPANY_CONFIG.url}/#portofolio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: study.title.ID,
        item: `${COMPANY_CONFIG.url}/portofolio/${study.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        {/* Sticky Header Navigation */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#1793E8] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Beranda</span>
            </Link>

            <Link href="/" className="flex items-center">
              <Image
                src="/images/logos/radya-logo.png"
                alt="Radya Labs"
                width={150}
                height={30}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>

            <Link
              href="/#kontak"
              className="bg-gradient-radya text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-sm hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Konsultasi Proyek</span>
            </Link>
          </div>
        </header>

        {/* Main Content Article */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-slate-700 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link href="/#portofolio" className="hover:text-slate-700 transition-colors">
              Portofolio & Studi Kasus
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[#1793E8] font-bold truncate max-w-xs">{study.title.ID}</span>
          </nav>

          {/* Hero Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-extrabold tracking-wider uppercase">
                {study.category.ID}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
                Klien: {study.client}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6">
              {study.title.ID}
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
              {study.summary.ID}
            </p>
          </header>

          {/* Key Impact Metric Cards */}
          {study.metrics && study.metrics.length > 0 && (
            <section aria-label="Key Impact Metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {study.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center relative overflow-hidden"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-gradient-radya mb-2">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {metric.label.ID}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Primary Featured Showcase Image */}
          <div className="relative w-full h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 mb-14 bg-slate-900">
            <Image
              src={study.image}
              alt={`${study.title.ID} — ${study.client}`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

          {/* 2-Column Core Architecture Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* Challenge Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">Tantangan Bisnis & Teknis</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {study.challenge.ID}
              </p>
            </div>

            {/* Solution Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">Solusi Arsitektur Radya Labs</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {study.solution.ID}
              </p>
            </div>
          </div>

          {/* Tech Stack & Ecosystem */}
          {study.tags && study.tags.length > 0 && (
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-14 shadow-xl border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-6 h-6 text-[#29B6F6]" />
                <h3 className="text-xl font-bold text-white">Teknologi & Ekosistem Terapan</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Studi kasus ini diimplementasikan menggunakan stack teknologi Cloud Native berstandar enterprise dengan otomasi CI/CD dan ISO 27001 Security compliance.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {study.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 hover:border-[#1793E8] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Visual Gallery if multiple screenshots exist */}
          {study.images && study.images.length > 1 && (
            <div className="mb-14">
              <h3 className="text-2xl font-extrabold text-[#0F172A] mb-6">Galeri Implementasi Sistem</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {study.images.slice(1).map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="relative h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${study.title.ID} Preview ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Client Testimonial / Credential Quote */}
          {study.testimonial && (
            <div className="bg-gradient-to-br from-[#1793E8]/10 via-white to-[#43D3A4]/10 rounded-3xl p-8 sm:p-10 border border-[#1793E8]/20 shadow-sm mb-14">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#1793E8] uppercase tracking-wider mb-4">
                <Award className="w-4 h-4" />
                <span>Testimoni Resmi Klien</span>
              </div>
              <blockquote className="text-base sm:text-lg italic font-medium text-slate-700 leading-relaxed mb-6">
                &ldquo;{study.testimonial.quote.ID}&rdquo;
              </blockquote>
              <div className="font-bold text-[#0F172A] text-sm">
                {study.testimonial.author} — <span className="text-slate-500 font-normal">{study.testimonial.role}</span>
              </div>
            </div>
          )}

          {/* Bottom Conversion CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] p-8 sm:p-12 text-white shadow-2xl text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-bold uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KONSULTASIKAN KEBUTUHAN ANDA</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Ingin Membangun Solusi Skala Enterprise Serupa?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
                Diskusikan arsitektur sistem, estimasi budget, dan timeline implementasi bersama Senior Principal Solutions Architect Radya Labs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/#kontak"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-radya text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Jadwalkan Konsultasi Gratis</span>
                </Link>
                <Link
                  href="/#portofolio"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Lihat Studi Kasus Lainnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
