"use client"
import Link from "next/link";
import { ourSites, products } from "./menuMobile";
import { motion } from "framer-motion";
import { useState } from "react";
export default function MenuDesktop({isRedBg}: {isRedBg: boolean}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex items-start   justify-start gap-5  text-white  text-xl " onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="flex items-start gap-5">
                <div className="flex flex-col justify-start items-start gap-3  md:w-40  ">
                    <span className={`cursor-pointer  ${isRedBg ? 'border-b-1 border-white' : ''}`}>Sobre nosotros</span>
                    <motion.div 
                    initial={{ height: 0 , opacity: 0 ,display: 'none'}}
                    animate={isOpen ? { height: 'auto',opacity: 1 ,display: 'flex'} : {  }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex flex-col items-start gap-2 w-40"
                    >
                        {
                            ourSites.map((site, index) => ( 
                                <a target="_blank" href={site.href} key={`site-${index}`} className="cursor-pointer md:text-[16px] xl:text-[18px] h-8 hover:border-b-1 hover:border-white" aria-label={site.ariaLabel}>{site.label}</a>
                            ))
                        }
                    </motion.div>
                </div>
                <div className="flex flex-col justify-start items-start gap-3 md:w-40">
                    <span className={`cursor-pointer  ${isRedBg ? 'border-b-1 border-white' : ''}`}>Productos</span>
                    <motion.div 
                    initial={{ height: 0 , opacity: 0 ,display: 'none'}}
                    animate={isOpen ? { height: 'auto',opacity: 1 ,display: 'flex'} : {  }}
                    className="flex flex-col items-start gap-2  w-44"
                    >
                        {
                            products.map((site, index) => ( 
                                <Link href={site.href} key={`site-${index}`} className="cursor-pointer text-[18px] hover:border-b-1 hover:border-white" aria-label={site.ariaLabel}>{site.label}</Link>
                            ))
                        }
                    </motion.div>
                </div> 
            </div>
            <Link 
                href="/contacto" 
                className="px-3 py-2 xl:-mt-2 text-center bg-red min-w-62 xl:min-w-70 xl:-mr-1 h-12 md:text-lg xl:text-xl rounded-xl cursor-pointer border-1 border-white/40 hover:border-white transition-all duration-300 ease-in-out" 
                aria-label="Comunicate con nosotros"
            >Comunicate con nosotros</Link>
        </div>
    );
}