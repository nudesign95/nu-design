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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Ver todas las categorías');
  
  const [activeProject, setActiveProject] = useState<typeof sampleProjects[0] | null>(null);

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
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 relative overflow-x-hidden py-6 ${
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
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-red-700/25 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#040001_85%)]"></div>
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
          <Link href="/" className="md:hidden font-bold text-sm tracking-widest uppercase">
            NU-DESIGN
          </Link>
          
          <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
            <Link href="/" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">
              inicio
            </Link>
            <Link href="/portafolio" className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
              theme === 'dark' 
                ? 'bg-white/10 border border-red-500/40 text-red-500 font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-black/10 border border-red-500/50 text-red-600 font-semibold'
            }`}>
              portafolio
            </Link>
            <Link href="/contratar" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">
              contratar
            </Link>
            <Link href="/contacto" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">
              contacto
            </Link>
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
              <i className={`fa-solid fa-chevron-down text-[10px] ml-1 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}></i>
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

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50"
            aria-label="Abrir Menú"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
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
                <i className="fa-solid fa-arrow-right text-sm opacity-40"></i>
              </Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Portafolio</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contratar</span>
                <i className="fa-solid fa-arrow-right text-sm opacity-40"></i>
              </Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contacto</span>
                <i className="fa-solid fa-arrow-right text-sm opacity-40"></i>
              </Link>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-zinc-500/20">
              <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">Seleccionar Idioma</span>
              <div className="flex items-center gap-3">
                <button onClick={() => { setCurrentLang('ES'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'ES' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Español</button>
                <button onClick={() => { setCurrentLang('EN'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'EN' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>English</button>
                <button onClick={() => { setCurrentLang('FR'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'FR' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Français</button>
              </div>

              <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 py-3 rounded-full flex items-center justify-center space-x-2 text-sm font-medium">
                <i className="fa-brands fa-whatsapp text-lg"></i>
                <span>Whatsapp</span>
              </a>
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

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!activeProject ? (
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
                    alt="NU-Design" 
                    width={96} 
                    height={96} 
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(255,0,0,0.3)] transition-transform duration-500 group-hover:scale-110" 
                  />
                </motion.div>

                <div className="space-y-2 max-w-2xl">
                  <h1 className={`text-3xl md:text-5xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Proyectos que <span className="font-semibold text-red-500">definen estándares</span>
                  </h1>
                  <p className="text-xs md:text-sm font-light tracking-widest uppercase opacity-70">
                    Explora nuestra huella visual y ejecuciones de alta gama
                  </p>
                </div>
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

                {/* Galería */}
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
                                alt={proj.title} 
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
                        <div className="w-full col-span-full h-96 flex flex-col items-center justify-center text-center opacity-75 backdrop-blur-xl rounded-2xl border">
                          <i className="fa-solid fa-folder-open text-4xl mb-3 text-red-500"></i>
                          <p className="text-sm font-medium">No se encontraron proyectos en esta categoría.</p>
                          <button onClick={() => { setSelectedCategory('Ver todas las categorías'); setSearchTerm(''); }} className="mt-4 text-xs text-red-500 hover:underline">
                            Ver todos los proyectos
                          </button>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          ) : (
            /* Vista de detalle */
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-5xl flex flex-col items-center space-y-12"
            >
              <div className={`w-full backdrop-blur-2xl border rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-4 relative overflow-hidden ${
                theme === 'dark' ? 'bg-zinc-900/60 border-white/15' : 'bg-white/80 border-zinc-300'
              }`}>
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold block">
                  {activeProject.category} • FECHA {activeProject.year}
                </span>
                <h1 className="text-3xl md:text-5xl font-light tracking-tight">{activeProject.title}</h1>
                <p className="text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto opacity-80 pt-2">
                  <strong className="font-medium">Caso de Estudio:</strong> {activeProject.detail}
                </p>
              </div>

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

      {/* Footer */}
      <footer className="w-full px-10 py-7 flex flex-col items-center space-y-4 z-25 mt-12">
        <div className="text-xs opacity-50 font-light tracking-wide text-center">
          Nu-Design Derechos reservados 2026 - Design by Garic Edume
        </div>
      </footer>

    </div>
  );
}