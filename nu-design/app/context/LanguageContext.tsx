'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ES' | 'EN' | 'FR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLang: Language; // Mantenido para retrocompatibilidad
  changeLanguage: (lang: Language) => void; // Mantenido para retrocompatibilidad
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ES');

  useEffect(() => {
    const savedLang = localStorage.getItem('nu_lang') || localStorage.getItem('nu_language');
    if (savedLang === 'ES' || savedLang === 'EN' || savedLang === 'FR') {
      setLanguageState(savedLang as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nu_lang', lang);
    localStorage.setItem('nu_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      currentLang: language, 
      changeLanguage: setLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};