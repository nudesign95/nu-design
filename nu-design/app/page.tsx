'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
  ES: {
    inicio: 'inicio',
    portafolio: 'portafolio',
    contratar: 'contratar',
    contacto: 'contacto',
    whatsapp: 'Whatsapp',
    cotizacion: 'Cotización',
    searchPlaceholder: 'Hola, necesito...',
    rights: 'Nu-Design Derechos reservados 2026 - Design by Garic Edume',
    chat: 'Chat now'
  },
  EN: {
    inicio: 'home',
    portafolio: 'portfolio',
    contratar: 'hire us',
    contacto: 'contact',
    whatsapp: 'Whatsapp',
    cotizacion: 'Quote',
    searchPlaceholder: 'Hello, I need...',
    rights: 'Nu-Design All rights reserved 2026 - Design by Garic Edume',
    chat: 'Chat now'
  },
  FR: {
    inicio: 'accueil',
    portafolio: 'portfolio',
    contratar: 'embaucher',
    contacto: 'contact',
    whatsapp: 'Whatsapp',
    cotizacion: 'Devis',
    searchPlaceholder: 'Bonjour, j\'ai besoin...',
    rights: 'Nu-Design Tous droits réservés 2026 - Design by Garic Edume',
    chat: 'Discuter'
  }
};

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  useEffect(() => {
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cotizacion?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleServiceClick = (serviceName: string) => {
    setSearchQuery(serviceName);
  };

  return (
    <div className={`min-h-[110vh] flex flex-col justify-between transition-colors duration-700 relative overflow-hidden py-6 ${theme === 'dark' ? 'bg-[#050000] text-zinc-100' : 'bg-[#e8e2dc] text-zinc-800'}`}>
      
      {/* Fondo con brillo ambiental animado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-linear-to-tr from-red-700/30 via-red-900/20 to-transparent rounded-full blur-[140px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#050000]/60 to-[#030000]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-150 h-150 bg-orange-200/50 rounded-full blur-[120px]"></div>
        )}
      </motion.div>

      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-10 py-4 flex items-center justify-between z-20"
      >
        <nav className="flex items-center space-x-10 text-base font-medium">
          <div className="relative flex flex-col items-start cursor-pointer group py-1">
            <span className="hover:opacity-75 transition-opacity tracking-wide">{t.inicio}</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full"></div>
          </div>
          
          <Link href="/portafolio" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">{t.portafolio}</Link>
          <Link href="/contratar" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">{t.contratar}</Link>
          <Link href="/contacto" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">{t.contacto}</Link>
        </nav>

        <div className="flex items-center space-x-5">
          
          {/* Selector de Idiomas Desplegable */}
          <div className="relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-xs uppercase tracking-widest opacity-70 hover:opacity-100 font-semibold px-3 py-1.5 transition-opacity flex items-center space-x-1 focus:outline-none"
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold">({currentLang})</span>
              <i className={`fa-solid fa-chevron-down text-[10px] ml-1 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-36 backdrop-blur-2xl bg-black/80 dark:bg-zinc-900/90 border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50 py-1"
                >
                  <button 
                    onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} 
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${currentLang === 'ES' ? 'text-red-500 font-bold' : 'text-zinc-300'}`}
                  >
                    <span>Español</span> {currentLang === 'ES' && <i className="fa-solid fa-check text-[10px]"></i>}
                  </button>
                  <button 
                    onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} 
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${currentLang === 'EN' ? 'text-red-500 font-bold' : 'text-zinc-300'}`}
                  >
                    <span>English</span> {currentLang === 'EN' && <i className="fa-solid fa-check text-[10px]"></i>}
                  </button>
                  <button 
                    onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} 
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${currentLang === 'FR' ? 'text-red-500 font-bold' : 'text-zinc-300'}`}
                  >
                    <span>Français</span> {currentLang === 'FR' && <i className="fa-solid fa-check text-[10px]"></i>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/18294608316" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-6 py-2 rounded-full text-sm font-normal flex items-center space-x-2.5 shadow-lg hover:bg-white/20 transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
            <span>{t.whatsapp}</span>
          </motion.a>
          
          {/* BOTÓN DE COTIZACIÓN BLINDADO Y CORREGIDO */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-7 py-2 rounded-full text-sm font-normal shadow-lg hover:bg-white/20 transition-colors cursor-pointer"
          >
            <Link href="/cotizacion" className="w-full h-full block">
              {t.cotizacion}
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Theme Switcher (Fixed Right Side) */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30"
      >
        <button onClick={() => setTheme('light')} className="w-8 h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Oscuro"></button>
      </motion.div>

      {/* Main Hero Section */}
      <main className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center my-auto z-10 space-y-10 py-10">
        
        {/* Icono superior */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer w-28 h-28 flex items-center justify-center"
        >
          <Image 
            src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} 
            alt="NU-Design Icon" 
            width={112} 
            height={112} 
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105" 
            priority
          />
        </motion.div>

        {/* Wordmark */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-72 md:w-88 flex items-center justify-center"
        >
          <Image 
            src={theme === 'dark' ? '/wordmark-dark.svg' : '/wordmark-light.svg'} 
            alt="NU-Design Wordmark" 
            width={320} 
            height={80} 
            className="w-full h-auto object-contain drop-shadow-md" 
            priority
          />
        </motion.div>

        {/* Sub-icons row interactivos */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="flex items-center space-x-8 text-xl opacity-80"
        >
          <i onClick={() => handleServiceClick("Idea y Concepto")} className="fa-solid fa-lightbulb hover:text-red-500 transition-colors cursor-pointer" title="Idea & Concept"></i>
          <i onClick={() => handleServiceClick("Branding")} className="fa-solid fa-pen-nib hover:text-red-500 transition-colors cursor-pointer" title="Branding"></i>
          <i onClick={() => handleServiceClick("Diseño Gráfico")} className="fa-solid fa-palette hover:text-red-500 transition-colors cursor-pointer" title="Graphic Design"></i>
          <i onClick={() => handleServiceClick("Diseño UI/UX")} className="fa-solid fa-desktop hover:text-red-500 transition-colors cursor-pointer" title="UI/UX Design"></i>
          <i onClick={() => handleServiceClick("Layout y Diagramación")} className="fa-solid fa-layer-group hover:text-red-500 transition-colors cursor-pointer" title="Layout Design"></i>
          <i onClick={() => handleServiceClick("Desarrollo Web")} className="fa-solid fa-laptop-code hover:text-red-500 transition-colors cursor-pointer" title="Web Development"></i>
        </motion.div>

        {/* Buscador interactivo conectado */}
        <motion.form 
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl backdrop-blur-2xl bg-white/3 dark:bg-black/30 border border-white/20 dark:border-white/15 rounded-full px-10 py-5 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)] focus-within:border-white/60 focus-within:shadow-[0_25px_50px_rgba(255,255,255,0.15)] transition-all"
        >
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder} 
            className="w-full bg-transparent border-none outline-none text-lg font-normal tracking-wide placeholder-zinc-400 dark:placeholder-zinc-500" 
          />
          <button type="submit" className="opacity-70 hover:opacity-100 transition-opacity ml-4 cursor-pointer" title="Buscar servicio">
            <i className="fa-solid fa-magnifying-glass text-2xl"></i>
          </button>
        </motion.form>

        {/* Bloque de Texto de Servicios */}
        <div className="w-full max-w-3xl text-xs md:text-sm font-light leading-relaxed px-4 text-center opacity-75 pt-4">
          <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Branding")}>Branding</span> • <span>PNG</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Logotipos")}>Logotipos</span> • <span>Creatividad</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("UX/UI")}>UX/UI</span> • <span>PDF</span> • <span>Diseño Editorial</span> • <span>RGB</span> • <br />
          <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Landing Page")}>Landing Page</span> • <span>Vectorización</span> • <span>Calidad Premium</span> • <span>SVG</span> • <span>Flyers</span> • <span>AI</span>
        </div>

      </main>

      {/* Footer Section */}
      <footer className="w-full px-10 py-7 flex flex-col items-center space-y-4 z-25 mt-12">
        <div className="flex items-center justify-center gap-8 text-lg opacity-85">
          <a href="https://www.facebook.com/share/18szd7DaVA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
          
          <a href="https://x.com/nudesign_02?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center justify-center" title="X (Twitter)">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <a href="https://www.instagram.com/nudesign_02/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://youtube.com/@anousleshow1680?si=BqJxqzF7533u7sx2" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors" title="YouTube"><i className="fa-brands fa-youtube"></i></a>
          <a href="https://www.tiktok.com/@garicedume?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors" title="TikTok"><i className="fa-brands fa-tiktok"></i></a>
          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
        </div>

        <div className="text-xs opacity-50 font-light tracking-wide">
          {t.rights}
        </div>
      </footer>

      {/* Floating Chat Now Button */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <motion.a 
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/18294608316" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-5 py-3 rounded-full flex items-center space-x-3 shadow-2xl transition-colors group"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <Image 
              src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} 
              alt="Chat Icon" 
              width={28} 
              height={28} 
              className="w-full h-full object-contain transition-transform group-hover:rotate-12" 
            />
          </div>
          <span className="text-sm font-normal tracking-wide">{t.chat}</span>
        </motion.a>
      </motion.div>

    </div>
  );
}