import { NextResponse } from 'next/server';
import { STUDIO_COOKIE_NAME } from '@/lib/studio-auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDIO_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
