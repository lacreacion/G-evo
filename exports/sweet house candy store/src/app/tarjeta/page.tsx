'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Edit3, Store, ShieldCheck, KeyRound } from 'lucide-react';

export default function SweetHouseDigitalCardPage() {
  const [ownerMode, setOwnerMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col justify-between">
      {/* Barra Superior de Navegación del Entorno de Pruebas */}
      <header className="sticky top-0 z-40 bg-[#0B1120]/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-black tracking-tight text-2xl sm:text-3xl leading-none select-none">
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #FFF3B0 0%, #F5BE18 25%, #D4AF37 60%, #996515 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                G-
              </span>
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #A7F3D0 0%, #22C55E 30%, #10B981 70%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                evo.
              </span>
            </span>

            <div className="h-5 w-px bg-white/15 hidden sm:block" />

            <div>
              <div className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Tarjeta Digital Interactiva (URL &amp; QR)</span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Entorno de Pruebas • Descarga de Contacto (.vcf), Código QR Dinámico y Edición en Vivo (PIN: 1234)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setOwnerMode((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 border cursor-pointer transition-all ${
                ownerMode
                  ? 'bg-amber-400 text-black border-amber-300 shadow-lg'
                  : 'bg-amber-500/15 text-amber-300 border-amber-400/40 hover:bg-amber-500/25'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{ownerMode ? 'Modo Edición Activo (PIN: 1234)' : 'Probar Edición de Tarjeta'}</span>
            </button>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5" />
              <span>1. Ir a la Tienda</span>
            </Link>

            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>2. Ir a Plataforma Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Aviso Rápido de PIN para Pruebas */}
      <div className="bg-[#0E1628] border-b border-white/10 px-4 py-2 text-center text-xs text-gray-300 flex items-center justify-center gap-2 flex-wrap">
        <KeyRound className="w-3.5 h-3.5 text-amber-400" />
        <span>
          Para probar la edición de colores metalizados, foto y enlaces en la tarjeta, toca el botón <strong>&ldquo;Editar&rdquo;</strong> e ingresa el PIN de prueba: <strong className="text-amber-300 font-mono">1234</strong>
        </span>
      </div>

      {/* Visor Interactivo de la Tarjeta Digital (URL & QR) */}
      <main className="flex-1 w-full">
        <iframe
          key={ownerMode ? 'owner' : 'public'}
          src={`/card-engine.html?slug=sweet-house${ownerMode ? '&owner=1' : ''}`}
          title="Tarjeta Digital Interactiva G-evo."
          className="w-full h-[calc(100vh-110px)] border-0 block"
          allow="clipboard-write; web-share"
        />
      </main>
    </div>
  );
}
