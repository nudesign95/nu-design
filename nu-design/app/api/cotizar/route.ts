import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

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
        { success: false, message: 'Has superado el límite de 5 solicitudes. Por favor, espera 15 minutos.' },
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
    } = body;

    const cliente = contactName || 'No especificado';
    const empresa = companyName || 'No especificada';
    const ubicacion = `${selectedCity}, ${selectedCountry}`;
    const telefonoCompleto = `${countryCode} ${contactPhone}`;

    let tiempoTexto = `${timeQuantity} ${timeUnit}`;
    if (timeQuantity2 && timeQuantity2 !== '0' && timeUnit2 && timeUnit2 !== 'ninguno') {
      tiempoTexto += ` y ${timeQuantity2} ${timeUnit2}`;
    }

    const muestraTexto = needsPhysicalSample === 'si' ? 'Con muestra física impresa' : '100% Digital (sin muestra física)';

    // NUEVO FORMATO ELEGANTE DE MENSAJE DE WHATSAPP
    if (receiveChannel === 'whatsapp') {
      const mensajeWhatsApp = 
`📩 *NUEVA SOLICITUD DE COTIZACIÓN*
*NU-DESIGN*

Se ha recibido una nueva solicitud de cotización con la siguiente información:

━━━━━━━━━━━━━━━━━━
**INFORMACIÓN DEL CLIENTE**

👤 **Nombre:** ${cliente}
🏢 **Empresa:** ${empresa}
📍 **Ubicación:** ${ubicacion}
📞 **Teléfono:** ${telefonoCompleto}
✉️ **Correo:** ${contactEmail}

━━━━━━━━━━━━━━━━━━
**SERVICIO SOLICITADO**

📂 **Categoría:** ${selectedMainService}
📝 **Servicio:** ${selectedSubService}
⏱️ **Tiempo estimado:** ${tiempoTexto}
💻 **Modalidad:** ${muestraTexto}

━━━━━━━━━━━━━━━━━━
**ESTADO DE LA SOLICITUD**

📄 **Contrato de Prestación de Servicios:** Pendiente de revisión y firma

━━━━━━━━━━━━━━━━━━
Gracias por elegir *NU-DESIGN*.

En breve revisaremos tu solicitud y nos pondremos en contacto contigo para confirmar los detalles, enviar la cotización correspondiente y dar inicio al proceso.`;

      const redirectUrl = `https://wa.me/18294608316?text=${encodeURIComponent(mensajeWhatsApp)}`;

      return NextResponse.json({
        success: true,
        channel: 'whatsapp',
        redirectUrl,
      });
    }

    return NextResponse.json({ success: true, channel: receiveChannel || 'general' });

  } catch (error) {
    console.error('Error en API cotizar:', error);
    return NextResponse.json(
      { success: false, message: 'Ocurrió un error al procesar tu cotización.' },
      { status: 500 }
    );
  }
}