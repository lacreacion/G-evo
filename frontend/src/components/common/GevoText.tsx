import React from 'react';
import { GevoIsotype } from './GevoIsotype';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
  showIcon?: boolean;
}

/**
 * GevoText: Componente Tipográfico Oficial G-evo.
 * Calibrado 1:1 con la imagen maestra de alta resolución:
 * - 'G': Oro metálico con reflejo especular diagonal (#C6860A -> #F9E46E -> #B87B07 -> #F3D55D).
 * - '-': Guion verde vibrante (#00B84C).
 * - 'evo': Verde esmeralda con reflejo satinado (#00823A -> #15C15D -> #007D37 -> #2CE474).
 * - '.': Punto cuadrado en verde neón brillante (#00DA26).
 */
export const GevoText: React.FC<GevoTextProps> = ({
  className = '',
  withDot = true,
  showIcon = false
}) => {
  return (
    <span
      className={`inline-flex items-baseline flex-nowrap font-black tracking-tight select-none ${className}`}
      style={{ fontFamily: 'Arial, Montserrat, Inter, sans-serif' }}
    >
      {showIcon && (
        <span className="self-center mr-1.5 inline-flex">
          <GevoIsotype size="xs" className="w-[0.95em] h-[0.95em]" />
        </span>
      )}

      {/* Letra "G" con Reflejo Metálico Diagonal Dorado */}
      <span
        className="inline-block bg-clip-text text-transparent font-black"
        style={{
          backgroundImage:
            'linear-gradient(125deg, #C6860A 0%, #E5B435 24%, #F9E46E 46%, #B87B07 64%, #F3D55D 82%, #C89015 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
        }}
      >
        G
      </span>

      {/* Guion "-" en Verde Vibrante Sólido */}
      <span
        className="inline-block font-black text-[#00B84C] mx-[0.5px]"
        style={{
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.18))'
        }}
      >
        -
      </span>

      {/* Letras "evo" con Satén Esmeralda y Reflejo Brillante */}
      <span
        className="inline-block font-black bg-clip-text text-transparent"
        style={{
          backgroundImage:
            'linear-gradient(120deg, #00823A 0%, #15C15D 26%, #007D37 54%, #2CE474 82%, #007F39 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
        }}
      >
        evo
      </span>

      {/* Punto Cuadrado "." en Verde Neón Puro */}
      {withDot && (
        <span
          className="inline-block bg-[#00DA26] w-[0.17em] h-[0.17em] ml-[0.04em] mb-[0.02em] shrink-0"
          style={{
            boxShadow: '0 0 5px rgba(0, 218, 38, 0.45)'
          }}
          aria-label="."
        />
      )}
    </span>
  );
};
