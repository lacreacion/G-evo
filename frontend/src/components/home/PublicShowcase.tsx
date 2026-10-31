'use client';

import React, { useState } from 'react';
import { MOCK_SHOWCASE, ShowcaseItem } from '@/lib/mockData';
import { 
  Sparkles, 
  ExternalLink, 
  QrCode, 
  Smartphone, 
  ShoppingBag, 
  CheckCircle2, 
  X,
  TrendingUp 
} from 'lucide-react';

export const PublicShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'Todos' | 'Tarjeta Digital' | 'Catálogo E-commerce'>('Todos');
  const [qrModalItem, setQrModalItem] = useState<ShowcaseItem | null>(null);

  const filteredItems = filter === 'Todos'
    ? MOCK_SHOWCASE
    : MOCK_SHOWCASE.filter((item) => item.category === filter);

  return (
    <section id="mostrario" className="py-20 bg-[#090D16] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Respaldo y Autoridad de Marca</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Mostrario Público de <span className="text-gold-metallic">Ejemplos Reales</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Explora proyectos implementados con la tecnología G-evo. Cada tarjeta y catálogo es creado centralmente por nosotros y gestionado con total autonomía por sus propietarios.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 self-start md:self-auto">
            {(['Todos', 'Tarjeta Digital', 'Catálogo E-commerce'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === tab
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Ejemplos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-[#0F1422] border border-white/10 hover:border-amber-500/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Imagen de Portada con Badge */}
              <div className="relative h-52 overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1422] via-transparent to-transparent" />

                {/* Badge de Categoría */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                  {item.category === 'Tarjeta Digital' ? (
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>{item.category}</span>
                </div>

                {/* Botón QR Flotante */}
                <button
                  onClick={() => setQrModalItem(item)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md text-amber-300 border border-white/10 hover:bg-amber-400 hover:text-black transition-colors"
                  title="Escanear Código QR del Ejemplo"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>

              {/* Contenido del Item */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider">
                    {item.clientName}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags y Métricas */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.metrics}
                    </span>
                    <button
                      onClick={() => setQrModalItem(item)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300"
                    >
                      <span>Ver Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal QR Interactivo */}
      {qrModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setQrModalItem(null)}
          />

          <div className="relative w-full max-w-sm bg-[#0E1524] rounded-3xl border border-amber-500/40 p-6 z-10 shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Escanear con tu Celular
              </div>
              <button
                onClick={() => setQrModalItem(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-base font-bold text-white">
              {qrModalItem.title}
            </h3>

            {/* Simulación Gráfica de Código QR de Alta Calidad con Branding G-evo */}
            <div className="p-4 rounded-2xl bg-white mx-auto w-48 h-48 flex flex-col items-center justify-center relative shadow-inner">
              <QrCode className="w-36 h-36 text-black" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 rounded-lg bg-[#0E1524] border border-amber-400 flex items-center justify-center">
                  <span className="text-[10px] font-black text-amber-400">G</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-300">
              Abre la cámara de tu smartphone para vivir la experiencia interactiva en tiempo real.
            </p>

            <button
              onClick={() => setQrModalItem(null)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs"
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

