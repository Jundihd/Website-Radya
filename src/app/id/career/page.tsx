import React from 'react';
import type { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { CareerClientView } from './CareerClientView';

export const metadata: Metadata = {
  title: 'Karier di Radya Labs — Di Sini Kami Bukan Karyawan. Kami Kru.',
  description:
    'Sejak 2011 kami membangun aplikasi dan sistem untuk perusahaan di seluruh Indonesia dari Bandung. Kami mencari kru yang mau terus belajar, kerja efektif 8 jam/hari tanpa lembur, dan tetap punya waktu untuk hidup di luar kantor.',
  keywords: [
    'Karier Radya Labs',
    'Lowongan Kerja Bandung',
    'Lowongan Software House Bandung',
    'Lowongan Project Manager Bandung',
    'Lowongan Developer Bandung',
    'Budaya Kerja Radya Labs',
    'Karier Kru Radya Digital',
  ],
  alternates: {
    canonical: `${COMPANY_CONFIG.url}/id/career`,
  },
  openGraph: {
    title: 'Karier di Radya Labs — Di Sini Kami Bukan Karyawan. Kami Kru.',
    description:
      'Sejak 2011 kami membangun aplikasi dan sistem enterprise dari Bandung. Bergabunglah bersama kru Radya Labs.',
    url: `${COMPANY_CONFIG.url}/id/career`,
    siteName: 'Radya Labs',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/hero-slide-1.png',
        width: 1200,
        height: 630,
        alt: 'Karier di Radya Labs - Kami Bukan Karyawan, Kami Kru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karier di Radya Labs — Di Sini Kami Bukan Karyawan. Kami Kru.',
    description:
      'Sejak 2011 kami membangun aplikasi dan sistem enterprise dari Bandung. Bergabunglah bersama kru Radya Labs.',
    images: ['/images/hero-slide-1.png'],
  },
};

export default function CareerPage() {
  return <CareerClientView />;
}
