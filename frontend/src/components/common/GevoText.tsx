import React from 'react';

interface GevoTextProps {
  className?: string;
  withDot?: boolean;
}

/**
 * GevoText: Componente Oficial G-evo para Titulares y Textos.
 * 1. Sin espacios incorrectos: 'G-evo.' continuo.
 * 2. 'G' con degradado dorado metalizado corporativo.
 * 3. '-evo' con degradado verde esmeralda vibrante.
 * 4. '.' en verde neón brillante.
 */
export const GevoText: React.FC<GevoTextProps> = ({ 
  className = '', 
  withDot = true 
}) => {
  return (
    <span className={`inline-flex items-baseline font-black tracking-tight select-none ${className}`}>
      {/* 'G' con degradado dorado metalizado corporativo */}
      <span 
        className="bg-clip-text text-transparent inline-block leading-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, #FFF6BD 0%, #F5C226 25%, #D8A01A 60%, #9E6E00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12))'
        }}
      >
        G
      </span>

      {/* '-evo' con degradado verde vibrante continuo (sin espacios) */}
      <span 
        className="bg-clip-text text-transparent inline-block leading-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, #6EE7B7 0%, #22C55E 30%, #15A658 70%, #0B733B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12))'
        }}
      >
        -evo
      </span>

      {/* '.' Punto verde neón brillante */}
      {withDot && (
        <span 
          className="inline-block leading-none"
          style={{
            color: '#00D928',
            textShadow: '0 0 8px rgba(0, 217, 40, 0.4)'
          }}
        >
          .
        </span>
      )}
    </span>
  );
};
