'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface FormatPreset {
  title: string;
  category: string;
  widthInches: number;
  heightInches: number;
  bleed: number;
  safeMargin: number;
  bgType: 'notebook' | 'card' | 'bottle' | 'desk' | 'box';
  bgLabel: string;
  recommendedMaterial: string;
  regionFormat: string;
  aiExplanation: string;
}

const PRESETS: Record<string, FormatPreset> = {
  sticker_cuaderno: {
    title: 'Sticker para Cuaderno / Libreta',
    category: 'Escolar / Etiquetas',
    widthInches: 3.5,
    heightInches: 2.5,
    bleed: 0.125,
    safeMargin: 0.125,
    bgType: 'notebook',
    bgLabel: 'Cuaderno Escolar Carta (8.5" x 11")',
    recommendedMaterial: 'Vinil Adhesivo Mate LAMINADO (Soporta agua y fricción de mochila)',
    regionFormat: 'Estándar US / RD',
    aiExplanation: 'Para cuadernos escolares, un sticker de 3.5" x 2.5" es ideal porque no tapa la portada ni el diseño principal de la libreta, pero ofrece suficiente espacio para nombre, curso y asignatura.'
  },
  tarjeta_presentacion: {
    title: 'Tarjeta de Presentación Ejecutiva',
    category: 'Papelería Corporativa',
    widthInches: 3.5,
    heightInches: 2.0,
    bleed: 0.125,
    safeMargin: 0.125,
    bgType: 'card',
    bgLabel: 'Ranura Estándar Billetera / Tarjetero',
    recommendedMaterial: 'Cartonité 14pt / 16pt con Acabado Soft-Touch o UV Reserva',
    regionFormat: 'US / RD Standard (3.5" x 2.0")',
    aiExplanation: 'El tamaño de 3.5" x 2.0" encaja perfectamente en cualquier billetera o tarjetero estándar mundial. Mantenemos 0.125" de sangrado para asegurar un corte sin bordes blancos.'
  },
  etiqueta_botella: {
    title: 'Etiqueta Panorámica para Envase',
    category: 'Packaging / Bebidas',
    widthInches: 7.5,
    heightInches: 2.2,
    bleed: 0.125,
    safeMargin: 0.125,
    bgType: 'bottle',
    bgLabel: 'Botella 500ml / Envase Cilíndrico',
    recommendedMaterial: 'Vinil Transparente con Tinta Blanca o BOPP Impermeable',
    regionFormat: 'Estándar Cilíndrico',
    aiExplanation: 'Una etiqueta de 7.5" x 2.2" envuelve casi el 80% del perímetro de una botella de 500ml, dejando una franja limpia para ver el contenido del líquido.'
  },
  volante_promo: {
    title: 'Flyer / Volante Promocional (1/2 Carta)',
    category: 'Publicidad Impresa',
    widthInches: 5.5,
    heightInches: 8.5,
    bleed: 0.125,
    safeMargin: 0.25,
    bgType: 'desk',
    bgLabel: 'Superficie de Escritorio / Mostrador',
    recommendedMaterial: 'Papeletico 100lb Gloss / Satinado',
    regionFormat: 'Medio Pliego / 1/2 Carta (5.5" x 8.5")',
    aiExplanation: 'El formato 1/2 Carta es la opción más eficiente y rentable en imprenta: permite aprovechar al máximo los pliegos madre de papel sin desperdicio de material.'
  }
};

