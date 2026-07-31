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
    altSEO: "Diseño de branding e identidad visual para empresa de tecnología Nexus Tech por Nu-Design",
    detail: "De mi participación: Crear la línea gráfica de dicha empresa, hacer la investigación para entender la marca a fondo y así dar el mejor resultado, estableciendo un sistema visual imponente y minimalista.",
    images: [
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg"
    ]
  },
  { 
    id: 2, 
    title: "Aura Corporate Identity", 
    category: "Identidad Corporativa", 
    year: "2026",
    altSEO: "Desarrollo de identidad corporativa, isotipo y manual de marca Aura por Garic Edume Nu-Design",
    detail: "Desarrollo integral de identidad corporativa, conceptualización de isotipo, paleta de colores exclusiva y manual de normas corporativas de alto impacto.",
    images: [
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg"
    ]
  },
  { 
    id: 3, 
    title: "Luxe Papelería Set", 
    category: "Papelería Corporativa", 
    year: "2026",
    altSEO: "Diseño de papelería corporativa de lujo con acabados especiales en foil dorado Nu-Design",
    detail: "Diseño y diagramación de papelería de alta gama con acabados especiales en foil dorado y texturas táctiles sofisticadas.",
    images: [
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg"
    ]
  },
  { 
    id: 4, 
    title: "Vanguard Packaging", 
    category: "Packaging", 
    year: "2026",
    altSEO: "Diseño de empaque y packaging personalizado troquelado con barniz UV Nu-Design Agency",
    detail: "Creación de estructura de empaque personalizada, diseño troquelado y acabados en barniz selectivo UV para destacar en anaquel.",
    images: [
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg"
    ]
  },
  { 
    id: 5, 
    title: "Eco Etiquetas Pro", 
    category: "Etiquetas", 
    year: "2026",
    altSEO: "Diseño de etiquetas adhesivas para productos ecológicos premium por Nu-Design",
    detail: "Diseño de etiquetas adhesivas en rollo con acabados mate y tipografía ultra limpia orientada al mercado ecológico premium.",
    images: [
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg"
    ]
  },
  { 
    id: 6, 
    title: "Urban Editorial Mag", 
    category: "Diseño Editorial", 
    year: "2026",
    altSEO: "Diagramación editorial y dirección de arte para revista de arquitectura y diseño Nu-Design",
    detail: "Dirección de arte y diagramación editorial completa para revista de arquitectura y diseño urbano minimalista.",
    images: [
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg",
      "/icon-dark.svg",
      "/wordmark-dark.svg"
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
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 relative overflow-x-hidden py-6 ${theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'}`}>
      
      {/* Fondo con brillo ambiental animado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-red-700/25 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#040001_85%)]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-orange-200/50 rounded-full blur-[130px]"></div>
        )}
      </motion.div>

      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-20"
      >
        <nav className="flex items-center space-x-6 md:space-x-10 text-base font-medium">
          <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity tracking-wide">inicio</Link>
          <div className="relative flex flex-col items-start cursor-pointer group py-1">
            <span className="opacity-100 tracking-wide font-semibold text-red-500">portafolio</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"></div>
          </div>
          <Link href="/contratar" className="opacity-70 hover:opacity-100 transition-opacity tracking-wide">contratar</Link>
          <Link href="/contacto" className="opacity-70 hover:opacity-100 transition-opacity tracking-wide">contacto</Link>
        </nav>

        <div className="flex items-center space-x-3 md:space-x-5">
          <div className="relative hidden sm:block" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-xs uppercase tracking-widest opacity-80 hover:opacity-100 font-semibold px-3 py-1.5 transition-opacity flex items-center space-x-1 focus:outline-none"
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
                  className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                    theme === 'dark' ? 'bg-black/90 border-white/15 text-zinc-200' : 'bg-white/95 border-black/10 text-zinc-800'
                  }`}
                >
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10">Español</button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10">English</button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10">Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className="hidden sm:flex backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-6 py-2 rounded-full text-sm font-normal items-center space-x-2.5 shadow-lg hover:bg-white/20 transition-all">
            <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
            <span>Whatsapp</span>
          </a>
          
          <Link href="/cotizacion" className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 px-6 py-2 rounded-full text-sm font-normal shadow-lg hover:bg-white/20 transition-all">
            Cotización
          </Link>
        </div>
      </motion.header>

      {/* Theme Switcher */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Oscuro"></button>
      </div>

      {/* Main Portfolio Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10 flex flex-col items-center">
        
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
              <div className="flex flex-col items-center text-center mb-12 space-y-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group cursor-pointer"
                >
                  <Image 
                    src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} 
                    alt="Agencia de Diseño Gráfico Nu-Design Garic Edume" 
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
                    Proyectos que <span className="font-semibold text-red-500">definen estándares</span>
                  </h1>
                  <p className="text-xs md:text-sm font-light tracking-widest uppercase opacity-70">
                    Explora nuestra huella visual y ejecuciones de alta gama
                  </p>
                </motion.div>
              </div>

              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Panel Lateral */}
                <aside className={`w-full lg:col-span-3 backdrop-blur-xl border rounded-2xl p-5 shadow-xl space-y-5 sticky top-6 ${
                  theme === 'dark' ? 'bg-black/30 border-white/10' : 'bg-white/60 border-zinc-300'
                }`}>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar trabajos..." 
                      className={`w-full bg-transparent border rounded-xl px-4 py-2.5 text-xs outline-none transition-colors ${
                        theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'
                      }`}
                    />
                    <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60"></i>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60 block mb-2 px-1">Categorías</span>
                    <div className="flex flex-col space-y-1 max-h-120 overflow-y-auto pr-1 custom-scrollbar">
                      {categories.map((cat, index) => (
                        <button 
                          key={index}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                            selectedCategory === cat ? 'bg-red-600/20 text-red-500 font-semibold border-l-2 border-red-500 pl-4' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                          }`}
                        >
                          <span className="truncate pr-2">{cat}</span>
                          {selectedCategory === cat && <i className="fa-solid fa-chevron-right text-[9px]"></i>}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Cuadrícula de Galería */}
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
                            className={`group relative h-80 rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl cursor-pointer flex flex-col justify-between p-6 transition-all ${
                              theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80' : 'bg-white/70 border-zinc-300 hover:border-red-600/80'
                            }`}
                          >
                            <div className="w-full h-40 relative flex items-center justify-center p-4 bg-black/20 rounded-xl overflow-hidden">
                              <Image 
                                src={proj.images[0]} 
                                alt={proj.altSEO} 
                                fill 
                                className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                              />
                            </div>
                            
                            <div className="pt-3 border-t border-white/10">
                              <span className="text-[10px] uppercase tracking-wider text-red-500 font-semibold block mb-1">{proj.category}</span>
                              <h2 className="text-lg font-medium">{proj.title}</h2>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`w-full col-span-full h-96 flex flex-col items-center justify-center text-center opacity-75 backdrop-blur-xl rounded-2xl border ${
                            theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/40 border-zinc-300'
                          }`}
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
            /* ================= VISTA DE DETALLE DE PROYECTO ================= */
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl flex flex-col items-center space-y-12"
            >
              <div className={`w-full backdrop-blur-2xl border rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-4 relative overflow-hidden ${
                theme === 'dark' ? 'bg-zinc-900/60 border-white/15' : 'bg-white/80 border-zinc-300'
              }`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold block">
                  {activeProject.category} • FECHA {activeProject.year}
                </span>
                <h1 className="text-3xl md:text-5xl font-light tracking-tight">
                  {activeProject.title}
                </h1>
                <p className="text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto opacity-80 pt-2">
                  <strong className="font-medium">Caso de Estudio:</strong> {activeProject.detail}
                </p>
              </div>

              {/* Estructura Asimétrica de Imágenes */}
              <div className="w-full space-y-6">
                
                {/* 1. Foto Principal */}
                <div 
                  onClick={() => setLightboxImage(activeProject.images[0])}
                  className={`group relative h-96 rounded-3xl overflow-hidden backdrop-blur-xl border shadow-2xl cursor-pointer flex items-center justify-center transition-all p-8 ${
                    theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80' : 'bg-white/50 border-zinc-300 hover:border-red-600/80'
                  }`}
                >
                  <Image 
                    src={activeProject.images[0]} 
                    alt={`${activeProject.altSEO} - Vista Principal`} 
                    fill 
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">Vista Principal</span>
                    <h2 className="text-xl font-medium">Ejecución Gráfica Core</h2>
                  </div>
                </div>

                {/* 2. Fila con 2 Fotos Medianas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[activeProject.images[1], activeProject.images[2]].map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setLightboxImage(img)}
                      className={`group relative h-72 rounded-3xl overflow-hidden backdrop-blur-xl border shadow-2xl cursor-pointer transition-all p-6 ${
                        theme === 'dark' ? 'bg-zinc-900/40 border-white/10 hover:border-red-500/80' : 'bg-white/50 border-zinc-300 hover:border-red-600/80'
                      }`}
                    >
                      <Image 
                        src={img} 
                        alt={`${activeProject.altSEO} - Vista Detalle 0${idx + 2}`} 
                        fill 
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  ))}
                </div>

              </div>

              {/* Botón de Regresar */}
              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProject(null)}
                  className="backdrop-blur-xl border px-10 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-xl flex items-center space-x-2 bg-red-600 text-white hover:bg-red-700"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  <span>Regresar al portafolio</span>
                </motion.button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full h-[80vh]">
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-50"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <Image 
                src={lightboxImage} 
                alt="Vista ampliada proyecto Nu-Design" 
                fill 
                className="object-contain" 
              />
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