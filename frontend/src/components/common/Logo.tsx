import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

/**
 * Logotipo Oficial G-evo.
 * Calibrado al 100% con las referencias fotográficas:
 * 1. Letra "G": Oro líquido metalizado fluido (#FFFF55 -> #FBFA00 -> #E4AE03 -> #9E7200).
 * 2. Texto "-evo.": Satén verde esmeralda lustroso (#2AE67A -> #00B050 -> #058226).
 * 3. Estrictamente continuo "G-evo." sin separaciones.
 * 4. 100% tipográfico y limpio (sin iconos ni filtros de desenfoque).
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false
}) => {
  const sizeMap = {
    sm: { text: 'text-2xl', badge: 'text-[9px]' },
    md: { text: 'text-3xl md:text-[34px]', badge: 'text-[10px]' },
    lg: { text: 'text-4xl md:text-5xl', badge: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center group select-none ${className}`}
      aria-label="G-evo. Inicio"
    >
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none inline-flex items-baseline flex-nowrap ${currentSize.text} transition-transform duration-200 group-hover:scale-[1.02]`}>
          {/* "G": Textura de Oro Líquido Brillante (Referencia 1) */}
          <span 
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFFF66 0%, #FBFA00 25%, #E4AE03 65%, #9E7200 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
            }}
          >
            G
          </span>{/* "-evo.": Textura de Satén Verde Esmeralda Sedoso (Referencia 2) */}<span 
            className="inline-block font-black bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #2AE67A 0%, #00B050 45%, #058226 80%, #025209 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))'
            }}
          >-evo.</span>
        </div>
        {showTagline && (
          <span className={`text-gray-400 font-medium tracking-wider uppercase mt-1 ${currentSize.badge}`}>
            Tarjetas &amp; Catálogos Digitales
          </span>
        )}
      </div>
    </Link>
  );
};
