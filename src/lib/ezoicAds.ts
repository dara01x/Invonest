// Ezoic Ad Management Script
// This script manages all Ezoic ad placements across the application

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...placementIds: number[]) => void;
    };
  }
}

// Ad placement configuration
export const AD_PLACEMENTS = {
  // Landing Page Ads
  HEADER_AD: 101,
  IN_CONTENT_AD: 104,
  FOOTER_AD: 103,
  
  // Invoice Form Ads
  SIDEBAR_AD: 102,
  INVOICE_CONTENT_AD: 107,
  
  // Mobile Specific
  MOBILE_AD: 105,
  
  // Desktop Specific
  DESKTOP_AD: 106,
  
  // Additional Placements
  FEATURE_AD: 108,
  TESTIMONIAL_AD: 109,
} as const;

// Initialize all ads for a specific page
export const initializePageAds = (placementIds: number[]): void => {
  if (typeof window === 'undefined') return;
  
  // Ensure Ezoic scripts are loaded
  if (!window.ezstandalone) {
    console.warn('Ezoic scripts not loaded yet');
    return;
  }

  window.ezstandalone.cmd = window.ezstandalone.cmd || [];
  
  window.ezstandalone.cmd.push(() => {
    try {
      // Show all ads for the page at once for better performance
      window.ezstandalone?.showAds(...placementIds);
      console.log('Ezoic ads initialized for placements:', placementIds);
    } catch (error) {
      console.warn('Failed to initialize Ezoic ads:', error);
    }
  });
};

// Landing page ad initialization
export const initializeLandingPageAds = (): void => {
  const placements = [
    AD_PLACEMENTS.HEADER_AD,
    AD_PLACEMENTS.IN_CONTENT_AD,
    AD_PLACEMENTS.FOOTER_AD,
    AD_PLACEMENTS.DESKTOP_AD,
    AD_PLACEMENTS.MOBILE_AD,
  ];
  
  initializePageAds(placements);
};

// Invoice form ad initialization
export const initializeInvoiceFormAds = (): void => {
  const placements = [
    AD_PLACEMENTS.SIDEBAR_AD,
    AD_PLACEMENTS.INVOICE_CONTENT_AD,
    AD_PLACEMENTS.MOBILE_AD,
  ];
  
  initializePageAds(placements);
};

// Utility function to check if Ezoic scripts are loaded
export const isEzoicLoaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.ezstandalone;
};

// Utility function to wait for Ezoic scripts to load
export const waitForEzoic = (timeout = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isEzoicLoaded()) {
      resolve(true);
      return;
    }

    let attempts = 0;
    const maxAttempts = timeout / 100;
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (isEzoicLoaded()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.warn('Ezoic scripts failed to load within timeout');
        resolve(false);
      }
    }, 100);
  });
};
