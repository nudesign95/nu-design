import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador de Diseño Gráfico Automatizado | NU-Design',
  description: 'Obtén tu presupuesto de diseño gráfico, empaques, papelería e imprenta en segundos. Propuestas automáticas a tu WhatsApp o correo.',
  openGraph: {
    title: 'Calcula tu Presupuesto al Instante | NU-Design',
    description: 'Cotizaciones transparentes y personalizadas para branding, producción gráfica y desarrollo web.',
    url: 'https://nudesign.agency/cotizacion',
    siteName: 'NU-Design Agency',
    locale: 'es_DO',
    type: 'website',
  },
};

export default function CotizacionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}