import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/i18n';
import { useTranslation } from '@/lib/i18n';

const STORAGE_KEY = 'invoice-generator-language';

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
  t: (key: keyof typeof import('@/lib/i18n').translations.en) => string;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return (stored as Language) || 'en';
    }
    return 'en';
  });

  const { t, dir } = useTranslation(language);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};
