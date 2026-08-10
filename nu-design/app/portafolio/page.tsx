'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';
import WordmarkLogo from '../components/WordmarkLogo';

const categoryDescriptions: { [key: string]: { title: string; text: string } } = {
  'Branding': {
    title: 'Branding & Identidad Corporativa',
    text: `Creamos identidades de marca estratégicas que transmiten la esencia, los valores y la personalidad de tu negocio. Nuestro objetivo es desarrollar una imagen visual coherente, memorable y profesional que genere confianza, diferencie tu marca de la competencia y fortalezca su posicionamiento en el mercado.

Este servicio va más allá del diseño de un logotipo; construimos un sistema de identidad visual completo que garantiza consistencia en todos los puntos de contacto con tus clientes.

¿Qué puede incluir este servicio?
• Diseño de logotipo principal y sus variantes.
• Selección de paleta de colores.
• Definición de tipografías.
• Elementos gráficos e iconografía.
• Manual básico o completo de identidad de marca.
• Aplicaciones de la marca (papelería, redes sociales, presentaciones, entre otros).
• Lineamientos para el uso correcto de la identidad visual.

Ideal para:
Emprendedores, pequeñas y medianas empresas, startups y negocios que desean lanzar una nueva marca o renovar su imagen para proyectar mayor profesionalismo y credibilidad.`
  },
  'Diseño Web': {
    title: 'Diseño Web UI / UX',
    text: `Diseñamos sitios web modernos, funcionales y centrados en la experiencia del usuario, combinando estética, usabilidad y rendimiento. Cada proyecto se desarrolla para reflejar la identidad de tu marca, fortalecer tu presencia digital y facilitar que tus clientes encuentren la información que necesitan y realicen acciones clave, como contactarte o realizar una compra.`
  },
  'Packaging': {
    title: 'Packaging & Empaques',
    text: `Desarrollamos diseños de empaques que protegen, comunican y venden. Creamos soluciones visuales que destacan tu producto en el punto de venta, fortalecen el reconocimiento de marca y generan una experiencia memorable para el consumidor, cuidando tanto la estética como la funcionalidad.`
  },
  'Diseño Editorial': {
    title: 'Diseño Editorial',
    text: `Diseñamos piezas editoriales con una estructura visual clara, atractiva y profesional. Organizamos la información para facilitar la lectura y reforzar el mensaje, logrando publicaciones que combinan contenido, diseño y coherencia visual.`
  },
  'Gran Formato': {
    title: 'Gran Formato & Publicidad Exterior',
    text: `Creamos diseños de gran impacto para medios publicitarios de gran escala, asegurando una comunicación clara y una excelente legibilidad desde distintas distancias. Adaptamos cada pieza a las especificaciones técnicas del formato para garantizar resultados de alta calidad en impresión.`
  },
  'Redes Sociales': {
    title: 'Redes Sociales & Contenido Digital',
    text: `Diseñamos contenido visual estratégico para fortalecer la presencia digital de tu marca. Creamos piezas gráficas atractivas y coherentes con tu identidad visual, pensadas para captar la atención, aumentar el reconocimiento de marca y fomentar la interacción con tu audiencia en las diferentes plataformas sociales.`
  }
};

const categories = [
  'Todos',
  'Branding',
  'Diseño Web',
  'Packaging',
  'Diseño Editorial',
  'Gran Formato',
  'Redes Sociales'
];

