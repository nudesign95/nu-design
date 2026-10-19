'use client';

import { useState, useEffect, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useParams } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import { ShieldCheck, CheckCircle2, FileText, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import WordmarkLogo from '@/app/components/WordmarkLogo';

export default function PublicContractPage() {
  const params = useParams();
  const token = params.token as string;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);

  useEffect(() => {
    if (token) fetchContract();
  }, [token]);

  const fetchContract = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('token', token)
      .single();

    if (!error && data) {
      setContract(data);
      if (data.status !== 'Pendiente Firma') {
        setSignedSuccess(true);
      }
    }
    setLoading(false);
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSign = async () => {
    if (sigCanvas.current?.isEmpty()) {
      alert('Por favor, plasma tu firma en el recuadro antes de continuar.');
      return;
    }

    setSubmitting(true);
    try {
      // 1. Convertir la firma en DataURL PNG
      const signatureDataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');

      // 2. Subir imagen de firma a Supabase Storage
      const res = await fetch(signatureDataUrl!);
      const blob = await res.blob();
      const fileName = `signatures/${contract.id}_${Date.now()}.png`;

      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('store-previews')
        .upload(fileName, blob, { contentType: 'image/png' });

      if (uploadErr) throw uploadErr;

      const { data: publicUrl } = supabase.storage
        .from('store-previews')
        .getPublicUrl(uploadData.path);

      // 3. Actualizar contrato en la base de datos
      const { error: updateErr } = await supabase
        .from('contracts')
        .update({
          status: 'Pendiente Anticipo',
          signature_url: publicUrl.publicUrl,
          signed_at: new Date().toISOString(),
        })
        .eq('id', contract.id);

      if (updateErr) throw updateErr;

      setSignedSuccess(true);
    } catch (err: any) {
      alert(`Error al guardar la firma: ${err.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040001] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-[#040001] text-white flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold">Contrato no encontrado o enlace inválido</h1>
        <p className="text-xs text-zinc-400 mt-2">Verifica el enlace proporcionado por Nu-Design Agency.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center space-y-3 backdrop-blur-xl">
          <WordmarkLogo className="h-7 w-auto mx-auto" />
          <h1 className="text-lg font-black uppercase tracking-wider text-red-500">Contrato de Prestación de Servicios</h1>
          <p className="text-xs text-zinc-400">Emisión: {new Date(contract.created_at).toLocaleString('es-DO')}</p>
        </div>

        {/* Cuerpo del Contrato */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 text-xs leading-relaxed text-zinc-300 backdrop-blur-xl">
          
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-bold text-sm text-white uppercase mb-2">1. Las Partes</h2>
            <p><strong className="text-white">Prestador:</strong> Garic Edume / Nu-Design Agency (nudesign.agency)</p>
            <p><strong className="text-white">Cliente:</strong> {contract.client_name}</p>
            {contract.client_phone && <p><strong className="text-white">Teléfono:</strong> {contract.client_phone}</p>}
            {contract.client_email && <p><strong className="text-white">Correo:</strong> {contract.client_email}</p>}
            {contract.client_address && <p><strong className="text-white">Dirección:</strong> {contract.client_address}</p>}
          </div>

          <div className="border-b border-white/10 pb-4">
            <h2 className="font-bold text-sm text-white uppercase mb-2">2. Alcance del Proyecto</h2>
            <p className="bg-black/40 p-3 rounded-xl border border-white/10 text-white font-mono">{contract.project_type}</p>
            <p className="mt-2"><strong className="text-white">Plazo de Entrega:</strong> {contract.delivery_time} (Inicia tras recibir firma, anticipo e insumos requeridos).</p>
          </div>

          <div className="border-b border-white/10 pb-4 space-y-2">
            <h2 className="font-bold text-sm text-white uppercase mb-2">3. Condiciones Financieras</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Monto Total:</span>
                <span className="font-extrabold text-sm text-white">RD$ {parseFloat(contract.total_amount).toFixed(2)}</span>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Anticipo ({contract.advance_percent}%):</span>
                <span className="font-extrabold text-sm text-emerald-400">RD$ {parseFloat(contract.advance_amount).toFixed(2)}</span>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Restante ({100 - contract.advance_percent}%):</span>
                <span className="font-extrabold text-sm text-red-400">RD$ {parseFloat(contract.remaining_amount).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-[11px] text-red-400 font-semibold pt-1">
              * POLÍTICA DE NO DEVOLUCIÓN: El anticipo del {contract.advance_percent}% NO ES REEMBOLSABLE una vez transcurridas 24 horas del pago o iniciado el trabajo.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-sm text-white uppercase">4. Cláusulas Importantes</h2>
            <ul className="list-disc pl-4 space-y-2 text-[11px]">
              <li><strong>Cancelación Gratuita:</strong> Reembolso del 100% si el cliente solicita cancelación en menos de 24 horas tras el pago y antes de iniciar trabajos.</li>
              <li><strong>Retraso de Insumos:</strong> El cliente debe enviar imágenes/recursos en máximo {contract.resource_limit_days} días hábiles. Superado este plazo, el cronograma se congela.</li>
              <li><strong>Contratiempos de la Agencia:</strong> En caso de fuerza mayor interna, se notificará al cliente con una nueva fecha prioritaria.</li>
              <li><strong>Derecho de Exhibición:</strong> Nu-Design Agency se reserva el derecho de publicar el trabajo terminado en su portafolio salvo acuerdo escrito de confidencialidad (NDA).</li>
            </ul>
          </div>

          {/* Lienzo de Firma */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h2 className="font-bold text-sm text-white uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              Firma Digital del Cliente (Obligatoria)
            </h2>

            {signedSuccess ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-emerald-400 text-sm">Contrato Firmado Correctamente</h3>
                <p className="text-[11px] text-zinc-400">Gracias por confirmar las condiciones. Nu-Design Agency se pondrá en contacto para iniciar los trabajos.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-2 border border-zinc-300">
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ className: 'w-full h-40 rounded-xl cursor-crosshair' }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-xs text-zinc-400 hover:text-white underline"
                  >
                    Borrar Firma
                  </button>
                  <button
                    type="button"
                    onClick={handleSign}
                    disabled={submitting}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirmar y Firmar Contrato'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}