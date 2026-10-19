'use client';

import { useState, useEffect, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useParams } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import { ShieldCheck, CheckCircle2, AlertTriangle, Loader2, Printer } from 'lucide-react';
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
      const signatureDataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');

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

      const { error: updateErr } = await supabase
        .from('contracts')
        .update({
          status: 'Pendiente Anticipo',
          signature_url: publicUrl.publicUrl,
          signed_at: new Date().toISOString(),
        })
        .eq('id', contract.id);

      if (updateErr) throw updateErr;

      setContract((prev: any) => ({
        ...prev,
        status: 'Pendiente Anticipo',
        signature_url: publicUrl.publicUrl,
        signed_at: new Date().toISOString(),
      }));

      setSignedSuccess(true);
    } catch (err: any) {
      alert(`Error al guardar la firma: ${err.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintOrPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold">Contrato no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] py-8 px-2 md:px-4 text-zinc-900 font-serif">
      
      {/* Botones Flotantes (Ocultos en impresión/PDF) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden font-sans">
        <span className="text-xs text-zinc-400">Estado: <strong className="text-white">{contract.status}</strong></span>
        {signedSuccess && (
          <button
            onClick={handlePrintOrPDF}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar / Imprimir PDF Oficial</span>
          </button>
        )}
      </div>

      {/* DOCUMENTO FORMAL MODELO PAPEL A4 */}
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 shadow-2xl rounded-sm text-zinc-900 leading-relaxed text-sm print:p-0 print:shadow-none print:w-full print:max-w-none">
        
        {/* Logo Superior */}
        <div className="text-center pb-6 border-b border-zinc-200 mb-8">
          <WordmarkLogo className="h-8 w-auto mx-auto mb-3 text-black" />
          <h1 className="font-bold text-base md:text-lg tracking-wider text-zinc-900 uppercase">
            Contrato de Prestación de Servicios de Diseño & Desarrollo
          </h1>
          <p className="text-xs text-zinc-500 font-sans mt-1">
            Código Registro / Token: <span className="font-mono font-bold text-black">{contract.token}</span> | Emisión: {new Date(contract.created_at).toLocaleDateString('es-DO')}
          </p>
        </div>

        {/* Encabezado y Partes */}
        <div className="space-y-6 text-justify">
          <p>
            <strong>ENTRE: DE UNA PARTE</strong>, la empresa <strong>NU-DESIGN AGENCY / GARIC EDUME</strong>, representada por su titular Garic Edume, con domicilio social en Santo Domingo, República Dominicana, quien en lo que sigue del presente documento se denominará <strong>LA PRIMERA PARTE</strong>;
          </p>

          <p>
            Y de la otra parte, <strong>{contract.client_name.toUpperCase()}</strong>
            {contract.client_phone && `, con teléfono de contacto ${contract.client_phone}`}
            {contract.client_email && `, correo electrónico ${contract.client_email}`}
            {contract.client_address && `, con domicilio en ${contract.client_address}`},
            quien en lo que sigue del presente documento se denominará <strong>LA SEGUNDA PARTE</strong>.
          </p>

          <p className="text-center font-bold tracking-widest py-2 border-y border-zinc-200 uppercase text-xs">
            "HAN CONVENIDO Y PACTADO DE BUENA FE LO SIGUIENTE"
          </p>

          <div className="space-y-4">
            <p>
              <strong>PRIMERO: OBJETO Y ALCANCE DEL SERVICIO.</strong> LA PRIMERA PARTE se compromete a ejecutar a favor de LA SEGUNDA PARTE el siguiente proyecto:
            </p>
            <div className="p-4 bg-zinc-50 border-l-4 border-black font-sans text-xs italic">
              {contract.project_type}
            </div>

            <p>
              <strong>SEGUNDO: PLAZO DE ENTREGA.</strong> El plazo estimado para la conclusión y entrega del trabajo es de <strong>{contract.delivery_time}</strong>. Dicho plazo comenzará a contarse formalmente a partir de la firma digital de este contrato, la recepción del anticipo correspondiente y la entrega del 100% de los insumos requeridos.
            </p>

            <p>
              <strong>TERCERO: CONDICIONES FINANCIERAS.</strong> El precio total acordado por los servicios profesionales descritos asciende a la suma de <strong>RD$ {parseFloat(contract.total_amount).toFixed(2)} PESOS DOMINICANOS</strong>, distribuidos de la siguiente forma:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs font-sans">
              <li><strong>Anticipo de inicio ({contract.advance_percent}%):</strong> RD$ {parseFloat(contract.advance_amount).toFixed(2)} a ser saldado a la firma de este contrato.</li>
              <li><strong>Saldo restante ({100 - contract.advance_percent}%):</strong> RD$ {parseFloat(contract.remaining_amount).toFixed(2)} a ser saldado previa entrega final de los archivos editables o despliegue.</li>
            </ul>

            <p>
              <strong>CUARTO: POLÍTICA DE CANCELACIÓN Y NO DEVOLUCIÓN.</strong> LA SEGUNDA PARTE dispondrá de un plazo de 24 horas a partir del pago inicial para solicitar la cancelación con reembolso del 100%, siempre que los trabajos no hayan iniciado. Transcurridas 24 horas o iniciado el trabajo, el anticipo del <strong>{contract.advance_percent}% NO ES REEMBOLSABLE</strong> bajo ningún concepto.
            </p>

            <p>
              <strong>QUINTO: RETRASO EN LA ENTREGA DE RECURSOS.</strong> LA SEGUNDA PARTE se compromete a enviar los contenidos y archivos necesarios en un máximo de <strong>{contract.resource_limit_days} días hábiles</strong>. En caso contrario, el proyecto entrará en estado de pausa.
            </p>

            <p>
              <strong>SEXTO: DERECHO DE EXHIBICIÓN Y PORTAFOLIO.</strong> LA PRIMERA PARTE conserva el derecho legal de publicar las piezas realizadas en su portafolio comercial (`nudesign.agency`), salvo que exista un acuerdo de confidencialidad (NDA) pactado por escrito.
            </p>
          </div>

          {/* Sección de Firma */}
          <div className="pt-8 border-t border-zinc-300 mt-10 font-sans print:break-inside-avoid">
            <h3 className="font-bold text-xs uppercase mb-4 text-center tracking-wider">FIRMA DE CONFORMIDAD Y ACEPTACIÓN</h3>

            {signedSuccess ? (
              <div className="text-center space-y-3">
                {contract.signature_url && (
                  <div className="inline-block p-2 border-b-2 border-black mb-2">
                    <img src={contract.signature_url} alt="Firma Registrada" className="h-16 object-contain mx-auto" />
                  </div>
                )}
                <p className="text-xs font-bold text-black uppercase">{contract.client_name}</p>
                <p className="text-[10px] text-zinc-500 font-mono">
                  Firmado digitalmente el: {contract.signed_at ? new Date(contract.signed_at).toLocaleString('es-DO') : 'Registrado'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Documento Firmado & Validador de Identidad Activo
                </div>
              </div>
            ) : (
              <div className="space-y-4 print:hidden">
                <p className="text-xs text-zinc-600 text-center">Para aceptar los términos descritos, por favor dibuje su firma en el recuadro a continuación:</p>
                <div className="bg-zinc-100 border-2 border-dashed border-zinc-400 rounded-xl p-2 max-w-md mx-auto">
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ className: 'w-full h-36 rounded-lg bg-white cursor-crosshair' }}
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-xs text-zinc-500 hover:text-black underline cursor-pointer"
                  >
                    Borrar y reintentar
                  </button>
                  <button
                    type="button"
                    onClick={handleSign}
                    disabled={submitting}
                    className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : 'Aceptar y Firmar Digitalmente'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Pie de página oficial */}
        <div className="mt-12 pt-4 border-t border-zinc-200 text-center text-[10px] text-zinc-400 font-sans">
          Nu-Design Agency • Documento con validez de prestación de servicio digital • Dominican Republic
        </div>

      </div>

    </div>
  );
}