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
 * Fetch live portfolio case studies directly from Radya Labs Directus CMS (https://admin.radyalabs.com)
 */
export async function fetchLiveCmsPortfolios(): Promise<CaseStudy[]> {
  try {
    const endpoint = `${DIRECTUS_CMS_URL}/items/portfolio?fields=*,translations.*,client_id.*,service_id.*,service_id.translations.*,deliverables.deliverables_id.*,deliverables.deliverables_id.translations.*,capabilities.capabilities_id.*,capabilities.capabilities_id.translations.*,features.*,features.translations.*,screenshot_mockup.*&limit=100`;
    const res = await fetch(endpoint, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch portfolios from Directus CMS: ${res.status}`);
    }

    const json = await res.json();
    const rawItems = json.data || [];

    const clientMetadataMap: Record<string, { client: string; logo: string; industry: string; categoryId: string; categoryEn: string; metrics: { value: string; label: { ID: string; EN: string } }[] }> = {
      '1f11de3f-75c3-40ff-9525-96ad67b277dd': {
        client: 'PT Bio Farma (Persero)',
        logo: 'BIO FARMA',
        industry: 'Healthcare & Pharmaceuticals',
        categoryId: 'AUDIT & GOVERNANCE',
        categoryEn: 'AUDIT & GOVERNANCE',
        metrics: [
          { value: '+85%', label: { ID: 'Efisiensi Siklus Audit', EN: 'Audit Cycle Efficiency' } },
          { value: '100%', label: { ID: 'Kepatuhan Regulasi', EN: 'Regulatory Compliance' } },
          { value: 'Paperless', label: { ID: 'Sistem Pelaporan', EN: 'Reporting Workflow' } },
        ],
      },
      '25b6ffe2-2cd4-4953-ac9e-4c643f1137f5': {
        client: 'Pusmendik Kemendikbudristek',
        logo: 'PUSMENDIK',
        industry: 'Government & Education',
        categoryId: 'PUBLIC SECTOR PLATFORM',
        categoryEn: 'PUBLIC SECTOR PLATFORM',
        metrics: [
          { value: '3.5M+', label: { ID: 'Siswa Peserta Ujian', EN: 'Concurrent Students' } },
          { value: '99.99%', label: { ID: 'Ketersediaan Server', EN: 'Server Availability' } },
          { value: '100K+', label: { ID: 'Sekolah Terhubung', EN: 'Connected Schools' } },
        ],
      },
      '30789d0a-8168-47d8-affd-cb916b6496ac': {
        client: 'Otoritas Jasa Keuangan (OJK)',
        logo: 'OJK',
        industry: 'Banking & Financial Services',
        categoryId: 'FINTECH & REGULATORY',
        categoryEn: 'FINTECH & REGULATORY',
        metrics: [
          { value: '100%', label: { ID: 'Perbankan Nasional', EN: 'National Banks Access' } },
          { value: 'JDIHN', label: { ID: 'Terintegrasi Resmi', EN: 'Officially Integrated' } },
          { value: '<1 Detik', label: { ID: 'Pencarian Regulasi', EN: 'Search Retrieval' } },
        ],
      },
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
          return dt?.name || dt?.title || d.deliverables_id?.name || d.deliverables_id?.title;
        })
        .filter(Boolean);

      const featuresList = (item.features || []).map((f: any) => {
        const fId = f.translations?.find((t: any) => t.languages_code === 'id') || f.translations?.[0] || {};
        const fEn = f.translations?.find((t: any) => t.languages_code === 'en') || f.translations?.[1] || fId;
        return {
          name: { ID: fId.name || '', EN: fEn.name || fId.name || '' },
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

/**
 * Fetch live testimonials directly from Radya Labs Directus CMS (https://admin.radyalabs.com)
 */
export async function fetchLiveCmsTestimonials(): Promise<Testimonial[]> {
  try {
    const endpoint = `${DIRECTUS_CMS_URL}/items/testimonial?fields=*,translations.*,avatar.*&limit=100`;
    const res = await fetch(endpoint, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Directus CMS error HTTP ${res.status}`);
    }

    const json = await res.json();
    const rawItems = json.data || [];

    return rawItems.map((item: any) => {
      const tEn = item.translations?.find((t: any) => t.languages_code === 'en') || item.translations?.[0] || {};
      const tId = item.translations?.find((t: any) => t.languages_code === 'id') || item.translations?.[1] || tEn;

      let role = item.role || 'Client Leader';
      let company = 'Client Organization';

      if (item.role) {
        if (item.role.includes(' at ')) {
          const parts = item.role.split(' at ');
          role = parts[0].trim();
          company = parts[1].trim();
        } else if (item.role.includes(',')) {
          const parts = item.role.split(',');
          role = parts[0].trim();
          company = parts.slice(1).join(',').trim();
        }
      }

      const avatarId = item.avatar?.id || (typeof item.avatar === 'string' ? item.avatar : null);
      const avatar = avatarId
        ? `${DIRECTUS_CMS_URL}/assets/${avatarId}`
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80';

      return {
        id: item.id,
        name: item.name || 'Client Leader',
        role,
        company,
        avatar,
        quote: {
          ID: tId.testimony_text || tEn.testimony_text || '',
          EN: tEn.testimony_text || tId.testimony_text || '',
        },
        rating: 5,
      };
    });
  } catch (error) {
    console.error('[CMS Helper] Error fetching live testimonials:', error);
    return [];
  }
}
