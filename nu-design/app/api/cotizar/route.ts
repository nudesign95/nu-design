import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

    // Tu número de WhatsApp de destino (en formato internacional sin símbolos)
    const targetWhatsAppNumber = '18294608316';

    // Construcción del tiempo estimado
    let timeString = `${timeQuantity} ${timeUnit}`;
    if (timeQuantity2 && timeQuantity2 !== '0' && timeUnit2 && timeUnit2 !== 'ninguno') {
      timeString += ` y ${timeQuantity2} ${timeUnit2}`;
    }

    // Armar el mensaje formateado para WhatsApp
    const message = `*NUEVA SOLICITUD DE COTIZACIÓN - NU-DESIGN* 🚀
----------------------------------------
📌 *CLIENTE / EMPRESA*
• *Empresa:* ${companyName || 'No especificado'}
• *Responsable:* ${contactName || 'No especificado'}
• *Ubicación:* ${selectedCity}, ${selectedCountry}
• *Teléfono:* ${countryCode} ${contactPhone}
• *Correo:* ${contactEmail}

🎯 *SERVICIO SOLICITADO*
• *Categoría:* ${selectedMainService}
• *Específico:* ${selectedSubService}
• *Muestra física:* ${needsPhysicalSample === 'si' ? 'Sí (Impresa)' : 'No (100% Digital)'}

⏱️ *TIEMPO REQUERIDO*
• ${timeString}

📩 *CANAL DE PREFERENCIA*
• ${receiveChannel === 'whatsapp' ? 'WhatsApp' : 'Correo Electrónico'}
----------------------------------------
_Generado automáticamente desde nudesign.agency_`;

    // Codificar el mensaje para la URL de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodedMessage}`;

    return NextResponse.json({
      success: true,
      channel: receiveChannel,
      redirectUrl: whatsappUrl,
      message: 'Cotización procesada exitosamente.',
    });
  } catch (error) {
    console.error('Error al procesar cotización:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno al procesar la cotización' },
      { status: 500 }
    );
  }
}