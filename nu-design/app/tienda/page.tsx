'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, ArrowLeft, ShoppingBag, X, Check, ShieldAlert } from 'lucide-react';
import WordmarkLogo from '@/app/components/WordmarkLogo';
import CartDrawer, { CartItem } from '@/app/components/CartDrawer';

interface StoreItem {
  id: string;
  name: string;
  code: string;
  description: string;
  formats: string[];
  category_season: string;
  price: number;
  preview_url: string;
  file_url: string;
}

const translations = {
  ES: {
    backHome: 'Volver al Inicio',
    heroTitle: 'Tienda Oficial',
    heroSubhead: 'Diseños exclusivos listos para DTF, serigrafía, sublimación y stickers. Descarga inmediata en alta resolución.',
    searchPlaceholder: 'Buscar por nombre o código (ej: ND-HW)...',
    categoryLabel: 'Categoría:',
    formatLabel: 'Formato:',
    priceLabel: 'Precio',
    viewDetail: 'Ver Detalle',
    addToCart: 'Agregar al Carrito',
    addedToCart: '¡En el Carrito!',
    noResults: 'No se encontraron artículos',
    noResultsSub: 'Prueba cambiando la búsqueda o seleccionando otra categoría.',
    loading: 'Cargando catálogo exclusivo...',
    modalNoticeTitle: '📌 AVISO IMPORTANTE ANTES DE COMPRAR:',
    modalNoticeFormat: 'Revisa detenidamente los formatos incluidos. El arte se entrega en alta resolución pero deberás ajustar el tamaño exacto en tu programa de diseño antes de imprimir.',
    categories: {
      Todas: 'Todas',
      Halloween: 'Halloween',
      Navidad: 'Navidad',
      'San Valentín': 'San Valentín',
      Verano: 'Verano',
      General: 'General',
    }
  },
  EN: {
    backHome: 'Back to Home',
    heroTitle: 'Official Store',
    heroSubhead: 'Exclusive designs ready for DTF, screen printing, sublimation, and stickers. Instant high-resolution download.',
    searchPlaceholder: 'Search by name or code (e.g. ND-HW)...',
    categoryLabel: 'Category:',
    formatLabel: 'Format:',
    priceLabel: 'Price',
    viewDetail: 'View Details',
    addToCart: 'Add to Cart',
    addedToCart: 'In Cart!',
    noResults: 'No items found',
    noResultsSub: 'Try changing your search or selecting another category.',
    loading: 'Loading exclusive catalog...',
    modalNoticeTitle: '📌 IMPORTANT NOTICE BEFORE PURCHASING:',
    modalNoticeFormat: 'Please carefully verify the included formats. Artwork is delivered in high resolution, but you must scale it to your exact dimensions in your design software before printing.',
    categories: {
      Todas: 'All',
      Halloween: 'Halloween',
      Navidad: 'Christmas',
      'San Valentín': "Valentine's",
      Verano: 'Summer',
      General: 'General',
    }
  },
  FR: {
    backHome: 'Retour à l\'accueil',
    heroTitle: 'Boutique Officielle',
    heroSubhead: 'Designs exclusifs prêts pour DTF, sérigraphie, sublimation et stickers. Téléchargement immédiat haute résolution.',
    searchPlaceholder: 'Rechercher par nom ou code (ex: ND-HW)...',
    categoryLabel: 'Catégorie:',
    formatLabel: 'Format:',
    priceLabel: 'Prix',
    viewDetail: 'Voir les détails',
    addToCart: 'Ajouter au Panier',
    addedToCart: 'Dans le Panier!',
    noResults: 'Aucun article trouvé',
    noResultsSub: 'Essayez de modifier votre recherche ou de sélectionner une autre catégorie.',
    loading: 'Chargement du catalogue exclusif...',
    modalNoticeTitle: '📌 AVIS IMPORTANT AVANT D\'ACHETER:',
    modalNoticeFormat: 'Veuillez vérifier attentivement les formats inclus. L\'œuvre est livrée en haute résolution, mais vous devez ajuster sa taille exacte dans votre logiciel de création avant l\'impression.',
    categories: {
      Todas: 'Toutes',
      Halloween: 'Halloween',
      Navidad: 'Noël',
      'San Valentín': 'Saint-Valentin',
      Verano: 'Été',
      General: 'Général',
    }
  }
};

