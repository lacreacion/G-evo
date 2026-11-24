'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function Footer() {
  const { setSelectedCategory } = useCart();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('catalogo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 350, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="mt-12 sm:mt-20 border-t border-stone-200 bg-stone-50/50 py-8 sm:py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo.png?v=4"
                alt="Sweet House Candy Store"
                className="w-12 h-12 object-contain rounded-full shadow-sm bg-white flex-shrink-0"
                style={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}
              />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent leading-none">
                  Sweet House
                </span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Candy Store • Best In Town
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              La dulcería en línea más divertida y colorida. Cajas de regalo, gomitas, chocolates gourmet y dulces del mundo empacados con alegría.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-stone-900 mb-3">
              Variedades
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button onClick={() => handleCategoryClick('cajas-regalo')} className="hover:text-pink-600">
                  🎁 Cajas de Regalo & Megamix
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('gomitas')} className="hover:text-pink-600">
                  🐻 Gomitas & Jelly
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('chocolates')} className="hover:text-pink-600">
                  🍫 Chocolatería & Bombones
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('acidos')} className="hover:text-pink-600">
                  ⚡ Ácidos & Pica-Pica
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('importados')} className="hover:text-pink-600">
                  ✈️ Snacks Importados
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-stone-900 mb-3">
              Atención al Cliente
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <a
                  href="https://wa.me/5215512345678?text=Hola,%20quisiera%20consultar%20el%20estado%20de%20mi%20pedido%20en%20Sweet%20House"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 flex items-center gap-1.5"
                >
                  📦 Estado de mi Pedido
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5215512345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 flex items-center gap-1.5"
                >
                  💬 WhatsApp de Soporte
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5215512345678?text=Hola,%20quisiera%20conocer%20los%20tiempos%20de%20entrega%20y%20cobertura%20de%20Sweet%20House"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 flex items-center gap-1.5"
                >
                  🚚 Tiempos de Entrega
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-stone-900 mb-3">
              Conexión de Plataforma
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed mb-3">
              Integrado conceptualmente con <strong>Meta Graph API</strong> y preparado para sincronización de imágenes y stock con <strong>g-evo</strong>.
            </p>
            <div className="inline-flex items-center gap-2 bg-white border border-stone-200 px-3 py-1.5 rounded-full text-[11px] font-semibold text-stone-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>g-evo Ready API v2.0</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 flex items-center justify-between flex-wrap gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© 2026 Sweet House Candy Store. Todos los derechos reservados.</span>
            <a
              href="/admin"
              className="text-[11px] font-bold text-pink-600 hover:text-pink-700 underline underline-offset-2"
            >
              🔐 Panel Administrador
            </a>
          </div>

          {/* Sello Oficial de Respaldo Obligatorio G-evo. (Logo Grande y Protagonista) */}
          <a
            href="https://g-evo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#070B14] hover:bg-[#0D1526] border border-amber-500/40 text-stone-200 transition-all shadow-xl"
          >
            <span className="text-xs sm:text-sm font-semibold text-gray-300">
              Tienda E-commerce • Creada y respaldada por
            </span>
            <span className="font-black tracking-tight text-2xl sm:text-3xl leading-none">
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
          </a>
        </div>
      </div>
    </footer>
  );
}

