import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://nudesign.agency'),
  title: {
    default: 'NU-DESIGN | Agencia de Diseño Gráfico & Branding de Alta Gama',
    template: '%s | NU-DESIGN Agency'
  },
  description: 'Estudio de diseño estratégico, identidad corporativa, packaging de lujo y producción gráfica por Garic Edume. Cotiza al instante.',
  keywords: [
    'Diseño Gráfico República Dominicana',
    'Branding de Lujo',
    'Identidad Corporativa',
    'Packaging Personalizado',
    'Diseño Editorial',
    'Garic Edume',
    'Agencia de Diseño'
  ],
  authors: [{ name: 'Garic Edume', url: 'https://nudesign.agency' }],
  creator: 'Garic Edume',
  publisher: 'NU-DESIGN Agency',
  alternates: {
    canonical: 'https://nudesign.agency',
  },
  openGraph: {
    title: 'NU-DESIGN | Agencia de Diseño Gráfico & Branding de Alta Gama',
    description: 'Especialistas en branding, identidad visual y producción gráfica a medida. Propuesta y cotización automatizada al instante.',
    url: 'https://nudesign.agency',
    siteName: 'NU-DESIGN Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NU-DESIGN Agency - Garic Edume',
      },
    ],
    locale: 'es_DO',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nudesign.agency/#organization',
        name: 'NU-DESIGN Agency',
        url: 'https://nudesign.agency',
        logo: 'https://nudesign.agency/icon-dark.svg',
        sameAs: [
          'https://www.instagram.com/nudesign.agency02',
          'https://www.facebook.com/share/18szd7DaVA/',
          'https://x.com/nudesign_02',
          'https://youtube.com/@anousleshow1680'
        ],
        founder: {
          '@type': 'Person',
          name: 'Garic Edume'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://nudesign.agency/#website',
        url: 'https://nudesign.agency',
        name: 'NU-DESIGN',
        publisher: {
          '@id': 'https://nudesign.agency/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://nudesign.agency/portafolio?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://nudesign.agency/#sitelinks',
        name: 'Navegación Principal NU-DESIGN',
        itemListElement: [
          {
            '@type': 'SiteNavigationElement',
            position: 1,
            name: 'Portafolio & Casos de Estudio',
            description: 'Explora proyectos visuales, branding y empaques de alta gama.',
            url: 'https://nudesign.agency/portafolio'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 2,
            name: 'Solicitar Cotización',
            description: 'Calcula y solicita la propuesta automatizada para tu proyecto.',
            url: 'https://nudesign.agency/cotizacion'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 3,
            name: 'Servicios & Contratación',
            description: 'Modelos de colaboración, branding y dirección de arte exclusiva.',
            url: 'https://nudesign.agency/contratar'
          },
          {
            '@type': 'SiteNavigationElement',
            position: 4,
            name: 'Contacto Directo',
            description: 'Escríbenos directamente o conecta con Garic Edume.',
            url: 'https://nudesign.agency/contacto'
          }
        ]
      }
    ]
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/* Google Analytics con tu ID real */}
        <GoogleAnalytics gaId="G-29J66PT6PQ" />
      </body>
    </html>
  );
}