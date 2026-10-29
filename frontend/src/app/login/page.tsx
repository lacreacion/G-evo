'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { 
  LogIn, 
  ShieldCheck, 
  Store, 
  Lock, 
  Mail, 
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (activeTab === 'admin') {
        // SuperAdmin default test credentials or any entry
        if (email.includes('admin') || email === 'admin@g-evo.com') {
          router.push('/admin');
        } else {
          // Allow login for testing with simulated success
          router.push('/admin');
        }
      } else {
        // Business Client Portal
        router.push('/portal');
      }
    }, 600);
  };

  const handleFillDemo = (type: 'client' | 'admin') => {
    if (type === 'client') {
      setActiveTab('client');
      setEmail('cliente@laurarestrepo.com');
      setPassword('Cliente@2026');
    } else {
      setActiveTab('admin');
      setEmail('admin@g-evo.com');
      setPassword('Admin@Gevo2026!');
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md space-y-6">
        
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <Logo size="lg" className="justify-center" />
          <p className="text-xs text-gray-400">
            Plataforma Segura Multi-Tenant de Gestión Digital
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0E1524] rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
          
          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-black/40 border border-white/5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('client');
                setError('');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Portal Clientes</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setError('');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Maestro</span>
            </button>
          </div>

          {/* Context Banner */}
          <div className="text-center text-xs text-gray-300">
            {activeTab === 'client' ? (
              <p>
                Ingresa con las credenciales entregadas por <strong className="text-emerald-400">G-evo</strong> para gestionar tu catálogo, fotos y stock.
              </p>
            ) : (
              <p className="text-amber-300/90 font-medium">
                Acceso restringido para el Administrador Principal de G-evo (creación de tiendas y licencias).
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    activeTab === 'client'
                      ? 'cliente@laurarestrepo.com'
                      : 'admin@g-evo.com'
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-xs text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300 hover:shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:shadow-amber-500/25'
              }`}
            >
              {loading ? (
                <span>Autenticando...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>
                    {activeTab === 'client'
                      ? 'Ingresar a mi Catálogo'
                      : 'Acceder al Panel Maestro'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Accesos de Prueba Rápida para Evaluación */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-semibold">
              Accesos Rápidos de Prueba (Demo)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('client')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-emerald-400 border border-emerald-500/20 text-center font-medium"
              >
                Cargar Demo Cliente (Laura R.)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-amber-400 border border-amber-500/20 text-center font-medium"
              >
                Cargar Demo Admin Maestro
              </button>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Volver al Sitio Web Principal (g-evo)
          </button>
        </div>

      </div>
    </div>
  );
}

