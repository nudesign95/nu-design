'use client';
import Link from 'next/link';
import Image from 'next/image';
import VerificadorDPI from '../../components/Mockup3DViewer';
import Footer from '../../components/Footer';

export default function VerificadorDPIPage() {
  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 flex flex-col justify-between font-sans selection:bg-red-600 selection:text-white">
      
      {/* Header Oficial con Wordmark SVG */}
      <header className="w-full px-6 py-5 flex justify-between items-center border-b border-white/10 bg-zinc-950/80 backdrop-blur-2xl sticky top-0 z-50">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/wordmark-blanco.svg"
            alt="Logo Oficial"
            width={150}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <Link href="/utilidades" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-red-500 font-bold transition-all flex items-center gap-1.5">
          ← Volver a Utilidades
        </Link>
      </header>

      {/* Contenido Principal con Ambient Glow */}
      <main className="w-full max-w-7xl mx-auto px-4 py-10 flex-1 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block">
            Engine v2.0 • Quality Assurance
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            Verificador de Resolución / DPI
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Diagnóstico instantáneo de densidad de píxeles para artes gráficos y archivos de imprenta.
          </p>
        </div>

        <VerificadorDPI />
      </main>

      <Footer />
    </div>
  );
}