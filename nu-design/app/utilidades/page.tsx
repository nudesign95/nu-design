'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type UnitType = 'pulg' | 'cm' | 'mm' | 'pies' | 'yardas';

interface Preset {
  name: string;
  width: number;
  height: number;
  unit: UnitType;
}

const PRESETS: Preset[] = [
  { name: "Tarjeta de Presentación", width: 3.5, height: 2, unit: "pulg" },
  { name: "Carta (Letter)", width: 8.5, height: 11, unit: "pulg" },
  { name: "Oficio (Legal)", width: 8.5, height: 14, unit: "pulg" },
  { name: "Tabloide (11x17)", width: 11, height: 17, unit: "pulg" },
  { name: "Poster Estándar", width: 18, height: 24, unit: "pulg" },
  { name: "Banner Grande (24x50)", width: 24, height: 50, unit: "pulg" },
  { name: "A4 Internacional", width: 21, height: 29.7, unit: "cm" }
];

export default function UtilidadesPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estados del Canvas / Lienzo
  const [unit, setUnit] = useState<UnitType>('pulg');
  const [canvasWidth, setCanvasWidth] = useState<number>(8.5);
  const [canvasHeight, setCanvasHeight] = useState<number>(11);
  const [selectedPreset, setSelectedPreset] = useState<string>("Carta (Letter)");

  // Archivo y Referencia
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  // Manejador de Preajustes
  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    const found = PRESETS.find(p => p.name === presetName);
    if (found) {
      setCanvasWidth(found.width);
      setCanvasHeight(found.height);
      setUnit(found.unit);
    }
  };

  // Manejador de Archivos (Máximo 5 MB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      if (fileSizeMB > 5) {
        setFileError('⚠️ El archivo supera el límite de 5 MB permitido. El sistema lo ha rechazado automáticamente.');
        setFile(null);
        setPreviewUrl(null);
      } else {
        setFileError('');
        setFile(selectedFile);
        if (selectedFile.type.startsWith('image/')) {
          setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
          setPreviewUrl(null);
        }
      }
    }
  };

  // Cálculo de escala máxima para abarcar la pantalla
  const maxDisplayWidth = 520;
  const maxDisplayHeight = 420;
  const aspectRatio = canvasWidth / (canvasHeight || 1);
  
  let displayWidth = maxDisplayWidth;
  let displayHeight = maxDisplayWidth / aspectRatio;

  if (displayHeight > maxDisplayHeight) {
    displayHeight = maxDisplayHeight;
    displayWidth = maxDisplayHeight * aspectRatio;
  }

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 relative overflow-x-hidden py-6 ${theme === 'dark' ? 'bg-[#050000] text-zinc-100' : 'bg-[#e8e2dc] text-zinc-800'}`}>
      
      {/* Fondo ambiental */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-225 h-225 bg-linear-to-tr from-red-700/25 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#050000]/70 to-[#030000]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-175 h-175 bg-orange-200/50 rounded-full blur-[130px]"></div>
        )}
      </motion.div>

      {/* Top Navigation Unificada */}
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative">
        <div className="flex items-center space-x-2">
          <Link href="/" className="md:hidden font-bold text-sm tracking-widest uppercase">
            NU-DESIGN
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
              <i className={`fa-solid fa-chevron-down text-[10px] ml-1 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                  theme === 'dark' ? 'bg-black/90 border-white/15 text-zinc-200' : 'bg-white/95 border-black/10 text-zinc-800'
                }`}>
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10">Español</button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10">English</button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10">Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className={`hidden sm:flex backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal items-center space-x-2 transition-all ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white hover:border-emerald-500/60'
              : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-emerald-600/60'
          }`}>
            <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
            <span>Whatsapp</span>
          </a>

          <Link href="/cotizacion" className={`block backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal transition-all ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white hover:border-red-500/60'
              : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-red-500/60'
          }`}>
            Cotización
          </Link>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50">
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`fixed inset-0 z-30 backdrop-blur-3xl flex flex-col justify-between p-8 pt-24 md:hidden ${theme === 'dark' ? 'bg-black/95 text-white' : 'bg-white/95 text-zinc-900'}`}>
            <div className="flex flex-col space-y-6 text-xl font-medium tracking-wide">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Inicio</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Portafolio</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Contratar</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Contacto</span><i className="fa-solid fa-arrow-right text-sm opacity-40"></i></Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Utilidades</span><i className="fa-solid fa-arrow-right text-sm"></i></Link>
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
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'}`}>
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl" title="Modo Oscuro"></button>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10 z-10 flex flex-col items-center">
        
        <div className="text-center mb-10 space-y-2">
          <h1 className={`text-3xl md:text-5xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Simulador de <span className="font-semibold text-red-500">Medidas & Canvas</span>
          </h1>
          <p className="text-xs md:text-sm font-light tracking-widest uppercase opacity-75">
            Visualiza la escala real de tu proyecto gráfico antes de cotizar
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Panel de Controles */}
          <div className={`lg:col-span-4 p-6 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-6 ${theme === 'dark' ? 'bg-zinc-900/60 border-white/15' : 'bg-white/80 border-zinc-300'}`}>
            
            {/* Preajustes */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">Tamaños Estándar</label>
              <select value={selectedPreset} onChange={(e) => handlePresetChange(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                <option value="Personalizado">Personalizado (Ingresar medidas)</option>
                {PRESETS.map((p, idx) => (
                  <option key={idx} value={p.name} className="bg-zinc-900 text-white">{p.name} ({p.width} x {p.height} {p.unit})</option>
                ))}
              </select>
            </div>

            {/* Medidas Personalizadas */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">Dimensiones Personalizadas</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase opacity-60 block mb-1">Ancho</span>
                  <input type="number" step="0.1" value={canvasWidth} onChange={(e) => { setCanvasWidth(Number(e.target.value)); setSelectedPreset("Personalizado"); }} className={`w-full bg-transparent border rounded-xl px-4 py-2.5 text-xs ${theme === 'dark' ? 'border-white/20 text-white' : 'border-zinc-400 text-zinc-900'}`} />
                </div>
                <div>
                  <span className="text-[10px] uppercase opacity-60 block mb-1">Alto</span>
                  <input type="number" step="0.1" value={canvasHeight} onChange={(e) => { setCanvasHeight(Number(e.target.value)); setSelectedPreset("Personalizado"); }} className={`w-full bg-transparent border rounded-xl px-4 py-2.5 text-xs ${theme === 'dark' ? 'border-white/20 text-white' : 'border-zinc-400 text-zinc-900'}`} />
                </div>
              </div>
            </div>

            {/* Selector de Unidades */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">Unidad de Medida</label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['pulg', 'cm', 'mm', 'pies', 'yardas'] as const).map((u) => (
                  <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-xs font-semibold uppercase border transition-all ${unit === u ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'border-white/10 opacity-70 hover:opacity-100'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Cargar Archivo de Referencia */}
            <div className="space-y-2 border-t pt-5 border-white/10">
              <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">Adjuntar Arte/Referencia (Máx 5 MB)</label>
              <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={handleFileChange} className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" />
              {fileError && <p className="text-[11px] text-red-500 font-semibold leading-relaxed mt-2">{fileError}</p>}
              {file && <p className="text-[11px] text-emerald-400 font-semibold mt-1">✓ Archivo cargado correctamente ({file.name})</p>}
            </div>

            {/* Botón Ir a Cotizar */}
            <div className="pt-2">
              <Link href={`/cotizacion?w=${canvasWidth}&h=${canvasHeight}&unit=${unit}`} className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xl flex items-center justify-center space-x-2 transition-all">
                <span>Cotizar con estas medidas</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

          </div>

          {/* VISUALIZADOR DE CANVA CON REGLAS TIPO PHOTOSHOP GIGANTE */}
          <div className={`lg:col-span-8 p-8 rounded-3xl border backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center relative min-h-125 overflow-hidden ${theme === 'dark' ? 'bg-black/50 border-white/15' : 'bg-white/60 border-zinc-300'}`}>
            
            {/* Regla Horizontal Superior */}
            <div className="w-full max-w-lg flex justify-between items-end border-b border-red-500/50 pb-1 mb-6 text-[10px] font-mono opacity-80 text-red-500">
              <span>0 {unit}</span>
              <span className="font-bold">{canvasWidth} {unit}</span>
            </div>

            <div className="flex items-center space-x-6">
              {/* Regla Vertical Izquierda */}
              <div className="h-80 flex flex-col justify-between items-end border-r border-red-500/50 pr-2 text-[10px] font-mono opacity-80 text-red-500">
                <span>0</span>
                <span className="font-bold">{canvasHeight}</span>
              </div>

              {/* El Canvas Dinámico Ampltud Máxima */}
              <motion.div 
                animate={{ width: displayWidth, height: displayHeight }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative rounded-xl border-2 border-dashed border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] flex flex-col items-center justify-center p-4 bg-red-500/5 overflow-hidden"
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <Image src={previewUrl} alt="Vista Previa" fill className="object-contain rounded-lg" unoptimized />
                  </div>
                ) : (
                  <div className="text-center space-y-1">
                    <i className="fa-solid fa-expand text-3xl text-red-500/80 mb-2 block"></i>
                    <span className="text-sm font-bold block">{canvasWidth} x {canvasHeight} {unit}</span>
                    <span className="text-[10px] opacity-60 block">Escala Visual Proporcional</span>
                  </div>
                )}
              </motion.div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full px-10 py-7 flex flex-col items-center space-y-4 z-25 mt-12">
        <div className="text-xs opacity-50 font-light tracking-wide">
          Nu-Design Derechos reservados 2026 - Design by Garic Edume
        </div>
      </footer>

    </div>
  );
}