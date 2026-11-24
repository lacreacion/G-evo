'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { fireCandyConfetti } from '@/lib/confetti';
import { soundEngine } from '@/lib/soundEngine';

export interface PromoSlide {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  posterUrl?: string;
  badge: string;
  badgeBg: string;
  title: string;
  highlightText: string;
  description: string;
  ctaText: string;
  categoryFilter?: string;
  couponCode?: string;
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'promo-1',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=1600&auto=format&fit=crop&q=85',
    badge: '🎉 2x1 EN CAJAS SELECCIONADAS',
    badgeBg: 'bg-gradient-to-r from-pink-500 to-rose-600',
    title: 'La Fiesta Más Dulce Empieza Aquí',
    highlightText: 'Cupón DULCE10 con 10% OFF',
    description: 'Más de 100 variedades de gomitas, chocolates y dulces internacionales empacados a mano con confeti brillante. ¡Envío GRATIS en compras mayores a $50!',
    ctaText: 'Aprovechar Cupón DULCE10',
    categoryFilter: 'cajas-regalo',
    couponCode: 'DULCE10'
  },
  {
    id: 'promo-2',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1600&auto=format&fit=crop&q=85',
    badge: '✨ TENDENCIA VIRAL 2026',
    badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-600',
    title: 'Edición Especial Dubai Chocolate',
    highlightText: 'Pistacho Tostado & Kadayif',
    description: 'La tableta de chocolate con leche rellena de cremosa pasta de pistacho y hebras crujientes de kadayif que rompió internet. ¡Unidades limitadas!',
    ctaText: 'Ver Chocolates Virales',
    categoryFilter: 'chocolates'
  },
  {
    id: 'promo-3',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=1600&auto=format&fit=crop&q=85',
    badge: '⚡ RETO EXTREMO SOUR',
    badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    title: '¿Te Atreves al Desafío Ácido?',
    highlightText: 'Cinturones & Pica-Pica Extremo',
    description: 'Cajas cargadas con los dulces más intensos: gomitas ácidas de manzana verde, sandía explosiva y polvos efervescentes para los amantes de las emociones fuertes.',
    ctaText: 'Probar Dulces Ácidos',
    categoryFilter: 'acidos'
  },
  {
    id: 'promo-4',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=1600&auto=format&fit=crop&q=85',
    badge: '🎁 REGALO INOLVIDABLE',
    badgeBg: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    title: 'Cajas de Regalo con Confeti Mágico',
    highlightText: 'Tarjeta de Dedicatoria GRATIS',
    description: 'Personaliza tu mensaje de felicitación sin costo adicional. Abrir una caja de Sweet House es una fiesta instantánea llena de color y aromas deliciosos.',
    ctaText: 'Explorar Cajas de Regalo',
    categoryFilter: 'cajas-regalo'
  }
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { setSelectedCategory, applyCoupon, openCart } = useCart();

  const currentSlide = PROMO_SLIDES[currentIndex];

  // Auto-rotación de diapositivas cada 5.5 segundos si no está pausado
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const handlePrev = () => {
    soundEngine.playBubblePopSound();
    setCurrentIndex((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);
  };

  const handleNext = () => {
    soundEngine.playBubblePopSound();
    setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCtaClick = (e: React.MouseEvent, slide: PromoSlide) => {
    soundEngine.playAddToCartSound();
    fireCandyConfetti(e.clientX, e.clientY, 40);

    // Si tiene cupón, aplicarlo al carrito
    if (slide.couponCode) {
      applyCoupon(slide.couponCode);
      openCart(e);
      return;
    }

    // Si tiene filtro de categoría, aplicarlo y scrollear suave al catálogo
    if (slide.categoryFilter) {
      setSelectedCategory(slide.categoryFilter);
      const catEl = document.getElementById('catalogo');
      if (catEl) {
        catEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="relative w-full my-4 sm:my-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-stone-200/80 bg-stone-950 group h-[290px] xs:h-[330px] sm:h-[390px] md:h-[450px] lg:h-[480px] transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrusel de Promociones y Novedades"
    >
      {/* Contenedor de Medios: Las imágenes y videos ocupan el 100% del espacio */}
      {PROMO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                src={slide.mediaUrl}
                poster={slide.posterUrl}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover scale-105"
              />
            ) : (
              <img
                src={slide.mediaUrl}
                alt={slide.title}
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
              />
            )}

            {/* Capa de degradado cinematográfico para máxima legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/20" />

            {/* Contenido Promocional Superpuesto con Espaciado Responsivo */}
            <div className="relative z-20 h-full max-w-2xl px-5 sm:px-10 md:px-14 flex flex-col justify-center">
              
              {/* Badge de la Promoción */}
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md mb-2 sm:mb-3 animate-in fade-in slide-in-from-top-2 duration-500">
                <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold ${slide.badgeBg} text-white`}>
                  {slide.badge}
                </span>
              </div>

              {/* Título de la Promoción */}
              <h2 className="font-heading text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-1 sm:mb-2 drop-shadow-md line-clamp-2">
                {slide.title}
              </h2>

              {/* Subtítulo / Destacado */}
              <div className="font-heading text-xs xs:text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent mb-1.5 sm:mb-3 truncate">
                ✨ {slide.highlightText}
              </div>

              {/* Descripción */}
              <p className="text-stone-200 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3.5 sm:mb-6 max-w-xl drop-shadow">
                {slide.description}
              </p>

              {/* Botón Call to Action & Cupón */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => handleCtaClick(e, slide)}
                  className="candy-btn-gradient px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-bold shadow-xl flex items-center gap-1.5 sm:gap-2 group/btn hover:scale-105 active:scale-95 transition-all"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {slide.couponCode && (
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                    <span>CUPÓN: <strong className="text-amber-300">{slide.couponCode}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Flechas de Navegación Anterior / Siguiente (Adaptadas para no tapar en móvil) */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-stone-900/60 hover:bg-pink-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-110 focus:outline-none"
        title="Promoción anterior"
        aria-label="Promoción anterior"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-stone-900/60 hover:bg-pink-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-110 focus:outline-none"
        title="Siguiente promoción"
        aria-label="Siguiente promoción"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Controles Inferiores: Indicadores de Slides y Botón de Pausa */}
      <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-10 md:left-14 right-4 sm:right-10 z-30 flex items-center justify-between pointer-events-none">
        
        {/* Barras de Progreso Interactivas */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {PROMO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  soundEngine.playBubblePopSound();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 sm:w-10 bg-gradient-to-r from-pink-500 to-amber-400 shadow-md'
                    : 'w-2 sm:w-3 bg-white/40 hover:bg-white/70'
                }`}
                title={`Ir a ${slide.title}`}
                aria-label={`Ir al banner ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Indicador Numérico y Control de Pausa */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-900/70 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/20 text-white text-[10px] sm:text-xs font-semibold pointer-events-auto">
          <span>{currentIndex + 1} / {PROMO_SLIDES.length}</span>
          <span className="text-white/30">•</span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="hover:text-pink-400 transition-colors"
            title={isPaused ? 'Reanudar rotación' : 'Pausar rotación'}
          >
            {isPaused ? <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" /> : <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />}
          </button>
        </div>
      </div>
    </div>
  );
}
