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
    whatsappDesc: 'Hablemos de tu proyecto',
    cotizacion: 'Cotización',
    cotizacionDesc: 'Recibe tu propuesta',
    heroTitle1: 'Identidades que',
    heroTitle2: 'dejan huella.',
    heroSubhead: 'Branding, packaging y diseño editorial de alta gama para marcas que quieren destacar en ',
    heroSubheadBold1: 'República Dominicana',
    heroSubheadAnd: ' y el ',
    heroSubheadBold2: 'Caribe.',
    indicator1: 'Diseño estratégico',
    indicator2: 'Calidad premium',
    indicator3: 'Atención personalizada',
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
    whatsappDesc: "Let's talk about your project",
    cotizacion: 'Quote',
    cotizacionDesc: 'Get your proposal',
    heroTitle1: 'Identities that',
    heroTitle2: 'leave a mark.',
    heroSubhead: 'High-end branding, packaging, and editorial design for brands looking to stand out in ',
    heroSubheadBold1: 'Dominican Republic',
    heroSubheadAnd: ' and the ',
    heroSubheadBold2: 'Caribbean.',
    indicator1: 'Strategic design',
    indicator2: 'Premium quality',
    indicator3: 'Personalized service',
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
    whatsappDesc: 'Parlons de votre projet',
    cotizacion: 'Devis',
    cotizacionDesc: 'Recevez votre proposition',
    heroTitle1: 'Des identités qui',
    heroTitle2: 'marquent los esprits.',
    heroSubhead: 'Branding, packaging et design éditorial haut de gamme pour les marques qui souhaitent se démarquer en ',
    heroSubheadBold1: 'République Dominicaine',
    heroSubheadAnd: ' et dans la ',
    heroSubheadBold2: 'Caraïbe.',
    indicator1: 'Design stratégique',
    indicator2: 'Qualité premium',
    indicator3: 'Service personnalisé',
    searchPlaceholder: 'Bonjour, j\'ai besoin...',
    rights: 'Nu-Design Tous droits réservés 2026 - Design by Garic Edume',
    chat: 'Écrivez ahora',
    solucionesTitulo: 'Des solutions qui',
    solucionesElevan: 'élèvent votre marque',
    brandingDesc: 'Stratégie et identité visuelle qui connectent et positionnent votre marque.',
    produccionDesc: 'Design graphique numérique et imprimé à fort impact.',
    packagingDesc: 'Des designs d\'emballage qui protègent, comuniquent et vendent.',
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
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        </svg>
      )
    },
    {
      title: 'Producción Gráfica',
      desc: t.produccionDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zM17 9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      )
    },
    {
      title: 'Packaging',
      desc: t.packagingDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Diseño Web',
      desc: t.webDesc,
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h6l-.75-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

      {/* FONDO CINEMÁTICO APPLE STYLED CON LUZ AMBIENTAL ROJA Y GLOW EXTENDIDO */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 right-[5%] w-150 md:w-225 h-150 md:h-225 bg-[radial-gradient(circle,rgba(220,38,38,0.22)_0%,transparent_65%)] rounded-full blur-[100px] md:blur-[160px]"></div>
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-162.5 md:w-225 h-112.5 md:h-150 bg-linear-to-tr from-red-950/30 via-red-800/20 to-transparent rounded-full blur-[120px] md:blur-[180px] transform -rotate-12"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#040001_85%)]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-1/4 right-[5%] w-150 md:w-200 h-150 md:h-200 bg-[radial-gradient(circle,rgba(239,68,68,0.15)_0%,transparent_65%)] rounded-full blur-[90px] md:blur-[140px]"></div>
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

      {/* =========================================================================
          NUEVO HERO SUPERIOR - REFINAMIENTO DE LAYOUT, ESCALA DE MOCKUP Y REFLEJO
         ========================================================================= */}
      <main className="w-full max-w-375 mx-auto px-6 sm:px-10 lg:px-12 my-auto z-10 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* COLUMNA IZQUIERDA: CONTENIDO COMPLETO (45% Ancho visual / 5 Cols en lg) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left space-y-6 md:space-y-7 z-20"
          >
            {/* H1 Editorial Premium */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] font-sans">
              <span>{t.heroTitle1}</span>
              <br />
              <span className="bg-linear-to-r from-red-500 via-red-600 to-red-400 bg-clip-text text-transparent font-bold">
                {t.heroTitle2}
              </span>
            </h1>

            {/* Subheadline / Subtítulo */}
            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-xl ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {t.heroSubhead}
              <strong className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>{t.heroSubheadBold1}</strong>
              {t.heroSubheadAnd}
              <strong className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>{t.heroSubheadBold2}</strong>
            </p>

            {/* BOTONES LIQUID GLASS DE ALTA GAMA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-1">
              
              {/* Primary CTA: WhatsApp Liquid Glass */}
<motion.a
  whileHover={{ y: -2, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  href="https://wa.me/18294608316"
  target="_blank"
  rel="noopener noreferrer"
  className={`relative group flex items-center space-x-4 px-6 py-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 border overflow-hidden shadow-2xl ${
    theme === 'dark'
      ? 'bg-linear-to-r from-red-600/30 via-red-900/20 to-red-500/10 border-red-500/40 text-white hover:border-red-500/80 hover:shadow-[0_0_30px_rgba(239,68,68,0.45)]'
      : 'bg-linear-to-r from-red-500/20 via-red-100/40 to-white/60 border-red-500/50 text-zinc-900 hover:border-red-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]'
  }`}
>
  {/* Glow ambiental interno del botón */}
  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

  <div className="w-9 h-9 rounded-full bg-red-600/80 group-hover:bg-red-500 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shrink-0">
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  </div>
  
  <div className="flex flex-col text-left">
    <span className="text-sm font-semibold leading-tight">{t.whatsapp}</span>
    <span className={`text-[11px] font-normal opacity-80 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>{t.whatsappDesc}</span>
  </div>
</motion.a>

              {/* Secondary CTA: Cotización Liquid Glass */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/cotizacion"
                  className={`relative group flex items-center space-x-4 px-6 py-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 border overflow-hidden shadow-lg h-full ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'bg-black/5 border-black/15 text-zinc-900 hover:bg-black/10 hover:border-black/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-black/5 border-black/10 text-zinc-900'
                  }`}>
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold leading-tight">{t.cotizacion}</span>
                    <span className={`text-[11px] font-normal opacity-80 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>{t.cotizacionDesc}</span>
                  </div>
                </Link>
              </motion.div>

            </div>

            {/* INDICADORES / INTERACTIVE HINTS DEBAJO DE LOS CTA */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              
              {/* Hint 1 */}
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2 text-xs font-medium transition-colors group cursor-default"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <span className={theme === 'dark' ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-black'}>
                  {t.indicator1}
                </span>
              </motion.div>

              {/* Hint 2 */}
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2 text-xs font-medium transition-colors group cursor-default"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className={theme === 'dark' ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-black'}>
                  {t.indicator2}
                </span>
              </motion.div>

              {/* Hint 3 */}
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2 text-xs font-medium transition-colors group cursor-default"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                </div>
                <span className={theme === 'dark' ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-black'}>
                  {t.indicator3}
                </span>
              </motion.div>

            </div>

            {/* BUSCADOR INTERACTIVO & ICONOS DE SERVICIO */}
            <div className="w-full pt-3 space-y-3.5">
              
              {/* Iconos interactivos de servicios */}
              <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
                {serviceIcons.map((service, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleServiceClick(service.name)}
                    title={service.name}
                    className={`w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl backdrop-blur-2xl border flex items-center justify-center transition-all group relative cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/15 text-white/90 hover:text-red-500 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                        : 'bg-black/5 border-black/10 text-zinc-800 hover:text-red-600 hover:border-red-500/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    }`}
                  >
                    {service.svg}
                  </motion.button>
                ))}
              </div>

              {/* Formulario / Input de Búsqueda */}
              <form 
                onSubmit={handleSearchSubmit}
                className={`w-full backdrop-blur-3xl border rounded-full px-4.5 py-2.5 flex items-center justify-between shadow-xl focus-within:border-red-500/60 focus-within:shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all duration-500 relative overflow-hidden ${
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
                  className={`w-full bg-transparent border-none outline-none text-xs sm:text-sm font-normal tracking-wide z-10 ${
                    theme === 'dark' 
                      ? 'placeholder-zinc-400 text-white' 
                      : 'placeholder-zinc-600 text-zinc-900'
                  }`} 
                />
                <button type="submit" className="text-zinc-300 hover:text-red-500 transition-colors ml-3 cursor-pointer z-10" title="Buscar servicio">
                  <svg className="w-4.5 h-4.5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </form>

              {/* Etiquetas Rápidas */}
              <div className={`w-full text-[10px] sm:text-xs font-light leading-relaxed ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Branding")}>Branding</span> • <span>PNG</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Logotipos")}>Logotipos</span> • <span>Creatividad</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("UX/UI")}>UX/UI</span> • <span>PDF</span> • <span>Diseño Editorial</span> • <span>RGB</span> • 
                <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors ml-1" onClick={() => handleServiceClick("Landing Page")}>Landing Page</span> • <span>Vectorización</span> • <span>Calidad Premium</span> • <span>SVG</span> • <span>Flyers</span> • <span>AI</span>
              </div>

            </div>

          </motion.div>

          {/* COLUMNA DERECHA: MOCKUP PROTAGONISTA CON SOMBRA DE CONTACTO REALISTA Y REFLEJO */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center justify-center relative group w-full pl-0 lg:pl-6"
          >
            {/* 1. Luz Ambiental Roja de Fondo */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
              theme === 'dark'
                ? 'bg-[radial-gradient(circle,rgba(220,38,38,0.22)_0%,transparent_70%)] opacity-90 group-hover:opacity-100'
                : 'bg-[radial-gradient(circle,rgba(239,68,68,0.15)_0%,transparent_70%)] opacity-70 group-hover:opacity-90'
            }`}></div>

            {/* 2. Contenedor Principal del Mockup */}
            <div className="relative w-full max-w-170 xl:max-w-190 aspect-4/3 flex items-center justify-center z-10">
              <Image 
                src={theme === 'dark' ? '/mockup-dark.png' : '/mockup-light.png'} 
                alt="NU-Design Premium Showcase" 
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain transition-transform duration-700 hover:scale-[1.015]" 
                priority
              />
            </div>

            {/* 3. SOMBRA DE CONTACTO REALISTA EN LA BASE (ANCLAJE FÍSICO) */}
            <div className={`w-full max-w-160 xl:max-w-180 h-5 -mt-6 sm:-mt-8 rounded-[100%] blur-md pointer-events-none z-10 transition-opacity ${
              theme === 'dark'
                ? 'bg-black/90 shadow-[0_10px_25px_rgba(0,0,0,0.95)]'
                : 'bg-zinc-950/30 shadow-[0_10px_20px_rgba(0,0,0,0.25)]'
            }`}></div>

            {/* 4. REFLEJO EN SUELO DE ESTUDIO */}
            <div className="relative w-full max-w-170 xl:max-w-190 h-20 sm:h-28 -mt-4 overflow-hidden pointer-events-none opacity-25 dark:opacity-30 blur-[5px] select-none z-0">
              <div className="relative w-full h-full transform scale-y-[-1]">
                <Image 
                  src={theme === 'dark' ? '/mockup-dark.png' : '/mockup-light.png'} 
                  alt="Mockup Floor Reflection" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain" 
                />
              </div>
              {/* Máscara de Degradado */}
              <div className={`absolute inset-0 bg-linear-to-b ${
                theme === 'dark'
                  ? 'from-transparent via-[#040001]/80 to-[#040001]'
                  : 'from-transparent via-[#e3e3e3]/80 to-[#e3e3e3]'
              }`}></div>
            </div>

          </motion.div>

        </div>
      </main>

      {/* FASE 2: SECCIÓN DE SERVICIOS EN LÍNEA HORIZONTAL ANCHA (FULL HORIZONTAL ROW) */}
      <section className="w-full px-4 md:px-8 py-8 md:py-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`w-full p-6 md:p-10 rounded-3xl backdrop-blur-2xl border shadow-2xl ${
            theme === 'dark' 
              ? 'bg-zinc-900/40 border-white/10' 
              : 'bg-white/60 border-black/10'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            
            {/* Título a la izquierda */}
            <div className="lg:w-1/4 text-left lg:border-r border-white/10 lg:pr-8 pb-4 lg:pb-0 border-b lg:border-b-0 w-full">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                {t.solucionesTitulo} <br />
                <span className="font-semibold text-red-500">{t.solucionesElevan}</span>
              </h2>
            </div>

            {/* Los 4 servicios en UNA SOLA FILA HORIZONTAL (grid 4 cols) */}
            <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full text-left">
              {mainServicesList.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceClick(item.title)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]' 
                      : 'bg-black/5 border-black/10 hover:border-red-500/50 hover:bg-black/10'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {item.svg}
                    </div>
                    <h3 className="text-base font-semibold mb-1.5 group-hover:text-red-500 transition-colors">{item.title}</h3>
                    <p className="text-xs opacity-75 leading-relaxed font-light">{item.desc}</p>
                  </div>
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