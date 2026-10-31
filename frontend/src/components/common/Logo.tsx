import React from 'react';
import Link from 'next/link';
import { GevoIsotype } from './GevoIsotype';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  showTagline?: boolean;
}

/**
 * Logotipo Maestro G-evo.
 * Diseñado con total fidelidad a la identidad gráfica oficial:
 * 1. Isotipo: 4 hojas orgánicas (Oro metalizado, Verde esmeralda, Plata y Carbón).
 * 2. Letra "G": Oro metalizado cálido (#FDE68A -> #FBBF24 -> #D97706 -> #92400E).
 * 3. Guion "-": Verde esmeralda vibrante (#00BA4E).
 * 4. Texto "evo": Satén verde esmeralda (#34D399 -> #059669 -> #047857 -> #064E3B).
 * 5. Punto ".": Verde lima / neón luminoso (#00E63D).
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showIcon = true,
  showTagline = false
}) => {
  const sizeMap = {
    sm: { text: 'text-2xl', badge: 'text-[9px]', gap: 'gap-2' },
    md: { text: 'text-3xl md:text-[34px]', badge: 'text-[10px]', gap: 'gap-2.5 md:gap-3' },
    lg: { text: 'text-4xl md:text-5xl', badge: 'text-xs', gap: 'gap-3 md:gap-3.5' },
    xl: { text: 'text-5xl md:text-6xl', badge: 'text-sm', gap: 'gap-3.5 md:gap-4' }
  };

  const current = sizeMap[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center ${current.gap} group select-none ${className}`}
      aria-label="G-evo. Inicio"
    >
      {/* Isotipo Oficial (4 Hojas) */}
      {showIcon && (
        <GevoIsotype 
          size={size} 
          className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3" 
        />
      )}

      {/* Logotipo Tipográfico */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none inline-flex items-baseline flex-nowrap ${current.text} transition-transform duration-200 group-hover:scale-[1.01]`}>
          
          {/* Letra "G" (Oro Líquido Metalizado) */}
          <span 
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 35%, #D97706 70%, #92400E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))'
            }}
          >
            G
          </span>

          {/* Guion "-" (Verde Esmeralda Vibrante) */}
          <span 
            className="inline-block font-black text-[#00BA4E]"
            style={{
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
            }}
          >
            -
          </span>

          {/* Texto "evo" (Verde Esmeralda Satinado) */}
          <span 
            className="inline-block font-black bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #34D399 0%, #059669 40%, #047857 80%, #064E3B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))'
            }}
          >
            evo
          </span>

          {/* Punto "." (Verde Lima Neón) */}
          <span 
            className="inline-block font-black text-[#00E63D] ml-[1px]"
            style={{
              textShadow: '0 0 8px rgba(0, 230, 61, 0.5)'
            }}
          >
            .
          </span>
        </div>

        {showTagline && (
          <span className={`text-gray-400 font-medium tracking-wider uppercase mt-1 ${current.badge}`}>
            Tarjetas &amp; Catálogos Digitales
          </span>
        )}
      </div>
    </Link>
  );
};
