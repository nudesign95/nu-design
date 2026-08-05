import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Limitador de tasa: máximo 5 solicitudes por IP cada 15 minutos
const ratelimit = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
    })
  : null;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Has superado el límite de 5 solicitudes. Por favor, espera 15 minutos para volver a intentarlo.' },
        { status: 429 }
      );
    }
  }

  try {
    const body = await request.json();

    const {
      companyName,
      contactName,
      selectedCountry,
      selectedCity,
      countryCode,
      contactPhone,
      contactEmail,
      selectedMainService,
      selectedSubService,
      timeQuantity,
      timeUnit,
      timeQuantity2,
      timeUnit2,
      needsPhysicalSample,
      receiveChannel,
      signatureData
    } = body;

    const cliente = contactName || 'No especificado';
    const empresa = companyName || 'No especificada';
    const ubicacion = `${selectedCity}, ${selectedCountry}`;
    const telefonoCompleto = `${countryCode} ${contactPhone}`;

    let tiempoTexto = `${timeQuantity} ${timeUnit}`;
    if (timeQuantity2 && timeQuantity2 !== '0' && timeUnit2 && timeUnit2 !== 'ninguno') {
      tiempoTexto += ` y ${timeQuantity2} ${timeUnit2}`;
    }

    if (receiveChannel === 'whatsapp') {
      const mensajeWhatsApp = 
`*¡Hola Garic! Solicité una Cotización en NU-DESIGN* 🎨

📌 *DETALLES DEL CLIENTE*
• *Cliente:* ${cliente}
• *Empresa:* ${empresa}
• *Ubicación:* ${ubicacion}
• *Contacto:* ${telefonoCompleto}
• *Correo:* ${contactEmail}

🛠️ *SERVICIO REQUERIDO*
• *Categoría:* ${selectedMainService}
• *Específico:* ${selectedSubService}
• *Tiempo estimado:* ${tiempoTexto}
• *Muestra física:* ${needsPhysicalSample === 'si' ? 'Sí requiere' : 'No (100% Digital)'}
• *Contrato Firmado:* ${signatureData ? '✅ Sí (Firma Digital Registrada)' : '❌ Pendiente'}`;

      const redirectUrl = `https://wa.me/18294608316?text=${encodeURIComponent(mensajeWhatsApp)}`;

      return NextResponse.json({
        success: true,
        channel: 'whatsapp',
        redirectUrl,
      });
    }

    return NextResponse.json({
      success: true,
      channel: receiveChannel || 'general',
      message: 'Cotización procesada correctamente.'
    });

  } catch (error) {
    console.error('Error en API cotizar:', error);
    return NextResponse.json(
      { success: false, message: 'Ocurrió un error al procesar tu cotización.' },
      { status: 500 }
    );
  }
}