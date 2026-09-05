/**
 * SEO Component for dynamic meta tag management.
 *
 * Rendered inside each page so that every route publishes its own title,
 * description and canonical URL. The prerenderer snapshots the DOM after
 * this has run, so whatever is set here ends up in the static HTML that
 * crawlers receive.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

/** Canonical origin. Never derive this from window.location: during
 *  prerendering the page is served from localhost. */
export const SITE_URL = 'https://invonest.site';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Open Graph type; use "article" for blog posts. */
  type?: 'website' | 'article';
  /** Extra JSON-LD to publish alongside the site-level WebApplication node. */
  structuredData?: Record<string, unknown>;
  noIndex?: boolean;
}

/** Sets document metadata for the current route. Call once per page. */
export const useSEO = ({
  title,
  description,
  keywords,
  image = '/logo/Logo-light-mode.png',
  type = 'website',
  structuredData,
  noIndex = false
}: SEOProps = {}) => {
  const { language, t } = useLanguage();
  const { pathname } = useLocation();

  // Canonical URL: absolute, no query string, always trailing-slashed.
  // GitHub Pages serves prerendered routes from a directory index and 301s
  // /faq -> /faq/, so the canonical must be the slashed form it actually
  // serves; otherwise every page canonicalises to a URL that redirects.
  const canonical = `${SITE_URL}${pathname.endsWith('/') ? pathname : pathname + '/'}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  // Serialise so callers can pass an inline object without re-firing the effect
  // on every render.
  const structuredDataKey = structuredData ? JSON.stringify(structuredData) : '';

  useEffect(() => {
    const pageTitle = title || t('appTitle');
    // Pages supply their own title; append the brand unless the title already
    // carries it, so we never emit "About Invonest | Invonest".
    const fullTitle = title
      ? (title.includes('Invonest') ? title : `${title} | Invonest`)
      : `${pageTitle} | Invonest - Professional Invoice Generator`;
    document.title = fullTitle;

    const metaDescription = description || 'Create professional invoices instantly with Invonest. Supports Arabic, Kurdish, and English with RTL/LTR text direction.';
    updateMetaTag('description', metaDescription);
    updateMetaTag('title', fullTitle);
    updateMetaTag('keywords', keywords || getLocalizedKeywords(language));

    document.documentElement.lang = language;
    updateMetaTag('language', language);

    updateMetaProperty('og:title', fullTitle);
    updateMetaProperty('og:description', metaDescription);
    updateMetaProperty('og:image', absoluteImage);
    updateMetaProperty('og:url', canonical);
    updateMetaProperty('og:type', type);
    updateMetaProperty('og:locale', getOGLocale(language));

    updateMetaProperty('twitter:title', fullTitle);
    updateMetaProperty('twitter:description', metaDescription);
    updateMetaProperty('twitter:image', absoluteImage);

    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateCanonical(canonical);
    updateStructuredData(metaDescription, language, structuredDataKey ? JSON.parse(structuredDataKey) : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, absoluteImage, canonical, type, structuredDataKey, noIndex, language, t]);
};

const SEO: React.FC<SEOProps> = (props) => {
  useSEO(props);
  return null;
};

// Helper functions
const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (element) {
    element.content = content;
  } else {
    element = document.createElement('meta');
    element.name = name;
    element.content = content;
    document.head.appendChild(element);
  }
};

const updateMetaProperty = (property: string, content: string) => {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (element) {
    element.content = content;
  } else {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    element.content = content;
    document.head.appendChild(element);
  }
};

const updateCanonical = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (element) {
    element.href = url;
  } else {
    element = document.createElement('link');
    element.rel = 'canonical';
    element.href = url;
    document.head.appendChild(element);
  }
};

const getLocalizedKeywords = (language: string): string => {
  const keywordSets = {
    en: 'invoice generator, PDF invoice, multilingual invoices, free invoice maker, business invoicing, professional invoices, invoice template, billing software, accounting tools, international invoicing',
    ar: 'مولد الفواتير, فاتورة PDF, فواتير متعددة اللغات, صانع فواتير مجاني, فوترة الأعمال, فواتير احترافية, نموذج فاتورة, برنامج الفوترة, أدوات المحاسبة, الفوترة الدولية',
    ckb: 'بەرهەمهێنەری پسوڵە, پسوڵەی PDF, پسوڵەی فرە زمانە, دروستکەری پسوڵەی بەخۆڕایی, پسوڵەدانی بازرگانی, پسوڵەی پیشەیی, قاڵبی پسوڵە, نەرمەکاڵای پسوڵەدان, ئامرازەکانی ژمێریاری, پسوڵەدانی نێودەوڵەتی'
  };
  return keywordSets[language as keyof typeof keywordSets] || keywordSets.en;
};

const getOGLocale = (language: string): string => {
  const locales = {
    en: 'en_US',
    ar: 'ar_SA',
    ckb: 'ckb_IQ'
  };
  return locales[language as keyof typeof locales] || 'en_US';
};

const SITE_LD_ID = 'ld-site';
const PAGE_LD_ID = 'ld-page';

const updateStructuredData = (
  description: string,
  language: string,
  pageData?: Record<string, unknown>
) => {
  writeJsonLd(SITE_LD_ID, {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invonest",
    "description": description,
    "url": SITE_URL,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "inLanguage": language,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Invonest Team"
    },
    "featureList": [
      "Multilingual invoice generation",
      "PDF export functionality",
      "RTL and LTR text support",
      "Custom branding options",
      "Professional invoice templates",
      "Multiple currency support",
      "Responsive design",
      "Free to use"
    ]
  });

  const existingPageLd = document.getElementById(PAGE_LD_ID);
  if (pageData) {
    writeJsonLd(PAGE_LD_ID, pageData);
  } else if (existingPageLd) {
    existingPageLd.remove();
  }
};

const writeJsonLd = (id: string, data: Record<string, unknown>) => {
  let scriptElement = document.getElementById(id) as HTMLScriptElement | null;
  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.id = id;
    document.head.appendChild(scriptElement);
  }
  scriptElement.textContent = JSON.stringify(data);
};

export default SEO;
