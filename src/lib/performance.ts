/**
 * Performance optimization utilities
 */

// Preload critical images
export const preloadImages = () => {
  const imageUrls = [
    '/logo/Logo-light-mode.png',
    '/logo/Logo-dark-mode.png',
    '/logo/Icon.png'
  ];

  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Resource hints for better performance
export const addResourceHints = () => {
  // Preconnect to external domains if any
  const preconnectDomains = [
    // Add any external domains your app connects to
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Critical CSS loading
export const loadCriticalCSS = () => {
  // This would be used if we had critical CSS to load
  // For now, Vite handles CSS optimization
  console.log('Critical CSS handled by Vite build process');
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadImages();
      addResourceHints();
    });
  } else {
    preloadImages();
    addResourceHints();
  }
};
