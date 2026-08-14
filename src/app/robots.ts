import { MetadataRoute } from 'next';
import { COMPANY_CONFIG } from '@/lib/company-info';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Modern Search & AI Retrieval / Citation Crawlers (GEO Optimization)
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${COMPANY_CONFIG.url}/sitemap.xml`,
    host: COMPANY_CONFIG.url,
  };
}
