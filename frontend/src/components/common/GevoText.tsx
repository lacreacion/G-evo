import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente de Identidad Visual Oficial G-evo.
 * Renderiza el wordmark tridimensional idéntico al logotipo oficial (G dorada metálica 3D,
 * guion verde vibrante, 'evo' en esmeralda 3D con relieve y punto verde neón).
 * Escala automáticamente al tamaño de la tipografía circundante mediante unidades 'em'.
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-center align-middle select-none ${className}`}>
      <img
        src="/gevo-wordmark-3d@4x.png"
        alt="G-evo."
        className="inline-block object-contain h-[1.12em] w-auto align-middle -translate-y-[0.06em] drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] pointer-events-none"
        loading="eager"
      />
    </span>
  );
};
