'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ExternalLink } from 'lucide-react';

export type GevoLegalServiceType = 'tarjeta' | 'catalogo' | 'web' | 'ecommerce' | 'ia';

export interface ServiceLegalConfig {
  serviceType: GevoLegalServiceType;
  serviceName: string;
  pdfHref: string;
  webHref: string;
  version: string;
}

export const SERVICE_LEGAL_MAP: Record<GevoLegalServiceType, ServiceLegalConfig> = {
  tarjeta: {
    serviceType: 'tarjeta',
    serviceName: 'Tarjeta Digital Interactiva',
    pdfHref: '/docs/terminos-tarjeta-digital.pdf',
    webHref: '/legal/terminos-tarjeta-digital',
    version: '2.0',
  },
  catalogo: {
    serviceType: 'catalogo',
    serviceName: 'Catálogo Digital Autónomo',
    pdfHref: '/docs/terminos-catalogo-digital.pdf',
    webHref: '/legal/terminos-catalogo-digital',
    version: '2.0',
  },
  web: {
    serviceType: 'web',
    serviceName: 'Creación de Página Web',
    pdfHref: '/docs/terminos-pagina-web.pdf',
    webHref: '/legal/terminos-pagina-web',
    version: '2.0',
  },
  ecommerce: {
    serviceType: 'ecommerce',
    serviceName: 'Tienda E-Commerce',
    pdfHref: '/docs/terminos-tienda-ecommerce.pdf',
    webHref: '/legal/terminos-tienda-ecommerce',
    version: '2.0',
  },
  ia: {
    serviceType: 'ia',
    serviceName: 'Agente de Soporte IA 24/7',
    pdfHref: '/docs/terminos-agente-ia.pdf',
    webHref: '/legal/terminos-agente-ia',
    version: '2.0',
  },
};

interface TermsAcceptanceBoxProps {
  serviceType: GevoLegalServiceType;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  onServiceTypeChange?: (serviceType: GevoLegalServiceType) => void;
  showServiceSelector?: boolean;
}

export const TermsAcceptanceBox: React.FC<TermsAcceptanceBoxProps> = ({
  serviceType,
  checked,
  onChange,
  id = 'terms-accepted-checkbox',
  onServiceTypeChange,
  showServiceSelector = false,
}) => {
  const config = SERVICE_LEGAL_MAP[serviceType] || SERVICE_LEGAL_MAP.tarjeta;

  return (
    <div
      data-testid={`terms-acceptance-box-${config.serviceType}`}
      className="p-4 rounded-2xl bg-gradient-to-br from-[#062319] via-[#041811] to-[#07111E] border border-amber-500/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_28px_rgba(0,0,0,0.55)] space-y-2.5"
    >
      {/* Header badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-white/10">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Consentimiento Legal Modular • {config.serviceName} (v{config.version})</span>
        </div>

        {showServiceSelector && onServiceTypeChange && (
          <select
            aria-label="Seleccionar tipo de servicio legal"
            value={serviceType}
            onChange={(e) => onServiceTypeChange(e.target.value as GevoLegalServiceType)}
            className="bg-black/60 border border-emerald-400/30 rounded-lg px-2 py-0.5 text-[10px] font-bold text-emerald-300 focus:outline-none focus:border-amber-400"
          >
            <option value="tarjeta">01. Tarjeta Digital</option>
            <option value="catalogo">02. Catálogo Digital</option>
            <option value="web">03. Página Web</option>
            <option value="ecommerce">04. Tienda E-commerce</option>
            <option value="ia">05. Agente IA 24/7</option>
          </select>
        )}
      </div>

      {/* Main Acceptance Checkbox + Dynamic Links */}
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          name="terms_accepted"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-emerald-500 cursor-pointer shrink-0"
        />
        <label
          htmlFor={id}
          className="text-[11px] text-gray-200 leading-relaxed cursor-pointer select-none"
        >
          He leído y acepto los{' '}
          <a
            href={config.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2"
          >
            Términos y Condiciones de {config.serviceName}
          </a>
          , la{' '}
          <a
            href="/docs/politica-privacidad-habeas-data.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
          >
            Política de Privacidad y Tratamiento de Datos
          </a>{' '}
          y la{' '}
          <a
            href="/docs/politica-de-cookies.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
          >
            Política de Cookies
          </a>{' '}
          de <strong className="text-white">G-evo.</strong>
        </label>
      </div>

      {/* Quick Web Reader & PDF Links Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pl-6 pt-1 text-[10px]">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={config.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 underline"
          >
            <FileText className="w-3 h-3" />
            <span>PDF {config.serviceName}</span>
          </a>
          <Link
            href={config.webHref}
            target="_blank"
            className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 underline"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Lectura Web</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <Link
            href="/legal/politica-privacidad-habeas-data"
            target="_blank"
            className="hover:text-emerald-300 underline"
          >
            Habeas Data
          </Link>
          <span>•</span>
          <Link
            href="/legal/politica-de-cookies"
            target="_blank"
            className="hover:text-emerald-300 underline"
          >
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
};
