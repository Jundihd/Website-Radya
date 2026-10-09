/**
 * Server-only helper AI untuk Studio Blog Editor.
 * Mendukung 2 provider (dipilih via STUDIO_AI_PROVIDER):
 *  - "gemini" (default): Google AI Studio, ada free tier harian.
 *  - "openai": endpoint kompatibel OpenAI Chat Completions
 *    (OpenAI, Groq, OpenRouter, DeepSeek — via STUDIO_AI_BASE_URL).
 *
 * JANGAN import file ini dari client component (API key server!).
 */

export type AiProvider = 'gemini' | 'openai';

export interface AiConfig {
  provider: AiProvider;
  apiKey: string;
  model: string;
  baseUrl: string; // khusus provider openai
}

export function getAiConfig(customKey?: string): AiConfig | null {
  const apiKey = (
    customKey ||
    process.env.GEMINI_API_KEY ||
    process.env.STUDIO_AI_API_KEY ||
    ''
  ).trim();
  if (!apiKey) return null;
  const provider: AiProvider =
    (process.env.STUDIO_AI_PROVIDER || '').trim().toLowerCase() === 'openai'
      ? 'openai'
      : 'gemini';
  const rawModel = (process.env.STUDIO_AI_MODEL || '').trim();
  const model =
    normalizeGeminiModel(rawModel) ||
    (provider === 'gemini' ? 'gemini-3.5-flash-lite' : 'gpt-4o-mini');
  const baseUrl =
    (process.env.STUDIO_AI_BASE_URL || '').trim().replace(/\/+$/, '') ||
    'https://api.openai.com/v1';
  return { provider, apiKey, model, baseUrl };
}

/**
 * Model lama (1.x / 2.0 / tanpa versi) sudah di-retire Google dan
 * mengembalikan 404 `models/... is not found for API version v1beta`.
 * Normalisasi ke model aktif agar env lama tidak bikin fitur mati.
 */
function normalizeGeminiModel(raw: string): string {
  const m = (raw || '').trim();
  if (!m) return '';
  const lower = m.toLowerCase();
  const legacyPatterns = [
    'gemini-1.0',
    'gemini-1.5',
    'gemini-2.0',
    'gemini-pro',
    'gemini-1-5',
    'gemini-1_5',
  ];
  if (legacyPatterns.some((p) => lower.includes(p))) {
    console.warn(
      `[Studio AI] Model "${m}" sudah retire (404). Otomatis memakai "gemini-3.5-flash-lite". Update STUDIO_AI_MODEL di env.`,
    );
    return 'gemini-3.5-flash-lite';
  }
  return m;
}

/* ------------------------------- prompting ------------------------------- */

const WRITER_RULES = `You are a senior tech content writer for Radya Labs, an Indonesian software house (cloud-native, AI/ML, DevOps, enterprise systems).

HARD STYLE RULES (tulisan harus terasa ditulis manusia, bukan template AI):
- Bahasa Indonesia alami ala blog praktisi: konkret, spesifik, ritme kalimat bervariasi (pendek-panjang).
- DILARANG frasa klise: "di era digital ini", "landscape", "delve", "penting untuk dicatat", "sebagai kesimpulan", "revolusioner", "game-changer".
- DILARANG data/angka/tahun yang dikarang. Jangan buat kutipan palsu atau testimoni fiktif.
- Bahasa Inggris juga natural (bukan terjemahan kaku dari Indonesia); boleh beda struktur kalimat asal makna sama.
- Format Markdown: heading ##, paragraf pendek, bullet/numbered list bila cocok, code fence bila ada contoh kode.
- Topik HARUS nyambung dengan judul/brief yang diberikan. Jangan melebar ke topik lain.`;

const JSON_INSTRUCTION = `Return ONLY a single valid JSON object, no markdown fences, no commentary.`;

export type AiLength = 'short' | 'medium' | 'long';

