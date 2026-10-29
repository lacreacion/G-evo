import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const heightMap = {
    sm: 30,
    md: 40,
    lg: 50
  };

  const h = heightMap[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center group select-none ${className}`}
      aria-label="G-evo. Inicio"
    >
      {/* Logotipo Vectorial SVG de Alta Resolución (Ultra Nítido en Pantallas Retina) */}
      <img
        src="/logo-gevo.svg"
        alt="G-evo. Tarjetas & Catálogos Digitales"
        style={{ height: `${h}px`, width: 'auto' }}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
        loading="eager"
        decoding="sync"
      />
    </Link>
  );
};
