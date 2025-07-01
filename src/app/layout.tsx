/* eslint-disable @next/next/next-script-for-ga */
import Header from "./componentes/header.tsx/header";
import "./globals.css"; 
import Footer from "./componentes/footer/footer";  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <head>
      <script async dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s)  ,dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WPC2GBF9');` }} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-K747C6S23H"></script> 
      <script async dangerouslySetInnerHTML={{ __html: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-K747C6S23H')`}} />
    </head>
    <body className="font-dm scroll-smooth"> 
      <noscript  dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPC2GBF9" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} /> 
      <Header />
      {children}
      <Footer />
    </body>
  </html>
  );
} 
