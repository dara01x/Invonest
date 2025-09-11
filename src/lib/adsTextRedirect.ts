// Ezoic Ads.txt Redirect Handler
// This script handles the ads.txt redirect for GitHub Pages deployment

export const handleAdsTextRedirect = (): void => {
  // Check if the current path is /ads.txt
  if (window.location.pathname === '/ads.txt' || window.location.pathname.endsWith('/ads.txt')) {
    // Redirect to Ezoic Ads.txt Manager
    window.location.replace('https://srv.adstxtmanager.com/19390/invonest.me');
  }
};

// Initialize redirect handler when DOM is ready
export const initializeAdsTextRedirect = (): void => {
  if (typeof window !== 'undefined') {
    // Handle immediate redirect
    handleAdsTextRedirect();
    
    // Handle navigation changes (for SPAs)
    window.addEventListener('popstate', handleAdsTextRedirect);
    
    // Monitor for ads.txt requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0];
      if (typeof url === 'string' && url.includes('/ads.txt')) {
        window.location.href = 'https://srv.adstxtmanager.com/19390/invonest.me';
        return Promise.reject(new Error('Redirecting to Ezoic Ads.txt Manager'));
      }
      return originalFetch.apply(this, args);
    };
  }
};
