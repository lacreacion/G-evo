import React from 'react';
import { GevoIsotype } from './GevoIsotype';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
  showIcon?: boolean;
}

/**
 * GevoText: Componente Tipográfico Oficial G-evo.
 * Calibrado con fidelidad 1:1 a la identidad corporativa:
 * - 'G': Oro cálido metalizado (#FDE68A -> #FBBF24 -> #D97706 -> #92400E).
 * - '-': Guion verde esmeralda vibrante (#00BA4E).
 * - 'evo': Verde esmeralda satinado (#34D399 -> #059669 -> #047857 -> #064E3B).
 * - '.': Punto verde lima neón (#00E63D).
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true,
  showIcon = false
}) => {
  return (
    <span className={`inline-flex items-baseline flex-nowrap font-black tracking-tight select-none ${className}`}>
      {showIcon && (
        <span className="self-center mr-1.5 inline-flex">
          <GevoIsotype size="xs" className="w-[0.9em] h-[0.9em]" />
        </span>
      )}

      {/* "G" Oro Cálido Metalizado */}
      <span 
        className="inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 35%, #D97706 70%, #92400E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
        }}
      >
        G
      </span>

      {/* "-" Guion Verde Esmeralda */}
      <span 
        className="inline-block font-black text-[#00BA4E]"
        style={{
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
        }}
      >
        -
      </span>

      {/* "evo" Verde Esmeralda Satinado */}
      <span 
        className="inline-block font-black bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #34D399 0%, #059669 40%, #047857 80%, #064E3B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
        }}
      >
        evo
      </span>

      {/* "." Punto Verde Neón Brillante */}
      {withDot && (
        <span 
          className="inline-block font-black text-[#00E63D] ml-[0.5px]"
          style={{
            textShadow: '0 0 6px rgba(0, 230, 61, 0.5)'
          }}
        >
          .
        </span>
      )}
    </span>
  );
};
