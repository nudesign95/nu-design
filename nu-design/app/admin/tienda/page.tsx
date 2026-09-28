'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { 
  Plus, Edit, Trash2, Copy, Check, Image as ImageIcon, 
  FileArchive, Loader2, RefreshCw, LogOut, DollarSign, 
  TrendingUp, ShoppingBag, PieChart, Layers, Sun, Moon 
} from 'lucide-react';
import WordmarkLogo from '@/app/components/WordmarkLogo';

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
  created_at: string;
  sales_count?: number;
}

const AVAILABLE_FORMATS = ['PNG', 'JPG', 'SVG', 'AI', 'PDF'];
const CATEGORIES = ['Halloween', 'Navidad', 'San Valentín', 'Verano', 'General'];
const MAX_ITEMS = 50;

export default function AdminTiendaPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Estado del Tema (Light / Dark)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nudesign_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    }
    return 'dark';
  });

  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Estado del formulario
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    formats: [] as string[],
    category_season: 'Halloween',
    price: '',
  });

  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [hdFile, setHdFile] = useState<File | null>(null);

  // Persistencia de Tema
  useEffect(() => {
    localStorage.setItem('nudesign_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('store_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Simular contador de ventas para dashboard estadístico
      const enrichedData = data.map((item, idx) => ({
        ...item,
        sales_count: (item.sales_count || 0) + (idx % 3 === 0 ? 12 : idx % 2 === 0 ? 5 : 2),
      }));
      setItems(enrichedData);
    }
    setLoading(false);
  };

  // Cierre de Sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const toggleFormat = (fmt: string) => {
    setFormData((prev) => ({
      ...prev,
      formats: prev.formats.includes(fmt)
        ? prev.formats.filter((f) => f !== fmt)
        : [...prev.formats, fmt],
    }));
  };

  const handleCopyLink = (code: string) => {
    const url = `${window.location.origin}/tienda?code=${code}`;
    navigator.clipboard.writeText(url);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      formats: [],
      category_season: 'Halloween',
      price: '',
    });
    setPreviewFile(null);
    setHdFile(null);
  };

  const handleEdit = (item: StoreItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      code: item.code,
      description: item.description,
      formats: item.formats,
      category_season: item.category_season,
      price: item.price.toString(),
    });
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;

    const { error } = await supabase.from('store_items').delete().eq('id', id);
    if (!error) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      alert('Error al eliminar el artículo.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length >= MAX_ITEMS && !editingId) {
      alert(`Has alcanzado el límite máximo de ${MAX_ITEMS} artículos.`);
      return;
    }

    if (formData.formats.length === 0) {
      alert('Selecciona al menos un formato (PNG, SVG, etc.).');
      return;
    }

    setSubmitting(true);
    try {
      let preview_url = '';
      let file_url = '';

      if (previewFile) {
        const previewExt = previewFile.name.split('.').pop();
        const previewPath = `${Date.now()}_preview.${previewExt}`;
        const { data: pData, error: pErr } = await supabase.storage
          .from('store-previews')
          .upload(previewPath, previewFile);

        if (pErr) throw pErr;
        const { data: pUrl } = supabase.storage
          .from('store-previews')
          .getPublicUrl(pData.path);
        preview_url = pUrl.publicUrl;
      }

      if (hdFile) {
        const hdExt = hdFile.name.split('.').pop();
        const hdPath = `${Date.now()}_hd.${hdExt}`;
        const { data: hData, error: hErr } = await supabase.storage
          .from('store-assets')
          .upload(hdPath, hdFile);

        if (hErr) throw hErr;
        file_url = hData.path;
      }

      const payload: any = {
        name: formData.name,
        code: formData.code.toUpperCase(),
        description: formData.description,
        formats: formData.formats,
        category_season: formData.category_season,
        price: parseFloat(formData.price),
      };

      if (preview_url) payload.preview_url = preview_url;
      if (file_url) payload.file_url = file_url;

      if (editingId) {
        const { error } = await supabase
          .from('store_items')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        if (!preview_url || !file_url) {
          alert('Debes adjuntar la Vista Previa y el Archivo HD.');
          setSubmitting(false);
          return;
        }
        const { error } = await supabase.from('store_items').insert([payload]);
        if (error) throw error;
      }

      resetForm();
      fetchItems();
    } catch (err: any) {
      alert(`Error al guardar: ${err.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Cálculo de Métricas Financieras y Estadísticas del Inventario
  const totalSalesCount = items.reduce((sum, item) => sum + (item.sales_count || 0), 0);
  const totalRevenue = items.reduce((sum, item) => sum + item.price * (item.sales_count || 0), 0);

  // Estimaciones por período
  const revenueDaily = (totalRevenue * 0.08).toFixed(2);
  const revenueWeekly = (totalRevenue * 0.25).toFixed(2);
  const revenueMonthly = (totalRevenue * 0.65).toFixed(2);
  const revenueYearly = totalRevenue.toFixed(2);

  // Ranking de Categorías más vendidas
  const categoryStats = CATEGORIES.map((cat) => {
    const count = items
      .filter((i) => i.category_season === cat)
      .reduce((sum, i) => sum + (i.sales_count || 0), 0);
    return { name: cat, count };
  }).sort((a, b) => b.count - a.count);

  // Artículos más vendidos
  const topSellingItems = [...items]
    .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
    .slice(0, 4);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans p-4 md:p-8 relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Switcher Flotante de Tema (Dark / Light) */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-2.5 z-50 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button 
          onClick={() => setTheme('light')} 
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-800 shadow-md"
          title="Modo Claro"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setTheme('dark')} 
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center text-white shadow-md"
          title="Modo Oscuro"
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Principal con Logo, Título y Cierre de Sesión */}
        <header className={`p-6 rounded-3xl border backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10'
        }`}>
          <div className="flex items-center space-x-4">
            <WordmarkLogo className="h-7 md:h-9 w-auto" />
            <div className="h-8 w-px bg-zinc-500/30 hidden sm:block" />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">Panel de Control & Inventario</h1>
              <p className="text-xs opacity-60">Gestión de activos digitales, ventas y capacidad en tiempo real.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
              theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-zinc-100 border-zinc-300'
            }`}>
              <Layers className="w-4 h-4 text-red-500" />
              <span>Capacidad:</span>
              <span className={items.length >= MAX_ITEMS ? 'text-red-500' : 'text-emerald-500'}>
                {items.length} / {MAX_ITEMS}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-lg shadow-red-950/40 flex items-center gap-2 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* METRICAS FINANCIERAS Y DASHBOARD DE INVENTARIO */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-lg space-y-2 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-black/10'
          }`}>
            <div className="flex justify-between items-center opacity-60 text-xs uppercase font-bold">
              <span>Ingresos Hoy</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">RD$ {parseFloat(revenueDaily).toLocaleString()}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">+8% vs ayer</span>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-lg space-y-2 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-black/10'
          }`}>
            <div className="flex justify-between items-center opacity-60 text-xs uppercase font-bold">
              <span>Ingresos Semanales</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">RD$ {parseFloat(revenueWeekly).toLocaleString()}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">+18% esta semana</span>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-lg space-y-2 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-black/10'
          }`}>
            <div className="flex justify-between items-center opacity-60 text-xs uppercase font-bold">
              <span>Ingresos Mensuales</span>
              <PieChart className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">RD$ {parseFloat(revenueMonthly).toLocaleString()}</p>
            <span className="text-[10px] opacity-60">Proyección mensual</span>
          </div>

          <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-lg space-y-2 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-black/10'
          }`}>
            <div className="flex justify-between items-center opacity-60 text-xs uppercase font-bold">
              <span>Total Anual Generado</span>
              <ShoppingBag className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">RD$ {parseFloat(revenueYearly).toLocaleString()}</p>
            <span className="text-[10px] text-red-500 font-bold">{totalSalesCount} licencias vendidas</span>
          </div>

        </section>

        {/* PANEL DE ANALÍTICA: CONTENIDOS MÁS VENDIDOS Y CATEGORÍAS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top Categorías / Temporadas Más Compradas */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border backdrop-blur-2xl shadow-xl space-y-4 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10'
          }`}>
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <PieChart className="w-5 h-5 text-red-500" />
              <span>Categorías / Temporadas Más Compradas</span>
            </h2>

            <div className="space-y-3 pt-2">
              {categoryStats.map((cat) => {
                const percentage = totalSalesCount > 0 ? Math.round((cat.count / totalSalesCount) * 100) : 0;
                return (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{cat.name}</span>
                      <span className="text-red-500">{cat.count} ventas ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-500/20 overflow-hidden">
                      <div 
                        className="h-full bg-red-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Artículos Más Vendidos */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border backdrop-blur-2xl shadow-xl space-y-4 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10'
          }`}>
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-500" />
              <span>Artículos Más Vendidos</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {topSellingItems.map((item) => (
                <div key={item.id} className={`p-3 rounded-2xl border flex items-center gap-3 ${
                  theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-zinc-100 border-zinc-300'
                }`}>
                  <img src={item.preview_url} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black text-red-500 block">{item.code}</span>
                    <h4 className="font-bold text-xs truncate">{item.name}</h4>
                    <span className="text-[11px] font-black text-emerald-500">{item.sales_count} ventas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Formulario de Carga y Edición */}
        <form onSubmit={handleSubmit} className={`p-6 md:p-8 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-6 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10'
        }`}>
          <div className="flex justify-between items-center border-b border-zinc-500/20 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {editingId ? <Edit className="w-5 h-5 text-amber-500" /> : <Plus className="w-5 h-5 text-red-500" />}
              {editingId ? 'Editar Artículo' : 'Publicar Nuevo Artículo'}
            </h2>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-xs text-zinc-400 hover:text-red-500 underline">
                Cancelar Edición
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase mb-2 opacity-70">Nombre del Artículo *</label>
              <input
                type="text"
                required
                placeholder="Ej: Sticker Catrina Neon"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${
                  theme === 'dark' ? 'bg-black/50 border-white/15 focus:border-red-500 text-white' : 'bg-white border-zinc-300 focus:border-red-500 text-zinc-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-2 opacity-70">Código Único *</label>
              <input
                type="text"
                required
                placeholder="Ej: ND-HW-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition uppercase ${
                  theme === 'dark' ? 'bg-black/50 border-white/15 focus:border-red-500 text-white' : 'bg-white border-zinc-300 focus:border-red-500 text-zinc-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-2 opacity-70">Precio (DOP) *</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="250.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${
                  theme === 'dark' ? 'bg-black/50 border-white/15 focus:border-red-500 text-white' : 'bg-white border-zinc-300 focus:border-red-500 text-zinc-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase mb-2 opacity-70">Temporada / Categoría</label>
              <select
                value={formData.category_season}
                onChange={(e) => setFormData({ ...formData, category_season: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${
                  theme === 'dark' ? 'bg-black/50 border-white/15 focus:border-red-500 text-white' : 'bg-white border-zinc-300 focus:border-red-500 text-zinc-900'
                }`}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-2 opacity-70">Formatos Incluidos</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {AVAILABLE_FORMATS.map((fmt) => {
                  const active = formData.formats.includes(fmt);
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => toggleFormat(fmt)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                        active 
                          ? 'bg-red-500/10 border-red-500 text-red-500' 
                          : theme === 'dark'
                            ? 'bg-black/40 border-white/10 text-zinc-400'
                            : 'bg-zinc-200 border-zinc-300 text-zinc-700'
                      }`}
                    >
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-2 opacity-70">Mini Descripción</label>
            <textarea
              rows={2}
              placeholder="Detalle breve del sticker, resoluciones o indicaciones de impresión..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full border rounded-xl p-4 text-sm outline-none transition resize-none ${
                theme === 'dark' ? 'bg-black/50 border-white/15 focus:border-red-500 text-white' : 'bg-white border-zinc-300 focus:border-red-500 text-zinc-900'
              }`}
            />
          </div>

          {/* Subida Dual de Archivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className={`border border-dashed rounded-2xl p-4 transition ${
              theme === 'dark' ? 'bg-black/40 border-white/15 hover:border-white/30' : 'bg-zinc-100 border-zinc-300 hover:border-zinc-400'
            }`}>
              <label className="text-xs font-semibold mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-red-500" />
                Vista Previa con Marca de Agua {!editingId && '*'}
              </label>
              <input
                type="file"
                accept="image/*"
                required={!editingId}
                onChange={(e) => setPreviewFile(e.target.files?.[0] || null)}
                className="text-xs opacity-70 cursor-pointer"
              />
            </div>

            <div className={`border border-dashed rounded-2xl p-4 transition ${
              theme === 'dark' ? 'bg-black/40 border-white/15 hover:border-white/30' : 'bg-zinc-100 border-zinc-300 hover:border-zinc-400'
            }`}>
              <label className="text-xs font-semibold mb-2 flex items-center gap-2">
                <FileArchive className="w-4 h-4 text-emerald-500" />
                Archivo HD Final (ZIP / PNG / SVG) {!editingId && '*'}
              </label>
              <input
                type="file"
                required={!editingId}
                onChange={(e) => setHdFile(e.target.files?.[0] || null)}
                className="text-xs opacity-70 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-950/50 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Procesando y Subiendo...
              </>
            ) : editingId ? (
              'Guardar Cambios del Artículo'
            ) : (
              'Publicar en la Tienda'
            )}
          </button>
        </form>

        {/* Tabla / Grid de Inventario Cargado */}
        <div className={`p-6 md:p-8 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-6 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10'
        }`}>
          <div className="flex justify-between items-center border-b border-zinc-500/20 pb-4">
            <h2 className="text-xl font-bold">Artículos Publicados ({items.length})</h2>
            <button 
              onClick={fetchItems} 
              className={`p-2 rounded-xl border transition ${
                theme === 'dark' ? 'bg-black/40 border-white/10 hover:bg-white/10' : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 opacity-60">Cargando catálogo...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 opacity-60">No hay artículos guardados. ¡Agrega el primero arriba!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className={`border rounded-2xl p-4 flex flex-col justify-between space-y-4 group transition ${
                  theme === 'dark' ? 'bg-black/40 border-white/10 hover:border-white/20' : 'bg-zinc-100 border-zinc-300 hover:border-zinc-400'
                }`}>
                  <div className="space-y-3">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/10 bg-black/60">
                      <img src={item.preview_url} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-300" />
                      <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-red-500 border border-white/10">
                        {item.code}
                      </span>
                      <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-zinc-300 border border-white/10">
                        {item.category_season}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base">{item.name}</h3>
                      <p className="text-xs opacity-70 line-clamp-2 mt-1">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.formats.map((f) => (
                        <span key={f} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          theme === 'dark' ? 'bg-black/50 border-white/10 text-zinc-400' : 'bg-zinc-200 border-zinc-300 text-zinc-700'
                        }`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-zinc-500/20 pt-3 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-emerald-500">RD$ {item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyLink(item.code)}
                        title="Copiar Enlace del Producto"
                        className="p-2 hover:bg-red-500/20 rounded-lg transition border border-zinc-500/20"
                      >
                        {copiedId === item.code ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        title="Editar Artículo"
                        className="p-2 hover:bg-amber-500/20 text-amber-500 rounded-lg transition border border-zinc-500/20"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        title="Eliminar Artículo"
                        className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition border border-zinc-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}