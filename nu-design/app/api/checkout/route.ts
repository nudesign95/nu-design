import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY;

    // Si aún no hay clave configurada (modo borrador / testing)
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'La pasarela de pago no está configurada actualmente.' },
        { status: 500 }
      );
    }

    // Inicializamos Stripe SOLO al recibir la petición
    const stripe = new Stripe(apiKey);

    const body = await request.json();
    const { serviceName, priceAmount, clientEmail, companyName } = body;

    const amountInCents = Math.round(Number(priceAmount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: clientEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'dop',
            product_data: {
              name: `NU-DESIGN // ${serviceName}`,
              description: `Servicio contratado por ${companyName || 'Cliente'}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/cotizacion?status=success`,
      cancel_url: `${request.headers.get('origin')}/cotizacion?status=cancelled`,
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error procesando el pago.';
    console.error('Error al crear sesión de pago en Stripe:', errorMessage);
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}