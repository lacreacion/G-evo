'use client';

import React from 'react';
import { Product } from '@/types';
import { X, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    addItem(product, 1, e);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
            🍬 Vista Rápida de Golosina
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-pink-600 hover:text-white flex items-center justify-center text-stone-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-pink-500 to-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">
                  {product.categoryName}
                </span>
                <h3 className="font-heading text-xl font-bold text-stone-900 leading-tight mb-1">
                  {product.name}
                </h3>
                <span className="text-[11px] font-mono text-stone-400 block mb-2">
                  SKU: {product.sku} | g-evo: {product.gEvo.gEvoId}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400 font-normal">({product.reviews} reseñas)</span>
                </div>

                <div className="text-2xl font-heading font-bold text-pink-600 mb-2">
                  ${product.price.toFixed(2)}
                  {product.oldPrice && (
                    <span className="text-sm font-normal text-stone-400 line-through ml-2">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500">
                <span>Peso: <strong>{product.weight}</strong></span>
                <span>Stock: <strong>{product.gEvo.stock} disponibles</strong></span>
              </div>
            </div>
          </div>

          {/* Sabores & Notas */}
          <div className="mb-5">
            <span className="text-xs font-bold text-stone-700 block mb-2">Notas & Sabores Clave:</span>
            <div className="flex flex-wrap gap-1.5">
              {product.flavors.map((flavor, i) => (
                <span
                  key={i}
                  className="bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold px-2.5 py-1 rounded-full"
                >
                  🍬 {flavor}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="candy-btn-gradient w-full py-3 text-sm font-bold shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Agregar al Carrito de Dulces</span>
          </button>
        </div>
      </div>
    </div>
  );
}

