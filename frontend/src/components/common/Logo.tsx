import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Logotipo Oficial G-evo.
 * Reglas Estrictas:
 * 1. Sin iconos, mariposas ni símbolos a la izquierda: solo el texto tipográfico 'G-evo.'.
 * 2. 'G' con gradiente dorado metalizado en CSS (bg-clip-text text-transparent).
 * 3. '-evo.' en verde esmeralda vibrante (text-emerald-500).
 * 4. Nitidez vectorial pura para pantallas Retina sin sombras difusas ni desenfoque.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-[30px] md:text-[34px]',
    lg: 'text-4xl'
  };

  return (
    <Link 
      href="/" 
      className={`inline-flex items-baseline font-black tracking-tight select-none transition-transform duration-200 hover:scale-[1.02] ${sizeClasses[size]} ${className}`}
      aria-label="G-evo. Inicio"
    >
      <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent leading-none">
        G
      </span>
      <span className="text-emerald-500 leading-none">
        -evo
      </span>
      <span className="text-emerald-400 leading-none">
        .
      </span>
    </Link>
  );
};
