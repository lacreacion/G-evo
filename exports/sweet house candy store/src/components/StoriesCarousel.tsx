'use client';

import React, { useState, useRef } from 'react';
import { INITIAL_STORIES, metaStoriesService } from '@/lib/metaStoriesService';
import { Story } from '@/types';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import StoryViewerModal from './StoryViewerModal';
import { fireCandyConfetti } from '@/lib/confetti';
import { soundEngine } from '@/lib/soundEngine';

export default function StoriesCarousel() {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleOpenStory = (index: number) => {
    soundEngine.playBubblePopSound();
    setStories((prev) =>
      prev.map((s, i) => (i === index ? { ...s, hasUnseen: false } : s))
    );
    setSelectedStoryIndex(index);
  };

  const handleSyncMeta = async (e: React.MouseEvent) => {
    setIsSyncing(true);
    soundEngine.playBubblePopSound();
    const res = await metaStoriesService.syncWithMeta();
    setIsSyncing(false);

    fireCandyConfetti(e.clientX, e.clientY, 45);
  };

  return (
    <div className="relative py-4 border-b border-stone-200">
      <div className="relative flex items-center">
        
        {/* Flecha Izquierda */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute -left-3 z-10 w-9 h-9 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:text-pink-600 hover:border-pink-500 transition-all hidden md:flex"
          aria-label="Desplazar historias hacia la izquierda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carrusel horizontal de historias */}
        <div
          ref={trackRef}
          className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto scrollbar-none py-1 px-1 sm:px-2 scroll-smooth w-full"
        >
          {/* Botón de Sincronización Meta en Vivo */}
          <div
            onClick={handleSyncMeta}
            className="flex flex-col items-center cursor-pointer flex-shrink-0 text-center group"
            title="Sincronizar historias en vivo de Instagram y Facebook"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full p-[2.5px] sm:p-[3px] bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-purple-600 border-2 border-white">
                <RefreshCw className={`w-5 h-5 sm:w-6 sm:h-6 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-90 transition-transform'}`} />
              </div>
            </div>
          </div>

          {/* Lista de Historias estilo Instagram */}
          {stories.map((story, index) => {
            const ringClass = story.isLive
              ? 'ring-live'
              : story.hasUnseen
              ? 'ring-rainbow'
              : 'ring-viewed';

            return (
              <div
                key={story.id}
                onClick={() => handleOpenStory(index)}
                className="flex flex-col items-center cursor-pointer flex-shrink-0 text-center group"
                role="button"
                tabIndex={0}
                aria-label={`Ver historia de ${story.title}`}
              >
                <div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full p-[2.5px] sm:p-[3px] ${ringClass} group-hover:scale-105 transition-transform flex-shrink-0`}
                >
                  <img
                    src={story.avatar}
                    alt={story.title}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    loading="lazy"
                  />
                  {story.isLive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border-2 border-white tracking-wider">
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Flecha Derecha */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute -right-3 z-10 w-9 h-9 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:text-pink-600 hover:border-pink-500 transition-all hidden md:flex"
          aria-label="Desplazar historias hacia la derecha"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Modal de visualización */}
      {selectedStoryIndex !== null && (
        <StoryViewerModal
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          isOpen={selectedStoryIndex !== null}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}
    </div>
  );
}

