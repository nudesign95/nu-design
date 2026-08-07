'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export interface FormatItem {
  id: string;
  title: string;
  category: string;
  widthInches: number;
  heightInches: number;
  bleed: number;
  safeMargin: number;
  recommendedMaterial: string;
  regionFormat: string;
  keywords: string[];
}

// LIBRERÍA EXTENSIBLE DE FORMATOS (Base para los 200+ tamaños)
export const FORMAT_DATABASE: FormatItem[] = [
  // --- TARJETERÍA Y PVC ---
  {
    id: 'tarjeta-presentacion-std',
    title: 'Tarjeta de Presentación Estándar',
    category: 'Tarjetería & Corporativo',
    widthInches: 3.5,
    heightInches: 2.0,
    bleed: 0.125,
    safeMargin: 0.125,
    recommendedMaterial: 'Cartonité 14pt / 16pt (Mate o Brillo UV)',
    regionFormat: 'US / RD Standard',
    keywords: ['tarjeta', 'presentacion', 'billetera', 'ejecutiva', 'card', 'contacto']
  },
  {
    id: 'carnet-pvc-std',
    title: 'Carnet PVC / Fotocheck (CR80)',
    category: 'Identificación & PVC',
    widthInches: 3.375,
    heightInches: 2.125,
    bleed: 0.0625,
    safeMargin: 0.125,
    recommendedMaterial: 'Plástico PVC 30mil (Calibre Estándar)',
    regionFormat: 'Estándar ISO CR80 (Tarjeta de Crédito)',
    keywords: ['carnet', 'pvc', 'fotocheck', 'identificacion', 'gafete', 'membresia', 'cr80']
  },

  // --- TAGS Y ETIQUETAS ---
  {
    id: 'tag-ropa-colgante',
    title: 'Tag / Etiqueta Colgante para Ropa',
    category: 'Etiquetas & Tags',
    widthInches: 2.0,
    heightInches: 3.5,
    bleed: 0.125,
    safeMargin: 0.125,
    recommendedMaterial: 'Cartonité 14pt con Troquel / Perforación de 1/8"',
    regionFormat: 'Estándar Ropa / Retail',
    keywords: ['tag', 'etiqueta', 'ropa', 'colgante', 'tienda', 'marca', 'precio']
  },
  {
    id: 'sticker-cuaderno-std',
    title: 'Sticker para Cuaderno Escolar',
    category: 'Etiquetas & Tags',
    widthInches: 3.5,
    heightInches: 2.5,
    bleed: 0.125,
    safeMargin: 0.125,
    recommendedMaterial: 'Vinil Adhesivo Mate / LAMINADO Impermeable',
    regionFormat: 'Estándar Escolar US / RD',
    keywords: ['sticker', 'cuaderno', 'libreta', 'escolar', 'materia', 'pegatina', 'calcomania']
  },

  // --- MENÚS (RESTAURANTE / BAR) ---
  {
    id: 'menu-horizontal-tabloide',
    title: 'Menú Horizontal Tabloide (11" x 17")',
    category: 'Menús & Gastronomía',
    widthInches: 17.0,
    heightInches: 11.0,
    bleed: 0.125,
    safeMargin: 0.25,
    recommendedMaterial: 'Sintético PVC Lavable / Impresión Encapsulada Rigidizada',
    regionFormat: 'Tabloide Horizontal (11x17")',
    keywords: ['menu', 'horizontal', 'tabloide', 'restaurante', 'comida', 'carta']
  },
  {
    id: 'menu-vertical-carta',
    title: 'Menú Vertical Carta (8.5" x 11")',
    category: 'Menús & Gastronomía',
    widthInches: 8.5,
    heightInches: 11.0,
    bleed: 0.125,
    safeMargin: 0.25,
    recommendedMaterial: 'Cartón Rígido Tapas Duras o Vinil Lavable',
    regionFormat: 'Carta Vertical (8.5x11")',
    keywords: ['menu', 'vertical', 'carta', 'restaurante', 'platos', 'bebidas']
  },
  {
    id: 'menu-bar-portavaso',
    title: 'Menú de Bar / Coctelería (Tira Delgada)',
    category: 'Menús & Gastronomía',
    widthInches: 4.25,
    heightInches: 11.0,
    bleed: 0.125,
    safeMargin: 0.2,
    recommendedMaterial: 'Sintético Acuaflex 100% Resistente a Humedad',
    regionFormat: '1/2 Carta Vertical / Menú Bar',
    keywords: ['menu', 'bar', 'tragos', 'coctel', 'cocteleria', 'bebidas', 'tira']
  },
  {
    id: 'menu-bar-triangular',
    title: 'Menú de Mesa / Hablador Triangular',
    category: 'Menús & Gastronomía',
    widthInches: 4.0,
    heightInches: 6.0,
    bleed: 0.125,
    safeMargin: 0.2,
    recommendedMaterial: 'Cartonité 16pt con Armado Cónico / Pliegue',
    regionFormat: 'Hablador de Mesa',
    keywords: ['menu', 'hablador', 'mesa', 'triangular', 'bar', 'promo']
  }
];

