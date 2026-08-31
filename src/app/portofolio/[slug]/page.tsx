import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/data';
import { fetchLiveCmsPortfolios } from '@/lib/directus';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { CaseStudy } from '@/types';
import { CaseStudyClientView } from './CaseStudyClientView';

interface PageProps {
  params: {
    slug: string;
  };
}

// Consolidate all static and live CMS portfolios
async function getAllPortfolios(): Promise<CaseStudy[]> {
  try {
    const cmsPortfolios = await fetchLiveCmsPortfolios();
    const merged = [...CASE_STUDIES];
    if (cmsPortfolios && cmsPortfolios.length > 0) {
      cmsPortfolios.forEach((cmsItem) => {
        const idx = merged.findIndex(
          (p) => p.id === cmsItem.id || p.slug === cmsItem.slug || p.id === cmsItem.slug
        );
        if (idx !== -1) {
          merged[idx] = { ...merged[idx], ...cmsItem };
        } else {
          merged.push(cmsItem);
        }
      });
    }
    return merged;
  } catch (err) {
    console.error('Error fetching portfolios for detail page:', err);
  }
  return CASE_STUDIES;
}

// Find study by slug or ID with robust decoding
async function findStudy(slugParam: string): Promise<CaseStudy | undefined> {
  const all = await getAllPortfolios();
  if (!slugParam) return undefined;

  const raw = slugParam.toLowerCase().trim();
  const decoded = decodeURIComponent(slugParam).toLowerCase().trim();

  return all.find((s) => {
    const sId = (s.id || '').toLowerCase().trim();
    const sSlug = (s.slug || '').toLowerCase().trim();
    return (
      sSlug === raw ||
      sId === raw ||
      sSlug === decoded ||
      sId === decoded ||
      (s.client && s.client.toLowerCase().replace(/\s+/g, '-') === raw)
    );
  });
}

// Generate static routes for all case studies at build time (SSG)
export async function generateStaticParams() {
  const all = await getAllPortfolios();
  const paths: { slug: string }[] = [];

  all.forEach((study) => {
    if (study.slug) paths.push({ slug: study.slug });
    if (study.id && study.id !== study.slug) paths.push({ slug: study.id });
  });

  return paths;
}

// Generate Dynamic SEO & OpenGraph Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = await findStudy(params.slug);

  if (!study) {
    return {
      title: 'Studi Kasus Tidak Ditemukan | Radya Labs',
      description: 'Halaman studi kasus yang Anda cari tidak ditemukan.',
    };
  }

  const titleText = typeof study.title === 'object' ? study.title.ID || study.title.EN : study.title;
  const summaryText = typeof study.summary === 'object' ? study.summary.ID || study.summary.EN : study.summary;
  const coverImage = study.image || (study.images && study.images[0]) || '/images/portfolio/anbk-1.png';

  const pageTitle = `${titleText} — Case Study | Radya Labs`;
  const pageDesc = summaryText;
  const canonicalUrl = `${COMPANY_CONFIG.url}/portofolio/${study.slug || study.id}`;
  const ogImage = coverImage.startsWith('http')
    ? coverImage
    : `${COMPANY_CONFIG.url}${coverImage}`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      study.client,
      titleText,
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
          alt: `${study.client} - ${titleText}`,
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

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const study = await findStudy(params.slug);

  if (!study) {
    notFound();
  }

  const titleText = typeof study.title === 'object' ? study.title.ID || study.title.EN : study.title;
  const summaryText = typeof study.summary === 'object' ? study.summary.ID || study.summary.EN : study.summary;
  const coverImage = study.image || (study.images && study.images[0]) || '/images/portfolio/anbk-1.png';

  // Case Study Schema JSON-LD (CreativeWork / Article)
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY_CONFIG.url}/portofolio/${study.slug || study.id}`,
    },
    headline: titleText,
    description: summaryText,
    image: coverImage.startsWith('http')
      ? coverImage
      : `${COMPANY_CONFIG.url}${coverImage}`,
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
        item: `${COMPANY_CONFIG.url}/portofolio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: titleText,
        item: `${COMPANY_CONFIG.url}/portofolio/${study.slug || study.id}`,
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

      <CaseStudyClientView study={study} />
    </>
  );
}
