'use client';

import React from 'react';
import { Order } from '@/types';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  const { switchTab } = useCart();

  if (!order) return null;

  const handleGoToOrders = () => {
    onClose();
    switchTab('orders');
  };

  const waMessage = encodeURIComponent(
    `¡Hola Sweet House Candy Store! 🍬 Acabo de realizar mi pedido #${order.id} por $${order.total.toFixed(2)}. Mi nombre es ${order.customer.name}. ¿Me podrían confirmar los detalles del envío? ¡Muchas gracias!`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-md w-full p-6 md:p-8 text-center shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <img
            src="/logo.png"
            alt="Sweet House Candy Store"
            className="w-16 h-16 object-contain rounded-full shadow-md bg-white border border-stone-100"
          />
        </div>

        <h2 className="font-heading text-2xl font-bold text-stone-900 mb-1">
          ¡Tu Pedido Dulce fue Confirmado!
        </h2>
        <p className="text-stone-500 text-xs md:text-sm mb-6 leading-relaxed">
          ¡Muchas gracias por tu compra! Estamos empacando tu caja con los dulces más frescos, aromáticos y confeti festivo.
        </p>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Número de Pedido:</span>
            <span className="font-mono font-bold text-pink-600 text-sm">#{order.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Destinatario:</span>
            <span className="font-semibold text-stone-800">{order.customer.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">Guía de Seguimiento:</span>
            <span className="font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
              {order.trackingCode}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-stone-200 font-bold text-sm">
            <span>Total Pagado:</span>
            <span className="text-stone-900">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href={`https://wa.me/5215512345678?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar Envío por WhatsApp</span>
          </a>

          <button
            onClick={handleGoToOrders}
            className="candy-btn-outline w-full py-2.5 text-xs font-bold"
          >
            Ver en Mis Pedidos
          </button>
        </div>
      </div>
    </div>
  );
}

