import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { STUDIO_COOKIE_NAME, verifyStudioSession } from '@/lib/studio-auth';

export const metadata = {
  title: 'Studio | Radya Labs',
  robots: { index: false, follow: false },
};

export default async function StudioIndexPage() {
  const authed = await verifyStudioSession(
    cookies().get(STUDIO_COOKIE_NAME)?.value,
  );
  redirect(authed ? '/studio/blog/create' : '/studio/login');
}
