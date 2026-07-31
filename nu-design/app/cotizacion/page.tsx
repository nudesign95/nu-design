'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
  ES: {
    inicio: 'inicio',
    portafolio: 'portafolio',
    contratar: 'contratar',
    contacto: 'contacto',
    utilidades: 'utilidades',
    whatsapp: 'Whatsapp',
    titulo: 'Solicita tu',
    subtitulo: 'Diseño estratégico y producción a medida • Tu propuesta al instante',
    tipoCliente: 'Tipo de Cliente',
    nuevoCliente: 'Nuevo Cliente',
    soyCliente: 'Ya soy cliente',
    buscarClientePlaceholder: 'Busca por Nombre de Empresa, Teléfono o Correo...',
    avisoCliente: 'El sistema autocompletará y bloqueará tus datos automáticamente si encuentra coincidencia.',
    infoContacto: 'Información de Contacto y Empresa',
    nombreEmpresa: 'Nombre de la Empresa o Compañía',
    nombreResponsable: 'Nombre Completo del Responsable',
    seleccionarPais: 'Seleccionar País',
    ciudad: 'Ciudad',
    telefono: 'Número de Contacto / WhatsApp',
    correo: 'Correo Electrónico',
    seleccionServicio: 'Selección de Servicio y Alcance',
    renglonPrincipal: 'Renglón Principal',
    seleccionaServicio: 'Selecciona un servicio...',
    subservicioEspecifico: 'Subservicio Específico',
    seleccionaEspecificacion: 'Selecciona la especificación...',
    queIncluye: '¿Qué incluye?:',
    modoGestion: 'Modo de gestión:',
    tiempoNecesario: '¿En qué tiempo necesitas el trabajo?',
    cantidad1: 'Cantidad 1',
    unidad1: 'Unidad 1',
    adicional: 'Adicional (Opcional)',
    unidadAdicional: 'Unidad Adicional',
    ninguno: 'Ninguno',
    horas: 'Hora(s)',
    dias: 'Día(s)',
    semanas: 'Semana(s)',
    meses: 'Mes(es)',
    anio: 'Año(s)',
    muestraFisica: '¿Necesitas muestra física impresa?',
    si: 'Sí',
    noDigital: 'No (Todo Digital)',
    adjuntarRef: 'Adjuntar Referencia (JPG, PNG, WEBP, PDF - Máx. 5 MB)',
    canalEntrega: '¿Por dónde deseas recibir tu propuesta automatizada?',
    whatsappCanal: 'WhatsApp',
    correoCanal: 'Correo Electrónico',
    botonEnviar: 'Solicitar Cotización Automatizada',
    exitoTitulo: '¡Cotización Solicitada con Éxito!',
    exitoDesc: 'Tu solicitud ha sido procesada. Tu propuesta detallada ha sido enviada al instante a tu',
    otraCotizacion: 'Realizar otra cotización (Limpiar formulario)'
  },
  EN: {
    inicio: 'home',
    portafolio: 'portfolio',
    contratar: 'hire us',
    contacto: 'contact',
    utilidades: 'utilities',
    whatsapp: 'Whatsapp',
    titulo: 'Request your',
    subtitulo: 'Strategic design & custom production • Your quote in seconds',
    tipoCliente: 'Client Type',
    nuevoCliente: 'New Client',
    soyCliente: 'I am a client',
    buscarClientePlaceholder: 'Search by Company Name, Phone, or Email...',
    avisoCliente: 'The system will autocomplete and lock your data if a match is found.',
    infoContacto: 'Contact & Company Information',
    nombreEmpresa: 'Company Name',
    nombreResponsable: 'Full Name of Responsible',
    seleccionarPais: 'Select Country',
    ciudad: 'City',
    telefono: 'Contact Number / WhatsApp',
    correo: 'Email Address',
    seleccionServicio: 'Service Selection & Scope',
    renglonPrincipal: 'Main Category',
    seleccionaServicio: 'Select a service...',
    subservicioEspecifico: 'Specific Subservice',
    seleccionaEspecificacion: 'Select specification...',
    queIncluye: 'What is included?:',
    modoGestion: 'Management mode:',
    tiempoNecesario: 'When do you need the work?',
    cantidad1: 'Quantity 1',
    unidad1: 'Unit 1',
    adicional: 'Additional (Optional)',
    unidadAdicional: 'Additional Unit',
    ninguno: 'None',
    horas: 'Hour(s)',
    dias: 'Day(s)',
    semanas: 'Week(s)',
    meses: 'Month(s)',
    anio: 'Year(s)',
    muestraFisica: 'Do you need a physical printed sample?',
    si: 'Yes',
    noDigital: 'No (100% Digital)',
    adjuntarRef: 'Attach Reference (JPG, PNG, WEBP, PDF - Max. 5 MB)',
    canalEntrega: 'Where would you like to receive your automated proposal?',
    whatsappCanal: 'WhatsApp',
    correoCanal: 'Email',
    botonEnviar: 'Request Automated Quote',
    exitoTitulo: 'Quote Requested Successfully!',
    exitoDesc: 'Your request has been processed. Your detailed proposal has been sent instantly to your',
    otraCotizacion: 'Make another quote (Clear form)'
  },
  FR: {
    inicio: 'accueil',
    portafolio: 'portfolio',
    contratar: 'embaucher',
    contacto: 'contact',
    utilidades: 'utilitaires',
    whatsapp: 'Whatsapp',
    titulo: 'Demandez votre',
    subtitulo: 'Design stratégique et production sur mesure • Votre devis instantané',
    tipoCliente: 'Type de Client',
    nuevoCliente: 'Nouveau Client',
    soyCliente: 'Déjà client',
    buscarClientePlaceholder: 'Rechercher par nom d\'entreprise, téléphone ou e-mail...',
    avisoCliente: 'Le système remplira et verrouillera vos données en cas de correspondance.',
    infoContacto: 'Informations de Contact et d\'Entreprise',
    nombreEmpresa: 'Nom de l\'Entreprise',
    nombreResponsable: 'Nom du Responsable',
    seleccionarPais: 'Sélectionner le Pays',
    ciudad: 'Ville',
    telefono: 'Numéro de Contact / WhatsApp',
    correo: 'Adresse E-mail',
    seleccionServicio: 'Sélection de Service et Portée',
    renglonPrincipal: 'Catégorie Principale',
    seleccionaServicio: 'Sélectionnez un service...',
    subservicioEspecifico: 'Sous-service Spécifique',
    seleccionaEspecificacion: 'Sélectionnez la spécification...',
    queIncluye: 'Ce qui est inclus :',
    modoGestion: 'Mode de gestion :',
    tiempoNecesario: 'Dans quel délai avez-vous besoin du travail ?',
    cantidad1: 'Quantité 1',
    unidad1: 'Unité 1',
    adicional: 'Supplémentaire (Optionnel)',
    unidadAdicional: 'Unité Supplémentaire',
    ninguno: 'Aucun',
    horas: 'Heure(s)',
    dias: 'Jour(s)',
    semanas: 'Semaine(s)',
    meses: 'Mois',
    anio: 'Année(s)',
    muestraFisica: 'Avez-vous besoin d\'un échantillon physique imprimé ?',
    si: 'Oui',
    noDigital: 'Non (100% Numérique)',
    adjuntarRef: 'Joindre Référence (JPG, PNG, WEBP, PDF - Max. 5 Mo)',
    canalEntrega: 'Où souhaitez-vous recevoir votre proposition automatisée ?',
    whatsappCanal: 'WhatsApp',
    correoCanal: 'E-mail',
    botonEnviar: 'Demander un Devis Automatisé',
    exitoTitulo: 'Devis Demandé avec Succès !',
    exitoDesc: 'Votre demande a été traitée. Votre proposition détaillée a été envoyée instantanément à votre',
    otraCotizacion: 'Effectuer un autre devis (Effacer le formulaire)'
  }
};

