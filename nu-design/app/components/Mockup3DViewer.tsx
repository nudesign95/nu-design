'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface FormatPreset {
  title: string;
  widthInches: number;
  heightInches: number;
  bleed: number;
  safeMargin: number;
  bgType: 'notebook' | 'card' | 'bottle' | 'desk';
  bgLabel: string;
  recommendedMaterial: string;
  regionFormat: string;
}

const PRESETS: Record<string, FormatPreset> = {
  sticker_cuaderno: {
    title: 'Sticker para Cuaderno Escolar',
    widthInches: 3.5,
    heightInches: 2.5,
    bleed: 0.125,
    safeMargin: 0.125,
    bgType: 'notebook',
    bgLabel: 'Cuaderno Estándar (8.5" x 11")',
    recommendedMaterial: 'Vinil Adhesivo Mate / Resistente al agua',
    regionFormat: 'US Letter (Dominicana / US)'
  },
  tarjeta_presentacion: {
    title: 'Tarjeta de Presentación Estándar',
    widthInches: 3.5,
    heightInches: 2.0,
    bleed: 0.125,
    safeMargin: 0.125,
    bgType: 'card',
    bgLabel: 'Tarjeta de Crédito / Billetera',
    recommendedMaterial: 'Cartonité 14pt / Brillo UV o Mate',
    regionFormat: 'US Standard (3.5" x 2.0")'
  },
  etiqueta_botella: {
    title: 'Etiqueta Panorámica para Botella',
    widthInches: 7.5,
    heightInches: 2.2,
    bleed: 0.125,
    safeMargin: 0.125,
    bgType: 'bottle',
    bgLabel: 'Botella / Envase 500ml',
    recommendedMaterial: 'Vinil Transparente O LAMINADO',
    regionFormat: 'Estándar Bebidas'
  },
  volante_promo: {
    title: 'Volante Promocional (Flyer 1/2 Carta)',
    widthInches: 5.5,
    heightInches: 8.5,
    bleed: 0.125,
    safeMargin: 0.25,
    bgType: 'desk',
    bgLabel: 'Superficie de Escritorio',
    recommendedMaterial: 'Papeletico / Glossy 100lb',
    regionFormat: '1/2 Carta (8.5" x 5.5")'
  }
};

