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
  const sizeMap = {
    sm: { icon: 26, text: 'text-xl' },
    md: { icon: 34, text: 'text-2xl' },
    lg: { icon: 44, text: 'text-3xl' }
  };

  const currentSize = sizeMap[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Isotipo Fiel a la Imagen: 4 pétalos orgánicos (Dorado, Verde, Gris Plata y Verde Oscuro) */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Pétalo Superior Izquierdo: Dorado Metálico */}
          <path
            d="M16.5 16.5C16.5 10 11.5 5 5 5C5 11.5 10 16.5 16.5 16.5Z"
            fill="url(#goldPetalGradient)"
          />

          {/* Pétalo Superior Derecho: Verde Vibrante */}
          <path
            d="M19.5 16.5C19.5 10 24.5 5 31 5C31 11.5 26 16.5 19.5 16.5Z"
            fill="url(#greenPetalGradient)"
          />

          {/* Pétalo Inferior Izquierdo: Gris Plata Metalizado */}
          <path
            d="M16.5 19.5C16.5 26 11.5 31 5 31C5 24.5 10 19.5 16.5 19.5Z"
            fill="url(#silverPetalGradient)"
          />

          {/* Pétalo Inferior Derecho: Verde Bosque Tecnológico */}
          <path
            d="M19.5 19.5C19.5 26 24.5 31 31 31C31 24.5 26 19.5 19.5 19.5Z"
            fill="url(#darkGreenPetalGradient)"
          />

          {/* Definiciones de Gradientes Oficiales */}
          <defs>
            <linearGradient id="goldPetalGradient" x1="5" y1="5" x2="16.5" y2="16.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id="greenPetalGradient" x1="19.5" y1="5" x2="31" y2="16.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="silverPetalGradient" x1="5" y1="19.5" x2="16.5" y2="31" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>

            <linearGradient id="darkGreenPetalGradient" x1="19.5" y1="19.5" x2="31" y2="31" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="70%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tipografía Oficial: 'G-' dorado y '-evo.' en verde vibrante */}
      <div className={`font-black tracking-tight leading-none ${currentSize.text}`}>
        <span className="text-[#D97706] font-extrabold">G-</span>
        <span className="text-[#10B981] font-extrabold">evo.</span>
      </div>
    </Link>
  );
};
