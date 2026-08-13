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
    chat: 'Escribe ahora',
    heroTagline: 'Branding, packaging y diseño editorial de alta gama para marcas que quieren destacar en República Dominicana y el Caribe.',
    whatsappBtn: 'Hablemos de tu proyecto',
    cotizacionBtn: 'Recibe tu propuesta',
    check1: 'Diseño estratégico',
    check2: 'Calidad premium',
    check3: 'Atención personalizada',
    descubreMas: 'Descubre más',
    solucionesTitulo: 'Soluciones que',
    solucionesElevan: 'elevan tu marca',
    nosotrosTag: 'SOBRE NOSOTROS',
    nosotrosTitulo: 'Diseño con propósito. Identidad con carácter.',
    cotizaTag: 'COTIZACIÓN',
    cotizaTitulo: '¿Tienes un proyecto en mente?',
    cotizaSub: 'Cotiza con nosotros.',
    cotizaDesc: 'Cuéntanos tu idea y recibe una propuesta personalizada y sin compromiso.',
    cotizaBtn: 'Solicitar cotización',
    cotizaDetail: 'Es rápido y sencillo',
    contactoTag: 'CONTACTO',
    contactoTitulo: 'Conectemos con propósito',
    contactoDesc: '¿Tienes un proyecto en mente? Cuéntanos tu visión y la convertimos en una identidad visual que deja huella. Ya sea branding, packaging, producción gráfica o un desafío creativo fuera de lo común — estamos a un mensaje de distancia.',
    contactoSubDesc: 'Respondemos rápido, cotizamos claro, y trabajamos contigo hasta que tu marca se vea como merece.',
    contactoCTA: 'Escríbenos y empecemos.',
    horarioTitle: 'HORARIO',
    horarioVal: 'Lun – Vie: 8:00 AM – 6:30 PM\nSáb: 8:00 AM – 12:00 PM',
    ubicacionTitle: 'UBICACIÓN',
    ubicacionVal: 'República Dominicana'
  },
  EN: {
    inicio: 'home',
    portafolio: 'portfolio',
    contratar: 'hire us',
    contacto: 'contact',
    utilidades: 'utilities',
    whatsapp: 'Whatsapp',
    cotizacion: 'Quote',
    chat: 'Write now',
    heroTagline: 'High-end branding, packaging, and editorial design for brands aiming to stand out in the Dominican Republic and the Caribbean.',
    whatsappBtn: "Let's talk about your project",
    cotizacionBtn: 'Get your proposal',
    check1: 'Strategic design',
    check2: 'Premium quality',
    check3: 'Personalized service',
    descubreMas: 'Discover more',
    solucionesTitulo: 'Solutions that',
    solucionesElevan: 'elevate your brand',
    nosotrosTag: 'ABOUT US',
    nosotrosTitulo: 'Design with purpose. Identity with character.',
    cotizaTag: 'QUOTE',
    cotizaTitulo: 'Have a project in mind?',
    cotizaSub: 'Get a quote with us.',
    cotizaDesc: 'Tell us your idea and receive a tailored, no-obligation proposal.',
    cotizaBtn: 'Request a quote',
    cotizaDetail: 'Fast and simple',
    contactoTag: 'CONTACT',
    contactoTitulo: "Let's connect with purpose",
    contactoDesc: 'Have a project in mind? Share your vision and we will convert it into a lasting visual identity. Whether branding, packaging, print production or a creative challenge — we are just a message away.',
    contactoSubDesc: 'We reply fast, quote clearly, and work with you until your brand looks as it deserves.',
    contactoCTA: "Write us and let's start.",
    horarioTitle: 'HOURS',
    horarioVal: 'Mon – Fri: 8:00 AM – 6:30 PM\nSat: 8:00 AM – 12:00 PM',
    ubicacionTitle: 'LOCATION',
    ubicacionVal: 'Dominican Republic'
  },
  FR: {
    inicio: 'accueil',
    portafolio: 'portfolio',
    contratar: 'embaucher',
    contacto: 'contact',
    utilidades: 'utilitaires',
    whatsapp: 'Whatsapp',
    cotizacion: 'Devis',
    chat: 'Écrivez maintenant',
    heroTagline: 'Branding, packaging et design éditorial haut de gamme pour les marques souhaitant se démarquer en République Dominicaine et dans la Caraïbe.',
    whatsappBtn: 'Parlons de votre projet',
    cotizacionBtn: 'Recevez votre proposition',
    check1: 'Design stratégique',
    check2: 'Qualité premium',
    check3: 'Service personnalisé',
    descubreMas: 'Découvrir plus',
    solucionesTitulo: 'Des solutions qui',
    solucionesElevan: 'élèvent votre marque',
    nosotrosTag: 'À PROPOS DE NOUS',
    nosotrosTitulo: 'Design avec objectif. Identité avec caractère.',
    cotizaTag: 'DEVIS',
    cotizaTitulo: 'Un projet en tête ?',
    cotizaSub: 'Obtenez un devis avec nous.',
    cotizaDesc: 'Racontez-nous votre idée et recevez une proposition personnalisée et sans engagement.',
    cotizaBtn: 'Demander un devis',
    cotizaDetail: 'Rapide et simple',
    contactoTag: 'CONTACT',
    contactoTitulo: 'Connectons-nous avec objectif',
    contactoDesc: 'Un projet en tête ? Partagez votre vision et nous la transformerons en une identité visuelle marquante. Branding, packaging, production graphique ou défi créatif — nous sommes à un message.',
    contactoSubDesc: 'Réponse rapide, devis clair, nous travaillons avec vous jusqu’à ce que votre marque brille.',
    contactoCTA: 'Écrivez-nous et commençons.',
    horarioTitle: 'HORAIRES',
    horarioVal: 'Lun – Ven: 8:00 – 18:30\nSam: 8:00 – 12:00',
    ubicacionTitle: 'EMPLACEMENT',
    ubicacionVal: 'République Dominicaine'
  }
};

