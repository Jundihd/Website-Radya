import { NextResponse } from 'next/server';
import { getCareerTestimonials } from '@/lib/career-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const testimonials = await getCareerTestimonials();
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    console.error('[API Career Testimonials] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
