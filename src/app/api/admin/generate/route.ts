import { NextResponse } from 'next/server';
import {
  generateContent,
  generateExcerpts,
  generateFullPost,
  type AiLength,
} from '@/lib/studio-ai';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Body tidak valid.' }, { status: 400 });
  }

  const task = String(body.task || '');
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const length: AiLength =
    body.length === 'short' || body.length === 'long' ? body.length : 'medium';
  const apiKey = str(body.apiKey);

  try {
    if (task === 'full') {
      const brief = str(body.brief);
      if (brief.trim().length < 20) {
        return NextResponse.json(
          { error: 'Brief minimal 20 karakter agar hasilnya nyambung.' },
          { status: 400 },
        );
      }
      const result = await generateFullPost({
        brief,
        length,
        titleHintId: str(body.titleHintId),
        titleHintEn: str(body.titleEn || body.titleHintEn),
        apiKey,
      });
      return NextResponse.json({ ok: true, ...result });
    }

    if (task === 'excerpt') {
      const result = await generateExcerpts({
        titleId: str(body.titleId),
        titleEn: str(body.titleEn),
        contentId: str(body.contentId),
        contentEn: str(body.contentEn),
        apiKey,
      });
      if (!result.excerptId || !result.excerptEn) {
        throw new Error('AI tidak mengembalikan excerpt yang lengkap.');
      }
      return NextResponse.json({ ok: true, ...result });
    }

    if (task === 'content') {
      const lang = body.lang === 'EN' ? 'EN' : 'ID';
      if (!str(body.titleId) || !str(body.titleEn)) {
        return NextResponse.json(
          { error: 'Isi Title ID & EN dulu sebelum generate content.' },
          { status: 400 },
        );
      }
      const result = await generateContent({
        titleId: str(body.titleId),
        titleEn: str(body.titleEn),
        excerptId: str(body.excerptId),
        excerptEn: str(body.excerptEn),
        brief: str(body.brief),
        length,
        lang,
        apiKey,
      });
      if (!result.content) throw new Error('AI tidak mengembalikan konten.');
      return NextResponse.json({ ok: true, ...result });
    }

    return NextResponse.json(
      { error: 'Task tidak dikenal. Pakai: full | excerpt | content.' },
      { status: 400 },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Generate AI gagal.';
    const status = /API Key belum diset/i.test(msg) ? 503 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
