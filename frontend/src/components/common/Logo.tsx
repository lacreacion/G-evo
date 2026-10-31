import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-xl', badge: 'text-[9px]' },
    md: { icon: 38, text: 'text-2xl md:text-3xl', badge: 'text-[10px]' },
    lg: { icon: 52, text: 'text-4xl md:text-5xl', badge: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Isotipo: Tricolor geométrico de alta precisión (Dorado, Verde y Blanco/Gris tecnológico) */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Fondo sutil */}
          <rect width="48" height="48" rx="12" fill="#0C121E" />
          <rect width="48" height="48" rx="12" stroke="url(#borderGradient)" strokeWidth="1.5" />

          {/* Ala Dorada Izquierda / Isotipo G */}
          <path
            d="M12 24C12 16.5 17.5 12 24 12C28.5 12 32 14.5 34 18L28.5 21C27.5 19 25.5 17.5 23.5 17.5C19.5 17.5 17.5 20.5 17.5 24C17.5 27.5 19.5 30.5 23.5 30.5C26 30.5 28 29 29 27H23.5V22H34.5V28C32 33 28 36 23.5 36C17.5 36 12 31.5 12 24Z"
            fill="url(#goldGradient)"
          />

          {/* Vértice y Acento Verde Vibrante (Evolución digital) */}
          <circle cx="35" cy="15" r="4" fill="url(#greenGradient)" />
          <path
            d="M32 32L38 26M38 26H32M38 26V32"
            stroke="url(#greenGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Acento Blanco / Gris Metalizado de Reflejo */}
          <path
            d="M16 19C18 15 22 13 25 13"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* Definición de Gradientes Oficiales */}
          <defs>
            <linearGradient id="goldGradient" x1="12" y1="12" x2="35" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF3B0" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            <linearGradient id="greenGradient" x1="30" y1="12" x2="40" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="borderGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tipografía Oficial: 'G-' dorado metalizado y '-evo.' en verde vibrante */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${currentSize.text}`}>
          <span className="text-gold-metallic">G-</span>
          <span className="text-green-vibrant">evo.</span>
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

