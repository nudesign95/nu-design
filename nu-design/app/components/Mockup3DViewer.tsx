'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

interface ImageAnalysis {
  fileName: string;
  fileSizeMB: string;
  widthPx: number;
  heightPx: number;
  dpi300WidthInches: number;
  dpi300HeightInches: number;
  dpi150WidthInches: number;
  dpi150HeightInches: number;
  status: 'excelente' | 'aceptable' | 'baja';
  previewUrl: string;
}

export default function VerificadorDPI() {
  const [targetWidth, setTargetWidth] = useState<number>(3.5); // Pulgadas deseadas
  const [targetHeight, setTargetHeight] = useState<number>(2.0);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      // Cálculo de dimensiones máximas de impresión
      const wInches300 = w / 300;
      const hInches300 = h / 300;
      const wInches150 = w / 150;
      const hInches150 = h / 150;

      // Calcular DPI resultante según las medidas deseadas del usuario
      const currentDpiW = w / targetWidth;
      const currentDpiH = h / targetHeight;
      const avgDpi = Math.min(currentDpiW, currentDpiH);

      let status: 'excelente' | 'aceptable' | 'baja' = 'excelente';
      if (avgDpi < 150) {
        status = 'baja';
      } else if (avgDpi < 280) {
        status = 'aceptable';
      }

      setAnalysis({
        fileName: file.name,
        fileSizeMB: (file.size / (1024 * 1024)).toFixed(2),
        widthPx: w,
        heightPx: h,
        dpi300WidthInches: parseFloat(wInches300.toFixed(2)),
        dpi300HeightInches: parseFloat(hInches300.toFixed(2)),
        dpi150WidthInches: parseFloat(wInches150.toFixed(2)),
        dpi150HeightInches: parseFloat(hInches150.toFixed(2)),
        status,
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

  // DPI calculado para el tamaño objetivo
  const calculatedDpi = analysis
    ? Math.round(Math.min(analysis.widthPx / targetWidth, analysis.heightPx / targetHeight))
    : 0;

  return (
    <div className="w-full space-y-8">
      
      {/* Carga de Archivo (Drag & Drop) */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer backdrop-blur-2xl ${
          isDragging ? 'border-red-500 bg-red-500/10' : 'border-white/15 bg-zinc-900/60 hover:border-white/30'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp, image/tiff"
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-3">
          <span className="text-4xl block">📁</span>
          <h3 className="text-sm font-extrabold uppercase text-white tracking-wider">
            Sube o arrastra tu archivo / arte aquí
          </h3>
          <p className="text-xs text-zinc-400">
            Soporta imágenes en formato PNG, JPG, WEBP o TIFF. Analizaremos sus píxeles de origen al instante.
          </p>
          <span className="inline-block px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all">
            Seleccionar Imagen
          </span>
        </div>
      </div>

      {/* Resultados de Análisis */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vista Previa de la Imagen */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-2xl">
            <div className="w-full h-64 relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={analysis.previewUrl}
                alt="Vista Previa"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="w-full text-left space-y-1">
              <span className="text-xs font-bold text-white block truncate">{analysis.fileName}</span>
              <span className="text-[11px] text-zinc-400 block">Peso: {analysis.fileSizeMB} MB</span>
            </div>
          </div>

          {/* Panel de Diagnóstico de DPI */}
          <div className="lg:col-span-7 bg-zinc-900/70 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-2xl shadow-2xl">
            
            {/* Status Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Resolución Nativa</span>
                <p className="text-lg font-extrabold text-white mt-0.5">{analysis.widthPx} x {analysis.heightPx} px</p>
              </div>

              <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                calculatedDpi >= 280
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : calculatedDpi >= 150
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {calculatedDpi >= 280 ? '🟢 Óptimo 300 DPI' : calculatedDpi >= 150 ? '🟡 Aceptable' : '🔴 Baja Calidad'}
              </span>
            </div>

            {/* Simulación del Tamaño que Quiere Imprimir */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-bold text-zinc-300 block">
                ¿A qué tamaño deseas imprimir este arte? (Pulgadas)
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 block mb-1">Ancho (Pulgadas)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={targetWidth}
                    onChange={(e) => setTargetWidth(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 block mb-1">Alto (Pulgadas)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={targetHeight}
                    onChange={(e) => setTargetHeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Indicador de DPI Resultante */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-300">DPI Resultante a {targetWidth}" x {targetHeight}"</span>
                <span className="text-base font-extrabold text-white">{calculatedDpi} DPI</span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {calculatedDpi >= 280
                  ? '✅ Tu imagen tiene resolución suficiente para impresión Offset o Digital de alta nitidez (300 DPI).'
                  : calculatedDpi >= 150
                  ? '⚠️ La calidad es apta para Lonas o Gran Formato (150 DPI), pero podría perder algo de detalle en textos muy pequeños.'
                  : '❌ La imagen se verá pixelada o borrosa al imprimir a este tamaño. Se recomienda buscar un archivo de mayor tamaño.'}
              </p>
            </div>

            {/* Máximas Dimensiones Recomendadas */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[9px] uppercase font-bold text-zinc-400 block">Máximo Alta Nitidez (300 DPI)</span>
                <p className="text-xs font-extrabold text-white mt-1">
                  {analysis.dpi300WidthInches}" x {analysis.dpi300HeightInches}"
                </p>
              </div>
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[9px] uppercase font-bold text-zinc-400 block">Máximo Gran Formato (150 DPI)</span>
                <p className="text-xs font-extrabold text-white mt-1">
                  {analysis.dpi150WidthInches}" x {analysis.dpi150HeightInches}"
                </p>
              </div>
            </div>

            {/* Cotizar */}
            <Link
              href={`/cotizacion?producto=Impresion&tamano=${targetWidth}x${targetHeight}`}
              className="w-full block text-center py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl transition-all"
            >
              ✨ Cotizar Impresión con esta Imagen
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}