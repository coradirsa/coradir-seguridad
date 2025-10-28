import { Metadata } from 'next';

// URL base del sitio (actualizar en producción)
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coradirseguridad.com';

// Información de la empresa
export const siteConfig = {
  name: 'Coradir Seguridad',
  description: 'Sistemas de seguridad inteligente con botones antipánico para comunidades, countries y barrios cerrados en Argentina. Respuesta inmediata 24/7 ante emergencias.',
  keywords: [
    'seguridad inteligente',
    'botón antipánico',
    'sistemas de seguridad',
    'seguridad para countries',
    'seguridad barrios privados',
    'monitoreo 24/7',
    'respuesta inmediata emergencias',
    'seguridad Argentina',
    'Coradir',
    'protección comunitaria',
    'alarmas comunitarias',
    'seguridad residencial'
  ],
  author: 'Coradir Seguridad',
  locale: 'es_AR',
  location: {
    country: 'Argentina',
    region: 'Buenos Aires',
    city: 'Capital Federal'
  },
  social: {
    instagram: 'https://www.instagram.com/coradir.ok/',
    facebook: 'https://www.facebook.com/profile.php?id=100095270446577',
    whatsapp: '+5491165064657'
  },
  contact: {
    email: 'info@coradirseguridad.com',
    phone: '+54 11 6506-4657',
    whatsapp: '+5491165064657'
  }
};

// Metadata base para todo el sitio
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/img/hero.jpg',
        width: 1920,
        height: 1080,
        alt: 'Coradir Seguridad - Sistemas de seguridad inteligente',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/img/hero.jpg'],
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
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Agregar cuando tengas los códigos de verificación
    // google: 'código-de-google-search-console',
    // yandex: 'código-de-yandex',
    // bing: 'código-de-bing',
  },
};

// Metadata para la página principal
export const homeMetadata: Metadata = {
  title: 'Inicio',
  description: 'Coradir Seguridad: Sistemas de seguridad inteligente con botones antipánico para comunidades. Protección 24/7 con respuesta inmediata ante emergencias en Argentina.',
  openGraph: {
    title: 'Coradir Seguridad - Protección Inteligente 24/7',
    description: 'Sistemas de seguridad con botones antipánico para countries y barrios privados. Respuesta inmediata ante emergencias.',
    url: siteUrl,
    images: [
      {
        url: '/img/hero.jpg',
        width: 1920,
        height: 1080,
        alt: 'Coradir Seguridad - Sistema de seguridad inteligente para comunidades',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coradir Seguridad - Protección Inteligente 24/7',
    description: 'Sistemas de seguridad con botones antipánico para countries y barrios privados.',
    images: ['/img/hero.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Metadata para la página de contacto
export const contactMetadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para conocer nuestros sistemas de seguridad inteligente. Asesoramiento personalizado para tu comunidad, country o barrio privado. Respuesta en 24hs.',
  keywords: [
    ...siteConfig.keywords,
    'contacto Coradir',
    'cotización seguridad',
    'asesoramiento seguridad',
    'presupuesto botón antipánico'
  ],
  openGraph: {
    title: 'Contacto - Coradir Seguridad',
    description: 'Solicitá información sobre nuestros sistemas de seguridad. Asesoramiento personalizado para tu comunidad.',
    url: `${siteUrl}/contacto`,
    images: [
      {
        url: '/img/02/02-desktop.webp',
        width: 1920,
        height: 1080,
        alt: 'Formulario de contacto - Coradir Seguridad',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - Coradir Seguridad',
    description: 'Solicitá información sobre nuestros sistemas de seguridad.',
    images: ['/img/02/02-desktop.webp'],
  },
  alternates: {
    canonical: `${siteUrl}/contacto`,
  },
};

// JSON-LD Schema para LocalBusiness
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteUrl,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteUrl,
  logo: `${siteUrl}/icons/apple-touch-icon.png`,
  image: `${siteUrl}/img/hero.jpg`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressCountry: siteConfig.location.country,
    addressRegion: siteConfig.location.region,
    addressLocality: siteConfig.location.city,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.6037,
    longitude: -58.3816,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// JSON-LD Schema para el producto (Botón Antipánico)
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Sistema de Botón Antipánico Coradir',
  description: 'Sistema de seguridad inteligente con botón antipánico para respuesta inmediata ante emergencias en comunidades y barrios privados.',
  image: `${siteUrl}/img/boton-seguridad/boton-seguridad-desktop.webp`,
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'ARS',
    availability: 'https://schema.org/InStock',
    url: siteUrl,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '89',
  },
};

// JSON-LD Schema para la página de contacto
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${siteUrl}/contacto`,
  name: 'Contacto - Coradir Seguridad',
  description: 'Página de contacto para consultas sobre sistemas de seguridad inteligente',
  mainEntity: {
    '@type': 'Organization',
    name: siteConfig.name,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'customer service',
      areaServed: 'AR',
      availableLanguage: 'Spanish',
    },
  },
};
