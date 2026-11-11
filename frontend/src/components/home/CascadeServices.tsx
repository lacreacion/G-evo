'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GevoText } from '@/components/common/GevoText';
import { CASCADE_SERVICES, ServiceItem } from '@/lib/mockData';
import {
  Play,
  CheckCircle2,
  Award,
  Zap,
  X,
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const CascadeServices: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    videoUrl: string;
  } | null>(null);

  // Estado por cada tarjeta para alternar entre 'features' (Características) y 'advantages' (Ventajas G-evo)
  const [activeTabByCard, setActiveTabByCard] = useState<Record<number, 'features' | 'advantages'>>({
    1: 'features',
    2: 'features',
    3: 'features',
    4: 'features',
  });

  const handleTabChange = (cardId: number, tab: 'features' | 'advantages') => {
    setActiveTabByCard((prev) => ({
      ...prev,
      [cardId]: tab,
    }));
  };

  return (
    <section id="servicios" className="py-12 md:py-16 relative overflow-hidden">
      {/* Halos de luz ambiental sutiles */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Encabezado Compacto */}
        <div className="text-center max-w-2xl mx-auto mb-9 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Nuestras Soluciones de Alto Impacto</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Servicios diseñados para la{' '}
            <span
              className="inline-block bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-black"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #FEF08A 0%, #FDE047 25%, #F59E0B 60%, #B45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Evolución
            </span>{' '}
            de tu Negocio
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Una suite completa que combina presencia física de lujo, vitrinas web ultra-rápidas y automatización inteligente con Inteligencia Artificial.
          </p>
        </div>

        {/* Grilla Bento 2x2 Compacta e Innovadora (4 Cajas en una sola vista) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {CASCADE_SERVICES.map((service: ServiceItem, index: number) => {
            const currentTab = activeTabByCard[service.id] || 'features';

            return (
              <div
                key={service.id}
                className="group/card relative rounded-2xl gevo-chassis hover:border-[#22C58B]/55 p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between gap-3.5 hover:-translate-y-0.5"
                style={{
                  animationDelay: `${index * 110}ms`,
                }}
              >
                {/* 1. Fila Superior: Mini-Reproductor de Video + Título, Badge y Descripción */}
                <div className="flex flex-col sm:flex-row items-start gap-3.5">
                  
                  {/* Miniatura de Video Interactiva Compacta */}
                  <div className="relative w-full sm:w-36 h-28 sm:h-26 rounded-xl overflow-hidden border border-white/15 shadow-lg shrink-0 group/video">
                    <Image
                      src={service.videoThumbnail}
                      alt={service.title}
                      width={240}
                      height={160}
                      unoptimized
                      className="w-full h-full object-cover filter brightness-90 group-hover/video:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveVideo({
                            title: service.title,
                            videoUrl: service.videoPreviewUrl,
                          })
                        }
                        className="relative p-2.5 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-black shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                        aria-label={`Ver video explicativo de ${service.title}`}
                        title="Reproducir Video Explicativo"
                      >
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </button>
                    </div>

                    {/* Etiqueta flotante de Video */}
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[9px] font-bold text-amber-300 border border-white/10 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      <span>Video</span>
                    </div>
                  </div>

                  {/* Información Principal del Servicio */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#042419]/90 border border-amber-500/35 text-amber-300 font-extrabold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C58B]" />
                      <span>
                        0{service.id} {'//'} {service.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-emerald-400 text-[11px] font-semibold leading-tight">
                      {service.tagline}
                    </p>

                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 group-hover/card:line-clamp-none transition-all">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* 2. Selector Interactivo de Pestañas Internas (Características vs Ventajas G-evo) */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/25 border border-white/10">
                    <button
                      type="button"
                      onClick={() => handleTabChange(service.id, 'features')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        currentTab === 'features'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Características Técnicas</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTabChange(service.id, 'advantages')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        currentTab === 'advantages'
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-xs'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Award className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>
                        Ventajas <GevoText withDot={false} />
                      </span>
                    </button>
                  </div>

                  {/* Contenido Dinámico Compacto de la Pestaña Seleccionada */}
                  {currentTab === 'features' ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {service.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-gray-200 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-amber-950/25 border border-amber-500/25">
                      <ul className="space-y-1.5">
                        {service.competitiveAdvantages.map((adv, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-gray-200 flex items-start gap-1.5 leading-snug"
                          >
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 3. Barra Inferior Compacta: Botón Blanco Soft UI + Acceso Rápido al Video */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2.5">
                  <Link
                    href="#contacto"
                    className="flex-1 inline-flex items-center justify-between gap-2.5 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-xl px-3 py-2 shadow-[inset_0_2px_4px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_10px_24px_-4px_rgba(23,165,117,0.7),0_0_16px_2px_rgba(0,122,83,0.5),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-bold text-[#2C3531]">
                          Solicitar este servicio
                        </div>
                        <div className="text-[10px] text-[#6E7873]">
                          Cotizar ahora con G-evo
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideo({
                        title: service.title,
                        videoUrl: service.videoPreviewUrl,
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-400/40 text-[11px] font-semibold text-gray-200 hover:text-emerald-300 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current text-amber-400" />
                    <span className="hidden sm:inline">Ver Video</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Reproductor de Video Explicativo */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-opacity duration-300">
          <div
            className="absolute inset-0"
            onClick={() => setActiveVideo(null)}
          />

          <div className="relative w-full max-w-3xl bg-[#0F1420] rounded-3xl border border-amber-500/30 p-6 z-10 shadow-2xl overflow-hidden space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                <track kind="captions" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>

            <div className="text-center pt-2">
              <Link
                href="#contacto"
                onClick={() => setActiveVideo(null)}
                className="gevo-keycap-active px-6 py-2.5 text-xs gap-2"
              >
                <span>Cotizar esta solución ahora</span>
                <ArrowUpRight className="w-4 h-4 text-[#A389F4]" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
