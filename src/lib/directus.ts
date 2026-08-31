import { InsightArticle, CaseStudy, Testimonial } from '@/types';

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
 * Deduplicate portfolio case studies by slug, ID, client name, or title keywords
 */
export function deduplicatePortfolios(items: CaseStudy[]): CaseStudy[] {
  const result: CaseStudy[] = [];
  const seenKeys = new Set<string>();

  for (const item of items) {
    const rawClient = (item.client || '').toLowerCase().trim();
    const rawTitleID = (typeof item.title === 'object' ? item.title.ID || '' : item.title || '').toLowerCase().trim();
    const rawTitleEN = (typeof item.title === 'object' ? item.title.EN || '' : item.title || '').toLowerCase().trim();
    const rawSlug = (item.slug || item.id || '').toLowerCase().trim();

    let primaryKey = rawSlug;
    if (rawClient.includes('pusmendik') || rawTitleID.includes('anbk') || rawTitleEN.includes('anbk')) {
      primaryKey = 'anbk';
    } else if (rawClient.includes('tokoparts') || rawTitleID.includes('tokoparts') || rawTitleEN.includes('tokoparts')) {
      primaryKey = 'tokoparts';
    } else if (rawClient.includes('imuni') || rawTitleID.includes('imuni') || rawTitleEN.includes('imuni')) {
      primaryKey = 'imuni';
    } else if (rawClient.includes('muraqaba') || rawTitleID.includes('muraqaba') || rawTitleEN.includes('muraqaba')) {
      primaryKey = 'muraqaba';
    } else if (rawClient.includes('anteraja') || rawTitleID.includes('anteraja') || rawTitleEN.includes('anteraja')) {
      primaryKey = 'anteraja-aware';
    } else if (rawTitleID.includes('bioaudit') || rawTitleEN.includes('bioaudit')) {
      primaryKey = 'bioaudit';
    } else if (rawTitleID.includes('bi-smart') || rawTitleEN.includes('bi-smart')) {
      primaryKey = 'bi-smart';
    } else if (rawClient.includes('mitsubishi') || rawTitleID.includes('mmid') || rawTitleEN.includes('mmid')) {
      primaryKey = 'mmid-mitsubishi';
    } else if (rawTitleID.includes('sikepo') || rawTitleEN.includes('sikepo')) {
      primaryKey = 'sikepo';
    }

    if (seenKeys.has(primaryKey)) {
      const existingIdx = result.findIndex((r) => {
        const rSlug = (r.slug || r.id || '').toLowerCase();
        return rSlug === primaryKey || rSlug.includes(primaryKey);
      });
      if (existingIdx !== -1) {
        const existing = result[existingIdx];
        result[existingIdx] = {
          ...item,
          ...existing,
          title: {
            ID: (typeof existing.title === 'object' ? existing.title.ID : existing.title) || (typeof item.title === 'object' ? item.title.ID : item.title),
            EN: (typeof existing.title === 'object' ? existing.title.EN : existing.title) || (typeof item.title === 'object' ? item.title.EN : item.title),
          },
          summary: {
            ID: (typeof existing.summary === 'object' ? existing.summary.ID : existing.summary) || (typeof item.summary === 'object' ? item.summary.ID : item.summary),
            EN: (typeof existing.summary === 'object' ? existing.summary.EN : existing.summary) || (typeof item.summary === 'object' ? item.summary.EN : item.summary),
          },
          images: Array.from(new Set([...(existing.images || [existing.image]), ...(item.images || [item.image])])).filter(Boolean),
        };
      }
      continue;
    }

    seenKeys.add(primaryKey);
    result.push(item);
  }

  return result;
}

/**
 * Fetch live portfolio case studies directly from Radya Labs Directus CMS (https://admin.radyalabs.com)
 */
