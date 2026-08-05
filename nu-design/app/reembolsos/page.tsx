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
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 ${theme === 'dark' ? 'bg-[#050000] text-zinc-100' : 'bg-[#e8e2dc] text-zinc-800'}`}>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-8 inline-block hover:underline cursor-pointer">
          ← Volver al Inicio
        </Link>
        <h1 className="text-3xl md:text-5xl font-light mb-2">
          Política de Pagos y <span className="text-red-500 font-semibold">Reembolsos</span>
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Última actualización: Agosto de 2026[cite: 3]</p>

        <div className="space-y-6 text-sm font-light leading-relaxed opacity-90 border-t border-white/10 pt-6">
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">1. Introducción</h3>
            <p>La presente Política de Pagos y Reembolsos tiene como finalidad establecer las condiciones económicas bajo las cuales NU-DESIGN presta sus servicios profesionales[cite: 3]. Antes de realizar cualquier pago, el cliente deberá haber leído y aceptado los siguientes documentos cuando correspondan: Términos y Condiciones del Servicio, Política de Privacidad, Política de Cookies, Contrato de Prestación de Servicios (cuando aplique) y Presupuesto o cotización aprobada[cite: 3]. La realización de cualquier pago implica que el cliente comprende y acepta las condiciones aquí establecidas[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">2. Anticipo para el Inicio del Proyecto</h3>
            <p>Todos los proyectos requieren un anticipo para reservar espacio en la agenda de trabajo e iniciar el proceso creativo[cite: 3]. El porcentaje del anticipo dependerá del tipo de servicio contratado y será previamente informado al cliente dentro de la cotización correspondiente[cite: 3]. Generalmente, el anticipo podrá ser del 30 %, 50 % o cualquier otro porcentaje acordado entre ambas partes[cite: 3]. Hasta que dicho anticipo no sea recibido, NU-DESIGN no tendrá obligación de iniciar el proyecto ni de reservar fechas de entrega[cite: 3].</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">3. Métodos de Pago</h3>
            <p>Actualmente, NU-DESIGN acepta los siguientes métodos de pago:</p>
            <div className="space-y-1 pl-3">
              <h4 className="font-semibold text-zinc-200">Clientes de República Dominicana</h4>
              <p>Los pagos podrán realizarse mediante los métodos previamente indicados al cliente durante el proceso de contratación, incluyendo las plataformas y entidades financieras disponibles en el país[cite: 3].</p>
            </div>
            <div className="space-y-1 pl-3">
              <h4 className="font-semibold text-zinc-200">Clientes Internacionales</h4>
              <p>Actualmente los pagos internacionales se realizan exclusivamente mediante PayPal[cite: 3]. Si en el futuro se habilitan nuevos métodos de pago, estos serán informados oportunamente a los clientes[cite: 3].</p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">4. Política de Reembolsos</h3>
            <p>Debido a que todos los servicios prestados por NU-DESIGN son personalizados y desarrollados específicamente para cada cliente, el tiempo invertido en investigación, planificación, diseño y desarrollo constituye parte fundamental del servicio contratado[cite: 3]. Por esta razón, una vez iniciado el proyecto, el anticipo no será reembolsable[cite: 3]. El anticipo no representa únicamente el inicio del diseño, sino también la reserva de tiempo dentro de la agenda de trabajo, la planificación del proyecto, el análisis de la información proporcionada y el proceso creativo desarrollado desde el primer momento[cite: 3]. En consecuencia, si el cliente decide cancelar el proyecto después de iniciado el trabajo por motivos personales, comerciales, económicos o cualquier otra razón ajena a NU-DESIGN, no procederá el reembolso del anticipo realizado[cite: 3]. Esta política existe para proteger el tiempo profesional invertido en cada proyecto, ya que dicho tiempo no puede recuperarse ni reutilizarse posteriormente[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">5. Cancelaciones Antes del Inicio del Proyecto</h3>
            <p>Si el cliente solicita cancelar el proyecto antes de que NU-DESIGN haya iniciado cualquier actividad relacionada con el mismo y antes de haberse reservado formalmente el espacio de trabajo, ambas partes podrán evaluar la posibilidad de realizar un reembolso total o parcial, según las circunstancias particulares del caso[cite: 3]. Cada solicitud será analizada individualmente[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">6. Pago Final</h3>
            <p>La entrega del proyecto final estará condicionada al pago completo del monto pendiente[cite: 3]. Mientras exista un saldo pendiente, NU-DESIGN podrá retener la entrega de: Archivos editables, Versiones finales, Archivos en alta resolución, Material preparado para impresión, Accesos o cualquier otro elemento correspondiente al proyecto[cite: 3]. Una vez recibido el pago total, el cliente obtendrá acceso al material contratado conforme al presupuesto aprobado[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">7. Incumplimiento de Pago</h3>
            <p>Si el cliente incumple con el pago final dentro del plazo acordado, NU-DESIGN podrá suspender indefinidamente la entrega del proyecto hasta que el pago sea recibido en su totalidad[cite: 3]. La falta de pago no obliga a NU-DESIGN a continuar desarrollando el proyecto ni a entregar avances, archivos editables o cualquier material generado durante el proceso creativo[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">8. Gastos de Terceros</h3>
            <p>Cuando un proyecto requiera la adquisición de recursos externos (tipografías comerciales, fotografías de bancos de imágenes, plugins, dominios, hosting, licencias de software u otros servicios contratados específicamente), dichos gastos podrán ser asumidos por el cliente cuando así se haya indicado previamente en la cotización[cite: 3]. Estos pagos tampoco serán reembolsables una vez adquiridos, debido a que corresponden a servicios prestados por terceros[cite: 3].</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-red-500 uppercase tracking-wider">9. Modificaciones de esta Política</h3>
            <p>NU-DESIGN podrá actualizar la presente Política de Pagos y Reembolsos cuando resulte necesario para adaptarla a nuevos servicios, métodos de pago o cambios en la forma de prestación de sus servicios[cite: 3]. La versión publicada en este sitio web será siempre la versión vigente[cite: 3].</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}