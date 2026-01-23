/**
 * Ezoic Ads Integration
 * 
 * This file handles the initialization and configuration of Ezoic ads
 * Ezoic will automatically insert ads into designated placeholders
 */

export interface EzoicConfig {
  enabled: boolean;
  siteId?: string;
  placeholderIds: string[];
}

// Default configuration
const DEFAULT_CONFIG: EzoicConfig = {
  enabled: true,
  placeholderIds: [
    'ezoic-pub-ad-placeholder-101', // Top banner
    'ezoic-pub-ad-placeholder-102', // Sidebar
    'ezoic-pub-ad-placeholder-103', // In-content
    'ezoic-pub-ad-placeholder-104', // Bottom banner
  ],
};

/**
 * Initialize Ezoic ads
 * This function should be called once when the app initializes
 */
export function initializeEzoicAds(config: Partial<EzoicConfig> = {}): void {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  if (!finalConfig.enabled) {
    console.log('[Ezoic] Ads disabled');
    return;
  }

  // Check if Ezoic script is loaded
  if (typeof window !== 'undefined') {
    // Ezoic automatically loads their script via their integration
    // We just need to ensure placeholders exist in the DOM
    console.log('[Ezoic] Initializing ad integration');

    // Add Ezoic script tag if not already present
    // Note: In production, Ezoic will automatically inject their script
    // This is just a placeholder for development/testing
    loadEzoicScript();

    // Initialize placeholder visibility tracking
    trackPlaceholderVisibility(finalConfig.placeholderIds);
  }
}

/**
 * Load Ezoic script (if not already loaded)
 * In production, Ezoic injects this automatically when integrated with their platform
 */
function loadEzoicScript(): void {
  // Check if Ezoic is already loaded
  if (document.querySelector('script[src*="ezoic"]')) {
    console.log('[Ezoic] Script already loaded');
    return;
  }

  // Note: The actual Ezoic script URL will be provided by Ezoic
  // after site approval and integration setup
  // This is a placeholder implementation
  console.log('[Ezoic] Waiting for Ezoic platform integration');
  
  // When Ezoic approves your site, they provide specific integration code
  // That code will be added here or in index.html
}

/**
 * Track when ad placeholders become visible
 * This helps with lazy loading and performance
 */
function trackPlaceholderVisibility(placeholderIds: string[]): void {
  if (!('IntersectionObserver' in window)) {
    return; // Browser doesn't support IntersectionObserver
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('ezoic-ad-visible');
          console.log('[Ezoic] Placeholder visible:', element.id);
        }
      });
    },
    {
      rootMargin: '100px', // Start loading 100px before placeholder is visible
      threshold: 0.01,
    }
  );

  // Observe each placeholder
  placeholderIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });
}

/**
 * Create an ad placeholder element
 * Use this to programmatically add ad placeholders
 */
export function createAdPlaceholder(
  id: string,
  className: string = 'ezoic-ad'
): HTMLDivElement {
  const placeholder = document.createElement('div');
  placeholder.id = id;
  placeholder.className = `${className} ezoic-ad-loading`;
  placeholder.setAttribute('data-ezoic-ad', 'true');
  
  // Add a label (optional)
  const label = document.createElement('div');
  label.className = 'ezoic-ad-label';
  label.textContent = 'Advertisement';
  placeholder.appendChild(label);

  return placeholder;
}

/**
 * Refresh ads on a page (useful for SPA navigation)
 */
export function refreshEzoicAds(): void {
  if (typeof window !== 'undefined' && (window as any).ezstandalone) {
    try {
      (window as any).ezstandalone.refresh();
      console.log('[Ezoic] Ads refreshed');
    } catch (error) {
      console.error('[Ezoic] Error refreshing ads:', error);
    }
  }
}

/**
 * Disable ads (useful for premium users or specific conditions)
 */
export function disableEzoicAds(): void {
  console.log('[Ezoic] Disabling ads');
  const adElements = document.querySelectorAll('[data-ezoic-ad]');
  adElements.forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
}

/**
 * Enable ads
 */
export function enableEzoicAds(): void {
  console.log('[Ezoic] Enabling ads');
  const adElements = document.querySelectorAll('[data-ezoic-ad]');
  adElements.forEach((el) => {
    (el as HTMLElement).style.display = '';
  });
}

/**
 * Check if Ezoic is loaded and active
 */
export function isEzoicActive(): boolean {
  return typeof window !== 'undefined' && !!(window as any).ezstandalone;
}

// Export configuration for use in other files
export { DEFAULT_CONFIG as EZOIC_CONFIG };
