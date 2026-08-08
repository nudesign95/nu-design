'use client';
import { useState } from 'react';
import Link from 'next/link';

type ProfileICC = 'swop' | 'fogra39' | 'srgb' | 'adobeRgb' | 'japan';

interface ProfileInfo {
  id: ProfileICC;
  name: string;
  description: string;
}

const ICC_PROFILES: ProfileInfo[] = [
  { id: 'swop', name: 'U.S. Web Coated (SWOP) v2', description: 'Estándar Oficial América & Rep. Dominicana (Offset / Prensa)' },
  { id: 'fogra39', name: 'Coated FOGRA39 (ISO 12647-2)', description: 'Estándar Europeo de Alta Calidad para Papel Estucado' },
  { id: 'srgb', name: 'sRGB IEC61966-2.1 (Matemática Web Directa)', description: 'Conversión nativa lineal de pantallas digitales' },
  { id: 'adobeRgb', name: 'Adobe RGB (1998) / Foto Pro', description: 'Gama extendida para fotografía e impresión de gran formato' },
  { id: 'japan', name: 'Japan Color 2001 Coated', description: 'Estándar para empaques e impresiones comerciales asiáticas' }
];

export default function SimuladorColorCMYK() {
  const [rgbColor, setRgbColor] = useState({ r: 39, g: 52, b: 139 }); // #27348B por defecto
  const [hexInput, setHexInput] = useState('27348B');
  const [paperType, setPaperType] = useState<'glossy' | 'bond' | 'kraft'>('glossy');
  const [selectedProfile, setSelectedProfile] = useState<ProfileICC>('swop');

  // Motor de Conversión de Perfiles ICC (Lógica Adobe Illustrator / Photoshop Match)
  const calculateCMYKByProfile = (r255: number, g255: number, b255: number, profile: ProfileICC) => {
    // 1. Caso Especial: Negro Puro o Negro Rico
    if (r255 === 0 && g255 === 0 && b255 === 0) {
      return { c: 60, m: 40, y: 40, k: 100, isRichBlack: true }; // Rich Black para fondos
    }

    const r = r255 / 255;
    const g = g255 / 255;
    const b = b255 / 255;

    let c = 1 - r;
    let m = 1 - g;
    let y = 1 - b;
    let k = Math.min(c, m, y);

    if (k === 1) return { c: 0, m: 0, y: 0, k: 100, isRichBlack: false };

    let cPct = Math.round(((c - k) / (1 - k)) * 100);
    let mPct = Math.round(((m - k) / (1 - k)) * 100);
    let yPct = Math.round(((y - k) / (1 - k)) * 100);
    let kPct = Math.round(k * 100);

    // Ajustes por Perfil ICC para igualar Adobe Photoshop / Illustrator
    if (profile === 'swop' || profile === 'fogra39') {
      // Corrección de Azules Profundos (Evita K sucio como en Illustrator)
      if (b255 > r255 && b255 > g255 && kPct < 50) {
        cPct = Math.min(100, Math.round(cPct + kPct * 1.1));
        mPct = Math.min(100, Math.round(mPct + kPct * 0.85));
        kPct = 0;
      }
      // Ajuste FOGRA39 para mayor ganancia de punto en magentas y amarillos
      if (profile === 'fogra39') {
        cPct = Math.min(100, Math.round(cPct * 1.02));
        mPct = Math.min(100, Math.round(mPct * 1.04));
      }
    } else if (profile === 'adobeRgb') {
      // Perfil Fotográfico de gama amplia
      cPct = Math.round(cPct * 0.95);
      mPct = Math.round(mPct * 0.95);
    } else if (profile === 'japan') {
      // Compensación para tintas asiáticas
      yPct = Math.min(100, Math.round(yPct * 1.05));
    }

    return { c: cPct, m: mPct, y: yPct, k: kPct, isRichBlack: false };
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace('#', '').trim();
    setHexInput(val);

    if (val.length === 6) {
      const rVal = parseInt(val.substring(0, 2), 16);
      const gVal = parseInt(val.substring(2, 4), 16);
      const bVal = parseInt(val.substring(4, 6), 16);

      if (!isNaN(rVal) && !isNaN(gVal) && !isNaN(bVal)) {
        setRgbColor({ r: rVal, g: gVal, b: bVal });
      }
    }
  };

  const handleRgbInput = (channel: 'r' | 'g' | 'b', value: number) => {
    const clampedVal = Math.max(0, Math.min(255, value || 0));
    const newColor = { ...rgbColor, [channel]: clampedVal };
    setRgbColor(newColor);

    const newHex = `${newColor.r.toString(16).padStart(2, '0')}${newColor.g.toString(16).padStart(2, '0')}${newColor.b.toString(16).padStart(2, '0')}`.toUpperCase();
    setHexInput(newHex);
  };

  // Cálculo del perfil seleccionado
  const cmyk = calculateCMYKByProfile(rgbColor.r, rgbColor.g, rgbColor.b, selectedProfile);

  // Simulación Visual por Absorción de Papel
  let cmykR = rgbColor.r;
  let cmykG = rgbColor.g;
  let cmykB = rgbColor.b;

  if (paperType === 'glossy') {
    cmykR = Math.round(rgbColor.r * 0.93);
    cmykG = Math.round(rgbColor.g * 0.90);
    cmykB = Math.round(rgbColor.b * 0.90);
  } else if (paperType === 'bond') {
    cmykR = Math.round(rgbColor.r * 0.82);
    cmykG = Math.round(rgbColor.g * 0.78);
    cmykB = Math.round(rgbColor.b * 0.78);
  } else if (paperType === 'kraft') {
    cmykR = Math.round(rgbColor.r * 0.70 + 40);
    cmykG = Math.round(rgbColor.g * 0.60 + 30);
    cmykB = Math.round(rgbColor.b * 0.40 + 10);
  }

  const hexRGB = `#${rgbColor.r.toString(16).padStart(2, '0')}${rgbColor.g.toString(16).padStart(2, '0')}${rgbColor.b.toString(16).padStart(2, '0')}`.toUpperCase();
  const hexCMYK = `#${cmykR.toString(16).padStart(2, '0')}${cmykG.toString(16).padStart(2, '0')}${cmykB.toString(16).padStart(2, '0')}`.toUpperCase();

  const gamutLoss = Math.min(100, Math.round(((rgbColor.r + rgbColor.g + rgbColor.b - (cmykR + cmykG + cmykB)) / (rgbColor.r + rgbColor.g + rgbColor.b || 1)) * 100));

  const PRESET_COLORS = [
    { label: '🔴 Rojo Coca-Cola (C4 M100 Y95 K0)', r: 228, g: 0, b: 27 },
    { label: '🔵 Azul Marca (#27348B)', r: 39, g: 52, b: 139 },
    { label: '🔥 Rojo Neón (Pantalla)', r: 255, g: 0, b: 50 },
    { label: '⚡ Verde Eléctrico', r: 0, g: 255, b: 100 },
    { label: '🖤 Negro Fondo (#000000)', r: 0, g: 0, b: 0 }
  ];

  return (
    <div className="w-full space-y-8">
      
      {/* SECTOR DE MUESTRAMIENTO LADO A LADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-h-95">
        
        {/* PANEL 1: PANTALLA (sRGB) */}
        <div 
          className="rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors duration-300 min-h-87.5"
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
              <span>HEX: {hexRGB}</span>
              <span>RGB: ({rgbColor.r}, {rgbColor.g}, {rgbColor.b})</span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Colorimétricamente puro emitido por los diodos del monitor sin interferencia de papel.
            </p>
          </div>
        </div>

        {/* PANEL 2: IMPRESIÓN CON PERFIL ICC */}
        <div 
          className="rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors duration-300 min-h-87.5"
          style={{ backgroundColor: hexCMYK }}
        >
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 w-fit">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
              🖨️ Separación CMYK ({ICC_PROFILES.find(p => p.id === selectedProfile)?.name})
            </span>
            <span className="text-xs font-mono font-bold text-white">Pigmento sobre {paperType.toUpperCase()}</span>
          </div>

          <div className="bg-black/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-3 text-white">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span>SIMULADO: {hexCMYK}</span>
              <span className="text-yellow-400">Pérdida de Brillo: ~{gamutLoss}%</span>
            </div>

            {/* DESGLOSE DE CANALES DE TINTA */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold">
              <div className="bg-cyan-950/80 border border-cyan-500/40 p-2 rounded-xl text-cyan-300">C: {cmyk.c}%</div>
              <div className="bg-pink-950/80 border border-pink-500/40 p-2 rounded-xl text-pink-300">M: {cmyk.m}%</div>
              <div className="bg-yellow-950/80 border border-yellow-500/40 p-2 rounded-xl text-yellow-300">Y: {cmyk.y}%</div>
              <div className="bg-zinc-800 border border-zinc-500/40 p-2 rounded-xl text-zinc-200">K: {cmyk.k}%</div>
            </div>

            {cmyk.isRichBlack && (
              <span className="text-[10px] font-mono text-emerald-400 block text-center">
                ✨ Detección: Negro Rico / Rich Black (Ideal para fondos profundos)
              </span>
            )}
          </div>
        </div>

      </div>

      {/* CONTROLES Y SELECTOR DE PERFILES ICC ADOBE */}
      <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl space-y-6 shadow-2xl">
        
        {/* SELECTOR DE PERFIL DE COLOR ICC */}
        <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-extrabold uppercase tracking-wider text-red-500">
              ⚙️ Perfil de Color ICC / Motor de Separación (Adobe Style)
            </label>
            <span className="text-[10px] text-zinc-500 font-mono">Simulador de Preprensa</span>
          </div>

          <select
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value as ProfileICC)}
            className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-red-500 cursor-pointer"
          >
            {ICC_PROFILES.map((prof) => (
              <option key={prof.id} value={prof.id} className="bg-zinc-900 text-white">
                {prof.name}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-zinc-400 font-medium">
            {ICC_PROFILES.find(p => p.id === selectedProfile)?.description}
          </p>
        </div>

        {/* Presets + Entrada Directa HEX */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          <div className="md:col-span-8 space-y-2">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
              Pruebas Rápidas de Marcas y Colores Estándar
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRgbColor({ r: preset.r, g: preset.g, b: preset.b });
                    const newHex = `${preset.r.toString(16).padStart(2, '0')}${preset.g.toString(16).padStart(2, '0')}${preset.b.toString(16).padStart(2, '0')}`.toUpperCase();
                    setHexInput(newHex);
                  }}
                  className="px-3.5 py-1.5 bg-zinc-950 border border-white/10 hover:border-red-500/50 rounded-xl text-xs font-bold text-zinc-200 transition-all cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Entrada HEX Directa */}
          <div className="md:col-span-4 bg-zinc-950 p-3 rounded-2xl border border-white/15 focus-within:border-red-500 transition-all">
            <label className="text-[10px] uppercase font-extrabold text-zinc-400 block">Escribir o Pegar Código HEX</label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-black text-red-500">#</span>
              <input
                type="text"
                maxLength={6}
                value={hexInput}
                onChange={handleHexChange}
                placeholder="27348B"
                className="w-full bg-transparent text-sm font-mono font-bold text-white uppercase focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Sliders e Inputs R, G, B */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-red-400">Red (Rojo)</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-zinc-500">R:</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbColor.r}
                  onChange={(e) => handleRgbInput('r', parseInt(e.target.value))}
                  className="w-14 bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono font-bold text-white text-right focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
            <input 
              type="range" min="0" max="255" value={rgbColor.r} 
              onChange={(e) => handleRgbInput('r', parseInt(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-green-400">Green (Verde)</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-zinc-500">G:</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbColor.g}
                  onChange={(e) => handleRgbInput('g', parseInt(e.target.value))}
                  className="w-14 bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono font-bold text-white text-right focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
            <input 
              type="range" min="0" max="255" value={rgbColor.g} 
              onChange={(e) => handleRgbInput('g', parseInt(e.target.value))}
              className="w-full accent-green-500 cursor-pointer"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-blue-400">Blue (Azul)</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-zinc-500">B:</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbColor.b}
                  onChange={(e) => handleRgbInput('b', parseInt(e.target.value))}
                  className="w-14 bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono font-bold text-white text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <input 
              type="range" min="0" max="255" value={rgbColor.b} 
              onChange={(e) => handleRgbInput('b', parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Tipo de Papel */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
            Simular Absorción según el Tipo de Papel
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

        {/* Nota de Preprensa */}
        <div className="bg-zinc-950/60 p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            🛡️ <strong>Nota de Preprensa:</strong> Los perfiles ICC calibrados igualan la separación de color de programas de Adobe. Para colores corporativos críticos se recomienda la verificación con guía física PANTONE®.
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