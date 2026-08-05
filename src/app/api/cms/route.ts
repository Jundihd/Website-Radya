import { NextResponse } from 'next/server';
import { DIRECTUS_CMS_URL, fetchLiveCmsArticles } from '@/lib/directus';
import { INSIGHTS_ARTICLES } from '@/lib/data';

export async function GET() {
  try {
    const liveArticles = await fetchLiveCmsArticles();
    
    // If CMS returns articles, use them; otherwise fallback to static dataset
    const articles = liveArticles.length > 0 ? liveArticles : INSIGHTS_ARTICLES;

    return NextResponse.json({
      status: 'online',
      headlessCMS: 'Directus CMS (Radya Labs Official)',
      directusUrl: DIRECTUS_CMS_URL,
      count: articles.length,
      isLive: liveArticles.length > 0,
      articles,
    });
  } catch (error: any) {
    console.error('[CMS API] Route error:', error);
    return NextResponse.json({
      status: 'fallback',
      headlessCMS: 'Directus CMS (Radya Labs Official)',
      count: INSIGHTS_ARTICLES.length,
      isLive: false,
      articles: INSIGHTS_ARTICLES,
    });
  }
}
