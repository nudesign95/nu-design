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

    const cliente = contactName || 'No especificado';
    const empresa = companyName || 'No especificada';
    const ubicacion = `${selectedCity}, ${selectedCountry}`;
    const telefonoCompleto = `${countryCode} ${contactPhone}`;

    // Construcción del tiempo requerido
    let tiempoTexto = `${timeQuantity} ${timeUnit}`;
    if (timeQuantity2 && timeQuantity2 !== '0' && timeUnit2 && timeUnit2 !== 'ninguno') {
      tiempoTexto += ` y ${timeQuantity2} ${timeUnit2}`;
    }

    // 1. CANAL DE WHATSAPP: Formato de mensaje elegante
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

Quedo a la espera de la propuesta oficial. ¡Gracias!`;

      const redirectUrl = `https://wa.me/18294608316?text=${encodeURIComponent(mensajeWhatsApp)}`;

      return NextResponse.json({
        success: true,
        channel: 'whatsapp',
        redirectUrl,
      });
    }

    // 2. CANAL DE CORREO: Preparado para integraciones con Resend / SMTP
    if (receiveChannel === 'correo') {
      // Aquí se ejecuta el envío de correo seguro en servidor
      console.log('Cotización recibida para procesamiento por correo de:', contactEmail);

      return NextResponse.json({
        success: true,
        channel: 'correo',
        message: 'Tu solicitud de cotización fue procesada exitosamente. Te contactaremos a la brevedad.',
      });
    }

    return NextResponse.json({ success: true, channel: 'general' });

  } catch (error) {
    console.error('Error procesando cotización:', error);
    return NextResponse.json(
      { success: false, message: 'Ocurrió un error al procesar tu cotización.' },
      { status: 500 }
    );
  }
}