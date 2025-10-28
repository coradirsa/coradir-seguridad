import Header from "./componentes/header.tsx/header";
import "./globals.css";
import Footer from "./componentes/footer/footer";
import Script from "next/script";
import { baseMetadata, organizationSchema } from "@/config/metadata";
import ScrollTracker from "@/components/shared/ScrollTracker";

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <head>
      {/* Preconnect a dominios externos */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* JSON-LD Schema para SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s)  ,dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WPC2GBF9');` }} />

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K747C6S23H"
        strategy="afterInteractive"
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K747C6S23H');
          `
        }}
      />
    </head>
    <body className="font-dm scroll-smooth">
      <noscript  dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPC2GBF9" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />

      {/* Skip to main content - Accesibilidad */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Saltar al contenido principal
      </a>

      <ScrollTracker />
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </body>
  </html>
  );
} 
