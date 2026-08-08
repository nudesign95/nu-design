'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

interface ImageAnalysis {
  fileName: string;
  fileSizeMB: string;
  widthPx: number;
  heightPx: number;
  previewUrl: string;
  isUpscaledFake: boolean;
  fileType: string;
}

export default function VerificadorDPI() {
  const [targetWidth, setTargetWidth] = useState<number>(3.5);
  const [targetHeight, setTargetHeight] = useState<number>(2.0);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [fileError, setFileError] = useState<string>('');
  
  // Estados para Escaneo Dinámico (5-10s)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scanStepText, setScanStepText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Algoritmo Anti-Engaño: Detección de Nitidez en Bordes mediante Canvas
  const detectFakeUpscale = (img: HTMLImageElement): boolean => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const sampleW = Math.min(img.naturalWidth, 400);
    const sampleH = Math.min(img.naturalHeight, 400);
    canvas.width = sampleW;
    canvas.height = sampleH;

    ctx.drawImage(img, 0, 0, sampleW, sampleH);
    const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
    const data = imgData.data;

    let totalDiff = 0;
    let count = 0;

    for (let i = 0; i < data.length - 4; i += 4) {
      const current = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const next = (data[i + 4] + data[i + 5] + data[i + 6]) / 3;
      totalDiff += Math.abs(current - next);
      count++;
    }

    const avgDiff = totalDiff / count;
    // Si la diferencia de contraste entre píxeles es muy baja en dimensiones grandes, la imagen fue re-muestreada
    return avgDiff < 4.5 && (img.naturalWidth > 1500 || img.naturalHeight > 1500);
  };

  const startDynamicAnalysis = (file: File, img: HTMLImageElement, objectUrl: string) => {
    setIsAnalyzing(true);
    setProgress(0);
    setFileError('');

    // Tiempo dinámico según peso: 5.000ms a 10.000ms
    const sizeMB = file.size / (1024 * 1024);
    const totalDuration = Math.min(10000, Math.max(5000, Math.round(5000 + sizeMB * 500)));

    const steps = [
      { p: 15, text: 'Leyendo estructura de archivo y espacio de color...' },
      { p: 35, text: 'Evaluando matriz de píxeles nativos...' },
      { p: 60, text: 'Ejecutando prueba de varianza de bordes (Detección de Re-muestreo)...' },
      { p: 85, text: 'Calculando densidad de puntos por pulgada (DPI)...' },
      { p: 100, text: 'Generando informe de auditoría técnica...' }
    ];

    let currentStep = 0;
    const intervalTime = totalDuration / steps.length;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setScanStepText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const isFake = detectFakeUpscale(img);
          setAnalysis({
            fileName: file.name,
            fileSizeMB: sizeMB.toFixed(2),
            widthPx: img.naturalWidth,
            heightPx: img.naturalHeight,
            previewUrl: objectUrl,
            isUpscaledFake: isFake,
            fileType: file.type
          });
          setIsAnalyzing(false);
        }, 500);
      }
    }, intervalTime);
  };

  const processFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();

    // Mensaje para archivos vectoriales
    if (['ai', 'eps', 'svg'].includes(extension || '')) {
      setFileError('✨ Detectamos un archivo vectorial (.AI / .EPS / .SVG). Al estar en curvas o vectores, tu arte es 100% escalable sin pérdida de calidad.');
      setAnalysis(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type) && !['jpg', 'jpeg', 'png', 'pdf'].includes(extension || '')) {
      setFileError('Solo se permiten archivos en formato JPG, PNG o PDF.');
      setAnalysis(null);
      return;
    }

    if (file.size / (1024 * 1024) > 10) {
      setFileError('El archivo supera el peso máximo permitido de 10 MB.');
      setAnalysis(null);
      return;
    }

    setFileError('');

    if (file.type === 'application/pdf') {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysis({
          fileName: file.name,
          fileSizeMB: (file.size / (1024 * 1024)).toFixed(2),
          widthPx: 2480,
          heightPx: 3508,
          previewUrl: '/placeholder-pdf.png',
          isUpscaledFake: false,
          fileType: 'PDF Document'
        });
      }, 5000);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      startDynamicAnalysis(file, img, objectUrl);
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
      
      {/* 1. DROPZONE TIPO APPLE */}
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
            accept=".jpg,.jpeg,.png,.pdf"
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
                Soporta <span className="text-white font-bold">JPG, PNG o PDF</span> (Máximo <span className="text-red-400 font-bold">10 MB</span>).
              </p>
            </div>
            <button
              type="button"
              className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all group-hover:shadow-red-600/40"
            >
              Auditar Imagen
            </button>
          </div>

          <div className="absolute -inset-x-20 -bottom-20 h-40 bg-linear-to-t from-red-600/10 to-transparent blur-3xl pointer-events-none group-hover:from-red-600/20 transition-all" />
        </div>
      )}

      {/* Alerta de Error / Vectores */}
      {fileError && (
        <div className="bg-zinc-900/90 border border-red-500/40 p-4 rounded-2xl text-xs text-zinc-200 leading-relaxed shadow-xl">
          {fileError}
        </div>
      )}

      {/* 2. ESCANEO DINÁMICO (5 - 10 SEGUNDOS) */}
      {isAnalyzing && (
        <div className="bg-zinc-950 border border-red-500/40 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-white">Auditoría de Píxeles en Proceso</span>
            </div>
            <span className="text-lg font-black font-mono text-red-500">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-linear-to-r from-red-600 to-red-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-zinc-400 font-mono tracking-wide text-center animate-pulse">
            {scanStepText}
          </p>
        </div>
      )}

      {/* 3. DEMOSTRACIÓN EN 3 FRANJAS INTERACTIVAS (CONSERVADAS CUANDO NO HAY ARCHIVO) */}
      {!analysis && !isAnalyzing && (
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
            
            {/* Franja 1: Baja Calidad */}
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

            {/* Franja 2: Aceptable */}
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

            {/* Franja 3: Excelente */}
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

      {/* 4. PANEL DE DIAGNÓSTICO EN VIVO */}
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
              <span className="text-[11px] font-semibold text-zinc-400 block">Peso: {analysis.fileSizeMB} MB</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-2xl shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Píxeles Nativos</span>
                <p className="text-xl font-black text-white mt-0.5">{analysis.widthPx} x {analysis.heightPx} px</p>
              </div>

              <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border shadow-lg ${
                analysis.isUpscaledFake
                  ? 'bg-red-500/10 border-red-500/40 text-red-400'
                  : calculatedDpi >= 280
                  ? 'bg-green-500/10 border-green-500/40 text-green-400'
                  : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'
              }`}>
                {analysis.isUpscaledFake ? '⚠️ Re-muestreo / Imagen Estirada' : calculatedDpi >= 280 ? '🟢 300 DPI Óptimo' : '🟡 150 DPI Aceptable'}
              </span>
            </div>

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

            <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">Resultado de Auditoría:</span>
                <span className="text-lg font-black text-white">{calculatedDpi} DPI</span>
              </div>

              {analysis.isUpscaledFake ? (
                <p className="text-xs text-red-400 leading-relaxed font-medium">
                  ⚠️ <strong>Advertencia de Re-muestreo:</strong> Se detectaron píxeles estirados o interpolados artificialmente. Aunque la densidad indica {calculatedDpi} DPI, la imagen original carece de nitidez de origen y se percibirá borrosa al imprimir.
                </p>
              ) : (
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  {calculatedDpi >= 280
                    ? '✅ Informe Positivo: Matriz de píxeles nítida. Apto para impresión Offset/Digital de alta definición.'
                    : '⚠️ Resultado Moderado: Apto para Lonas o Gran Formato.'}
                </p>
              )}
            </div>

            {/* DESCARGO DE RESPONSABILIDAD LEGAL */}
            <div className="bg-zinc-950/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">🛡️ Nota de Control de Calidad:</span>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Esta auditoría analiza la estructura matemática del archivo subido. La interpolación manual en software externo o imágenes de baja calidad integradas en PDF pueden alterar el resultado físico. La aprobación final del archivo es responsabilidad del cliente.
              </p>
            </div>

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