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
    
    // Hero - Textos Principales
    heroTitle1: 'Identidades que',
    heroTitle2: 'dejan huella.',
    heroDesc: 'Branding, packaging y diseño editorial de alta gama para marcas que quieren destacar en',
    heroLocation: 'República Dominicana y el Caribe.',
    heroBtnWA: 'Hablemos de tu proyecto',
    heroBtnCot: 'Recibe tu propuesta',
    feature1: 'Diseño estratégico',
    feature2: 'Calidad premium',
    feature3: 'Atención personalizada',
    discoverMore: 'Descubre más',

    // Soluciones & Servicios
    solucionesTitulo: 'Soluciones que',
    solucionesElevan: 'elevan tu marca',
    brandingTitle: 'Branding',
    brandingDesc: 'Estrategia e identidad visual para marcas.',
    produccionTitle: 'Producción Gráfica',
    produccionDesc: 'Diseño y piezas gráficas impresas y digitales.',
    packagingTitle: 'Packaging',
    packagingDesc: 'Diseños de empaque que protegen, comunican y venden.',
    webTitle: 'Diseño Web',
    webDesc: 'Sitios web modernos, funcionales y alineados con la identidad de la marca.',

    // Franja 01 - Sobre Nosotros / Manifiesto
    sec1Tag: '01 —— SOBRE NOSOTROS',
    sec1Title1: 'Diseño con propósito.',
    sec1Title2: 'Identidad con carácter.',
    sec1Text1: 'En NuDesign somos más que una agencia de diseño gráfico — somos arquitectos de identidad visual. Desde 2018, transformamos marcas en experiencias memorables a través de branding estratégico, packaging de lujo y producción gráfica de precisión.',
    sec1Text2: 'Cada proyecto nace de una premisa simple: el buen diseño no decora, comunica. Fusionamos la disciplina del minimalismo suizo con la sensibilidad del diseño japonés para crear identidades que no solo se ven bien — perduran.',
    sec1Text3: 'Trabajamos con marcas que entienden que su imagen es su primera promesa al mundo. Desde startups que buscan nacer con presencia dominante, hasta empresas consolidadas que necesitan reinventarse, cada trazo, cada paleta y cada pieza que entregamos está pensada para elevar tu marca al nivel que merece.',
    sec1Tagline: 'NuDesign — Alta gama en cada detalle.',

    // Franja 02 - Cotización
    sec2Tag: '02 —— COTIZACIÓN',
    sec2Title1: '¿Tienes un proyecto',
    sec2Title2: 'en mente?',
    sec2Title3: 'Cotiza con nosotros.',
    sec2Desc: 'Cuéntanos tu idea y recibe una propuesta personalizada y sin compromiso.',
    sec2Btn: 'SOLICITAR COTIZACIÓN →',
    sec2SubBtn: 'Es rápido y sencillo',

    // Franja 03 - Contacto
    sec3Tag: '03 —— CONTACTO',
    sec3Title: 'Conectemos con propósito',
    sec3Desc: '¿Tienes un proyecto en mente? Cuéntanos tu visión y la convertimos en una identidad visual que deja huella. Ya sea branding, packaging, producción gráfica o un desafío creativo fuera de lo común — estamos a un mensaje de distancia.',
    sec3SubDesc: 'Respondemos rápido, cotizamos claro, y trabajamos contigo hasta que tu marca se vea como merece.',
    sec3Action: 'Escríbenos y empecemos.',
    contactWA: 'WhatsApp',
    contactWAPhone: '+1 (829) 460-8316',
    contactMail: 'Correo',
    contactMailAddr: 'hola@nudesign.agency',
    contactLoc: 'Ubicación',
    contactLocVal: 'República Dominicana',
    contactHours: 'Horario',
    hoursWeek: 'Lun – Vie: 8:00 AM – 6:30 PM',
    hoursSat: 'Sáb: 8:00 AM – 12:00 PM'
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

    heroTitle1: 'Identities that',
    heroTitle2: 'leave a mark.',
    heroDesc: 'High-end branding, packaging and editorial design for brands looking to stand out in',
    heroLocation: 'Dominican Republic and the Caribbean.',
    heroBtnWA: 'Let\'s talk about your project',
    heroBtnCot: 'Get your quote',
    feature1: 'Strategic design',
    feature2: 'Premium quality',
    feature3: 'Personalized attention',
    discoverMore: 'Discover more',

    solucionesTitulo: 'Solutions that',
    solucionesElevan: 'elevate your brand',
    brandingTitle: 'Branding',
    brandingDesc: 'Strategy and visual identity for brands.',
    produccionTitle: 'Graphic Production',
    produccionDesc: 'High-impact print and digital graphic design.',
    packagingTitle: 'Packaging',
    packagingDesc: 'Packaging designs that protect, communicate and sell.',
    webTitle: 'Web Design',
    webDesc: 'Modern, functional websites aligned with brand identity.',

    sec1Tag: '01 —— ABOUT US',
    sec1Title1: 'Design with purpose.',
    sec1Title2: 'Identity with character.',
    sec1Text1: 'At NuDesign we are more than a graphic design agency — we are visual identity architects. Since 2018, we transform brands into memorable experiences through strategic branding, luxury packaging and precision graphic production.',
    sec1Text2: 'Every project stems from a simple premise: good design doesn\'t decorate, it communicates. We fuse Swiss minimalism discipline with Japanese design sensitivity to create identities that endure.',
    sec1Text3: 'We work with brands that understand image is their first promise to the world. From startups to established companies, every stroke, palette and deliverable is built to elevate your brand.',
    sec1Tagline: 'NuDesign — High end in every detail.',

    sec2Tag: '02 —— QUOTATION',
    sec2Title1: 'Have a project',
    sec2Title2: 'in mind?',
    sec2Title3: 'Get a quote with us.',
    sec2Desc: 'Tell us your idea and receive a personalized, no-obligation proposal.',
    sec2Btn: 'REQUEST QUOTE →',
    sec2SubBtn: 'Fast and simple',

    sec3Tag: '03 —— CONTACT',
    sec3Title: 'Let\'s connect with purpose',
    sec3Desc: 'Have a project in mind? Tell us your vision and we\'ll turn it into a visual identity that leaves a mark. Whether it\'s branding, packaging or a custom creative challenge — we are one message away.',
    sec3SubDesc: 'We respond quickly, quote clearly, and work with you until your brand looks as it deserves.',
    sec3Action: 'Write us and let\'s start.',
    contactWA: 'WhatsApp',
    contactWAPhone: '+1 (829) 460-8316',
    contactMail: 'Email',
    contactMailAddr: 'hola@nudesign.agency',
    contactLoc: 'Location',
    contactLocVal: 'Dominican Republic',
    contactHours: 'Hours',
    hoursWeek: 'Mon – Fri: 8:00 AM – 6:30 PM',
    hoursSat: 'Sat: 8:00 AM – 12:00 PM'
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

    heroTitle1: 'Des identités qui',
    heroTitle2: 'laissent une empreinte.',
    heroDesc: 'Branding haut de gamme, packaging et design éditorial pour les marques souhaitant se démarquer en',
    heroLocation: 'République Dominicaine et la Caraïbe.',
    heroBtnWA: 'Parlons de votre projet',
    heroBtnCot: 'Recevez votre devis',
    feature1: 'Design stratégique',
    feature2: 'Qualité premium',
    feature3: 'Attention personnalisée',
    discoverMore: 'Découvrez plus',

    solucionesTitulo: 'Des solutions qui',
    solucionesElevan: 'élèvent votre marque',
    brandingTitle: 'Branding',
    brandingDesc: 'Stratégie et identité visuelle pour les marques.',
    produccionTitle: 'Production Graphique',
    produccionDesc: 'Design graphique numérique et imprimé.',
    packagingTitle: 'Packaging',
    packagingDesc: 'Des designs d\'emballage qui protègent, communiquent et vendent.',
    webTitle: 'Design Web',
    webDesc: 'Sites web modernes, fonctionnels et alignés avec la marque.',

    sec1Tag: '01 —— À PROPOS',
    sec1Title1: 'Design avec but.',
    sec1Title2: 'Identité avec caractère.',
    sec1Text1: 'Chez NuDesign, nous sommes des architectes d\'identité visuelle. Depuis 2018, nous transformons les marques en expériences mémorables.',
    sec1Text2: 'Chaque projet naît d\'une prémisse simple : le bon design communique. Nous fusionnons la discipline du minimalisme suisse avec le design japonais.',
    sec1Text3: 'Nous travaillons avec des marques qui comprennent que leur image est leur première promesse au monde.',
    sec1Tagline: 'NuDesign — Haut de gamme dans chaque détail.',

    sec2Tag: '02 —— DEVIS',
    sec2Title1: 'Un projet',
    sec2Title2: 'en tête ?',
    sec2Title3: 'Demandez un devis.',
    sec2Desc: 'Racontez-nous votre idée et recevez une proposition personnalisée.',
    sec2Btn: 'DEMANDER UN DEVIS →',
    sec2SubBtn: 'Rapide et simple',

    sec3Tag: '03 —— CONTACT',
    sec3Title: 'Connectons-nous avec but',
    sec3Desc: 'Un projet en tête ? Racontez-nous votre vision et transformons-la en una identité visuelle marquante.',
    sec3SubDesc: 'Nous répondons rapidement et clairement hasta que votre marque resplendisse.',
    sec3Action: 'Écrivez-nous et commençons.',
    contactWA: 'WhatsApp',
    contactWAPhone: '+1 (829) 460-8316',
    contactMail: 'E-mail',
    contactMailAddr: 'hola@nudesign.agency',
    contactLoc: 'Localisation',
    contactLocVal: 'République Dominicaine',
    contactHours: 'Horaires',
    hoursWeek: 'Lun – Ven: 8:00 AM – 6:30 PM',
    hoursSat: 'Sam: 8:00 AM – 12:00 PM'
  }
};

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
    window.location.href = `/cotizacion?search=${encodeURIComponent(serviceName)}`;
  };

  const mainServicesList = [
    { 
      title: t.brandingTitle, 
      desc: t.brandingDesc, 
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        </svg>
      ) 
    },
    { 
      title: t.produccionTitle, 
      desc: t.produccionDesc, 
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zM17 9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ) 
    },
    { 
      title: t.packagingTitle, 
      desc: t.packagingDesc, 
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ) 
    },
    { 
      title: t.webTitle, 
      desc: t.webDesc, 
      svg: (
        <svg className="w-6 h-6 text-red-500 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
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
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-700 relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#f4f4f4] text-zinc-900'
    }`}>
      
      {/* Datos Estructurados Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* FONDO CINEMÁTICO ILUMINADO CON TAILWIND V4 CANÓNICO */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {theme === 'dark' ? (
          <>
            <div className="absolute top-0 right-0 w-162.5 h-162.5 bg-linear-to-b from-red-900/20 via-red-950/10 to-transparent rounded-full blur-[140px]" />
            <div className="absolute bottom-1/3 left-0 w-125 h-125 bg-red-950/15 rounded-full blur-[160px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-112.5 bg-red-900/10 rounded-full blur-[180px] transform -rotate-12" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-b from-red-100/40 via-red-50/20 to-transparent rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#e5e5e5_90%)]" />
          </>
        )}
      </motion.div>

      {/* HEADER NAV - GLASS MINIMAL CON JERARQUÍA COMPLETA */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full px-6 md:px-12 py-6 flex items-center justify-between z-40 relative"
      >
        <div className="flex items-center space-x-10">
          <WordmarkLogo className="h-6 md:h-7 w-auto" />

          <nav className="hidden md:flex items-center space-x-7 text-xs tracking-wider uppercase font-medium">
            <Link href="/" className="text-red-500 font-bold border-b-2 border-red-500 pb-1">{t.inicio}</Link>
            <Link href="/portafolio" className="opacity-75 hover:opacity-100 transition-opacity">{t.portafolio}</Link>
            <Link href="/contratar" className="opacity-75 hover:opacity-100 transition-opacity">{t.contratar}</Link>
            <Link href="/contacto" className="opacity-75 hover:opacity-100 transition-opacity">{t.contacto}</Link>
            <Link href="/utilidades" className="opacity-75 hover:opacity-100 transition-opacity">{t.utilidades}</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          
          {/* SELECTOR DE IDIOMAS DESPLEGABLE */}
          <div className="relative hidden md:block" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`text-[11px] uppercase tracking-widest font-semibold px-4 py-2 rounded-full border transition-all flex items-center space-x-1.5 ${
                theme === 'dark' 
                  ? 'bg-white/3.5 backdrop-blur-[20px] border-white/12 text-white hover:border-white/25 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'bg-black/3.5 backdrop-blur-[20px] border-black/12 text-zinc-900 hover:border-black/25'
              }`}
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold">({currentLang})</span>
              <span className="text-[9px]">▼</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-36 border rounded-2xl shadow-2xl overflow-hidden z-50 py-1.5 ${
                    theme === 'dark' ? 'bg-zinc-950/90 border-white/12 text-white backdrop-blur-2xl' : 'bg-white/95 border-black/10 text-zinc-900 backdrop-blur-2xl'
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

          {/* BOTÓN WHATSAPP HEADER */}
          <a 
            href="https://wa.me/18294608316" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`hidden sm:flex px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
              theme === 'dark'
                ? 'bg-white/3.5 backdrop-blur-[20px] border-white/15 text-white hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-black/3.5 backdrop-blur-[20px] border-black/15 text-zinc-900 hover:border-emerald-600/60'
            }`}
          >
            <span>{t.whatsapp}</span>
          </a>

          {/* BOTÓN COTIZACIÓN HEADER */}
          <Link 
            href="/cotizacion" 
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
              theme === 'dark'
                ? 'bg-white/3.5 backdrop-blur-[20px] border-white/15 text-white hover:bg-white hover:text-black'
                : 'bg-red-600 border-red-600 text-white hover:bg-red-700'
            }`}
          >
            {t.cotizacion}
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-2xl p-1 focus:outline-none"
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
            className={`fixed inset-0 z-50 backdrop-blur-3xl flex flex-col justify-between p-8 pt-24 md:hidden ${
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

      {/* SELECTOR LATERAL DE TEMA LIQUID GLASS */}
      <div className={`fixed right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2.5 z-50 p-2 rounded-full border shadow-2xl backdrop-blur-xl ${
        theme === 'dark' ? 'bg-white/4 border-white/15' : 'bg-black/4 border-black/15'
      }`}>
        <button onClick={() => setTheme('light')} className="w-4 h-4 rounded-full bg-white border border-zinc-300 transition-transform hover:scale-125 focus:outline-none" title="Modo Claro" />
        <button onClick={() => setTheme('dark')} className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 transition-transform hover:scale-125 focus:outline-none" title="Modo Oscuro" />
      </div>

      {/* HERO SECTION (40% CONTENIDO / 60% VISUAL MOCKUP DINÁMICO) */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Izquierda (40% aprox.) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col space-y-6 text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08]">
              {t.heroTitle1} <br />
              <span className="font-semibold text-red-500">{t.heroTitle2}</span>
            </h1>

            <p className={`text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-md ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {t.heroDesc} <strong className="font-medium text-current">{t.heroLocation}</strong>
            </p>

            {/* CTAs Jerarquizados */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* WhatsApp CTA (Prioridad 01 - Liquid Glass + Accent Glow) */}
              <a 
                href="https://wa.me/18294608316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-6 py-3.5 rounded-full text-xs md:text-sm font-semibold flex items-center space-x-3 transition-all duration-300 hover:-translate-y-0.5 active:scale-98 bg-red-600/90 text-white border border-red-500/50 shadow-[0_10px_30px_rgba(239,68,68,0.35)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.5)] hover:border-red-400"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
                </div>
                <div className="text-left">
                  <span className="block font-bold">{t.whatsapp}</span>
                  <span className="block text-[10px] opacity-80 font-normal">{t.heroBtnWA}</span>
                </div>
              </a>

              {/* Cotización CTA (Prioridad 02 - Liquid Glass Subordinado) */}
              <Link 
                href="/cotizacion" 
                className={`px-6 py-3.5 rounded-full text-xs md:text-sm font-semibold border flex items-center space-x-3 transition-all duration-300 hover:-translate-y-0.5 active:scale-98 ${
                  theme === 'dark' 
                    ? 'bg-white/3.5 backdrop-blur-[20px] border-white/12 text-white hover:bg-white/10 hover:border-white/25 shadow-xl' 
                    : 'bg-black/3.5 backdrop-blur-[20px] border-black/12 text-zinc-900 hover:bg-black/10'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <div className="text-left">
                  <span className="block font-bold">{t.cotizacion}</span>
                  <span className="block text-[10px] opacity-70 font-normal">{t.heroBtnCot}</span>
                </div>
              </Link>

            </div>

            {/* Micro-Trust Indicators */}
            <div className="flex flex-wrap items-center gap-5 pt-3 text-[11px] font-light opacity-75">
              <span className="flex items-center gap-1.5"><span className="text-red-500 font-bold">✓</span> {t.feature1}</span>
              <span className="flex items-center gap-1.5"><span className="text-red-500 font-bold">✓</span> {t.feature2}</span>
              <span className="flex items-center gap-1.5"><span className="text-red-500 font-bold">✓</span> {t.feature3}</span>
            </div>
          </motion.div>

          {/* Derecha (60% aprox. - Visual Protagonista) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-2xl aspect-16/11 rounded-[28px] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] flex items-center justify-center bg-zinc-900/20 backdrop-blur-sm">
              <Image 
                src={theme === 'dark' ? '/mockup-dark.png' : '/mockup-light.png'} 
                alt="Nu-Design Luxury Mockup" 
                width={800} 
                height={550} 
                className="w-full h-full object-cover transition-opacity duration-500"
                priority
              />
            </div>
          </motion.div>

        </div>

        <div className="w-full flex justify-center pt-10">
          <span className="text-[10px] tracking-widest uppercase opacity-40 flex items-center gap-2">
            ↓ {t.discoverMore}
          </span>
        </div>
      </main>

      {/* SERVICE GRID HORIZONTAL */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 z-10">
        <div className={`p-8 md:p-10 rounded-[28px] border backdrop-blur-[20px] transition-all ${
          theme === 'dark' 
            ? 'bg-white/3.5 border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
            : 'bg-black/2.5 border-black/10 shadow-xl'
        }`}>
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            
            <div className="lg:w-1/4 text-left border-b lg:border-b-0 lg:border-r border-white/10 pr-6 pb-6 lg:pb-0 w-full">
              <h2 className="text-2xl font-light tracking-tight">
                {t.solucionesTitulo} <br />
                <span className="font-semibold text-red-500">{t.solucionesElevan}</span>
              </h2>
            </div>

            <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {mainServicesList.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleServiceClick(item.title)}
                  className={`p-5 rounded-[20px] border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)] ${
                    theme === 'dark' ? 'bg-white/3 border-white/10' : 'bg-white border-black/5'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    {item.svg}
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-xs font-light opacity-75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FRANJA 01 — SOBRE NOSOTROS (50/50 EDITORIAL) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 rounded-[28px] overflow-hidden border border-white/10 shadow-2xl aspect-4/3">
            <Image 
              src="/fotochica.jpg" 
              alt="NuDesign Creative Process" 
              width={700} 
              height={525} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 text-left space-y-5">
            <span className="text-xs font-semibold text-red-500 tracking-widest uppercase">{t.sec1Tag}</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-snug">
              {t.sec1Title1} <br />
              <span className="font-semibold">{t.sec1Title2}</span>
            </h2>
            
            <div className={`space-y-4 text-xs md:text-sm font-light leading-relaxed ${
              theme === 'dark' ? 'text-[#CCCCCC]' : 'text-zinc-800'
            }`}>
              <p>{t.sec1Text1}</p>
              <p>{t.sec1Text2}</p>
              <p>{t.sec1Text3}</p>
            </div>

            <p className="text-xs md:text-sm font-semibold text-red-500 pt-2">{t.sec1Tagline}</p>
          </div>

        </div>
      </section>

      {/* FRANJA 02 — COTIZACIÓN (PREMIUM CTA PANEL) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 z-10">
        <div className={`p-8 md:p-14 rounded-4xl border relative overflow-hidden backdrop-blur-[20px] ${
          theme === 'dark' 
            ? 'bg-linear-to-r from-red-950/20 via-zinc-950/80 to-zinc-900/60 border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.4)]' 
            : 'bg-white border-black/10 shadow-2xl'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 text-left space-y-4">
              <span className="text-xs font-semibold text-red-500 tracking-widest uppercase">{t.sec2Tag}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                {t.sec2Title1} <br />
                <span className="font-semibold text-red-500">{t.sec2Title2}</span> <br />
                {t.sec2Title3}
              </h2>
              <p className="text-xs md:text-sm font-light opacity-80 max-w-lg">{t.sec2Desc}</p>

              <div className="pt-4">
                <Link 
                  href="/cotizacion" 
                  className="inline-flex items-center space-x-3 bg-red-600/90 text-white px-8 py-4 rounded-full text-xs md:text-sm font-semibold shadow-[0_10px_30px_rgba(239,68,68,0.35)] hover:bg-red-600 hover:shadow-[0_15px_40px_rgba(239,68,68,0.5)] transition-all hover:-translate-y-0.5 active:scale-98"
                >
                  <span>{t.sec2Btn}</span>
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 md:w-60 aspect-square rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-center p-6 backdrop-blur-md">
                <svg className="w-24 h-24 text-red-500/80 stroke-current fill-none" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FRANJA 03 — CONTACTO (EDITORIAL + INFORMATION GLASS CARD) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 text-left space-y-4">
            <span className="text-xs font-semibold text-red-500 tracking-widest uppercase">{t.sec3Tag}</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">{t.sec3Title}</h2>
            <p className="text-xs md:text-sm font-light leading-relaxed opacity-80">{t.sec3Desc}</p>
            <p className="text-xs md:text-sm font-light leading-relaxed opacity-80">{t.sec3SubDesc}</p>
            <p className="text-xs md:text-sm font-semibold text-red-500 pt-2">{t.sec3Action}</p>
          </div>

          <div className="lg:col-span-6">
            <div className={`p-8 md:p-10 rounded-[28px] border grid grid-cols-1 sm:grid-cols-2 gap-6 text-left backdrop-blur-[20px] ${
              theme === 'dark' 
                ? 'bg-white/3.5 border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                : 'bg-white border-black/10 shadow-xl'
            }`}>
              
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-lg">💬</div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold opacity-60 tracking-wider">{t.contactWA}</span>
                  <span className="text-xs font-medium">{t.contactWAPhone}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-lg">✉️</div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold opacity-60 tracking-wider">{t.contactMail}</span>
                  <span className="text-xs font-medium">{t.contactMailAddr}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-lg">📍</div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold opacity-60 tracking-wider">{t.contactLoc}</span>
                  <span className="text-xs font-medium">{t.contactLocVal}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-lg">🕒</div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold opacity-60 tracking-wider">{t.contactHours}</span>
                  <span className="text-[11px] block">{t.hoursWeek}</span>
                  <span className="text-[11px] block">{t.hoursSat}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING CHAT PERMANENTE (LIQUID GLASS PILL) */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a 
          href="https://wa.me/18294608316" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`px-5 py-3 rounded-full flex items-center space-x-3 border shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group ${
            theme === 'dark'
              ? 'bg-zinc-950/80 backdrop-blur-[20px] border-white/15 text-white hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]'
              : 'bg-white/90 backdrop-blur-[20px] border-black/15 text-zinc-900 hover:border-red-500/50'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">{t.chat}</span>
        </a>
      </motion.div>

    </div>
  );
}