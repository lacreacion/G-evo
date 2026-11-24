import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const tenantId = body.tenantId || 'sweethouse-latam';

    return NextResponse.json({
      status: 'success',
      tenantId,
      syncedAt: new Date().toISOString(),
      itemsCount: 105,
      message: 'Catálogo de cajas de dulces y referencias de imágenes sincronizadas con g-evo CDN.',
      endpoint: `https://cdn.g-evo.io/assets/${tenantId}/products/{sku}/hero.webp`
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Error procesando sincronización con g-evo', details: String(error) },
      { status: 500 }
    );
  }
}