const LENGTH_HINT: Record<AiLength, string> = {
  short: 'Short article (~400-600 words per language).',
  medium: 'Medium article (~700-1000 words per language).',
  long: 'Long in-depth article (~1200-1600 words per language).',
};

export interface FullBriefInput {
  brief: string;
  length: AiLength;
  /** Judul kerja opsional dari user (boleh kosong). */
  titleHintId?: string;
  titleHintEn?: string;
}

export function buildFullBlogPrompt(input: FullBriefInput): string {
  return `${WRITER_RULES}

TASK: Write a complete bilingual blog post for Radya Labs based on this brief:
"""${input.brief}"""
${LENGTH_HINT[input.length]}
${input.titleHintId ? `Working title (ID): ${input.titleHintId}` : ''}
${input.titleHintEn ? `Working title (EN): ${input.titleHintEn}` : ''}
${input.titleHintId || input.titleHintEn ? 'Keep titles close to the working title, improve wording if needed.' : 'Create compelling titles that match the brief.'}

${JSON_INSTRUCTION}
Schema:
{
  "title_id": "string (judul ID, maks ~70 karakter)",
  "title_en": "string (English title, max ~70 chars)",
  "subtitle_id": "string (subjudul opsional, boleh string kosong)",
  "subtitle_en": "string",
  "excerpt_id": "string (1-2 kalimat ringkasan ID)",
  "excerpt_en": "string (1-2 sentence EN summary)",
  "content_id": "string (full Markdown body Bahasa Indonesia)",
  "content_en": "string (full Markdown body English)",
  "tags": ["string 3-6 tag, Title Case"],
  "category_id": "string (UPPERCASE, e.g. CLOUD NATIVE)",
  "category_en": "string (UPPERCASE)"
}`;
}

export interface ExcerptInput {
  titleId: string;
  titleEn: string;
  contentId: string;
  contentEn: string;
}

export function buildExcerptPrompt(input: ExcerptInput): string {
  return `${WRITER_RULES}

TASK: Write short descriptions (1-2 sentences each) for this blog post. Summarize the actual content, do not invent new claims.

Title ID: ${input.titleId}
Title EN: ${input.titleEn}
Content ID (may be truncated):
"""${input.contentId.slice(0, 4000)}"""
Content EN (may be truncated):
"""${input.contentEn.slice(0, 4000)}"""

${JSON_INSTRUCTION}
Schema: { "excerpt_id": "string", "excerpt_en": "string" }`;
}

export interface ContentInput {
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  brief: string;
  length: AiLength;
  lang: 'ID' | 'EN';
}

export function buildContentPrompt(input: ContentInput): string {
  const langName = input.lang === 'ID' ? 'Bahasa Indonesia' : 'English';
  return `${WRITER_RULES}

TASK: Write ONLY the full Markdown article body in ${langName} for this blog post.
${LENGTH_HINT[input.length]}
Title ID: ${input.titleId}
Title EN: ${input.titleEn}
Short description ID: ${input.excerptId}
Short description EN: ${input.excerptEn}
${input.brief ? `Extra brief:\n"""${input.brief}"""` : ''}

${JSON_INSTRUCTION}
Schema: { "content": "string (full Markdown body)" }`;
}

/* ------------------------------ JSON parsing ----------------------------- */

/** Ambil objek JSON dari respons model (toleran fence/block teks). */
export function extractJsonObject(text: string): Record<string, unknown> {
  const cleaned = (text || '').trim();
  const tryParse = (s: string) => JSON.parse(s) as Record<string, unknown>;
  try {
    return tryParse(cleaned);
  } catch {
    // Coba lepaskan ```json fence
    const fence = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) {
      try {
        return tryParse(fence[1].trim());
      } catch {
        // lanjut ke ekstraksi kurung kurawal
      }
    }
    // Ambil substring objek terluar pertama yang valid
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end > start) {
      return tryParse(cleaned.slice(start, end + 1));
    }
    throw new Error('Respons AI bukan JSON yang valid.');
  }
}

