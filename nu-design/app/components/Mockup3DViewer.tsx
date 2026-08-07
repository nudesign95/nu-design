'use client';
import { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Decal, Center } from '@react-three/drei';

// Modelo de Taza usando mug.glb
function MugModel({ color, logoUrl, logoScale }: { color: string; logoUrl: string | null; logoScale: number }) {
  const { nodes } = useGLTF('/models/mug.glb') as any;
  const texture = useTexture(logoUrl || '/placeholder-logo.png');

  // Selecciona la malla principal del archivo GLB
  const meshGeometry = nodes.Mug?.geometry || nodes.mesh_0?.geometry || (Object.values(nodes) as any[]).find((n) => n.isMesh)?.geometry;

  return (
    <mesh geometry={meshGeometry} castShadow receiveShadow dispose={null}>
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.05} />
      <Decal
        position={[0, 0, 0.9]}
        rotation={[0, 0, 0]}
        scale={[0.8 * logoScale, 0.8 * logoScale, 0.8 * logoScale]}
      >
        <meshBasicMaterial map={texture} transparent depthTest={true} polygonOffset polygonOffsetFactor={-1} />
      </Decal>
    </mesh>
  );
}

// Modelo de Camiseta usando tshirt.glb
function ShirtModel({ color, logoUrl, logoScale }: { color: string; logoUrl: string | null; logoScale: number }) {
  const { nodes } = useGLTF('/models/tshirt.glb') as any;
  const texture = useTexture(logoUrl || '/placeholder-logo.png');

  const meshGeometry = nodes.Shirt?.geometry || nodes.mesh_0?.geometry || (Object.values(nodes) as any[]).find((n) => n.isMesh)?.geometry;

  return (
    <mesh geometry={meshGeometry} castShadow receiveShadow dispose={null}>
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
      <Decal
        position={[0, 0.2, 0.15]}
        rotation={[0, 0, 0]}
        scale={[0.5 * logoScale, 0.5 * logoScale, 0.5 * logoScale]}
      >
        <meshBasicMaterial map={texture} transparent depthTest={true} polygonOffset polygonOffsetFactor={-1} />
      </Decal>
    </mesh>
  );
}

export default function Mockup3DViewer() {
  const [productType, setProductType] = useState<'tshirt' | 'taza'>('taza');
  const [itemColor, setItemColor] = useState('#ffffff');
  const [tshirtSize, setTshirtSize] = useState('M');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(1);
  const [fileError, setFileError] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/png') {
      setFileError('Solo se permiten archivos en formato PNG transparente.');
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 5) {
      setFileError('El archivo supera el peso máximo de 5 MB.');
      return;
    }

    setFileError('');
    setLogoUrl(URL.createObjectURL(file));
  };

  const handleDownloadSnapshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `mockup-nudesign-${productType}.png`;
    link.click();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      {/* Visualizador 3D */}
      <div className="lg:col-span-8 h-125 md:h-150 w-full rounded-3xl border border-white/10 bg-zinc-950/80 relative overflow-hidden flex items-center justify-center">
        
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-wider uppercase text-zinc-400">
          💡 Haz clic y arrastra para rotar 360°
        </div>

        <Canvas ref={canvasRef} camera={{ position: [0, 0, 3], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />

          <Suspense fallback={null}>
            <Center>
              {productType === 'taza' ? (
                <MugModel color={itemColor} logoUrl={logoUrl} logoScale={logoScale} />
              ) : (
                <ShirtModel color={itemColor} logoUrl={logoUrl} logoScale={logoScale} />
              )}
            </Center>
          </Suspense>

          <OrbitControls enableZoom={true} minDistance={1.5} maxDistance={6} />
        </Canvas>

        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex justify-between items-center text-[11px] text-zinc-300">
          <span>
            {productType === 'tshirt' 
              ? `📐 Área de impresión frontal: 30 x 40 cm (Talla ${tshirtSize})` 
              : '📐 Área panorámica imprimible: 20 x 9.5 cm (11 oz)'}
          </span>
          <span className="text-red-400 font-semibold">Formato: PNG Transparente (Máx 5MB)</span>
        </div>
      </div>

      {/* Controles de Configuración */}
      <div className="lg:col-span-4 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
        
        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Producto</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={() => setProductType('taza')} 
              className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${productType === 'taza' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'}`}
            >
              Taza Cerámica
            </button>
            <button 
              type="button" 
              onClick={() => setProductType('tshirt')} 
              className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${productType === 'tshirt' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'}`}
            >
              Camiseta
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
                className={`w-7 h-7 rounded-full border border-white/20 transition-transform cursor-pointer ${itemColor === c ? 'scale-125 ring-2 ring-red-500' : ''}`}
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

        {productType === 'tshirt' && (
          <div>
            <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Talla Disponibles</label>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button 
                  key={size} 
                  onClick={() => setTshirtSize(size)} 
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${tshirtSize === size ? 'bg-white text-black border-white' : 'border-white/10 opacity-60'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Cargar Arte / Logo (PNG Transparente)</label>
          <input 
            type="file" 
            accept="image/png" 
            onChange={handleFileUpload} 
            className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" 
          />
          {fileError && <p className="text-[11px] text-red-500 font-semibold mt-1">{fileError}</p>}
        </div>

        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Escala del Arte</label>
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

        <div className="pt-4 border-t border-white/10 space-y-3">
          <button 
            type="button" 
            onClick={handleDownloadSnapshot} 
            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            📷 Descargar Foto de esta Vista
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