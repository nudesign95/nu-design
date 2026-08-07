'use client';
import Link from 'next/link';
import Mockup3DViewer from '../../components/Mockup3DViewer';
import Footer from '../../components/Footer';

export default function Mockup3DPage() {
  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 flex flex-col justify-between font-sans">
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-white/10 z-20">
        <Link href="/" className="font-extrabold text-xs tracking-[0.25em] uppercase text-zinc-200">
          AGENCY
        </Link>
        <Link href="/utilidades" className="text-xs uppercase tracking-widest text-red-500 font-semibold hover:underline">
          ← Volver a Utilidades
        </Link>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <Mockup3DViewer />
      </main>

      <Footer />
    </div>
  );
}