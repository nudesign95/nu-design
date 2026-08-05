'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de credenciales oficiales de Garic Edume
    if (username === 'Garic Edume' && password === 'D7!qX#9mL@2vR$8zP^4nK&1sW') {
      localStorage.setItem('nu_admin_session', 'authenticated');
      router.push('/cotizacion/inventario');
    } else {
      setError('Credenciales incorrectas. Acceso denegado.');
    }
  };

  return (
    <div className="min-h-screen bg-[#040001] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full backdrop-blur-2xl border border-white/10 rounded-3xl p-8 bg-zinc-950/80 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto mb-2">
            <Image src="/icon-dark.svg" alt="NU-Design" width={64} height={64} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Acceso Propietario</h1>
          <p className="text-xs text-zinc-400">Gestión Administrativa • NU-DESIGN</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Usuario</label>
            <input 
              type="text" 
              required
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Garic Edume"
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-xs outline-none focus:border-red-500" 
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••••••"
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-xs outline-none focus:border-red-500" 
            />
          </div>

          {error && <p className="text-xs text-red-500 font-semibold text-center">{error}</p>}

          <button type="submit" className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer">
            Iniciar Sesión
          </button>
        </form>

      </div>
    </div>
  );
}