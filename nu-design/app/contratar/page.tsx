'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContratarPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

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
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-225 h-225 bg-linear-to-tr from-red-700/25 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#050000]/70 to-[#030000]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-175 h-175 bg-orange-200/50 rounded-full blur-[130px]"></div>
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
          <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">inicio</Link>
          <Link href="/portafolio" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">portafolio</Link>
          <div className="relative flex flex-col items-start cursor-pointer group py-1">
            <span className="opacity-100 tracking-wide font-semibold">contratar</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full"></div>
          </div>
          <Link href="/#contacto" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">contacto</Link>
        </nav>

        <div className="flex items-center space-x-5">
          {/* Selector de Idiomas */}
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
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-white/10 text-zinc-300">Español</button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-white/10 text-zinc-300">English</button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-white/10 text-zinc-300">Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-6 py-2 rounded-full text-sm font-normal flex items-center space-x-2.5 shadow-lg hover:bg-white/20 transition-colors">
            <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
            <span>Whatsapp</span>
          </a>
          
          <a href="https://wa.me/18294608316?text=Hola,%20deseo%20una%20cotizaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-7 py-2 rounded-full text-sm font-normal shadow-lg hover:bg-white/20 transition-colors">
            Cotización
          </a>
        </div>
      </motion.header>

      {/* Theme Switcher (Fixed Right Side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30">
        <button onClick={() => setTheme('light')} className="w-8 h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Oscuro"></button>
      </div>

      {/* Contenido Principal de Contratar */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 z-10 flex flex-col items-center">
        
        {/* Cabecera de Autoridad */}
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
              Elige cómo deseas colaborar con nosotros y elevate al siguiente nivel
            </p>
          </motion.div>
        </div>

        {/* Tarjetas de Modelos de Contratación (3 Opciones de Alta Gama) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          
          {/* Opción 1: Proyecto Único / Rebranding */}
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
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </motion.div>

          {/* Opción 2: Producción Gráfica / Corporativa (Destacada) */}
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
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </motion.div>

          {/* Opción 3: Dirección de Arte Mensual / Partner */}
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
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bloque de Cierre / Autoridad */}
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
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Escríbenos por WhatsApp</span>
            </a>
          </div>
        </div>

      </main>

      {/* Footer Section */}
      <footer className="w-full px-10 py-7 flex flex-col items-center space-y-4 z-25 mt-12">
        <div className="flex items-center justify-center gap-8 text-lg opacity-85">
          <a href="https://www.facebook.com/share/18szd7DaVA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="https://x.com/nudesign_02?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center justify-center">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.instagram.com/nudesign_02/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://youtube.com/@anousleshow1680?si=BqJxqzF7533u7sx2" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><i className="fa-brands fa-youtube"></i></a>
          <a href="https://www.tiktok.com/@garicedume?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><i className="fa-brands fa-tiktok"></i></a>
          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><i className="fa-brands fa-whatsapp"></i></a>
        </div>
        <div className="text-xs opacity-50 font-light tracking-wide">
          Nu-Design Derechos reservados 2026 - Design by Garic Edume
        </div>
      </footer>

    </div>
  );
}