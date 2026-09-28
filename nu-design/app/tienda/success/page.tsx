'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Download, ShieldCheck, ArrowLeft, Clock } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get('item_id');
  const orderId = searchParams.get('order_id');

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (itemId) {
      generateToken();
    } else {
      setLoading(false);
      setError('No se proporcionó información válida del pedido.');
    }
  }, [itemId]);

  const generateToken = async () => {
    try {
      const res = await fetch('/api/download-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, orderId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setDownloadUrl(data.downloadUrl);
      } else {
        setError(data.error || 'No se pudo verificar el pago.');
      }
    } catch (err) {
      setError('Ocurrió un problema al procesar la descarga.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-16 p-8 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl text-center space-y-6">
      <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-black text-white">¡Pago Confirmado con Éxito!</h1>
        <p className="text-xs text-neutral-400">
          Gracias por confiar en Nu-Design. Tu orden <span className="text-red-500 font-mono">{orderId || 'ND-ORDER'}</span> ha sido procesada.
        </p>
      </div>

      {loading ? (
        <div className="py-8 text-neutral-400 text-sm animate-pulse">
          Generando tu enlace seguro de alta velocidad...
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs">
          {error}
        </div>
      ) : (
        <div className="space-y-4 pt-4 border-t border-neutral-800">
          <a
            href={downloadUrl!}
            download
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-5 h-5" />
            <span>Descargar Archivo HD Limpio</span>
          </a>

          <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Válido por 24 Horas
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Licencia Oficial
            </span>
          </div>
        </div>
      )}

      <div className="pt-6">
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>Volver al Catálogo de la Tienda</span>
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 flex items-center justify-center px-4 font-sans">
      <Suspense fallback={<div className="text-neutral-500 text-sm">Cargando...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}