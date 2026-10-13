import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { STUDIO_COOKIE_NAME, verifyStudioSession } from '@/lib/studio-auth';
import {
  getCareerJobs,
  saveCareerJobs,
  getCareerTestimonials,
  saveCareerTestimonials,
  JobListing,
  CareerTestimonial,
} from '@/lib/career-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = cookies();
  const sessionVal = cookieStore.get(STUDIO_COOKIE_NAME)?.value;
  const isAuthed = await verifyStudioSession(sessionVal);

  if (!isAuthed) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const [jobs, testimonials] = await Promise.all([
    getCareerJobs(),
    getCareerTestimonials(),
  ]);

  return NextResponse.json({
    success: true,
    jobs,
    testimonials,
  });
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionVal = cookieStore.get(STUDIO_COOKIE_NAME)?.value;
  const isAuthed = await verifyStudioSession(sessionVal);

  if (!isAuthed) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'save_jobs') {
      const { jobs } = body as { jobs: JobListing[] };
      if (!Array.isArray(jobs)) {
        return NextResponse.json({ success: false, error: 'Invalid jobs array' }, { status: 400 });
      }
      const ok = await saveCareerJobs(jobs);
      return NextResponse.json({ success: ok, message: 'Daftar lowongan karir berhasil disimpan.' });
    }

    if (action === 'save_testimonials') {
      const { testimonials } = body as { testimonials: CareerTestimonial[] };
      if (!Array.isArray(testimonials)) {
        return NextResponse.json({ success: false, error: 'Invalid testimonials array' }, { status: 400 });
      }
      const ok = await saveCareerTestimonials(testimonials);
      return NextResponse.json({ success: ok, message: 'Daftar testimoni kru berhasil disimpan.' });
    }

    if (action === 'toggle_job') {
      const { jobId } = body as { jobId: string };
      const currentJobs = await getCareerJobs();
      const updated = currentJobs.map((j) => (j.id === jobId ? { ...j, isOpen: !j.isOpen } : j));
      const ok = await saveCareerJobs(updated);
      return NextResponse.json({ success: ok, jobs: updated });
    }

    if (action === 'toggle_testimonial') {
      const { testimonialId } = body as { testimonialId: string };
      const currentTestis = await getCareerTestimonials();
      const updated = currentTestis.map((t) => (t.id === testimonialId ? { ...t, isPublished: !t.isPublished } : t));
      const ok = await saveCareerTestimonials(updated);
      return NextResponse.json({ success: ok, testimonials: updated });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('[API Studio Career] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
