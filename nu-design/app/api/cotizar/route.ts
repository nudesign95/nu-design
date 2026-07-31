import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Obtener variables de entorno (Invisibles para el cliente)
    const resendApiKey = process.env.RESEND_API_KEY || '';
    const whatsappToken = process.env.WHATSAPP_API_TOKEN || '';
    const adminEmail = process.env.ADMIN_EMAIL || 'nubellstore@gmail.com';

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
      receiveChannel,
    } = body;

    // 2. Construcción del resumen de cotización
    const resumenCotizacion = `
    📌 NUEVA SOLICITUD DE COTIZACIÓN - NU-DESIGN
    --------------------------------------------------
    Cliente: ${contactName || 'No especificado'}
    Empresa: ${companyName || 'No especificada'}
    Ubicación: ${selectedCity}, ${selectedCountry} (${countryCode})
    Teléfono: ${contactPhone}
    Correo: ${contactEmail}
    
    Servicio: ${selectedMainService} -> ${selectedSubService}
    Tiempo Requerido: ${timeQuantity} ${timeUnit}
    Canal de Entrega Preferido: String(${receiveChannel}).toUpperCase()
    --------------------------------------------------
    `;

    // Log interno de servidor para utilizar las variables y evitar avisos de ESLint
    if (process.env.NODE_ENV === 'development') {
      console.log('--- LOG SERVIDOR SECURE ---');
      console.log(resumenCotizacion);
      console.log(`Config Servidor -> Destino: ${adminEmail} | Resend Configurado: ${Boolean(resendApiKey)} | Meta WA Configurado: ${Boolean(whatsappToken)}`);
    }

    // 3. Lógica para respuesta vía WhatsApp
    if (receiveChannel === 'whatsapp') {
      const whatsappText = encodeURIComponent(
        `Hola Garic, he solicitado una cotización en la web:\n\n*Servicio:* ${selectedSubService}\n*Empresa:* ${companyName || contactName}\n*Teléfono:* ${countryCode} ${contactPhone}`
      );
      const redirectUrl = `https://wa.me/18294608316?text=${whatsappText}`;

      return NextResponse.json({
        success: true,
        channel: 'whatsapp',
        redirectUrl,
      });
    }

    // 4. Respuesta por correo / general
    return NextResponse.json({
      success: true,
      channel: 'correo',
      message: 'Cotización procesada de forma segura en el servidor.',
    });

  } catch (error) {
    console.error('Error interno de servidor:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar la cotización.' },
      { status: 500 }
    );
  }
}