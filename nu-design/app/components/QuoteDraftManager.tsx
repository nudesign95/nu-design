'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteDraftManagerProps {
  formData: Record<string, any>;
  onRestore: (savedData: Record<string, any>) => void;
  onClear: () => void;
}

export default function QuoteDraftManager({ formData, onRestore, onClear }: QuoteDraftManagerProps) {
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [connectionRestored, setConnectionRestored] = useState(false);
  const [savedDraft, setSavedDraft] = useState<Record<string, any> | null>(null);

  // 1. Guardado automático en tiempo real
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const hasContent = Object.values(formData).some(val => val !== '' && val !== null && val !== undefined);
      if (hasContent) {
        localStorage.setItem('nu_quote_draft', JSON.stringify(formData));
        localStorage.setItem('nu_quote_timestamp', new Date().toISOString());
      }
    }
  }, [formData]);

  // 2. Comprobar borrador guardado al cargar
  useEffect(() => {
    const draft = localStorage.getItem('nu_quote_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (Object.keys(parsed).length > 0) {
          setSavedDraft(parsed);
          setShowRestorePrompt(true);
        }
      } catch (e) {
        console.error('Error al leer el borrador', e);
      }
    }

    // Eventos de estado de red
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setConnectionRestored(true);
      setTimeout(() => setConnectionRestored(false), 5000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleAcceptRestore = () => {
    if (savedDraft) {
      onRestore(savedDraft);
    }
    setShowRestorePrompt(false);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem('nu_quote_draft');
    localStorage.removeItem('nu_quote_timestamp');
    onClear();
    setShowRestorePrompt(false);
  };

  return (
    <>
      {/* Alerta Estado Sin Conexión (Offline) */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-600 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center space-x-2 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Sin conexión a Internet. Tus cambios se están guardando localmente.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerta Conexión Restablecida */}
      <AnimatePresence>
        {connectionRestored && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center space-x-2 backdrop-blur-md"
          >
            <span>✓ Conexión restablecida. Puedes continuar con tu cotización.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificación de Restauración de Borrador (F5 / Reconexión) */}
      <AnimatePresence>
        {showRestorePrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-zinc-900/95 border border-red-500/40 text-white p-5 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-red-400">Borrador Detectado</h4>
                <p className="text-xs text-zinc-300 mt-1">
                  Encontramos datos guardados de tu cotización anterior. ¿Deseas recuperarlos?
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={handleAcceptRestore}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-xs font-semibold transition-all shadow-lg"
              >
                Continuar Cotización
              </button>
              <button
                onClick={handleDiscardDraft}
                className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 rounded-xl text-xs font-semibold transition-all"
              >
                Empezar Nueva
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}