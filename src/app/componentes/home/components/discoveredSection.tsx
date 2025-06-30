"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
export default function DiscoveredSection() {
    const linkRef = useRef(null);
    const titleRef = useRef(null);
    const isInView = useInView(linkRef, { amount: 0.5, once: false });
    const isTitleInView = useInView(titleRef, { amount: 0.5, once: false });
    return (
        <section className="flex flex-col justify-start items-start container bg-white w-[80%] xl:pt-20 mx-auto py-10 gap-5 overflow-hidden"> 
            <div className="">
                <h2 className="text-3xl font-black text-red text-left xl:text-5xl ">DESCUBRÍ</h2>  
                <motion.div
                    ref={titleRef}
                    initial={{ width: 0 }}
                    animate={isTitleInView ? { width: ["0","80%", "20%", "100%"], } : { width: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.8 }} 
                    className="h-1 bg-red xl:h-2"
                />
            </div>
            <div className="py-3 px-8 xl:px-16 xl:py-10 bg-red-light text-white rounded-tr-2xl rounded-bl-2xl">
                <h3 className="text-2xl xl:text-4xl  font-bold mb-5">Dispositivos de <br className="hidden xl:block"/>alarmas personales</h3>
                <p className="text-lg mb-8 md:w-[70%] xl:w-[58%] xl:text-xl"> Nuestro sistema de alarmas personales está diseñado para ofrecer una <b>respuesta
                    inmediata en situaciones de emergencia</b>, garantizando la seguridad de los ciudadanos
                    y facilitando la labor de las fuerzas de seguridad.
                </p>
            </div>
            <div className="relative z-20 flex justify-end items-end w-full -mt-20 md:-mt-[20%]  xl:-mt-[28%] xl:ml-40 xl:overflow-hidden xl:w-[90%]">
                <motion.div
                    ref={linkRef}
                    initial={{ scale: 1 }}
                    animate={isInView ? { scale: 1.1   } : { scale: 1  }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="z-10 absolute text-center top-10 left-5 md:left-1/12 xl:left-5 md:top-[30%] xl:top-78  py-2 bg-red text-white rounded-xl w-[60%] md:w-[40%] xl:w-[25%] text-xl xl:text-2xl cursor-pointer xl:font-bold hover:scale-102 transition-all duration-300"
                >
                    <Link id="boton-seguridad-home-1" href="/contacto">¡SABER MÁS!</Link>
                </motion.div>
                <Image 
                    src="/img/boton seguridad.png" 
                    alt="Imagen del boton de seguridad" 
                    width={1000} 
                    height={1000} 
                    className="w-60 h-70 object-cover object-[10%_50%]   md:w-[30em] md:h-[30em] xl:w-[40em] xl:h-[40em]"
                />
            </div>
           
        </section>
    )
}