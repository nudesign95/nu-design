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
  
  // Estados para la animación de escaneo / "Labor Illusion"
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scanStepText, setScanStepText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startAnalysisAnimation = (fileData: ImageAnalysis) => {
    setIsAnalyzing(true);
    setProgress(0);
    setScanStepText('Iniciando lectura de cabeceras de imagen...');

    const steps = [
      { p: 25, text: 'Leyendo matriz de píxeles nativa y espacio de color...' },
      { p: 55, text: 'Evaluando densidad física (DPI) según dimensiones en pulgadas...' },
      { p: 85, text: 'Calculando índice de compresión y artefactos de ampliación...' },
      { p: 100, text: '¡Auditoría de resolución completada con éxito!' }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setProgress(steps[stepIdx].p);
        setScanStepText(steps[stepIdx].text);
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setAnalysis(fileData);
          setIsAnalyzing(false);
        }, 400);
      }
    }, 600);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      startAnalysisAnimation({
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
      
      {/* 1. DROPZONE CON ANIMACIÓN DE CARGA */}
      {!isAnalyzing && (
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
                Soporta PNG, JPG, WEBP o TIFF. Iniciaremos la auditoría de píxeles.
              </p>
            </div>
            <button
              type="button"
              className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all group-hover:shadow-red-600/40"
            >
              Auditar Imagen
            </button>
          </div>
        </div>
      )}

      {/* 2. PANTALLA DE PROCESO / ESCANEO TÉCNICO (LABOR ILLUSION) */}
      {isAnalyzing && (
        <div className="bg-zinc-950 border border-red-500/40 rounded-3xl p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-white">Escaneando Estructura de Arte</span>
            </div>
            <span className="text-xl font-black font-mono text-red-500">{progress}%</span>
          </div>

          {/* Barra de progreso animada */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-zinc-400 font-mono tracking-wide text-center animate-pulse">
            {scanStepText}
          </p>
        </div>
      )}

      {/* 3. RESULTADOS DE LA AUDITORÍA */}
      {analysis && !isAnalyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
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
              <span className="text-[11px] font-semibold text-zinc-400 block">Peso de archivo: {analysis.fileSizeMB} MB</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-2xl shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Píxeles Nativos</span>
                <p className="text-xl font-black text-white mt-0.5">{analysis.widthPx} x {analysis.heightPx} px</p>
              </div>

              <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border shadow-lg ${
                calculatedDpi >= 280
                  ? 'bg-green-500/10 border-green-500/40 text-green-400'
                  : calculatedDpi >= 150
                  ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'
                  : 'bg-red-500/10 border-red-500/40 text-red-400'
              }`}>
                {calculatedDpi >= 280 ? '🟢 300 DPI Óptimo' : calculatedDpi >= 150 ? '🟡 150 DPI Aceptable' : '🔴 Bajo DPI'}
              </span>
            </div>

            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold text-zinc-300 block tracking-wider">
                Dimensiones físicas finales (Pulgadas)
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

            <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">Resultado de Auditoría:</span>
                <span className="text-lg font-black text-white">{calculatedDpi} DPI</span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {calculatedDpi >= 280
                  ? '✅ Análisis positivo: La densidad de píxeles garantiza la máxima resolución offset/digital sin distorsión.'
                  : calculatedDpi >= 150
                  ? '⚠️ Resultado moderado: Apto para gigantografías o lonas vistas a distancia.'
                  : '❌ Resultado crítico: Densidad insuficiente. Se detectó riesgo alto de bordes pixelados.'}
              </p>
            </div>

            <Link
              href={`/cotizacion?producto=Impresion&tamano=${targetWidth}x${targetHeight}`}
              className="w-full block text-center py-4 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all"
            >
              ✨ Cotizar Impresión con este Arte
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}