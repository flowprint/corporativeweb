import { getCookie } from '@/lib/cookies';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initializeGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID is not set');
    return;
  }

  const consentCookie = getCookie('cookie_consent');
  const consent = consentCookie ? JSON.parse(consentCookie) : null;
  const analyticsEnabled = consent?.analytics ?? false;

  // Add the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());

  // Set default consent state
  window.gtag('consent', 'default', {
    'analytics_storage': analyticsEnabled ? 'granted' : 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted'
  });

  // Initialize GA with the measurement ID
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: analyticsEnabled
  });
};

export const updateAnalyticsConsent = (granted: boolean) => {
  if (!window.gtag) return;

  window.gtag('consent', 'update', {
    'analytics_storage': granted ? 'granted' : 'denied'
  });
};

// Custom hook for tracking events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!window.gtag) return;

  const consentCookie = getCookie('cookie_consent');
  const consent = consentCookie ? JSON.parse(consentCookie) : null;
  if (!consent?.analytics) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};