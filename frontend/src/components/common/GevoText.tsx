import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente Oficial Tipográfico G-evo.
 * Calibrado con las referencias fotográficas de satén y oro líquido:
 * - 'G': Oro líquido reflectante (#FFFF66 -> #FBFA00 -> #E4AE03 -> #9E7200).
 * - '-evo.': Satén verde esmeralda lustroso (#2AE67A -> #00B050 -> #058226).
 * - Continuo, sin espacios ("G-evo.").
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline flex-nowrap font-black tracking-tight select-none ${className}`}>
      {/* "G" Oro Líquido Metalizado */}
      <span 
        className="inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #FFFF66 0%, #FBFA00 25%, #E4AE03 65%, #9E7200 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))'
        }}
      >
        G
      </span>{/* "-evo." Satén Verde Esmeralda */}<span 
        className="inline-block font-black bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #2AE67A 0%, #00B050 45%, #058226 80%, #025209 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))'
        }}
      >-evo{withDot ? '.' : ''}</span>
    </span>
  );
};
