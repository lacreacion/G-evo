import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente Oficial Tipográfico G-evo.
 * - 'G-' en degradado dorado metalizado corporativo (CSS).
 * - 'evo.' en verde esmeralda vibrante característico.
 * - Estricta unión continua sin espacios entre letras ("G-evo.").
 * - Ultra-nítido sin filtros de desenfoque.
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline flex-nowrap font-black tracking-tight select-none ${className}`}>
      <span className="text-gold-metallic">G-</span><span className="text-green-vibrant">evo{withDot ? '.' : ''}</span>
    </span>
  );
};
