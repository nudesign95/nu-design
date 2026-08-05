import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const resend = new Resend('re_GUPMwW6J_CaYiZeShr21f1AwUA9TY3v2n');

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

    // OPCIÓN 1: WHATSAPP
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

📄 **Contrato de Prestación de Servicios:** Pendiente de revisión

━━━━━━━━━━━━━━━━━━
Gracias por elegir *NU-DESIGN*.`;

      const redirectUrl = `https://wa.me/18294608316?text=${encodeURIComponent(mensajeWhatsApp)}`;

      return NextResponse.json({
        success: true,
        channel: 'whatsapp',
        redirectUrl,
      });
    }

    // OPCIÓN 2: CORREO ELECTRÓNICO AUTOMÁTICO (RESEND)
    if (receiveChannel === 'correo') {
      await resend.emails.send({
        from: 'NU-DESIGN <onboarding@resend.dev>',
        to: [contactEmail],
        subject: `Confirmación de Cotización • NU-DESIGN (${selectedSubService})`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #040001; color: #ffffff; padding: 30px; border-radius: 16px;">
            <h2 style="color: #ef4444; margin-bottom: 5px;">📩 SOLICITUD RECIBIDA</h2>
            <p style="color: #a1a1aa; font-size: 14px;">NU-DESIGN • Agencia Creativa</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
            
            <p>Hola <strong>${cliente}</strong>,</p>
            <p>Hemos recibido tu solicitud de cotización para el servicio <strong>${selectedSubService}</strong> (${selectedMainService}).</p>
            
            <div style="background-color: #111; padding: 15px; border-radius: 12px; margin: 20px 0; font-size: 13px; border-left: 4px solid #ef4444;">
              <p style="margin: 5px 0;"><strong>Empresa:</strong> ${empresa}</p>
              <p style="margin: 5px 0;"><strong>Ubicación:</strong> ${ubicacion}</p>
              <p style="margin: 5px 0;"><strong>Tiempo Solicitado:</strong> ${tiempoTexto}</p>
              <p style="margin: 5px 0;"><strong>Modalidad:</strong> ${muestraTexto}</p>
            </div>

            <p style="font-size: 13px; color: #ccc;">En breve nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo.</p>
            
            <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
            <p style="font-size: 11px; color: #777;">NU-DESIGN • Todos los derechos reservados.</p>
          </div>
        `
      });

      return NextResponse.json({
        success: true,
        channel: 'correo',
        message: 'Correo de confirmación enviado exitosamente.'
      });
    }

    return NextResponse.json({ success: true, channel: 'general' });

  } catch (error) {
    console.error('Error en API cotizar:', error);
    return NextResponse.json(
      { success: false, message: 'Ocurrió un error al procesar tu cotización.' },
      { status: 500 }
    );
  }
}