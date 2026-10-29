'use client';

import React from 'react';
import { X, Sparkles, Target, Compass, BookOpen, ShieldCheck } from 'lucide-react';
import { CORPORATE_INFO } from '@/lib/mockData';

export type CorporateTab = 'vision' | 'mision' | 'historia' | null;

interface CorporateModalProps {
  activeTab: CorporateTab;
  onClose: () => void;
  onSelectTab: (tab: CorporateTab) => void;
}

export const CorporateModal: React.FC<CorporateModalProps> = ({
  activeTab,
  onClose,
  onSelectTab
}) => {
  if (!activeTab) return null;

  const currentData = CORPORATE_INFO[activeTab];

  const getIcon = () => {
    switch (activeTab) {
      case 'vision':
        return <Compass className="w-6 h-6 text-emerald-400" />;
      case 'mision':
        return <Target className="w-6 h-6 text-amber-400" />;
      case 'historia':
        return <BookOpen className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0E1524] border border-amber-500/30 rounded-2xl shadow-2xl p-6 md:p-8 z-10 overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with tabs and close button */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              {getIcon()}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400">
                {currentData.badge}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {currentData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tab Switcher inside Modal */}
        <div className="flex items-center gap-2 mt-4 p-1.5 bg-black/40 rounded-xl border border-white/5">
          <button
            onClick={() => onSelectTab('vision')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'vision'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Visión
          </button>
          <button
            onClick={() => onSelectTab('mision')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mision'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Misión
          </button>
          <button
            onClick={() => onSelectTab('historia')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'historia'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Historia
          </button>
        </div>

        {/* Content Paragraphs */}
        <div className="mt-6 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
            {currentData.p1}
          </p>
          <p className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
            {currentData.p2}
          </p>
        </div>

        {/* Footer info badge */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
            <ShieldCheck className="w-4 h-4" />
            Ecosistema Tecnológico Certificado G-evo
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

