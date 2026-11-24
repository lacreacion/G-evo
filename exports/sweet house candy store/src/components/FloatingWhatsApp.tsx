'use client';

import React from 'react';
import { fireCandyConfetti } from '@/lib/confetti';
import { soundEngine } from '@/lib/soundEngine';

export default function FloatingWhatsApp() {
  const handleClick = (e: React.MouseEvent) => {
    soundEngine.playBubblePopSound();
    fireCandyConfetti(e.clientX, e.clientY, 40);
  };

  const defaultMsg = encodeURIComponent(
    '¡Hola Sweet House Candy Store! 🍬 Me gustaría consultar sobre sus cajas de dulces y pedidos personalizados.'
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center">
      {/* Tooltip bubble */}
      <div className="hidden lg:block absolute right-[68px] bg-white border border-stone-200 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap animate-pulse pointer-events-none">
        ¡Hola! 🍬 ¿Dudas con tu dulce pedido? ¡Escríbenos!
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border-t border-r border-stone-200 rotate-45" />
      </div>

      <a
        href={`https://wa.me/5215512345678?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 active:scale-95 transition-transform"
        aria-label="Atención directa por WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping -z-10" />

        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[30px] sm:h-[30px]">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.55 1.777.848 2.806.848h.005c3.18 0 5.767-2.587 5.769-5.766.001-1.543-.599-2.993-1.69-4.084-1.092-1.09-2.543-1.687-4.085-1.687zm8.397 1.687c1.554 1.554 2.41 3.62 2.409 5.823 0 4.544-3.696 8.241-8.241 8.241-1.452 0-2.874-.383-4.126-1.109l-4.57 1.186 1.229-4.48c-.792-1.371-1.21-2.932-1.21-4.538 0-4.544 3.696-8.241 8.241-8.241 2.203.001 4.27 0.857 5.824 2.411zm-5.26 6.945c-.247-.124-1.464-.722-1.691-.805-.227-.082-.393-.124-.558.124-.165.248-.641.805-.786.971-.144.165-.289.186-.536.062-.248-.124-1.045-.385-1.99-1.228-.737-.658-1.234-1.47-1.378-1.718-.144-.248-.015-.382.109-.505.111-.111.248-.289.372-.434.124-.144.165-.248.248-.413.082-.165.041-.31-.021-.434-.062-.124-.558-1.344-.764-1.84-.2-.484-.403-.418-.558-.426h-.475c-.165 0-.434.062-.661.31-.227.248-.868.848-.868 2.068 0 1.22.888 2.399 1.012 2.564.124.165 1.748 2.669 4.234 3.743.592.256 1.054.409 1.414.523.594.189 1.135.162 1.562.099.477-.071 1.464-.599 1.67-1.178.207-.579.207-1.074.145-1.178-.062-.104-.227-.166-.474-.29z"/>
        </svg>
      </a>
    </div>
  );
}