// 8 Fotografías por categoría
const projects = [
  // Branding (8 fotos)
  { id: 101, title: 'Isologo & Sistema Visual de Marca', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 102, title: 'Manual de Marca & Paleta de Colores', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 103, title: 'Rediseño de Identidad Corporativa', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 104, title: 'Brand Kit Básico para Startups', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 105, title: 'Monograma Elegante para Marca Personal', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 106, title: 'Iconografía Personalizada Corporativa', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 107, title: 'Isotipo Exclusivo & Adaptaciones', category: 'Branding', image: '/og-portafolio.jpg' },
  { id: 108, title: 'Mockup Profesional de Marca', category: 'Branding', image: '/og-portafolio.jpg' },

  // Diseño Web (8 fotos)
  { id: 201, title: 'Landing Page de Alta Conversión', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 202, title: 'Interfaz para E-commerce Responsivo', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 203, title: 'Sitio Web Corporativo UI/UX', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 204, title: 'Diseño de Newsletter Email Marketing', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 205, title: 'Banner Web Publicitario Digital', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 206, title: 'Prototipo Figma Interactivo', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 207, title: 'Firma Profesional para Correo HTML', category: 'Diseño Web', image: '/og-portafolio.jpg' },
  { id: 208, title: 'Plataforma Web UI Adaptativa', category: 'Diseño Web', image: '/og-portafolio.jpg' },

  // Packaging (8 fotos)
  { id: 301, title: 'Packaging Premium & Cajas Rígidas', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 302, title: 'Etiquetas Personalizadas para Botellas', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 303, title: 'Diseño de Bolsas Comerciales', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 304, title: 'Etiqueta Circular para Envases', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 305, title: 'Empaque Básico con Troquelado', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 306, title: 'Manga Impresa para Vasos', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 307, title: 'Envoltura de Producto Especial', category: 'Packaging', image: '/og-portafolio.jpg' },
  { id: 308, title: 'Stickers Promocionales en Rollo', category: 'Packaging', image: '/og-portafolio.jpg' },

  // Diseño Editorial (8 fotos)
  { id: 401, title: 'Diseño de Revista Corporativa', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 402, title: 'Brochure Tríptico Institucional', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 403, title: 'Diagramación de Ebook Digital', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 404, title: 'Portada de Libro Impreso y Digital', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 405, title: 'Catálogo de Productos Multipágina', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 406, title: 'PDF Interactivo con Navegación', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 407, title: 'Menú Elegante para Restaurante', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },
  { id: 408, title: 'Programa Formal para Eventos', category: 'Diseño Editorial', image: '/og-portafolio.jpg' },

  // Gran Formato (8 fotos)
  { id: 501, title: 'Mural Corporativo para Oficinas', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 502, title: 'Lona Publicitaria de Alta Resolución', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 503, title: 'Back Panel para Conferencias', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 504, title: 'Roll Up Banner Comercial', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 505, title: 'Vinil Decorativo para Cristales', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 506, title: 'X Banner Promocional', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 507, title: 'Banner Publicitario Exterior', category: 'Gran Formato', image: '/og-portafolio.jpg' },
  { id: 508, title: 'Display Promocional Punto de Venta', category: 'Gran Formato', image: '/og-portafolio.jpg' },

  // Redes Sociales (8 fotos)
  { id: 601, title: 'Carrusel Informativo para Instagram', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 602, title: 'Kit de Plantillas para Instagram', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 603, title: 'Historias Dinámicas Promocionales', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 604, title: 'Banner Institucional para Facebook', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 605, title: 'Portada Corporativa para LinkedIn', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 606, title: 'Miniatura YouTube de Alto Impacto', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 607, title: 'Banner de Canal para YouTube', category: 'Redes Sociales', image: '/og-portafolio.jpg' },
  { id: 608, title: 'Portada Personalizada para Twitch', category: 'Redes Sociales', image: '/og-portafolio.jpg' }
];