const CATEGORIES_KEYS = ['Todas', 'Halloween', 'Navidad', 'San Valentín', 'Verano', 'General'];
const FORMATS = ['Todos', 'PNG', 'JPG', 'SVG', 'AI', 'PDF'];

export default function TiendaPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Tema & Idioma
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nudesign_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    }
    return 'dark';
  });

  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Estados de BD
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Filtros
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedFormat, setSelectedFormat] = useState('Todos');

  // Modal de Detalle Protegido
  const [activeModalItem, setActiveModalItem] = useState<StoreItem | null>(null);

  // Carrito de Compras
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    localStorage.setItem('nudesign_theme', theme);
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

  useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('store_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleAddToCart = (item: StoreItem) => {
    if (!cart.some((c) => c.id === item.id)) {
      setCart((prev) => [...prev, item]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todas' || item.category_season === selectedCategory;

    const matchesFormat =
      selectedFormat === 'Todos' || item.formats.includes(selectedFormat);

    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans pb-20 relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Selector Flotante de Tema */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-2 md:space-y-3 z-40 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
        }`}
      >
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl" title="Modo Claro" />
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl" title="Modo Oscuro" />
      </motion.div>

      {/* Header / Navegación */}
      <header className="w-full px-6 md:px-20 py-6 flex items-center justify-between z-40 relative border-b border-zinc-500/10">
        <div className="flex items-center space-x-6">
          <WordmarkLogo className="h-6 md:h-8 w-auto" />

          <Link 
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-xs font-bold transition-all border shadow-lg ${
              theme === 'dark'
                ? 'bg-white/5 border-white/15 text-zinc-200 hover:bg-white/10 hover:border-red-500/50 hover:text-white'
                : 'bg-black/5 border-black/10 text-zinc-800 hover:bg-black/10 hover:border-red-500/50'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>{t.backHome}</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Botón Carrito con Contador Badged */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50 transition flex items-center gap-2 px-4"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-black">{cart.length}</span>
          </button>

          {/* Selector de IDIOMAS */}
          <div className="relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white hover:border-red-500/40'
                  : 'bg-black/5 border-black/10 text-zinc-900 hover:border-red-500/40'
              }`}
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold ml-1">({currentLang})</span>
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
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 ${currentLang === 'ES' ? 'text-red-500 font-bold' : ''}`}>Español</button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 ${currentLang === 'EN' ? 'text-red-500 font-bold' : ''}`}>English</button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 ${currentLang === 'FR' ? 'text-red-500 font-bold' : ''}`}>Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-14 px-4 md:px-8 text-center space-y-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            {t.heroTitle} <span className="text-red-500">Nu-Design</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-sm md:text-base leading-relaxed ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {t.heroSubhead}
          </p>
        </div>
      </section>

      {/* Contenedor Principal: Filtros y Catálogo */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Filtros y Buscador */}
        <div className={`p-6 rounded-2xl border backdrop-blur-2xl shadow-xl space-y-6 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-black/10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full rounded-xl pl-12 pr-4 py-3 text-sm border outline-none transition ${
                  theme === 'dark' 
                    ? 'bg-black/50 border-white/15 focus:border-red-500 text-white' 
                    : 'bg-white border-zinc-300 focus:border-red-500 text-zinc-900'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 md:col-span-2 scrollbar-none">
              <span className="text-xs font-semibold uppercase shrink-0 mr-2 opacity-60 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> {t.categoryLabel}
              </span>
              {CATEGORIES_KEYS.map((catKey) => {
                const label = t.categories[catKey as keyof typeof t.categories] || catKey;
                const active = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 border ${
                      active
                        ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/50'
                        : theme === 'dark'
                          ? 'bg-black/30 border-white/10 text-zinc-400 hover:text-white'
                          : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-zinc-500/20 pt-4 overflow-x-auto">
            <span className="text-xs font-semibold uppercase shrink-0 mr-2 opacity-60">{t.formatLabel}</span>
            {FORMATS.map((fmt) => {
              const active = selectedFormat === fmt;
              return (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition shrink-0 ${
                    active
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : theme === 'dark'
                        ? 'bg-black/20 border-white/10 text-zinc-500 hover:text-zinc-300'
                        : 'bg-zinc-200 border-zinc-300 text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Productos */}
        {loading ? (
          <div className="text-center py-20 opacity-60 font-medium">{t.loading}</div>
        ) : filteredItems.length === 0 ? (
          <div className={`border rounded-2xl p-12 text-center space-y-3 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/50 border-black/10'
          }`}>
            <p className="text-lg font-bold">{t.noResults}</p>
            <p className="text-sm opacity-60">{t.noResultsSub}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const inCart = cart.some((c) => c.id === item.id);

              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl p-4 flex flex-col justify-between space-y-4 group transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                      : 'bg-white/80 border-black/10 hover:bg-white shadow-xl'
                  }`}
                >
                  <div className="space-y-3">
                    <div 
                      onClick={() => setActiveModalItem(item)}
                      className={`relative aspect-square w-full rounded-xl overflow-hidden cursor-pointer border ${
                        theme === 'dark' ? 'bg-black/60 border-white/10' : 'bg-zinc-100 border-zinc-300'
                      }`}
                    >
                      <img
                        src={item.preview_url}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider text-red-500 border border-white/10">
                        {item.code}
                      </span>
                    </div>

                    <div>
                      <h3 
                        onClick={() => setActiveModalItem(item)}
                        className="font-extrabold text-base group-hover:text-red-500 transition cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs opacity-70 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.formats.map((f) => (
                        <span
                          key={f}
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                            theme === 'dark' ? 'bg-black/50 border-white/10 text-zinc-400' : 'bg-zinc-200 border-zinc-300 text-zinc-700'
                          }`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-zinc-500/20 pt-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[10px] uppercase font-semibold opacity-50">{t.priceLabel}</span>
                      <span className="text-base font-black text-emerald-500">RD$ {item.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="p-2.5 rounded-xl border border-zinc-500/20 hover:border-red-500 text-zinc-300 hover:text-white transition"
                        title={t.viewDetail}
                      >
                        <Eye className="w-4 h-4 text-red-500" />
                      </button>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                          inCart
                            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                        }`}
                      >
                        {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                        <span>{inCart ? t.addedToCart : t.addToCart}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* MODAL DE DETALLE PROTEGIDO CON MARCA DE AGUA Y BLOQUEO DE CLIC DERECHO */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative z-10 w-full max-w-3xl rounded-3xl p-6 md:p-8 border shadow-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-[#0a0507] border-white/15 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
              }`}
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/20 text-zinc-400 hover:text-red-500 transition z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Imagen Ampliada con Marca de Agua Superpuesta & Bloqueo de Clic Derecho */}
                <div
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10 select-none"
                >
                  <img
                    src={activeModalItem.preview_url}
                    alt={activeModalItem.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Superposición Marca de Agua NU-DESIGN diagonal */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-white/20 font-black text-3xl md:text-4xl transform -rotate-45 tracking-widest uppercase text-center select-none">
                      NU-DESIGN PREVIEW
                    </p>
                  </div>
                </div>

                {/* Detalles del Ítem y Aviso Importante */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-black text-red-500 uppercase tracking-widest">{activeModalItem.code}</span>
                    <h2 className="text-2xl font-black mt-1">{activeModalItem.name}</h2>
                    <p className="text-xs opacity-70 mt-2 leading-relaxed">{activeModalItem.description}</p>
                  </div>

                  {/* Formatos Incluidos */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase opacity-60">Formatos Incluidos:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalItem.formats.map((f) => (
                        <span key={f} className="text-xs font-black px-2.5 py-1 rounded bg-red-500/10 text-red-500 border border-red-500/30">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advertencia Importante de Formato y Escalado */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      {t.modalNoticeTitle}
                    </p>
                    <p className="opacity-90 leading-relaxed text-[11px]">
                      {t.modalNoticeFormat}
                    </p>
                  </div>

                  {/* Precio y Botón de Acción */}
                  <div className="border-t border-zinc-500/20 pt-4 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-semibold opacity-50">{t.priceLabel}</span>
                      <span className="text-2xl font-black text-emerald-500">RD$ {activeModalItem.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(activeModalItem);
                        setActiveModalItem(null);
                        setIsCartOpen(true);
                      }}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-950/50 flex items-center gap-2 text-xs transition"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Componente del Carrito Lateral Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        theme={theme}
        lang={currentLang}
      />

    </div>
  );
}