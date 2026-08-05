'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Cotizacion {
  id: string;
  cliente: string;
  empresa: string;
  contacto: string;
  email: string;
  servicio: string;
  tiempo: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  motivoRechazo?: string;
  fecha: string;
}

const MOTIVOS_RECHAZO = [
  "El tiempo solicitado no está disponible en nuestra agenda actual.",
  "El alcance del proyecto requiere un presupuesto o tiempo mayor.",
  "Actualmente no contamos con disponibilidad para este tipo de servicio.",
  "La información proporcionada no es suficiente para procesar la orden."
];

export default function InventarioPage() {
  const router = useRouter();
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([
    {
      id: 'COT-101',
      cliente: 'Garic Edume',
      empresa: 'No especificada',
      contacto: '+1 829 460 8316',
      email: 'designmasterprint06@gmail.com',
      servicio: 'Papelería Corporativa - Tarjeta de Presentación',
      tiempo: '1 día hábil',
      estado: 'Pendiente',
      fecha: '2026-08-05'
    }
  ]);

  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);
  const [motivoSeleccionado, setMotivoSeleccionado] = useState(MOTIVOS_RECHAZO[0]);
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('nu_admin_session');
    if (session !== 'authenticated') {
      router.push('/iniciarsesion');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('nu_admin_session');
    router.push('/iniciarsesion');
  };

  const handleAprobar = (cot: Cotizacion) => {
    const updated = cotizaciones.map(c => c.id === cot.id ? { ...c, estado: 'Aprobada' as const } : c);
    setCotizaciones(updated);

    const mensajeAprobado = 
`🎉 *SOLICITUD APROBADA*
*NU-DESIGN*

Hola, *${cot.cliente}*.

Nos complace informarte que hemos revisado tu solicitud de *${cot.servicio}* y confirmamos que podemos asumir tu proyecto dentro del tiempo estimado.

━━━━━━━━━━━━━━━━━━
**PRÓXIMO PASO**

Para formalizar el inicio del proyecto, es necesario completar y firmar digitalmente el *Contrato de Prestación de Servicios*.

📄 Firma tu contrato aquí:
https://nudesign.agency/contrato/firmar?id=${cot.id}

━━━━━━━━━━━━━━━━━━
**¿Qué sucede después?**

• Recibiremos automáticamente tu contrato firmado.
• Confirmaremos el inicio del proyecto.
• Te enviaremos la cotización final y las instrucciones para el pago inicial (si aplica).
• Una vez confirmado el pago, comenzaremos el desarrollo de tu diseño.

Gracias por confiar en *NU-DESIGN*. Será un placer trabajar contigo.`;

    window.open(`https://wa.me/${cot.contacto.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(mensajeAprobado)}`, '_blank');
  };

  const handleConfirmarRechazo = () => {
    if (!selectedCotizacion) return;

    const updated = cotizaciones.map(c => 
      c.id === selectedCotizacion.id 
        ? { ...c, estado: 'Rechazada' as const, motivoRechazo: motivoSeleccionado } 
        : c
    );
    setCotizaciones(updated);
    setShowRejectModal(false);

    const mensajeRechazado = 
`❌ *ACTUALIZACIÓN DE COTIZACIÓN - NU-DESIGN*

Hola *${selectedCotizacion.cliente}*, gracias por cotizar con nosotros.

Lamentablemente en este momento no podemos procesar tu solicitud por el siguiente motivo:
📌 *Motivo:* ${motivoSeleccionado}

Quedamos a tu disposición para futuras consultas o para ajustar los tiempos de tu proyecto. ¡Gracias!`;

    window.open(`https://wa.me/${selectedCotizacion.contacto.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(mensajeRechazado)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 p-6 md:p-10 font-sans">
      
      {/* Encabezado Admin */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">Panel Propietario Exclusivo</span>
          <h1 className="text-2xl md:text-3xl font-light">Inventario de <span className="font-bold text-red-500">Cotizaciones</span></h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-xs text-zinc-400">Garic Edume (Admin)</span>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-zinc-800 hover:bg-red-600 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Tabla de Cotizaciones */}
      <div className="max-w-7xl mx-auto pt-8">
        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-zinc-950/60 backdrop-blur-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 border-b border-white/10 text-zinc-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Cliente / Empresa</th>
                <th className="p-4">Contacto</th>
                <th className="p-4">Servicio</th>
                <th className="p-4">Tiempo Estimado</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cotizaciones.map((cot) => (
                <tr key={cot.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-red-400">{cot.id}</td>
                  <td className="p-4">
                    <span className="font-semibold block text-zinc-200">{cot.cliente}</span>
                    <span className="text-[10px] text-zinc-500">{cot.empresa}</span>
                  </td>
                  <td className="p-4">
                    <span className="block">{cot.contacto}</span>
                    <span className="text-[10px] text-zinc-500">{cot.email}</span>
                  </td>
                  <td className="p-4">{cot.servicio}</td>
                  <td className="p-4">{cot.tiempo}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      cot.estado === 'Aprobada' ? 'bg-emerald-500/20 text-emerald-400' :
                      cot.estado === 'Rechazada' ? 'bg-red-500/20 text-red-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {cot.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {cot.estado === 'Pendiente' && (
                      <>
                        <button 
                          onClick={() => handleAprobar(cot)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold cursor-pointer"
                        >
                          Aprobar
                        </button>
                        <button 
                          onClick={() => { setSelectedCotizacion(cot); setShowRejectModal(true); }}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[11px] font-semibold cursor-pointer"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {cot.estado === 'Aprobada' && (
                      <span className="text-[10px] text-emerald-400 font-semibold">Enlace Enviado</span>
                    )}
                    {cot.estado === 'Rechazada' && (
                      <span className="text-[10px] text-red-400 font-semibold">Notificado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Motivo de Rechazo */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-950 border border-white/20 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-red-500 uppercase">Seleccionar Motivo de Rechazo</h3>
            <p className="text-xs text-zinc-400">Elige la razón para generar la respuesta automática por WhatsApp:</p>

            <select 
              value={motivoSeleccionado} 
              onChange={(e) => setMotivoSeleccionado(e.target.value)}
              className="w-full bg-zinc-900 border border-white/20 rounded-xl p-3 text-xs text-white outline-none"
            >
              {MOTIVOS_RECHAZO.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>

            <div className="flex justify-end space-x-3 pt-2">
              <button 
                onClick={() => setShowRejectModal(false)} 
                className="px-4 py-2 border border-white/20 rounded-full text-xs hover:bg-white/10"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmarRechazo} 
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-semibold"
              >
                Confirmar y Responder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}