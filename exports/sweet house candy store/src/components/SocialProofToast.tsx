'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';

const BUYERS = [
  { name: 'Valentina P.', city: 'Bogotá', box: 'Caja Skittles Liofilizados Freeze-Dried Sour' },
  { name: 'Mateo G.', city: 'Monterrey', box: 'Caja Dulces Japoneses Kawaii Mix Box' },
  { name: 'Lucía S.', city: 'Lima', box: 'Caja San Valentín Sweet Love' },
  { name: 'Andrés M.', city: 'Medellín', box: 'Caja Danger Sour Megapack Extremo' },
  { name: 'Sofía R.', city: 'Santiago', box: 'Caja Mega Fiesta Dulce 1.5kg' },
  { name: 'Gabriel C.', city: 'Puebla', box: 'Caja Choco Dubai Pistacho & Kataifi' }
];

export default function SocialProofToast() {
  const [currentBuyer, setCurrentBuyer] = useState<{ name: string; city: string; box: string; minutes: number } | null>(null);

  useEffect(() => {
    // Primer trigger a los 7 segundos
    const initialTimer = setTimeout(() => {
      const buyer = BUYERS[0];
      setCurrentBuyer({ ...buyer, minutes: 2 });
    }, 7000);

    // Ticker periódico cada 38 segundos
    const interval = setInterval(() => {
      if (document.hidden) return;
      const randomBuyer = BUYERS[Math.floor(Math.random() * BUYERS.length)];
      const randomMinutes = Math.floor(Math.random() * 8) + 1;
      setCurrentBuyer({ ...randomBuyer, minutes: randomMinutes });
    }, 38000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Ocultar toast después de 5.5s
  useEffect(() => {
    if (!currentBuyer) return;
    const hideTimer = setTimeout(() => {
      setCurrentBuyer(null);
    }, 5500);
    return () => clearTimeout(hideTimer);
  }, [currentBuyer]);

  if (!currentBuyer) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-2.5 sm:gap-3 animate-in slide-in-from-bottom-5">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <div className="flex-1 text-[11px] sm:text-xs leading-snug min-w-0">
        <div className="font-bold text-stone-900 truncate">
          {currentBuyer.name} <span className="font-normal text-stone-500">({currentBuyer.city})</span>
        </div>
        <div className="text-stone-600 truncate">
          Compró <strong>{currentBuyer.box}</strong>
        </div>
        <div className="text-[9px] sm:text-[10px] text-emerald-600 font-bold mt-0.5">
          hace {currentBuyer.minutes} minutos • Verificado ✨
        </div>
      </div>

      <button
        onClick={() => setCurrentBuyer(null)}
        className="text-stone-400 hover:text-stone-600 p-1 flex-shrink-0"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

