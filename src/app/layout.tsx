import type { Metadata } from 'next';
import './globals.css';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { Analytics } from '@/components/analytics/Analytics';
import { Contentsquare } from './contentsquare';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RADYA LABS — Cloud Native & AI Solutions Partner',
  description:
    'PT Radya Anugrah Digital (Radya Labs) is a leading Cloud Native & AI Solutions Partner in Indonesia. ISO 27001 Certified with 99.9% SLA Guarantee.',
  keywords: [
    'Radya Labs',
    'Cloud Native',
    'AI Solutions',
    'Directus CMS',
    'Java Spring Boot',
    'Golang',
    'PostgreSQL',
    'Azure',
    'Software House Bandung',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased">
        <Contentsquare />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
