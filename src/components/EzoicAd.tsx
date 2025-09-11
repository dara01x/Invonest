import { useEffect, useRef } from 'react';
import { AD_PLACEMENTS, waitForEzoic } from '@/lib/ezoicAds';

interface EzoicAdProps {
  placementId: number;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...placementIds: number[]) => void;
    };
  }
}

export const EzoicAd = ({ placementId, className = '', style }: EzoicAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    
    const initializeAd = async () => {
      // Wait for Ezoic scripts to load
      const loaded = await waitForEzoic();
      
      if (!loaded) {
        console.warn(`Ezoic ad ${placementId} failed to initialize - scripts not loaded`);
        return;
      }

      if (window.ezstandalone) {
        window.ezstandalone.cmd = window.ezstandalone.cmd || [];
        
        window.ezstandalone.cmd.push(() => {
          try {
            window.ezstandalone?.showAds(placementId);
            hasInitialized.current = true;
          } catch (error) {
            console.warn(`Ezoic ad ${placementId} failed to load:`, error);
          }
        });
      }
    };

    initializeAd();
  }, [placementId]);

  return (
    <div 
      ref={adRef}
      id={`ezoic-pub-ad-placeholder-${placementId}`}
      className={`ezoic-ad ${className}`}
      style={style}
      aria-label="Advertisement"
      role="img"
    />
  );
};

// Helper component for multiple ad placements on a single page
interface EzoicAdGroupProps {
  placementIds: number[];
  className?: string;
}

export const EzoicAdGroup = ({ placementIds, className = '' }: EzoicAdGroupProps) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || placementIds.length === 0) return;
    
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd = window.ezstandalone.cmd || [];
      
      window.ezstandalone.cmd.push(() => {
        try {
          window.ezstandalone?.showAds(...placementIds);
          hasInitialized.current = true;
        } catch (error) {
          console.warn('Ezoic ads failed to load:', error);
        }
      });
    }
  }, [placementIds]);

  return (
    <div className={className}>
      {placementIds.map((placementId) => (
        <div 
          key={placementId}
          id={`ezoic-pub-ad-placeholder-${placementId}`}
          className="ezoic-ad"
          aria-label="Advertisement"
          role="img"
        />
      ))}
    </div>
  );
};

// Predefined ad placement components for common locations
export const HeaderAd = () => (
  <EzoicAd 
    placementId={AD_PLACEMENTS.HEADER_AD} 
    className="w-full max-w-4xl mx-auto my-4 text-center"
  />
);

export const SidebarAd = () => (
  <EzoicAd 
    placementId={AD_PLACEMENTS.SIDEBAR_AD} 
    className="w-full max-w-xs mx-auto my-4"
  />
);

export const FooterAd = () => (
  <EzoicAd 
    placementId={AD_PLACEMENTS.FOOTER_AD} 
    className="w-full max-w-4xl mx-auto my-4 text-center"
  />
);

export const InContentAd = () => (
  <EzoicAd 
    placementId={AD_PLACEMENTS.IN_CONTENT_AD} 
    className="w-full max-w-2xl mx-auto my-6 text-center"
  />
);

export const MobileAd = () => (
  <EzoicAd 
    placementId={AD_PLACEMENTS.MOBILE_AD} 
    className="w-full max-w-sm mx-auto my-4 block sm:hidden"
  />
);

export const DesktopAd = () => (
  <EzoicAd 
    placementId={AD_PLACEMENTS.DESKTOP_AD} 
    className="w-full max-w-4xl mx-auto my-4 hidden sm:block"
  />
);
