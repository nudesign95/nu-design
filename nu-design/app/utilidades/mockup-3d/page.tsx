'use client';
import Link from 'next/link';
import VerificadorDPI from '../../components/Mockup3DViewer';
import Footer from '../../components/Footer';

export default function VerificadorDPIPage() {
  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 flex flex-col justify-between font-sans">
      
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-white/10 z-20">
        <Link href="/" className="font-extrabold text-xs tracking-[0.25em] uppercase text-zinc-200">
          AGENCY
        </Link>
        <Link href="/utilidades" className="text-xs uppercase tracking-widest text-red-500 font-semibold hover:underline">
          ← Volver a Utilidades
        </Link>
      </header>

      {/* Contenido Principal */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider">
            Verificador de Resolución / DPI de Impresión
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Sube tu arte o fotografía para evaluar si tiene píxeles suficientes para imprimirse nítidamente sin pixelarse.
          </p>
        </div>

        <VerificadorDPI />
      </main>

      <Footer />
    </div>
  );
}