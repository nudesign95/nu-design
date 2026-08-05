'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function AvisoLegalPage() {
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
        <h1 className="text-3xl md:text-5xl font-light mb-6">Aviso <span className="text-red-500 font-semibold">Legal</span></h1>
        
        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <p><strong>Bienvenido a NU-DESIGN.</strong></p>
          <p>Mi nombre es <strong>Garic Edume</strong>, diseñador gráfico profesional, diseñador web y desarrollador junior[cite: 5]. Trabajo como freelancer independiente, ofreciendo soluciones creativas para personas, emprendedores y empresas que buscan desarrollar o fortalecer su identidad visual y presencia digital[cite: 5].</p>
          <p>NU-DESIGN es mi marca personal, creada con el objetivo de ofrecer servicios profesionales de diseño y desarrollo, manteniendo un trato directo, transparente y personalizado con cada cliente[cite: 5].</p>
          
          <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider pt-2">Servicios que ofrezco</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Diseño de logotipos e identidad visual[cite: 5].</li>
            <li>Branding y línea gráfica[cite: 5].</li>
            <li>Diseño para redes sociales[cite: 5].</li>
            <li>Diseño de material publicitario digital e impreso[cite: 5].</li>
            <li>Diseño de empaques (Packaging)[cite: 5].</li>
            <li>Diseño editorial[cite: 5].</li>
            <li>Diseño de menús y catálogos[cite: 5].</li>
            <li>Diseño de tarjetas de presentación y papelería corporativa[cite: 5].</li>
            <li>Diseño y desarrollo de sitios web[cite: 5].</li>
            <li>Landing Pages[cite: 5].</li>
            <li>Diseño de interfaces (UI)[cite: 5].</li>
            <li>Desarrollo web básico y soporte técnico[cite: 5].</li>
            <li>Asesoría en imagen de marca y presencia digital[cite: 5].</li>
          </ul>

          <p>Este sitio web tiene como finalidad presentar mi portafolio profesional, mostrar algunos de mis trabajos, informar sobre los servicios que ofrezco y facilitar el contacto con clientes interesados en contratar mis servicios[cite: 5].</p>
          <p>Actualmente, NU-DESIGN opera como una actividad profesional independiente (freelance) y no constituye una sociedad comercial registrada[cite: 5]. Todos los servicios son prestados directamente por mí, salvo que se indique expresamente lo contrario en un proyecto específico[cite: 5].</p>
          
          <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider pt-2">Contacto Directo</h3>
          <p>
            • WhatsApp: +1 (829) 460-8316[cite: 5]<br />
            • Correo electrónico: nubellstore@gmail.com[cite: 5]
          </p>
          <p>Toda contratación de servicios estará sujeta a los Términos y Condiciones, la Política de Privacidad, la Política de Pagos y Reembolsos y demás documentos legales publicados en este sitio web, los cuales forman parte integral de la relación entre el cliente y NU-DESIGN[cite: 5].</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}