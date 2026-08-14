import { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/lib/data';
import { COMPANY_CONFIG } from '@/lib/company-info';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = COMPANY_CONFIG.url;
  const currentDate = new Date();

  // Core Homepage Route
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Dynamic Portfolio Case Study Routes
  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.filter((study) =>
    Boolean(study.slug)
  ).map((study) => ({
    url: `${baseUrl}/portofolio/${study.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...routes, ...caseStudyRoutes];
}
