import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializamos Stripe con la clave secreta desde las variables de entorno
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceName, priceAmount, clientEmail, companyName } = body;

    // Convertimos el precio a centavos (Stripe maneja los cobros en la unidad mínima)
    const amountInCents = Math.round(Number(priceAmount) * 100);

    // Creamos la sesión de pago seguro en Stripe (Habilita Apple Pay, Google Pay y Tarjetas)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: clientEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'dop', // Peso Dominicano (o 'usd' si cobras en dólares)
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