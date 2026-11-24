'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import OrderSuccessModal from './OrderSuccessModal';
import { Order } from '@/types';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCartOpen && !isCheckoutOpen && !confirmedOrder) return null;

  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  const handleOpenCheckout = () => {
    closeCart();
    setIsCheckoutOpen(true);
  };

  const handleOrderConfirmed = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabecera del Carrito */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h2 className="font-heading text-lg font-bold text-stone-900">
              Tu Carrito Dulce
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-pink-600 hover:text-white flex items-center justify-center text-stone-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de Progreso hacia Envío Gratis */}
        <div className="px-6 py-3 bg-pink-50/60 border-b border-pink-100">
          <div className="text-xs font-semibold text-stone-700 mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-600 font-bold">
                🎉 ¡Felicidades! Tienes <strong>ENVÍO GRATIS</strong> en esta compra.
              </span>
            ) : (
              <span>
                ¡Agrega solo <strong>${neededForFreeShipping.toFixed(2)}</strong> más para <strong>Envío Gratis</strong>! 🚚
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                subtotal >= freeShippingThreshold
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-pink-500 to-amber-500'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="text-6xl mb-3">🍭</span>
              <h3 className="font-heading text-lg font-bold text-stone-900 mb-1">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Descubre nuestras más de 100 cajas de dulces, gomitas y chocolates listos para endulzar tu día.
              </p>
              <button
                onClick={closeCart}
                className="candy-btn-gradient text-xs px-5 py-2.5 shadow-md"
              >
                ¡Empezar a endulzar!
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.sku} className="py-3 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-xs text-stone-900 truncate leading-snug">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-stone-400 mb-1.5">
                    {item.weight} • ${item.price.toFixed(2)} c/u
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-stone-100 rounded-full p-0.5 border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item.sku, -1)}
                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-stone-600 hover:bg-stone-200 shadow-sm text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.sku, 1)}
                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-stone-600 hover:bg-stone-200 shadow-sm text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-heading font-bold text-sm text-stone-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeItem(item.sku)}
                      className="text-stone-400 hover:text-red-500 p-1"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie con Cupones y Totales */}
        {items.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-200">
            {/* Cupón */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Cupón (ej. DULCE10)"
                  className="w-full bg-white border border-stone-200 rounded-full pl-8 pr-3 py-1.5 text-xs text-stone-800 outline-none focus:border-pink-500"
                />
              </div>
              <button
                type="submit"
                className="candy-btn-outline text-xs px-3 py-1.5 font-bold"
              >
                Aplicar
              </button>
            </form>

            {coupon && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-lg flex items-center justify-between mb-3">
                <span>🎟️ Cupón <strong>{coupon.code}</strong> ({coupon.description})</span>
                <button onClick={removeCoupon} className="font-bold text-emerald-700 hover:text-emerald-900">✕</button>
              </div>
            )}

            {couponMessage && !coupon && (
              <div className={`text-xs mb-3 ${couponMessage.isError ? 'text-red-500' : 'text-emerald-600'}`}>
                {couponMessage.text}
              </div>
            )}

            {/* Desglose de Precios */}
            <div className="space-y-1.5 text-xs text-stone-600 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-pink-600 font-semibold">
                  <span>Descuento aplicado</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío estimado</span>
                <span className={shipping === 0 ? 'text-emerald-600 font-bold' : ''}>
                  {shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-heading font-bold text-stone-900 pt-2 border-t border-dashed border-stone-200">
                <span>Total a Pagar</span>
                <span className="text-pink-600 text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Botón de Proceder al Pago */}
            <button
              onClick={handleOpenCheckout}
              className="candy-btn-gradient w-full py-3.5 text-sm font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceder al Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Modales Secundarios de Checkout y Éxito */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />
    </>
  );
}

