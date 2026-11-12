'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'gevo_cookie_consent_v2';

export const CookieConsentBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(COOKIE_STORAGE_KEY) === 'accepted';
      } catch {
        return false;
      }
    }
    return false;
  });

  if (dismissed) return null;

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted');
      localStorage.setItem(
        `${COOKIE_STORAGE_KEY}_at`,
        new Date().toISOString()
      );
    } catch {
      // Ignore storage errors
    }
    setDismissed(true);
  };

  return (
    <aside
      aria-label="Aviso de Cookies y Privacidad de G-evo"
      data-testid="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[#041C13]/95 via-[#06261B]/95 to-[#07131E]/95 backdrop-blur-xl border border-emerald-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)] px-4 py-3.5 sm:px-6 sm:py-4 text-white"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/35 flex items-center justify-center shrink-0 text-amber-300 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="font-extrabold text-white flex items-center gap-1.5">
              <span>Aviso de Cookies, Seguridad JWT &amp; Habeas Data</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-emerald-50/85 leading-relaxed">
              Utilizamos cookies técnicas de sesión segura (JWT), preferencias de carrito y analítica agregada para garantizar el aislamiento multi-tenant de{' '}
              <strong className="text-amber-300">G-evo.</strong> Consulta nuestra{' '}
              <Link
                href="/legal/politica-de-cookies"
                className="font-bold text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
              >
                Política de Cookies
              </Link>{' '}
              y la{' '}
              <Link
                href="/legal/politica-privacidad-habeas-data"
                className="font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2"
              >
                Política de Privacidad (Habeas Data)
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          <a
            href="/docs/politica-de-cookies.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-semibold text-gray-200 transition-colors"
          >
            Ver PDF
          </a>
          <button
            type="button"
            onClick={handleAcceptAll}
            data-testid="accept-cookies-btn"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-extrabold text-[11px] inline-flex items-center gap-1.5 shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 text-black" />
            <span>Aceptar Cookies y Continuar</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