const serviciosData = [
  {
    title: 'Branding',
    desc: 'Estrategia e identidad visual que conecta y posiciona tu marca.',
    svg: (
      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    )
  },
  {
    title: 'Producción Gráfica',
    desc: 'Diseño y piezas gráficas impresas y digitales de alto impacto.',
    svg: (
      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-4 11H9v-5h6v5zm4-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
      </svg>
    )
  },
  {
    title: 'Packaging',
    desc: 'Diseños de empaque que protegen, comunican y venden.',
    svg: (
      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M20 6h-4.18C15.4 4.84 14.3 4 13 4c-.28 0-.53.04-.79.1-.11-.03-.23-.07-.35-.07-.55 0-1 .45-1 1 0 .28.11.53.29.71L10 7H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 19V9h16v10H4z" />
      </svg>
    )
  },
  {
    title: 'Diseño Web',
    desc: 'Sitios web modernos, funcionales y alineados a tu marca.',
    svg: (
      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
      </svg>
    )
  }
];

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  useEffect(() => {
    const savedTheme = localStorage.getItem('nu_theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

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
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#f4f2ee] text-zinc-900'
    }`}>
      
      {/* Datos Estructurados Schema.org para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* FONDO CINEMÁTICO LIQUID AMBIENT GLOW (CON CLASES CANÓNICAS TAILWIND) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-200 h-125 bg-red-600/15 rounded-full blur-[180px]"></div>
            <div className="absolute top-[40%] right-[-25] w-125 h-125 bg-red-900/10 rounded-full blur-[160px]"></div>
          </>
        ) : (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-200 h-125 bg-orange-200/40 rounded-full blur-[160px]"></div>
        )}
      </div>

      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-6 md:px-12 py-5 flex items-center justify-between z-40 sticky top-0 backdrop-blur-2xl border-b border-white/10"
      >
        <div className="flex items-center space-x-4">
          <WordmarkLogo className="h-6 md:h-8 w-auto" />

          <nav className="hidden md:flex items-center space-x-2 text-sm font-medium ml-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className={`px-4 py-2 rounded-full transition-all ${
                theme === 'dark' ? 'bg-white/10 text-white font-semibold border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-black/10 text-zinc-900 font-semibold'
              }`}>{t.inicio}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/portafolio" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.portafolio}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contratar" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.contratar}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contacto" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.contacto}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/utilidades" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.utilidades}</Link>
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
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white hover:border-red-500/40'
                  : 'bg-black/5 border-black/10 text-zinc-900 hover:border-red-500/40'
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

          {/* Botón Cotización Header */}
          <Link href="/cotizacion" className="hidden sm:block">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all border border-white/20 hover:border-red-500 text-white backdrop-blur-xl bg-white/5"
            >
              {t.cotizacion}
            </motion.button>
          </Link>

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

      {/* HERO PRINCIPAL COMMERCIAL FULL-BLEED */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Columna Izquierda - Textos y CTAs */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
              Identidades que <br />
              <span className="text-red-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">dejan huella.</span>
            </h1>
            <p className={`text-base sm:text-lg font-light leading-relaxed max-w-xl ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {t.heroTagline}
            </p>
          </div>

          {/* Botones de Acción Principales con Vida */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            
            {/* WhatsApp CTA (Rojo Vivo) */}
            <motion.a 
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="https://wa.me/18294608316" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4.5 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center space-x-4 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-xs font-extrabold uppercase tracking-wider">WhatsApp</span>
                <span className="block text-[11px] opacity-90 font-light">{t.whatsappBtn}</span>
              </div>
            </motion.a>

            {/* Cotización CTA (Glass Minimal) */}
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link 
                href="/cotizacion"
                className={`border px-8 py-4.5 rounded-2xl flex items-center space-x-4 transition-all backdrop-blur-xl ${
                  theme === 'dark' ? 'border-white/20 bg-white/5 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-black/20 bg-black/5 hover:border-red-600'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-extrabold uppercase tracking-wider">{t.cotizacion}</span>
                  <span className="block text-[11px] opacity-80 font-light">{t.cotizacionBtn}</span>
                </div>
              </Link>
            </motion.div>

          </div>

          {/* Checks de Confianza */}
          <div className="flex items-center flex-wrap gap-6 pt-2 text-xs font-medium opacity-80">
            <span className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span> {t.check1}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span> {t.check2}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-red-500 font-bold">✓</span> {t.check3}
            </span>
          </div>
        </div>

        {/* Columna Derecha - Mockup Grande Protagonista */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full h-112.5 sm:h-137.5 rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image 
              src={theme === 'dark' ? '/mockup-dark.png' : '/mockup-light.png'}
              alt="NU-Design Portfolio Mockup"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

      </section>

      {/* SECCIÓN DE SERVICIOS PRINCIPALES */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 z-10">
        <div className={`p-8 md:p-12 rounded-3xl border backdrop-blur-2xl shadow-2xl ${
          theme === 'dark' ? 'bg-zinc-900/50 border-white/10' : 'bg-white/80 border-black/10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Título de la Sección */}
            <div className="md:col-span-4 text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {t.solucionesTitulo} <br />
                <span className="text-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">{t.solucionesElevan}</span>
              </h2>
            </div>

            {/* Cuadrícula de 4 Servicios */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {serviciosData.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -4 }}
                  className="space-y-2.5 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3">
                    {item.svg}
                  </div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-xs opacity-75 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FRANJA 01 — SOBRE NOSOTROS */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Fotografía a la Izquierda */}
          <div className="lg:col-span-5 relative w-full h-100 md:h-125 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src="/fotochica.jpg" 
              alt="Sobre NuDesign"
              fill
              className="object-cover"
            />
          </div>

          {/* Contenido Editorial a la Derecha */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {t.nosotrosTitulo}
            </h2>

            <div className="space-y-4 text-xs md:text-sm font-light leading-relaxed text-[#CCCCCC]">
              <p>
                En NuDesign somos más que una agencia de diseño gráfico — somos arquitectos de identidad visual. Desde 2018, transformamos marcas en experiencias memorables a través de branding estratégico, packaging de lujo y producción gráfica de precisión.
              </p>
              <p>
                Cada proyecto nace de una premisa simple: el buen diseño no decora, comunica. Fusionamos la disciplina del minimalismo suizo con la sensibilidad del diseño japonés para crear identidades que no solo se ven bien — perduran.
              </p>
              <p>
                Trabajamos con marcas que entienden que su imagen es su primera promesa al mundo. Desde startups que buscan nacer con presencia dominante, hasta empresas consolidadas que necesitan reinventarse, cada trazo, cada paleta y cada pieza que entregamos está pensada para elevar tu marca al nivel que merece.
              </p>
            </div>

            <p className="text-sm font-extrabold text-red-500 tracking-wider pt-2">
              NuDesign — Alta gama en cada detalle.
            </p>
          </div>

        </div>
      </section>

      {/* FRANJA 02 — COTIZACIÓN */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 z-10">
        <div className={`p-8 md:p-14 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left ${
          theme === 'dark' ? 'bg-linear-to-r from-red-950/40 via-zinc-900/60 to-zinc-900/40 border-red-500/20' : 'bg-white border-zinc-200'
        }`}>
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {t.cotizaTitulo} <br />
              <span className="text-red-600">{t.cotizaSub}</span>
            </h2>
            <p className="text-xs md:text-sm opacity-80 font-light leading-relaxed">
              {t.cotizaDesc}
            </p>
          </div>

          <div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/cotizacion"
                className="bg-red-600 hover:bg-red-700 text-white px-9 py-5 rounded-2xl text-xs uppercase tracking-widest font-extrabold shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center space-x-3 transition-all"
              >
                <span>{t.cotizaBtn}</span>
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FRANJA 03 — CONTACTO */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Columna Texto Contacto */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {t.contactoTitulo}
            </h2>
            <p className="text-xs md:text-sm opacity-80 font-light leading-relaxed">
              {t.contactoDesc}
            </p>
            <p className="text-xs md:text-sm opacity-80 font-light leading-relaxed">
              {t.contactoSubDesc}
            </p>

            <div className="pt-2">
              <a 
                href="https://wa.me/18294608316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-red-600 font-extrabold text-base hover:underline tracking-wider"
              >
                {t.contactoCTA}
              </a>
            </div>
          </div>

          {/* Columna Tarjeta de Datos */}
          <div className={`lg:col-span-6 p-8 md:p-10 rounded-3xl border shadow-2xl space-y-6 backdrop-blur-2xl ${
            theme === 'dark' ? 'bg-zinc-900/60 border-white/10' : 'bg-white border-zinc-200'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* WhatsApp */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest block">WhatsApp</span>
                <span className="text-sm font-semibold block">+1 (829) 123-4567</span>
              </div>

              {/* Correo */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest block">Correo</span>
                <span className="text-sm font-semibold block">hola@nudesign.com</span>
              </div>

              {/* Ubicación */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest block">{t.ubicacionTitle}</span>
                <span className="text-sm font-semibold block">{t.ubicacionVal}</span>
              </div>

              {/* Horario */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest block">{t.horarioTitle}</span>
                <span className="text-xs font-semibold block whitespace-pre-line leading-normal">{t.horarioVal}</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Footer Unificado Completo */}
      <Footer />

      {/* FLOATING CHAT BUTTON ("Escribe ahora") */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <motion.a 
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/18294608316" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-red-600 text-white px-6 py-3.5 rounded-full flex items-center space-x-3 shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:bg-red-700 transition-all border border-red-500"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg className="w-full h-full fill-current text-white" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            </svg>
          </div>
          <span className="text-xs md:text-sm font-extrabold tracking-wide">{t.chat}</span>
        </motion.a>
      </motion.div>

    </div>
  );
}