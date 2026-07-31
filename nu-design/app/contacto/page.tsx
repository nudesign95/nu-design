'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactoPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);

  // 1. Cargar el tema guardado en localStorage al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('nu_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 2. Guardar en localStorage cuando el usuario cambie el tema
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
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
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

      {/* Top Navigation Bar Unificada */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative"
      >
        <div className="flex items-center space-x-2">
          {/* Marca en esquina móvil cambiada a AGENCY */}
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

          {/* Botón de menú hamburguesa calcado de Inicio */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white"
            aria-label="Abrir Menú"
          >
            ☰
          </button>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL DESPLEGABLE (Copia idéntica de la plantilla Inicio) */}
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

        {/* Cuadrícula de Redes Sociales */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://wa.me/18294608316" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-emerald-500/50' : 'bg-white/50 border-zinc-300 hover:border-emerald-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl font-bold">
              WA
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Chat Directo</span>
              <h4 className="text-base font-medium">WhatsApp</h4>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://www.instagram.com/nudesign_02/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-pink-500/50' : 'bg-white/50 border-zinc-300 hover:border-pink-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 text-xl font-bold">
              IG
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Visuales & Arte</span>
              <h4 className="text-base font-medium">Instagram</h4>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://do.linkedin.com/in/garic-edume-1141b2320?original_referer=https%3A%2F%2Fwww.google.com%2F" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-blue-500/50' : 'bg-white/50 border-zinc-300 hover:border-blue-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl font-bold">
              IN
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Perfil Profesional</span>
              <h4 className="text-base font-medium">LinkedIn</h4>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://x.com/nudesign_02?s=11" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-white/50' : 'bg-white/50 border-zinc-300 hover:border-zinc-800/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl font-bold">
              X
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Actualizaciones</span>
              <h4 className="text-base font-medium">X (Twitter)</h4>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://www.facebook.com/share/18szd7DaVA/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-indigo-500/50' : 'bg-white/50 border-zinc-300 hover:border-indigo-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl font-bold">
              FB
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Comunidad</span>
              <h4 className="text-base font-medium">Facebook</h4>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://youtube.com/@anousleshow1680?si=BqJxqzF7533u7sx2" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/50' : 'bg-white/50 border-zinc-300 hover:border-red-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xl font-bold">
              YT
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Contenido Visual</span>
              <h4 className="text-base font-medium">YouTube</h4>
            </div>
          </motion.a>
        </div>

      </main>

      {/* Footer Unificado en 1 sola línea */}
      <footer className="w-full px-4 py-4 flex flex-col items-center space-y-3 z-25 mt-6">
        <div className={`text-[9px] sm:text-[11px] md:text-xs font-light tracking-tight sm:tracking-wide text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${
          theme === 'dark' ? 'text-zinc-400 opacity-70' : 'text-zinc-700 opacity-90'
        }`}>
          Nu-Design Derechos reservados 2026 - Design by Garic Edume
        </div>
      </footer>

    </div>
  );
}