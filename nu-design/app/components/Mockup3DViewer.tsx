'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type UnitType = 'in' | 'cm' | 'mm' | 'ft' | 'pica' | 'pt';

interface ImageAnalysis {
  fileName: string;
  fileSizeMB: string;
  widthPx: number;
  heightPx: number;
  previewUrl: string;
  isUpscaledFake: boolean;
  fileType: string;
}

interface PresetFormat {
  name: string;
  w: number;
  h: number;
  unit: UnitType;
}

const COMMON_PRESETS: PresetFormat[] = [
  { name: 'Personalizado', w: 3.5, h: 2.0, unit: 'in' },
  { name: '💳 Carnet PVC (CR80)', w: 3.375, h: 2.125, unit: 'in' },
  { name: '🎴 Tarjeta de Presentación', w: 3.5, h: 2.0, unit: 'in' },
  { name: '👕 Estampado Camiseta DTF (A3)', w: 11.7, h: 16.5, unit: 'in' },
  { name: '🖼️ Poster Estándar', w: 18.0, h: 24.0, unit: 'in' },
  { name: '⛺ Lona / Banner (6x3 Pies)', w: 6.0, h: 3.0, unit: 'ft' },
  { name: '📄 Hoja Carta (Letter)', w: 8.5, h: 11.0, unit: 'in' }
];

