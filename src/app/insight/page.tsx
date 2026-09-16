import React from 'react';
import type { Metadata } from 'next';
import { INSIGHTS_ARTICLES } from '@/lib/data';
import { fetchLiveCmsArticles } from '@/lib/directus';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { InsightArticle } from '@/types';
import { getAllPosts, postToInsightArticle, mergeArticlesWithMarkdown } from '@/lib/posts';
import { InsightListingClientView } from './InsightListingClientView';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Insight & Artikel Teknikal Enterprise | Radya Labs',
  description: 'Koleksi lengkap artikel arsitektur Cloud Native, AI & Machine Learning, DevOps, dan digital transformation dari Senior Solutions Architect Radya Labs.',
  keywords: [
    'Radya Labs Insight',
    'Artikel Cloud Native',
    'AI Software House Indonesia',
    'DevOps Best Practices',
    'Software Architecture Blog',
  ],
  alternates: {
    canonical: `${COMPANY_CONFIG.url}/insight`,
  },
  openGraph: {
    title: 'Insight & Artikel Teknikal Enterprise | Radya Labs',
    description: 'Koleksi lengkap artikel arsitektur Cloud Native, AI, dan DevOps dari tim Radya Labs.',
    url: `${COMPANY_CONFIG.url}/insight`,
    siteName: 'Radya Labs',
    type: 'website',
    locale: 'en_US',
  },
};

// MD-first: MD > Directus > statis fallback
async function getAllArticles(): Promise<InsightArticle[]> {
  try {
    const mdPosts = getAllPosts().map(postToInsightArticle);
    const cmsArticles = await fetchLiveCmsArticles();
    return mergeArticlesWithMarkdown(mdPosts, cmsArticles, INSIGHTS_ARTICLES);
  } catch (err) {
    console.error('Error fetching articles for insight hub page:', err);
    return INSIGHTS_ARTICLES;
  }
}

export default async function InsightHubPage() {
  const articles = await getAllArticles();

  return (
    <>
      <InsightListingClientView initialArticles={articles} />
    </>
  );
}
