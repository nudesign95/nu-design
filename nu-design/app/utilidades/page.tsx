'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const presets = [
  { name: 'Tarjeta de Presentación', width: 3.5, height: 2, unit: 'pulg' },
  { name: 'Flyer Estándar (Carta)', width: 8.5, height: 11, unit: 'pulg' },
  { name: 'Afiche Tabloide', width: 11, height: 17, unit: 'pulg' },
  { name: 'Banner Grande (24x50)', width: 24, height: 50, unit: 'pulg' },
];

export default function UtilidadesPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estados del Canvas / Lienzo
  const [unit, setUnit] = useState<'pulg' | 'cm' | 'mm' | 'pies' | 'yardas'>('pulg');
  const [width, setWidth] = useState<number>(8.5);
  const [height, setHeight] = useState<number>(11);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFileError] = useState<string>('');

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

  const handlePresetChange = (presetName: string) => {
    const found = presets.find((p) => p.name === presetName);
    if (found) {
      setWidth(found.width);
      setHeight(found.height);
      setUnit(found.unit as any);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('El archivo excede el límite máximo permitido de 5 MB.');
        setSelectedFile(null);
      } else {
        setFileError('');
        setSelectedFile(file);
      }
    }
  };

  return (
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
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
            <Link href="/contacto" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">contacto</Link>
            <Link href="/utilidades" className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
              theme === 'dark' 
                ? 'bg-white/10 border border-red-500/40 text-red-500 font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-black/10 border border-red-500/50 text-red-600 font-semibold'
            }`}>utilidades</Link>
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
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contacto</span>
                <span>→</span>
              </Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center">
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

      {/* Main Utilidades & Canvas */}
      <main className="w-full max-w-6xl mx-auto px-4 py-8 z-10 flex flex-col items-center">
        
        <div className="text-center mb-8 space-y-2">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3">
            <Image src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} alt="NU-Design" width={80} height={80} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight">Módulo Interactivo <span className="font-semibold text-red-500">Utilidades & Canvas</span></h1>
          <p className="text-[10px] md:text-xs font-light tracking-widest uppercase opacity-75">Simula proporciones, escalas y formatos de impresión en tiempo real</p>
        </div>

        {/* Panel de Controles */}
        <div className={`w-full p-6 rounded-3xl border backdrop-blur-2xl shadow-2xl mb-8 space-y-6 ${
          theme === 'dark' ? 'bg-zinc-900/50 border-white/15' : 'bg-white/70 border-zinc-300'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Selector de Preajustes */}
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1 font-semibold">Preajustes Rápidos</label>
              <select onChange={(e) => handlePresetChange(e.target.value)} className={`w-full bg-transparent border rounded-xl px-3 py-2 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                <option value="" disabled selected>Selecciona formato...</option>
                {presets.map((p, i) => (
                  <option key={i} value={p.name} className="bg-zinc-900 text-white">{p.name}</option>
                ))}
              </select>
            </div>

            {/* Unidad de Medida */}
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1 font-semibold">Unidad de Medida</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className={`w-full bg-transparent border rounded-xl px-3 py-2 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                <option value="pulg" className="bg-zinc-900 text-white">Pulgadas (in)</option>
                <option value="cm" className="bg-zinc-900 text-white">Centímetros (cm)</option>
                <option value="mm" className="bg-zinc-900 text-white">Milímetros (mm)</option>
                <option value="pies" className="bg-zinc-900 text-white">Pies (ft)</option>
                <option value="yardas" className="bg-zinc-900 text-white">Yardas (yd)</option>
              </select>
            </div>

            {/* Ancho */}
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1 font-semibold">Ancho ({unit})</label>
              <input type="number" min="0.1" step="0.1" value={width} onChange={(e) => setWidth(Number(e.target.value))} className={`w-full bg-transparent border rounded-xl px-3 py-2 text-xs outline-none ${theme === 'dark' ? 'border-white/20 text-white' : 'border-zinc-400 text-zinc-900'}`} />
            </div>

            {/* Alto */}
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1 font-semibold">Alto ({unit})</label>
              <input type="number" min="0.1" step="0.1" value={height} onChange={(e) => setHeight(Number(e.target.value))} className={`w-full bg-transparent border rounded-xl px-3 py-2 text-xs outline-none ${theme === 'dark' ? 'border-white/20 text-white' : 'border-zinc-400 text-zinc-900'}`} />
            </div>

          </div>

          {/* Subir Archivo de Referencia */}
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 block font-semibold">Probar Diseño de Referencia (Máx 5 MB)</span>
              <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="text-xs mt-1 cursor-pointer" />
              {filePreview && <p className="text-red-500 text-[10px] font-semibold mt-1">{filePreview}</p>}
            </div>
            {selectedFile && (
              <span className="text-xs text-emerald-400 font-medium">Cargado: {selectedFile.name}</span>
            )}
          </div>
        </div>

        {/* Lienzo Visualizador con Reglas estilo Photoshop */}
        <div className={`w-full h-96 rounded-3xl border relative overflow-hidden flex items-center justify-center p-8 backdrop-blur-xl ${
          theme === 'dark' ? 'bg-black/60 border-white/15' : 'bg-white/80 border-zinc-300'
        }`}>
          
          {/* Regla Superior Horizontal */}
          <div className="absolute top-0 left-0 right-0 h-5 border-b border-white/10 flex items-center justify-between px-4 text-[8px] opacity-40 font-mono">
            <span>0</span>
            <span>{width / 2} {unit}</span>
            <span>{width} {unit}</span>
          </div>

          {/* Regla Izquierda Vertical */}
          <div className="absolute top-0 left-0 bottom-0 w-5 border-r border-white/10 flex flex-col items-center justify-between py-4 text-[8px] opacity-40 font-mono">
            <span>0</span>
            <span>{height / 2}</span>
            <span>{height}</span>
          </div>

          {/* Canvas Proporcional Dinámico */}
          <motion.div 
            layout
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              aspectRatio: `${width} / ${height}`,
              maxHeight: '80%',
              maxWidth: '85%',
            }}
            className="border-2 border-dashed border-red-500/70 bg-red-500/10 rounded-xl flex flex-col items-center justify-center p-4 relative shadow-2xl"
          >
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{width} x {height} {unit}</span>
            <span className="text-[10px] opacity-60 font-mono mt-1">Lienzo Proporcional NU-Design</span>
          </motion.div>

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