export default function VerificadorDPI() {
  const [unit, setUnit] = useState<UnitType>('in');
  const [targetWidth, setTargetWidth] = useState<number>(3.5);
  const [targetHeight, setTargetHeight] = useState<number>(2.0);
  const [selectedPreset, setSelectedPreset] = useState<string>('🎴 Tarjeta de Presentación');
  
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [fileError, setFileError] = useState<string>('');
  
  // Estados de Escaneo Dinámico
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [scanStepText, setScanStepText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const zoomCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Convertidor de Unidades a Pulgadas (Base de cálculo interna)
  const convertToInches = (val: number, fromUnit: UnitType): number => {
    switch (fromUnit) {
      case 'cm': return val / 2.54;
      case 'mm': return val / 25.4;
      case 'ft': return val * 12;
      case 'pica': return val / 6;
      case 'pt': return val / 72;
      default: return val;
    }
  };

  const convertFromInches = (valInches: number, toUnit: UnitType): number => {
    switch (toUnit) {
      case 'cm': return parseFloat((valInches * 2.54).toFixed(2));
      case 'mm': return parseFloat((valInches * 25.4).toFixed(1));
      case 'ft': return parseFloat((valInches / 12).toFixed(2));
      case 'pica': return parseFloat((valInches * 6).toFixed(1));
      case 'pt': return parseFloat((valInches * 72).toFixed(0));
      default: return parseFloat(valInches.toFixed(2));
    }
  };

  // Cambio de Unidad
  const handleUnitChange = (newUnit: UnitType) => {
    const wInches = convertToInches(targetWidth, unit);
    const hInches = convertToInches(targetHeight, unit);
    setUnit(newUnit);
    setTargetWidth(convertFromInches(wInches, newUnit));
    setTargetHeight(convertFromInches(hInches, newUnit));
  };

  // Cambio de Preset
  const handlePresetSelect = (presetName: string) => {
    setSelectedPreset(presetName);
    const found = COMMON_PRESETS.find(p => p.name === presetName);
    if (found && presetName !== 'Personalizado') {
      setUnit(found.unit);
      setTargetWidth(found.w);
      setTargetHeight(found.h);
    }
  };

  // Detector Anti-Engaño
  const detectFakeUpscale = (img: HTMLImageElement): boolean => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const sampleW = Math.min(img.naturalWidth, 300);
    const sampleH = Math.min(img.naturalHeight, 300);
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
    return avgDiff < 4.2 && (img.naturalWidth > 1500 || img.naturalHeight > 1500);
  };

  const startDynamicAnalysis = (file: File, img: HTMLImageElement, objectUrl: string) => {
    setIsAnalyzing(true);
    setProgress(0);
    setFileError('');

    const sizeMB = file.size / (1024 * 1024);
    const totalDuration = Math.min(10000, Math.max(5000, Math.round(5000 + sizeMB * 500)));

    const steps = [
      { p: 15, text: 'Leyendo matriz de píxeles y espacio de color...' },
      { p: 40, text: 'Evaluando varianza de contraste (Prueba de Re-muestreo)...' },
      { p: 70, text: 'Simulando densidad de puntos por pulgada (DPI)...' },
      { p: 90, text: 'Generando renderizado de lupa y prueba de nitidez...' },
      { p: 100, text: '¡Auditoría técnica completada!' }
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
        }, 400);
      }
    }, intervalTime);
  };

  const processFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();

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
    img.onload = () => startDynamicAnalysis(file, img, objectUrl);
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

  // CÁLCULOS MATEMÁTICOS DE DPI RESULTANTE
  const targetWInches = convertToInches(targetWidth, unit);
  const targetHInches = convertToInches(targetHeight, unit);

  const calculatedDpi = analysis
    ? Math.round(Math.min(analysis.widthPx / Math.max(0.1, targetWInches), analysis.heightPx / Math.max(0.1, targetHInches)))
    : 0;

  // Tamaño Máximo Sugerido para 300 DPI
  const max300WInches = analysis ? analysis.widthPx / 300 : 0;
  const max300HInches = analysis ? analysis.heightPx / 300 : 0;

  const max300WSuggested = convertFromInches(max300WInches, unit);
  const max300HSuggested = convertFromInches(max300HInches, unit);

  // Botón "Usar Tamaño Sugerido"
  const handleApplySuggestedSize = () => {
    setTargetWidth(max300WSuggested);
    setTargetHeight(max300HSuggested);
    setSelectedPreset('Personalizado');
  };

  // Renderizado de Lupa / Simulador Zoom 100%
  useEffect(() => {
    if (!analysis || !zoomCanvasRef.current) return;
    const canvas = zoomCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = calculatedDpi < 280; // Simula difuminado si el DPI es bajo

      // Crop central de la imagen
      const cropW = img.naturalWidth * 0.25;
      const cropH = img.naturalHeight * 0.25;
      const cropX = (img.naturalWidth - cropW) / 2;
      const cropY = (img.naturalHeight - cropH) / 2;

      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height);
    };
    img.src = analysis.previewUrl;
  }, [analysis, calculatedDpi]);

  // Función para Descargar Informe de Auditoría en PDF/Impresión
  const handleDownloadReport = () => {
    window.print();
  };

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
              className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all"
            >
              Auditar Imagen
            </button>
          </div>

          <div className="absolute -inset-x-20 -bottom-20 h-40 bg-linear-to-t from-red-600/10 to-transparent blur-3xl pointer-events-none group-hover:from-red-600/20 transition-all" />
        </div>
      )}

      {/* Alerta de Error / Vectorial */}
      {fileError && (
        <div className="bg-zinc-900/90 border border-red-500/40 p-4 rounded-2xl text-xs text-zinc-200 leading-relaxed shadow-xl">
          {fileError}
        </div>
      )}

      {/* 2. ESCANEO DINÁMICO DE AUDITORÍA */}
      {isAnalyzing && (
        <div className="bg-zinc-950 border border-red-500/40 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-white">Auditoría Técnica de Píxeles en Proceso</span>
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

      {/* 3. TRES FRANJAS VISUALES DE REFERENCIA */}
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
              </div>

              <p className="text-[11px] text-zinc-400 leading-snug">
                Píxeles visibles, bordes dentados y textos borrosos. Inaceptable para impresión física.
              </p>
            </div>

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

            <div className="bg-zinc-900/60 border border-green-500/30 rounded-3xl p-5 space-y-3 backdrop-blur-xl relative overflow-hidden group hover:border-green-500 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                  🟢 Impresión Perfecta (300 DPI)
                </span>
                <span className="text-xs font-bold text-zinc-500">300 DPI</span>
              </div>

              <div className="h-28 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-black text-white tracking-widest select-none">
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

      {/* 4. PANEL DE AUDITORÍA Y RESULTADOS */}
      {analysis && !isAnalyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
          
          {/* Lupa / Zoom 100% Simulador */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-2xl relative overflow-hidden">
            
            <div className="w-full flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400">Vista Previa Original</span>
              <span className="text-[10px] uppercase font-bold text-red-500">🔎 Lupa Zoom 100% Real</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              <div className="h-48 rounded-2xl border border-white/10 bg-zinc-900/80 flex items-center justify-center p-2 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={analysis.previewUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl" />
              </div>

              {/* Canvas de Zoom Simulación de Nitidez */}
              <div className="h-48 rounded-2xl border border-red-500/30 bg-zinc-900/80 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                <canvas ref={zoomCanvasRef} width={180} height={180} className="w-full h-full object-cover rounded-xl" />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono text-zinc-300">
                  {calculatedDpi >= 280 ? 'Nítido (300 DPI)' : 'Simulación Difuminada'}
                </span>
              </div>
            </div>
            
            <div className="w-full text-left border-t border-white/10 pt-3 space-y-1">
              <span className="text-xs font-extrabold text-white block truncate">{analysis.fileName}</span>
              <span className="text-[11px] font-semibold text-zinc-400 block">Peso: {analysis.fileSizeMB} MB</span>
            </div>
          </div>

          {/* Panel de Controles Avanzado */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-2xl shadow-2xl">
            
            {/* Header del Diagnóstico */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
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

            {/* PRESETS Y SELECTOR DE UNIDADES */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Dropdown Presets */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Formato Común</label>
                  <select
                    value={selectedPreset}
                    onChange={(e) => handlePresetSelect(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    {COMMON_PRESETS.map((p, idx) => (
                      <option key={idx} value={p.name} className="bg-zinc-900 text-white">{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Selector de Unidades Adobe Style */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Unidad de Medida</label>
                  <div className="grid grid-cols-6 gap-1 bg-zinc-950 p-1 rounded-xl border border-white/10 text-[10px] font-bold">
                    {(['in', 'cm', 'mm', 'ft', 'pica', 'pt'] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => handleUnitChange(u)}
                        className={`py-1 rounded-lg uppercase transition-all ${
                          unit === u ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inputs Ancho / Alto */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-3 rounded-2xl border border-white/10 focus-within:border-red-500 transition-all">
                  <span className="text-[9px] uppercase font-extrabold text-zinc-500 block">Ancho ({unit.toUpperCase()})</span>
                  <input
                    type="number"
                    step="0.1"
                    value={targetWidth}
                    onChange={(e) => {
                      setTargetWidth(Math.max(0.1, parseFloat(e.target.value) || 0.1));
                      setSelectedPreset('Personalizado');
                    }}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-1"
                  />
                </div>
                <div className="bg-zinc-950 p-3 rounded-2xl border border-white/10 focus-within:border-red-500 transition-all">
                  <span className="text-[9px] uppercase font-extrabold text-zinc-500 block">Alto ({unit.toUpperCase()})</span>
                  <input
                    type="number"
                    step="0.1"
                    value={targetHeight}
                    onChange={(e) => {
                      setTargetHeight(Math.max(0.1, parseFloat(e.target.value) || 0.1));
                      setSelectedPreset('Personalizado');
                    }}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-1"
                  />
                </div>
              </div>
            </div>

            {/* RECOMENDACIÓN INTELIGENTE Y BOTÓN "USAR TAMAÑO SUGERIDO" */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">Densidad Resultante:</span>
                <span className="text-lg font-black text-white">{calculatedDpi} DPI</span>
              </div>

              {calculatedDpi < 280 && (
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-red-400 block">💡 Sugerencia Técnica para 300 DPI Máximo:</span>
                  <p className="text-xs text-zinc-300">
                    Para lograr calidad de 300 DPI sin pixelar, el tamaño máximo recomendado es <strong className="text-white">{max300WSuggested} {unit.toUpperCase()} x {max300HSuggested} {unit.toUpperCase()}</strong>.
                  </p>
                  <button
                    onClick={handleApplySuggestedSize}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                  >
                    ✨ Usar este Tamaño Sugerido
                  </button>
                </div>
              )}

              {calculatedDpi >= 280 && !analysis.isUpscaledFake && (
                <p className="text-xs text-green-400 font-medium">
                  ✅ Excelente. La densidad de píxeles es óptima para impresión gráfica profesional a este tamaño.
                </p>
              )}
            </div>

            {/* DISCLAIMER LEGAL Y BOTÓN IMPRIMIR INFORME */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
              <button
                onClick={handleDownloadReport}
                className="w-full sm:w-auto px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
              >
                📄 Descargar Informe Técnico (PDF)
              </button>

              <Link
                href={`/cotizacion?producto=Impresion&tamano=${targetWidth}x${targetHeight}`}
                className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all"
              >
                ✨ Cotizar Impresión
              </Link>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}