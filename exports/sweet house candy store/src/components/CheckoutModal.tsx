'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Lock, AlertTriangle, FlaskConical } from 'lucide-react';
import { Order, CustomerData } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderConfirmed: (order: Order) => void;
}

/**
 * CHECKOUT EN MODO PRUEBAS / DEMOSTRACIÓN (SIN PASARELA DE PAGOS VINCULADA):
 * - Nadie puede realizar compras ni pagos reales.
 * - Solo permite simular el envío de los 3 datos de prueba hacia la Plataforma de Administrador (/admin).
 */
export default function CheckoutModal({
  isOpen,
  onClose,
  onOrderConfirmed,
}: CheckoutModalProps) {
  const { total, processOrder } = useCart();

  // Los 3 únicos campos obligatorios del comprador
  const [recipientName, setRecipientName] = useState('');
  const [recipientWhatsapp, setRecipientWhatsapp] = useState('');
  const [deliveryAddressFull, setDeliveryAddressFull] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitDemoOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !recipientWhatsapp.trim() || !deliveryAddressFull.trim()) {
      return;
    }

    setIsSubmitting(true);

    const customerPayload: CustomerData = {
      name: recipientName.trim(),
      phone: recipientWhatsapp.trim(),
      address: deliveryAddressFull.trim(),
      city: deliveryAddressFull.split(',')[0]?.trim() || 'Colombia',
    };

    const order = await processOrder(
      customerPayload,
      'Simulación de Prueba (Sin Cobro)',
      'PAGADO'
    );
    setIsSubmitting(false);
    onOrderConfirmed(order);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-gradient-to-r from-amber-50 to-pink-50">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="font-heading text-base sm:text-lg font-bold text-stone-900">
                Checkout en Modo Pruebas (Sin Pago Real)
              </h2>
              <p className="text-[11px] text-stone-500">
                Pasarela de pagos aún no vinculada • Solo demostración para el administrador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-pink-600 hover:text-white flex items-center justify-center text-stone-500 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitDemoOrder} className="p-6 max-h-[82vh] overflow-y-auto space-y-4">
          {/* AVISO DE BLOQUEO DE COMPRAS REALES */}
          <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Compras Reales Deshabilitadas (Tienda en Fase de Pruebas)</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Esta tienda se encuentra en <strong>Modo de Prueba</strong> y aún no tiene vinculada una pasarela bancaria activa. Puedes llenar los 3 datos abajo únicamente para simular cómo recibe el pedido el <strong>Panel de Administrador (/admin)</strong> sin ningún cobro.
            </p>
          </div>

          {/* Resumen del Total */}
          <div className="bg-stone-50 border border-dashed border-stone-200 p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-700 block">
                Valor Simulado del Carrito:
              </span>
              <span className="text-[10px] text-stone-500 font-semibold">
                No se realizará ningún cargo ni transacción
              </span>
            </div>
            <span className="font-heading text-2xl font-bold text-pink-600">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* DATO OBLIGATORIO 1: Nombre completo de quien recibe */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              1. Nombre completo de quien recibe *
            </label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Ej. Cliente de Prueba Sweet House"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-pink-500 focus:bg-white"
            />
          </div>

          {/* DATO OBLIGATORIO 2: Celular / WhatsApp de contacto */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              2. Celular / WhatsApp de contacto *
            </label>
            <input
              type="tel"
              required
              value={recipientWhatsapp}
              onChange={(e) => setRecipientWhatsapp(e.target.value)}
              placeholder="Ej. +57 312 456 7890"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-pink-500 focus:bg-white"
            />
          </div>

          {/* DATO OBLIGATORIO 3: Ciudad y Dirección exacta (incluyendo barrio / apartamento) */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              3. Ciudad y Dirección exacta (incluyendo barrio / apartamento) *
            </label>
            <input
              type="text"
              required
              value={deliveryAddressFull}
              onChange={(e) => setDeliveryAddressFull(e.target.value)}
              placeholder="Ej. Medellín, Cra 43A # 1-50, Barrio El Poblado, Apto 802"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-pink-500 focus:bg-white"
            />
          </div>

          {/* Pasarela de Pagos Bloqueada / No Vinculada */}
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span>Pasarela de Pagos Online</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 text-[10px] font-extrabold">
                No Vinculada Aún
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 opacity-50 pointer-events-none select-none text-[10px] font-bold text-center">
              <div className="p-2 rounded-lg bg-white border border-stone-200">Nequi 🔒</div>
              <div className="p-2 rounded-lg bg-white border border-stone-200">PSE 🔒</div>
              <div className="p-2 rounded-lg bg-white border border-stone-200">Bancolombia 🔒</div>
              <div className="p-2 rounded-lg bg-white border border-stone-200">Tarjetas 🔒</div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 mt-2 cursor-pointer transition-all"
          >
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span>
              {isSubmitting
                ? 'Enviando Simulación al Panel Admin...'
                : 'Simular Pedido de Prueba (Sin Pago Real)'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
