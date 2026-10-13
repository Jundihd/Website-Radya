import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { STUDIO_COOKIE_NAME, verifyStudioSession } from '@/lib/studio-auth';
import { CareerAdminDashboard } from '@/components/studio/CareerAdminDashboard';

export const metadata = {
  title: 'Manajemen Karir & Testimoni | Studio Radya Labs',
  robots: { index: false, follow: false },
};

export default async function StudioCareerPage() {
  const authed = await verifyStudioSession(
    cookies().get(STUDIO_COOKIE_NAME)?.value,
  );
  if (!authed) redirect('/studio/login');
  return <CareerAdminDashboard />;
}
