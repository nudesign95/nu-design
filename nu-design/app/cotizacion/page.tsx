'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { createClient } from '@supabase/supabase-js';
import { Turnstile } from '@marsidev/react-turnstile';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';

// Carga dinámica de SignatureCanvas sin SSR para prevenir fallos en Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignatureCanvas = dynamic(() => import('react-signature-canvas'), { ssr: false }) as React.ComponentType<any>;

// Inicialización limpia de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://m3c3m0sc0kic0.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ugAYPxVOmXe9lwvViLp6wA_Rytg9jDi';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    advance: string;
    note: string;
  }[] 
} = {
  "Branding e Identidad Corporativa": [
    { name: "Logotipo Esencial", description: "Creamos un logotipo profesional y memorable que represente la identidad de tu negocio. Diseñado para transmitir confianza, diferenciar tu marca y adaptarse correctamente a medios digitales e impresos.", includes: ["Logotipo en AI", "Logotipo en PDF", "Logotipo en PNG (Fondo transparente)", "Logotipo en JPG"], price: "RD$6,000", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente del logotipo para garantizar su correcta aplicación y futuras adaptaciones." },
    { name: "Isotipo", description: "Diseño de un símbolo gráfico único que represente visualmente tu marca sin necesidad de incorporar texto. Ideal para empresas que buscan una identidad moderna y reconocible.", includes: ["Isotipo en AI", "Isotipo en PDF", "Isotipo en PNG (Fondo transparente)", "Isotipo en JPG"], price: "RD$3,500", time: "2–4 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente del diseño para garantizar su correcta implementación en cualquier soporte." },
    { name: "Imagotipo", description: "Desarrollo de un imagotipo donde el símbolo y el nombre de la marca pueden utilizarse de forma conjunta o independiente, ofreciendo mayor flexibilidad para diferentes aplicaciones.", includes: ["Imagotipo en AI", "Imagotipo en PDF", "Imagotipo en PNG (Fondo transparente)", "Imagotipo en JPG"], price: "RD$5,000", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente necesarios para el correcto uso de la identidad visual." },
    { name: "Isologo", description: "Diseño de un isologo donde el símbolo y la tipografía forman una única composición gráfica, creando una identidad sólida y fácilmente reconocible.", includes: ["Isologo en AI", "Isologo en PDF", "Isologo en PNG (Fondo transparente)", "Isologo en JPG"], price: "RD$5,000", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente del diseño para facilitar futuras aplicaciones." },
    { name: "Monograma", description: "Diseño de un monograma elegante utilizando las iniciales de una empresa o marca personal, ideal para negocios que buscan una identidad exclusiva y sofisticada.", includes: ["Monograma en AI", "Monograma en PDF", "Monograma en PNG (Fondo transparente)", "Monograma en JPG"], price: "RD$3,500", time: "2–4 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente para facilitar futuras aplicaciones del diseño." },
    { name: "Rediseño de Logotipo", description: "Modernizamos tu logotipo actual manteniendo la esencia de tu marca, adaptándolo a las nuevas tendencias y mejorando su funcionalidad en cualquier medio.", includes: ["Logotipo renovado en AI", "Logotipo renovado en PDF", "Logotipo renovado en PNG", "Logotipo renovado en JPG"], price: "RD$5,500", time: "3–6 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "El servicio incluye los archivos fuente del nuevo logotipo desarrollado." },
    { name: "Brand Kit Básico", description: "Un paquete esencial para nuevos negocios que reúne los elementos principales de la identidad visual necesarios para comenzar a construir una marca profesional.", includes: ["Logotipo", "Paleta de colores", "Selección tipográfica", "Archivos fuente"], price: "RD$9,500", time: "5–7 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente correspondientes a la identidad visual desarrollada." },
    { name: "Paleta de Colores Corporativa", description: "Definimos una paleta de colores estratégica que represente la personalidad de tu marca y garantice una comunicación visual consistente en cualquier plataforma.", includes: ["Documento PDF", "Códigos HEX", "Códigos RGB", "Códigos CMYK", "Códigos Pantone (cuando aplique)"], price: "RD$2,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio entrega la documentación técnica necesaria para la correcta aplicación de los colores corporativos." },
    { name: "Selección Tipográfica", description: "Seleccionamos las tipografías ideales para tu marca, priorizando legibilidad, personalidad y coherencia visual en todos los materiales corporativos.", includes: ["Documento PDF", "Tipografía principal", "Tipografía secundaria", "Guía de uso"], price: "RD$2,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Las tipografías comerciales estarán sujetas a las licencias de sus respectivos desarrolladores." },
    { name: "Sistema Visual de Marca", description: "Diseñamos el conjunto de elementos gráficos que darán coherencia y personalidad a tu marca en cualquier canal de comunicación.", includes: ["Documento PDF", "Recursos gráficos", "Elementos visuales", "Archivos fuente"], price: "RD$12,000", time: "5–8 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente de los recursos gráficos desarrollados." },
    { name: "Manual Básico de Marca", description: "Documento con las normas esenciales para garantizar el uso correcto de la identidad visual y mantener una comunicación consistente.", includes: ["Manual de Marca en PDF", "Logotipo", "Archivos fuente"], price: "RD$8,500", time: "5–7 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Incluye los archivos fuente de la identidad visual desarrollada." },
    { name: "Manual Completo de Marca", description: "Manual profesional con todas las normas, especificaciones y aplicaciones necesarias para implementar correctamente la identidad visual de una empresa.", includes: ["Manual de Marca en PDF", "Logotipo en AI, PDF, PNG y JPG", "Paleta de colores", "Tipografías", "Variantes del logotipo", "Archivos fuente"], price: "RD$18,000", time: "10–15 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye todos los archivos fuente necesarios para administrar correctamente la identidad visual de la marca." },
    { name: "Iconografía Personalizada", description: "Diseño de un conjunto de iconos personalizados que complementan la identidad visual de tu empresa y fortalecen la comunicación gráfica.", includes: ["Iconos en SVG", "Iconos en PNG", "Documento PDF", "Archivos fuente"], price: "RD$8,000", time: "5–7 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Incluye los archivos fuente de todos los iconos desarrollados." },
    { name: "Vectorización de Logotipo", description: "Convertimos tu logotipo de baja calidad o formato rasterizado en un archivo vectorial profesional, escalable y listo para impresión o uso digital.", includes: ["Logotipo vectorizado en AI", "PDF", "SVG", "EPS"], price: "RD$2,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye el logotipo completamente vectorizado y listo para utilizarse en cualquier tamaño sin pérdida de calidad." },
    { name: "Mockup Profesional de Marca", description: "Presenta tu identidad visual de forma realista mediante mockups profesionales que muestran cómo se verá tu marca aplicada en diferentes soportes y escenarios.", includes: ["Hasta 5 mockups en JPG de alta resolución"], price: "RD$3,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye imágenes finales de presentación. Los archivos fuente de los mockups utilizados no forman parte de la entrega." }
  ],
  "Papelería Corporativa": [
    { name: "Tarjeta de Presentación", description: "Destaca tu imagen profesional con una tarjeta de presentación diseñada para transmitir confianza y causar una excelente primera impresión. Cada diseño se desarrolla de forma personalizada, respetando la identidad visual de tu marca y lista para impresión de alta calidad.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Tarjeta Troquelada", description: "Diseño de tarjetas de presentación con acabados troquelados y formas personalizadas para ofrecer una imagen creativa, moderna y diferenciadora que destaque frente a la competencia.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Papel Timbrado", description: "Diseño profesional de papel timbrado para documentos oficiales, contratos, cartas y comunicaciones empresariales, reforzando la identidad visual de tu organización.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$900", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Sobre Corporativo", description: "Diseño personalizado de sobres corporativos para fortalecer la imagen institucional de tu empresa en correspondencias, propuestas comerciales y documentación oficial.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$900", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Carpeta Corporativa", description: "Diseño de carpetas corporativas para presentar propuestas, contratos y documentos empresariales con una imagen profesional, elegante y organizada.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Folder con Bolsillo", description: "Diseño de folders con bolsillo interior para organizar documentos comerciales, presentaciones y material institucional, manteniendo una identidad visual sólida y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Libreta Corporativa", description: "Diseño personalizado de libretas corporativas para empresas, instituciones y eventos, combinando funcionalidad con una identidad visual profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Factura Personalizada", description: "Diseño de facturas personalizadas que proyectan una imagen organizada y profesional, fortaleciendo la identidad visual de tu empresa en cada transacción.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,200", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Cotización Profesional", description: "Diseño de plantillas de cotización con una presentación moderna y profesional para transmitir confianza y mejorar la imagen de tu empresa en cada propuesta comercial.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,000", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Credencial Corporativa", description: "Diseño de credenciales corporativas para colaboradores, visitantes o instituciones, ofreciendo una presentación profesional, funcional y alineada con la identidad visual de la empresa.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,200", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." }
  ],
  "Material Publicitario y Editorial": [
    { name: "Flyer Publicitario", description: "Diseño de flyers atractivos y profesionales para promocionar productos, servicios, eventos o campañas publicitarias. Una pieza visual creada para captar la atención y comunicar tu mensaje de forma efectiva.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Volante Promocional", description: "Diseño de volantes promocionales ideales para campañas publicitarias, inauguraciones, promociones especiales y distribución masiva con una presentación profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,300", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Brochure Díptico", description: "Diseño de brochures de dos cuerpos para presentar información de forma clara, elegante y organizada, ideal para empresas, productos o servicios.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Brochure Tríptico", description: "Diseño de brochures trípticos con una distribución estratégica del contenido para comunicar información de manera atractiva y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Catálogo de Productos", description: "Diseño profesional de catálogos para presentar productos o servicios con una estructura organizada, atractiva y alineada con la identidad visual de tu empresa.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$6,500", time: "5–10 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente del proyecto para facilitar futuras actualizaciones del catálogo." },
    { name: "Portada de Catálogo", description: "Diseño exclusivo de la portada de un catálogo para transmitir profesionalismo y captar la atención desde el primer vistazo.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,800", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Afiche Publicitario", description: "Diseño de afiches publicitarios de alto impacto para promocionar eventos, campañas, lanzamientos o productos con una comunicación visual efectiva.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Cartel Promocional", description: "Diseño de carteles promocionales para campañas comerciales, señalización o publicidad, con una composición visual clara y atractiva.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Calendario Corporativo", description: "Diseño de calendarios corporativos personalizados para fortalecer la presencia de tu marca durante todo el año, ideales para promociones y obsequios empresariales.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,000", time: "3–5 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Agenda Corporativa", description: "Diseño personalizado de agendas corporativas con una presentación elegante y funcional, ideales para empresas, instituciones y campañas promocionales.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,500", time: "3–5 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Cupón Promocional", description: "Diseño de cupones promocionales personalizados para campañas de descuentos, ofertas especiales, fidelización de clientes o eventos comerciales, con una presentación atractiva y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Invitación Personalizada", description: "Diseño de invitaciones personalizadas para eventos sociales, corporativos o institucionales, cuidando cada detalle para transmitir una excelente primera impresión.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Programa para Eventos", description: "Diseño profesional de programas para congresos, conferencias, graduaciones, bodas, actividades empresariales y eventos especiales, con una distribución clara y elegante.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Menú para Restaurante", description: "Diseño de menús impresos para restaurantes, cafeterías, bares y negocios gastronómicos, combinando una presentación atractiva con una organización clara de la información.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Carta Digital (PDF)", description: "Diseño de cartas digitales optimizadas para compartir mediante código QR, WhatsApp, correo electrónico o redes sociales, ideales para restaurantes y cafeterías.", includes: ["Archivo PDF optimizado para visualización digital"], price: "RD$2,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye un archivo PDF optimizado para medios digitales. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Ebook", description: "Diseño profesional de libros digitales con una estructura limpia, atractiva y fácil de leer, ideal para guías, manuales, recursos educativos o contenido comercial.", includes: ["Archivo PDF de alta calidad", "Archivo editable (Adobe InDesign)"], price: "RD$8,500", time: "5–10 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye el archivo editable del proyecto para facilitar futuras actualizaciones o modificaciones." },
    { name: "Diseño de Revista", description: "Diseño editorial completo para revistas corporativas, institucionales o comerciales, con una diagramación profesional que mejora la experiencia de lectura.", includes: ["Archivo PDF listo para impresión (CMYK)", "Archivo editable (Adobe InDesign)"], price: "RD$15,000", time: "10–15 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos editables del proyecto para permitir futuras ediciones y actualizaciones del contenido." },
    { name: "Portada de Libro", description: "Diseño profesional de portadas para libros impresos o digitales, desarrollado para captar la atención del lector y reflejar la esencia de la obra.", includes: ["Archivo PDF listo para impresión (CMYK)", "Archivo JPG de alta resolución"], price: "RD$4,500", time: "3–5 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión y distribución digital. Los archivos fuente podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diagramación Editorial", description: "Organización profesional de textos, imágenes y elementos gráficos para libros, revistas, manuales, catálogos y publicaciones editoriales, garantizando una lectura cómoda y una presentación de alta calidad.", includes: ["Archivo PDF listo para impresión (CMYK)", "Archivo editable (Adobe InDesign)"], price: "RD$12,000", time: "7–12 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos editables del proyecto para facilitar futuras modificaciones y actualizaciones." },
    { name: "PDF Interactivo", description: "Diseño de documentos PDF interactivos con botones, enlaces, navegación interna y elementos dinámicos, ideales para catálogos digitales, presentaciones, manuales y propuestas comerciales.", includes: ["Archivo PDF interactivo", "Archivo editable (Adobe InDesign)"], price: "RD$6,500", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye el archivo editable del proyecto para permitir futuras actualizaciones y personalizaciones del documento." }
  ],
  "Gran Formato": [
    { name: "Banner Publicitario", description: "Diseño de banners publicitarios de gran impacto para promocionar productos, servicios, eventos o campañas comerciales. Adaptado para impresión en distintos formatos y materiales.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Lona Publicitaria", description: "Diseño profesional de lonas publicitarias para negocios, promociones, eventos y campañas exteriores, optimizadas para impresión en gran formato.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Back Panel", description: "Diseño de back panels para eventos, conferencias, ruedas de prensa, ferias y exhibiciones, garantizando una presencia visual profesional de tu marca.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$4,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Roll Up Banner", description: "Diseño de roll up banners ideales para exposiciones, ferias, puntos de venta y presentaciones comerciales, con una composición visual clara y atractiva.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "X Banner", description: "Diseño de piezas gráficas para estructuras tipo X Banner, ideales para promociones temporales, eventos corporativos y campañas publicitarias.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Mural Corporativo", description: "Diseño de murales corporativos para oficinas, negocios y espacios comerciales, fortaleciendo la identidad visual y mejorando la experiencia de clientes y colaboradores.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$6,500", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos finales necesarios para su producción. Los archivos fuente podrán cotizarse por separado si el cliente los requiere." },
    { name: "Vinil Decorativo", description: "Diseño de vinilos decorativos para cristales, paredes, oficinas, comercios y espacios interiores, adaptados a la identidad visual de tu empresa.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Banner para Ferias", description: "Diseño de banners promocionales para ferias, exposiciones y eventos empresariales, desarrollados para destacar tu marca y atraer la atención del público.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,000", time: "2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Pendón Promocional", description: "Diseño de pendones promocionales para campañas publicitarias, actividades institucionales, lanzamientos de productos y eventos comerciales.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Display Publicitario", description: "Diseño de displays promocionales para puntos de venta, exhibiciones y campañas comerciales, optimizados para destacar productos y reforzar la presencia de tu marca.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$4,500", time: "2–4 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." }
  ],
  "Packaging y Etiquetas": [
    { name: "Etiqueta para Producto", description: "Diseño profesional de etiquetas para productos comerciales, desarrolladas para destacar tu marca, comunicar información importante y aumentar el atractivo visual en el punto de venta.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Etiqueta para Botellas", description: "Diseño personalizado de etiquetas para botellas de bebidas, cosméticos, productos artesanales o cualquier envase cilíndrico, cuidando la estética y la funcionalidad.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Etiqueta Circular", description: "Diseño de etiquetas circulares para productos, empaques, frascos o promociones especiales, manteniendo una presentación limpia y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,800", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Sticker Promocional", description: "Diseño de stickers personalizados para campañas promocionales, branding, empaques o decoración de productos, adaptados a la identidad visual de tu marca.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Empaque Básico", description: "Diseño de empaques funcionales para productos comerciales, desarrollados para proteger el producto y transmitir una imagen profesional de tu marca.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$5,000", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos finales listos para producción. Los archivos fuente podrán cotizarse por separado si el cliente los requiere." },
    { name: "Packaging Premium", description: "Desarrollo de un diseño de empaque premium orientado a fortalecer el posicionamiento de tu marca, mejorar la experiencia del cliente y aumentar el valor percibido del producto.", includes: ["Archivo PDF listo para impresión (CMYK)", "Mockup profesional de presentación"], price: "RD$12,000", time: "7–12 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos fuente del empaque junto con un mockup profesional para presentación del proyecto." },
    { name: "Caja Personalizada", description: "Diseño de cajas personalizadas para productos de cualquier categoría, optimizadas para impresión y fabricación con una presentación profesional y atractiva.", includes: ["Archivo PDF listo para impresión (CMYK)", "Guía de armado (cuando aplique)"], price: "RD$6,500", time: "4–6 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente podrán cotizarse por separado si el cliente los requiere." },
    { name: "Bolsa Personalizada", description: "Diseño de bolsas personalizadas para tiendas, boutiques, ferias y empresas que desean fortalecer la presencia de su marca en cada entrega.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Manga para Producto", description: "Diseño de mangas o fundas impresas para complementar empaques, proteger productos y mejorar su presentación visual en el punto de venta.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Envoltura de Producto", description: "Diseño de envolturas personalizadas para productos comerciales, regalos o ediciones especiales, creando una presentación atractiva y alineada con la identidad de tu marca.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." }
  ],
  "Merchandising y Eventos": [
    { name: "Diseño para Taza", description: "Diseño personalizado para tazas promocionales, corporativas o conmemorativas, ideal para fortalecer la identidad de tu marca o crear productos personalizados de alta calidad.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño para Camiseta", description: "Diseño gráfico para camisetas promocionales, corporativas o de uso comercial, desarrollado para destacar la identidad visual de tu marca con una composición atractiva y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,500", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño para Gorras", description: "Diseño personalizado para gorras promocionales, institucionales o comerciales, optimizado para procesos de bordado, serigrafía o impresión, según las especificaciones del proveedor.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño para Uniformes", description: "Diseño profesional de uniformes corporativos para empresas, instituciones y comercios, manteniendo una imagen coherente y alineada con la identidad visual de la marca.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,500", time: "3–5 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño para Hoodie", description: "Diseño personalizado para hoodies promocionales, corporativos o de colección, desarrollado para ofrecer una presentación moderna y atractiva en cualquier método de impresión.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$3,000", time: "2–4 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño para Llavero", description: "Diseño de llaveros personalizados para promociones, campañas publicitarias, eventos o souvenirs corporativos, adaptado al formato de fabricación seleccionado.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño para Pin", description: "Diseño de pines personalizados para empresas, instituciones, campañas promocionales, eventos o marcas que buscan un elemento distintivo y fácil de reconocer.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para producción. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Credencial de Evento", description: "Diseño profesional de credenciales para congresos, ferias, conferencias, talleres y eventos corporativos, con una presentación clara, organizada y alineada con la identidad visual del evento.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,800", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Gift Card", description: "Diseño de gift cards personalizadas para promociones, campañas comerciales, programas de fidelización o regalos corporativos, con una presentación elegante y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Certificado", description: "Diseño profesional de certificados personalizados para cursos, capacitaciones, reconocimientos, instituciones y empresas, con un estilo elegante y de alta calidad.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Diploma", description: "Diseño personalizado de diplomas para instituciones educativas, empresas, academias y eventos especiales, transmitiendo profesionalismo y prestigio en cada reconocimiento.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,800", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Voucher", description: "Diseño de vouchers personalizados para promociones, obsequios, descuentos o campañas comerciales, desarrollados para fortalecer la imagen de tu negocio y mejorar la experiencia del cliente.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,200", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Ticket", description: "Diseño profesional de tickets para eventos, rifas, conciertos, actividades deportivas o promociones, con una estructura clara y lista para impresión.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,200", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Tarjeta de Regalo", description: "Diseño de tarjetas de regalo personalizadas para comercios, boutiques, restaurantes y empresas que desean ofrecer una experiencia de compra más atractiva y profesional.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para impresión. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Diseño de Plantilla Comercial", description: "Diseño de plantillas personalizadas para mantener una imagen visual uniforme en documentos comerciales, promociones o materiales internos, facilitando la comunicación de tu empresa.", includes: ["Archivo PDF listo para impresión (CMYK)"], price: "RD$2,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales necesarios para su uso. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." }
  ],
  "Redes Sociales": [
    { name: "Post para Instagram", description: "Diseño de publicaciones atractivas y profesionales para Instagram, creadas para fortalecer la presencia de tu marca, promocionar productos o comunicar información de manera efectiva.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$800", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para publicación en redes sociales. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Historia para Instagram", description: "Diseño de historias en formato vertical, ideales para promociones, anuncios, campañas y contenido dinámico que conecte con tu audiencia.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$600", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para historias de Instagram. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Carrusel para Instagram", description: "Diseño de carruseles informativos o promocionales que permiten presentar contenido de forma organizada, atractiva y con mayor interacción.", includes: ["Hasta 10 páginas en JPG", "Hasta 10 páginas en PNG"], price: "RD$3,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye las imágenes finales listas para publicar. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Banner para Facebook", description: "Diseño profesional de portadas para páginas de Facebook, optimizadas para mostrar una imagen corporativa atractiva y alineada con tu identidad visual.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$1,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para Facebook. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Portada para LinkedIn", description: "Diseño de portadas profesionales para perfiles personales o páginas empresariales de LinkedIn, transmitiendo una imagen seria, moderna y corporativa.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$1,200", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para LinkedIn. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Miniatura para YouTube", description: "Diseño de miniaturas llamativas y optimizadas para aumentar la tasa de clics (CTR) y mejorar la presentación de tus videos en YouTube.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$800", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para YouTube. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Banner para YouTube", description: "Diseño de banners profesionales para canales de YouTube, adaptados a todos los dispositivos y alineados con la identidad visual de tu marca.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para YouTube. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Portada para Twitch", description: "Diseño de portadas personalizadas para canales de Twitch, creando una identidad visual atractiva para streamers, creadores de contenido y marcas.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para Twitch. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Portada para X (Twitter)", description: "Diseño de portadas profesionales para perfiles personales o empresariales en X (Twitter), fortaleciendo la presencia visual de tu marca en la plataforma.", includes: ["Archivo JPG de alta calidad", "Archivo PNG"], price: "RD$1,000", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para X (Twitter). Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Kit para Redes Sociales", description: "Diseño de un paquete completo de recursos gráficos para redes sociales, ideal para mantener una imagen profesional y consistente en todas tus plataformas digitales.", includes: ["Foto de perfil", "Portada para Facebook", "Banner para YouTube", "Portada para LinkedIn", "Portada para X (Twitter)", "Portada para Twitch", "Archivos JPG y PNG optimizados"], price: "RD$5,500", time: "3–5 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye todos los archivos finales optimizados para cada plataforma. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." }
  ],
  "Diseño Web": [
    { name: "Landing Page (Diseño UI)", description: "Diseño de una landing page moderna y enfocada en la conversión, ideal para promocionar productos, servicios, campañas publicitarias o captar clientes potenciales mediante una experiencia visual atractiva.", includes: ["Diseño de interfaz (UI)", "Prototipo de alta fidelidad", "Versión para escritorio", "Versión responsive (Tablet y móvil)", "Archivo editable (Figma)"], price: "RD$15,000", time: "5–10 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye los archivos editables del diseño desarrollados en Figma. No incluye programación ni desarrollo web." },
    { name: "Interfaz para Sitio Web (UI)", description: "Diseño completo de la interfaz visual para sitios web corporativos, tiendas en línea o plataformas digitales, priorizando la experiencia del usuario, la usabilidad y una identidad visual profesional.", includes: ["Diseño completo de interfaz (UI)", "Prototipo navegable", "Diseño responsive", "Archivo editable (Figma)"], price: "RD$30,000", time: "10–20 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio corresponde únicamente al diseño visual de la interfaz. El desarrollo o programación del sitio web no está incluido." },
    { name: "Banner Web", description: "Diseño de banners publicitarios optimizados para sitios web, campañas digitales y promociones online, adaptados a diferentes tamaños y dispositivos.", includes: ["Archivo JPG optimizado", "Archivo PNG optimizado", "Archivo WebP (cuando aplique)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye los archivos finales optimizados para uso web. Los archivos fuente no están incluidos y podrán cotizarse por separado si el cliente los requiere." },
    { name: "Newsletter", description: "Diseño profesional de newsletters para campañas de correo electrónico, con una estructura atractiva, organizada y optimizada para mejorar la comunicación con tus clientes.", includes: ["Diseño en PDF de referencia", "Recursos gráficos optimizados", "Archivo editable (Figma)"], price: "RD$4,000", time: "2–4 días laborables", mode: "📱 Contactar al Personal", advance: "50%", note: "Este servicio incluye el diseño visual del newsletter. No incluye programación HTML ni configuración en plataformas de email marketing." },
    { name: "Firma Profesional para Correo", description: "Diseño de una firma profesional para correo electrónico que fortalece la imagen corporativa de tu empresa, incorporando información de contacto, logotipo y enlaces relevantes.", includes: ["Firma en HTML lista para instalar", "Guía básica de instalación"], price: "RD$1,500", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye una firma funcional en formato HTML lista para su instalación en los principales clientes de correo electrónico." }
  ],
  "Servicios Complementarios": [
    { name: "Vectorización Profesional", description: "Convierte imágenes de baja calidad, logotipos, ilustraciones o gráficos rasterizados en archivos vectoriales escalables, ideales para impresión profesional y uso digital sin pérdida de calidad.", includes: ["Archivo AI", "Archivo EPS", "Archivo SVG", "Archivo PDF"], price: "RD$2,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye el archivo completamente vectorizado y listo para utilizarse en cualquier tamaño sin pérdida de calidad." },
    { name: "Eliminación de Fondo", description: "Eliminamos el fondo de tus imágenes con precisión profesional para que puedan utilizarse en tiendas online, catálogos, publicidad, redes sociales o cualquier otro proyecto gráfico.", includes: ["Imagen PNG (Fondo transparente)", "Imagen JPG (Fondo blanco, cuando aplique)"], price: "RD$500", time: "1 día laborable", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye las imágenes finales optimizadas para su uso. No contempla retoques fotográficos avanzados." },
    { name: "Retoque Fotográfico", description: "Realizamos retoques profesionales para mejorar la apariencia de tus fotografías, corrigiendo color, iluminación, imperfecciones y otros detalles para obtener un resultado de alta calidad.", includes: ["Imagen JPG de alta resolución", "Imagen PNG (cuando aplique)"], price: "RD$1,500", time: "1–2 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye las imágenes finales retocadas. Los archivos editables podrán cotizarse por separado si el cliente los requiere." },
    { name: "Mockup Profesional", description: "Presenta tus diseños de manera realista mediante mockups profesionales para productos, papelería, empaques, publicidad o identidad corporativa, facilitando la visualización del resultado final.", includes: ["Hasta 5 mockups en JPG de alta resolución"], price: "RD$3,000", time: "2–3 días laborables", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio incluye imágenes finales de presentación. Los archivos fuente de los mockups utilizados no forman parte de la entrega." },
    { name: "Asesoría de Diseño Gráfico", description: "Sesión personalizada de asesoría para resolver dudas sobre identidad visual, impresión, diseño, materiales gráficos o cualquier aspecto relacionado con el desarrollo de tu proyecto creativo.", includes: ["Sesión de asesoría personalizada", "Resumen en PDF con recomendaciones", "Plan de acción (cuando aplique)"], price: "RD$3,500", time: "Según disponibilidad", mode: "🤖 Pago Automatizado", advance: "100%", note: "Este servicio corresponde a una consultoría profesional y no incluye el desarrollo de piezas gráficas, salvo que se acuerde como parte de un proyecto independiente." }
  ]
};

export default function CotizacionPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nu_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'dark';
  });

  const { currentLang, changeLanguage } = useLanguage();
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
  
  // ESTADOS DE TÉRMINOS, PAGO, CAPTCHA Y CONTRATO
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'acuerdo'>('online');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // ESTADOS Y CANVAS PARA LA FIRMA DIGITAL
  const [signatureData, setSignatureData] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sigPadRef = useRef<any>(null);

  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('nu_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
  };

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

  const handleClientLookup = async (val: string) => {
    setIdentifier(val);
    if (val.length > 2) {
      const searchKey = val.toLowerCase().trim();

      try {
        if (supabase) {
          const { data } = await supabase
            .from('clients')
            .select('*')
            .or(`phone.ilike.%${searchKey}%,email.ilike.%${searchKey}%,company_name.ilike.%${searchKey}%`)
            .limit(1);

          if (data && data.length > 0) {
            const client = data[0];
            setCompanyName(client.company_name || '');
            setContactName(client.contact_name || '');
            setSelectedCountry(client.country || allowedCountries[0].name);
            setSelectedCity(client.city || allowedCountries[0].cities[0]);
            setCountryCode(client.country_code || allowedCountries[0].code);
            setContactPhone(client.phone || '');
            setContactEmail(client.email || '');
            setIsLocked(true);
            return;
          }
        }
      } catch (err) {
        console.warn("Búsqueda en Supabase no disponible, usando respaldo local.", err);
      }

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

  const clearSignature = () => {
    sigPadRef.current?.clear();
    setSignatureData(null);
  };

  const saveSignatureAndAccept = () => {
    if (sigPadRef.current?.isEmpty()) {
      alert('Por favor dibuja tu firma en el recuadro antes de aceptar.');
      return;
    }
    const dataUrl = sigPadRef.current?.getTrimmedCanvas().toDataURL('image/png');
    setSignatureData(dataUrl || null);
    setShowTermsModal(false);
    setAcceptedTerms(true);
  };

  const currentSubServiceDetails = selectedMainService && selectedSubService
    ? masterCatalog[selectedMainService]?.find(item => item.name === selectedSubService)
    : null;

  const isPriceFixed = currentSubServiceDetails && currentSubServiceDetails.mode.includes('Pago Automatizado');

  const getAmountUSD = () => {
    if (!currentSubServiceDetails) return "10.00";
    const rawNumber = Number(currentSubServiceDetails.price.replace(/[^0-9]/g, '')) || 600;
    const usd = (rawNumber / 60).toFixed(2);
    return usd;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert('Por favor, completa la verificación de seguridad anti-bots.');
      return;
    }
    if (!acceptedTerms) {
      alert('Debes leer, aceptar y firmar los Términos y Condiciones para continuar.');
      return;
    }
    
    if (clientType === 'nuevo' && (contactPhone || companyName)) {
      const clientData = { companyName, contactName, country: selectedCountry, city: selectedCity, code: countryCode, phone: contactPhone, email: contactEmail };
      if (contactPhone) localStorage.setItem(`client_${contactPhone}`, JSON.stringify(clientData));
      if (contactEmail) localStorage.setItem(`client_${contactEmail}`, JSON.stringify(clientData));
      if (companyName) localStorage.setItem(`client_${companyName.toLowerCase()}`, JSON.stringify(clientData));

      try {
        if (supabase) {
          await supabase.from('clients').upsert({
            company_name: companyName,
            contact_name: contactName,
            country: selectedCountry,
            city: selectedCity,
            country_code: countryCode,
            phone: contactPhone,
            email: contactEmail
          }, { onConflict: 'phone' });
        }
      } catch (err) {
        console.warn("No se pudo sincronizar en Supabase", err);
      }
    }

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
          paymentMethod,
          turnstileToken,
          signatureData
        })
      });

      const result = await response.json();

      if (result.success) {
        if (result.channel === 'whatsapp' && result.redirectUrl) {
          window.open(result.redirectUrl, '_blank');
        }
        setIsSubmitted(true);
      } else {
        alert(result.message || 'Hubo un error al procesar la cotización. Inténtalo de nuevo.');
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
    setTurnstileToken(null);
    setSignatureData(null);
  };

  const categoriesWithPhysical = ["Papelería Corporativa", "Gran Formato", "Packaging y Etiquetas", "Merchandising y Eventos"];
  const showPhysicalSampleOption = categoriesWithPhysical.includes(selectedMainService);

  return (
    <PayPalScriptProvider options={{ clientId: "BAAMMXgMLVZhRv9LQ9cbG8OLQ_oFU2oGG2uqJLKyg0A-RQzZswqLZGPhx6iafe8N0upkynATd3Yc4zs348", currency: "USD" }}>
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
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center space-x-1 focus:outline-none cursor-pointer ${
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
                    <button type="button" onClick={() => { changeLanguage('ES'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currentLang === 'ES' ? 'text-red-500 font-bold bg-white/5' : 'hover:bg-red-500/10'}`}>Español (ES)</button>
                    <button type="button" onClick={() => { changeLanguage('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currentLang === 'EN' ? 'text-red-500 font-bold bg-white/5' : 'hover:bg-red-500/10'}`}>English (EN)</button>
                    <button type="button" onClick={() => { changeLanguage('FR'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currentLang === 'FR' ? 'text-red-500 font-bold bg-white/5' : 'hover:bg-red-500/10'}`}>Français (FR)</button>
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

            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden text-xl p-2 focus:outline-none opacity-80 hover:opacity-100 z-50 text-white cursor-pointer"
              aria-label="Abrir Menú"
            >
              ☰
            </button>
          </div>
        </motion.header>

        {/* MENÚ MÓVIL DESPLEGABLE */}
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
                  <span>{t.inicio}</span>
                  <span>→</span>
                </Link>
                <Link href="/portafolio" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                  <span>{t.portafolio}</span>
                  <span>→</span>
                </Link>
                <Link href="/contratar" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                  <span>{t.contratar}</span>
                  <span>→</span>
                </Link>
                <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                  <span>{t.contacto}</span>
                  <span>→</span>
                </Link>
                <Link href="/utilidades" onClick={() => setIsMobileMenuOpen(false)} className="opacity-80 hover:opacity-100 border-b border-zinc-500/20 pb-3 flex justify-between items-center">
                  <span>{t.utilidades}</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="flex flex-col space-y-4 pt-6 border-t border-zinc-500/20">
                <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">Seleccionar Idioma</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => { changeLanguage('ES'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer ${currentLang === 'ES' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Español</button>
                  <button type="button" onClick={() => { changeLanguage('EN'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer ${currentLang === 'EN' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>English</button>
                  <button type="button" onClick={() => { changeLanguage('FR'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer ${currentLang === 'FR' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-500/30'}`}>Français</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theme Switcher */}
        <div className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ${
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'
        }`}>
          <button type="button" onClick={() => handleThemeChange('light')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-zinc-300 shadow-xl transition-transform hover:scale-110 focus:outline-none cursor-pointer" title="Modo Claro"></button>
          <button type="button" onClick={() => handleThemeChange('dark')} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl transition-transform hover:scale-110 focus:outline-none cursor-pointer" title="Modo Oscuro"></button>
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
                  <button type="button" onClick={() => { setClientType('nuevo'); resetForm(); }} className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${clientType === 'nuevo' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-70 hover:opacity-100'}`}>
                    {t.nuevoCliente}
                  </button>
                  <button type="button" onClick={() => setClientType('existente')} className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${clientType === 'existente' ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-70 hover:opacity-100'}`}>
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

                {/* TARJETA DETALLADA DE SERVICIO */}
                {currentSubServiceDetails && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border text-xs space-y-4 ${theme === 'dark' ? 'bg-black/50 border-red-500/30' : 'bg-white/60 border-red-500/20'}`}>
                    <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/10 pb-3">
                      <div>
                        <span className="font-semibold text-red-500 uppercase tracking-wider text-sm block">{currentSubServiceDetails.name}</span>
                        <span className="text-[10px] text-zinc-400 uppercase font-medium">{currentSubServiceDetails.mode}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-base text-emerald-400 block">{currentSubServiceDetails.price}</span>
                        <span className="text-[10px] opacity-70 block">Pago Inicial: <strong>{currentSubServiceDetails.advance}</strong></span>
                      </div>
                    </div>

                    <p className="opacity-80 font-light leading-relaxed text-xs">{currentSubServiceDetails.description}</p>

                    <div>
                      <span className="font-semibold block mb-1 opacity-90 uppercase text-[10px] tracking-wider text-red-400">Entregables Incluidos:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {currentSubServiceDetails.includes.map((inc, i) => (
                          <li key={i} className="flex items-center space-x-1.5 opacity-80">
                            <span className="text-emerald-400 font-bold">✔</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between text-[11px] opacity-70 gap-1">
                      <span><strong>Entrega estimada:</strong> {currentSubServiceDetails.time}</span>
                      <span><strong>Nota:</strong> {currentSubServiceDetails.note}</span>
                    </div>
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

              {/* 7. MODALIDAD DE PAGO Y ACUERDO (CON BOTONES DE PAYPAL) */}
              {selectedSubService && (
                <div className="space-y-4 border-t pt-6 border-white/10">
                  <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">Método de Procesamiento y Pago</h3>
                  
                  {isPriceFixed ? (
                    <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-4">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                        🤖 Pago Automatizado Disponible (100% en Línea)
                      </span>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        Este servicio cuenta con una tarifa estandarizada. Puedes realizar tu pago de forma instantánea con **PayPal o Tarjeta de Crédito** o coordinar la orden por WhatsApp.
                      </p>
                      <div className="flex gap-4 pt-1">
                        <button type="button" onClick={() => setPaymentMethod('online')} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${paymentMethod === 'online' ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'border-white/20 opacity-70'}`}>
                          PayPal / Tarjeta de Crédito
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('acuerdo')} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${paymentMethod === 'acuerdo' ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'border-white/20 opacity-70'}`}>
                          Coordinar por WhatsApp
                        </button>
                      </div>

                      {paymentMethod === 'online' && (
                        <div className="pt-3 max-w-sm mx-auto">
                          <PayPalButtons
                            style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                  {
                                    description: `Servicio NU-Design: ${currentSubServiceDetails?.name}`,
                                    amount: {
                                      currency_code: "USD",
                                      value: getAmountUSD(),
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={async (data, actions) => {
                              if (actions.order) {
                                await actions.order.capture();
                                setIsSubmitted(true);
                              }
                            }}
                            onError={(err) => {
                              console.error("Error PayPal:", err);
                              alert("Ocurrió un contratiempo con PayPal. Por favor reintenta.");
                            }}
                          />
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 space-y-2">
                      <span className="text-xs font-semibold text-red-400 flex items-center gap-2">
                        📱 Contactar al Personal (Anticipo 50%)
                      </span>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        Este servicio requiere análisis estratégico de alcance. Al hacer tu solicitud, coordinaremos directamente por WhatsApp o correo para acordar los detalles y el pago del anticipo del 50%.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 8. VERIFICACIÓN ANTI-BOTS Y TÉRMINOS CON FIRMA */}
              <div className="space-y-4 border-t pt-6 border-white/10 flex flex-col items-center">
                
                {/* WIDGET CLOUDFLARE TURNSTILE */}
                <div className="my-2">
                  <Turnstile
                    siteKey="1x00000000000000000000AA" // Clave pública universal de prueba de Cloudflare Turnstile
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>

                <div className="flex items-start gap-3 w-full">
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
    <button type="button" onClick={() => setShowTermsModal(true)} className="text-red-500 font-semibold underline hover:text-red-400 cursor-pointer">
      Términos y Condiciones de Servicio
    </button>{' '}
    de NU-DESIGN y la política de entrega de archivos.
  </label>
</div>

                {signatureData && (
                  <p className="text-xs text-emerald-400 font-semibold self-start">
                    ✓ Firma digital registrada correctamente.
                  </p>
                )}
              </div>

              {/* Botón de Enviar (Sólo si es WhatsApp/Manual) */}
              {(!isPriceFixed || paymentMethod === 'acuerdo') && (
                <div className="pt-4 flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    type="submit" 
                    className="w-full md:w-auto px-12 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t.botonEnviar}
                  </motion.button>
                </div>
              )}

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
              <button type="button" onClick={resetForm} className="mt-4 px-8 py-3 bg-red-600 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-red-700 transition-colors cursor-pointer">
                {t.otraCotizacion}
              </button>
            </motion.div>
          )}

        </main>

        {/* MODAL DE TÉRMINOS Y CONTRATO CON FIRMA DIGITAL */}
        <AnimatePresence>
          {showTermsModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 rounded-3xl border shadow-2xl space-y-6 ${theme === 'dark' ? 'bg-zinc-950 border-white/20 text-zinc-200' : 'bg-white border-zinc-300 text-zinc-800'}`}>
                <div className="flex justify-between items-center border-b border-white/10 pb-4 sticky top-0 bg-zinc-950/90 backdrop-blur-md z-10 pt-2">
                  <div>
                    <h3 className="text-lg font-bold text-red-500 uppercase tracking-wide">TÉRMINOS, CONDICIONES Y CONTRATO • NU-DESIGN</h3>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Última actualización: Agosto de 2026</span>
                  </div>
                  <button type="button" onClick={() => setShowTermsModal(false)} className="text-2xl opacity-60 hover:opacity-100 cursor-pointer">&times;</button>
                </div>

                <div className="text-xs space-y-5 font-light leading-relaxed opacity-90 pr-2">
                  <section>
                    <h4 className="font-semibold text-red-400 uppercase tracking-wider mb-1">1. Introducción</h4>
                    <p>Bienvenido a NU-DESIGN. El presente documento establece los Términos y Condiciones que regulan la contratación de los servicios ofrecidos por Garic Edume, diseñador gráfico profesional, diseñador web y desarrollador junior, quien presta sus servicios como freelancer independiente bajo la marca comercial NU-DESIGN.</p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-red-400 uppercase tracking-wider mb-1">2. Objeto del Servicio</h4>
                    <p>NU-DESIGN ofrece servicios profesionales relacionados con el diseño gráfico, diseño web, branding y desarrollo digital.</p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-red-400 uppercase tracking-wider mb-1">3. Propiedad Intelectual y Pagos</h4>
                    <p>Los archivos finales se entregarán una vez liquidado el pago total del proyecto. Los pagos o anticipos no son reembolsables una vez iniciado el proceso de diseño activo.</p>
                  </section>

                  {/* LIENZO DE FIRMA DIGITAL INTEGRADOR */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <label className="text-xs uppercase font-semibold text-red-400 tracking-wider">
                        Plasma tu Firma Digital (Dedo en Pantalla o Mouse):
                      </label>
                      <button type="button" onClick={clearSignature} className="text-[10px] text-zinc-400 underline hover:text-red-400 cursor-pointer">
                        Limpiar Firma
                      </button>
                    </div>

                    <div className="border border-red-500/40 rounded-xl bg-zinc-900 overflow-hidden">
                      <SignatureCanvas
                        ref={sigPadRef}
                        penColor="#ef4444"
                        canvasProps={{ className: 'w-full h-32 cursor-crosshair' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end sticky bottom-0 bg-zinc-950/90 backdrop-blur-md pb-2">
                  <button type="button" onClick={saveSignatureAndAccept} className="px-8 py-3 bg-red-600 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-red-700 cursor-pointer shadow-xl">
                    Guardar Firma y Aceptar Todo
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Unificado Completo */}
        <Footer />

      </div>
    </PayPalScriptProvider>
  );
}