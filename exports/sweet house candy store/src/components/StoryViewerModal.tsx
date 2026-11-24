'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Story } from '@/types';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Pause, Play } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { soundEngine } from '@/lib/soundEngine';

interface StoryViewerModalProps {
  stories: Story[];
  initialStoryIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryViewerModal({
  stories,
  initialStoryIndex,
  isOpen,
  onClose
}: StoryViewerModalProps) {
  const { highlightProduct } = useCart();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const durationPerSlide = 5000; // 5 segundos
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentStoryIndex(initialStoryIndex);
    setCurrentSlideIndex(0);
    setProgress(0);
  }, [initialStoryIndex, isOpen]);

  // Manejo del temporizador de progreso
  useEffect(() => {
    if (!isOpen) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const stepMs = 50;
    const increment = 100 / (durationPerSlide / stepMs);

    timerRef.current = setInterval(() => {
      if (isPaused) return;

      setProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, currentStoryIndex, currentSlideIndex, isPaused]);

  if (!isOpen) return null;

  const currentStory = stories[currentStoryIndex];
  if (!currentStory) return null;

  const currentSlide = currentStory.slides[currentSlideIndex];
  if (!currentSlide) return null;

  const handleNextSlide = () => {
    if (currentSlideIndex < currentStory.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1);
        setCurrentSlideIndex(0);
        setProgress(0);
      } else {
        onClose();
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      if (currentStoryIndex > 0) {
        const prevStory = stories[currentStoryIndex - 1];
        setCurrentStoryIndex((prev) => prev - 1);
        setCurrentSlideIndex(prevStory.slides.length - 1);
        setProgress(0);
      }
    }
  };

  const handleProductCta = (sku: string) => {
    onClose();
    highlightProduct(sku);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] aspect-[9/16] max-h-[88vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerLeave={() => setIsPaused(false)}
      >
        {/* Imagen del Slide */}
        <img
          src={currentSlide.url}
          alt={currentSlide.caption}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* Gradiente de sombreado superior e inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none" />

        {/* Barra superior de progreso e info del usuario */}
        <div className="relative z-10 p-4">
          {/* Segmentos de progreso tipo Instagram */}
          <div className="flex gap-1.5 mb-3">
            {currentStory.slides.map((_, i) => {
              let widthPercent = 0;
              if (i < currentSlideIndex) widthPercent = 100;
              else if (i === currentSlideIndex) widthPercent = Math.min(100, progress);

              return (
                <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Cabecera del perfil */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img
                src={currentStory.avatar}
                alt={currentStory.title}
                className="w-9 h-9 rounded-full object-cover border border-white"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight flex items-center gap-1">
                  {currentStory.user}
                  <span className="text-cyan-400 text-xs">✓</span>
                </span>
                <span className="text-white/70 text-[11px]">{currentSlide.timeAgo}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                title={isPaused ? 'Reanudar' : 'Pausar'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
                title="Cerrar historia"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Zonas de toque Izquierda / Derecha */}
        <div className="absolute inset-y-16 inset-x-0 flex z-10">
          <div
            className="flex-1 cursor-pointer"
            onClick={handlePrevSlide}
            title="Historia anterior"
          />
          <div
            className="flex-1 cursor-pointer"
            onClick={handleNextSlide}
            title="Historia siguiente"
          />
        </div>

        {/* Flechas de navegación para desktop */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors hidden sm:flex"
          aria-label="Historia anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors hidden sm:flex"
          aria-label="Historia siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pie con texto y botón de compra directa */}
        <div className="relative z-10 p-5 text-white flex flex-col gap-3">
          <p className="text-sm font-medium drop-shadow-md leading-snug">
            {currentSlide.caption}
          </p>

          {currentSlide.productLinkSku && (
            <button
              onClick={() => handleProductCta(currentSlide.productLinkSku!)}
              className="candy-btn-gradient w-full py-2.5 text-sm font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{currentSlide.ctaText || 'Ver Producto en Catálogo'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

