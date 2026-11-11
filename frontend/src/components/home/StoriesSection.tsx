'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MOCK_STORIES, StoryItem } from '@/lib/mockData';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Radio
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/common/SocialIcons';

export const StoriesSection: React.FC = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // Auto-progress timer for active story in modal
  useEffect(() => {
    if (selectedStoryIndex === null) {
      return;
    }

    const duration = 5000; // 5 seconds per story
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Go to next story or close
          if (selectedStoryIndex < MOCK_STORIES.length - 1) {
            setSelectedStoryIndex(selectedStoryIndex + 1);
            return 0;
          } else {
            setSelectedStoryIndex(null);
            return 0;
          }
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [selectedStoryIndex]);

  const handleClose = () => {
    setSelectedStoryIndex(null);
    setProgress(0);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < MOCK_STORIES.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
      setProgress(0);
    } else {
      handleClose();
    }
  };

  const handlePrevStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
      setProgress(0);
    }
  };

  const currentStory: StoryItem | null =
    selectedStoryIndex !== null ? MOCK_STORIES[selectedStoryIndex] : null;

  return (
    <section className="relative py-8 border-y border-white/10 bg-[#042419]/65 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center">
        
        {/* Encabezado del Módulo de Historias (Centrado en la franja) */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 mb-6 max-w-3xl">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white flex flex-wrap items-center justify-center sm:justify-start gap-2">
                Historias en Vivo de la Marca
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Sincronizado vía API
                </span>
              </h2>
              <p className="text-xs text-gray-300">
                Conectado en tiempo real con perfiles oficiales de Instagram y Facebook
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>@g_evo.digital</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1">
              <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>GEVO Ecosistema</span>
            </span>
          </div>
        </div>

        {/* Franja Centrada de Tarjetas Verticales de Historias (Formato Original Facebook/Instagram Stories) */}
        <div className="w-full flex items-center justify-start sm:justify-center gap-3.5 sm:gap-5 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {MOCK_STORIES.map((story, index) => {
            const isInstagram = story.platform === 'Instagram';

            return (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStoryIndex(index);
                  setProgress(0);
                }}
                className="group relative w-[124px] sm:w-[142px] h-[204px] sm:h-[226px] rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer border border-white/15 shadow-[0_10px_28px_rgba(0,0,0,0.45)] hover:border-[#22C58B] hover:shadow-[0_12px_32px_rgba(34,197,139,0.35)] transition-all duration-300 focus:outline-none text-left"
              >
                {/* Imagen Vertical de Fondo de la Historia */}
                <Image
                  src={story.mediaUrl}
                  alt={story.caption}
                  fill
                  unoptimized
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />

                {/* Sombreado Superior e Inferior para Contraste Nítido */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/85 pointer-events-none" />

                {/* Aro Circular de Perfil en la Esquina Superior Izquierda (Como en la imagen de referencia) */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className={`relative p-[2.5px] rounded-full shadow-md ${
                      isInstagram
                        ? 'bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600'
                        : 'bg-[#1877F2]'
                    }`}
                  >
                    <div className="p-[1.5px] bg-[#062318] rounded-full">
                      <Image
                        src={story.avatarUrl}
                        alt={story.userName}
                        width={36}
                        height={36}
                        unoptimized
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                      />
                    </div>

                    {/* Mini insignia de plataforma */}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white shadow ${
                        isInstagram
                          ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600'
                          : 'bg-[#1877F2]'
                      }`}
                    >
                      {isInstagram ? (
                        <InstagramIcon className="w-2.5 h-2.5" />
                      ) : (
                        <FacebookIcon className="w-2.5 h-2.5" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Nombre de Usuario y Tiempo en la Parte Inferior de la Tarjeta Vertical */}
                <div className="absolute bottom-3 left-3 right-3 z-10 leading-tight">
                  <div className="text-xs font-bold text-white drop-shadow truncate group-hover:text-[#6EE7B7] transition-colors">
                    {story.userName}
                  </div>
                  <div className="text-[10px] text-gray-300 mt-0.5 drop-shadow">
                    {story.timeAgo}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Modal Visor de Historia a Pantalla Completa (Tipo Instagram Stories) */}
      {currentStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* Story Container Card */}
          <div className="relative w-full max-w-sm h-[600px] bg-[#0E131F] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col justify-between">
            
            {/* Story Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={currentStory.mediaUrl}
                alt="Historia corporativa"
                fill
                unoptimized
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
            </div>

            {/* Top Bar: Progress & User Info */}
            <div className="relative z-10 p-4 space-y-3">
              {/* Multi-story Segment Progress Bar */}
              <div className="flex items-center gap-1.5 w-full">
                {MOCK_STORIES.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-75"
                      style={{
                        width:
                          i === selectedStoryIndex
                            ? `${progress}%`
                            : selectedStoryIndex !== null && i < selectedStoryIndex
                            ? '100%'
                            : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

            {/* Profile Header */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={currentStory.avatarUrl}
                    alt={currentStory.userName}
                    width={36}
                    height={36}
                    unoptimized
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>{currentStory.userName}</span>
                      <Sparkles className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="text-[10px] text-gray-300">
                      {currentStory.platform} • {currentStory.timeAgo}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                  aria-label="Cerrar historia"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Click Zones */}
            <div className="absolute inset-y-16 inset-x-0 z-10 flex">
              <div
                className="w-1/2 h-full cursor-pointer flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity"
                onClick={handlePrevStory}
              >
                <div className="p-2 rounded-full bg-black/50 text-white">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </div>
              <div
                className="w-1/2 h-full cursor-pointer flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity"
                onClick={handleNextStory}
              >
                <div className="p-2 rounded-full bg-black/50 text-white">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bottom Caption and CTA */}
            <div className="relative z-10 p-5 space-y-3">
              <p className="text-sm text-white font-medium drop-shadow-md leading-relaxed">
                {currentStory.caption}
              </p>

              {currentStory.actionUrl && (
                <a
                  href={currentStory.actionUrl}
                  onClick={handleClose}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>{currentStory.actionText || 'Conoce más'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
