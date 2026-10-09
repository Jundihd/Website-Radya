import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  STUDIO_COOKIE_NAME,
  verifyStudioSession,
} from '@/lib/studio-auth';

const PUBLIC_STUDIO_PATHS = ['/studio/login', '/api/studio/login'];

/**
 * Proteksi Studio Blog Editor:
 * - Halaman /studio/* (kecuali /studio/login) butuh sesi login,
 *   selain itu redirect ke /studio/login.
 * - API /api/studio/* (kecuali login) butuh sesi, selain itu 401 JSON.
 * Visitor biasa tidak bisa menebak konten karena tidak ada link publik
 * dan halaman diproteksi + noindex.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_STUDIO_PATHS.includes(pathname)) {
    // Sudah login tapi buka halaman login -> lempar ke editor.
    if (pathname === '/studio/login') {
      const token = req.cookies.get(STUDIO_COOKIE_NAME)?.value;
      if (await verifyStudioSession(token)) {
        return NextResponse.redirect(new URL('/studio', req.url));
      }
    }
    return NextResponse.next();
  }

  const token = req.cookies.get(STUDIO_COOKIE_NAME)?.value;
  const authed = await verifyStudioSession(token);

  if (authed) return NextResponse.next();

  if (pathname.startsWith('/api/studio/')) {
    return NextResponse.json(
      { error: 'Unauthorized. Silakan login dulu di /studio/login.' },
      { status: 401 },
    );
  }

  const loginUrl = new URL('/studio/login', req.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/studio/:path*', '/api/studio/:path*'],
};
