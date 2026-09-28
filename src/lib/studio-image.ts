import fs from 'fs';
import path from 'path';

export interface ImageModelOption {
  id: string;
  name: string;
  badge?: string;
  resolution: string;
  description: string;
}

export const AVAILABLE_IMAGE_MODELS: ImageModelOption[] = [
  {
    id: 'gpt-image-2.5-sunburst-4k',
    name: 'GPT Image 2.5 Sunburst 4K',
    badge: 'Default (4K UHD)',
    resolution: '4K Ultra HD',
    description: 'Model utama resolusi tinggi 4K dengan visual sunburst kaya warna.',
  },
  {
    id: 'gpt-image-2.5-flare-4k',
    name: 'GPT Image 2.5 Flare 4K',
    badge: '4K UHD',
    resolution: '4K Ultra HD',
    description: 'Model 4K dengan efek pencahayaan flare sinematik modern.',
  },
  {
    id: 'gpt-image-2-4k',
    name: 'GPT Image 2 4K',
    badge: 'High Reliability',
    resolution: '4K Ultra HD',
    description: 'Model 4K generasi kedua dengan stabilitas dan ketersediaan tinggi.',
  },
  {
    id: 'gpt-image-2.5-sunburst',
    name: 'GPT Image 2.5 Sunburst',
    badge: 'Standard HD',
    resolution: '1024x1024',
    description: 'Model sunburst resolusi standar untuk render cepat.',
  },
  {
    id: 'gpt-image-2.5-flare',
    name: 'GPT Image 2.5 Flare',
    badge: 'Standard HD',
    resolution: '1024x1024',
    description: 'Model flare resolusi standar untuk visual berkarakter dinamis.',
  },
  {
    id: 'gpt-image-2.5',
    name: 'GPT Image 2.5',
    badge: 'Standard',
    resolution: '1024x1024',
    description: 'Model standar versi 2.5.',
  },
  {
    id: 'gpt-image-2',
    name: 'GPT Image 2',
    badge: 'Standard',
    resolution: '1024x1024',
    description: 'Model standar versi 2.',
  },
];

export const DEFAULT_IMAGE_MODEL = 'gpt-image-2.5-sunburst-4k';

export interface GenerateImageOptions {
  prompt: string;
  requestedModel?: string;
  slug?: string;
  size?: string;
  saveToDisk?: boolean;
}

export interface GenerateImageResult {
  ok: boolean;
  cover: string; // path /images/blog/...
  requestedModel: string;
  usedModel: string;
  switched: boolean;
  switchReason?: string;
  modelAttempts: { model: string; success: boolean; error?: string }[];
}

export function getImageAiConfig() {
  const apiKey = (
    process.env.IMAGE_AI_API_KEY ||
    'sk-uqIUPuBrG9KFFioltLjqASn7Vphfp8y3ZdpfDt0zfDJaGPnQ'
  ).trim();

  const baseUrl = (
    process.env.IMAGE_AI_BASE_URL ||
    'https://aotianzz.xyz'
  )
    .trim()
    .replace(/\/+$/, '');

  const defaultModel =
    (process.env.IMAGE_AI_DEFAULT_MODEL || '').trim() || DEFAULT_IMAGE_MODEL;

  return { apiKey, baseUrl, defaultModel };
}

/**
 * Generate blog cover image with auto-fallback to alternative models
 * if the requested model runs out of tokens, expires, or returns an error.
 */
export async function generateBlogImage(
  options: GenerateImageOptions,
): Promise<GenerateImageResult> {
  const { apiKey, baseUrl, defaultModel } = getImageAiConfig();
  const requestedModel = (options.requestedModel || defaultModel).trim();
  const prompt = options.prompt?.trim();

  if (!prompt) {
    throw new Error('Prompt gambar wajib diisi.');
  }

  // Priority order: requested model first, then the remaining models in list
  const fallbackOrder = [
    requestedModel,
    ...AVAILABLE_IMAGE_MODELS.map((m) => m.id).filter((id) => id !== requestedModel),
  ];

  const modelAttempts: { model: string; success: boolean; error?: string }[] = [];
  let usedModel: string | null = null;
  let imageBuffer: Buffer | null = null;

  for (const model of fallbackOrder) {
    try {
      // Endpoint OpenAI standard: POST {baseUrl}/v1/images/generations
      const endpoint = `${baseUrl}/v1/images/generations`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          prompt,
          n: 1,
          size: options.size || '1024x1024',
        }),
        signal: AbortSignal.timeout(75000), // 75 seconds per attempt
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        let errMsg = `HTTP ${res.status}`;
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error?.message) {
            errMsg = `${errMsg}: ${errJson.error.message}`;
          }
        } catch {
          if (errText) {
            errMsg = `${errMsg}: ${errText.slice(0, 100)}`;
          }
        }
        modelAttempts.push({ model, success: false, error: errMsg });
        continue;
      }

      const data = await res.json();
      const item = data.data?.[0];

      if (item?.b64_json) {
        imageBuffer = Buffer.from(item.b64_json, 'base64');
        usedModel = model;
        modelAttempts.push({ model, success: true });
        break;
      } else if (item?.url) {
        const imgRes = await fetch(item.url, { signal: AbortSignal.timeout(30000) });
        if (imgRes.ok) {
          imageBuffer = Buffer.from(await imgRes.arrayBuffer());
          usedModel = model;
          modelAttempts.push({ model, success: true });
          break;
        } else {
          modelAttempts.push({
            model,
            success: false,
            error: `Gagal mengunduh gambar dari URL (HTTP ${imgRes.status})`,
          });
        }
      } else {
        modelAttempts.push({
          model,
          success: false,
          error: 'Format data respon tidak memiliki b64_json atau url.',
        });
      }
    } catch (err: any) {
      modelAttempts.push({
        model,
        success: false,
        error: err.name === 'TimeoutError' ? 'Koneksi timeout' : err.message,
      });
    }
  }

  if (!imageBuffer || !usedModel) {
    const errorDetails = modelAttempts
      .map((a) => `${a.model} (${a.error || 'gagal'})`)
      .join('; ');
    throw new Error(
      `Semua model gambar gagal menghasilkan foto. Rincian: ${errorDetails}`,
    );
  }

  // Save image to /public/images/blog/
  const dir = path.join(process.cwd(), 'public', 'images', 'blog');
  fs.mkdirSync(dir, { recursive: true });

  const rawSlug = String(options.slug || 'ai-cover')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).slice(2, 6);
  const fileName = `${rawSlug || 'ai-cover'}-${timestamp}-${randomSuffix}.png`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, imageBuffer);

  const switched = usedModel !== requestedModel;
  const switchReason = switched
    ? `Model '${requestedModel}' tidak tersedia/kehabisan token. Otomatis dialihkan ke '${usedModel}' yang aktif.`
    : undefined;

  return {
    ok: true,
    cover: `/images/blog/${fileName}`,
    requestedModel,
    usedModel,
    switched,
    switchReason,
    modelAttempts,
  };
}
