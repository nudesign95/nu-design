'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nu_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('nu_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-zinc-950/90 backdrop-blur-2xl border border-white/15 p-5 rounded-2xl shadow-2xl text-white text-xs space-y-3">
      <div className="flex items-center space-x-2">
        <span className="text-base">🍪</span>
        <h4 className="font-semibold uppercase tracking-wider text-red-500">Uso de Cookies</h4>
      </div>
      <p className="text-zinc-300 font-light leading-relaxed">
        Utilizamos cookies propias y de terceros para optimizar la navegación, medir el tráfico y garantizar la seguridad de la plataforma. Puedes consultar nuestra{' '}
        <Link href="/cookies" className="text-red-400 underline hover:text-red-300">
          Política de Cookies
        </Link>.
      </p>
      <div className="flex items-center space-x-3 pt-1">
        <button
          type="button"
          onClick={acceptCookies}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold uppercase tracking-wider text-[10px] transition-colors cursor-pointer"
        >
          Aceptar Todas
        </button>
      </div>
    </div>
  );
}