import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Logotipo Oficial G-evo.
 * 1. Sin espacios incorrectos: 'G-evo.' continuo, sin separaciones entre 'e' y 'v'.
 * 2. 'G': Degradado dorado metalizado corporativo (bg-clip-text).
 * 3. '-evo.': Verde vibrante característico en gradiente esmeralda y punto neón.
 * 4. Cero iconos extraños, cero fuentes planas, definición 100% nítida en pantallas Retina.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-[30px] sm:text-[34px]',
    lg: 'text-4xl sm:text-5xl'
  };

  return (
    <Link 
      href="/" 
      className={`inline-flex items-baseline font-black tracking-tight select-none transition-transform duration-200 hover:scale-[1.02] ${sizeClasses[size]} ${className}`}
      aria-label="G-evo. Inicio"
    >
      {/* 'G' con degradado dorado metalizado corporativo */}
      <span 
        className="bg-clip-text text-transparent inline-block leading-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, #FFF6BD 0%, #F5C226 25%, #D8A01A 60%, #9E6E00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12))'
        }}
      >
        G
      </span>

      {/* '-evo' con degradado verde esmeralda vibrante característico (sin espacios) */}
      <span 
        className="bg-clip-text text-transparent inline-block leading-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, #6EE7B7 0%, #22C55E 30%, #15A658 70%, #0B733B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12))'
        }}
      >
        -evo
      </span>

      {/* '.' Punto verde neón brillante característico */}
      <span 
        className="inline-block leading-none"
        style={{
          color: '#00D928',
          textShadow: '0 0 8px rgba(0, 217, 40, 0.4)'
        }}
      >
        .
      </span>
    </Link>
  );
};
