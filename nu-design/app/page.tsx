'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/app/components/Footer';
import WordmarkLogo from '@/app/components/WordmarkLogo';

const translations = {
  ES: {
    inicio: 'inicio',
    portafolio: 'portafolio',
    contratar: 'contratar',
    contacto: 'contacto',
    utilidades: 'utilidades',
    whatsapp: 'Whatsapp',
    cotizacion: 'Cotización',
    searchPlaceholder: 'Hola, necesito...',
    rights: 'Nu-Design Derechos reservados 2026 - Design by Garic Edume',
    chat: 'Escribe ahora',
    solucionesTitulo: 'Soluciones que',
    solucionesElevan: 'elevan tu marca',
    brandingDesc: 'Estrategia e identidad visual que conecta y posiciona tu marca.',
    produccionDesc: 'Diseño y piezas gráficas impresas y digitales de alto impacto.',
    packagingDesc: 'Diseños de empaque que protegen, comunican y venden.',
    webDesc: 'Sitios web modernos, funcionales y alineados a tu marca.'
  },
  EN: {
    inicio: 'home',
    portafolio: 'portfolio',
    contratar: 'hire us',
    contacto: 'contact',
    utilidades: 'utilities',
    whatsapp: 'Whatsapp',
    cotizacion: 'Quote',
    searchPlaceholder: 'Hello, I need...',
    rights: 'Nu-Design All rights reserved 2026 - Design by Garic Edume',
    chat: 'Write now',
    solucionesTitulo: 'Solutions that',
    solucionesElevan: 'elevate your brand',
    brandingDesc: 'Strategy and visual identity that connects and positions your brand.',
    produccionDesc: 'High-impact print and digital graphic design.',
    packagingDesc: 'Packaging designs that protect, communicate and sell.',
    webDesc: 'Modern, functional websites aligned with your brand.'
  },
  FR: {
    inicio: 'accueil',
    portafolio: 'portfolio',
    contratar: 'embaucher',
    contacto: 'contact',
    utilidades: 'utilitaires',
    whatsapp: 'Whatsapp',
    cotizacion: 'Devis',
    searchPlaceholder: 'Bonjour, j\'ai besoin...',
    rights: 'Nu-Design Tous droits réservés 2026 - Design by Garic Edume',
    chat: 'Écrivez ahora',
    solucionesTitulo: 'Des solutions qui',
    solucionesElevan: 'élèvent votre marque',
    brandingDesc: 'Stratégie et identité visuelle qui connectent et positionnent votre marque.',
    produccionDesc: 'Design graphique numérique et imprimé à fort impact.',
    packagingDesc: 'Des designs d\'emballage qui protègent, communiquent et vendent.',
    webDesc: 'Sites web modernes, fonctionnels et alignés avec votre marque.'
  }
};

