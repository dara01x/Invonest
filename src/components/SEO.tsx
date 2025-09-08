/**
 * SEO Component for dynamic meta tag management
 */
import { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/logo/Logo-light-mode.png',
  url = window.location.href,
  noIndex = false
}) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Update document title
    const pageTitle = title || t('appTitle');
    const fullTitle = `${pageTitle} | Invonest - Professional Invoice Generator`;
    document.title = fullTitle;

    // Update meta description
    const metaDescription = description || 'Create professional invoices instantly with Invonest. Supports Arabic, Kurdish, and English with RTL/LTR text direction.';
    updateMetaTag('description', metaDescription);

    // Update keywords
    const metaKeywords = keywords || getLocalizedKeywords(language);
    updateMetaTag('keywords', metaKeywords);

    // Update language
    document.documentElement.lang = language;
    updateMetaTag('language', language);

    // Update Open Graph tags
    updateMetaProperty('og:title', fullTitle);
    updateMetaProperty('og:description', metaDescription);
    updateMetaProperty('og:image', `${window.location.origin}${image}`);
    updateMetaProperty('og:url', url);
    updateMetaProperty('og:locale', getOGLocale(language));

    // Update Twitter tags
    updateMetaProperty('twitter:title', fullTitle);
    updateMetaProperty('twitter:description', metaDescription);
    updateMetaProperty('twitter:image', `${window.location.origin}${image}`);

    // Update robots
    const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow';
    updateMetaTag('robots', robotsContent);

    // Update canonical URL
    updateCanonical(url);

    // Update structured data
    updateStructuredData(pageTitle, metaDescription, language);

  }, [title, description, keywords, image, url, noIndex, language, t]);

  return null; // This component doesn't render anything
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

const updateStructuredData = (title: string, description: string, language: string) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invonest",
    "description": description,
    "url": window.location.origin,
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
  };

  let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  if (scriptElement) {
    scriptElement.textContent = JSON.stringify(structuredData);
  } else {
    scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptElement);
  }
};

export default SEO;
