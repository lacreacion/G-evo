'use client';

import React, { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

function DigitalCardFrame() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = typeof params?.slug === 'string' ? params.slug : 'elena-vance';
  const ownerFlag =
    searchParams.get('owner') === '1' || searchParams.get('edit') === '1' ? '&owner=1' : '';
  const iframeSrc = `/card-engine.html?slug=${encodeURIComponent(slug)}${ownerFlag}`;

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
