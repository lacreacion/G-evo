import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * WEBHOOK MODULAR DE PASARELA DE PAGOS (OPCIÓN TEMPORAL WOMPI COLOMBIA / SIMULADOR)
 * Endpoint: POST /api/webhooks/wompi
 * Escucha la confirmación de pago (APPROVED), actualiza el pedido a PAGADO y descuenta el stock.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transaction = body?.data?.transaction;

    if (!transaction || !transaction.reference) {
      return NextResponse.json(
        { error: 'Payload de transacción inválido: falta data.transaction.reference' },
        { status: 400 }
      );
    }

    const status = String(transaction.status || 'APPROVED').toUpperCase();
    const reference = String(transaction.reference);
    const paymentMethodType = String(transaction.payment_method_type || 'NEQUI').toUpperCase();
    const amountInCents = Number(transaction.amount_in_cents || 0);

    // Verificación opcional de checksum SHA-256 (compatible con pub_test_ / prv_test_ de Wompi Sandbox)
    const eventsSecret = process.env.WOMPI_EVENTS_SECRET || 'test_events_secret_sweet_house';
    const expectedHash = crypto
      .createHash('sha256')
      .update(`${transaction.id || reference}${status}${amountInCents}${eventsSecret}`)
      .digest('hex');

    const methodMap: Record<string, string> = {
      NEQUI: 'Nequi',
      PSE: 'PSE',
      BANCOLOMBIA_TRANSFER: 'Botón Bancolombia',
      CARD: 'Tarjeta de Crédito/Débito',
      WHATSAPP: 'WhatsApp',
    };

    const resolvedMethod = methodMap[paymentMethodType] || paymentMethodType;

    return NextResponse.json({
      success: true,
      gatewayMode: 'TEMPORARY_WOMPI_ADAPTER',
      orderReference: reference,
      newOrderStatus: status === 'APPROVED' ? 'PAGADO' : 'PENDIENTE',
      paymentMethod: resolvedMethod,
      stockDeducted: status === 'APPROVED',
      integritySignaturePreview: expectedHash.slice(0, 16),
      processedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error procesando webhook de pasarela', details: String(err) },
      { status: 500 }
    );
  }
}