const asStr = (v: unknown) => (typeof v === 'string' ? v : '');
const asStrArr = (v: unknown) =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === 'string')
    : [];

/* ------------------------------ provider calls --------------------------- */

async function callGemini(
  cfg: AiConfig,
  prompt: string,
  temperature: number,
): Promise<string> {
  // Model aktif per docs Google 2026 (GA). Urutan = murah/cepat dulu.
  // Lihat: https://ai.google.dev/gemini-api/docs/models
  const modelsToTry = [
    cfg.model,
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
  ].filter((m, i, arr) => Boolean(m) && arr.indexOf(m) === i);

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(cfg.apiKey)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: WRITER_RULES }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        const hint = res.status === 404
          ? ' Model tidak ditemukan (kemungkinan retire). Cek https://ai.google.dev/gemini-api/docs/models untuk daftar aktif.'
          : '';
        throw new Error(`Gemini (${model}) HTTP ${res.status}: ${errText.slice(0, 300)}${hint}`);
      }

      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || '')
        .join('');
      if (!text) throw new Error(`Gemini (${model}) mengembalikan respons kosong.`);
      return text;
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini Fallback] Model ${model} gagal (${err.message}). Mencoba fallback model berikutnya...`);
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  throw lastError || new Error('Google Gemini API gagal memproses permintaan.');
}

async function callOpenAiCompatible(
  cfg: AiConfig,
  prompt: string,
  temperature: number,
): Promise<string> {
  const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      temperature,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: WRITER_RULES },
        { role: 'user', content: prompt },
      ],
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`AI HTTP ${res.status}: ${errText.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('AI mengembalikan respons kosong.');
  return text;
}

async function runJsonPrompt(
  prompt: string,
  temperature: number,
  customApiKey?: string,
): Promise<Record<string, unknown>> {
  const cfg = getAiConfig(customApiKey);
  if (!cfg) {
    throw new Error(
      'Google Gemini API Key belum diset. Isi GEMINI_API_KEY di file .env.local atau masukkan langsung melalui panel.',
    );
  }
  const raw =
    cfg.provider === 'gemini'
      ? await callGemini(cfg, prompt, temperature)
      : await callOpenAiCompatible(cfg, prompt, temperature);
  return extractJsonObject(raw);
}

/* --------------------------------- tasks --------------------------------- */

export interface GeneratedFullPost {
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  tags: string[];
  categoryId: string;
  categoryEn: string;
}

export async function generateFullPost(
  input: FullBriefInput & { apiKey?: string },
): Promise<GeneratedFullPost> {
  if (!input.brief.trim()) throw new Error('Brief wajib diisi.');
  const json = await runJsonPrompt(buildFullBlogPrompt(input), 0.8, input.apiKey);
  return {
    titleId: asStr(json.title_id),
    titleEn: asStr(json.title_en),
    subtitleId: asStr(json.subtitle_id),
    subtitleEn: asStr(json.subtitle_en),
    excerptId: asStr(json.excerpt_id),
    excerptEn: asStr(json.excerpt_en),
    contentId: asStr(json.content_id),
    contentEn: asStr(json.content_en),
    tags: asStrArr(json.tags).slice(0, 8),
    categoryId: asStr(json.category_id),
    categoryEn: asStr(json.category_en),
  };
}

export async function generateExcerpts(
  input: ExcerptInput & { apiKey?: string },
): Promise<{ excerptId: string; excerptEn: string }> {
  const json = await runJsonPrompt(buildExcerptPrompt(input), 0.5, input.apiKey);
  return { excerptId: asStr(json.excerpt_id), excerptEn: asStr(json.excerpt_en) };
}

export async function generateContent(
  input: ContentInput & { apiKey?: string },
): Promise<{ content: string }> {
  const json = await runJsonPrompt(buildContentPrompt(input), 0.8, input.apiKey);
  return { content: asStr(json.content) };
}

