import { NextResponse } from 'next/server';

/**
 * Webhook oficial para Meta (Instagram Basic Display & Facebook Graph API)
 * Permite recibir notificaciones instantáneas de nuevas historias subidas por la tienda
 */

// Verificación inicial del webhook por Meta (GET request con hub.challenge)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const EXPECTED_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || 'SWEET_HOUSE_VERIFY_TOKEN_2026';

  if (mode === 'subscribe' && token === EXPECTED_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verificación fallida' }, { status: 403 });
}

// Recepción de historias en vivo (POST request enviado por Meta)
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('[Meta Webhook] Nueva historia recibida:', JSON.stringify(payload));

    // Procesamiento del payload de historia
    return NextResponse.json({
      status: 'received',
      processedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error procesando webhook de Meta' }, { status: 500 });
  }
}