export default function AsesorVisorTamano() {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<FormatItem>(FORMAT_DATABASE[0]);
  const [unit, setUnit] = useState<'in' | 'cm' | 'mm'>('in');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Buscador filtrado
  const filteredFormats = FORMAT_DATABASE.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  });

  // Convertidor de Unidades
  const formatVal = (valInches: number) => {
    if (unit === 'cm') return (valInches * 2.54).toFixed(2) + ' cm';
    if (unit === 'mm') return (valInches * 25.4).toFixed(1) + ' mm';
    return valInches.toFixed(2) + '"';
  };

  // Renderizado del Plano Técnico 2D
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo Minimalista Obscuro
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibuja la cuadrícula técnica de fondo
    ctx.fillStyle = '#18181b';
    for (let x = 0; x < canvas.width; x += 20) {
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Cálculo dinámico de escala para ajustar al canvas (Proporcional)
    const padding = 80;
    const availW = canvas.width - padding * 2;
    const availH = canvas.height - padding * 2;

    const scaleW = availW / (selectedItem.widthInches + selectedItem.bleed * 2);
    const scaleH = availH / (selectedItem.heightInches + selectedItem.bleed * 2);
    const scale = Math.min(scaleW, scaleH);

    // Dimensiones en Píxeles
    const wPx = selectedItem.widthInches * scale;
    const hPx = selectedItem.heightInches * scale;
    const bleedPx = selectedItem.bleed * scale;
    const safePx = selectedItem.safeMargin * scale;

    const x = (canvas.width - wPx) / 2;
    const y = (canvas.height - hPx) / 2;

    // 1. Área de Sangrado / Demasía (Línea Roja)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(x - bleedPx, y - bleedPx, wPx + bleedPx * 2, hPx + bleedPx * 2);
    ctx.fillRect(x - bleedPx, y - bleedPx, wPx + bleedPx * 2, hPx + bleedPx * 2);

    // 2. Borde Real de Corte / Producto (Línea Azul)
    ctx.setLineDash([]);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(x, y, wPx, hPx);

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, wPx, hPx);

    // 3. Zona Segura para Texto e Logos (Línea Verde)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(x + safePx, y + safePx, wPx - safePx * 2, hPx - safePx * 2);

    // Cota / Indicador de medida central
    ctx.setLineDash([]);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${selectedItem.widthInches}" x ${selectedItem.heightInches}"`, canvas.width / 2, canvas.height / 2 + 5);

  }, [selectedItem]);

  return (
    <div className="w-full space-y-8">
      
      {/* BUSCADOR ESTILO APPLE */}
      <div className="w-full relative">
        <div className="relative z-10 bg-zinc-900/90 border border-white/15 p-2 rounded-2xl backdrop-blur-2xl shadow-2xl flex items-center gap-3">
          <div className="pl-4 text-zinc-400">🔍</div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar formato: Ej. 'carnet pvc', 'menu vertical', 'tag', 'sticker cuaderno'..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 px-2 py-3.5 focus:outline-none font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="pr-4 text-xs text-zinc-500 hover:text-white">
              Limpiar
            </button>
          )}
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-purple-600/10 rounded-2xl blur-xl -z-10 opacity-70" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LISTA LATERAL DE FORMATOS (200+ Ítems) */}
        <div className="lg:col-span-4 bg-zinc-900/70 border border-white/10 rounded-3xl p-4 max-h-137.5 overflow-y-auto space-y-2 backdrop-blur-2xl">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block px-3 py-1">
            Formatos Disponibles ({filteredFormats.length})
          </span>

          {filteredFormats.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer block ${
                selectedItem.id === item.id
                  ? 'bg-red-600/20 border-red-500/80 text-white shadow-lg'
                  : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold">{item.title}</span>
                <span className="text-[9px] font-semibold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {item.widthInches}" x {item.heightInches}"
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 block">{item.category}</span>
            </button>
          ))}

          {filteredFormats.length === 0 && (
            <div className="p-8 text-center text-xs text-zinc-500">
              No se encontraron formatos con ese término.
            </div>
          )}
        </div>

        {/* PLANO TÉCNICO INTERACTIVO */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-4 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
            
            {/* Header del Plano */}
            <div className="w-full flex justify-between items-center mb-3 px-2">
              <div>
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">{selectedItem.title}</h2>
                <span className="text-[10px] text-zinc-400">{selectedItem.regionFormat}</span>
              </div>

              {/* Selector de Unidades */}
              <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/10 text-[10px] font-bold">
                {(['in', 'cm', 'mm'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-3 py-1 rounded-lg uppercase transition-all ${
                      unit === u ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Plano Técnico */}
            <canvas
              ref={canvasRef}
              width={640}
              height={400}
              className="w-full h-auto max-w-full rounded-2xl border border-white/10 shadow-inner"
            />

            {/* Leyenda Técnica */}
            <div className="w-full mt-4 flex justify-around text-[10px] text-zinc-400 bg-zinc-900/80 p-3 rounded-2xl border border-white/10">
              <span className="flex items-center gap-1.5 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Sangrado: {formatVal(selectedItem.bleed)}</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Borde Real: {formatVal(selectedItem.widthInches)} x {formatVal(selectedItem.heightInches)}</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Margen Seguro: {formatVal(selectedItem.safeMargin)}</span>
            </div>
          </div>

          {/* Tarjeta de Especificación Rápida */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-500 block mb-1">Material Sugerido</span>
              <p className="text-xs text-zinc-200 font-medium">{selectedItem.recommendedMaterial}</p>
            </div>
            <Link
              href={`/cotizacion?producto=${encodeURIComponent(selectedItem.title)}&tamano=${selectedItem.widthInches}x${selectedItem.heightInches}`}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl transition-all shrink-0"
            >
              ✨ Cotizar este Formato
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}