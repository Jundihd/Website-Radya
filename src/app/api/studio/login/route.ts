import { NextResponse } from 'next/server';
import {
  STUDIO_COOKIE_NAME,
  STUDIO_SESSION_TTL_MS,
  createStudioSession,
  getAdminPassword,
} from '@/lib/studio-auth';

export async function POST(req: Request) {
  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return NextResponse.json(
      {
        error:
          'BLOG_ADMIN_PASSWORD belum diset di environment server. Hubungi admin teknis.',
      },
      { status: 500 },
    );
  }

  let password = '';
  try {
    const body = await req.json();
    password = String(body?.password || '');
  } catch {
    return NextResponse.json({ error: 'Body tidak valid.' }, { status: 400 });
  }

  if (!password || password !== adminPassword) {
    // Delay kecil untuk memperlambat brute force.
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: 'Password salah.' }, { status: 401 });
  }

  const { value, expiresAt } = await createStudioSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDIO_COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expiresAt),
    maxAge: Math.floor(STUDIO_SESSION_TTL_MS / 1000),
  });
  return res;
}
