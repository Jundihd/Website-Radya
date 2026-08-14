export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || '';

export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';
export const HOTJAR_SNIPPET_VERSION = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION || '6';

// Global types for Google Analytics & dataLayer window objects
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetIdOrAction: string | Date,
      configOrParams?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Send pageview to Google Analytics
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
  // Inform Hotjar of virtual page change
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('stateChange', url);
  }
};

/**
 * Send custom event to Google Analytics
 */
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, params);
  }
};

/**
 * Send custom event to Hotjar
 */
export const trackHotjarEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('event', eventName);
  }
};

/**
 * Track consultation / lead form submission
 */
export const trackLeadSubmission = (data: {
  name?: string;
  service?: string;
  budget?: string;
  company?: string;
}) => {
  trackEvent('generate_lead', {
    event_category: 'Consultation',
    event_label: data.service || 'General Inquiry',
    service: data.service,
    budget: data.budget,
    company: data.company,
  });

  trackHotjarEvent('lead_form_submitted');
};

/**
 * Track WhatsApp click / direct conversation trigger
 */
export const trackWhatsAppClick = (source: string) => {
  trackEvent('click_whatsapp', {
    event_category: 'Direct Contact',
    event_label: source,
  });

  trackHotjarEvent('whatsapp_click');
};

/**
 * Track primary Call-to-Action button clicks
 */
export const trackCtaClick = (ctaName: string, location: string) => {
  trackEvent('click_cta', {
    event_category: 'CTA Interaction',
    event_label: `${ctaName} (${location})`,
    cta_name: ctaName,
    cta_location: location,
  });
};

/**
 * Track case study / portfolio inspection
 */
export const trackCaseStudyView = (title: string, industry?: string) => {
  trackEvent('view_case_study', {
    event_category: 'Engagement',
    event_label: title,
    industry: industry,
  });
};
