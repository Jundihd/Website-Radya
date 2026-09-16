import { NextResponse } from 'next/server';
import { DIRECTUS_CMS_URL, fetchLiveCmsArticles, fetchLiveCmsPortfolios, fetchLiveCmsTestimonials, deduplicatePortfolios } from '@/lib/directus';
import { INSIGHTS_ARTICLES, CASE_STUDIES, TESTIMONIALS } from '@/lib/data';
import { getAllPosts, postToInsightArticle, mergeArticlesWithMarkdown } from '@/lib/posts';

export async function GET() {
  try {
    // MD-first: MD > Directus > statis fallback
    const mdPosts = getAllPosts().map(postToInsightArticle);
    const [cmsArticles, livePortfolios, liveTestimonials] = await Promise.all([
      fetchLiveCmsArticles(),
      fetchLiveCmsPortfolios(),
      fetchLiveCmsTestimonials(),
    ]);

    const articles = mergeArticlesWithMarkdown(mdPosts, cmsArticles, INSIGHTS_ARTICLES);

    // Deduplicate portfolios so ANBK, Tokoparts, etc. only appear ONCE without duplicates
    const combinedPortfolios = [...CASE_STUDIES, ...livePortfolios];
    const portfolios = deduplicatePortfolios(combinedPortfolios);

    const testimonials = liveTestimonials.length > 0 ? liveTestimonials : TESTIMONIALS;

    return NextResponse.json({
      status: 'online',
      headlessCMS: 'MD-first + Directus CMS',
      directusUrl: DIRECTUS_CMS_URL,
      articlesCount: articles.length,
      portfoliosCount: portfolios.length,
      testimonialsCount: testimonials.length,
      isLive: mdPosts.length > 0 || cmsArticles.length > 0 || livePortfolios.length > 0 || liveTestimonials.length > 0,
      articles,
      portfolios,
      testimonials,
    });
  } catch (error: any) {
    console.error('[CMS API] Route error:', error);
    const mdPosts = getAllPosts().map(postToInsightArticle);
    return NextResponse.json({
      status: 'fallback',
      headlessCMS: 'MD-first + Directus CMS',
      articlesCount: mdPosts.length + INSIGHTS_ARTICLES.length,
      portfoliosCount: CASE_STUDIES.length,
      testimonialsCount: TESTIMONIALS.length,
      isLive: false,
      articles: mergeArticlesWithMarkdown(mdPosts, [], INSIGHTS_ARTICLES),
      portfolios: deduplicatePortfolios(CASE_STUDIES),
      testimonials: TESTIMONIALS,
    });
  }
}