export default function AsesorVisorTamano() {
  const [query, setQuery] = useState('');
  const [activeFormat, setActiveFormat] = useState<FormatPreset>(PRESETS.sticker_cuaderno);
  const [showBleedGuides, setShowBleedGuides] = useState(true);
  const [finishEffect, setFinishEffect] = useState<'mate' | 'brillo' | 'transparente'>('mate');
  const [isSearching, setIsSearching] = useState(false);

  // Posición del elemento interactivo en el canvas
  const [pos, setPos] = useState({ x: 210, y: 140 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Procesador inteligente de consultas
  const processQuery = (searchQuery: string) => {
    setIsSearching(true);
    const q = searchQuery.toLowerCase();

    setTimeout(() => {
      if (q.includes('tarjeta') || q.includes('presentacion') || q.includes('contacto') || q.includes('billetera')) {
        setActiveFormat(PRESETS.tarjeta_presentacion);
      } else if (q.includes('botella') || q.includes('jugo') || q.includes('pote') || q.includes('frasco') || q.includes('agua')) {
        setActiveFormat(PRESETS.etiqueta_botella);
      } else if (q.includes('volante') || q.includes('flyer') || q.includes('promo') || q.includes('menu') || q.includes('hoja')) {
        setActiveFormat(PRESETS.volante_promo);
      } else {
        // Por defecto o para preguntas sobre cuadernos, stickers, libros
        setActiveFormat({
          ...PRESETS.sticker_cuaderno,
          aiExplanation: `Basado en tu consulta "${searchQuery}", te recomendamos un formato compacto de 3.5" x 2.5". Ofrece una excelente visibilidad sin saturar la superficie.`
        });
      }
      setIsSearching(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    processQuery(query);
  };

  // Renderizado en Canvas 2D
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Escala del Canvas: 1 Pulgada = 42 Píxeles
    const PPI = 42;

    // 1. Fondo Visual de la Escena (Fondo Estilo Apple Dark)
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Malla de puntos sutil para la cuadrícula
    ctx.fillStyle = '#27272a';
    for (let x = 10; x < canvas.width; x += 20) {
      for (let y = 10; y < canvas.height; y += 20) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    // 2. DIBUJO DE LA SUPERFICIE DE REFERENCIA
    if (activeFormat.bgType === 'notebook') {
      const nbW = 8.5 * PPI;
      const nbH = 10.5 * PPI;
      const nbX = (canvas.width - nbW) / 2;
      const nbY = (canvas.height - nbH) / 2;

      // Cuaderno con sombras suaves
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#18181b';
      ctx.roundRect(nbX, nbY, nbW, nbH, 18);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Espiral de libreta
      ctx.fillStyle = '#3f3f46';
      for (let i = nbY + 25; i < nbY + nbH - 25; i += 18) {
        ctx.beginPath();
        ctx.arc(nbX + 16, i, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#71717a';
      ctx.font = '500 11px sans-serif';
      ctx.fillText('SUPERFICIE REAL: Cuaderno Carta (8.5" x 11")', nbX + 32, nbY + 30);

    } else if (activeFormat.bgType === 'card') {
      const cardW = 3.37 * PPI;
      const cardH = 2.125 * PPI;
      const cardX = (canvas.width - cardW) / 2;
      const cardY = (canvas.height - cardH) / 2;

      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#18181b';
      ctx.roundRect(cardX - 50, cardY - 45, cardW + 100, cardH + 90, 24);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#27272a';
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '500 11px sans-serif';
      ctx.fillText('SUPERFICIE REAL: Tarjetero / Billetera Estándar', cardX - 30, cardY - 20);

    } else {
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
      ctx.fillStyle = '#71717a';
      ctx.font = '500 11px sans-serif';
      ctx.fillText(`SUPERFICIE REAL: ${activeFormat.bgLabel}`, 45, 52);
    }

    // 3. DIBUJO DEL ARTE DEL CLIENTE (Móvil)
    const itemW = activeFormat.widthInches * PPI;
    const itemH = activeFormat.heightInches * PPI;
    const bleedPx = activeFormat.bleed * PPI;
    const safePx = activeFormat.safeMargin * PPI;

    // A) Línea de Sangrado Exterior (Corte / Demasía)
    if (showBleedGuides) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(pos.x - bleedPx, pos.y - bleedPx, itemW + bleedPx * 2, itemH + bleedPx * 2);
      ctx.fillRect(pos.x - bleedPx, pos.y - bleedPx, itemW + bleedPx * 2, itemH + bleedPx * 2);
    }

    // B) Producto Final / Línea de Troquel
    ctx.setLineDash([]);
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = finishEffect === 'transparente' ? 'rgba(255, 255, 255, 0.35)' : '#ffffff';
    ctx.roundRect(pos.x, pos.y, itemW, itemH, 10);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(pos.x, pos.y, itemW, itemH);

    // C) Acabado Glossy / UV
    if (finishEffect === 'brillo') {
      const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x + itemW, pos.y + itemH);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(pos.x, pos.y, itemW, itemH);
    }

    // D) Zona Segura de Texto
    if (showBleedGuides) {
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(pos.x + safePx, pos.y + safePx, itemW - safePx * 2, itemH - safePx * 2);
    }

    // Texto de Medida en el centro del producto
    ctx.setLineDash([]);
    ctx.fillStyle = '#09090b';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${activeFormat.widthInches}" x ${activeFormat.heightInches}"`, pos.x + itemW / 2, pos.y + itemH / 2 + 4);

  }, [activeFormat, pos, showBleedGuides, finishEffect]);

  // Manejo de arrastre
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
    <div className="w-full space-y-8">
      
      {/* 1. BUSCADOR ESTILO APPLE (Luminoso + Minimalista) */}
      <div className="w-full relative">
        <form onSubmit={handleSearch} className="relative z-10 bg-zinc-900/90 border border-white/15 p-2 rounded-2xl backdrop-blur-2xl shadow-2xl flex items-center gap-2 transition-all focus-within:border-red-500/80 focus-within:ring-1 focus-within:ring-red-500">
          <div className="pl-4 text-zinc-400 text-base">✨</div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pregúntale al Asesor: Ej: '¿Qué tamaño necesito para stickers de cuadernos?'"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 px-2 py-3.5 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? 'Analizando...' : 'Consultar'}
          </button>
        </form>

        {/* Glow de fondo para el buscador */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-purple-600/10 rounded-2xl blur-xl -z-10 opacity-70" />
      </div>

      {/* Sugerencias Rápidas */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider mr-2">Sugerencias rápidas:</span>
        {[
          { label: '🏷️ Stickers Escolares', key: 'sticker_cuaderno' },
          { label: '💳 Tarjeta de Presentación', key: 'tarjeta_presentacion' },
          { label: '🍾 Etiqueta de Botella', key: 'etiqueta_botella' },
          { label: '📄 Flyer 1/2 Carta', key: 'volante_promo' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setQuery(item.label);
              setActiveFormat(PRESETS[item.key]);
            }}
            className="px-3.5 py-1.5 rounded-full border border-white/10 bg-zinc-900/60 text-zinc-300 hover:border-red-500/50 hover:text-white transition-all text-[11px] font-medium cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 2. RESPUESTA DINÁMICA DE LA IA (Cuadro Elegante Conversacional) */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-extrabold text-sm shrink-0">
            AI
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">{activeFormat.title}</span>
              <span className="text-[10px] bg-white/10 text-zinc-300 px-2 py-0.5 rounded-full border border-white/10">{activeFormat.category}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              {activeFormat.aiExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* 3. VISUALIZADOR INTERACTIVO & DASHBOARD DE MÉTRICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Canvas de Escala Real */}
        <div className="lg:col-span-8 bg-zinc-950 border border-white/10 rounded-3xl p-4 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
          
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 mb-3 px-2">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              💡 Haz clic y arrastra la tarjeta blanca para ubicarla en el espacio
            </span>
            
            <button
              onClick={() => setShowBleedGuides(!showBleedGuides)}
              className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                showBleedGuides ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-zinc-900 border-white/10 text-zinc-400'
              }`}
            >
              {showBleedGuides ? '👁️ Ocultar Guías Técnicas' : '👁️ Ver Sangrado & Márgenes'}
            </button>
          </div>

          <canvas
            ref={canvasRef}
            width={640}
            height={440}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-auto max-w-full rounded-2xl border border-white/10 cursor-grab active:cursor-grabbing shadow-inner"
          />

          {/* Leyenda Técnica */}
          {showBleedGuides && (
            <div className="w-full mt-3 flex justify-around text-[10px] text-zinc-400 bg-zinc-900/80 p-3 rounded-2xl border border-white/10">
              <span className="flex items-center gap-1.5 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Sangrado de Corte (+0.125")</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Borde Real del Producto</span>
              <span className="flex items-center gap-1.5 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Zona Segura para Texto</span>
            </div>
          )}
        </div>

        {/* Dashboard Lateral Ejecutivo */}
        <div className="lg:col-span-4 bg-zinc-900/70 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-2xl shadow-2xl">
          
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 block mb-1">Ficha de Producción</span>
            <h3 className="text-base font-extrabold text-white">{activeFormat.title}</h3>
            <span className="text-[11px] text-zinc-400 font-medium mt-0.5 block">Estándar: {activeFormat.regionFormat}</span>
          </div>

          {/* Métricas Técnicas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-white/10">
              <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Tamaño Final</span>
              <p className="text-sm font-extrabold text-white mt-1">{activeFormat.widthInches}" x {activeFormat.heightInches}"</p>
            </div>
            <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-white/10">
              <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Con Sangrado</span>
              <p className="text-sm font-extrabold text-red-400 mt-1">
                {(activeFormat.widthInches + activeFormat.bleed * 2).toFixed(2)}" x {(activeFormat.heightInches + activeFormat.bleed * 2).toFixed(2)}"
              </p>
            </div>
          </div>

          {/* Textura / Acabado del Material */}
          <div>
            <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 block mb-2">Simular Acabado Visual</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mate', label: 'Mate' },
                { id: 'brillo', label: 'Brillo UV' },
                { id: 'transparente', label: 'Transparente' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinishEffect(f.id as any)}
                  className={`py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                    finishEffect === f.id ? 'bg-white text-black border-white shadow-lg' : 'border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="mt-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Material Sugerido:</span>
              <p className="text-[11px] text-zinc-200 leading-snug">{activeFormat.recommendedMaterial}</p>
            </div>
          </div>

          {/* Acción Directa */}
          <div className="pt-2 border-t border-white/10">
            <Link
              href={`/cotizacion?producto=${encodeURIComponent(activeFormat.title)}&tamano=${activeFormat.widthInches}x${activeFormat.heightInches}`}
              className="w-full block text-center py-4 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl transition-all hover:shadow-red-600/30 cursor-pointer"
            >
              ✨ Cotizar este Tamaño Exacto
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}