'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function TerminosPage() {
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
        <h1 className="text-3xl md:text-5xl font-light mb-2">Términos y <span className="text-red-500 font-semibold">Condiciones</span></h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Última actualización: Agosto de 2026[cite: 5]</p>
        
        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">1. Introducción</h3>
            <p>El presente documento establece los Términos y Condiciones que regulan la contratación de los servicios ofrecidos por Garic Edume bajo la marca comercial NU-DESIGN[cite: 5]. Al contratar cualquiera de los servicios, el cliente declara haber leído, comprendido y aceptado íntegramente los presentes Términos y Condiciones[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">2. Objeto del Servicio</h3>
            <p>NU-DESIGN ofrece servicios profesionales relacionados con diseño gráfico, diseño web, branding y desarrollo digital[cite: 5]. Los servicios de impresión son gestionados únicamente cuando hayan sido especificados dentro del presupuesto aprobado por el cliente[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">3. Naturaleza del Servicio</h3>
            <p>El cliente reconoce que los servicios corresponden a trabajos creativos y personalizados[cite: 5]. Por esta razón, los tiempos de desarrollo, las propuestas creativas y los resultados podrán variar dependiendo de la complejidad de cada proyecto[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">4. Solicitud de Cotizaciones</h3>
            <p>Toda cotización presentada por NU-DESIGN tendrá una vigencia de treinta (30) días calendario[cite: 5]. Los precios podrán variar cuando el cliente solicite modificaciones importantes en el alcance del trabajo[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">5. Inicio del Proyecto</h3>
            <p>El desarrollo del proyecto comenzará únicamente cuando el cliente haya aceptado el presupuesto, se haya proporcionado la información necesaria y se haya recibido el pago inicial acordado[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">6. Información proporcionada por el Cliente</h3>
            <p>El cliente será responsable de proporcionar toda la información necesaria (textos, fotos, marcas)[cite: 5]. NU-DESIGN no será responsable por retrasos ocasionados por la entrega tardía o incompleta de dicha información[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">7. Comunicación entre las Partes</h3>
            <p>Toda comunicación deberá realizarse mediante los canales oficiales (WhatsApp, correo electrónico, formularios del sitio web)[cite: 5]. Las instrucciones importantes deberán quedar registradas por escrito[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">8. Aceptación de los Términos</h3>
            <p>La contratación de cualquier servicio implica la aceptación total de los presentes Términos y Condiciones[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">9. Cambios en el Concepto del Proyecto</h3>
            <p>En proyectos pequeños (redes sociales, tarjetas, flyers, banners, menús), NU-DESIGN podrá aceptar un cambio completo de concepto sin costo adicional si el proyecto aún se encuentra en una etapa temprana y existe tiempo suficiente[cite: 5]. Cuando el nuevo concepto implique rehacer una parte importante, se acordará un ajuste de tiempo y/o presupuesto[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">10. Cancelación del Proyecto</h3>
            <p>El cliente podrá solicitar la cancelación antes del inicio del proceso creativo con opción de reembolso[cite: 5]. Una vez iniciado el trabajo, el anticipo dejará de ser reembolsable debido al tiempo e investigación invertidos[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">11. Propiedad Intelectual y Derechos de Uso</h3>
            <p>Una vez completado el pago total, el cliente obtendrá los derechos de uso del diseño final[cite: 5]. NU-DESIGN conservará el derecho de incluir el proyecto dentro de su portafolio profesional, salvo solicitud expresa de confidencialidad del cliente[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">12. Incumplimiento de Pago</h3>
            <p>Los archivos finales y editables serán entregados únicamente cuando el cliente haya completado el pago total[cite: 5]. Si existe un saldo pendiente, NU-DESIGN podrá suspender la entrega[cite: 5].</p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider mb-2">13. Conservación de Archivos</h3>
            <p>Una vez entregado el proyecto, NU-DESIGN conservará los archivos editables durante aproximadamente una (1) semana[cite: 5]. Se recomienda al cliente respaldar sus archivos una vez recibidos[cite: 5].</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}