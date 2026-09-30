import fs from 'fs';
import path from 'path';

export * from './studio-image-models';
import {
  AVAILABLE_IMAGE_MODELS,
  DEFAULT_IMAGE_MODEL,
  GenerateImageOptions,
  GenerateImageResult,
} from './studio-image-models';

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

  const rawSlug = String(options.slug || 'ai-cover')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).slice(2, 6);
  const fileName = `${rawSlug || 'ai-cover'}-${timestamp}-${randomSuffix}.png`;

  let coverUrl = `/images/blog/${fileName}`;

  // Coba simpan ke /public/images/blog/ jika filesystem writable (lokal / container)
  // Bila di serverless/Vercel (EROFS read-only filesystem), otomatis fallback ke Base64 Data URL
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'blog');
    fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, imageBuffer);
  } catch (fsErr: any) {
    if (fsErr.code === 'EROFS' || fsErr.message?.includes('read-only')) {
      console.warn('[Studio Image] Read-only filesystem terdeteksi (Vercel/Serverless). Menggunakan Data URL base64.');
      coverUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } else {
      throw fsErr;
    }
  }

  const switched = usedModel !== requestedModel;
  const switchReason = switched
    ? `Model '${requestedModel}' tidak tersedia/kehabisan token. Otomatis dialihkan ke '${usedModel}' yang aktif.`
    : undefined;

  return {
    ok: true,
    cover: coverUrl,
    requestedModel,
    usedModel,
    switched,
    switchReason,
    modelAttempts,
  };
}
