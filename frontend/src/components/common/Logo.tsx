import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

/**
 * Logotipo Oficial G-evo.
 * - Estrictamente tipográfico y limpio (sin iconos, lazos, símbolos o mariposas a los lados).
 * - "G": Amarillo/dorado metalizado líquido con gradiente (from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent).
 * - "-evo.": Verde esmeralda brillante y sedoso (text-[#00B050] / satén verde vibrante).
 * - Cero espacios erróneos: texto estrictamente continuo "G-evo.".
 * - Alta definición vectorial en pantallas Retina sin filtros de desenfoque (blur).
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
          <span 
            className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent inline-block"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FEF08A 0%, #FDE047 25%, #F59E0B 60%, #B45309 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            G
          </span><span 
            className="text-[#00B050] inline-block font-black"
            style={{
              color: '#00B050',
              textShadow: '0 0 10px rgba(0, 176, 80, 0.28)'
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
