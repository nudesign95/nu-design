'use client';
import Link from 'next/link';
import SimuladorColorCMYK from '@/app/components/SimuladorColorCMYK';
import Footer from '../../components/Footer';

export default function SimuladorColorPage() {
  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 flex flex-col justify-between font-sans selection:bg-red-600 selection:text-white">
      
      {/* Header Minimalista con Wordmark NU-DESIGN */}
      <header className="w-full px-6 py-5 flex justify-between items-center border-b border-white/10 bg-zinc-950/80 backdrop-blur-2xl sticky top-0 z-50">
        <Link href="/" className="font-black text-sm tracking-[0.3em] uppercase text-white hover:text-red-500 transition-colors">
          NU<span className="text-red-600">-</span>DESIGN
        </Link>
        <Link href="/utilidades" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-red-500 font-bold transition-all flex items-center gap-1.5">
          ← Volver a Utilidades
        </Link>
      </header>

      {/* Contenido Full Screen */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1 relative">
        <div className="mb-6 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block">
            Engine v2.5 • Gamut Color Converter
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            Simulador de Color: Pantalla (RGB) vs. Impresión (CMYK)
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Visualiza en tiempo real la variación de saturación y brillo que sufren los colores al convertirse de luz digital a tinta física.
          </p>
        </div>

        <SimuladorColorCMYK />
      </main>

      <Footer />
    </div>
  );
}