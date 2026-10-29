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
    sm: 28,
    md: 38,
    lg: 48
  };

  const h = heightMap[size];

  return (
    <Link href="/" className={`inline-flex items-center group select-none ${className}`}>
      {/* Logotipo Oficial Idéntico al Diseño de Referencia con Fondos Transparentes */}
      <img
        src="/logo-gevo.png"
        alt="G-evo. Tarjetas &amp; Catálogos Digitales"
        style={{ height: `${h}px`, width: 'auto' }}
        className="object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
};