export async function fetchLiveCmsPortfolios(): Promise<CaseStudy[]> {
  try {
    const endpoint = `${DIRECTUS_CMS_URL}/items/portfolio?fields=*,translations.*,client_id.*,service_id.*,service_id.translations.*,deliverables.deliverables_id.*,deliverables.deliverables_id.translations.*,capabilities.capabilities_id.*,capabilities.capabilities_id.translations.*,features.*,features.translations.*,screenshot_mockup.*&limit=100`;
    const res = await fetch(endpoint, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      console.warn(`[CMS Helper] Directus portfolio endpoint HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    const rawItems = data.data || [];

    // Client metadata map for rich display
    const clientMetadataMap: Record<string, { client: string; logo: string; industry: string; categoryId: string; categoryEn: string; metrics: any[] }> = {
      'aba6f0df-f6f7-41f0-a2dd-af104fe341b3': {
        client: 'Muraqaba',
        logo: 'MURAQABA',
        industry: 'Health & Wellness',
        categoryId: 'MOBILE APP & STREAMING',
        categoryEn: 'MOBILE APP & STREAMING',
        metrics: [
          { value: '4.8/5.0', label: { ID: 'Rating Pengguna', EN: 'App Store Rating' } },
          { value: '99.9%', label: { ID: 'Stabilitas Audio', EN: 'Streaming Uptime' } },
          { value: 'In-App', label: { ID: 'Sistem Langganan', EN: 'Subscription System' } },
        ],
      },
      'de92d860-2508-4958-983b-761331533c2e': {
        client: 'Anteraja',
        logo: 'ANTERAJA',
        industry: 'Logistics & Supply Chain',
        categoryId: 'LOGISTICS & OPERATIONS',
        categoryEn: 'LOGISTICS & OPERATIONS',
        metrics: [
          { value: '3 Bulan', label: { ID: 'Waktu Go-Live Cepat', EN: 'Rapid Go-Live' } },
          { value: '10K+', label: { ID: 'Kurir Satria Aktif', EN: 'Daily Active Couriers' } },
          { value: '-45%', label: { ID: 'Pending AWB Alert', EN: 'Pending Parcel Lag' } },
        ],
      },
      'e1ff7b06-96f1-43fe-8be1-2f8674775ca3': {
        client: 'Tokoparts',
        logo: 'TOKOPARTS',
        industry: 'Automotive & E-Commerce',
        categoryId: 'E-COMMERCE & CMS',
        categoryEn: 'E-COMMERCE & CMS',
        metrics: [
          { value: '50K+', label: { ID: 'Katalog Suku Cadang', EN: 'Spare Parts SKUs' } },
          { value: '+60%', label: { ID: 'Pemesanan Online', EN: 'Online Order Growth' } },
          { value: '<2 Detik', label: { ID: 'Kecepatan Filter', EN: 'Filter Response Time' } },
        ],
      },
      'f4d490b6-a0d0-4b76-89f7-2e5e5d41ce73': {
        client: 'Imuni',
        logo: 'IMUNI',
        industry: 'Healthcare & Telemedicine',
        categoryId: 'HEALTHCARE & TELEMEDICINE',
        categoryEn: 'HEALTHCARE & TELEMEDICINE',
        metrics: [
          { value: '100%', label: { ID: 'Dokter Vaksin Khusus', EN: 'Certified Doctors' } },
          { value: '0 Menit', label: { ID: 'Antrean di Klinik', EN: 'Clinic Waiting Time' } },
          { value: '10K+', label: { ID: 'Sesi Vaksinasi', EN: 'Vaccination Sessions' } },
        ],
      },
      'fe07bacf-ef23-41ae-8ff0-16c4b2323d95': {
        client: 'PT Bio Farma (Persero)',
        logo: 'BIO FARMA',
        industry: 'Healthcare & Pharmaceuticals',
        categoryId: 'RISK MANAGEMENT & EWS',
        categoryEn: 'RISK MANAGEMENT & EWS',
        metrics: [
          { value: '100%', label: { ID: 'Digitalisasi Profil Risiko', EN: 'Risk Digitization' } },
          { value: 'Real-time', label: { ID: 'Early Warning System', EN: 'Early Warning System' } },
          { value: '-70%', label: { ID: 'Siklus Approval', EN: 'Approval Cycle Time' } },
        ],
      },
    };

    return rawItems.map((item: any) => {
      const meta = clientMetadataMap[item.id] || {
        client: item.client_id?.company_name || item.client_id?.name || 'Radya Labs Client',
        logo: (item.client_id?.name || 'CLIENT').toUpperCase(),
        industry: 'Enterprise Technology',
        categoryId: 'ENTERPRISE SOLUTION',
        categoryEn: 'ENTERPRISE SOLUTION',
        metrics: [
          { value: '100%', label: { ID: 'Akurasi Implementasi', EN: 'Implementation Accuracy' } },
          { value: 'Enterprise', label: { ID: 'Standar Arsitektur', EN: 'Enterprise Architecture' } },
        ],
      };

      const transId = item.translations?.find((t: any) => t.languages_code === 'id') || item.translations?.[0] || {};
      const transEn = item.translations?.find((t: any) => t.languages_code === 'en') || item.translations?.[1] || transId;

      const deliverables = (item.deliverables || [])
        .map((d: any) => {
          const dt = d.deliverables_id?.translations?.find((t: any) => t.languages_code === 'id') || d.deliverables_id?.translations?.[0];
          return dt?.name || '';
        })
        .filter(Boolean);

      const featuresList = (item.features || []).map((f: any) => {
        const fId = f.translations?.find((t: any) => t.languages_code === 'id') || f.translations?.[0] || {};
        const fEn = f.translations?.find((t: any) => t.languages_code === 'en') || fId;
        return {
          name: { ID: fId.name || 'Fitur', EN: fEn.name || fId.name || 'Feature' },
          description: { ID: fId.description || '', EN: fEn.description || fId.description || '' },
        };
      });

      const screenshots = (item.screenshot_mockup || []).map((s: any) => {
        const fileId = s.directus_files_id?.id || s.directus_files_id;
        return `${DIRECTUS_CMS_URL}/assets/${fileId}`;
      });

      const image = item.main_image
        ? `${DIRECTUS_CMS_URL}/assets/${item.main_image}`
        : 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80';

      return {
        id: transId.slug || item.id,
        slug: transId.slug || '',
        client: meta.client,
        logo: meta.logo,
        image,
        category: { ID: meta.categoryId, EN: meta.categoryEn },
        title: {
          ID: transId.name || 'Proyek Radya Labs',
          EN: transEn.name || transId.name || 'Radya Labs Project',
        },
        summary: {
          ID: transId.short_description || '',
          EN: transEn.short_description || transId.short_description || '',
        },
        challenge: {
          ID: transId.project_background || transId.project_target || '',
          EN: transEn.project_background || transEn.project_target || transId.project_background || '',
        },
        solution: {
          ID: transId.solution || '',
          EN: transEn.solution || transId.solution || '',
        },
        metrics: meta.metrics,
        tags: deliverables.length > 0 ? deliverables : ['Cloud Native', 'Enterprise', 'Scalable Architecture'],
        industry: meta.industry,
        featuresList,
        deliverables,
        screenshots,
        backgroundColor: item.background_color || undefined,
      };
    });
  } catch (error) {
    console.error('[CMS Helper] Error fetching live portfolios:', error);
    return [];
  }
}

/**
 * Fetch live articles directly from Radya Labs Directus CMS
 */
export async function fetchLiveCmsArticles(): Promise<InsightArticle[]> {
  try {
    const endpoint = `${DIRECTUS_CMS_URL}/items/blog?fields=*,translations.*,author_id.*,category_id.*,category_id.translations.*,tags.tags_id.*,tags.tags_id.translations.*&limit=100`;
    const res = await fetch(endpoint, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.warn(`[CMS Helper] Directus blog endpoint HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    const rawArticles = data.data || [];

    return rawArticles.map((art: any) => {
      const transId = art.translations?.find((t: any) => t.languages_code === 'id') || art.translations?.[0] || {};
      const transEn = art.translations?.find((t: any) => t.languages_code === 'en') || art.translations?.[1] || transId;

      const catTransId = art.category_id?.translations?.find((t: any) => t.languages_code === 'id') || art.category_id?.translations?.[0] || {};
      const catTransEn = art.category_id?.translations?.find((t: any) => t.languages_code === 'en') || catTransId;

      const categoryNameID = catTransId.name || 'INSIGHT';
      const categoryNameEN = catTransEn.name || categoryNameID;

      const tagNames = (art.tags || [])
        .map((t: any) => {
          const tagTrans = t.tags_id?.translations?.find((tr: any) => tr.languages_code === 'id') || t.tags_id?.translations?.[0];
          return tagTrans?.name || '';
        })
        .filter(Boolean);

      const coverImage = art.thumbnail
        ? `${DIRECTUS_CMS_URL}/assets/${art.thumbnail}`
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

      const publishedDate = art.date_created
        ? new Date(art.date_created).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : 'Mei 2026';

      return {
        id: art.id,
        slug: transId.slug || String(art.id),
        title: {
          ID: transId.title || 'Artikel Radya Labs',
          EN: transEn.title || transId.title || 'Radya Labs Article',
        },
        summary: {
          ID: transId.meta_description || transId.excerpt || '',
          EN: transEn.meta_description || transEn.excerpt || transId.meta_description || '',
        },
        content: {
          ID: transId.content || '',
          EN: transEn.content || transId.content || '',
        },
        category: {
          ID: categoryNameID.toUpperCase(),
          EN: categoryNameEN.toUpperCase(),
        },
        date: publishedDate,
        readTime: '5 min read',
        image: coverImage,
        tags: tagNames.length > 0 ? tagNames : ['Technology', 'Software Architecture'],
      };
    });
  } catch (error) {
    console.error('[CMS Helper] Error fetching live articles:', error);
    return [];
  }
}

/**
 * Fetch live testimonials directly from Radya Labs Directus CMS
 */
export async function fetchLiveCmsTestimonials(): Promise<Testimonial[]> {
  try {
    const endpoint = `${DIRECTUS_CMS_URL}/items/testimonial?fields=*,translations.*,client_id.*&limit=20`;
    const res = await fetch(endpoint, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const raw = data.data || [];

    return raw.map((item: any) => {
      const transId = item.translations?.find((t: any) => t.languages_code === 'id') || item.translations?.[0] || {};
      const transEn = item.translations?.find((t: any) => t.languages_code === 'en') || item.translations?.[1] || transId;

      return {
        id: item.id,
        name: item.author_name || 'Executive Leader',
        role: item.author_role || 'VP of Technology',
        company: item.client_id?.name || item.company_name || 'Enterprise Client',
        avatar: item.author_avatar
          ? `${DIRECTUS_CMS_URL}/assets/${item.author_avatar}`
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        quote: {
          ID: transId.quote || '',
          EN: transEn.quote || transId.quote || '',
        },
        rating: 5,
      };
    });
  } catch (error) {
    console.error('[CMS Helper] Error fetching live testimonials:', error);
    return [];
  }
}
