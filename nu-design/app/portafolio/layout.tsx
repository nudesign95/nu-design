import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portafolio de Diseño & Branding | NU-Design Agency',
  description: 'Explora nuestros casos de estudio de alta gama: identidades corporativas, empaques de lujo, diseño editorial y dirección de arte por Garic Edume.',
  openGraph: {
    title: 'Portafolio & Casos de Estudio | NU-Design',
    description: 'Proyectos visuales que definen estándares. Branding, packaging y diseño editorial de alta gama.',
    url: 'https://nudesign.agency/portafolio',
    siteName: 'NU-Design Agency',
    images: [
      {
        url: 'https://nudesign.agency/og-portafolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Portafolio de Diseño Gráfico NU-Design - Garic Edume',
      },
    ],
    locale: 'es_DO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portafolio de Diseño & Branding | NU-Design',
    description: 'Casos de estudio visuales de alta gama por Garic Edume.',
    images: ['https://nudesign.agency/og-portafolio.jpg'],
  },
};

export default function PortafolioPage() {
  return (
    <div>
      {/* Tu contenido del portafolio */}
    </div>
  );
}