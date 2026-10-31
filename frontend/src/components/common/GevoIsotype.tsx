import React from 'react';

interface GevoIsotypeProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Isotipo Oficial G-evo:
 * Emblema de 4 hojas / pétalos simétricos:
 * - Arriba Izquierda: Dorado Cálido Metalizado (#FDE68A -> #FBBF24 -> #D97706 -> #92400E)
 * - Arriba Derecha: Verde Esmeralda Satinado (#34D399 -> #059669 -> #047857 -> #064E3B)
 * - Abajo Izquierda: Plata / Platino Pulido (#FFFFFF -> #E2E8F0 -> #CBD5E1 -> #94A3B8)
 * - Abajo Derecha: Grafito / Titanio Carbón (#94A3B8 -> #64748B -> #475569 -> #334155)
 */
export const GevoIsotype: React.FC<GevoIsotypeProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8 md:w-9 md:h-9',
    lg: 'w-10 h-10 md:w-12 md:h-12',
    xl: 'w-14 h-14 md:w-16 md:h-16'
  };

  const currentSizeClass = sizeMap[size];

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`shrink-0 select-none ${currentSizeClass} ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* 1. Hoja Dorada (Arriba-Izquierda) */}
        <linearGradient id="gevoGoldLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="30%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* 2. Hoja Verde Esmeralda (Arriba-Derecha) */}
        <linearGradient id="gevoGreenLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="40%" stopColor="#059669" />
          <stop offset="80%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        {/* 3. Hoja Plateada / Platino (Abajo-Izquierda) */}
        <linearGradient id="gevoSilverLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E2E8F0" />
          <stop offset="80%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* 4. Hoja Grafito / Carbón (Abajo-Derecha) */}
        <linearGradient id="gevoCharcoalLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="45%" stopColor="#64748B" />
          <stop offset="80%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Hoja 1: Oro (Arriba-Izquierda) */}
      <path 
        d="M 45 44 C 42 32, 32 16, 12 12 C 14 32, 30 42, 44 45 C 44.8 44.8, 45 44.5, 45 44 Z" 
        fill="url(#gevoGoldLeaf)" 
      />

      {/* Hoja 2: Verde Esmeralda (Arriba-Derecha) */}
      <path 
        d="M 55 44 C 58 32, 68 16, 88 12 C 86 32, 70 42, 56 45 C 55.2 44.8, 55 44.5, 55 44 Z" 
        fill="url(#gevoGreenLeaf)" 
      />

      {/* Hoja 3: Plata (Abajo-Izquierda) */}
      <path 
        d="M 45 56 C 42 68, 32 84, 12 88 C 14 68, 30 58, 44 55 C 44.8 55.2, 45 55.5, 45 56 Z" 
        fill="url(#gevoSilverLeaf)" 
      />

      {/* Hoja 4: Grafito (Abajo-Derecha) */}
      <path 
        d="M 55 56 C 58 68, 68 84, 88 88 C 86 68, 70 58, 56 55 C 55.2 55.2, 55 55.5, 55 56 Z" 
        fill="url(#gevoCharcoalLeaf)" 
      />
    </svg>
  );
};
