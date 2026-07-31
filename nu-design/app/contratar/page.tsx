'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContratarPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);

  // Leer tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('nu_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Guardar cambio de tema
  useEffect(() => {
    localStorage.setItem('nu_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Top Navigation Bar Unificada */}
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative">
        <div className="flex items-center space-x-2">
          <Link href="/" className="md:hidden font-extrabold text-xs tracking-[0.25em] uppercase text-zinc-200">
            AGENCY
          </Link>

          <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
            <Link href="/" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">inicio</Link>
            <Link href="/portafolio" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">portafolio</Link>
            <Link href="/contratar" className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
              theme === 'dark' 
                ? 'bg-white/10 border border-red-500/40 text-red-500 font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-black/10 border border-red-500/50 text-red-600 font-semibold'
            }`}>contratar</Link>
            <Link href="/contacto" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">contacto</Link>
            <Link href="/utilidades" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">utilidades</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <Link href="/cotizacion" className={`block backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal transition-all ${
            theme === 'dark' ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/15 text-zinc-900'
          }`}>
            Cotización
          </Link>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white">
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`fixed inset-0 z-30 backdrop-blur-3xl flex flex-col justify-between p-8 pt-24 md:hidden ${
            theme === 'dark' ? 'bg-black/95 text-white' : 'bg-white/95 text-zinc-900'
          }`}>
            <div className="flex flex-col space-y-6 text-xl font-medium tracking-wide">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Inicio</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Portafolio</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Contratar</span><i className="fa-solid fa-arrow-right text-sm"></i></Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Contacto</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Utilidades</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl" title="Modo Oscuro"></button>
      </div>

      {/* Main Contratar */}
      <main className="w-full max-w-4xl mx-auto px-4 py-8 z-10 flex flex-col items-center">
        <div className="text-center mb-10 space-y-2">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3">
            <Image src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} alt="NU-Design" width={80} height={80} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight">Diseño de alto impacto, <span className="font-semibold text-red-500">sin fricción</span></h1>
          <p className="text-[10px] md:text-xs font-light tracking-widest uppercase opacity-75">Elige cómo deseas colaborar con nosotros y elévate al siguiente nivel</p>
        </div>

        {/* Opciones de Contratación */}
        <div className="w-full space-y-6">
          <div className={`p-6 rounded-3xl border backdrop-blur-xl ${theme === 'dark' ? 'bg-zinc-900/40 border-white/15' : 'bg-white/60 border-black/10'}`}>
            <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Proyecto a Medida</span>
            <h3 className="text-xl font-bold mt-1">Branding & Identidad</h3>
            <p className="text-xs opacity-75 mt-2 font-light leading-relaxed">Ideal para empresas o marcas personales que necesitan nacer con una presencia visual dominante.</p>
            <Link href="/cotizacion" className="inline-block mt-4 px-6 py-2.5 bg-red-600 text-white text-xs uppercase font-semibold rounded-full shadow-lg">Iniciar Proyecto</Link>
          </div>
        </div>
      </main>

      {/* Footer Unificado */}
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