const allowedCountries = [
  { name: "República Dominicana", code: "+1", cities: ["Santo Domingo", "Santiago", "La Romana", "Punta Cana", "San Francisco de Macorís"] },
  { name: "Estados Unidos (USA)", code: "+1", cities: ["Miami", "New York", "Orlando", "Boston", "Los Angeles"] },
  { name: "Canadá", code: "+1", cities: ["Toronto", "Montreal", "Vancouver", "Ottawa"] },
  { name: "Haití", code: "+509", cities: ["Puerto Príncipe", "Cabo Haitiano", "Gonaïves"] },
  { name: "Francia", code: "+33", cities: ["París", "Lyon", "Marsella", "Niza"] },
  { name: "España", code: "+34", cities: ["Madrid", "Barcelona", "Valencia", "Sevilla"] },
  { name: "Brasil", code: "+55", cities: ["São Paulo", "Río de Janeiro", "Brasilia", "Curitiba"] },
  { name: "Colombia", code: "+57", cities: ["Bogotá", "Medellín", "Cali", "Barranquilla"] },
  { name: "Bolivia", code: "+591", cities: ["La Paz", "Santa Cruz de la Sierra", "Cochabamba"] },
  { name: "Puerto Rico", code: "+1", cities: ["San Juan", "Bayamón", "Carolina", "Ponce"] },
  { name: "Cuba", code: "+53", cities: ["La Habana", "Santiago de Cuba", "Camagüey"] },
  { name: "Venezuela", code: "+58", cities: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"] },
  { name: "Jamaica", code: "+1", cities: ["Kingston", "Montego Bay", "Spanish Town"] }
];

const masterCatalog: { 
  [category: string]: { 
    name: string; 
    description: string; 
    includes: string[]; 
    price: string; 
    time: string; 
    mode: string; 
  }[] 
} = {
  "Branding e Identidad Corporativa": [
    { name: "Logotipo Esencial", description: "Creamos un logotipo profesional que represente la personalidad de tu negocio y te ayude a transmitir confianza.", includes: ["Logotipo principal", "Versión horizontal", "PNG transparente"], price: "RD$6,000", time: "3 a 5 días laborables", mode: "📱 Validación Humana" },
    { name: "Isotipo", description: "Diseñamos un símbolo gráfico que represente tu marca sin necesidad de utilizar texto.", includes: ["Diseño del isotipo", "Versiones en color", "Vector AI"], price: "RD$3,500", time: "2 a 4 días", mode: "📱 Validación Humana" },
    { name: "Imagotipo", description: "Logotipo donde el símbolo y el nombre pueden usarse juntos o por separado.", includes: ["Símbolo", "Logotipo", "Archivos editables"], price: "RD$7,000", time: "4 a 6 días", mode: "📱 Validación Humana" },
    { name: "Isologo", description: "Identidad donde texto y símbolo forman una sola pieza gráfica inseparable.", includes: ["Diseño completo", "Versiones para impresión"], price: "RD$7,000", time: "4 a 6 días", mode: "📱 Validación Humana" },
    { name: "Monograma", description: "Diseño elegante utilizando las iniciales de tu empresa o marca.", includes: ["Monograma personalizado", "Vector editable"], price: "RD$4,500", time: "2 a 4 días", mode: "📱 Validación Humana" },
    { name: "Rediseño de Logotipo", description: "Modernizamos tu logotipo conservando la esencia de tu marca.", includes: ["Análisis del logo actual", "Nuevo diseño"], price: "RD$7,500", time: "4 a 7 días", mode: "📱 Validación Humana" },
    { name: "Brand Kit Básico", description: "Organizamos los elementos principales de tu identidad visual.", includes: ["Logo", "Colores", "Tipografías"], price: "RD$8,500", time: "5 a 7 días", mode: "📅 Proyecto" },
    { name: "Paleta de Colores Corporativa", description: "Combinación de colores que representa la personalidad de tu marca.", includes: ["RGB", "CMYK", "HEX"], price: "RD$2,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Selección Tipográfica", description: "Elegimos las tipografías ideales para transmitir el estilo de tu negocio.", includes: ["Fuente principal", "Fuente secundaria"], price: "RD$2,000", time: "1 día", mode: "🤖 Automatizable" },
    { name: "Sistema Visual de Marca", description: "Elementos gráficos que darán coherencia a toda la comunicación.", includes: ["Patrones", "Iconografía"], price: "RD$9,500", time: "5 a 8 días", mode: "📅 Proyecto" },
    { name: "Manual Básico de Marca", description: "Guía sencilla para que tu logotipo se utilice correctamente.", includes: ["Uso correcto", "Colores", "Tipografía"], price: "RD$6,500", time: "3 a 5 días", mode: "📅 Proyecto" },
    { name: "Manual Completo de Marca", description: "Documento profesional con todas las normas visuales.", includes: ["Manual completo", "Aplicaciones"], price: "RD$18,000", time: "10 a 15 días", mode: "📅 Proyecto" },
    { name: "Iconografía Personalizada", description: "Conjunto de iconos exclusivos alineados con tu marca.", includes: ["Hasta 20 iconos", "SVG", "AI"], price: "RD$7,500", time: "4 a 6 días", mode: "📅 Proyecto" },
    { name: "Vectorización de Logotipo", description: "Convertimos tu logotipo en un archivo vectorial.", includes: ["AI", "EPS", "SVG", "PDF"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Mockup Profesional de Marca", description: "Aplicación de tu logotipo en diferentes materiales.", includes: ["Hasta 5 mockups", "Alta resolución"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" }
  ],
  "Papelería Corporativa": [
    { name: "Tarjeta de Presentación", description: "Tarjeta elegante que transmite profesionalismo.", includes: ["Frente", "Reverso", "Impresión"], price: "RD$2,000", time: "24 a 48 horas", mode: "🤖 Automatizable" },
    { name: "Tarjeta Troquelada", description: "Tarjeta con cortes personalizados.", includes: ["Diseño", "Línea de troquel"], price: "RD$3,500", time: "2 a 3 días", mode: "📱 Validación Humana" },
    { name: "Papel Timbrado", description: "Hojas membretadas profesionales.", includes: ["Formato Carta", "Formato A4"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Sobre Corporativo", description: "Sobres personalizados con identidad visual.", includes: ["Frente", "Reverso"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Carpeta Corporativa", description: "Carpetas institucionales para documentos.", includes: ["Exterior", "Interior"], price: "RD$4,500", time: "2 a 3 días", mode: "📱 Validación Humana" },
    { name: "Folder con Bolsillo", description: "Folders con bolsillo interno para contratos y propuestas.", includes: ["Diseño completo", "Troquelado"], price: "RD$5,000", time: "3 días", mode: "📱 Validación Humana" },
    { name: "Libreta Corporativa", description: "Libretas personalizadas alineadas a tu marca.", includes: ["Portada", "Contraportada"], price: "RD$4,000", time: "3 a 4 días", mode: "📅 Proyecto" },
    { name: "Factura Personalizada", description: "Facturas profesionales para cada venta.", includes: ["Diseño listo", "Editable"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Cotización Profesional", description: "Plantillas de cotización con diseño limpio.", includes: ["PDF", "Editable"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Credencial Corporativa", description: "Credenciales para empleados o eventos.", includes: ["Frente", "Reverso"], price: "RD$2,500", time: "1 a 2 días", mode: "🤖 Automatizable" }
  ],
  "Material Publicitario y Editorial": [
    { name: "Flyer Publicitario", description: "Flyer atractivo para promocionar productos o servicios.", includes: ["Una o doble cara", "Redes sociales"], price: "RD$2,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Volante Promocional", description: "Volantes claros para captar clientes.", includes: ["Diseño personalizado", "Archivo digital"], price: "RD$2,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Brochure Díptico", description: "Folleto de dos cuerpos para presentar tu empresa.", includes: ["4 paneles", "PDF listo"], price: "RD$5,500", time: "3 a 4 días", mode: "📱 Validación Humana" },
    { name: "Brochure Tríptico", description: "Folleto de tres cuerpos con distribución clara.", includes: ["6 paneles", "PDF final"], price: "RD$6,500", time: "3 a 5 días", mode: "📱 Validación Humana" },
    { name: "Catálogo de Productos", description: "Catálogos para mostrar tus productos.", includes: ["Portada", "Páginas interiores"], price: "Desde RD$8,500", time: "5 a 10 días", mode: "📅 Proyecto" },
    { name: "Portada de Catálogo", description: "Portada profesional para excelente primera impresión.", includes: ["Diseño personalizado", "Versión digital"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Afiche Publicitario", description: "Afiches de alto impacto para eventos.", includes: ["Diseño personalizado", "Impresión"], price: "RD$3,000", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Cartel Promocional", description: "Carteles con composición visual clara.", includes: ["Alta resolución", "PDF impresión"], price: "RD$3,000", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Calendario Corporativo", description: "Calendarios personalizados anuales.", includes: ["Portada", "Diseño mensual"], price: "RD$5,500", time: "4 a 6 días", mode: "📅 Proyecto" },
    { name: "Agenda Corporativa", description: "Agendas profesionales para empresas.", includes: ["Portada", "Interiores"], price: "RD$7,500", time: "5 a 7 días", mode: "📅 Proyecto" },
    { name: "Cupón Promocional", description: "Cupones para descuentos y fidelización.", includes: ["Diseño", "Código QR"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Invitación Personalizada", description: "Invitaciones elegantes para eventos.", includes: ["Versión digital", "Impresión"], price: "RD$2,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Programa para Eventos", description: "Programas organizados para conferencias.", includes: ["Portada", "Cronograma"], price: "RD$4,500", time: "2 a 3 días", mode: "📱 Validación Humana" },
    { name: "Menú para Restaurante", description: "Menús atractivos para negocios gastronómicos.", includes: ["Impreso", "PDF digital"], price: "RD$5,500", time: "2 a 4 días", mode: "📱 Validación Humana" },
    { name: "Carta Digital (PDF)", description: "Menú digital optimizado para WhatsApp.", includes: ["PDF interactivo", "Celular"], price: "RD$3,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Diseño de Ebook", description: "Ebooks profesionales para captar clientes.", includes: ["Portada", "Interiores"], price: "Desde RD$8,500", time: "5 a 8 días", mode: "📅 Proyecto" },
    { name: "Diseño de Revista", description: "Revistas con diagramación moderna.", includes: ["Portada", "Diagramación"], price: "Desde RD$12,000", time: "7 a 12 days", mode: "📅 Proyecto" },
    { name: "Portada de Libro", description: "Portadas que transmiten la esencia de tu obra.", includes: ["Frontal", "Lomo", "Mockup"], price: "RD$6,000", time: "3 a 5 días", mode: "📱 Validación Humana" },
    { name: "Diagramación Editorial", description: "Organización de contenido para lectura clara.", includes: ["Jerarquía visual", "Márgenes"], price: "Desde RD$10,000", time: "5 a 10 días", mode: "📅 Proyecto" },
    { name: "PDF Interactivo", description: "Documentos con botones y enlaces internos.", includes: ["Hipervínculos", "Optimización"], price: "RD$5,000", time: "2 a 4 days", mode: "🤖 Automatizable" }
  ],
  "Gran Formato": [
    { name: "Banner Publicitario", description: "Banners de gran impacto visual.", includes: ["Alta resolución", "Impresión"], price: "RD$3,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Lona Publicitaria", description: "Lonas de cualquier tamaño listas para impresión.", includes: ["Alta resolución", "PDF"], price: "RD$4,500", time: "2 días", mode: "🤖 Automatizable" },
    { name: "Back Panel", description: "Fondos publicitarios para eventos y ferias.", includes: ["Diseño completo", "Alta resolución"], price: "RD$6,000", time: "2 a 3 días", mode: "📱 Validación Humana" },
    { name: "Roll Up Banner", description: "Diseños verticales para oficinas y puntos de venta.", includes: ["Área de seguridad", "Impresión"], price: "RD$4,500", time: "2 días", mode: "🤖 Automatizable" },
    { name: "X Banner", description: "Piezas para estructuras tipo X.", includes: ["Diseño completo", "Alta resolución"], price: "RD$4,500", time: "2 días", mode: "🤖 Automatizable" },
    { name: "Mural Corporativo", description: "Murales que fortalecen la identidad de oficinas.", includes: ["Adaptación al espacio", "Impresión"], price: "Desde RD$10,000", time: "5 a 8 días", mode: "📅 Proyecto" },
    { name: "Vinil Decorativo", description: "Viniles para espacios interiores y locales.", includes: ["Adaptación de medidas", "Producción"], price: "RD$4,500", time: "2 a 3 días", mode: "🤖 Automatizable" },
    { name: "Banner para Ferias", description: "Banners profesionales para convenciones.", includes: ["Alta resolución", "Impresión"], price: "RD$4,000", time: "2 días", mode: "🤖 Automatizable" },
    { name: "Pendón Promocional", description: "Pendones con composición visual limpia.", includes: ["PDF final", "Impresión"], price: "RD$3,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Display Publicitario", description: "Displays para destacar productos en puntos de venta.", includes: ["Adaptación a medidas", "Impresión"], price: "RD$5,500", time: "3 a 4 días", mode: "📱 Validación Humana" }
  ],
  "Packaging y Etiquetas": [
    { name: "Etiqueta para Producto", description: "Etiquetas funcionales que resaltan tu producto.", includes: ["Diseño frontal", "Código de barras"], price: "RD$4,000", time: "2 a 3 días", mode: "📱 Validación Humana" },
    { name: "Etiqueta para Botellas", description: "Etiquetas para bebidas y cosméticos.", includes: ["Frontal y trasera", "Editable"], price: "RD$5,500", time: "3 a 4 días", mode: "📱 Validación Humana" },
    { name: "Etiqueta Circular", description: "Ideales para frascos, tapas y velas.", includes: ["Diseño personalizado", "Medidas"], price: "RD$2,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Sticker Promocional", description: "Stickers para empaques y marcas.", includes: ["Corte sugerido", "Impresión"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Empaque Básico", description: "Empaques funcionales que protegen tu producto.", includes: ["Diseño exterior", "Troquel"], price: "RD$8,000", time: "4 a 6 días", mode: "📅 Proyecto" },
    { name: "Packaging Premium", description: "Empaque exclusivo que aumenta el valor percibido.", includes: ["Mockup profesional", "Variantes"], price: "RD$15,000", time: "7 a 12 días", mode: "📅 Proyecto" },
    { name: "Caja Personalizada", description: "Cajas con presentación profesional.", includes: ["Diseño exterior e interior"], price: "RD$7,500", time: "4 a 6 days", mode: "📱 Validación Humana" },
    { name: "Bolsa Personalizada", description: "Bolsas comerciales para compras.", includes: ["Frente y reverso", "Formato"], price: "RD$4,000", time: "2 a 3 días", mode: "🤖 Automatizable" },
    { name: "Manga para Producto", description: "Fundas gráficas para vasos o envases.", includes: ["Adaptación de medidas"], price: "RD$4,500", time: "2 a 3 days", mode: "📱 Validación Humana" },
    { name: "Envoltura de Producto", description: "Envolturas para experiencia de compra atractiva.", includes: ["Archivo para impresión"], price: "RD$4,500", time: "2 a 4 days", mode: "📱 Validación Humana" }
  ],
  "Merchandising y Eventos": [
    { name: "Diseño para Taza", description: "Tazas promocionales o de regalo.", includes: ["Panorámico", "Plantilla"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño para Camiseta", description: "Gráficos para ropa o uniformes.", includes: ["Frente y espalda"], price: "RD$3,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Diseño para Gorras", description: "Adaptado a área de bordado o impresión.", includes: ["Diseño frontal"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño para Uniformes", description: "Uniformes corporativos coherentes.", includes: ["Logo", "Mockup"], price: "RD$6,000", time: "3 a 5 días", mode: "📱 Validación Humana" },
    { name: "Diseño para Hoodie", description: "Sudaderas personalizadas.", includes: ["Frente y espalda"], price: "RD$3,500", time: "1 a 2 días", mode: "🤖 Automatizable" },
    { name: "Diseño para Llavero", description: "Artes para llaveros de diferentes formas.", includes: ["Editable"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño para Pin", description: "Pines corporativos o conmemorativos.", includes: ["Producción"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Credencial de Evento", description: "Credenciales para congresos y ferias.", includes: ["Frente y reverso", "QR"], price: "RD$2,500", time: "1 día", mode: "🤖 Automatizable" },
    { name: "Diseño de Gift Card", description: "Tarjetas de regalo para fidelizar clientes.", includes: ["Frente y reverso"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Certificado", description: "Certificados para cursos o eventos.", includes: ["Digital e impresión"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Diploma", description: "Diplomas profesionales para instituciones.", includes: ["Archivo editable"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Voucher", description: "Vouchers para promociones y descuentos.", includes: ["Código QR"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Ticket", description: "Tickets para eventos y rifas con numeración.", includes: ["Numeración"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Tarjeta de Regalo", description: "Gift cards modernas.", includes: ["Frente y reverso"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Diseño de Plantilla Comercial", description: "Plantillas editables reutilizables.", includes: ["Editable"], price: "RD$5,000", time: "2 a 3 días", mode: "🤖 Automatizable" }
  ],
  "Redes Sociales": [
    { name: "Post para Instagram", description: "Publicaciones atractivas para redes.", includes: ["Formato cuadrado", "Alta resolución"], price: "RD$1,200", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Historia para Instagram", description: "Historias dinámicas para interacción.", includes: ["Formato vertical", "Móvil"], price: "RD$900", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Carrusel para Instagram", description: "Carruseles informativos de hasta 10 páginas.", includes: ["Hasta 10 páginas", "Portada"], price: "RD$4,500", time: "2 a 3 días", mode: "🤖 Automatizable" },
    { name: "Banner para Facebook", description: "Portadas profesionales para Facebook.", includes: ["Medidas optimizadas"], price: "RD$1,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Portada para LinkedIn", description: "Portadas para marcas personales y empresas.", includes: ["Diseño corporativo"], price: "RD$1,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Miniatura para YouTube", description: "Miniaturas llamativas para más clics.", includes: ["Optimización YouTube"], price: "RD$1,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Banner para YouTube", description: "Banners adaptados a todos los dispositivos.", includes: ["Multiplataforma"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Portada para Twitch", description: "Diseños para streaming moderno.", includes: ["Banner principal"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Portada para X (Twitter)", description: "Encabezados profesionales para perfil.", includes: ["Medidas optimizadas"], price: "RD$1,500", time: "24 hours", mode: "🤖 Automatizable" },
    { name: "Kit para Redes Sociales", description: "Diseños consistentes en todas tus redes.", includes: ["Foto de perfil", "Portadas", "Plantillas"], price: "RD$8,000", time: "4 a 6 días", mode: "📅 Proyecto" }
  ],
  "Diseño Web": [
    { name: "Landing Page (Diseño UI)", description: "Interfaz visual enfocada en conversión.", includes: ["Escritorio", "Móvil"], price: "Desde RD$15,000", time: "7 a 10 días", mode: "📅 Proyecto" },
    { name: "Interfaz para Sitio Web (UI)", description: "Interfaces modernas y funcionales.", includes: ["Páginas", "Responsive"], price: "Desde RD$18,000", time: "10 a 15 días", mode: "📅 Proyecto" },
    { name: "Banner Web", description: "Banners digitales para campañas.", includes: ["Optimización digital"], price: "RD$2,500", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Newsletter", description: "Boletines electrónicos estructurados.", includes: ["Cabecera", "Adaptable"], price: "RD$4,500", time: "2 a 3 días", mode: "🤖 Automatizable" },
    { name: "Firma Profesional para Correo", description: "Firmas modernas con enlaces y logo.", includes: ["Datos de contacto", "Redes"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" }
  ],
  "Servicios Complementarios": [
    { name: "Vectorización Profesional", description: "Redibujamos imágenes a vectores de calidad.", includes: ["AI", "EPS", "SVG"], price: "RD$2,500", time: "24 hours", mode: "🤖 Automatizable" },
    { name: "Eliminación de Fondo", description: "Recorte preciso para tiendas online.", includes: ["Fondo transparente", "PNG"], price: "RD$500 por imagen", time: "El mismo día", mode: "🤖 Automatizable" },
    { name: "Retoque Fotográfico", description: "Corrección de color e iluminación.", includes: ["Limpieza de imperfecciones"], price: "Desde RD$800 por imagen", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Mockup Profesional", description: "Escenarios realistas para tus diseños.", includes: ["Hasta 5 mockups"], price: "RD$2,000", time: "24 horas", mode: "🤖 Automatizable" },
    { name: "Asesoría de Diseño Gráfico", description: "Orientación estratégica para tu marca.", includes: ["Reunión", "Plan de acción"], price: "RD$3,500 por sesión", time: "60 a 90 minutos", mode: "📱 Validación Humana" }
  ]
};

export default function CotizacionPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN' | 'FR'>('ES');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const t = translations[currentLang];

  const [clientType, setClientType] = useState<'nuevo' | 'existente'>('nuevo');
  const [identifier, setIdentifier] = useState('');
  
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(allowedCountries[0].name);
  const [selectedCity, setSelectedCity] = useState(allowedCountries[0].cities[0]);
  const [countryCode, setCountryCode] = useState(allowedCountries[0].code);
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const [selectedMainService, setSelectedMainService] = useState('');
  const [selectedSubService, setSelectedSubService] = useState('');
  
  const [timeQuantity, setTimeQuantity] = useState('1');
  const [timeUnit, setTimeUnit] = useState('días');
  const [timeQuantity2, setTimeQuantity2] = useState('0');
  const [timeUnit2, setTimeUnit2] = useState('ninguno');

  const [needsPhysicalSample, setNeedsPhysicalSample] = useState<'si' | 'no'>('no');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [receiveChannel, setReceiveChannel] = useState<'whatsapp' | 'correo'>('whatsapp');
  
  // ESTADOS DE TÉRMINOS Y PAGO
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'acuerdo'>('online');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);

  // 1. Cargar el tema guardado en localStorage al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('nu_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 2. Guardar en localStorage cuando el usuario cambie el tema
  useEffect(() => {
    localStorage.setItem('nu_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName);
    const found = allowedCountries.find(c => c.name === countryName);
    if (found) {
      setCountryCode(found.code);
      setSelectedCity(found.cities[0]);
    }
  };

  const handleClientLookup = (val: string) => {
    setIdentifier(val);
    if (val.length > 2) {
      const searchKey = val.toLowerCase().trim();
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('client_')) {
          const storedData = JSON.parse(localStorage.getItem(key) || '{}');
          if (
            storedData.companyName?.toLowerCase().includes(searchKey) ||
            storedData.phone?.toLowerCase().includes(searchKey) ||
            storedData.email?.toLowerCase().includes(searchKey)
          ) {
            setCompanyName(storedData.companyName);
            setContactName(storedData.contactName);
            setSelectedCountry(storedData.country);
            setSelectedCity(storedData.city);
            setCountryCode(storedData.code);
            setContactPhone(storedData.phone);
            setContactEmail(storedData.email);
            setIsLocked(true);
            break;
          }
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      if (fileSizeMB > 5) {
        setFileError('El archivo supera los 5 MB permitidos.');
        setFile(null);
      } else {
        setFileError('');
        setFile(selectedFile);
      }
    }
  };

  const currentSubServiceDetails = selectedMainService && selectedSubService
    ? masterCatalog[selectedMainService]?.find(item => item.name === selectedSubService)
    : null;

  const isPriceFixed = currentSubServiceDetails && !currentSubServiceDetails.mode.includes('Validación');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Debes leer y aceptar los Términos y Condiciones para continuar.');
      return;
    }
    
    // Guardar cliente en almacenamiento local
    if (clientType === 'nuevo' && (contactPhone || companyName)) {
      const clientData = { companyName, contactName, country: selectedCountry, city: selectedCity, code: countryCode, phone: contactPhone, email: contactEmail };
      if (contactPhone) localStorage.setItem(`client_${contactPhone}`, JSON.stringify(clientData));
      if (contactEmail) localStorage.setItem(`client_${contactEmail}`, JSON.stringify(clientData));
      if (companyName) localStorage.setItem(`client_${companyName.toLowerCase()}`, JSON.stringify(clientData));
    }

    // FLUJO 1: PAGO EN LÍNEA DIRECTO A PASARELA STRIPE
    if (isPriceFixed && paymentMethod === 'online' && currentSubServiceDetails) {
      try {
        const rawPrice = currentSubServiceDetails.price.replace(/[^0-9]/g, '');

        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceName: currentSubServiceDetails.name,
            priceAmount: rawPrice,
            clientEmail: contactEmail,
            companyName: companyName || contactName,
          }),
        });

        const data = await response.json();

        if (data.success && data.url) {
          window.location.assign(data.url);
          return;
        } else {
          alert('No se pudo procesar la pasarela de pago. Inténtalo de nuevo.');
        }
      } catch (err) {
        console.error('Error al iniciar el pago:', err);
        alert('Ocurrió un error al conectar con la pasarela de pago.');
      }
      return;
    }

    // FLUJO 2: COTIZACIÓN HABITUAL (WhatsApp / Email)
    try {
      const response = await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          paymentMethod
        })
      });

      const result = await response.json();

      if (result.success) {
        if (result.channel === 'whatsapp' && result.redirectUrl) {
          window.open(result.redirectUrl, '_blank');
        }
        setIsSubmitted(true);
      } else {
        alert('Hubo un error al procesar la cotización. Inténtalo de nuevo.');
      }
    } catch {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setSelectedMainService('');
    setSelectedSubService('');
    setFile(null);
    setIsLocked(false);
    setIdentifier('');
    setAcceptedTerms(false);
    setIsSubmitted(false);
  };

  const categoriesWithPhysical = ["Papelería Corporativa", "Gran Formato", "Packaging y Etiquetas", "Merchandising y Eventos"];
  const showPhysicalSampleOption = categoriesWithPhysical.includes(selectedMainService);

  return (
    <div className={`min-h-dvh flex flex-col justify-between transition-colors duration-1000 relative overflow-x-hidden py-4 md:py-6 ${
      theme === 'dark' ? 'bg-[#040001] text-zinc-100' : 'bg-[#e3e3e3] text-zinc-900'
    }`}>
      
      {/* Fondo ambiental */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-225 h-225 bg-linear-to-tr from-red-700/25 via-red-950/15 to-transparent rounded-full blur-[160px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#050000]/70 to-[#030000]"></div>
          </>
        ) : (
          <div className="absolute top-1/4 right-1/4 w-175 h-175 bg-orange-200/50 rounded-full blur-[130px]"></div>
        )}
      </motion.div>

      {/* Top Navigation Bar Unificada */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="w-full px-5 md:px-10 py-4 flex items-center justify-between z-40 relative"
      >
        <div className="flex items-center space-x-2">
          {/* Marca en esquina móvil cambiada a AGENCY */}
          <Link href="/" className="md:hidden font-extrabold text-xs tracking-[0.25em] uppercase text-zinc-200">
            AGENCY
          </Link>

          <nav className="hidden md:flex items-center space-x-3 text-base font-medium">
            <Link href="/" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.inicio}</Link>
            <Link href="/portafolio" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.portafolio}</Link>
            <Link href="/contratar" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.contratar}</Link>
            <Link href="/contacto" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.contacto}</Link>
            <Link href="/utilidades" className="px-4 py-2 rounded-full opacity-70 hover:opacity-100 transition-all">{t.utilidades}</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative hidden md:block" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)} 
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 text-white hover:border-red-500/40'
                  : 'bg-black/5 border border-black/10 text-zinc-900 hover:border-red-500/40'
              }`}
            >
              <span>IDIOMAS</span>
              <span className="text-red-500 font-bold ml-1">({currentLang})</span>
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute right-0 mt-2 w-36 backdrop-blur-2xl border rounded-xl shadow-2xl overflow-hidden z-50 py-1 ${
                  theme === 'dark' ? 'bg-black/90 border-white/15 text-zinc-200' : 'bg-white/95 border-black/10 text-zinc-800'
                }`}>
                  <button onClick={() => { setCurrentLang('ES'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Español</button>
                  <button onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">English</button>
                  <button onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-zinc-300">Français</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="https://wa.me/18294608316" target="_blank" rel="noopener noreferrer" className={`hidden sm:flex backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal items-center space-x-2 transition-all ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white hover:border-emerald-500/60'
              : 'bg-black/5 border border-black/15 text-zinc-900 hover:border-emerald-600/60'
          }`}>
            <span>{t.whatsapp}</span>
          </a>

          <Link href="/cotizacion" className={`block backdrop-blur-2xl px-5 py-2 rounded-full text-xs md:text-sm font-normal transition-all ${
            theme === 'dark'
              ? 'bg-white/10 border border-red-500/40 text-red-500 font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]'
              : 'bg-black/10 border border-red-500/50 text-red-600 font-semibold'
          }`}>
            Cotización
          </Link>

          {/* Botón de menú hamburguesa calcado de Inicio */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white"
            aria-label="Abrir Menú"
          >
            ☰
          </button>
        </div>
      </motion.header>

      {/* MENÚ MÓVIL DESPLEGABLE (Copia idéntica de la plantilla Inicio) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-30 backdrop-blur-3xl flex flex-col justify-between p-8 pt-24 md:hidden ${
              theme === 'dark' ? 'bg-black/95 text-white' : 'bg-white/95 text-zinc-900'
            }`}
          >
            <div className="flex flex-col space-y-6 text-xl font-medium tracking-wide">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Inicio</span>
                <span>→</span>
              </Link>
              <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Portafolio</span>
                <span>→</span>
              </Link>
              <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contratar</span>
                <span>→</span>
              </Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Contacto</span>
                <span>→</span>
              </Link>
              <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                <span>Utilidades</span>
                <span>→</span>
              </Link>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-zinc-500/20">
              <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">Seleccionar Idioma</span>
              <div className="flex items-center gap-3">
                <button onClick={() => { setCurrentLang('ES'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'ES' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Español</button>
                <button onClick={() => { setCurrentLang('EN'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'EN' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>English</button>
                <button onClick={() => { setCurrentLang('FR'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border ${currentLang === 'FR' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Français</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher */}
      <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
      }`}>
        <button onClick={() => setTheme('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Claro"></button>
        <button onClick={() => setTheme('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none" title="Modo Oscuro"></button>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 z-10 flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <h1 className={`text-3xl md:text-5xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            {t.titulo} <span className={`font-semibold ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}>Cotización</span>
          </h1>
          <p className={`text-xs md:text-sm font-light tracking-widest uppercase opacity-75 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.subtitulo}
          </p>
        </div>

        {!isSubmitted ? (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className={`w-full backdrop-blur-2xl border rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 ${theme === 'dark' ? 'bg-zinc-900/50 border-white/15' : 'bg-white/70 border-zinc-300'}`}>
            
            {/* 1. Selector de Cliente */}
            <div className="space-y-3 border-b pb-6 border-white/10">
              <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">{t.tipoCliente}</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => { setClientType('nuevo'); resetForm(); }} className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${clientType === 'nuevo' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-70 hover:opacity-100'}`}>
                  {t.nuevoCliente}
                </button>
                <button type="button" onClick={() => setClientType('existente')} className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${clientType === 'existente' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-70 hover:opacity-100'}`}>
                  {t.soyCliente}
                </button>
              </div>

              {clientType === 'existente' && (
                <div className="mt-4 pt-2">
                  <input type="text" value={identifier} onChange={(e) => handleClientLookup(e.target.value)} placeholder={t.buscarClientePlaceholder} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'}`} />
                  <span className="text-[10px] text-red-500 mt-1 block">{t.avisoCliente}</span>
                </div>
              )}
            </div>

            {/* 2. Datos Generales */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">{t.infoContacto}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.nombreEmpresa}</label>
                  <input type="text" disabled={isLocked} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Ej. Nu-Design Corp" className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'}`} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.nombreResponsable}</label>
                  <input type="text" disabled={isLocked} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Ej. Garic Edume" className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'}`} />
                </div>
              </div>

              {/* País y Ciudad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.seleccionarPais}</label>
                  <select disabled={isLocked} value={selectedCountry} onChange={(e) => handleCountryChange(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white focus:border-red-500' : 'bg-white border-zinc-400 text-zinc-900 focus:border-red-600'}`}>
                    {allowedCountries.map((c, i) => (
                      <option key={i} value={c.name} className="bg-zinc-900 text-white">{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.ciudad}</label>
                  <select disabled={isLocked} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white focus:border-red-500' : 'bg-white border-zinc-400 text-zinc-900 focus:border-red-600'}`}>
                    {allowedCountries.find(c => c.name === selectedCountry)?.cities.map((city, i) => (
                      <option key={i} value={city} className="bg-zinc-900 text-white">{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Teléfono y Correo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.telefono}</label>
                  <div className="flex">
                    <span className={`inline-flex items-center px-3 rounded-l-xl border border-r-0 text-xs font-semibold ${theme === 'dark' ? 'bg-zinc-800 border-white/20 text-red-400' : 'bg-zinc-200 border-zinc-400 text-red-600'}`}>
                      {countryCode}
                    </span>
                    <input type="tel" required disabled={isLocked} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="8294608316" className={`w-full bg-transparent border rounded-r-xl px-4 py-3 text-xs outline-none transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'}`} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.correo}</label>
                  <input type="email" required disabled={isLocked} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="correo@empresa.com" className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'border-white/20 text-white placeholder-zinc-500 focus:border-red-500' : 'border-zinc-400 text-zinc-900 placeholder-zinc-500 focus:border-red-600'}`} />
                </div>
              </div>
            </div>

            {/* 3. Selector de Servicio */}
            <div className="space-y-4 border-t pt-6 border-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">{t.seleccionServicio}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.renglonPrincipal}</label>
                  <select required value={selectedMainService} onChange={(e) => { setSelectedMainService(e.target.value); setSelectedSubService(''); }} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white focus:border-red-500' : 'bg-white border-zinc-400 text-zinc-900 focus:border-red-600'}`}>
                    <option value="" disabled>{t.seleccionaServicio}</option>
                    {Object.keys(masterCatalog).map((mainCat, idx) => (
                      <option key={idx} value={mainCat} className="bg-zinc-900 text-white">{mainCat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.subservicioEspecifico}</label>
                  <select required disabled={!selectedMainService} value={selectedSubService} onChange={(e) => setSelectedSubService(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white focus:border-red-500' : 'bg-white border-zinc-400 text-zinc-900 focus:border-red-600'}`}>
                    <option value="" disabled>{t.seleccionaEspecificacion}</option>
                    {selectedMainService && masterCatalog[selectedMainService].map((sub, idx) => (
                      <option key={idx} value={sub.name} className="bg-zinc-900 text-white">{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {currentSubServiceDetails && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-2xl border text-xs space-y-3 ${theme === 'dark' ? 'bg-black/40 border-red-500/30' : 'bg-white/50 border-red-500/20'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-red-500 uppercase tracking-wider">{currentSubServiceDetails.name}</span>
                    <span className="font-bold text-sm">
                      {currentSubServiceDetails.mode.includes('Validación') ? 'Precio a Consultar' : `${currentSubServiceDetails.price} • ${currentSubServiceDetails.time}`}
                    </span>
                  </div>
                  <p className="opacity-80 font-light leading-relaxed">{currentSubServiceDetails.description}</p>
                </motion.div>
              )}
            </div>

            {/* 4. Selector de Tiempo */}
            <div className="space-y-4 border-t pt-6 border-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">{t.tiempoNecesario}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.cantidad1}</label>
                  <select value={timeQuantity} onChange={(e) => setTimeQuantity(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n} className="bg-zinc-900 text-white">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.unidad1}</label>
                  <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                    <option value="horas" className="bg-zinc-900 text-white">{t.horas}</option>
                    <option value="días" className="bg-zinc-900 text-white">{t.dias}</option>
                    <option value="semanas" className="bg-zinc-900 text-white">{t.semanas}</option>
                    <option value="meses" className="bg-zinc-900 text-white">{t.meses}</option>
                    <option value="año" className="bg-zinc-900 text-white">{t.anio}</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.adicional}</label>
                  <select value={timeQuantity2} onChange={(e) => setTimeQuantity2(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                    {[0,1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-zinc-900 text-white">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.unidadAdicional}</label>
                  <select value={timeUnit2} onChange={(e) => setTimeUnit2(e.target.value)} className={`w-full bg-transparent border rounded-xl px-4 py-3 text-xs outline-none ${theme === 'dark' ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-zinc-400 text-zinc-900'}`}>
                    <option value="ninguno" className="bg-zinc-900 text-white">{t.ninguno}</option>
                    <option value="días" className="bg-zinc-900 text-white">{t.dias}</option>
                    <option value="semanas" className="bg-zinc-900 text-white">{t.semanas}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Muestra Física */}
            {showPhysicalSampleOption && (
              <div className="space-y-4 border-t pt-6 border-white/10">
                <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">{t.muestraFisica}</label>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 text-xs cursor-pointer">
                    <input type="radio" name="physicalSample" checked={needsPhysicalSample === 'si'} onChange={() => setNeedsPhysicalSample('si')} className="accent-red-600" />
                    <span>{t.si}</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs cursor-pointer">
                    <input type="radio" name="physicalSample" checked={needsPhysicalSample === 'no'} onChange={() => setNeedsPhysicalSample('no')} className="accent-red-600" />
                    <span>{t.noDigital}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Archivo */}
            <div className="space-y-2 border-t pt-6 border-white/10">
              <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">{t.adjuntarRef}</label>
              <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={handleFileChange} className={`w-full text-xs file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`} />
              {fileError && <p className="text-[11px] text-red-500 mt-1 font-semibold">{fileError}</p>}
              {file && <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Archivo listo: {file.name}</p>}
            </div>

            {/* 6. Canal de Entrega */}
            <div className="space-y-3 border-t pt-6 border-white/10">
              <label className="text-xs uppercase tracking-widest font-semibold opacity-70 block">{t.canalEntrega}</label>
              <div className="flex gap-6 pt-1">
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input type="radio" name="receiveChannel" checked={receiveChannel === 'whatsapp'} onChange={() => setReceiveChannel('whatsapp')} className="accent-red-600" />
                  <span>{t.whatsappCanal} ({countryCode} {contactPhone || 'Número'})</span>
                </label>
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input type="radio" name="receiveChannel" checked={receiveChannel === 'correo'} onChange={() => setReceiveChannel('correo')} className="accent-red-600" />
                  <span>{t.correoCanal} ({contactEmail || 'Correo'})</span>
                </label>
              </div>
            </div>

            {/* 7. MODALIDAD DE PAGO Y ACUERDO */}
            {selectedSubService && (
              <div className="space-y-4 border-t pt-6 border-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">Método de Procesamiento y Pago</h3>
                
                {isPriceFixed ? (
                  <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-3">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                      Precio Fijo Automatizable Disponible
                    </span>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Este servicio tiene una tarifa estandarizada. Puedes realizar tu pago en línea de forma segura con **Apple Pay, Google Pay o Tarjeta** o coordinar la orden por WhatsApp.
                    </p>
                    <div className="flex gap-4 pt-1">
                      <button type="button" onClick={() => setPaymentMethod('online')} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${paymentMethod === 'online' ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'border-white/20 opacity-70'}`}>
                        Apple / Google Pay / Tarjeta
                      </button>
                      <button type="button" onClick={() => setPaymentMethod('acuerdo')} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${paymentMethod === 'acuerdo' ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'border-white/20 opacity-70'}`}>
                        Coordinar por WhatsApp
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 space-y-2">
                    <span className="text-xs font-semibold text-red-400 flex items-center gap-2">
                      Requiere Evaluación & Acuerdo a Medida
                    </span>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Este servicio requiere análisis de alcance. Al enviar el formulario, iniciaremos una conversación directa vía WhatsApp o correo para acordar los detalles y el presupuesto exacto.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 8. TÉRMINOS Y CONDICIONES OBLIGATORIOS */}
            <div className="space-y-3 border-t pt-6 border-white/10">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  checked={acceptedTerms} 
                  onChange={(e) => setAcceptedTerms(e.target.checked)} 
                  className="mt-1 w-4 h-4 accent-red-600 rounded cursor-pointer" 
                />
                <label htmlFor="terms" className="text-xs opacity-80 leading-relaxed cursor-pointer">
                  Acepto los{' '}
                  <button type="button" onClick={() => setShowTermsModal(true)} className="text-red-500 font-semibold underline hover:text-red-400">
                    Términos y Condiciones de Servicio
                  </button>{' '}
                  de NU-DESIGN y la política de entrega de archivos.
                </label>
              </div>
            </div>

            {/* Botón de Enviar */}
            <div className="pt-4 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                type="submit" 
                className="w-full md:w-auto px-12 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xl transition-all"
              >
                {isPriceFixed && paymentMethod === 'online' ? 'Proceder al Pago Seguro' : t.botonEnviar}
              </motion.button>
            </div>

          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`w-full backdrop-blur-2xl border rounded-3xl p-12 text-center space-y-6 ${theme === 'dark' ? 'bg-zinc-900/60 border-white/15' : 'bg-white/70 border-zinc-300'}`}>
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl md:text-3xl font-light">{t.exitoTitulo}</h2>
            <p className="text-xs md:text-sm font-light opacity-80 max-w-lg mx-auto leading-relaxed">
              {t.exitoDesc} <strong>{receiveChannel === 'whatsapp' ? t.whatsappCanal : t.correoCanal}</strong>.
            </p>
            <button onClick={resetForm} className="mt-4 px-8 py-3 bg-red-600 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-red-700 transition-colors">
              {t.otraCotizacion}
            </button>
          </motion.div>
        )}

      </main>

      {/* MODAL DE TÉRMINOS Y CONDICIONES */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-3xl border shadow-2xl space-y-6 ${theme === 'dark' ? 'bg-zinc-950 border-white/20 text-zinc-200' : 'bg-white border-zinc-300 text-zinc-800'}`}>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-red-500 uppercase tracking-wide">Términos y Condiciones • NU-DESIGN</h3>
                <button onClick={() => setShowTermsModal(false)} className="text-xl opacity-60 hover:opacity-100">&times;</button>
              </div>

              <div className="text-xs space-y-4 font-light leading-relaxed">
                <p><strong>1. Propiedad Intelectual:</strong> Todos los derechos de autor de las propuestas conceptuales pertenecen a NU-DESIGN hasta la liquidación total del proyecto.</p>
                <p><strong>2. Revisiones y Tiempos:</strong> Cada servicio incluye hasta 3 rondas de ajustes dentro del tiempo estimado especificado en la cotización.</p>
                <p><strong>3. Archivos y Formatos:</strong> Los archivos finales se entregan en formatos editables (AI, EPS, PDF) e imágenes de alta resolución (PNG, JPG, SVG) según el paquete adquirido.</p>
                <p><strong>4. Pagos y Reembolsos:</strong> Los pagos únicos para servicios automatizables o el anticipo acordado no son reembolsables una vez iniciado el proceso de diseño activo.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <button onClick={() => { setAcceptedTerms(true); setShowTermsModal(false); }} className="px-6 py-2.5 bg-red-600 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-red-700">
                  Entendido y Aceptar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Unificado en 1 sola línea */}
      <footer className="w-full px-4 py-4 flex flex-col items-center space-y-3 z-25 mt-6">
        <div className={`text-[9px] sm:text-[11px] md:text-xs font-light tracking-tight sm:tracking-wide text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${
          theme === 'dark' ? 'text-zinc-400 opacity-70' : 'text-zinc-700 opacity-90'
        }`}>
          Nu-Design Derechos reservados 2026 - Design by Garic Edume
        </div>
      </footer>

    </div>
  );
}