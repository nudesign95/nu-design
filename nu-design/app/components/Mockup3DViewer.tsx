'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

interface ImageAnalysis {
  fileName: string;
  fileSizeMB: string;
  widthPx: number;
  heightPx: number;
  previewUrl: string;
}

export default function VerificadorDPI() {
  const [targetWidth, setTargetWidth] = useState<number>(3.5);
  const [targetHeight, setTargetHeight] = useState<number>(2.0);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      setAnalysis({
        fileName: file.name,
        fileSizeMB: (file.size / (1024 * 1024)).toFixed(2),
        widthPx: img.naturalWidth,
        heightPx: img.naturalHeight,
        previewUrl: objectUrl
      });
    };

    img.src = objectUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const calculatedDpi = analysis
    ? Math.round(Math.min(analysis.widthPx / Math.max(0.1, targetWidth), analysis.heightPx / Math.max(0.1, targetHeight)))
    : 0;

  return (
    <div className="w-full space-y-10">
      
      {/* 1. DROPZONE TIPO APPLE CON INTERACCIÓN LUMINOSA */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative overflow-hidden w-full rounded-3xl p-10 text-center transition-all duration-300 cursor-pointer border backdrop-blur-2xl group ${
          isDragging
            ? 'border-red-500 bg-red-600/15 shadow-[0_0_50px_rgba(239,68,68,0.3)]'
            : 'border-white/15 bg-zinc-900/50 hover:border-red-500/50 hover:bg-zinc-900/80 shadow-2xl'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp, image/tiff"
          className="hidden"
        />

        <div className="relative z-10 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-3xl mx-auto shadow-2xl group-hover:scale-110 transition-transform">
            📥
          </div>
          <div>
            <h3 className="text-base font-black uppercase text-white tracking-wider">
              Arrastra o selecciona tu archivo
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              Soporta PNG, JPG, WEBP o TIFF. Evaluaremos la densidad de píxeles al instante.
            </p>
          </div>
          <button
            type="button"
            className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all group-hover:shadow-red-600/40"
          >
            Examinar Imagen
          </button>
        </div>

        {/* Glow animado de fondo */}
        <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-red-600/10 to-transparent blur-3xl pointer-events-none group-hover:from-red-600/20 transition-all" />
      </div>

      {/* 2. DEMOSTRACIÓN EN 3 FRANJAS INTERACTIVAS (Para cuando no hay imagen cargada) */}
      {!analysis && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
              📐 Referencia Visual de Calidad
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
              Escala de Renderizado DPI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Franja 1: Baja Calidad (<150 DPI) */}
            <div className="bg-zinc-900/60 border border-red-500/30 rounded-3xl p-5 space-y-3 backdrop-blur-xl relative overflow-hidden group hover:border-red-500 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                  🔴 Baja Calidad (&lt;150 DPI)
                </span>
                <span className="text-xs font-bold text-zinc-500">72 DPI</span>
              </div>
              
              <div className="h-28 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-black text-white/30 tracking-widest blur-[2px] scale-105 select-none">
                  TEXTO
                </span>
                <div className="absolute inset-0 bg-red-500/5 backdrop-blur-[1px]" />
              </div>

              <p className="text-[11px] text-zinc-400 leading-snug">
                Píxeles visibles, bordes dentados y textos borrosos. Inaceptable para impresión física.
              </p>
            </div>

            {/* Franja 2: Aceptable (150 - 280 DPI) */}
            <div className="bg-zinc-900/60 border border-yellow-500/30 rounded-3xl p-5 space-y-3 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20">
                  🟡 Aceptable (150-280 DPI)
                </span>
                <span className="text-xs font-bold text-zinc-500">150 DPI</span>
              </div>

              <div className="h-28 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-black text-white/80 tracking-widest select-none">
                  TEXTO
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-snug">
                Apta para Lonas, Banners de Gran Formato y vallas vistas desde más de 2 metros.
              </p>
            </div>

            {/* Franja 3: 100% Excelente (300 DPI) */}
            <div className="bg-zinc-900/60 border border-green-500/30 rounded-3xl p-5 space-y-3 backdrop-blur-xl relative overflow-hidden group hover:border-green-500 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                  🟢 Impresión Perfecta (300 DPI)
                </span>
                <span className="text-xs font-bold text-zinc-500">300 DPI</span>
              </div>

              <div className="h-28 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-black text-white tracking-widest shadow-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] select-none">
                  TEXTO
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-snug">
                Nitidez fotográfica profesional. Ideal para Tarjetas, Stickers, Revistas y DTF.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 3. PANEL DE DIAGNÓSTICO EN VIVO (Cuando se carga una imagen) */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Preview con efecto Glass */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="w-full h-72 rounded-2xl border border-white/10 bg-zinc-900/80 flex items-center justify-center p-2 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={analysis.previewUrl}
                alt="Vista Previa"
                className="max-w-full max-h-full object-contain rounded-xl drop-shadow-2xl"
              />
            </div>
            
            <div className="w-full text-left border-t border-white/10 pt-3 space-y-1">
              <span className="text-xs font-extrabold text-white block truncate">{analysis.fileName}</span>
              <span className="text-[11px] font-semibold text-zinc-400 block">Tamaño del archivo: {analysis.fileSizeMB} MB</span>
            </div>
          </div>

          {/* Panel de Control de DPI */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-2xl shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Píxeles Nativo</span>
                <p className="text-xl font-black text-white mt-0.5">{analysis.widthPx} x {analysis.heightPx} px</p>
              </div>

              <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border shadow-lg ${
                calculatedDpi >= 280
                  ? 'bg-green-500/10 border-green-500/40 text-green-400 shadow-green-500/10'
                  : calculatedDpi >= 150
                  ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400 shadow-yellow-500/10'
                  : 'bg-red-500/10 border-red-500/40 text-red-400 shadow-red-500/10'
              }`}>
                {calculatedDpi >= 280 ? '🟢 300 DPI Pro' : calculatedDpi >= 150 ? '🟡 150 DPI Aceptable' : '🔴 Bajo DPI'}
              </span>
            </div>

            {/* Inputs de dimensiones */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold text-zinc-300 block tracking-wider">
                Dimensiones físicas deseadas (Pulgadas)
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-3 rounded-2xl border border-white/10 focus-within:border-red-500 transition-all">
                  <span className="text-[9px] uppercase font-extrabold text-zinc-500 block">Ancho (Pulgadas)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={targetWidth}
                    onChange={(e) => setTargetWidth(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-1"
                  />
                </div>
                <div className="bg-zinc-950 p-3 rounded-2xl border border-white/10 focus-within:border-red-500 transition-all">
                  <span className="text-[9px] uppercase font-extrabold text-zinc-500 block">Alto (Pulgadas)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={targetHeight}
                    onChange={(e) => setTargetHeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Resultado e Indicador */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">Densidad Resultante:</span>
                <span className="text-lg font-black text-white">{calculatedDpi} DPI</span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {calculatedDpi >= 280
                  ? '✅ Excelente. El archivo posee píxeles suficientes para impresiones de alta nitidez en prensa digital o DTF.'
                  : calculatedDpi >= 150
                  ? '⚠️ Calidad intermedia. Funciona bien para impresiones de gran formato o vallas lejanas.'
                  : '❌ Precaución. La densidad de píxeles es insuficiente para esta medida y se percibirá pixelado.'}
              </p>
            </div>

            {/* Botón de Cotización */}
            <Link
              href={`/cotizacion?producto=Impresion&tamano=${targetWidth}x${targetHeight}`}
              className="w-full block text-center py-4 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all hover:shadow-red-600/40"
            >
              ✨ Cotizar Impresión con este Arte
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}