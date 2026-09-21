import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { POSTS_DIR } from '@/lib/posts';

// Diproteksi middleware (401 jika belum login).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get('slug') || '').trim().toLowerCase();
  if (!slug) return NextResponse.json({ exists: false });

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  return NextResponse.json({ exists: fs.existsSync(filePath) });
}
