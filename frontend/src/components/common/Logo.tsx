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
 * Logotipo Maestro G-evo. (Fidelidad 1:1 con imagen de alta resolución):
 * 1. Isotipo de 4 hojas inclinadas (-11°): Oro, Verde Esmeralda, Blanco Perla y Gris Grafito.
 * 2. Letra "G": Oro metálico con reflejos especulares diagonales (#C88A0E -> #F8E26B -> #B97C08 -> #F2D35B).
 * 3. Guion "-": Verde vibrante puro (#00B84C).
 * 4. Texto "evo": Verde esmeralda satinado con brillo especular superior derecho (#00843B -> #16C35F -> #007E38 -> #2BE373).
 * 5. Punto ".": Punto cuadrado en verde neón brillante (#00DA26).
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showIcon = true,
  showTagline = false
}) => {
  const sizeMap = {
    sm: { text: 'text-2xl', dot: 'w-[5px] h-[5px]', badge: 'text-[9px]', gap: 'gap-2.5' },
    md: { text: 'text-3xl md:text-[35px]', dot: 'w-[6px] h-[6px] md:w-[7px] md:h-[7px]', badge: 'text-[10px]', gap: 'gap-3 md:gap-3.5' },
    lg: { text: 'text-4xl md:text-5xl', dot: 'w-[8px] h-[8px] md:w-[10px] md:h-[10px]', badge: 'text-xs', gap: 'gap-3.5 md:gap-4' },
    xl: { text: 'text-5xl md:text-6xl', dot: 'w-[10px] h-[10px] md:w-[12px] md:h-[12px]', badge: 'text-sm', gap: 'gap-4 md:gap-5' }
  };

  const current = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${current.gap} group select-none ${className}`}
      aria-label="G-evo. Inicio"
    >
      {/* Isotipo Oficial de 4 Hojas */}
      {showIcon && (
        <GevoIsotype
          size={size}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {/* Palabra de Marca G-evo. */}
      <div className="flex flex-col">
        <div
          className={`font-extrabold tracking-tight leading-none inline-flex items-baseline flex-nowrap ${current.text} transition-transform duration-200 group-hover:scale-[1.01]`}
          style={{ fontFamily: 'Arial, Montserrat, Inter, sans-serif' }}
        >
          {/* Letra "G" con Reflejo Metálico Diagonal Dorado */}
          <span
            className="inline-block bg-clip-text text-transparent font-black"
            style={{
              backgroundImage:
                'linear-gradient(125deg, #C6860A 0%, #E5B435 24%, #F9E46E 46%, #B87B07 64%, #F3D55D 82%, #C89015 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.22))'
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

          {/* Letras "evo" con Satén Esmeralda y Reflejo Brillante en la "o" */}
          <span
            className="inline-block font-black bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(120deg, #00823A 0%, #15C15D 26%, #007D37 54%, #2CE474 82%, #007F39 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.22))'
            }}
          >
            evo
          </span>

          {/* Punto Cuadrado "." en Verde Neón Puro */}
          <span
            className={`inline-block bg-[#00DA26] ${current.dot} ml-[2px] mb-[1px] shrink-0`}
            style={{
              boxShadow: '0 0 6px rgba(0, 218, 38, 0.45)'
            }}
            aria-hidden="true"
          />
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
