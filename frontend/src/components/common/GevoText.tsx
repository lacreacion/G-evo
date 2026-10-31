import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente Oficial Tipográfico G-evo.
 * 1. 'G': Amarillo/dorado metalizado líquido con gradiente (from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent).
 * 2. '-evo.': Verde esmeralda brillante y sedoso (#00B050 / satén verde vibrante).
 * 3. Estrictamente continuo sin espacios erróneos ("G-evo.").
 * 4. Sin iconos ni filtros de desenfoque, ultra-nítido en pantallas Retina.
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline flex-nowrap font-black tracking-tight select-none ${className}`}>
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
      >-evo{withDot ? '.' : ''}</span>
    </span>
  );
};
