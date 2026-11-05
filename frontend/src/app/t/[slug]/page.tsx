'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DigitalCardTenantPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : 'elena-vance';
  const [iframeSrc, setIframeSrc] = useState<string>(`/card-engine.html?slug=${encodeURIComponent(slug)}`);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const ownerFlag = search.get('owner') === '1' || search.get('edit') === '1' ? '&owner=1' : '';
    setIframeSrc(`/card-engine.html?slug=${encodeURIComponent(slug)}${ownerFlag}`);
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

