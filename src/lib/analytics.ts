export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID ||
  'GTM-5GQVZ7X2';

export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';
export const HOTJAR_SNIPPET_VERSION = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION || '6';

// Global types for Google Tag Manager dataLayer & window objects
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetIdOrAction: string | Date,
      configOrParams?: Record<string, any>
    ) => void;
  }
}

/**
 * Send pageview to GTM dataLayer & Hotjar
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: url,
      });
    }
    // Inform Hotjar of virtual page change
    if (window.hj) {
      window.hj('stateChange', url);
    }
  }
};

/**
 * Send custom event to Google Tag Manager (GTM) via dataLayer
 */
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      ...params,
    });
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
  stage?: string;
  budget?: string;
  company?: string;
}) => {
  trackEvent('generate_lead', {
    event_category: 'Consultation',
    event_label: data.service || 'General Inquiry',
    service: data.service,
    development_stage: data.stage || data.budget,
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
