import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente de Identidad Tipográfica Oficial G-evo.
 * Colores exactos extraídos directamente del logotipo oficial:
 * - 'G': Dorado cálido oficial (#D8A01A)
 * - '-evo': Verde esmeralda oficial unificado (#15A658) (sin discrepancia entre el guión y el texto)
 * - '.': Verde neón brillante oficial (#00D928)
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline font-black tracking-tight select-none ${className}`}>
      <span className="text-[#D8A01A]">G</span>
      <span className="text-[#15A658]">-evo</span>
      {withDot && <span className="text-[#00D928]">.</span>}
    </span>
  );
};
