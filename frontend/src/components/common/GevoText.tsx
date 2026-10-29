import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente Tipográfico Oficial G-evo.
 * 1. 'G' con gradiente dorado metalizado en CSS (bg-clip-text text-transparent).
 * 2. '-evo.' en verde esmeralda vibrante (text-emerald-500).
 * 3. Cero iconos extraños o sombras difusas que causen borrosidad.
 * 4. Nitidez vectorial nativa escalable en pantallas Retina.
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline font-black tracking-tight select-none ${className}`}>
      <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
        G
      </span>
      <span className="text-emerald-500">
        -evo
      </span>
      {withDot && <span className="text-emerald-400">.</span>}
    </span>
  );
};
