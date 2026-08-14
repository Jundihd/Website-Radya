import React from 'react';
import { COMPANY_CONFIG } from '@/lib/company-info';
import { FAQS, SERVICES_LIST } from '@/lib/data';

export const StructuredData: React.FC = () => {
  // Organization & Local Business Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${COMPANY_CONFIG.url}/#organization`,
    name: COMPANY_CONFIG.name,
    alternateName: COMPANY_CONFIG.brandName,
    url: COMPANY_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: COMPANY_CONFIG.logo,
      width: '210',
      height: '42',
    },
    image: `${COMPANY_CONFIG.url}/images/hero-slide-1.png`,
    description: COMPANY_CONFIG.description,
    email: COMPANY_CONFIG.contacts.email,
    telephone: COMPANY_CONFIG.contacts.phoneOfficeRaw,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_CONFIG.address.streetAddress,
      addressLocality: COMPANY_CONFIG.address.addressLocality,
      addressRegion: COMPANY_CONFIG.address.addressRegion,
      postalCode: COMPANY_CONFIG.address.postalCode,
      addressCountry: COMPANY_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_CONFIG.geo.latitude,
      longitude: COMPANY_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: COMPANY_CONFIG.operatingHours.opens,
        closes: COMPANY_CONFIG.operatingHours.closes,
      },
    ],
    sameAs: [
      COMPANY_CONFIG.socialLinks.linkedin,
      COMPANY_CONFIG.socialLinks.instagram,
      COMPANY_CONFIG.socialLinks.youtube,
      COMPANY_CONFIG.socialLinks.facebook,
      COMPANY_CONFIG.socialLinks.clutch,
    ],
    knowsAbout: [
      'Cloud Native Architecture',
      'Microservices Development',
      'Enterprise Artificial Intelligence',
      'Intelligent OCR Processing',
      'Kubernetes & Docker',
      'DevOps CI/CD Automation',
      'Directus Headless CMS',
      'Java Spring Boot & Golang',
      'ISO 27001 Security Standard',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Radya Labs Technology & AI Services',
      itemListElement: SERVICES_LIST.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title.ID,
          description: service.description.ID,
        },
        position: index + 1,
      })),
    },
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${COMPANY_CONFIG.url}/#website`,
    url: COMPANY_CONFIG.url,
    name: 'Radya Labs — Cloud Native & AI Solutions Partner',
    publisher: {
      '@id': `${COMPANY_CONFIG.url}/#organization`,
    },
    inLanguage: ['id-ID', 'en-US'],
  };

  // FAQ Page Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question.ID,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.ID,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
