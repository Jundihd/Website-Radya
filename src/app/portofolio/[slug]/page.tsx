import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/data';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { CaseStudyClientView } from './CaseStudyClientView';

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

      <CaseStudyClientView study={study} />
    </>
  );
}