const serviceIcons = [
  { 
    name: "Idea y Concepto", 
    label: "Idea & Concept",
    svg: (
      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z"/>
      </svg>
    )
  },
  { 
    name: "Branding", 
    label: "Branding",
    svg: (
      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    )
  },
  { 
    name: "Diseño Gráfico", 
    label: "Graphic Design",
    svg: (
      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.38-.45-.6-.1-.6-.78 0-.55.45-1 1-1h1.74c3.31 0 6-2.69 6-6 0-4.96-4.49-9.05-10-9.05zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8s1.5.67 1.5 1.5S7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    )
  },
  { 
    name: "Diseño UI/UX", 
    label: "UI/UX Design",
    svg: (
      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M20 3H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2h8v-2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H4V5h16v12z"/>
      </svg>
    )
  },
  { 
    name: "Layout y Diagramación", 
    label: "Layout",
    svg: (
      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M4 11h5V5H4v6zm0 7h5v-5H4v6zm6 0h10v-5H10v6zm6-13v6h4V5h-4zm-6 6h4V5h-4v6z"/>
      </svg>
    )
  },
  { 
    name: "Desarrollo Web", 
    label: "Web Dev",
    svg: (
      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    )
  },
];

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cotizacion?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleServiceClick = (serviceName: string) => {
    setSearchQuery(serviceName);
  };

  const mainServicesList = [
    {
      title: 'Branding',
      desc: t.brandingDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      )
    },
    {
      title: 'Producción Gráfica',
      desc: t.produccionDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-4 11H9v-5h6v5zm4-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
        </svg>
      )
    },
    {
      title: 'Packaging',
      desc: t.packagingDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M20 6h-4.18C15.4 4.84 14.3 4 13 4c-.28 0-.53.04-.79.1-.11-.03-.23-.07-.35-.07-.55 0-1 .45-1 1 0 .28.11.53.29.71L10 7H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 19V9h16v10H4z" />
        </svg>
      )
    },
    {
      title: 'Diseño Web',
      desc: t.webDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
        </svg>
      )
    }
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NU-Design Graphic',
    alternateName: 'NU-Design',
    url: 'https://nudesign.agency',
    logo: 'https://nudesign.agency/icon-dark.svg',
    image: 'https://nudesign.agency/og-portafolio.jpg',
    telephone: '+18294608316',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C. 1ra 35',
      addressLocality: 'Santo Domingo',
      postalCode: '10100',
      addressCountry: 'DO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '18.4418',
      longitude: '-69.9722',
    },
    sameAs: [
      'https://www.instagram.com/nudesign.agency02/',
      'https://www.facebook.com/share/18szd7DaVA/?mibextid=wwXIfr',
      'https://x.com/nudesign_02?s=11',
      'https://youtube.com/@anousleshow1680?si=BqJxqzF7533u7sx2',
      'https://www.tiktok.com/@garicedume?is_from_webapp=1&sender_device=pc',
      'https://do.linkedin.com/in/garic-edume-1141b2320'
    ],
    priceRange: '$$',
    description: 'Dirección Creativa, Diseño Gráfico, Branding y Desarrollo Web de Alta Gama en Santo Domingo.',
  };

  return (
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' 
        ? 'bg-[#040001] text-zinc-100' 
        : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Datos Estructurados Schema.org para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* FONDO CINEMÁTICO APPLE STYLED */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 md:w-225 h-112.5 md:h-150 bg-linear-to-tr from-red-950/45 via-red-800/25 to-red-600/10 rounded-full blur-[120px] md:blur-[180px] transform -rotate-12"></div>
            <div className="absolute top-1/4 left-1/3 w-87.5 h-87.5 bg-red-900/15 rounded-full blur-[140px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#040001_85%)]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 md:w-250 h-125 md:h-175 bg-linear-to-b from-white via-zinc-200/80 to-zinc-300/40 rounded-full blur-[100px] md:blur-[150px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#d9d9d9_90%)]"></div>
          </>
        )}
      </motion.div>

      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40"
      >
        <div className="flex items-center space-x-3">
          <WordmarkLogo className="h-6 md:h-8 w-auto" />

          <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
            {/* 1. Botón INICIO */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/10 border border-red-500/40 text-white' 
                    : 'bg-black/10 border border-red-500/50 text-zinc-900 font-semibold'
                }`}
              >
                {t.inicio}
              </Link>
            </motion.div>
            
            {/* 2. Botón PORTAFOLIO */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/portafolio" 
                className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/0 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-black/0 text-zinc-800 hover:text-black hover:border-black/20 hover:bg-black/5 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t.portafolio}
              </Link>
            </motion.div>

            {/* 3. Botón CONTRATAR */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contratar" 
                className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/0 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-black/0 text-zinc-800 hover:text-black hover:border-black/20 hover:bg-black/5 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t.contratar}
              </Link>
            </motion.div>

            {/* 4. Botón CONTACTO */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contacto" 
                className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/0 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-black/0 text-zinc-800 hover:text-black hover:border-black/20 hover:bg-black/5 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t.contacto}
              </Link>
            </motion.div>

            {/* 5. Botón UTILIDADES */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/utilidades" 
                className={`px-4 py-2 rounded-full backdrop-blur-md transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/0 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-black/0 text-zinc-800 hover:text-black hover:border-black/20 hover:bg-black/5 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t.utilidades}
              </Link>
            </motion.div>
          </nav>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          
          {/* Selector de IDIOMAS */}
          <div className="relative hidden md:block" ref={langMenuRef}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 text-white hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'bg-black/5 border border-black/10 text-zinc-900 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              }`}
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold ml-1">({currentLang})</span>
            </motion.button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                    theme === 'dark' 
                      ? 'bg-black/90 border-white/15 text-zinc-200' 
                      : 'bg-white/95 border-black/10 text-zinc-800'
                  }`}
                >
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-red-500/10 ${currentLang === 'ES' ? 'text-red-500 font-bold' : ''}`}>
                    <span>Español</span>
                  </button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-red-500/10 ${currentLang === 'EN' ? 'text-red-500 font-bold' : ''}`}>
                    <span>English</span>
                  </button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-red-500/10 ${currentLang === 'FR' ? 'text-red-500 font-bold' : ''}`}>
                    <span>Français</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botón WHATSAPP */}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/18294608316" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`hidden sm:flex backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal items-center space-x-2 transition-all ${
              theme === 'dark'
                ? 'bg-white/10 border border-white/20 text-white hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-emerald-600/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            <span>{t.whatsapp}</span>
          </motion.a>
          
          {/* Botón COTIZACIÓN */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/cotizacion" 
              className={`block backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal transition-all ${
                theme === 'dark'
                  ? 'bg-white/10 border border-white/20 text-white hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }`}
            >
              {t.cotizacion}
            </Link>
          </motion.div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white"
            aria-label="Abrir Menú"
          >
            ☰
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
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-bold border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>{t.inicio}</span>
                <span>→</span>
              </Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>{t.portafolio}</span>
                <span>→</span>
              </Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>{t.contratar}</span>
                <span>→</span>
              </Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>{t.contacto}</span>
                <span>→</span>
              </Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>{t.utilidades}</span>
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

      {/* Theme Switcher con Liquid Glass */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-2 md:space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
        }`}
      >
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Oscuro"></button>
      </motion.div>

      {/* Main Hero Section - JERARQUÍA REFINADA */}
      <main className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center my-auto z-10 space-y-5 md:space-y-7 py-4">
        
        {/* Icono superior PROTAGÓNICO Y GRANDE */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
        >
          <Image 
            src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} 
            alt="NU-Design Icon" 
            width={144} 
            height={144} 
            className="w-full h-full object-contain drop-shadow-[0_12px_30px_rgba(255,0,0,0.3)] transition-transform duration-500 group-hover:scale-105" 
            priority
          />
        </motion.div>

        {/* Wordmark ELEGANTE Y AMPLIO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-72 sm:w-88 md:w-md flex items-center justify-center"
        >
          <Image 
            src={theme === 'dark' ? '/wordmark-dark.svg' : '/wordmark-light.svg'} 
            alt="NU-Design Wordmark" 
            width={440} 
            height={110} 
            className="w-full h-auto object-contain drop-shadow-lg" 
            priority
          />
        </motion.div>

        {/* ICONOS INTERACTIVOS COMPACTOS (MÁS PEQUEÑOS QUE EL WORDMARK) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="flex items-center flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-5 pt-1"
        >
          {serviceIcons.map((service, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleServiceClick(service.name)}
              title={service.name}
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl backdrop-blur-2xl border flex items-center justify-center transition-all group relative cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/15 text-white/90 hover:text-red-500 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                  : 'bg-black/5 border-black/10 text-zinc-800 hover:text-red-600 hover:border-red-500/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]'
              }`}
            >
              {service.svg}
            </motion.button>
          ))}
        </motion.div>

        {/* Buscador Interactivo con Lupa SVG Minimalista */}
        <motion.form 
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-2xl backdrop-blur-3xl border rounded-full px-5 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-2xl focus-within:border-red-500/60 focus-within:shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all duration-500 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-black/40 border-white/20 text-white'
              : 'bg-white/60 border-black/15 text-zinc-900'
          }`}
        >
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder} 
            className={`w-full bg-transparent border-none outline-none text-xs sm:text-sm md:text-base font-normal tracking-wide z-10 ${
              theme === 'dark' 
                ? 'placeholder-zinc-400 text-white' 
                : 'placeholder-zinc-600 text-zinc-900'
            }`} 
          />
          <button type="submit" className="text-zinc-300 hover:text-red-500 transition-colors ml-3 cursor-pointer z-10" title="Buscar servicio">
            <svg className="w-5 h-5 md:w-6 md:h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </motion.form>

        {/* Bloque de Texto de Servicios */}
        <div className={`w-full max-w-2xl text-[10px] sm:text-xs font-light leading-relaxed px-2 text-center pt-1 ${
          theme === 'dark' ? 'text-zinc-300 opacity-80' : 'text-zinc-800 opacity-90'
        }`}>
          <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Branding")}>Branding</span> • <span>PNG</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Logotipos")}>Logotipos</span> • <span>Creatividad</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("UX/UI")}>UX/UI</span> • <span>PDF</span> • <span>Diseño Editorial</span> • <span>RGB</span> • 
          <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors ml-1" onClick={() => handleServiceClick("Landing Page")}>Landing Page</span> • <span>Vectorización</span> • <span>Calidad Premium</span> • <span>SVG</span> • <span>Flyers</span> • <span>AI</span>
        </div>

      </main>

      {/* FASE 2: SECCIÓN DE SERVICIOS PRINCIPALES (LIQUID GLASS STYLE) */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-6 md:p-10 rounded-3xl backdrop-blur-2xl border shadow-2xl ${
            theme === 'dark' 
              ? 'bg-zinc-900/40 border-white/10' 
              : 'bg-white/60 border-black/10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Título de la Sección */}
            <div className="md:col-span-4 text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                {t.solucionesTitulo} <br />
                <span className="font-semibold text-red-500">{t.solucionesElevan}</span>
              </h2>
            </div>

            {/* Cuadrícula de 4 Servicios */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {mainServicesList.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceClick(item.title)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                      : 'bg-black/5 border-black/10 hover:border-red-500/50 hover:bg-black/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {item.svg}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-red-500 transition-colors">{item.title}</h3>
                  <p className="text-[11px] opacity-75 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>

      {/* Footer Unificado Completo */}
      <Footer />

      {/* Floating Chat Now Button */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30"
      >
        <motion.a 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/18294608316" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`backdrop-blur-3xl border px-4 sm:px-5 md:px-6 py-2.5 md:py-3.5 rounded-full flex items-center space-x-2.5 shadow-2xl hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all group ${
            theme === 'dark'
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-white/80 border-black/15 text-zinc-900'
          }`}
        >
          <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            <Image 
              src={theme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} 
              alt="Chat Icon" 
              width={32} 
              height={32} 
              className="w-full h-full object-contain transition-transform group-hover:rotate-12" 
            />
          </div>
          <span className="text-xs md:text-base font-medium tracking-wide">{t.chat}</span>
        </motion.a>
      </motion.div>

    </div>
  );
}