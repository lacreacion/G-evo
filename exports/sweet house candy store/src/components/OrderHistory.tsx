'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Package, RotateCcw, MessageCircle, Truck } from 'lucide-react';

export default function OrderHistory() {
  const { orders, reorder, switchTab } = useCart();

  if (orders.length === 0) {
    return (
      <div className="my-12 p-12 bg-stone-50 rounded-3xl border border-dashed border-stone-200 text-center max-w-xl mx-auto">
        <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-stone-800 mb-2">
          Aún no tienes pedidos registrados
        </h3>
        <p className="text-stone-500 text-sm mb-6 leading-relaxed">
          Cuando realices una compra de nuestras deliciosas cajas, podrás consultar aquí el estado de entrega en vivo y volver a pedir tus dulces favoritos con un solo clic.
        </p>
        <button
          onClick={() => switchTab('catalog')}
          className="candy-btn-gradient text-sm px-6 py-3 shadow-md"
        >
          Explorar Catálogo de Dulces
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-stone-900 mb-1">
          📦 Historial de Compras & Seguimiento
        </h2>
        <p className="text-stone-500 text-sm">
          Revisa el detalle de tus pedidos de dulces, guías de envío y vuelve a pedir con un clic.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Cabecera de la Orden */}
            <div className="bg-stone-50/80 px-6 py-4 border-b border-stone-200 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="font-heading text-base font-bold text-stone-900 mr-3">
                  Pedido #{order.id}
                </span>
                <span className="text-xs text-stone-500">📅 {order.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    order.status.includes('Entregado')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Contenido de la Orden */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lista de Items */}
              <div className="md:col-span-2 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-xs text-stone-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {item.quantity}x • ${item.price.toFixed(2)} ({item.weight})
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen & Destinatario */}
              <div className="bg-stone-50 p-4 rounded-xl text-xs space-y-2 border border-stone-100">
                <div className="text-stone-700">
                  <strong>Destinatario:</strong> {order.customer.name}
                </div>
                <div className="text-stone-700">
                  <strong>Dirección:</strong> {order.customer.address}, {order.customer.city}
                </div>
                <div className="text-stone-700 flex items-center gap-1">
                  <strong>Guía:</strong>
                  <code className="bg-white px-1.5 py-0.5 rounded border border-stone-200 font-mono text-[11px]">
                    {order.trackingCode}
                  </code>
                </div>
                <div className="text-stone-700">
                  <strong>Pago:</strong> {order.paymentMethod}
                </div>

                <div className="pt-2 mt-2 border-t border-dashed border-stone-200 space-y-1">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-pink-600">
                      <span>Descuento:</span>
                      <span>-${order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500">
                    <span>Envío:</span>
                    <span>{order.shipping === 0 ? 'GRATIS' : `$${order.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-sm text-stone-900 pt-1">
                    <span>Total Pagado:</span>
                    <span className="text-pink-600 text-base">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie de la Orden con Botón de Reordenar */}
            <div className="bg-stone-50/50 px-6 py-3.5 border-t border-stone-200 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Truck className="w-3.5 h-3.5 text-pink-500" />
                <span>¿Dudas con este pedido? Indícanos el #{order.id} por WhatsApp.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => reorder(order.id)}
                  className="candy-btn-outline text-xs px-3.5 py-1.5 flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Volver a pedir estos dulces</span>
                </button>

                <a
                  href={`https://wa.me/5215512345678?text=${encodeURIComponent(
                    `Hola Sweet House! Quisiera consultar el estado de mi pedido #${order.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

