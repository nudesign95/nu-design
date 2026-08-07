'use client';
import { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Decal, Environment, Center } from '@react-three/drei';

// Componente para cargar el modelo GLB de la Taza
function MugModel({ color, logoUrl, logoScale }: { color: string; logoUrl: string | null; logoScale: number }) {
  const { nodes, materials } = useGLTF('/models/mug.glb') as any;
  const texture = useTexture(logoUrl || '/placeholder-logo.png');

  // Identificar la malla principal (si tu objeto en el GLB tiene otro nombre, se ajusta aquí)
  const meshGeometry = nodes.Mug?.geometry || nodes.mesh_0?.geometry || (Object.values(nodes) as any[]).find((n) => n.isMesh)?.geometry;
  return (
    <mesh geometry={meshGeometry} castShadow receiveShadow dispose={null}>
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.05} />
      {logoUrl && (
        <Decal
          position={[0, 0, 0.9]} 
          rotation={[0, 0, 0]} 
          scale={[0.8 * logoScale, 0.8 * logoScale, 0.8 * logoScale]} 
        >
          <meshBasicMaterial map={texture} transparent depthTest={true} polygonOffset polygonOffsetFactor={-1} />
        </Decal>
      )}
    </mesh>
  );
}

// Componente para cargar el modelo GLB de la Camiseta
function ShirtModel({ color, logoUrl, logoScale }: { color: string; logoUrl: string | null; logoScale: number }) {
  const { nodes } = useGLTF('/models/tshirt.glb') as any;
  const texture = useTexture(logoUrl || '/placeholder-logo.png');

  const meshGeometry = nodes.Shirt?.geometry || nodes.mesh_0?.geometry || (Object.values(nodes) as any[]).find((n) => n.isMesh)?.geometry;

  return (
    <mesh geometry={meshGeometry} castShadow receiveShadow dispose={null}>
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      {logoUrl && (
        <Decal
          position={[0, 0.2, 0.15]} 
          rotation={[0, 0, 0]} 
          scale={[0.5 * logoScale, 0.5 * logoScale, 0.5 * logoScale]} 
        >
          <meshBasicMaterial map={texture} transparent depthTest={true} polygonOffset polygonOffsetFactor={-1} />
        </Decal>
      )}
    </mesh>
  );
}

export default function Mockup3DViewer() {
  const [productType, setProductType] = useState<'tshirt' | 'taza'>('taza');
  const [itemColor, setItemColor] = useState('#ffffff');
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
      
      {/* Canvas 3D con fondo transparente tipo checkerboard */}
     
        
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-wider uppercase text-zinc-400">
          💡 Haz clic y arrastra para rotar 360°
        </div> <div className="lg:col-span-8 h-125 md:h-150 w-full rounded-3xl border border-white/10 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[16px_16px] bg-zinc-950 relative overflow-hidden flex items-center justify-center">

        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.5} />
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <Center>
              {productType === 'taza' ? (
                <MugModel color={itemColor} logoUrl={logoUrl} logoScale={logoScale} />
              ) : (
                <ShirtModel color={itemColor} logoUrl={logoUrl} logoScale={logoScale} />
              )}
            </Center>
          </Suspense>

          <OrbitControls enableZoom={true} minDistance={1.5} maxDistance={5} />
        </Canvas>
      </div>

      {/* UI Lateral estilo SaaS */}
      <div className="lg:col-span-4 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
        
        {/* Drag & Drop Carga de Arte */}
        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Subir Arte (PNG Transparente)</label>
          <div className="border-2 border-dashed border-white/20 hover:border-red-500/50 rounded-2xl p-6 text-center transition-all bg-zinc-950/40 relative">
            <input type="file" accept="image/png" onChange={handleFileUpload3D} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <span className="text-3xl block mb-2">🖼️</span>
            <p className="text-xs text-zinc-300 font-semibold">Haz clic para subir imagen</p>
            <p className="text-[10px] text-zinc-500 mt-1">PNG Transparente (Máx. 5MB)</p>
          </div>
          {fileError3D && <p className="text-[11px] text-red-500 font-semibold mt-1">{fileError3D}</p>}
        </div>

        {/* Producto */}
        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Producto</label>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setProductType('taza')} className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${productType === 'taza' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'}`}>
              Taza Cerámica
            </button>
            <button type="button" onClick={() => setProductType('tshirt')} className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${productType === 'tshirt' ? 'bg-red-600 border-red-500 text-white' : 'border-white/10 opacity-70'}`}>
              Camiseta
            </button>
          </div>
        </div>

        {/* Color del Objeto */}
        <div>
          <label className="text-xs uppercase font-semibold text-zinc-400 block mb-2">Color del Mockup</label>
          <div className="flex gap-3 items-center">
            {['#ffffff', '#000000', '#ef4444', '#1e3a8a', '#10b981', '#f59e0b'].map((c, i) => (
              <button key={i} onClick={() => setItemColor(c)} className={`w-7 h-7 rounded-full border border-white/20 transition-transform cursor-pointer ${itemColor === c ? 'scale-125 ring-2 ring-red-500' : ''}`} style={{ backgroundColor: c }} />
            ))}
            <input type="color" value={itemColor} onChange={(e) => setItemColor(e.target.value)} className="w-8 h-8 rounded-xl bg-transparent border-0 cursor-pointer" />
          </div>
        </div>

        {/* Tamaño del Logo */}
        {logoUrl && (
          <div>
            <label className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Ajustar Escala del Logo</label>
            <input type="range" min="0.5" max="2" step="0.1" value={logoScale} onChange={(e) => setLogoScale(parseFloat(e.target.value))} className="w-full accent-red-600 cursor-pointer" />
          </div>
        )}

        {/* Acciones */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <button type="button" onClick={handleDownloadSnapshot} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer">
            📷 Descargar Vista Previa
          </button>

          <Link href="/cotizacion" className="w-full block text-center py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xl transition-all cursor-pointer">
            ✨ Cotizar este Diseño
          </Link>
        </div>

      </div>

    </div>
  );
}