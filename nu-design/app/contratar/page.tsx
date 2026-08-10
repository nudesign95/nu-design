'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import WordmarkLogo from '../components/WordmarkLogo';
import { useLanguage } from '../context/LanguageContext';

export default function ContratarPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { language, setLanguage } = useLanguage();
  const currentLang = language;
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Fondo ambiental */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-225 h-225 bg-linear-to-tr from-red-700/25 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#050000]/70 to-[#030000]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-175 h-175 bg-orange-200/50 rounded-full blur-[130px]"></div>
        )}
      </motion.div>

      {/* Top Navigation Bar Unificada */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative"
      >
        <div className="flex items-center space-x-3">
  {/* Wordmark Adaptativo SVG para Móvil y Desktop */}
  <WordmarkLogo className="h-6 md:h-8 w-auto" />

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
                  <button onClick={() => { setLanguage('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Español</button>
                  <button onClick={() => { setLanguage('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">English</button>
                  <button onClick={() => { setLanguage('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Français</button>
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
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contratar</span>
                <span>→</span>
              </Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
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
                <button onClick={() => { setLanguage('ES'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'ES' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Español</button>
                <button onClick={() => { setLanguage('EN'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'EN' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>English</button>
                <button onClick={() => { setLanguage('FR'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'FR' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Français</button>
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

      {/* Contenido Principal de Contratar */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 z-10 flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-24 h-24 flex items-center justify-center group cursor-pointer"
          >
            <div className="absolute inset-0 bg-red-600/20 rounded-full blur-2xl animate-pulse"></div>
            <Image 
              src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} 
              alt="NU-Design Icon" 
              width={96} 
              height={96} 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(255,0,0,0.3)] transition-transform duration-500 group-hover:scale-110" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 max-w-3xl"
          >
            <h1 className={`text-3xl md:text-5xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Diseño de alto impacto, <span className={`font-semibold ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}>sin fricción</span>
            </h1>
            <p className={`text-xs md:text-sm font-light tracking-widest uppercase opacity-75 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Elige cómo deseas colaborar con nosotros y elévate al siguiente nivel
            </p>
          </motion.div>
        </div>

        {/* Tarjetas de Servicios */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`backdrop-blur-2xl border rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/50' : 'bg-white/50 border-zinc-300 hover:border-red-600/50'}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full">Proyecto a Medida</span>
              <h3 className="text-xl font-medium">Branding & Identidad</h3>
              <p className="text-xs opacity-75 font-light leading-relaxed">
                Ideal para empresas o marcas personales que necesitan nacer con una presencia visual dominante y profesional en el mercado.
              </p>
            </div>
            <div className="pt-8">
              <a 
                href="https://wa.me/18294608316?text=Hola,%20deseo%20contratar%20el%20servicio%20de%20Branding%20%26%20Identidad" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${theme === 'dark' ? 'bg-white/10 hover:bg-red-600 hover:text-white text-white' : 'bg-zinc-900 text-white hover:bg-red-600'}`}
              >
                <span>Iniciar Proyecto</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`backdrop-blur-2xl border-2 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-900/70 border-red-500/80 shadow-[0_20px_50px_rgba(255,0,0,0.15)]' : 'bg-white/80 border-red-600 shadow-[0_20px_50px_rgba(220,38,38,0.15)]'}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-red-600 px-3 py-1 rounded-full">Más Solicitado</span>
              <h3 className="text-xl font-medium">Producción Gráfica & Editorial</h3>
              <p className="text-xs opacity-80 font-light leading-relaxed">
                Para marcas que requieren volumen, consistencia visual, empaques, papelería de lujo y material publicitario impecable.
              </p>
            </div>
            <div className="pt-8">
              <a 
                href="https://wa.me/18294608316?text=Hola,%20deseo%20cotizar%20Producci%C3%B3n%20Gr%C3%A1fica%20y%20Editorial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all bg-red-600 hover:bg-red-700 text-white shadow-xl"
              >
                <span>Cotizar Producción</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`backdrop-blur-2xl border rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/50' : 'bg-white/50 border-zinc-300 hover:border-red-600/50'}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full">Socio Creativo</span>
              <h3 className="text-xl font-medium">Dirección de Arte Exclusiva</h3>
              <p className="text-xs opacity-75 font-light leading-relaxed">
                Un departamento de diseño completo a tu disposición mes a mes para resolver todas tus necesidades visuales con prioridad total.
              </p>
            </div>
            <div className="pt-8">
              <a 
                href="https://wa.me/18294608316?text=Hola,%20estoy%20interesado%20en%20Direcci%C3%B3n%20de%20Arte%20Exclusiva" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${theme === 'dark' ? 'bg-white/10 hover:bg-red-600 hover:text-white text-white' : 'bg-zinc-900 text-white hover:bg-red-600'}`}
              >
                <span>Hablemos Directo</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bloque Cierre WhatsApp */}
        <div className={`w-full backdrop-blur-2xl border rounded-3xl p-8 md:p-12 text-center space-y-6 ${theme === 'dark' ? 'bg-black/30 border-white/10' : 'bg-white/60 border-zinc-300'}`}>
          <h2 className="text-2xl md:text-3xl font-light">¿Tienes un requerimiento especial o urgente?</h2>
          <p className="text-xs md:text-sm font-light opacity-75 max-w-xl mx-auto">
            Hablemos directamente por WhatsApp. Analizamos tu proyecto y te damos respuesta y presupuesto en tiempo récord.
          </p>
          <div className="pt-2">
            <a 
              href="https://wa.me/18294608316?text=Hola,%20tengo%20un%20proyecto%20especial%20para%20Nu-Design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-xl hover:scale-105"
            >
              <span>Escríbenos por WhatsApp</span>
            </a>
          </div>
        </div>

      </main>

      {/* Footer Unificado Completo */}
      <Footer />

    </div>
  );
}