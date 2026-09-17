import { NextResponse } from 'next/server';
import { DIRECTUS_CMS_URL, fetchLiveCmsPortfolios, fetchLiveCmsTestimonials, deduplicatePortfolios } from '@/lib/directus';
import { CASE_STUDIES, TESTIMONIALS } from '@/lib/data';
import { getAllPosts, postToInsightArticle } from '@/lib/posts';

export async function GET() {
  try {
    // Git-based Markdown CMS: artikel diambil langsung dari content/posts/*.md
    const articles = getAllPosts().map(postToInsightArticle);
    const [livePortfolios, liveTestimonials] = await Promise.all([
      fetchLiveCmsPortfolios(),
      fetchLiveCmsTestimonials(),
    ]);

    // Deduplicate portfolios so ANBK, Tokoparts, etc. only appear ONCE without duplicates
    const combinedPortfolios = [...CASE_STUDIES, ...livePortfolios];
    const portfolios = deduplicatePortfolios(combinedPortfolios);

    const testimonials = liveTestimonials.length > 0 ? liveTestimonials : TESTIMONIALS;

    return NextResponse.json({
      status: 'online',
      headlessCMS: 'Git-based Markdown CMS + Directus CMS',
      directusUrl: DIRECTUS_CMS_URL,
      articlesCount: articles.length,
      portfoliosCount: portfolios.length,
      testimonialsCount: testimonials.length,
      isLive: articles.length > 0 || livePortfolios.length > 0 || liveTestimonials.length > 0,
      articles,
      portfolios,
      testimonials,
    });
  } catch (error: any) {
    console.error('[CMS API] Route error:', error);
    const articles = getAllPosts().map(postToInsightArticle);
    return NextResponse.json({
      status: 'fallback',
      headlessCMS: 'Git-based Markdown CMS + Directus CMS',
      articlesCount: articles.length,
      portfoliosCount: CASE_STUDIES.length,
      testimonialsCount: TESTIMONIALS.length,
      isLive: false,
      articles,
      portfolios: deduplicatePortfolios(CASE_STUDIES),
      testimonials: TESTIMONIALS,
    });
  }
}
