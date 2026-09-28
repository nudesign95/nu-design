'use client';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 px-6 py-8 mt-12 z-20 relative text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Enlaces Legales en una sola línea */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[13px] font-light">
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

        {/* Derechos de Autor + Botón Discreto de Admin */}
        <div className="text-[13px] opacity-60 tracking-wide flex items-center justify-center md:justify-end gap-2">
          <span>Design by Garic Edume - © 2026 All rights reserved.</span>
          
          {/* Botón Discreto / Candado de Acceso */}
          <Link 
            href="/admin/login" 
            title="Control Center Access"
            className="p-1 rounded-md text-zinc-600 hover:text-red-500 hover:bg-white/5 transition-all duration-300"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </footer>
  );
}