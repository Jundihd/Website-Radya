import { NextResponse } from 'next/server';
import { DIRECTUS_CMS_URL, fetchLiveCmsArticles, fetchLiveCmsPortfolios, fetchLiveCmsTestimonials } from '@/lib/directus';
import { INSIGHTS_ARTICLES, CASE_STUDIES, TESTIMONIALS } from '@/lib/data';

export async function GET() {
  try {
    const [liveArticles, livePortfolios, liveTestimonials] = await Promise.all([
      fetchLiveCmsArticles(),
      fetchLiveCmsPortfolios(),
      fetchLiveCmsTestimonials(),
    ]);

    const articles = liveArticles.length > 0 ? liveArticles : INSIGHTS_ARTICLES;
    const portfolios = CASE_STUDIES;
    const testimonials = liveTestimonials.length > 0 ? liveTestimonials : TESTIMONIALS;

    return NextResponse.json({
      status: 'online',
      headlessCMS: 'Directus CMS (Radya Labs Official)',
      directusUrl: DIRECTUS_CMS_URL,
      articlesCount: articles.length,
      portfoliosCount: portfolios.length,
      testimonialsCount: testimonials.length,
      isLive: liveArticles.length > 0 || livePortfolios.length > 0 || liveTestimonials.length > 0,
      articles,
      portfolios,
      testimonials,
    });
  } catch (error: any) {
    console.error('[CMS API] Route error:', error);
    return NextResponse.json({
      status: 'fallback',
      headlessCMS: 'Directus CMS (Radya Labs Official)',
      articlesCount: INSIGHTS_ARTICLES.length,
      portfoliosCount: CASE_STUDIES.length,
      testimonialsCount: TESTIMONIALS.length,
      isLive: false,
      articles: INSIGHTS_ARTICLES,
      portfolios: CASE_STUDIES,
      testimonials: TESTIMONIALS,
    });
  }
}
