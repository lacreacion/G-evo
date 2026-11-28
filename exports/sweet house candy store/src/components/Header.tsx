'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, Volume2, VolumeX, X, Facebook, Instagram } from 'lucide-react';

export default function Header() {
  const {
    totalCount,
    openCart,
    searchQuery,
    setSearchQuery,
    isMuted,
    toggleMute
  } = useCart();

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Barra Superior de Navegación del Entorno de Pruebas (Tienda + Plataforma Admin + Tarjeta Digital) */}
      <div className="bg-[#070B14] text-white border-b border-amber-500/30 px-3 py-2 text-xs">
        <div className="container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              🔒 Modo Pruebas (Compras Deshabilitadas)
            </span>
            <span className="text-[11px] text-gray-300 hidden md:inline">
              Explora las 3 vistas del ecosistema de pruebas:
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <a
              href="/"
              className="px-2.5 py-1 rounded-lg bg-pink-500/20 border border-pink-400/40 text-pink-200 font-bold text-[11px] hover:bg-pink-500/30 transition-all"
            >
              🍭 1. Tienda Sweet House
            </a>
            <a
              href="/admin"
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-[11px] hover:bg-emerald-500/30 transition-all"
            >
              🔐 2. Plataforma Admin
            </a>
            <a
              href="/tarjeta"
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[11px] hover:bg-amber-500/30 transition-all"
            >
              💳 3. Tarjeta Digital (URL &amp; QR)
            </a>
          </div>
        </div>
      </div>

      {/* Franja decorativa de gradiente dulce (sin texto) */}
      <div className="h-1.5 md:h-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-400 to-amber-400" />

      {/* Cabecera Principal Sticky */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all">
        <div className="container py-2 sm:py-2.5 md:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-6 flex-wrap md:flex-nowrap">
            
            {/* Logo Oficial Sweet House (Redondo y responsivo) */}
            <button
              onClick={handleLogoClick}
              className="flex items-center text-left group focus:outline-none flex-shrink-0"
              title="Ir al inicio de Sweet House"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-md border-2 border-pink-400 hover:border-pink-500 group-hover:scale-105 transition-all bg-white flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo.png?v=4"
                  alt="Sweet House Candy Store"
                  className="w-full h-full object-cover rounded-full"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              </div>
            </button>

            {/* Barra de Búsqueda Interactiva (100% responsive: ocupa ancho completo en móviles abajo del logo) */}
            <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 md:max-w-md mt-1 md:mt-0">
              <div className="relative flex items-center bg-stone-100 focus-within:bg-white border-2 border-transparent focus-within:border-pink-500 rounded-full px-3.5 py-1.5 sm:py-2 transition-all shadow-inner focus-within:shadow-md">
                <Search className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar entre +100 cajas (Gomitas, Dubai)..."
                  className="w-full bg-transparent border-none text-stone-800 text-xs sm:text-sm outline-none placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-stone-400 hover:text-pink-500 ml-1 p-0.5 rounded-full"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Acciones: Redes Sociales, Audio y Carrito */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 order-2 md:order-3 ml-auto md:ml-0 flex-shrink-0">
              
              {/* Botón Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-stone-200 bg-stone-50 hover:bg-[#1877F2] hover:border-[#1877F2] text-stone-600 hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-105"
                title="Síguenos en Facebook"
                aria-label="Facebook Sweet House"
              >
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </a>

              {/* Botón Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-stone-200 bg-stone-50 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent text-stone-600 hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-105"
                title="Síguenos en Instagram"
                aria-label="Instagram Sweet House"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>

              {/* Botón de Sonido Web Audio */}
              <button
                type="button"
                onClick={toggleMute}
                className="w-8 h-8 sm:w-auto sm:px-3 sm:py-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-white hover:border-pink-500 text-stone-700 text-xs font-semibold transition-all shadow-sm flex items-center justify-center sm:gap-1.5"
                title={isMuted ? 'Activar efectos sonoros 🔊' : 'Silenciar sonido 🔇'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />}
                <span className="hidden sm:inline">{isMuted ? 'Mudo' : 'Audio'}</span>
              </button>

              {/* Botón del Carrito en Cabecera (Dispara Confeti y Sonido) */}
              <button
                type="button"
                onClick={openCart}
                className="candy-btn-gradient px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm shadow-md trigger-open-cart flex items-center gap-1.5 sm:gap-2"
                title="Abrir carrito de compras"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Carrito</span>
                <span className="bg-white text-pink-600 text-[11px] sm:text-xs font-extrabold rounded-full px-1.5 sm:px-2 py-0.2 shadow-sm min-w-[18px] text-center">
                  {totalCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

