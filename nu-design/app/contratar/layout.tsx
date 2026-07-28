import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contratar Servicios de Diseño Gráfico & Dirección Creativa | NU-Design',
  description: 'Modelos de colaboración flexibles para tu marca: proyectos a medida, producción gráfica continua y dirección de arte exclusiva.',
  openGraph: {
    title: 'Eleva tu Marca con NU-Design | Modelos de Contratación',
    description: 'Diseño de alto impacto sin fricción. Inicia tu proyecto de branding o producción gráfica con respuesta inmediata.',
    url: 'https://nudesign.agency/contratar',
    siteName: 'NU-Design Agency',
    images: [
      {
        url: 'https://nudesign.agency/mi%20foto.jpg',
        width: 1200,
        height: 630,
        alt: 'Garic Edume - Director Creativo NU-Design',
      },
    ],
    locale: 'es_DO',
    type: 'website',
  },
};

export default function ContratarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}