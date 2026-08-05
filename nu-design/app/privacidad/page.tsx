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
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 ${theme === 'dark' ? 'bg-[#050000] text-zinc-100' : 'bg-[#e8e2dc] text-zinc-800'}`}>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-8 inline-block hover:underline cursor-pointer">
          ← Volver al Inicio
        </Link>
        <h1 className="text-3xl md:text-5xl font-light mb-2">
          Política de <span className="text-red-500 font-semibold">Privacidad</span>
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Última actualización: Agosto de 2026[cite: 3]</p>

        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">1. Introducción</h3>
            <p>En NU-DESIGN valoramos la privacidad de cada persona que visita nuestro sitio web o decide contratar nuestros servicios[cite: 3]. Por ello, nos comprometemos a recopilar únicamente la información estrictamente necesaria para atender solicitudes de cotización, responder consultas y desarrollar los proyectos contratados[cite: 3]. Nuestra política se basa en un principio muy sencillo: si un dato no es necesario para prestar un servicio, preferimos no solicitarlo ni conservarlo[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">2. Información que recopilamos</h3>
            <p>Dependiendo del tipo de solicitud realizada por el cliente, podremos solicitar únicamente la información necesaria para preparar una cotización o desarrollar un proyecto[cite: 3]. Entre estos datos pueden encontrarse:</p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li>Nombre[cite: 3].</li>
              <li>Apellidos[cite: 3].</li>
              <li>Nombre de la empresa (cuando aplique)[cite: 3].</li>
              <li>Correo electrónico[cite: 3].</li>
              <li>Número telefónico[cite: 3].</li>
              <li>Información relacionada con el proyecto solicitado[cite: 3].</li>
            </ul>
            <p className="pt-1">NU-DESIGN no solicita información personal innecesaria para la prestación de sus servicios[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">3. Finalidad del Tratamiento de los Datos</h3>
            <p>La información proporcionada será utilizada únicamente para:</p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li>Elaborar cotizaciones[cite: 3].</li>
              <li>Responder consultas[cite: 3].</li>
              <li>Mantener comunicación con el cliente[cite: 3].</li>
              <li>Preparar contratos cuando corresponda[cite: 3].</li>
              <li>Desarrollar el proyecto contratado[cite: 3].</li>
              <li>Brindar soporte relacionado con el servicio solicitado[cite: 3].</li>
            </ul>
            <p className="pt-1">Los datos personales nunca serán utilizados para fines distintos sin autorización del cliente[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">4. Conservación de la Información</h3>
            <p>NU-DESIGN procura conservar únicamente la información necesaria durante el tiempo indispensable para prestar el servicio contratado[cite: 3]. Cuando un cliente solicita una cotización que no llega a convertirse en un proyecto, la información será eliminada una vez finalizado el proceso de atención, salvo que exista una razón legítima para conservarla[cite: 3]. Una vez concluido un proyecto, los datos personales recopilados durante la cotización o contratación podrán ser eliminados cuando ya no sean necesarios para la relación profesional, sin perjuicio de que determinados documentos comerciales, contractuales o fiscales deban conservarse durante el tiempo exigido por la legislación aplicable o por motivos de respaldo administrativo[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">5. Compartición de Información</h3>
            <p>NU-DESIGN no vende, alquila ni comercializa la información personal de sus clientes[cite: 3]. La información únicamente podrá ser compartida cuando sea estrictamente necesario para prestar un servicio solicitado por el cliente o cuando exista una obligación legal que así lo requiera[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">6. Seguridad de la Información</h3>
            <p>Aunque ningún sistema es completamente infalible, NU-DESIGN adopta medidas razonables para proteger la información recibida frente a accesos no autorizados, pérdidas o usos indebidos[cite: 3]. Asimismo, se procura limitar al máximo la cantidad de información personal almacenada como una medida adicional de protección para nuestros clientes[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">7. Derechos del Cliente</h3>
            <p>El cliente podrá solicitar en cualquier momento información sobre los datos personales que haya proporcionado a NU-DESIGN, así como solicitar su corrección o eliminación cuando legalmente sea posible y dichos datos ya no sean necesarios para la prestación del servicio o el cumplimiento de obligaciones aplicables[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">8. Modificaciones de esta Política</h3>
            <p>NU-DESIGN podrá actualizar esta Política de Privacidad cuando resulte necesario para adaptarla a cambios legales, técnicos o en la forma de prestar sus servicios[cite: 3]. La versión publicada en este sitio web será siempre la versión vigente[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">9. Contacto</h3>
            <p>Si tienes preguntas relacionadas con esta Política de Privacidad o deseas realizar alguna consulta sobre el tratamiento de tu información, puedes comunicarte con NU-DESIGN a través de los canales oficiales publicados en este sitio web[cite: 3].</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}