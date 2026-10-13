import { NextResponse } from 'next/server';
import { getCareerJobs } from '@/lib/career-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await getCareerJobs();
    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    console.error('[API Career Jobs] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
