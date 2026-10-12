import { NextResponse } from 'next/server';
import { CASE_STUDIES, TESTIMONIALS } from '@/lib/data';
import { getDuePosts, postToInsightArticle } from '@/lib/posts';

export async function GET() {
  // Fully static — articles come from local Markdown, portfolios & testimonials
  // from src/lib/data.ts. No live Directus CMS fetch.
  // Hanya artikel yang sudah due (terjadwal yang waktunya tiba ikut muncul).
  const articles = getDuePosts().map(postToInsightArticle);

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
