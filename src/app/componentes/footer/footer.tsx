"use client"
import Link from "next/link"
import { ourSites, products, socialMedia } from "../header.tsx/components/menuMobile"
import Image from "next/image"

export default function Footer() { 
    if(!ourSites || !products || !socialMedia){
        return null;
    }
    return (
        <footer className="flex flex-col items-start justify-start  w-full mx-auto bg-red p-10 text-white">
            <section className="flex flex-col xl:flex-row w-full items-start justify-center xl:justify-between xl:px-30">
                <div className="flex flex-col items-start justify-start gap-1">
                    <h4  className="text-xl w-full text-left font-bold xl:text-4xl" > Nuestros sitios   </h4>
                    {
                    ourSites.map((site, index) => ( 
                            <a target="_blank" href={site.href} key={`site-${index}`} className="p-2 text-lg xl:text-2xl text-left" aria-label={site.ariaLabel}>{site.label}</a>
                        ))
                    } 
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                    <h4  className=" text-xl w-full text-left mt-5 xl:mt-0 font-bold xl:text-4xl" > Productos   </h4>                  
                    {
                        products.map((product, index) => (
                            <Link href={product.href} key={`product-${index}`} className="p-2 text-xl xl:text-2xl text-left flex items-center justify-between cursor-pointer" aria-label={product.ariaLabel}>{product.label}</Link>
                        ))
                    }  
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                    <h3 className="text-xl font-bold mt-5 xl:text-4xl">Empresa </h3>
                    <Link href="/contacto" className="text-lg xl:text-2xl p-2" aria-label="Contacto">Contacto</Link>
                    <Link href="/#" className="text-lg xl:text-2xl p-2" aria-label="Sobre nosotros">Sobre nosotros</Link>
                    <span className="flex items-center justify-start md:justify-start gap-3 p-2  text-white mt-4">
                        {
                            socialMedia.map((social, index) => (
                                <a href={social.href} target="_blank" key={`social-${index}`} className="hover:shadow-[0_1px_5px_rgba(255,255,255,0.3)]">
                                    <Image       
                                        loading="lazy"
                                        aria-label={social.ariaLabel}
                                        src={social.img}
                                        alt={social.alt}
                                        width={600}
                                        height={600}
                                        className="w-6 h-6 xl:w-10 xl:h-10"
                                    />
                                </a>
                            ))
                        }
                    </span> 
                </div>
            </section>
            <div className="flex flex-col items-center justify-center w-full">
                <hr className="w-full h-[1px] bg-white my-5" />
                <p className="text-white text-xl uppercase w-full xl:text-4xl text-center mb-2"><b >Coradir S.A.</b>  </p>
                <p className="text-white text-xs xl:text-xl uppercase w-full text-center ">© Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}