'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SimuladorColorCMYK from '@/app/components/SimuladorColorCMYK';
import Footer from '../../components/Footer';
import WordmarkLogo from '../../components/WordmarkLogo';
import { useLanguage } from '../../context/LanguageContext';
import { dictionary } from '../../lib/translations';

export default function SimuladorColorPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage } = useLanguage();
  const navT = dictionary[language as keyof typeof dictionary]?.nav || {
    inicio: 'inicio',
    utilidades: 'utilidades',
    idiomas: 'IDIOMAS',
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('nu_theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('nu_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans selection:bg-red-600 selection:text-white transition-colors duration-700 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Header Oficial con Wordmark SVG Adaptativo */}
      <header className={`w-full px-6 py-5 flex justify-between items-center border-b backdrop-blur-2xl sticky top-0 z-50 transition-colors ${
        theme === 'dark' ? 'border-white/10 bg-zinc-950/80' : 'border-black/10 bg-white/80'
      }`}>
        <WordmarkLogo className="h-8 w-auto" />

        <div className="flex items-center space-x-4">
          <div className="relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 text-white hover:border-red-500/40'
                  : 'bg-black/5 border border-black/10 text-zinc-900 hover:border-red-500/40'
              }`}
            >
              <span>{navT.idiomas}</span>
              <span className="text-red-500 font-bold ml-1">({language})</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                    theme === 'dark' ? 'bg-black/90 border-white/15 text-zinc-200' : 'bg-white/95 border-black/10 text-zinc-800'
                  }`}
                >
                  <button onClick={() => { setLanguage('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Español</button>
                  <button onClick={() => { setLanguage('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">English</button>
                  <button onClick={() => { setLanguage('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/utilidades" className="text-xs uppercase tracking-widest text-red-500 hover:text-red-400 font-bold transition-all flex items-center gap-1.5">
            ← {navT.utilidades}
          </Link>
        </div>
      </header>

      {/* Selector Flotante de Tema (Light / Dark) */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl transition-transform hover:scale-110" title="Modo Oscuro"></button>
      </div>

      {/* Contenido Full Screen */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1 relative z-10">
        <div className="mb-6 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block">
            Engine v2.5 • Gamut Color Converter
          </span>
          <h1 className={`text-2xl md:text-3xl font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Simulador de Color: Pantalla (RGB) vs. Impresión (CMYK)
          </h1>
          <p className="text-xs opacity-75 leading-relaxed font-medium">
            Visualiza en tiempo real la variación de saturación y brillo que sufren los colores al convertirse de luz digital a tinta física.
          </p>
        </div>

        <SimuladorColorCMYK />
      </main>

      <Footer />
    </div>
  );
}