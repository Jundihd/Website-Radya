import { NextResponse } from 'next/server';
import { CASE_STUDIES, TESTIMONIALS } from '@/lib/data';
import { getAllPosts, postToInsightArticle } from '@/lib/posts';

export async function GET() {
  // Fully static — articles come from local Markdown, portfolios & testimonials
  // from src/lib/data.ts. No live Directus CMS fetch.
  const articles = getAllPosts().map(postToInsightArticle);

  return NextResponse.json({
    status: 'static',
    headlessCMS: 'Git-based Markdown CMS + static data',
    articlesCount: articles.length,
    portfoliosCount: CASE_STUDIES.length,
    testimonialsCount: TESTIMONIALS.length,
    isLive: false,
    articles,
    portfolios: CASE_STUDIES,
    testimonials: TESTIMONIALS,
  });
}