export default function AsesorVisorTamano() {
  const [query, setQuery] = useState('');
  const [activeFormat, setActiveFormat] = useState<FormatPreset>(PRESETS.sticker_cuaderno);
  const [showBleedGuides, setShowBleedGuides] = useState(true);
  const [finishEffect, setFinishEffect] = useState<'mate' | 'brillo' | 'transparente'>('mate');

  // Posición del elemento arrastrable
  const [pos, setPos] = useState({ x: 200, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Procesamiento rápido de búsqueda por palabras clave
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase();

    if (q.includes('tarjeta') || q.includes('presentation') || q.includes('business')) {
      setActiveFormat(PRESETS.tarjeta_presentacion);
    } else if (q.includes('botella') || q.includes('pote') || q.includes('jugo')) {
      setActiveFormat(PRESETS.etiqueta_botella);
    } else if (q.includes('volante') || q.includes('flyer') || q.includes('promo')) {
      setActiveFormat(PRESETS.volante_promo);
    } else {
      setActiveFormat(PRESETS.sticker_cuaderno);
    }
  };

  // Dibujo en Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Escala del Canvas: 1 Pulgada = 40 Píxeles
    const PPI = 40;

    // 1. Dibujar Fondo de Referencia
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (activeFormat.bgType === 'notebook') {
      // Dibuja Cuaderno (8.5 x 11 pulgadas)
      const nbW = 8.5 * PPI;
      const nbH = 10.5 * PPI;
      const nbX = (canvas.width - nbW) / 2;
      const nbY = (canvas.height - nbH) / 2;

      ctx.fillStyle = '#27272a';
      ctx.roundRect(nbX, nbY, nbW, nbH, 16);
      ctx.fill();
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Espiral del cuaderno
      ctx.fillStyle = '#71717a';
      for (let i = nbY + 20; i < nbY + nbH - 20; i += 20) {
        ctx.beginPath();
        ctx.arc(nbX + 15, i, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '10px sans-serif';
      ctx.fillText('REFERENCIA: Cuaderno Escolar Carta (8.5" x 11")', nbX + 30, nbY + 30);

    } else if (activeFormat.bgType === 'card') {
      // Dibuja Billetera / Mano
      const cardW = 3.37 * PPI;
      const cardH = 2.125 * PPI;
      const cardX = (canvas.width - cardW) / 2;
      const cardY = (canvas.height - cardH) / 2;

      ctx.fillStyle = '#27272a';
      ctx.roundRect(cardX - 40, cardY - 40, cardW + 80, cardH + 80, 24);
      ctx.fill();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '10px sans-serif';
      ctx.fillText('REFERENCIA: Espacio Billetera / Tarjeta de Crédito', cardX - 20, cardY - 20);

    } else {
      // Superficie General
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '10px sans-serif';
      ctx.fillText(`REFERENCIA: ${activeFormat.bgLabel}`, 50, 60);
    }

    // 2. Dibujar Elemento del Cliente (Móvil)
    const itemW = activeFormat.widthInches * PPI;
    const itemH = activeFormat.heightInches * PPI;
    const bleedPx = activeFormat.bleed * PPI;
    const safePx = activeFormat.safeMargin * PPI;

    // A) Área de Sangrado (Línea Roja Exterior)
    if (showBleedGuides) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(pos.x - bleedPx, pos.y - bleedPx, itemW + bleedPx * 2, itemH + bleedPx * 2);
      ctx.fillRect(pos.x - bleedPx, pos.y - bleedPx, itemW + bleedPx * 2, itemH + bleedPx * 2);
    }

    // B) Tamaño Real de Corte / Producto (Línea Blanca / Azul)
    ctx.setLineDash([]);
    ctx.fillStyle = finishEffect === 'transparente' ? 'rgba(255, 255, 255, 0.4)' : '#ffffff';
    ctx.roundRect(pos.x, pos.y, itemW, itemH, 8);
    ctx.fill();

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(pos.x, pos.y, itemW, itemH);

    // C) Efecto de Acabado (Brillo / Satinado)
    if (finishEffect === 'brillo') {
      const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x + itemW, pos.y + itemH);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      ctx.fillStyle = grad;
      ctx.fillRect(pos.x, pos.y, itemW, itemH);
    }

    // D) Margen de Seguridad Interior (Línea Verde)
    if (showBleedGuides) {
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.strokeRect(pos.x + safePx, pos.y + safePx, itemW - safePx * 2, itemH - safePx * 2);
    }

    // Texto de dimensiones sobre el elemento
    ctx.setLineDash([]);
    ctx.fillStyle = '#09090b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${activeFormat.widthInches}" x ${activeFormat.heightInches}"`, pos.x + itemW / 2, pos.y + itemH / 2);

  }, [activeFormat, pos, showBleedGuides, finishEffect]);

  // Gestión de Arrastre (Drag)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ x: clickX - pos.x, y: clickY - pos.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    setPos({
      x: e.clientX - rect.left - dragStart.x,
      y: e.clientY - rect.top - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full space-y-6">
      
      {/* 1. Buscador Inteligente por Lenguaje Natural */}
      <form onSubmit={handleSearch} className="w-full bg-zinc-900/80 border border-white/10 p-4 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row gap-3 items-center">
        <div className="flex-1 w-full relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué quieres imprimir? Ej: 'Necesito stickers para cuadernos escolares'"
            className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-zinc-100 focus:outline-none focus:border-red-500"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          🔍 Calcular Tamaño
        </button>
      </form>

      {/* Chips de Presets Rápidos */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-zinc-500 text-[10px] uppercase font-semibold flex items-center mr-2">Sugerencias:</span>
        <button onClick={() => setActiveFormat(PRESETS.sticker_cuaderno)} className="px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:border-red-500">
          🏷️ Sticker Cuaderno
        </button>
        <button onClick={() => setActiveFormat(PRESETS.tarjeta_presentacion)} className="px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:border-red-500">
          💳 Tarjeta de Presentación
        </button>
        <button onClick={() => setActiveFormat(PRESETS.etiqueta_botella)} className="px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:border-red-500">
          🍾 Etiqueta Botella
        </button>
        <button onClick={() => setActiveFormat(PRESETS.volante_promo)} className="px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:border-red-500">
          📄 Flyer Promocional
        </button>
      </div>

      {/* 2. ÁREA PRINCIPAL: Visualizador Interactivo + Panel de Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Canvas de Escala Real Interactivo */}
        <div className="lg:col-span-8 bg-zinc-950 border border-white/10 rounded-3xl p-4 relative overflow-hidden flex flex-col items-center justify-center">
          
          <div className="w-full flex justify-between items-center mb-3 px-2">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 bg-black/60 px-3 py-1 rounded-full border border-white/10">
              💡 Arrastra el elemento blanco para probar su ubicación en el objeto real
            </span>
            <button
              onClick={() => setShowBleedGuides(!showBleedGuides)}
              className={`text-[10px] font-semibold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                showBleedGuides ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-zinc-900 border-white/10 text-zinc-400'
              }`}
            >
              {showBleedGuides ? '👁️ Ocultar Guías de Sangrado' : '👁️ Mostrar Sangrado y Márgenes'}
            </button>
          </div>

          <canvas
            ref={canvasRef}
            width={640}
            height={440}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-auto max-w-full rounded-2xl border border-white/5 cursor-grab active:cursor-grabbing"
          />

          {/* Leyenda Técnica Flotante */}
          {showBleedGuides && (
            <div className="w-full mt-3 flex justify-around text-[10px] text-zinc-400 bg-black/40 p-2.5 rounded-xl border border-white/10">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Sangrado Corte (+0.125")</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Tamaño Final Producto</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Zona Segura Texto</span>
            </div>
          )}
        </div>

        {/* Panel Lateral de Métricas y Especificaciones Rápidas */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 block mb-1">Recomendación Directa</span>
            <h3 className="text-lg font-extrabold text-white">{activeFormat.title}</h3>
            <p className="text-xs text-zinc-400 mt-1">Estándar regional: <span className="text-zinc-200 font-semibold">{activeFormat.regionFormat}</span></p>
          </div>

          {/* Tarjetas de Métricas Visuales */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950 p-3 rounded-2xl border border-white/10">
              <span className="text-[9px] uppercase font-bold text-zinc-500 block">Tamaño Final</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{activeFormat.widthInches}" x {activeFormat.heightInches}"</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded-2xl border border-white/10">
              <span className="text-[9px] uppercase font-bold text-zinc-500 block">Con Sangrado</span>
              <p className="text-sm font-extrabold text-red-400 mt-0.5">
                {(activeFormat.widthInches + activeFormat.bleed * 2).toFixed(2)}" x {(activeFormat.heightInches + activeFormat.bleed * 2).toFixed(2)}"
              </p>
            </div>
          </div>

          {/* Selector de Textura / Acabado */}
          <div>
            <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Simular Acabado del Material</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFinishEffect('mate')}
                className={`py-2 rounded-xl text-[11px] font-semibold border ${finishEffect === 'mate' ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400'}`}
              >
                Mate
              </button>
              <button
                onClick={() => setFinishEffect('brillo')}
                className={`py-2 rounded-xl text-[11px] font-semibold border ${finishEffect === 'brillo' ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400'}`}
              >
                Brillo UV
              </button>
              <button
                onClick={() => setFinishEffect('transparente')}
                className={`py-2 rounded-xl text-[11px] font-semibold border ${finishEffect === 'transparente' ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400'}`}
              >
                Transparente
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">Sugerencia: <span className="text-zinc-300">{activeFormat.recommendedMaterial}</span></p>
          </div>

          {/* Acciones Directas */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href={`/cotizacion?producto=${encodeURIComponent(activeFormat.title)}&tamano=${activeFormat.widthInches}x${activeFormat.heightInches}`}
              className="w-full block text-center py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xl transition-all cursor-pointer"
            >
              ✨ Cotizar con este Tamaño Exacto
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}