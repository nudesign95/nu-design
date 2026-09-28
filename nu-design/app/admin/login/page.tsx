'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, ArrowRight } from 'lucide-react';
import WordmarkLogo from '@/app/components/WordmarkLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas o acceso denegado.');
      setLoading(false);
    } else {
      router.push('/admin/tienda');
    }
  };

  return (
    <div className="min-h-screen bg-[#040001] text-zinc-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
        
        <div className="text-center space-y-2">
          <WordmarkLogo className="h-7 w-auto mx-auto" />
          <p className="text-xs text-neutral-400 font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 pt-2">
            <Lock className="w-3.5 h-3.5 text-red-500" /> Control Center Access
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold text-neutral-400">Correo Administrador</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nudesign.agency"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs focus:border-red-500 outline-none text-white transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase font-bold text-neutral-400">Contraseña Segura</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs focus:border-red-500 outline-none text-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition"
          >
            <span>{loading ? 'Verificando...' : 'Iniciar Sesión'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}