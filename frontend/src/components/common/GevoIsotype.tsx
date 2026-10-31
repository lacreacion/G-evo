import React from 'react';

interface GevoIsotypeProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Isotipo Oficial G-evo (Calibrado 1:1 con imagen maestra de alta resolución):
 * - Cuadrícula 2x2 de hojas orgánicas (esquinas opuestas agudas r=4 y curvas amplias R=22)
 * - Inclinación global de -11° en sentido antihorario (idéntico al logo original)
 * - 1. Arriba-Izquierda: Oro cálido metalizado (#F4DA7A -> #D8AE48 -> #BA8924)
 * - 2. Arriba-Derecha: Verde esmeralda profundo (#20A875 -> #149063 -> #0C754D)
 * - 3. Abajo-Izquierda: Blanco perla / Plata suave (#F7F9F9 -> #DFE3E2 -> #C2C8C6)
 * - 4. Abajo-Derecha: Gris grafito / Carbón (#969E9B -> #7D8582 -> #616865)
 */
export const GevoIsotype: React.FC<GevoIsotypeProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-7 h-7',
    md: 'w-9 h-9 md:w-10 md:h-10',
    lg: 'w-12 h-12 md:w-14 md:h-14',
    xl: 'w-16 h-16 md:w-20 md:h-20'
  };

  const currentSizeClass = sizeMap[size];

  return (
    <svg
      viewBox="0 0 100 100"
      className={`shrink-0 select-none ${currentSizeClass} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.22))'
      }}
    >
      <defs>
        {/* 1. Hoja Superior Izquierda: Oro Cálido Satinado */}
        <linearGradient id="gevoGoldLeaf" x1="10" y1="10" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4DA7A" />
          <stop offset="50%" stopColor="#D8AE48" />
          <stop offset="100%" stopColor="#B88620" />
        </linearGradient>

        {/* 2. Hoja Superior Derecha: Verde Esmeralda */}
        <linearGradient id="gevoGreenLeaf" x1="55" y1="10" x2="90" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22AA77" />
          <stop offset="55%" stopColor="#149063" />
          <stop offset="100%" stopColor="#0B724B" />
        </linearGradient>

        {/* 3. Hoja Inferior Izquierda: Blanco Perla / Plata */}
        <linearGradient id="gevoSilverLeaf" x1="10" y1="55" x2="45" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFA" />
          <stop offset="55%" stopColor="#DCE0DF" />
          <stop offset="100%" stopColor="#BFC5C4" />
        </linearGradient>

        {/* 4. Hoja Inferior Derecha: Gris Grafito / Carbón */}
        <linearGradient id="gevoCharcoalLeaf" x1="55" y1="55" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#98A09D" />
          <stop offset="50%" stopColor="#7D8582" />
          <stop offset="100%" stopColor="#5F6663" />
        </linearGradient>
      </defs>

      {/* Grupo rotado -11 grados como en la imagen original */}
      <g transform="rotate(-11 50 50)">
        {/* Hoja 1: Oro (Arriba-Izquierda) - Puntas en Sup-Izq y Inf-Der, curvas en Sup-Der e Inf-Izq */}
        <path
          d="M 14 10 L 23 10 C 36 10, 45 19, 45 32 L 45 41 C 45 43.5, 43.5 45, 41 45 L 32 45 C 19 45, 10 36, 10 23 L 10 14 C 10 11.5, 11.5 10, 14 10 Z"
          fill="url(#gevoGoldLeaf)"
        />

        {/* Hoja 2: Verde (Arriba-Derecha) - Puntas en Sup-Der e Inf-Izq, curvas en Sup-Izq e Inf-Der */}
        <path
          d="M 77 10 L 86 10 C 88.5 10, 90 11.5, 90 14 L 90 23 C 90 36, 81 45, 68 45 L 59 45 C 56.5 45, 55 43.5, 55 41 L 55 32 C 55 19, 64 10, 77 10 Z"
          fill="url(#gevoGreenLeaf)"
        />

        {/* Hoja 3: Plata/Blanco (Abajo-Izquierda) - Puntas en Sup-Der e Inf-Izq, curvas en Sup-Izq e Inf-Der */}
        <path
          d="M 32 55 L 41 55 C 43.5 55, 45 56.5, 45 59 L 45 68 C 45 81, 36 90, 23 90 L 14 90 C 11.5 90, 10 88.5, 10 86 L 10 77 C 10 64, 19 55, 32 55 Z"
          fill="url(#gevoSilverLeaf)"
        />

        {/* Hoja 4: Grafito (Abajo-Derecha) - Puntas en Sup-Izq e Inf-Der, curvas en Sup-Der e Inf-Izq */}
        <path
          d="M 59 55 L 68 55 C 81 55, 90 64, 90 77 L 90 86 C 90 88.5, 88.5 90, 86 90 L 77 90 C 64 90, 55 81, 55 68 L 55 59 C 55 56.5, 56.5 55, 59 55 Z"
          fill="url(#gevoCharcoalLeaf)"
        />
      </g>
    </svg>
  );
};
