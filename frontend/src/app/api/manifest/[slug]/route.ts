import { NextRequest, NextResponse } from 'next/server';

const PRESET_NAMES: Record<string, string> = {
  'elena-vance': 'Elena Vance | Tarjeta G-evo',
  'laura-restrepo': 'Laura Restrepo | Tarjeta G-evo',
  'cafe-origen-alto': 'Café Origen Alto | Tarjeta G-evo',
  'boutique-gaia': 'Boutique Gaia | Tarjeta G-evo',
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const cleanSlug = (slug || 'elena-vance').toLowerCase().trim();
  const customName = request.nextUrl.searchParams.get('name');
  const displayTitle =
    customName ||
    PRESET_NAMES[cleanSlug] ||
    `${cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | G-evo`;

  const shortTitle = displayTitle.split('|')[0].trim().slice(0, 18) || 'Mi Tarjeta';

  const manifest = {
    id: `/t/${cleanSlug}`,
    name: displayTitle,
    short_name: shortTitle,
    description: 'Tarjeta Digital Inteligente (NFC & QR Dinámico) — Ecosistema G-evo.',
    start_url: `/t/${cleanSlug}`,
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#070709',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icons/gevo-card-icon.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
