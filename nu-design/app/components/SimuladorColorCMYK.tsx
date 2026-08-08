'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SimuladorColorCMYK() {
  const [rgbColor, setRgbColor] = useState({ r: 239, g: 35, b: 60 });
  const [paperType, setPaperType] = useState<'glossy' | 'bond' | 'kraft'>('glossy');

  // Conversión matemática RGB -> CMYK
  const r = rgbColor.r / 255;
  const g = rgbColor.g / 255;
  const b = rgbColor.b / 255;

  const k = 1 - Math.max(r, g, b);
  const c = k === 1 ? 0 : Math.round(((1 - r - k) / (1 - k)) * 100);
  const m = k === 1 ? 0 : Math.round(((1 - g - k) / (1 - k)) * 100);
  const y = k === 1 ? 0 : Math.round(((1 - b - k) / (1 - k)) * 100);
  const kPercent = Math.round(k * 100);

  // Simulación del color simulado en papel
  let cmykR = rgbColor.r;
  let cmykG = rgbColor.g;
  let cmykB = rgbColor.b;

  // Ajuste por absorsión de papel
  if (paperType === 'glossy') {
    cmykR = Math.round(rgbColor.r * 0.92);
    cmykG = Math.round(rgbColor.g * 0.88);
    cmykB = Math.round(rgbColor.b * 0.88);
  } else if (paperType === 'bond') {
    cmykR = Math.round(rgbColor.r * 0.82);
    cmykG = Math.round(rgbColor.g * 0.78);
    cmykB = Math.round(rgbColor.b * 0.78);
  } else if (paperType === 'kraft') {
    cmykR = Math.round(rgbColor.r * 0.70 + 40);
    cmykG = Math.round(rgbColor.g * 0.60 + 30);
    cmykB = Math.round(rgbColor.b * 0.40 + 10);
  }

  const hexRGB = `#${rgbColor.r.toString(16).padStart(2, '0')}${rgbColor.g.toString(16).padStart(2, '0')}${rgbColor.b.toString(16).padStart(2, '0')}`;
  const hexCMYK = `#${cmykR.toString(16).padStart(2, '0')}${cmykG.toString(16).padStart(2, '0')}${cmykB.toString(16).padStart(2, '0')}`;

  // Estimación de desaturación
  const gamutLoss = Math.min(100, Math.round(((rgbColor.r + rgbColor.g + rgbColor.b - (cmykR + cmykG + cmykB)) / (rgbColor.r + rgbColor.g + rgbColor.b || 1)) * 100));

  const PRESET_COLORS = [
    { label: '🔥 Rojo Neón', r: 255, g: 0, b: 50 },
    { label: '⚡ Verde Eléctrico', r: 0, g: 255, b: 100 },
    { label: '💙 Azul Neón', r: 0, g: 100, b: 255 },
    { label: '💜 Violeta Digital', r: 160, g: 0, b: 255 },
    { label: '🟡 Amarillo Puro', r: 255, g: 235, b: 0 }
  ];

  return (
    <div className="w-full space-y-8">
      
      {/* SECTOR DE PRUEBAS DE PANTALLA COMPLETA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-h-[380px]">
        
        {/* PANEL 1: PANTALLA (RGB) */}
        <div 
          className="rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors duration-300 min-h-[350px]"
          style={{ backgroundColor: hexRGB }}
        >
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 w-fit">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 block">
              💻 Como lo ves en Pantalla (sRGB)
            </span>
            <span className="text-xs font-mono font-bold text-white">Luz Emitida (Monitor/Celular)</span>
          </div>

          <div className="bg-black/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-2 text-white">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span>HEX: {hexRGB.toUpperCase()}</span>
              <span>RGB: ({rgbColor.r}, {rgbColor.g}, {rgbColor.b})</span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Usa los canales R, G y B. Los colores neón se ven extremadamente vivos porque emiten luz propia.
            </p>
          </div>
        </div>

        {/* PANEL 2: IMPRESIÓN (CMYK) */}
        <div 
          className="rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors duration-300 min-h-[350px]"
          style={{ backgroundColor: hexCMYK }}
        >
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 w-fit">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
              🖨️ Resultado Físico Impreso (CMYK)
            </span>
            <span className="text-xs font-mono font-bold text-white">Pigmento sobre {paperType.toUpperCase()}</span>
          </div>

          <div className="bg-black/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-3 text-white">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span>SIMULADO: {hexCMYK.toUpperCase()}</span>
              <span className="text-yellow-400">Pérdida de Brillo: ~{gamutLoss}%</span>
            </div>

            {/* BARRA DE CANALES CMYK */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold">
              <div className="bg-cyan-950/80 border border-cyan-500/40 p-2 rounded-xl text-cyan-300">C: {c}%</div>
              <div className="bg-pink-950/80 border border-pink-500/40 p-2 rounded-xl text-pink-300">M: {m}%</div>
              <div className="bg-yellow-950/80 border border-yellow-500/40 p-2 rounded-xl text-yellow-300">Y: {y}%</div>
              <div className="bg-zinc-800 border border-zinc-500/40 p-2 rounded-xl text-zinc-200">K: {kPercent}%</div>
            </div>
          </div>
        </div>

      </div>

      {/* PANEL DE CONTROLES Y SELECCIÓN DE COLORES Y PAPELES */}
      <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl space-y-6 shadow-2xl">
        
        {/* Presets Rápidos */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
            Colores Críticos con Mayor Variación en Imprenta
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setRgbColor({ r: preset.r, g: preset.g, b: preset.b })}
                className="px-4 py-2 bg-zinc-950 border border-white/10 hover:border-red-500/50 rounded-xl text-xs font-bold text-zinc-200 transition-all cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders RGB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between text-xs font-bold text-red-400">
              <span>Red (Rojo)</span>
              <span>{rgbColor.r}</span>
            </div>
            <input 
              type="range" min="0" max="255" value={rgbColor.r} 
              onChange={(e) => setRgbColor({ ...rgbColor, r: parseInt(e.target.value) })}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between text-xs font-bold text-green-400">
              <span>Green (Verde)</span>
              <span>{rgbColor.g}</span>
            </div>
            <input 
              type="range" min="0" max="255" value={rgbColor.g} 
              onChange={(e) => setRgbColor({ ...rgbColor, g: parseInt(e.target.value) })}
              className="w-full accent-green-500 cursor-pointer"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between text-xs font-bold text-blue-400">
              <span>Blue (Azul)</span>
              <span>{rgbColor.b}</span>
            </div>
            <input 
              type="range" min="0" max="255" value={rgbColor.b} 
              onChange={(e) => setRgbColor({ ...rgbColor, b: parseInt(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Tipo de Papel */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
            Simular Absorción según el Tipo de Papel
          </span>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'glossy', label: '✨ Satinado / Glossy', desc: 'Menor absorción, mantiene el brillo' },
              { id: 'bond', label: '📄 Papel Bond / Mate', desc: 'Absorbe más tinta, tonos opacos' },
              { id: 'kraft', label: '📦 Papel Kraft / Marrón', desc: 'Altera drásticamente el tono' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPaperType(p.id as any)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  paperType === p.id 
                    ? 'bg-red-600/20 border-red-500 text-white shadow-lg' 
                    : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="text-xs font-extrabold block">{p.label}</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nota Legal / Disclaimer */}
        <div className="bg-zinc-950/60 p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            🛡️ <strong>Nota de Color:</strong> Los monitores emiten luz directa (RGB) mientras que la tinta absorbe luz (CMYK). Para lograr colores neón exactos se requieren tintas especiales de la escala PANTONE®.
          </p>
          <Link
            href="/cotizacion?producto=AsesoriaColor"
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all shrink-0"
          >
            ✨ Consultar con Diseñador
          </Link>
        </div>

      </div>

    </div>
  );
}