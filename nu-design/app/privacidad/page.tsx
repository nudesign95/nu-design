'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacidadPage() {
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
        <h1 className="text-3xl md:text-5xl font-light mb-2">Política de <span className="text-red-500 font-semibold">Privacidad</span></h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Última actualización: Agosto de 2026[cite: 5]</p>
        
        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <p>En NU-DESIGN nos comprometemos a recopilar únicamente la información estrictamente necesaria para atender solicitudes de cotización, responder consultas y desarrollar proyectos[cite: 5]. Si un dato no es necesario, preferimos no solicitarlo ni conservarlo[cite: 5].</p>
          
          <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider pt-2">Información que recopilamos</h3>
          <p>Podremos solicitar: Nombre, Apellidos, Empresa, Correo Electrónico, Teléfono y detalles del proyecto[cite: 5]. No solicitamos información innecesaria[cite: 5].</p>

          <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider pt-2">Finalidad y Seguridad</h3>
          <p>La información recopilada se utiliza exclusivamente para elaborar cotizaciones, responder consultas y ejecutar el contrato[cite: 5]. No vendemos ni alquilamos datos personales a terceros[cite: 5].</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}