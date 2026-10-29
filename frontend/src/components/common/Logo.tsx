import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Logotipo Oficial G-evo.
 * Renderizado exclusivo mediante archivo vectorial SVG limpio y nítido.
 * - 'G' en degradado dorado metalizado oficial.
 * - '-evo.' en verde esmeralda vibrante característico.
 * - Sin iconos extraños (mariposas/símbolos) a la izquierda.
 * - Cero filtros de desenfoque ni colores planos.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const heightMap = {
    sm: 28,
    md: 38,
    lg: 48
  };

  const h = heightMap[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center group select-none ${className}`}
      aria-label="G-evo. Inicio"
    >
      <img
        src="/logo-gevo.svg"
        alt="G-evo."
        style={{ height: `${h}px`, width: 'auto' }}
        className="object-contain transition-transform duration-200 group-hover:scale-105"
        loading="eager"
        decoding="sync"
      />
    </Link>
  );
};
