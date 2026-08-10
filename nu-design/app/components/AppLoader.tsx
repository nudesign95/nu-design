'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WordmarkLogo from './WordmarkLogo';

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Verificamos si la animación ya se mostró en esta sesión
    const hasSeenLoader = sessionStorage.getItem('nu_seen_loader');

    if (hasSeenLoader) {
      setIsLoading(false);
    } else {
      // 2. Tiempo que dura la animación en pantalla (2.2 segundos)
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('nu_seen_loader', 'true');
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-9999 bg-[#040001] flex flex-col items-center justify-center overflow-hidden selection:bg-red-600 selection:text-white"
        >
          {/* Luz de Fondo Ambiental Animada (Ambient Red Glow) */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.25 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-96 h-96 bg-red-600 rounded-full blur-[140px] pointer-events-none"
          />

          {/* Animación del Logo Wordmark */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]"
            >
              <WordmarkLogo className="h-10 md:h-14 w-auto text-white" />
            </motion.div>

            {/* Subtítulo Minimalista */}
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 0.6, letterSpacing: '0.4em' }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-[9px] md:text-[10px] text-zinc-400 uppercase font-light"
            >
              High-End Visual Identity
            </motion.span>
          </div>

          {/* Línea de carga fina minimalista */}
          <div className="absolute bottom-12 w-32 h-0.5 bg-zinc-800/80 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="w-full h-full bg-linear-to-r from-red-600 via-red-500 to-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}