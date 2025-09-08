/**
 * Analytics and Tracking Setup
 * Add this to integrate Google Analytics, Google Tag Manager, etc.
 */

// Declare gtag global function
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Google Analytics 4 Integration
export const initializeGA4 = (measurementId: string) => {
  // Add Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      content_group1: 'Invoice Generator',
      content_group2: 'Business Tool'
    });
  `;
  document.head.appendChild(script2);
};

// Google Tag Manager Integration
export const initializeGTM = (gtmId: string) => {
  // GTM script for head
  const script1 = document.createElement('script');
  script1.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
  document.head.appendChild(script1);

  // GTM noscript for body
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  document.body.insertBefore(noscript, document.body.firstChild);
};

// Track custom events
export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'Invoice Generator',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
};

// Track page views
export const trackPageView = (path: string, title: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title
    });
  }
};

// Track invoice generation
export const trackInvoiceGeneration = (language: string, currency: string) => {
  trackEvent('invoice_generated', {
    event_category: 'Invoice',
    event_label: `${language}_${currency}`,
    language: language,
    currency: currency
  });
};

// Track PDF downloads
export const trackPDFDownload = (invoiceId: string, language: string) => {
  trackEvent('pdf_download', {
    event_category: 'Export',
    event_label: invoiceId,
    language: language
  });
};

// Track language changes
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', {
    event_category: 'Localization',
    event_label: `${fromLang}_to_${toLang}`,
    from_language: fromLang,
    to_language: toLang
  });
};

// Usage Instructions:
/*
1. Add to main App.tsx:
   import { initializeGA4, initializeGTM } from './lib/analytics';

2. Initialize in useEffect:
   useEffect(() => {
     // Replace with your actual IDs
     initializeGA4('G-XXXXXXXXXX');
     initializeGTM('GTM-XXXXXXX');
   }, []);

3. Track events throughout the app:
   import { trackInvoiceGeneration, trackPDFDownload } from './lib/analytics';
   
   // When invoice is generated
   trackInvoiceGeneration(language, currency);
   
   // When PDF is downloaded
   trackPDFDownload(invoiceId, language);

4. Add environment variables:
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_GTM_ID=GTM-XXXXXXX

5. Privacy compliance:
   - Add cookie consent banner
   - Implement opt-out functionality
   - Include privacy policy
   - GDPR compliance for EU users
*/