export default function PortafolioPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nu_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    }
    return 'dark';
  });

  const { currentLang, changeLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeImageModal, setActiveImageModal] = useState<{ image: string; title: string; category: string } | null>(null);

  const langMenuRef = useRef<HTMLDivElement>(null);

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

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setIsDescriptionExpanded(false);
  };

  const filteredProjects = selectedCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const currentCategoryData = selectedCategory !== 'Todos' ? categoryDescriptions[selectedCategory] : null;

  return (
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Top Navigation Bar Unificada */}
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative">
       <div className="flex items-center space-x-3">
  {/* Wordmark Adaptativo SVG para Móvil y Desktop */}
  <WordmarkLogo className="h-6 md:h-8 w-auto" />

  <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
            <Link href="/" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">inicio</Link>
            <Link href="/portafolio" className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
              theme === 'dark' 
                ? 'bg-white/10 border border-red-500/40 text-red-500 font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-black/10 border border-red-500/50 text-red-600 font-semibold'
            }`}>portafolio</Link>
            <Link href="/contratar" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">contratar</Link>
            <Link href="/contacto" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">contacto</Link>
            <Link href="/utilidades" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">utilidades</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative hidden md:block" ref={langMenuRef}>
            <button 
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)} 
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none cursor-pointer ${
                theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-black/5 border border-black/10 text-zinc-900'
              }`}
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold ml-1">({currentLang})</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                  theme === 'dark' ? 'bg-black/90 border-white/15 text-zinc-200' : 'bg-white/95 border-black/10 text-zinc-800'
                }`}>
                  <button type="button" onClick={() => { changeLanguage('ES'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currentLang === 'ES' ? 'text-red-500 font-bold bg-white/5' : 'hover:bg-red-500/10'}`}>Español (ES)</button>
                  <button type="button" onClick={() => { changeLanguage('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currentLang === 'EN' ? 'text-red-500 font-bold bg-white/5' : 'hover:bg-red-500/10'}`}>English (EN)</button>
                  <button type="button" onClick={() => { changeLanguage('FR'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currentLang === 'FR' ? 'text-red-500 font-bold bg-white/5' : 'hover:bg-red-500/10'}`}>Français (FR)</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cotizacion" className={`block backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal transition-all ${
            theme === 'dark' ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/15 text-zinc-900'
          }`}>
            Cotización
          </Link>

          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white cursor-pointer" aria-label="Abrir Menú">
            ☰
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
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Inicio</span><span>→</span></Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Portafolio</span><span>→</span></Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Contratar</span><span>→</span></Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Contacto</span><span>→</span></Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center"><span>Utilidades</span><span>→</span></Link>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-zinc-500/20">
              <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">Seleccionar Idioma</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => { changeLanguage('ES'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer ${currentLang === 'ES' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Español</button>
                <button type="button" onClick={() => { changeLanguage('EN'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer ${currentLang === 'EN' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>English</button>
                <button type="button" onClick={() => { changeLanguage('FR'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer ${currentLang === 'FR' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Français</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button type="button" onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl cursor-pointer" title="Modo Claro"></button>
        <button type="button" onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl cursor-pointer" title="Modo Oscuro"></button>
      </div>

      {/* Main Portafolio */}
      <main className="w-full max-w-6xl mx-auto px-4 py-8 z-10 flex flex-col items-center">
        <div className="text-center mb-8 space-y-2">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3">
            <Image src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} alt="NU-Design" width={80} height={80} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight">Proyectos que <span className="font-semibold text-red-500">definen estándares</span></h1>
          <p className="text-[10px] md:text-xs font-light tracking-widest uppercase opacity-75">Explora nuestra huella visual y ejecuciones de alta gama</p>
        </div>

        {/* Botones de Filtro de Categorías */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all backdrop-blur-md border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/30 hover:bg-white/10'
                  : 'bg-black/5 border-black/10 text-zinc-700 hover:border-black/30 hover:bg-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sección de Descripción del Servicio con "- Leer más -" */}
        {currentCategoryData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`w-full max-w-4xl p-6 md:p-8 rounded-3xl border mb-10 text-left space-y-3 backdrop-blur-xl ${
            theme === 'dark' ? 'bg-zinc-900/50 border-white/15' : 'bg-white/70 border-black/10'
          }`}>
            <h2 className="text-lg md:text-xl font-semibold text-red-500 tracking-wide uppercase">{currentCategoryData.title}</h2>
            
            <div className="text-xs md:text-sm font-light leading-relaxed whitespace-pre-line opacity-85">
              {isDescriptionExpanded 
                ? currentCategoryData.text 
                : `${currentCategoryData.text.slice(0, 180)}...`}
            </div>

            <button 
              type="button"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 text-xs font-bold text-red-500 hover:text-red-400 underline tracking-wider uppercase flex items-center gap-1 cursor-pointer"
            >
              {isDescriptionExpanded ? '- Mostrar menos -' : '- Leer más -'}
            </button>
          </motion.div>
        )}

        {/* Grid de Proyectos Filtrados (Vistas Previas Cuadradas 1:1) */}
        <motion.div layout className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveImageModal({ image: p.image, title: p.title, category: p.category })}
                className={`group rounded-2xl overflow-hidden border p-2 md:p-3 backdrop-blur-xl transition-all cursor-pointer hover:border-red-500/60 hover:shadow-xl ${
                  theme === 'dark' ? 'bg-zinc-900/40 border-white/10' : 'bg-white/60 border-black/10'
                }`}
              >
                {/* Cuadrado perfecto 1:1 sin deformar */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="text-xs font-semibold truncate">{p.title}</h3>
                <span className="text-[9px] text-red-500 font-semibold uppercase tracking-wider block mt-0.5">{p.category}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* VISOR MODAL LIGHTBOX A PANTALLA COMPLETA */}
      <AnimatePresence>
        {activeImageModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8"
          >
            <div className="w-full flex justify-between items-center max-w-5xl z-10">
              <div>
                <h3 className="text-sm md:text-base font-semibold text-white">{activeImageModal.title}</h3>
                <span className="text-xs text-red-500 uppercase font-medium">{activeImageModal.category}</span>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveImageModal(null)} 
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                REGRESAR
              </button>
            </div>

            {/* Fotografía en tamaño y proporción original flotante sin distorsión usando Next.js Image */}
            <div className="relative w-full h-[80vh] max-w-5xl my-auto flex items-center justify-center">
              <Image 
                src={activeImageModal.image} 
                alt={activeImageModal.title} 
                fill
                className="object-contain rounded-2xl drop-shadow-2xl" 
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>

            <div className="text-[10px] text-zinc-400 font-light tracking-widest uppercase">
              Haz clic en REGRESAR o fuera para volver a la galería
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Unificado Completo */}
      <Footer />

    </div>
  );
}