import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getAllPosts,
  isPostDue,
  postTimestamp,
} from '@/lib/posts';

/**
 * GET /api/studio/scheduler-tick — Motor penjadwalan artikel.
 *
 * Dipanggil otomatis oleh Vercel Cron (lihat vercel.json, tiap jam) atau
 * manual. Tugasnya: me-refresh cache ISR halaman publik agar artikel
 * yang jadwalnya tiba otomatis tayang tanpa deploy ulang.
 *
 * Auth: header `Authorization: Bearer <CRON_SECRET>` (dikirim otomatis oleh
 * Vercel Cron bila env CRON_SECRET diset) atau query `?secret=<CRON_SECRET>`.
 */
export async function GET(request: NextRequest) {
  const required = (process.env.CRON_SECRET || '').trim();
  if (!required) {
    return NextResponse.json(
      {
        error:
          'CRON_SECRET belum diset di Environment Variables. Tambahkan string acak panjang, lalu Redeploy. ' +
          'Tanpa ini, scheduling tetap jalan via kunjungan pengunjung (ISR 5 menit), tapi tanpa refresh otomatis berkala.',
      },
      { status: 403 },
    );
  }

  const authHeader = request.headers.get('authorization') || '';
  const bearer = authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : '';
  const querySecret = (request.nextUrl.searchParams.get('secret') || '').trim();
  if (bearer !== required && querySecret !== required) {
    return NextResponse.json({ error: 'Secret scheduler tidak valid.' }, { status: 401 });
  }

  const now = Date.now();
  const published = getAllPosts();
  const due = published.filter((p) => isPostDue(p.frontmatter, now));
  const scheduled = published
    .filter((p) => !isPostDue(p.frontmatter, now))
    .map((p) => ({ slug: p.slug, dueAt: postTimestamp(p.frontmatter) }))
    .filter((s) => s.dueAt > 0)
    .sort((a, b) => a.dueAt - b.dueAt);

  // Refresh cache ISR: listing + semua halaman detail published.
  // Halaman detail yang belum due tetap 404 sampai waktunya tiba (gating runtime).
  try {
    revalidatePath('/', 'page');
    revalidatePath('/insight', 'page');
    for (const p of published) {
      revalidatePath(`/insight/${p.slug}`, 'page');
    }
  } catch (err: any) {
    console.error('[Scheduler Tick] Revalidate error:', err);
    return NextResponse.json(
      { error: `Gagal refresh cache: ${err?.message || 'unknown'}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    now: new Date(now).toISOString(),
    dueCount: due.length,
    scheduledCount: scheduled.length,
    scheduled: scheduled.slice(0, 20),
    nextDueAt:
      scheduled.length > 0
        ? new Date(scheduled[0].dueAt).toISOString()
        : null,
    nextDueSlug: scheduled.length > 0 ? scheduled[0].slug : null,
  });
}
