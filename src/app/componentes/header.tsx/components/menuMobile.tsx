"use client"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";
import HrCustom from "./hrCustom";
export const socialMedia = [
    { href: "https://www.facebook.com/CoradirSA/", img:"/icons/facebook.png", ariaLabel:"Logo de Facebook", alt:"Logo de Facebook" },
    { href: "https://www.linkedin.com/company/502705", img:"/icons/linkedin.png", ariaLabel:"Logo de LinkedIn", alt:"Logo de LinkedIn" },
    { href: "#", img:"/icons/instagram.png", ariaLabel:"Logo de Instagram", alt:"Logo de Instagram" },
];
export const ourSites = [
    { href: "#", label:"CORADIR S.A", ariaLabel:"CORADIR S.A"  },
    { href: "#", label:"Energía renovable", ariaLabel:"Energía renovable"  },
    { href: "#", label:"Movilidad Eléctrica", ariaLabel:"Movilidad Eléctrica"  },
    { href: "#", label:"CORADIR Homes", ariaLabel:"CORADIR Homes"  },
    { href: "https://coradir.ai/", label:"IACOR", ariaLabel:"IACOR"  },
];
export const products = [
    { href: "/#alarma-personal", label:"Dispositivos de alarmas personales", ariaLabel:"Dispositivos de alarmas personales"  }, 
];
export default function MenuMobile({openMenu}: {openMenu: boolean}) { 
    useEffect(() => {
        document.body.style.overflow = openMenu ? 'hidden' : 'auto';
    }, [openMenu]);
    const [productMenu,setProductMenu] = useState(false);
    const [ourSitesMenu,setOurSitesMenu] = useState(false);
    const handleOpenMenu = (menu: string) => {
        if(menu === 'productMenu'){
            setOurSitesMenu(false);
            setTimeout(()=>setProductMenu(!productMenu), 300);
        }else if(menu === 'ourSitesMenu'){
            setProductMenu(false);
            setTimeout(()=>setOurSitesMenu(!ourSitesMenu), 300);
        }
    }
    return (
        <article
            className={`z-[200] fixed left-0 flex flex-col justify-center items-center pt-10 px-1 gap-2 bg-white w-full min-h-[100vh] transition-all duration-500 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-[100vw]'}`}
        >
            <Link href="/contacto" className={`px-5 py-2 bg-red text-white rounded-xl text-xl cursor-pointer  ${openMenu ? 'scale-100 translate-x-0' : 'scale-0 translate-x-[100vw]'}  delay-300 transition-all duration-300 ease-in-out`} aria-label="Comunicate con nosotros">Comunicate con nosotros</Link>
            <div className={`flex flex-col justify-start items-center w-[90%] delay-300 ease-in-out transition-all duration-300  h-[25em] ${openMenu ? 'scale-100 translate-x-0' : 'scale-0 translate-x-[100vw]'}`}>
                <h4 className=" p-2 text-xl text-red w-full text-left ">Nuestra empresa</h4>
                <HrCustom />
                <button 
                    className=" p-2 text-xl text-red w-full text-left flex items-center justify-between cursor-pointer" 
                    aria-label="Nuestros sitios" onClick={()=>handleOpenMenu('ourSitesMenu')}> 
                    Nuestros sitios 
                    <span className={"text-red-light text-5xl ease-in-out transition-all duration-300 " + (ourSitesMenu ? 'rotate-90' : '')}>
                        {">"}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${ourSitesMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {
                        ourSites.map((site, index) => ( 
                            <a href={site.href} target="_blank" key={`site-${index}`} className="p-2 text-xl text-black  text-left flex items-center justify-between cursor-pointer w-56" aria-label={site.ariaLabel}>{site.label}</a>
                        ))
                    }
                </div>
                <HrCustom />
                <button 
                    className=" p-2 text-xl text-red w-full text-left flex items-center justify-between cursor-pointer" 
                    aria-label="Productos" onClick={()=>handleOpenMenu('productMenu')}> 
                    Productos 
                    <span className={"text-red-light text-5xl ease-in-out transition-all duration-300 " + (productMenu ? 'rotate-90' : '')}>
                        {">"}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${productMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {
                        products.map((product, index) => (
                            <Link href={product.href} key={`product-${index}`} className="p-2 text-xl text-black  text-left flex items-center justify-between cursor-pointer w-56" aria-label={product.ariaLabel}>{product.label}</Link>
                        ))
                    }
                </div>
                <HrCustom />
            </div>
            <div className={`flex flex-col gap-5 bg-red text-white  w-full px-8 py-5 rounded-tr-[52px] rounded-bl-[52px] ${openMenu ? 'scale-100 translate-x-0' : 'scale-0 translate-x-[100vw]'}  delay-300 transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col ">
                    <h3 className="text-xl font-bold">Empresa </h3>
                    <Link href="/contacto" className="text-lg" aria-label="Contacto">Contacto</Link>
                    <Link href="/#" className="text-lg" aria-label="Sobre nosotros">Sobre nosotros</Link>
                    <span className="flex items-center justify-start md:justify-start gap-3 pl-2 text-white mt-4">
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
                                        className="w-6 h-6 xl:w-8 xl:h-8"
                                    />
                                </a>
                            ))
                        }
                    </span>
                    <span className="block h-1 bg-white w-[99%] rounded-2xl mx-auto  mt-5"></span>
                </div>
                <h3 className="text-white text-xl uppercase w-full text-center "><b >Coradir</b> <i className="text-white/80">Seguridad</i></h3>
            </div>
        </article>
    );
}