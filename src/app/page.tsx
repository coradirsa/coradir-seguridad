import Home from "./componentes/home/home";
import { homeMetadata, productSchema } from "@/config/metadata";
import Script from "next/script";

export const metadata = homeMetadata;

export default function Page() {
  return (
    <>
      {/* JSON-LD Schema para el producto */}
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
      <Home />
    </>
  );
}
