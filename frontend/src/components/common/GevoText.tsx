import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente Oficial G-evo.
 * Renderiza el wordmark vectorial SVG de ultra-alta definición con los colores oficiales de la marca:
 * - 'G' en degradado dorado metalizado.
 * - '-evo.' en verde vibrante característico.
 * - Sin sombras difusas ni desenfoque, nítido en pantallas Retina.
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-center align-middle select-none ${className}`}>
      <img
        src="/gevo-wordmark.svg"
        alt="G-evo."
        className="inline-block object-contain h-[1.12em] w-auto align-middle -translate-y-[0.06em] pointer-events-none"
        loading="eager"
        decoding="sync"
      />
    </span>
  );
};
