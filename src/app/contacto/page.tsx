import ReCaptcha from "./components/reCaptcha";
import { contactMetadata, contactPageSchema } from "@/config/metadata";
import Script from "next/script";

export const metadata = contactMetadata;

export default function Page() {
    return (
        <>
            {/* JSON-LD Schema para la página de contacto */}
            <Script
                id="contact-page-schema"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(contactPageSchema)
                }}
            />
            <ReCaptcha />
        </>
    );
}