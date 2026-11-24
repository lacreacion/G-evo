'use client';

import React, { useState, useMemo } from 'react';
import { CANDY_CATEGORIES } from '@/data/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { useCart } from '@/context/CartContext';
import { soundEngine } from '@/lib/soundEngine';

export default function ProductCatalog() {
  const { products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Solo productos NO bloqueados en la tienda pública
  const visibleProducts = useMemo(
    () => products.filter((p) => !p.isBlocked),
    [products]
  );

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let list = [...visibleProducts];

    // 1. Filtrar por categoría
    if (selectedCategory !== 'todas') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. Filtrar por búsqueda
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const flavorMatch = p.flavors.some((f) => f.toLowerCase().includes(q));
        const skuMatch = p.sku.toLowerCase().includes(q);
        return nameMatch || descMatch || flavorMatch || skuMatch;
      });
    }

    // 3. Ordenamiento
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return list;
  }, [visibleProducts, selectedCategory, searchQuery, sortBy]);

  const totalResults = filteredProducts.length;
  const itemsToShow = currentPage * itemsPerPage;
  const pageProducts = filteredProducts.slice(0, itemsToShow);

  const handleCategorySelect = (catId: string) => {
    soundEngine.playBubblePopSound();
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    soundEngine.playBubblePopSound();
    setSelectedCategory('todas');
    setSearchQuery('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <section id="catalogo" className="my-4 sm:my-6">
      {/* Píldoras de Categorías con scroll suave táctil */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 sm:pb-3 mb-3 sm:mb-4 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
        {CANDY_CATEGORIES.map((cat) => {
          const count =
            cat.id === 'todas'
              ? visibleProducts.length
              : visibleProducts.filter((p) => p.category === cat.id).length;

          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-sm flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-pink-200'
                  : 'bg-stone-100 hover:bg-white hover:border-pink-300 border border-stone-200 text-stone-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Barra de Conteo y Ordenamiento */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-2.5 sm:py-3 border-t border-stone-200 mb-4 sm:mb-6 text-xs sm:text-sm text-stone-500">
        <div>
          Mostrando <strong className="text-stone-900">{Math.min(itemsToShow, totalResults)}</strong> de{' '}
          <strong className="text-stone-900">{totalResults}</strong> cajas listas
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs font-semibold text-stone-600">
            Ordenar:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-100 border border-stone-200 rounded-full px-3 py-1 text-xs font-semibold text-stone-800 outline-none focus:border-pink-500 cursor-pointer"
          >
            <option value="popular">🔥 Más Populares & Vendidos</option>
            <option value="price-asc">💵 Precio: Menor a Mayor</option>
            <option value="price-desc">💎 Precio: Mayor a Menor</option>
            <option value="rating">⭐ Mejor Calificados</option>
            <option value="name-asc">🔤 Nombre: A - Z</option>
          </select>
        </div>
      </div>

      {/* Cuadrícula de Cajas de Dulces (Modo Responsive: 2 columnas en móvil, 3 en tablet, 4 en desktop) */}
      {totalResults === 0 ? (
        <div className="bg-stone-50 rounded-2xl p-8 sm:p-12 text-center border border-dashed border-stone-200 my-6 sm:my-8">
          <span className="text-4xl sm:text-5xl mb-2 sm:mb-3 block">🔍🍭</span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900 mb-2">
            No encontramos dulces que coincidan
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-4 sm:mb-5">
            Intenta con palabras clave como &quot;Gomitas&quot;, &quot;Chocolate&quot;, &quot;Sandía&quot;, &quot;Ácido&quot; o selecciona otra categoría.
          </p>
          <button
            onClick={handleResetFilters}
            className="candy-btn-gradient text-xs px-5 py-2.5 shadow-md"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
          {pageProducts.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Botón Cargar Más */}
      {itemsToShow < totalResults && (
        <div className="text-center mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="candy-btn-gradient px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            🍬 Mostrar más cajas (+24)
          </button>
        </div>
      )}

      {/* Modal de Vista Rápida */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}

