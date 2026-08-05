'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function ReembolsosPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('nu_theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col justify-between ${theme === 'dark' ? 'bg-[#050000] text-zinc-100' : 'bg-[#e8e2dc] text-zinc-800'}`}>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-8 inline-block hover:underline">
          ← Volver al Inicio
        </Link>
        <h1 className="text-3xl md:text-5xl font-light mb-2">Política de Pagos y <span className="text-red-500 font-semibold">Reembolsos</span></h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Última actualización: Agosto de 2026[cite: 5]</p>
        
        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <p>Todos los proyectos requieren un anticipo (generalmente del 30%, 50% o según el plan seleccionado) para reservar la agenda e iniciar el trabajo creativo[cite: 5].</p>
          <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider pt-2">Política de No Reembolso tras inicio</h3>
          <p>Debido a que todos los servicios son personalizados y el tiempo invertido en planificación y diseño no puede recuperarse, una vez iniciado el proyecto, el anticipo no será reembolsable[cite: 5].</p>
          <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider pt-2">Pago Final</h3>
          <p>La entrega de archivos finales y editables estará condicionada al pago del 100% del saldo pendiente[cite: 5].</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}