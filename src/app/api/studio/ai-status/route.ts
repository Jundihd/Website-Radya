import { NextResponse } from 'next/server';
import { getAiConfig } from '@/lib/studio-ai';

// Diproteksi middleware (401 jika belum login).
// Memberi tahu client apakah AI sudah dikonfigurasi (tanpa membocorkan key).
export async function GET() {
  const cfg = getAiConfig();
  if (!cfg) {
    return NextResponse.json({ configured: false });
  }
  return NextResponse.json({
    configured: true,
    provider: cfg.provider,
    model: cfg.model,
  });
}
