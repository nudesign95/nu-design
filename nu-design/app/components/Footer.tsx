'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 px-6 py-8 mt-12 z-20 relative text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Enlaces Legales en una sola línea */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[11px] font-light">
          <Link href="/aviso-legal" className="hover:text-red-400 transition-colors">Aviso Legal</Link>
          <span>•</span>
          <Link href="/terminos" className="hover:text-red-400 transition-colors">Términos y Condiciones</Link>
          <span>•</span>
          <Link href="/privacidad" className="hover:text-red-400 transition-colors">Política de Privacidad</Link>
          <span>•</span>
          <Link href="/cookies" className="hover:text-red-400 transition-colors">Política de Cookies</Link>
          <span>•</span>
          <Link href="/reembolsos" className="hover:text-red-400 transition-colors">Pagos y Reembolsos</Link>
        </div>

        {/* Derechos de Autor */}
        <div className="text-[10px] opacity-70 tracking-wide">
          Nu-Design Derechos reservados 2026 - Design by Garic Edume
        </div>
      </div>
    </footer>
  );
}