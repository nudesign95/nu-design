'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

export default function ContactoPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('nu_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
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

  const copyEmail = () => {
    navigator.clipboard.writeText('nubellstore@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 relative overflow-hidden py-6 ${theme === 'dark' ? 'bg-[#050000] text-zinc-100' : 'bg-[#e8e2dc] text-zinc-800'}`}>
      
      {/* Fondo con brillo ambiental animado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-red-700/30 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#050000]/70 to-[#030000]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-orange-200/50 rounded-full blur-[130px]"></div>
        )}
      </motion.div>

      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative"
      >
        <div className="flex items-center space-x-2">
          <Link href="/" className="md:hidden font-extrabold text-xs tracking-[0.25em] uppercase text-zinc-200">
            AGENCY
          </Link>

          <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
            <Link href="/" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">inicio</Link>
            <Link href="/portafolio" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">portafolio</Link>
            <Link href="/contratar" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">contratar</Link>
            <Link href="/contacto" className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
              theme === 'dark' 
                ? 'bg-white/10 border border-red-500/40 text-red-500 font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-black/10 border border-red-500/50 text-red-600 font-semibold'
            }`}>contacto</Link>
            <Link href="/utilidades" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">utilidades</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative hidden md:block" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 text-white hover:border-red-500/40'
                  : 'bg-black/5 border border-black/10 text-zinc-900 hover:border-red-500/40'
              }`}
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold ml-1">({currentLang})</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                    theme === 'dark' ? 'bg-black/90 border-white/15 text-zinc-200' : 'bg-white/95 border-black/10 text-zinc-800'
                  }`}
                >
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Español</button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">English</button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className={`hidden sm:flex backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal items-center space-x-2 transition-all ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white hover:border-emerald-500/60'
              : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-emerald-600/60'
          }`}>
            <span>Whatsapp</span>
          </a>
          
          <Link href="/cotizacion" className={`block backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal transition-all ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white hover:border-red-500/60'
              : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-red-500/60'
          }`}>
            Cotización
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white"
            aria-label="Abrir Menú"
          >
            ☰
          </button>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-30 backdrop-blur-3xl flex flex-col justify-between p-8 pt-24 md:hidden ${
              theme === 'dark' ? 'bg-black/95 text-white' : 'bg-white/95 text-zinc-900'
            }`}
          >
            <div className="flex flex-col space-y-6 text-xl font-medium tracking-wide">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Inicio</span>
                <span>→</span>
              </Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Portafolio</span>
                <span>→</span>
              </Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contratar</span>
                <span>→</span>
              </Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contacto</span>
                <span>→</span>
              </Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Utilidades</span>
                <span>→</span>
              </Link>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-zinc-500/20">
              <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">Seleccionar Idioma</span>
              <div className="flex items-center gap-3">
                <button onClick={() => { setCurrentLang('ES'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'ES' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Español</button>
                <button onClick={() => { setCurrentLang('EN'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'EN' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>English</button>
                <button onClick={() => { setCurrentLang('FR'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'FR' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Français</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Oscuro"></button>
      </div>

      {/* Contenido Principal de Contacto */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 z-10 flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center mb-14 space-y-5">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-red-500/50 shadow-[0_10px_30px_rgba(255,0,0,0.3)] relative z-10 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/mi foto.jpg" 
                alt="Garic Edume" 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 max-w-2xl"
          >
            <h1 className={`text-3xl md:text-5xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Conectemos con <span className={`font-semibold ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}>propósito</span>
            </h1>
            <p className={`text-xs md:text-sm font-light tracking-widest uppercase opacity-75 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Garic Edume • Dirección Creativa & Diseño de Alta Gama
            </p>
          </motion.div>
        </div>

        {/* Tarjeta Central */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-full backdrop-blur-2xl border rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-900/60 border-white/15' : 'bg-white/70 border-zinc-300'}`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold block">Correo Electrónico Oficial</span>
            <h3 className="text-xl md:text-2xl font-medium tracking-wide">nubellstore@gmail.com</h3>
            <p className="text-xs opacity-70 font-light">Disponibles para propuestas formales y proyectos especiales.</p>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="mailto:nubellstore@gmail.com"
              className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-lg ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
            >
              Enviar Correo
            </a>
            <button 
              onClick={copyEmail}
              className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border shadow-lg flex items-center space-x-2 ${theme === 'dark' ? 'border-white/20 hover:border-red-500 text-zinc-300' : 'border-zinc-400 hover:border-red-600 text-zinc-700'}`}
            >
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </motion.div>

        {/* Cuadrícula de Redes Sociales con Iconos SVG Nativo Directo */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* WhatsApp */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://wa.me/18294608316" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-emerald-500/50' : 'bg-white/50 border-zinc-300 hover:border-emerald-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Chat Directo</span>
              <h4 className="text-base font-medium">WhatsApp</h4>
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://www.instagram.com/nudesign.agency02" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-pink-500/50' : 'bg-white/50 border-zinc-300 hover:border-pink-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Visuales & Arte</span>
              <h4 className="text-base font-medium">Instagram</h4>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://do.linkedin.com/in/garic-edume-1141b2320?original_referer=https%3A%2F%2Fwww.google.com%2F" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-blue-500/50' : 'bg-white/50 border-zinc-300 hover:border-blue-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Perfil Profesional</span>
              <h4 className="text-base font-medium">LinkedIn</h4>
            </div>
          </motion.a>

          {/* X (Twitter) */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://x.com/nudesign_02?s=11" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-white/50' : 'bg-white/50 border-zinc-300 hover:border-zinc-800/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Actualizaciones</span>
              <h4 className="text-base font-medium">X (Twitter)</h4>
            </div>
          </motion.a>

          {/* Facebook */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://www.facebook.com/share/18szd7DaVA/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-indigo-500/50' : 'bg-white/50 border-zinc-300 hover:border-indigo-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Comunidad</span>
              <h4 className="text-base font-medium">Facebook</h4>
            </div>
          </motion.a>

          {/* YouTube */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://youtube.com/@anousleshow1680?si=BqJxqzF7533u7sx2" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/50' : 'bg-white/50 border-zinc-300 hover:border-red-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Contenido Visual</span>
              <h4 className="text-base font-medium">YouTube</h4>
            </div>
          </motion.a>

        </div>

      </main>

      {/* Footer Unificado Completo con Enlaces Legales */}
      <Footer />

    </div>
  );
}