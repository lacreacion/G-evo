import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline font-black tracking-tight select-none ${className}`}>
      <span className="text-[#DCA81A]">G</span>
      <span className="text-[#03C052]">-</span>
      <span className="text-[#14D46B]">evo</span>
      {withDot && <span className="text-[#00D928]">.</span>}
    </span>
  );
};
