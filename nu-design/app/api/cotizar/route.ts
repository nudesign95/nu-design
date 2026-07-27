import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
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
      receiveChannel
    } = data;

    // Construir el texto profesional del resumen
    const resumenMensaje = `*¡Nueva Cotización Recibida - Nu-Design!* 🚀\n\n` +
      `🏢 *Empresa:* ${companyName || 'No especificada'}\n` +
      `👤 *Responsable:* ${contactName || 'No especificado'}\n` +
      `📍 *Ubicación:* ${selectedCity}, ${selectedCountry}\n` +
      `📞 *Contacto:* ${countryCode} ${contactPhone}\n` +
      `📧 *Correo:* ${contactEmail}\n\n` +
      `🛠️ *Renglón:* ${selectedMainService}\n` +
      `📌 *Servicio:* ${selectedSubService}\n` +
      `⏳ *Tiempo estimado:* ${timeQuantity} ${timeUnit} ${timeQuantity2 > 0 ? `y ${timeQuantity2} ${timeUnit2}` : ''}\n` +
      `📦 *Muestra física:* ${needsPhysicalSample.toUpperCase()}\n` +
      `📨 *Canal preferido:* ${receiveChannel.toUpperCase()}`;

    // Si el usuario eligió WhatsApp, generamos el enlace de redirección directa con el mensaje listo
    if (receiveChannel === 'whatsapp') {
      const cleanPhone = contactPhone.replace(/\D/g, '');
      const fullPhone = `${countryCode.replace('+', '')}${cleanPhone}`;
      const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(resumenMensaje)}`;

      return NextResponse.json({
        success: true,
        channel: 'whatsapp',
        redirectUrl: whatsappUrl,
        message: 'Cotización procesada para WhatsApp.'
      });
    }

    // Si el usuario eligió Correo Electrónico (Simulación de envío de correo exitoso)
    if (receiveChannel === 'correo') {
      // Aquí puedes integrar Resend o Nodemailer más adelante si lo deseas
      return NextResponse.json({
        success: true,
        channel: 'correo',
        message: `Cotización enviada exitosamente al correo ${contactEmail}.`
      });
    }

    return NextResponse.json({ success: false, message: 'Canal no válido' }, { status: 400 });

  } catch (error) {
    console.error('Error en API cotizar:', error);
    return NextResponse.json({ success: false, message: 'Error interno del servidor' }, { status: 500 });
  }
}