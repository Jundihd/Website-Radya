import { NextResponse } from 'next/server';
import { DIRECTUS_CMS_URL, fetchLiveCmsArticles, fetchLiveCmsPortfolios } from '@/lib/directus';
import { INSIGHTS_ARTICLES, CASE_STUDIES } from '@/lib/data';

export async function GET() {
  try {
    const [liveArticles, livePortfolios] = await Promise.all([
      fetchLiveCmsArticles(),
      fetchLiveCmsPortfolios(),
    ]);

    const articles = liveArticles.length > 0 ? liveArticles : INSIGHTS_ARTICLES;
    const portfolios = livePortfolios.length > 0 ? livePortfolios : CASE_STUDIES;

    return NextResponse.json({
      status: 'online',
      headlessCMS: 'Directus CMS (Radya Labs Official)',
      directusUrl: DIRECTUS_CMS_URL,
      articlesCount: articles.length,
      portfoliosCount: portfolios.length,
      isLive: liveArticles.length > 0 || livePortfolios.length > 0,
      articles,
      portfolios,
    });
  } catch (error: any) {
    console.error('[CMS API] Route error:', error);
    return NextResponse.json({
      status: 'fallback',
      headlessCMS: 'Directus CMS (Radya Labs Official)',
      articlesCount: INSIGHTS_ARTICLES.length,
      portfoliosCount: CASE_STUDIES.length,
      isLive: false,
      articles: INSIGHTS_ARTICLES,
      portfolios: CASE_STUDIES,
    });
  }
}
