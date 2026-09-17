import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { InsightArticle } from '@/types';
import { getAllPosts, postToInsightArticle, markdownToHtml } from '@/lib/posts';
import { InsightArticleClientView } from './InsightArticleClientView';

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 300; // Revalidate every 5 minutes
export const dynamicParams = true; // Allow dynamic article slugs from MD/CMS

// Helper to convert any string or URL to normalized comparison slug
function slugify(text: string): string {
  if (!text) return '';
  try {
    const decoded = decodeURIComponent(text);
    return decoded
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  } catch {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Git-based Markdown CMS: Membaca langsung dari content/posts/*.md
async function getAllArticles(): Promise<InsightArticle[]> {
  try {
    return getAllPosts().map(postToInsightArticle);
  } catch (err) {
    console.error('Error fetching articles for insight page:', err);
    return [];
  }
}

// Robust article lookup by slug, id, or title (handling dashes, spaces, and URL encoding)
function findArticle(targetSlug: string, articles: InsightArticle[]): InsightArticle | undefined {
  const normalizedTarget = slugify(targetSlug);
  return articles.find((a) => {
    if (a.slug === targetSlug || a.id === targetSlug) return true;
    if (a.slug && slugify(a.slug) === normalizedTarget) return true;
    if (a.id && slugify(a.id) === normalizedTarget) return true;
    if (a.title?.ID && slugify(a.title.ID) === normalizedTarget) return true;
    if (a.title?.EN && slugify(a.title.EN) === normalizedTarget) return true;
    return false;
  });
}

// Generate static routes for pre-rendering at build time
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug || slugify(article.title.ID) || article.id,
  }));
}

// Generate Dynamic SEO & OpenGraph Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const articles = await getAllArticles();
  const article = findArticle(params.slug, articles);

  if (!article) {
    return {
      title: 'Artikel Insight Tidak Ditemukan | Radya Labs',
      description: 'Halaman artikel insight yang Anda cari tidak ditemukan.',
    };
  }

  const pageTitle = `${article.title.ID} | Insight Radya Labs`;
  const pageDesc = article.summary.ID;
  const canonicalUrl = `${COMPANY_CONFIG.url}/insight/${article.slug || params.slug}`;
  const ogImage = article.image.startsWith('http')
    ? article.image
    : `${COMPANY_CONFIG.url}${article.image}`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      article.title.ID,
      typeof article.category === 'object' ? article.category.ID : article.category,
      ...(article.tags || []),
      'Radya Labs Insight',
      'Artikel Cloud Native',
      'AI Software House Indonesia',
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
          alt: article.title.ID,
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

export default async function InsightDetailPage({ params }: PageProps) {
  const articles = await getAllArticles();
  const article = findArticle(params.slug, articles);

  if (!article) {
    notFound();
  }

  // Render Markdown -> HTML server-side (MD-first)
  // MD posts have markdown in content.ID; Directus/static have HTML already
  const isMarkdown = !/<[a-z][\s\S]*>/i.test(article.content.ID);
  const contentHtml = isMarkdown
    ? await markdownToHtml(article.content.ID)
    : article.content.ID;

  // Article Schema JSON-LD (TechArticle)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY_CONFIG.url}/insight/${article.slug || params.slug}`,
    },
    headline: article.title.ID,
    description: article.summary.ID,
    image: article.image.startsWith('http')
      ? article.image
      : `${COMPANY_CONFIG.url}${article.image}`,
    author: {
      '@type': 'Organization',
      name: 'Radya Labs Principal Solutions Architect',
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
    datePublished: article.date,
    keywords: article.tags?.join(', '),
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
        name: 'Insight & Artikel',
        item: `${COMPANY_CONFIG.url}/insight`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title.ID,
        item: `${COMPANY_CONFIG.url}/insight/${article.slug || params.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <InsightArticleClientView article={article} contentHtml={contentHtml} />
    </>
  );
}
