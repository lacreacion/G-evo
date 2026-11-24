'use client';

import React from 'react';
import { Product } from '@/types';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem, highlightedSku } = useCart();

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    : 0;
  const isOutOfStock = (product.gEvo?.stock ?? 1) <= 0;

  const isHighlighted = highlightedSku === product.sku;

  return (
    <article
      data-sku={product.sku}
      className={`group bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between ${
        isHighlighted ? 'card-highlight-pulse ring-4 ring-pink-500' : ''
      }`}
    >
      {/* Imagen & Vista Rápida (En móviles, tocar la imagen abre la vista rápida) */}
      <div
        className="relative aspect-square sm:aspect-[4/3] bg-stone-50 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
        title="Toca para ver detalles de la caja"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge de Oferta, Agotado o Especial */}
        {isOutOfStock ? (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-stone-900/90 text-white text-[9px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wide">
            Agotado
          </span>
        ) : hasDiscount ? (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[9px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wide">
            🔥 Oferta -{discountPercent}%
          </span>
        ) : product.badge ? (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white text-[9px] sm:text-[11px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-md uppercase tracking-wide">
            {product.badge}
          </span>
        ) : null}

        {/* Botón Flotante Vista Rápida */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 group-hover:bottom-2.5 bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md flex items-center gap-1 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-200 z-10 hidden sm:flex"
        >
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Vista Rápida</span>
        </button>
      </div>

      {/* Contenido de la Tarjeta con Espaciado Responsivo */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-pink-600 uppercase tracking-wider truncate">
              {product.categoryName}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-stone-400 hidden sm:inline">
              {product.sku}
            </span>
          </div>

          <h3
            className="font-heading font-bold text-stone-900 text-xs sm:text-sm md:text-base leading-snug line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-stone-500 text-[11px] sm:text-xs line-clamp-2 leading-relaxed mb-2 sm:mb-3 hidden xs:block">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-500 pt-1.5 sm:pt-2 mb-2 sm:mb-3 border-t border-dashed border-stone-100">
            <span className="font-semibold truncate">📦 {product.weight}</span>
            <div className="flex items-center gap-1 font-bold text-stone-800 flex-shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal hidden sm:inline">({product.reviews})</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 sm:gap-2 mt-auto">
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-lg md:text-xl font-bold text-stone-900 truncate">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through -mt-0.5 sm:-mt-1 truncate">
                  ${product.oldPrice!.toFixed(2)}
                </span>
              )}
            </div>

            {/* Botón Obligatorio de Agregar al Carrito */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={(e) => addItem(product, 1, e)}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold shadow-md flex items-center gap-1 sm:gap-1.5 flex-shrink-0 rounded-full ${
                isOutOfStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'candy-btn-gradient hover:scale-105 active:scale-95'
              }`}
              title={isOutOfStock ? 'Producto temporalmente agotado' : 'Agregar esta caja a tu dulce carrito'}
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isOutOfStock ? 'Agotado' : 'Agregar'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

