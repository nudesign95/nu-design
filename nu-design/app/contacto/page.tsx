'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactoPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
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
        className="w-full px-10 py-4 flex items-center justify-between z-20"
      >
        <nav className="flex items-center space-x-10 text-base font-medium">
          <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">inicio</Link>
          <Link href="/portafolio" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">portafolio</Link>
          <Link href="/contratar" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">contratar</Link>
          <div className="relative flex flex-col items-start cursor-pointer group py-1">
            <span className="opacity-100 tracking-wide font-semibold">contacto</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full"></div>
          </div>
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

      {/* Contenido Principal de Contacto */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 z-10 flex flex-col items-center">
        
        {/* Cabecera Cinemática con Foto Integrada */}
        <div className="flex flex-col items-center text-center mb-14 space-y-5">
          
          {/* Foto de Perfil Premium con brillo ambiental */}
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

        {/* Tarjeta Central de Email Profesional */}
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
              <i className="fa-regular fa-copy"></i>
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </motion.div>

        {/* Cuadrícula de Redes Sociales de Alta Gama */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* WhatsApp */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://wa.me/18294608316" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-emerald-500/50' : 'bg-white/50 border-zinc-300 hover:border-emerald-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-2xl">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Chat Directo</span>
              <h4 className="text-base font-medium">WhatsApp</h4>
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            href="https://www.instagram.com/nudesign_02/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center space-x-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-pink-500/50' : 'bg-white/50 border-zinc-300 hover:border-pink-600/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 text-2xl">
              <i className="fa-brands fa-instagram"></i>
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
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl">
              <i className="fa-brands fa-linkedin-in"></i>
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
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl">
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
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-2xl">
              <i className="fa-brands fa-facebook-f"></i>
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
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-2xl">
              <i className="fa-brands fa-youtube"></i>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold block">Contenido Visual</span>
              <h4 className="text-base font-medium">YouTube</h4>
            </div>
          </motion.a>

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