import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente de Identidad Visual Oficial G-evo.
 * Renderiza el wordmark vectorial SVG de ultra-alta resolución (definición Retina nítida),
 * con 'G' en gradiente dorado metálico 3D, '-evo' en verde esmeralda vibrante y '.' neón.
 * Escala automáticamente al tamaño exacto de la tipografía circundante mediante 'em'.
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
