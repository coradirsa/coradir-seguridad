"use client"
import Link from "next/link";
import { motion } from "framer-motion"
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion"
export default function SafeSection() {
    const titleRef = useRef(null);
    const linkRef = useRef(null);
    const isTitleInView = useInView(titleRef, { amount: 0.5, once: false });
    const isLinkInView = useInView(linkRef, { amount: 0.5, once: false });
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoDivRef = useRef(null);
    const isVideoInView = useInView(videoDivRef, { amount: 0.5, once: false });

    useEffect(() => {
        if (!videoRef.current) return;
        if (isVideoInView) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isVideoInView]);
    return (
        <section className="flex flex-col items-start justify-start max-w-[1800px]  mx-auto gap-5 pb-10">
            <div className="w-full  bg-red p-8 xl:px-30" ref={titleRef}>
                {/*Mobile*/}
                <motion.div
                    initial={{ width: "34%" }}
                    animate={isTitleInView ? { width: ["34%","100%"] } : {}}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                    className="overflow-hidden w-full h-9 xl:hidden  "
                >
                    <h2 className="text-4xl   text-white text-left w-[80vw] sm:w-[50vw] md:w-[45vw]">  <b >SOMOS </b>  <i>SEGURIDAD</i> </h2> 
                </motion.div>
                {/*Desktop*/}
                <motion.div
                    initial={{ width: "10%" }}
                    animate={isTitleInView ? { width: ["14%","40%"] } : {}}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                    className="overflow-hidden w-[20vw] hidden xl:block h-16"
                >
                    <h2 className="text-6xl text-white text-left w-[34vw] ">  <b >SOMOS </b>  <i>SEGURIDAD</i> </h2> 
                </motion.div>
                <motion.div
                    initial={{ width: 0 }}
                    animate={isTitleInView ? { width: ["34%", "80%", "33%"], } : {  }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                    className="h-1 bg-white"
                />

            </div>
            <section className="w-[70%] mx-auto flex flex-col items-center justify-center gap-5 xl:gap-16 text-xl xl:text-4xl py-8 xl:py-20">
                <p className="text-black text-left">
                    En <b>CORADIR S.A.</b> trabajamos desde hace más de 30 años desarrollando soluciones tecnológicas que fortalecen la seguridad ciudadana. 
                </p>
                <p className="text-black text-left">
                    Nuestra trayectoria nos posiciona como un referente confiable en el sector, con <b>más de 43.000 dispositivos de seguridad entregados</b> en planes estratégicos de protección urbana.
                </p>
                <p className="text-red text-left">
                    Cada dispositivo, cada solución implementada, es el resultado de un compromiso sostenido con la innovación, la calidad y la efectividad real en el territorio.
                </p>
                <p className="text-black font-bold text-left">
                    El centro de protección y monitoreo responde de forma inmediata ante cualquier emergencia, alertando al contacto o entidad adecuada según las necesidades de la persona afectada
                </p>
                
            </section>
            <section ref={videoDivRef} className="w-full gap-5 xl:w-[80%] mx-auto flex flex-col items-center justify-center ">
                <video
                    ref={videoRef}
                    loop
                    muted
                    src="/videos/seguridad.mp4"
                    className="w-full"
                    // No uses autoPlay para que no intente reproducirse antes de estar visible
                >
                    Tu navegador no soporta el video.
                </video>
                <motion.div
                    ref={linkRef}
                    initial={{ scale: 1 }}
                    animate={isLinkInView ? { scale: 1.2   } : { scale: 1  }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }} 
                    className="text-red font-bold relative text-center border-1 border-red-light w-[50%] xl:w-[30%] xl:text-3xl xl:my-10 rounded-3xl cursor-pointer py-3  hover:scale-102 transition-all duration-300"
                > 
                    <Link id="boton-seguridad-home-3" href="/contacto" >¡SABER MÁS!</Link>
                    </motion.div>
            </section>
            
        </section>
    )
}