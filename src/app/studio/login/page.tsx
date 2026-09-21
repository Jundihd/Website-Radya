import { Suspense } from 'react';
import { StudioLoginForm } from './StudioLoginForm';

export const metadata = {
  title: 'Studio Login | Radya Labs',
  robots: { index: false, follow: false },
};

export default function StudioLoginPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex items-center justify-center px-4">
      <Suspense fallback={null}>
        <StudioLoginForm />
      </Suspense>
    </div>
  );
}
