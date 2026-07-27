'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  "Ver todas las categorías",
  "Branding",
  "Identidad Corporativa",
  "Papelería Corporativa",
  "Material Publicitario",
  "Diseño Editorial",
  "Packaging",
  "Etiquetas",
  "Gran Formato",
  "Señalización",
  "Rotulación",
  "Diseño para Redes Sociales",
  "Diseño Web",
  "Merchandising",
  "Diseño para Eventos",
  "Ilustración",
  "Vectorización",
  "Impresión",
  "Acabados Especiales",
  "Preprensa",
  "Producción Gráfica"
];

const sampleProjects = [
  { 
    id: 1, 
    title: "Nexus Tech Branding", 
    category: "Branding", 
    year: "2026",
    detail: "De mi participación: Crear la línea gráfica de dicha empresa, hacer la investigación para entender la marca a fondo y así dar el mejor resultado, estableciendo un sistema visual imponente y minimalista.",
    images: [
      "/project-1.jpg",
      "/project-2.jpg",
      "/project-3.jpg",
      "/project-4.jpg",
      "/project-5.jpg",
      "/project-6.jpg",
      "/project-7.jpg"
    ]
  },
  { 
    id: 2, 
    title: "Aura Corporate Identity", 
    category: "Identidad Corporativa", 
    year: "2026",
    detail: "Desarrollo integral de identidad corporativa, conceptualización de isotipo, paleta de colores exclusiva y manual de normas corporativas de alto impacto.",
    images: [
      "/project-2.jpg",
      "/project-1.jpg",
      "/project-4.jpg",
      "/project-3.jpg",
      "/project-6.jpg",
      "/project-5.jpg",
      "/project-7.jpg"
    ]
  },
  { 
    id: 3, 
    title: "Luxe Papelería Set", 
    category: "Papelería Corporativa", 
    year: "2026",
    detail: "Diseño y diagramación de papelería de alta gama con acabados especiales en foil dorado y texturas táctiles sofisticadas.",
    images: [
      "/project-3.jpg",
      "/project-1.jpg",
      "/project-2.jpg",
      "/project-5.jpg",
      "/project-4.jpg",
      "/project-7.jpg",
      "/project-6.jpg"
    ]
  },
  { 
    id: 4, 
    title: "Vanguard Packaging", 
    category: "Packaging", 
    year: "2026",
    detail: "Creación de estructura de empaque personalizada, diseño troquelado y acabados en barniz selectivo UV para destacar en anaquel.",
    images: [
      "/project-4.jpg",
      "/project-2.jpg",
      "/project-1.jpg",
      "/project-6.jpg",
      "/project-3.jpg",
      "/project-5.jpg",
      "/project-7.jpg"
    ]
  },
  { 
    id: 5, 
    title: "Eco Etquetas Pro", 
    category: "Etiquetas", 
    year: "2026",
    detail: "Diseño de etiquetas adhesivas en rollo con acabados mate y tipografía ultra limpia orientada al mercado ecológico premium.",
    images: [
      "/project-5.jpg",
      "/project-3.jpg",
      "/project-1.jpg",
      "/project-2.jpg",
      "/project-7.jpg",
      "/project-4.jpg",
      "/project-6.jpg"
    ]
  },
  { 
    id: 6, 
    title: "Urban Editorial Mag", 
    category: "Diseño Editorial", 
    year: "2026",
    detail: "Dirección de arte y diagramación editorial completa para revista de arquitectura y diseño urbano minimalista.",
    images: [
      "/project-6.jpg",
      "/project-4.jpg",
      "/project-2.jpg",
      "/project-1.jpg",
      "/project-5.jpg",
      "/project-3.jpg",
      "/project-7.jpg"
    ]
  },
];

