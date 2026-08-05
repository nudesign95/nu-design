'use client';

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-[#050000] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mb-6 text-red-500 font-bold text-2xl">
        ✕
      </div>
      <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
        Acceso <span className="text-red-500 font-semibold">Restringido</span>
      </h1>
      <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
        Se ha detectado el uso de VPN, Proxy o un exceso de intentos no permitidos. Para proteger la integridad del sistema, el acceso a esta sección ha sido temporalmente bloqueado.
      </p>
      <div className="text-xs text-zinc-600 uppercase tracking-widest border border-zinc-800 px-4 py-2 rounded-full">
        Seguridad NU-DESIGN • Sistema Anti-Abuso
      </div>
    </div>
  );
}