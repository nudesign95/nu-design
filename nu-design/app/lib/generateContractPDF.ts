import { jsPDF } from 'jspdf';

interface ContractData {
  contactName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  selectedMainService: string;
  selectedSubService: string;
  price: string;
  signatureDataUrl: string;
  date: string;
}

export const generateContractPDF = (data: ContractData): string => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(220, 38, 38);
  doc.text('NU-DESIGN • CONTRATO DE SERVICIOS PROFESIONALES', 15, 20);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha de emisión: ${data.date}`, 15, 26);
  doc.line(15, 29, 195, 29);

  // 1. Datos del Cliente
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('1. INFORMACIÓN DEL CLIENTE Y PROYECTO', 15, 37);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`• Cliente / Responsable: ${data.contactName || 'No especificado'}`, 18, 44);
  doc.text(`• Empresa / Compañía: ${data.companyName || 'No especificada'}`, 18, 50);
  doc.text(`• Correo Electrónico: ${data.contactEmail}`, 18, 56);
  doc.text(`• Teléfono / WhatsApp: ${data.contactPhone}`, 18, 62);
  doc.text(`• Servicio Contratado: ${data.selectedMainService} - ${data.selectedSubService}`, 18, 68);
  doc.text(`• Valor Estimado del Proyecto: ${data.price}`, 18, 74);

  // 2. Cláusulas Resumidas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('2. TÉRMINOS Y CONDICIONES ESENCIALES', 15, 84);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const textLines = [
    '• PROPIEDAD INTELECTUAL: Los derechos de uso sobre el diseño final se transfieren tras la liquidación del 100%.',
    '• ANTICIPOS Y REEMBOLSOS: Una vez iniciado el proceso creativo, el anticipo abonado no es reembolsable.',
    '• REVISIONES: Cada propuesta incluye hasta 3 rondas de ajustes conforme a las especificaciones acordadas.',
    '• ENTREGABLES: Los archivos editables y finales serán entregados tras completar el pago total.',
    '• CONSERVACIÓN DE ARCHIVOS: NU-DESIGN mantendrá respaldo de editables durante 7 días hábiles tras la entrega.'
  ];

  let yPos = 91;
  textLines.forEach(line => {
    doc.text(line, 18, yPos);
    yPos += 6;
  });

  // 3. Bloque de Firmas
  doc.line(15, 125, 195, 125);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('3. CONFORMIDAD Y FIRMA DIGITAL', 15, 134);

  // Firma Prestador (Garic Edume)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('POR NU-DESIGN:', 20, 145);
  doc.setFont('helvetica', 'normal');
  doc.text('Garic Edume', 20, 151);
  doc.text('Diseñador & Desarrollador Principal', 20, 156);

  // Firma Cliente (Imagen PNG Base64)
  doc.setFont('helvetica', 'bold');
  doc.text('POR EL CLIENTE:', 120, 145);
  if (data.signatureDataUrl && data.signatureDataUrl.startsWith('data:image')) {
    doc.addImage(data.signatureDataUrl, 'PNG', 120, 148, 55, 25);
  }
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.contactName}`, 120, 178);
  doc.text(`Aceptado Digitalmente en ${data.date}`, 120, 183);

  return doc.output('datauristring');
};