import { InsightArticle } from '@/types';

/**
 * Directus Headless CMS SDK Client Initialization & Query Helper
 * Directus CMS operates on Node.js / TypeScript with PostgreSQL underlying database.
 */

export const DIRECTUS_CMS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.radyalabs.com';

export async function fetchDirectusCollection<T>(collection: string): Promise<T[]> {
  try {
    const res = await fetch(`${DIRECTUS_CMS_URL}/items/${collection}`, {
      next: { revalidate: 60 }, // Incremental Static Revalidation (ISR) for fast load
    });
    if (!res.ok) {
      throw new Error(`Directus CMS error HTTP ${res.status}`);
    }
    const json = await res.json();
    return json.data as T[];
  } catch (error) {
    console.warn(`Directus CMS fetch fallback for ${collection}:`, error);
    return [];
  }
}

/**
 * Fetch live blog articles directly from Radya Labs Directus CMS (https://admin.radyalabs.com)
 */
export async function fetchLiveCmsArticles(): Promise<InsightArticle[]> {
  try {
    const endpoint = `${DIRECTUS_CMS_URL}/items/blog?fields=*,translations.*,cover_image.*,category_id.*,category_id.translations.*,tags.tags_id.*,tags.tags_id.translations.*&sort=-date_published&limit=100`;
    const res = await fetch(endpoint, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from Directus CMS: ${res.status}`);
    }

    const json = await res.json();
    const rawItems = json.data || [];

    return rawItems.map((item: any) => {
      const transId = item.translations?.find((t: any) => t.languages_code === 'id') || item.translations?.[0] || {};
      const transEn = item.translations?.find((t: any) => t.languages_code === 'en') || item.translations?.[1] || transId;

      const slug = transId.slug || transEn.slug || item.id;
      const originalUrl = `https://radyalabs.com/id/blog/${slug}`;

      // Dynamic Bilingual Category Resolution from Directus Category Translations
      const catTransId = item.category_id?.translations?.find((t: any) => t.languages_code === 'id') || item.category_id?.translations?.[0];
      const catTransEn = item.category_id?.translations?.find((t: any) => t.languages_code === 'en') || item.category_id?.translations?.[1] || catTransId;

      const categoryNameId = catTransId?.category_name || item.category_id?.title || item.category_id?.name || 'Berita';
      const categoryNameEn = catTransEn?.category_name || categoryNameId;

      const category = {
        ID: categoryNameId,
        EN: categoryNameEn,
      };

      // Cover Image Resolution
      let image = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
      if (item.cover_image) {
        const imageId = typeof item.cover_image === 'string' ? item.cover_image : item.cover_image.id;
        if (imageId) {
          image = `${DIRECTUS_CMS_URL}/assets/${imageId}`;
        }
      }

      // Format Date
      let dateStr = '2026';
      if (item.date_published) {
        try {
          const d = new Date(item.date_published);
          dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch {
          dateStr = String(item.date_published);
        }
      }

      // Extract Tags from Directus relational tags_id
      const tags: string[] = [];
      if (Array.isArray(item.tags)) {
        item.tags.forEach((t: any) => {
          const tagObj = t.tags_id || t;
          const tagTransId = tagObj?.translations?.find((tr: any) => tr.languages_code === 'id') || tagObj?.translations?.[0];
          const tagTitle = tagTransId?.title || tagObj?.title || tagObj?.name || (typeof tagObj === 'string' ? tagObj : null);
          if (tagTitle && !tags.includes(tagTitle)) {
            tags.push(tagTitle);
          }
        });
      }

      // Estimate Reading Time
      const wordCount = (transId.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readMinutes = Math.max(3, Math.ceil(wordCount / 200));

      return {
        id: item.id,
        slug,
        originalUrl,
        category,
        date: dateStr,
        readTime: `${readMinutes} min read`,
        image,
        tags,
        title: {
          ID: transId.title || 'Artikel Radya Labs',
          EN: transEn.title || transId.title || 'Radya Labs Article',
        },
        summary: {
          ID: transId.short_description || transId.title || '',
          EN: transEn.short_description || transEn.title || transId.short_description || '',
        },
        content: {
          ID: transId.content || transId.short_description || '',
          EN: transEn.content || transEn.short_description || transId.content || '',
        },
      };
    });
  } catch (error) {
    console.error('[CMS Helper] Error fetching live articles:', error);
    return [];
  }
}
