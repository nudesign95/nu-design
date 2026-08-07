'use client';
import { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Center } from '@react-three/drei';

function MugModel({ color, logoUrl, logoScale }: { color: string; logoUrl: string | null; logoScale: number }) {
  const texture = useTexture(logoUrl || '/placeholder-logo.png');

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2.4, 64]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.7, 0.2, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      {logoUrl && (
        <mesh position={[0, 0, 1.21]}>
          <planeGeometry args={[1.5 * logoScale, 1.5 * logoScale]} />
          <meshBasicMaterial map={texture} transparent depthTest={true} />
        </mesh>
      )}
    </group>
  );
}

function ShirtModel({ color, logoUrl, logoScale }: { color: string; logoUrl: string | null; logoScale: number }) {
  const texture = useTexture(logoUrl || '/placeholder-logo.png');

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 2.8, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {logoUrl && (
        <mesh position={[0, 0.3, 0.41]}>
          <planeGeometry args={[1.2 * logoScale, 1.2 * logoScale]} />
          <meshBasicMaterial map={texture} transparent depthTest={true} />
        </mesh>
      )}
    </group>
  );
}

export default function Mockup3DViewer() {
  const [productType, setProductType] = useState<'tshirt' | 'taza'>('tshirt');
  const [itemColor, setItemColor] = useState('#ffffff');
  const [tshirtSize, setTshirtSize] = useState('M');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(1);
  const [fileError3D, setFileError3D] = useState('');

  const handleFileUpload3D = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'image/png') {
      setFileError3D('Solo se permiten archivos PNG transparente.');
      return;
    }

    if (selectedFile.size / (1024 * 1024) > 5) {
      setFileError3D('El archivo supera los 5 MB.');
      return;
    }

    setFileError3D('');
    setLogoUrl(URL.createObjectURL(selectedFile));
  };

  const handleDownloadSnapshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `mockup-3d-${productType}.png`;
    link.click();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-8 h-125 md:h-150 w-full rounded-3xl border border-white/10 bg-zinc-950/80 relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-wider uppercase text-zinc-400">
          💡 Arrastra para rotar 360°
        </div>

        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />

          <Suspense fallback={null}>
            <Center>
              {productType === 'tshirt' ? (
                <ShirtModel color={itemColor} logoUrl={logoUrl} logoScale={logoScale} />
              ) : (
                <MugModel color={itemColor} logoUrl={logoUrl} logoScale={logoScale} />
              )}
            </Center>
          </Suspense>

          <OrbitControls enableZoom={true} minDistance={3} maxDistance={8} />
        </Canvas>

        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex justify-between items-center text-[11px] text-zinc-300">
          <span>
            {productType === 'tshirt' 
              ? `📐 Área de impresión frontal: 30 x 40 cm (Talla ${tshirtSize})` 
              : '📐 Área panorámica imprimible: 20 x 9.5 cm (11 oz)'}
          </span>
          <span className="text-red-400 font-semibold">PNG Transparente (Máx 5MB)</span>
        </div>
      </div>

      <div className="lg:col-span-4 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Producto</label>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setProductType('tshirt')} className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${productType === 'tshirt' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'}`}>
              Camiseta
            </button>
            <button type="button" onClick={() => setProductType('taza')} className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${productType === 'taza' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'}`}>
              Taza Cerámica
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Color del Producto</label>
          <div className="flex gap-3 items-center">
            {['#ffffff', '#000000', '#ef4444', '#1e3a8a', '#10b981', '#f59e0b'].map((c, i) => (
              <button key={i} onClick={() => setItemColor(c)} className={`w-7 h-7 rounded-full border border-white/20 transition-transform cursor-pointer ${itemColor === c ? 'scale-125 ring-2 ring-red-500' : ''}`} style={{ backgroundColor: c }} />
            ))}
            <input type="color" value={itemColor} onChange={(e) => setItemColor(e.target.value)} className="w-8 h-8 rounded-xl bg-transparent border-0 cursor-pointer" />
          </div>
        </div>

        {productType === 'tshirt' && (
          <div>
            <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Talla Disponibles</label>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button key={size} onClick={() => setTshirtSize(size)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${tshirtSize === size ? 'bg-white text-black border-white' : 'border-white/10 opacity-60'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Cargar Logo (PNG Transparente)</label>
          <input type="file" accept="image/png" onChange={handleFileUpload3D} className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" />
          {fileError3D && <p className="text-[11px] text-red-500 font-semibold mt-1">{fileError3D}</p>}
        </div>

        {logoUrl && (
          <div>
            <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Escala del Arte</label>
            <input type="range" min="0.5" max="1.8" step="0.1" value={logoScale} onChange={(e) => setLogoScale(parseFloat(e.target.value))} className="w-full accent-red-600 cursor-pointer" />
          </div>
        )}

        <div className="pt-4 border-t border-white/10 space-y-3">
          <button type="button" onClick={handleDownloadSnapshot} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer">
            📷 Descargar Foto de esta Vista
          </button>

          <Link href="/cotizacion" className="w-full block text-center py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xl transition-all cursor-pointer">
            ✨ ¿Quieres mejorar tu arte o producirlo físicamente? Cotiza Aquí
          </Link>
        </div>
      </div>
    </div>
  );
}