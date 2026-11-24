'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCartButton() {
  const { totalCount, total, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-24 z-40 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-2xl border-2 border-white flex items-center gap-2 sm:gap-3 hover:scale-105 active:scale-95 transition-all duration-300 trigger-open-cart group"
      title="Ver mi carrito de dulces"
    >
      <div className="relative flex items-center justify-center">
        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2.5 sm:-top-2.5 sm:-right-3 bg-white text-pink-600 text-[10px] sm:text-[11px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md">
          {totalCount}
        </span>
      </div>
      <span className="font-heading font-bold text-xs sm:text-sm hidden xs:inline">Carrito</span>
      <span className="bg-white/25 px-1.5 sm:px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold font-heading">
        ${total.toFixed(2)}
      </span>
    </button>
  );
}

