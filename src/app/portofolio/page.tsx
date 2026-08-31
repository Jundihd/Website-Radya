import React from 'react';
import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/data';
import { fetchLiveCmsPortfolios } from '@/lib/directus';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { CaseStudy } from '@/types';
import { PortfolioListingClientView } from './PortfolioListingClientView';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Portofolio & Studi Kasus Sistem Enterprise | Radya Labs',
  description: 'Koleksi lengkap 25+ studi kasus arsitektur sistem skala nasional yang dibangun oleh Radya Labs untuk Kemendikbud, OJK, Bio Farma, Mitsubishi, dan MNC Bank.',
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
    description: 'Koleksi lengkap 25+ studi kasus arsitektur sistem skala nasional oleh Radya Labs.',
    url: `${COMPANY_CONFIG.url}/portofolio`,
    siteName: 'Radya Labs',
    type: 'website',
    locale: 'en_US',
  },
};

// Fetch live CMS portfolios if available, else return static CASE_STUDIES
async function getAllPortfolios(): Promise<CaseStudy[]> {
  try {
    const cmsPortfolios = await fetchLiveCmsPortfolios();
    if (cmsPortfolios && cmsPortfolios.length > 0) {
      return cmsPortfolios;
    }
  } catch (err) {
    console.error('Error fetching portfolios for portfolio hub page:', err);
  }
  return CASE_STUDIES;
}

export default async function PortfolioHubPage() {
  const portfolios = await getAllPortfolios();

  return (
    <>
      <PortfolioListingClientView initialPortfolios={portfolios} />
    </>
  );
}
