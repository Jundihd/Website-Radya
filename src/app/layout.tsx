import type { Metadata } from 'next';
import './globals.css';
import { Exo, Raleway } from 'next/font/google';
import { Analytics } from '@/components/analytics/Analytics';
import { Contentsquare } from './contentsquare';
import { StructuredData } from '@/components/seo/StructuredData';

const exo = Exo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-exo',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://radyalabs.com'),
  title: {
    default: 'RADYA LABS — Cloud Native & AI Solutions Partner',
    template: '%s | Radya Labs',
  },
  description:
    'PT Radya Anugrah Digital (Radya Labs) is a leading Cloud Native & AI Solutions Partner in Indonesia. ISO 27001 Certified with 99.9% SLA Guarantee.',
  keywords: [
    'Radya Labs',
    'Cloud Native',
    'AI Solutions',
    'Enterprise OCR',
    'Directus CMS',
    'Java Spring Boot',
    'Golang',
    'PostgreSQL',
    'Azure',
    'AWS',
    'Kubernetes Indonesia',
    'Software House Bandung',
    'Digital Transformation Partner',
  ],
  authors: [{ name: 'Radya Labs Engineering Team', url: 'https://radyalabs.com' }],
  creator: 'PT Radya Anugrah Digital',
  publisher: 'Radya Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RADYA LABS — Cloud Native & AI Solutions Partner',
    description:
      'Empowering enterprise businesses with scalable Cloud Native architecture, Enterprise AI OCR, and high-performance engineering.',
    url: 'https://radyalabs.com',
    siteName: 'Radya Labs',
    images: [
      {
        url: '/images/hero-slide-1.png',
        width: 1200,
        height: 630,
        alt: 'Radya Labs - Cloud Native & AI Solutions Partner',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RADYA LABS — Cloud Native & AI Solutions Partner',
    description:
      'Leading Cloud Native & AI Solutions Partner in Indonesia. ISO 27001 Certified with 99.9% SLA Guarantee.',
    images: ['/images/hero-slide-1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${exo.variable} ${raleway.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased">
        <Contentsquare />
        <Analytics />
        {children}
      </body>
    </html>
  );
}

