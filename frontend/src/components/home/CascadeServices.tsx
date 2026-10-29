'use client';

import React, { useState } from 'react';
import { CASCADE_SERVICES, ServiceItem } from '@/lib/mockData';
import { 
  Play, 
  CheckCircle2, 
  Award, 
  Zap, 
  X, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const CascadeServices: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    videoUrl: string;
  } | null>(null);

  return (
    <section id="servicios" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Nuestras Soluciones de Alto Impacto</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Servicios diseñados para la{' '}
            <span className="text-gold-metallic">Evolución</span> de tu Negocio
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Una suite completa que combina presencia física de lujo, vitrinas web ultra-rápidas y automatización inteligente con Inteligencia Artificial.
          </p>
        </div>

        {/* 4 Cajas con Animación en Cascada (Cascade Effect) */}
        <div className="space-y-12">
          {CASCADE_SERVICES.map((service: ServiceItem, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className="group relative rounded-3xl bg-gradient-to-b from-[#111827]/90 to-[#0A0E17]/90 border border-white/10 hover:border-emerald-500/40 p-6 md:p-10 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
                style={{
                  // Simulación de efecto cascada progresivo
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Badge Numerado de Cascada */}
                <div className="absolute -top-4 left-8 px-4 py-1 rounded-full bg-[#0E1524] border border-amber-500/40 text-amber-300 font-extrabold text-xs shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>0{service.id} // {service.badge}</span>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}>
                  
                  {/* Columna de Video Explicativo / Player Preview */}
                  <div className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-8'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/video">
                      <img
                        src={service.videoThumbnail}
                        alt={service.title}
                        className="w-full h-56 sm:h-64 object-cover filter brightness-90 group-hover/video:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <button
                          onClick={() =>
                            setActiveVideo({
                              title: service.title,
                              videoUrl: service.videoPreviewUrl
                            })
                          }
                          className="relative p-4 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-black shadow-xl hover:scale-110 transition-all duration-300 group/btn"
                          aria-label={`Ver video explicativo de ${service.title}`}
                        >
                          <Play className="w-6 h-6 fill-black ml-0.5" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-white bg-black/80 px-2.5 py-1 rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity">
                            Reproducir Video
                          </span>
                        </button>
                      </div>

                      {/* Tag de Video Explicativo */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/10 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Video Explicativo</span>
                      </div>
                    </div>
                  </div>

                  {/* Columna de Características y Ventajas Competitivas */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium mt-1">
                        {service.tagline}
                      </p>
                      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Características Principales */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Características Técnicas y Funcionales</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ventajas Competitivas de G-evo */}
                    <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-amber-300 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>Ventajas Competitivas de G-evo</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {service.competitiveAdvantages.map((adv, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA a contacto / cotización */}
                    <div className="pt-2">
                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                      >
                        <span>Solicitar este servicio con G-evo</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Reproductor de Video Explicativo */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
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
                className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5"
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
                Tu navegador no soporta el formato de video.
              </video>
            </div>

            <div className="text-center pt-2">
              <a
                href="#contacto"
                onClick={() => setActiveVideo(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 shadow-md"
              >
                <span>Cotizar esta solución ahora</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

