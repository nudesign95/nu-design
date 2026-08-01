'use client';
import React, { createContext, useContext, useState } from 'react';

export type Language = 'ES' | 'EN' | 'FR';

interface LanguageContextType {
  currentLang: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicialización síncrona desde localStorage para evitar setState en efectos
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('nu_language');
      if (savedLang === 'ES' || savedLang === 'EN' || savedLang === 'FR') {
        return savedLang;
      }
    }
    return 'ES';
  });

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('nu_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage }}>
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