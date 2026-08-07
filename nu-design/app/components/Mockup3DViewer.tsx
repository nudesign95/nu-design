'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Mockup3DViewer() {
  const [productType, setProductType] = useState<'tshirt' | 'taza'>('tshirt');
  const [itemColor, setItemColor] = useState('#ffffff');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosY, setLogoPosY] = useState(0);
  const [fileError, setFileError] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/png') {
      setFileError('Solo se permiten archivos PNG transparente.');
      return;
    }

    if (file.size / (1024 * 1024) > 5) {
      setFileError('El archivo supera los 5 MB.');
      return;
    }

    setFileError('');
    setLogoUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Dibujar silueta base del producto
    ctx.fillStyle = itemColor;
    ctx.beginPath();

    if (productType === 'tshirt') {
      // Cuerpo de Camiseta
      ctx.roundRect(100, 100, 300, 360, [20, 20, 10, 10]);
      // Mangas
      ctx.roundRect(40, 100, 80, 140, [15]);
      ctx.roundRect(380, 100, 80, 140, [15]);
      ctx.fill();

      // Cuello
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(250, 100, 40, 0, Math.PI);
      ctx.fill();
    } else {
      // Asa de la Taza
      ctx.lineWidth = 24;
      ctx.strokeStyle = itemColor;
      ctx.beginPath();
      ctx.arc(130, 260, 60, 0, Math.PI * 2);
      ctx.stroke();

      // Cuerpo Taza
      ctx.roundRect(160, 120, 240, 280, [15]);
      ctx.fill();

      // Borde Superior
      ctx.fillStyle = '#e4e4e7';
      ctx.beginPath();
      ctx.ellipse(280, 120, 120, 15, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Renderizar Logo si existe
    if (logoUrl) {
      const img = new Image();
      img.src = logoUrl;
      img.onload = () => {
        const baseWidth = productType === 'tshirt' ? 140 : 120;
        const width = baseWidth * logoScale;
        const height = (img.height / img.width) * width;

        const x = 250 - width / 2;
        const y = (productType === 'tshirt' ? 220 : 230) - height / 2 + logoPosY;

        ctx.drawImage(img, x, y, width, height);
      };
    }
  }, [productType, itemColor, logoUrl, logoScale, logoPosY]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `mockup-${productType}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Vista Previa Canvas 2D */}
      <div className="lg:col-span-8 h-125 md:h-150 w-full rounded-3xl border border-white/10 bg-zinc-950 relative overflow-hidden flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full max-h-full object-contain drop-shadow-2xl"
        />

        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex justify-between items-center text-[11px] text-zinc-300">
          <span>
            {productType === 'tshirt'
              ? '📐 Área frontal: 30 x 40 cm'
              : '📐 Área panorámica: 20 x 9.5 cm (11 oz)'}
          </span>
          <span className="text-red-400 font-semibold">PNG Transparente (Máx 5MB)</span>
        </div>
      </div>

      {/* Panel de Controles */}
      <div className="lg:col-span-4 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Producto</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setProductType('tshirt')}
              className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                productType === 'tshirt' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'
              }`}
            >
              Camiseta
            </button>
            <button
              type="button"
              onClick={() => setProductType('taza')}
              className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                productType === 'taza' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'
              }`}
            >
              Taza Cerámica
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Color del Producto</label>
          <div className="flex gap-3 items-center">
            {['#ffffff', '#000000', '#ef4444', '#1e3a8a', '#10b981', '#f59e0b'].map((c, i) => (
              <button
                key={i}
                onClick={() => setItemColor(c)}
                className={`w-7 h-7 rounded-full border border-white/20 transition-transform cursor-pointer ${
                  itemColor === c ? 'scale-125 ring-2 ring-red-500' : ''
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <input
              type="color"
              value={itemColor}
              onChange={(e) => setItemColor(e.target.value)}
              className="w-8 h-8 rounded-xl bg-transparent border-0 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Cargar Logo (PNG Transparente)</label>
          <input
            type="file"
            accept="image/png"
            onChange={handleFileUpload}
            className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
          />
          {fileError && <p className="text-[11px] text-red-500 font-semibold mt-1">{fileError}</p>}
        </div>

        {logoUrl && (
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Escala del Logo</label>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={logoScale}
                onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Posición Vertical</label>
              <input
                type="range"
                min="-60"
                max="60"
                step="5"
                value={logoPosY}
                onChange={(e) => setLogoPosY(parseFloat(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 space-y-3">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            📷 Descargar Mockup
          </button>

          <Link
            href="/cotizacion"
            className="w-full block text-center py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xl transition-all cursor-pointer"
          >
            ✨ Cotizar este Diseño
          </Link>
        </div>
      </div>
    </div>
  );
}