export default function PortfolioPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Ver todas las categorías');
  
  const [activeProject, setActiveProject] = useState<typeof sampleProjects[0] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
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

  const filteredProjects = sampleProjects.filter(project => {
    const matchesCategory = selectedCategory === 'Ver todas las categorías' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <div className="relative flex flex-col items-start cursor-pointer group py-1">
            <span className="opacity-100 tracking-wide font-semibold">portafolio</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full"></div>
          </div>
          <Link href="/#contratar" className="opacity-60 hover:opacity-100 transition-opacity tracking-wide">contratar</Link>
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

      {/* Main Portfolio Content */}
      <main className="w-full max-w-368 mx-auto px-6 py-10 z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!activeProject ? (
            /* ================= VISTA DE CATALOGO GENERAL ================= */
            <motion.div 
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* Cabecera Cinemática Premium */}
              <div className="flex flex-col items-center text-center mb-14 space-y-4">
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
                  className="space-y-2 max-w-2xl"
                >
                  <h1 className={`text-3xl md:text-5xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Proyectos que <span className={`font-semibold ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}>definen estándares</span>
                  </h1>
                  <p className={`text-xs md:text-sm font-light tracking-widest uppercase ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Explora nuestra huella visual y ejecuciones de alta gama
                  </p>
                </motion.div>
              </div>

              {/* Layout expandido: Filtro a la izquierda + Galería */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Panel Lateral de Filtros */}
                <aside className={`w-full lg:col-span-3 backdrop-blur-xl border rounded-2xl p-5 shadow-xl space-y-5 sticky top-6 ${theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/40 border-zinc-300'}`}>
                  
                  {/* Mini Buscador */}
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar trabajos..." 
                      className={`w-full bg-transparent border rounded-xl px-4 py-2.5 text-xs outline-none transition-colors ${theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'}`}
                    />
                    <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60"></i>
                  </div>

                  {/* Lista de Categorías */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60 block mb-2 px-1">Categorías</span>
                    <div className="flex flex-col space-y-1 max-h-130 overflow-y-auto pr-1 custom-scrollbar">
                      {categories.map((cat, index) => (
                        <button 
                          key={index}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${selectedCategory === cat ? 'bg-red-600/20 text-red-500 font-semibold border-l-2 border-red-500 pl-4' : 'opacity-70 hover:opacity-100 hover:bg-white/5'}`}
                        >
                          <span className="truncate pr-2">{cat}</span>
                          {selectedCategory === cat && <i className="fa-solid fa-chevron-right text-[9px]"></i>}
                        </button>
                      ))}
                    </div>
                  </div>

                </aside>

                {/* Cuadrícula de Galería Moderna */}
                <div className="w-full lg:col-span-9">
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((proj) => (
                          <motion.div 
                            key={proj.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onClick={() => setActiveProject(proj)}
                            className={`group relative h-80 rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl cursor-pointer flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80 hover:shadow-[0_20px_40px_rgba(255,0,0,0.2)]' : 'bg-white/50 border-zinc-300 hover:border-red-600/80 hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)]'}`}
                          >
                            <div className="absolute inset-0 bg-linear-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent z-10 opacity-75 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-light text-sm tracking-widest uppercase group-hover:scale-105 transition-transform duration-700">
                              [ Proyecto Visual ]
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                              <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold block mb-1">{proj.category}</span>
                              <h3 className="text-lg font-medium text-white">{proj.title}</h3>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`w-full col-span-full h-96 flex flex-col items-center justify-center text-center opacity-75 backdrop-blur-xl rounded-2xl border ${theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/40 border-zinc-300'}`}
                        >
                          <i className="fa-solid fa-folder-open text-4xl mb-3 text-red-500"></i>
                          <p className="text-sm font-medium">No se encontraron proyectos en esta categoría.</p>
                          <button onClick={() => { setSelectedCategory('Ver todas las categorías'); setSearchTerm(''); }} className="mt-4 text-xs text-red-500 hover:underline">
                            Ver todos los proyectos
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          ) : (
            /* ================= VISTA DE DETALLE DE PROYECTO (7 FOTOS ESTILO REVISTA) ================= */
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl flex flex-col items-center space-y-12"
            >
              {/* Tarjeta de Encabezado de Proyecto */}
              <div className={`w-full backdrop-blur-2xl border rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-4 relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-900/60 border-white/15' : 'bg-white/70 border-zinc-300'}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold block">
                  {activeProject.category} • FECHA {activeProject.year}
                </span>
                <h1 className="text-3xl md:text-5xl font-light tracking-tight">
                  {activeProject.title}
                </h1>
                <p className="text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto opacity-80 pt-2">
                  <strong className="font-medium">Detalle:</strong> {activeProject.detail}
                </p>
              </div>

              {/* Estructura Asimétrica de 7 Fotos de Alta Gama */}
              <div className="w-full space-y-6">
                
                {/* 1. Foto Principal (Grande Arriba) */}
                <div 
                  onClick={() => setLightboxImage(activeProject.images[0])}
                  className={`group relative h-105 rounded-3xl overflow-hidden backdrop-blur-xl border shadow-2xl cursor-pointer flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80' : 'bg-white/50 border-zinc-300 hover:border-red-600/80'}`}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-light text-sm tracking-widest uppercase group-hover:scale-105 transition-transform duration-700">
                    [ Foto Principal del Proyecto ]
                  </div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">Vista Principal</span>
                    <h3 className="text-xl font-medium text-white">Ejecución Gráfica Core</h3>
                  </div>
                </div>

                {/* 2. Fila con 2 Fotos Medianas Equilibradas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[activeProject.images[1], activeProject.images[2]].map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setLightboxImage(img)}
                      className={`group relative h-80 rounded-3xl overflow-hidden backdrop-blur-xl border shadow-2xl cursor-pointer flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80' : 'bg-white/50 border-zinc-300 hover:border-red-600/80'}`}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-light text-sm tracking-widest uppercase group-hover:scale-105 transition-transform duration-700">
                        [ Foto Detalle 0{idx + 2} ]
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Fila final con 4 Fotos en Cuadrícula Fina */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[activeProject.images[3], activeProject.images[4], activeProject.images[5], activeProject.images[6]].map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setLightboxImage(img)}
                      className={`group relative h-56 rounded-2xl overflow-hidden backdrop-blur-xl border shadow-xl cursor-pointer flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80' : 'bg-white/50 border-zinc-300 hover:border-red-600/80'}`}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-light text-xs tracking-widest uppercase group-hover:scale-105 transition-transform duration-700">
                        [ F-0{idx + 4} ]
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Botón de Regresar */}
              <div className="pt-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProject(null)}
                  className={`backdrop-blur-xl border px-10 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-xl flex items-center space-x-2 ${theme === 'dark' ? 'bg-white/5 border-white/20 hover:border-red-500 text-white' : 'bg-white/80 border-zinc-400 hover:border-red-600 text-zinc-900'}`}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  <span>Regresar al portafolio</span>
                </motion.button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Lightbox Modal para ver fotos en pantalla completa */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center">
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-50"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <div className="text-zinc-400 font-light text-sm tracking-widest uppercase">
                [ Vista Ampliada en Pantalla Completa ]
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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