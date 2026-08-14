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
    chat: 'Chat now',
    projectMind: '¿Tienes un proyecto en mente?',
    quoteUs: 'Cotiza con nosotros.',
    quoteText: 'Cuéntanos tu idea y recibe una propuesta personalizada y sin compromiso.',
    reqQuote: 'Solicitar cotización',
    reqQuoteDesc: 'Es rápido y sencillo',
    connectPurpose: 'Conectemos con propósito',
    connectP1: '¿Tienes un proyecto en mente? Cuéntanos tu visión y la convertimos en una identidad visual que deja huella. Ya sea branding, packaging, producción gráfica o un desafío creativo fuera de lo común — estamos a un mensaje de distancia.',
    connectP2: 'Respondemos rápido, cotizamos claro, y trabajamos contigo hasta que tu marca se vea como merece.',
    writeUs: 'Escríbenos y empecemos.',
    email: 'Correo',
    location: 'Ubicación',
    schedule: 'Horario'
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
    chat: 'Chat now',
    projectMind: 'Have a project in mind?',
    quoteUs: 'Get a quote.',
    quoteText: 'Tell us your idea and receive a customized, no-obligation proposal.',
    reqQuote: 'Request a quote',
    reqQuoteDesc: 'It is quick and easy',
    connectPurpose: 'Connect with purpose',
    connectP1: 'Have a project in mind? Tell us your vision and we will turn it into a visual identity that leaves a mark. Whether it is branding, packaging, graphic production, or an out-of-the-box creative challenge — we are just a message away.',
    connectP2: 'We respond quickly, quote clearly, and work with you until your brand looks as it deserves.',
    writeUs: 'Write to us and let us start.',
    email: 'Email',
    location: 'Location',
    schedule: 'Schedule'
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
    chat: 'Discuter',
    projectMind: 'Vous avez un projet en tête ?',
    quoteUs: 'Demandez un devis.',
    quoteText: 'Racontez-nous votre idée et recevez une proposition personnalisée et sans engagement.',
    reqQuote: 'Demander un devis',
    reqQuoteDesc: 'C\'est simple et rapide',
    connectPurpose: 'Se connecter avec un but',
    connectP1: 'Vous avez un projet en tête ? Parlez-nous de votre vision et nous la transformerons en une identité visuelle qui laissera une trace. Qu\'il s\'agisse de branding, de packaging, de production graphique ou d\'un défi créatif sortant de l\'ordinaire, nous ne sommes qu\'à un message.',
    connectP2: 'Nous répondons rapidement, nous établissons des devis clairs et nous travaillons avec vous jusqu\'à ce que votre marque ressemble à ce qu\'elle mérite.',
    writeUs: 'Écrivez-nous et commençons.',
    email: 'E-mail',
    location: 'Emplacement',
    schedule: 'Horaires'
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
            <div className="absolute top-1/3 right-[5%] w-150 md:w-225 h-150 md:h-225 bg-[radial-gradient(circle,rgba(220,38,38,0.22)_0%,transparent_65%)] rounded-full blur-[100px] md:blur-[160px]"></div>
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-162.5 md:w-225 h-112.5 md:h-150 bg-linear-to-tr from-red-950/30 via-red-800/20 to-transparent rounded-full blur-[120px] md:blur-[180px] transform -rotate-12"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#040001_85%)]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-1/3 right-[5%] w-150 md:w-200 h-150 md:h-200 bg-[radial-gradient(circle,rgba(239,68,68,0.15)_0%,transparent_65%)] rounded-full blur-[90px] md:blur-[140px]"></div>
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
        className="w-full px-6 md:px-25 py-4 flex items-center justify-between z-40"
      >
        <div className="flex items-center space-x-3">
          <WordmarkLogo className="h-6 md:h-8 w-auto" />

          <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
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
          HERO PRINCIPAL (100% CONSERVADO E INTACTO)
         ========================================================================= */}
      <main className="w-full px-6 sm:px-12 md:px-25 my-auto z-10 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left space-y-6 md:space-y-7 z-20 w-full"
          >
            {/* H1 POPPINS EN EXACTAMENTE 2 LÍNEAS */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.08] whitespace-pre-line">
              <span className="font-medium">{t.heroTitle1}</span>{"\n"}
              <span className="font-bold text-red-500">{t.heroTitle2}</span>
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

            {/* BOTONES LIQUID GLASS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-1">
              
              {/* Primary CTA: WhatsApp */}
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/18294608316"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group flex items-center space-x-4 px-6 py-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 border shadow-lg h-full cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border-emerald-500/40 text-white hover:bg-white/10 hover:border-emerald-500/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                    : 'bg-black/5 border-emerald-600/40 text-zinc-900 hover:bg-black/10 hover:border-emerald-600/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-md shrink-0">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold leading-tight">{t.whatsapp}</span>
                  <span className={`text-[11px] font-normal opacity-80 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>{t.whatsappDesc}</span>
                </div>
              </motion.a>

              {/* Secondary CTA: Cotización */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/cotizacion"
                  className={`relative group flex items-center space-x-4 px-6 py-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 border shadow-lg h-full cursor-pointer ${
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

            {/* INDICADORES EN POPPINS REGULAR */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2 text-xs font-normal font-sans transition-colors group cursor-default"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-zinc-800'}>
                  {t.indicator1}
                </span>
              </motion.div>

              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2 text-xs font-normal font-sans transition-colors group cursor-default"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-zinc-800'}>
                  {t.indicator2}
                </span>
              </motion.div>

              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2 text-xs font-normal font-sans transition-colors group cursor-default"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-zinc-800'}>
                  {t.indicator3}
                </span>
              </motion.div>

            </div>

            {/* BUSCADOR INTERACTIVO & ICONOS DE SERVICIO */}
            <div className="w-full pt-3 space-y-4">
              
              <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
                {serviceIcons.map((service, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleServiceClick(service.name)}
                    title={service.name}
                    className={`w-9.5 h-9.5 sm:w-10.5 sm:h-10.5 rounded-xl backdrop-blur-2xl border flex items-center justify-center transition-all group relative cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/15 text-white/90 hover:text-red-500 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                        : 'bg-black/5 border-black/10 text-zinc-800 hover:text-red-600 hover:border-red-500/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    }`}
                  >
                    {service.svg}
                  </motion.button>
                ))}
              </div>

              <form 
                onSubmit={handleSearchSubmit}
                className={`w-full max-w-2xl backdrop-blur-3xl border rounded-full px-6 md:px-8 py-3.5 md:py-4 flex items-center justify-between shadow-2xl focus-within:border-red-500/60 focus-within:shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all duration-500 relative overflow-hidden ${
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
              </form>

              <div className={`w-full max-w-2xl text-[10px] sm:text-xs font-light leading-relaxed ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Branding")}>Branding</span> • <span>PNG</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("Logotipos")}>Logotipos</span> • <span>Creatividad</span> • <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleServiceClick("UX/UI")}>UX/UI</span> • <span>PDF</span> • <span>Diseño Editorial</span> • <span>RGB</span> • 
                <span className="font-semibold cursor-pointer hover:text-red-500 transition-colors ml-1" onClick={() => handleServiceClick("Landing Page")}>Landing Page</span> • <span>Vectorización</span> • <span>Calidad Premium</span> • <span>SVG</span> • <span>Flyers</span> • <span>AI</span>
              </div>

            </div>

          </motion.div>

          {/* COLUMNA DERECHA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center justify-center relative group w-full"
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
              theme === 'dark'
                ? 'bg-[radial-gradient(circle,rgba(220,38,38,0.22)_0%,transparent_70%)] opacity-90 group-hover:opacity-100'
                : 'bg-[radial-gradient(circle,rgba(239,68,68,0.15)_0%,transparent_70%)] opacity-70 group-hover:opacity-90'
            }`}></div>

            <div className="relative w-full max-w-195 xl:max-w-220 aspect-4/3 flex items-center justify-center z-10">
              <Image 
                src={theme === 'dark' ? '/mockup-dark.png' : '/mockup-light.png'} 
                alt="NU-Design Premium Showcase" 
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain transition-transform duration-700 hover:scale-[1.015]" 
                priority
              />
            </div>

            <div className={`w-full max-w-175 xl:max-w-200 h-6 -mt-7 sm:-mt-9 rounded-[100%] blur-md pointer-events-none z-10 transition-opacity ${
              theme === 'dark'
                ? 'bg-black/95 shadow-[0_14px_30px_rgba(0,0,0,0.98)]'
                : 'bg-zinc-950/35 shadow-[0_12px_24px_rgba(0,0,0,0.3)]'
            }`}></div>

            <div className="relative w-full max-w-195 xl:max-w-220 h-24 sm:h-32 -mt-5 overflow-hidden pointer-events-none opacity-25 dark:opacity-30 blur-[5px] select-none z-0">
              <div className="relative w-full h-full transform scale-y-[-1]">
                <Image 
                  src={theme === 'dark' ? '/mockup-dark.png' : '/mockup-light.png'} 
                  alt="Mockup Floor Reflection" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain" 
                />
              </div>
              <div className={`absolute inset-0 bg-linear-to-b ${
                theme === 'dark'
                  ? 'from-transparent via-[#040001]/80 to-[#040001]'
                  : 'from-transparent via-[#e3e3e3]/80 to-[#e3e3e3]'
              }`}></div>
            </div>

          </motion.div>

        </div>
      </main>

      {/* =========================================================================
          SECCIÓN 1: SOLUCIONES QUE ELEVAN TU MARCA (ESCALADA + LIQUID GLASS TIPO APPLE)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-12 md:px-25 py-12 md:py-20 z-10">
        <div className={`w-full p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-3xl border shadow-2xl transition-all ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10 text-white'
            : 'bg-black/5 border-black/10 text-zinc-900'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Título de la Sección */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-500/20 pb-6 lg:pb-0 lg:pr-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight leading-tight">
                Soluciones que <br className="hidden sm:inline" />
                <span className="text-red-500 font-bold">elevan tu marca</span>
              </h2>
            </div>

            {/* Grid de 4 Servicios con Tarjetas Liquid Glass Amplias */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              
              {/* Tarjeta 1: Branding */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-2xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                    : 'bg-white/80 border-black/10 hover:border-red-500/50 hover:bg-white hover:shadow-xl'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5 font-sans">Branding</h3>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Estrategia e identidad visual que conecta y posiciona tu marca con fuerza.
                  </p>
                </div>
              </motion.div>

              {/* Tarjeta 2: Producción Gráfica */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-2xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                    : 'bg-white/80 border-black/10 hover:border-red-500/50 hover:bg-white hover:shadow-xl'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5 font-sans">Producción Gráfica</h3>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Diseño y piezas gráficas impresas y digitales de alto impacto visual.
                  </p>
                </div>
              </motion.div>

              {/* Tarjeta 3: Packaging */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-2xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                    : 'bg-white/80 border-black/10 hover:border-red-500/50 hover:bg-white hover:shadow-xl'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5 font-sans">Packaging</h3>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Diseños de empaque premium que protegen, comunican y garantizan ventas.
                  </p>
                </div>
              </motion.div>

              {/* Tarjeta 4: Diseño Web */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-2xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                    : 'bg-white/80 border-black/10 hover:border-red-500/50 hover:bg-white hover:shadow-xl'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5 font-sans">Diseño Web</h3>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Sitios web modernos, veloces, funcionales y alineados al 100% a tu marca.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 1.5: MANIFIESTO Y SOBRE NOSOTROS (ESTILO EDITORIAL CON FOTO Y LIQUID GLASS)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-12 md:px-25 py-12 md:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* FOTO DE LA CHICA CON LUZ AMBIENTAL Y CONTENEDOR GLASS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative group"
          >
            <div className="group relative w-full aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl z-10">
              <Image 
                src="/fotochica.JPG" 
                alt="Diseñadora Nu-Design en estudio" 
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Tarjeta Flotante Inferior en la Foto con Efecto Liquid Glass */}
            <div className={`absolute -bottom-6 right-4 sm:-bottom-8 sm:right-6 z-20 backdrop-blur-2xl border rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center space-x-6 ${
              theme === 'dark' ? 'bg-black/60 border-white/20 text-white' : 'bg-white/80 border-black/10 text-zinc-900'
            }`}>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-red-500">2018</span>
                <span className="text-[10px] uppercase tracking-wider opacity-70">Desde Santo Domingo</span>
              </div>
              <div className="w-px h-8 bg-zinc-500/30"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Calidad Premium</span>
                <span className="text-[10px] opacity-70">Alta gama en cada detalle</span>
              </div>
            </div>
          </motion.div>

          {/* MANIFIESTO EDITORIAL / SOBRE NOSOTROS */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight leading-tight">
              Diseño con propósito. <br />
              Identidad con <span className="font-bold text-red-500">carácter.</span>
            </h2>

            <div className={`space-y-4 text-base sm:text-lg font-light leading-relaxed ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              <p>
                En <strong className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>NuDesign</strong> somos más que una agencia de diseño gráfico — somos arquitectos de identidad visual. Desde 2018, transformamos marcas en experiencias memorables a través de branding estratégico, packaging de lujo y producción gráfica de precisión.
              </p>
              <p>
                Cada proyecto nace de una premisa simple: el buen diseño no decora, comunica. Fusionamos la disciplina del minimalismo suizo con la sensibilidad del diseño japonés para crear identidades que no solo se ven bien — perduran.
              </p>
              <p>
                Trabajamos con marcas que entienden que su imagen es su primera promesa al mundo. Desde startups que buscan nacer con presencia dominante, hasta empresas consolidadas que necesitan reinventarse.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-500/20 flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold tracking-wide">
                NuDesign — <span className="text-red-500">Alta gama en cada detalle.</span>
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          NUEVA SECCIÓN 02: CTA COTIZACIÓN
         ========================================================================= */}
      <section className="w-full px-6 sm:px-12 md:px-25 py-12 md:py-16 z-10 relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className={`w-full p-8 md:p-12 rounded-3xl backdrop-blur-3xl border shadow-2xl transition-all relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}>
          
          {/* Left Side */}
          <div className="flex-col flex space-y-4 lg:w-5/12 z-10">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">02 —</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight leading-tight">
              {t.projectMind} <br/>
              <span className="text-red-500 font-bold">{t.quoteUs}</span>
            </h2>
          </div>
          
          {/* Right Side */}
          <div className="flex-col flex space-y-6 lg:w-7/12 z-10 w-full relative">
            
            {/* Se elimina max-w-md para que fluya, y se agrega padding right (pr-32) para no pisar la imagen */}
            <p className={`text-base sm:text-lg font-light leading-relaxed pr-24 sm:pr-32 md:pr-48 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {t.quoteText}
            </p>
            
            <div>
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                 <Link href="/cotizacion" className="flex items-center space-x-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all">
                    <div className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-lg">
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold">{t.reqQuote}</span>
                      <span className="text-[10px] font-light opacity-80">{t.reqQuoteDesc}</span>
                    </div>
                 </Link>
              </motion.div>
            </div>
            
            {/* Graphic posicionado a la derecha de forma absoluta */}
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-32 h-40 md:w-44 md:h-52 lg:w-48 lg:h-56 pointer-events-none">
               <Image src="/clipboard.png" alt="Cotización NuDesign" fill className="object-contain drop-shadow-2xl" />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          NUEVA SECCIÓN 03: CONECTEMOS CON PROPÓSITO (CONTACTO)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-12 md:px-25 py-12 md:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Side */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">03 —</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight leading-tight">
              {t.connectPurpose}
            </h2>
            <div className={`space-y-4 text-sm sm:text-base font-light leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p>{t.connectP1}</p>
              <p>{t.connectP2}</p>
            </div>
            <span className="text-red-500 font-semibold text-lg">{t.writeUs}</span>
          </div>
          
          {/* Right Side: Contact Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 lg:mt-0">
             
             {/* WhatsApp */}
             <div className={`p-5 rounded-2xl backdrop-blur-2xl border flex items-center space-x-4 transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:border-red-500/50 hover:bg-white'}`}>
                <div className="w-11 h-11 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70 mb-0.5">{t.whatsapp}</span>
                  <span className="text-sm font-semibold tracking-wide">+1 (829) 460-8316</span>
                </div>
             </div>

             {/* Correo */}
             <div className={`p-5 rounded-2xl backdrop-blur-2xl border flex items-center space-x-4 transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:border-red-500/50 hover:bg-white'}`}>
                <div className="w-11 h-11 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70 mb-0.5">{t.email}</span>
                  <span className="text-sm font-semibold tracking-wide">hola@nudesign.agency</span>
                </div>
             </div>

             {/* Ubicación */}
             <div className={`p-5 rounded-2xl backdrop-blur-2xl border flex items-center space-x-4 transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:border-red-500/50 hover:bg-white'}`}>
                <div className="w-11 h-11 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70 mb-0.5">{t.location}</span>
                  <span className="text-sm font-semibold tracking-wide">República Dominicana</span>
                </div>
             </div>

             {/* Horario */}
             <div className={`p-5 rounded-2xl backdrop-blur-2xl border flex items-center space-x-4 transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:border-red-500/50 hover:bg-white'}`}>
                <div className="w-11 h-11 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70 mb-0.5">{t.schedule}</span>
                  <span className="text-sm font-semibold tracking-wide leading-tight">Lun – Vie: 8:00 AM – 6:30 PM<br/>Sáb: 8:00 AM – 12:00 PM</span>
                </div>
             </div>

          </div>
        </div>
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