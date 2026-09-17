import React from 'react';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/data';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { PortfolioListingClientView } from './PortfolioListingClientView';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Portofolio & Studi Kasus Sistem Enterprise | Radya Labs',
  description: 'Koleksi lengkap studi kasus arsitektur sistem skala nasional yang dibangun oleh Radya Labs untuk Kemendikbud, OJK, Bio Farma, Mitsubishi, dan MNC Bank.',
  keywords: [
    'Radya Labs Portofolio',
    'Studi Kasus ANBK Kemendikbud',
    'SIKePO OJK',
    'BioAudit Bio Farma',
    'Software Architecture Case Study',
  ],
  alternates: {
    canonical: `${COMPANY_CONFIG.url}/portofolio`,
  },
  openGraph: {
    title: 'Portofolio & Studi Kasus Sistem Enterprise | Radya Labs',
    description: 'Koleksi lengkap studi kasus arsitektur sistem skala nasional oleh Radya Labs.',
    url: `${COMPANY_CONFIG.url}/portofolio`,
    siteName: 'Radya Labs',
    type: 'website',
    locale: 'en_US',
  },
};

// Fully static portfolio hub — all case studies live in src/lib/data.ts.
export default async function PortfolioHubPage() {
  return (
    <>
      <PortfolioListingClientView initialPortfolios={CASE_STUDIES} />
    </>
  );
}
