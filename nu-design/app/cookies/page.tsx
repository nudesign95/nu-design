'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function CookiesPage() {
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
          Política de <span className="text-red-500 font-semibold">Cookies</span>
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Última actualización: Agosto de 2026[cite: 5]</p>

        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">1. ¿Qué son las cookies?</h3>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web almacena en el dispositivo del visitante cuando navega por sus páginas[cite: 5]. Estas permiten recordar determinada información sobre la visita, mejorar el funcionamiento del sitio, analizar su uso y, en algunos casos, mostrar contenido o publicidad más relevante[cite: 5]. Las cookies no dañan tu dispositivo ni permiten acceder a tu información personal sin tu consentimiento[cite: 5].
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">2. ¿Por qué utilizamos cookies?</h3>
            <p>
              En NU-DESIGN utilizamos cookies con el objetivo de ofrecer una mejor experiencia de navegación, conocer el rendimiento del sitio web y mejorar continuamente nuestros servicios[cite: 5]. Las cookies también nos ayudan a identificar errores, medir el tráfico del sitio y comprender cómo interactúan los visitantes con nuestras páginas[cite: 5]. Nuestro objetivo no es recopilar información personal innecesaria, sino entender cómo mejorar la experiencia de quienes visitan nuestro sitio[cite: 5].
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">3. Tipos de cookies que utilizamos</h3>
            
            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-200">Cookies esenciales</h4>
              <p>
                Son necesarias para el correcto funcionamiento del sitio web[cite: 5]. Permiten funciones básicas como la navegación entre páginas, la seguridad del sitio y el correcto funcionamiento de determinadas herramientas[cite: 5]. Estas cookies no pueden desactivarse sin afectar el funcionamiento del sitio[cite: 5].
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-200">Cookies de análisis</h4>
              <p>
                Utilizamos herramientas de análisis para conocer información estadística sobre el uso del sitio web[cite: 5]. Actualmente utilizamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 pt-1">
                <li>
                  <strong>Google Analytics:</strong> para conocer el número de visitantes, las páginas más consultadas, el tiempo de permanencia y otra información estadística que nos ayuda a mejorar continuamente el contenido y la experiencia del usuario[cite: 5].
                </li>
              </ul>
              <p className="pt-1">La información obtenida mediante estas herramientas se utiliza únicamente con fines analíticos y de mejora del sitio web[cite: 5].</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-200">Cookies de medición y gestión</h4>
              <p>Para administrar correctamente determinadas herramientas del sitio utilizamos:</p>
              <ul className="list-disc pl-5 space-y-1 pt-1">
                <li>
                  <strong>Google Tag Manager:</strong> facilita la gestión de etiquetas y herramientas de análisis sin modificar constantemente el código del sitio web[cite: 5]. Por sí mismo no recopila información personal del usuario, sino que permite gestionar otras herramientas[cite: 5].
                </li>
              </ul>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-200">Cookies publicitarias</h4>
              <p>Con fines de medición de campañas publicitarias y mejora de futuras estrategias de marketing, este sitio utiliza:</p>
              <ul className="list-disc pl-5 space-y-1 pt-1">
                <li>
                  <strong>Meta Pixel:</strong> herramienta proporcionada por Meta Platforms, Inc.[cite: 5] Permite conocer si una persona realizó determinadas acciones después de visitar este sitio web, como completar un formulario de contacto o solicitar una cotización[cite: 5]. NU-DESIGN no utiliza esta información para identificar personalmente a los visitantes[cite: 5].
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">4. Gestión de las cookies</h3>
            <p>
              La mayoría de los navegadores permiten aceptar, bloquear o eliminar las cookies en cualquier momento[cite: 5]. Si decides desactivar algunas cookies, determinadas funciones del sitio podrían no comportarse de la manera esperada[cite: 5]. También puedes eliminar las cookies almacenadas anteriormente desde la configuración de tu navegador[cite: 5].
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">5. Cookies de terceros</h3>
            <p>
              Algunas de las herramientas utilizadas en este sitio pertenecen a terceros (Google Analytics, Google Tag Manager, Meta Pixel), quienes cuentan con sus propias políticas de privacidad y tratamiento de datos[cite: 5]. NU-DESIGN no controla directamente el funcionamiento interno de estas plataformas, por lo que se recomienda consultar sus respectivas políticas[cite: 5].
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">6. Actualizaciones de esta Política</h3>
            <p>
              Esta Política de Cookies podrá ser modificada cuando resulte necesario para adaptarse a cambios tecnológicos, legales o a nuevas herramientas implementadas en el sitio web[cite: 5]. La versión publicada en este sitio será siempre la versión vigente[cite: 5].
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">7. Contacto</h3>
            <p>
              Si tienes preguntas relacionadas con esta Política de Cookies, puedes comunicarte con NU-DESIGN utilizando cualquiera de los canales oficiales publicados en este sitio web[cite: 5].
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}