'use client';

import React, { Suspense, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function DigitalCardFrame() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = typeof params?.slug === 'string' ? params.slug : 'elena-vance';
  const ownerFlag =
    searchParams.get('owner') === '1' || searchParams.get('edit') === '1' ? '&owner=1' : '';
  const iframeSrc = `/card-engine.html?slug=${encodeURIComponent(slug)}${ownerFlag}`;

  useEffect(() => {
    // 1. Inyectar Manifest dinámico por cliente y metadatos PWA (iOS / Android)
    let manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = `/api/manifest/${encodeURIComponent(slug)}`;

    // 2. Registrar Service Worker para habilitar "Instalar App" en Android / Chrome / Edge
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // 3. Capturar evento nativo beforeinstallprompt y escuchar petición desde el iframe de la tarjeta
    let deferredPrompt: BeforeInstallPromptEvent | null = null;
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    const onMessage = async (event: MessageEvent) => {
      if (event.data?.type === 'GEVO_TRIGGER_PWA_INSTALL' && deferredPrompt) {
        await deferredPrompt.prompt();
        deferredPrompt = null;
      }
    };
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('message', onMessage);
    };
  }, [slug]);

  return (
    <div className="w-full h-dvh bg-[#070709] overflow-hidden">
      <iframe
        src={iframeSrc}
        title={`Tarjeta Digital Interactiva - ${slug}`}
        className="w-full h-full border-0 block"
        allow="clipboard-write; web-share"
      />
    </div>
  );
}

export default function DigitalCardTenantPage() {
  return (
    <Suspense fallback={<div className="w-full h-dvh bg-[#070709]" />}>
      <DigitalCardFrame />
    </Suspense>
  );
}
