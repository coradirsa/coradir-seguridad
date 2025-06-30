"use client"
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
export default function AntipanicButtonSection({lineBottomRef}: {lineBottomRef: React.RefObject<HTMLDivElement | null>}) {
    const lineRef = useRef(null);
    const folletoRef = useRef(null);
    const folletoIsInView = useInView(folletoRef, { amount: 0.5, once: false });
    const isInView = useInView(lineRef, { amount: 0.5, once: true});
    const isInViewBottom = useInView(lineBottomRef, { amount: 0.5, once: true });
    return (
        <section  className="flex flex-col justify-start items-start xl:flex-row-reverse bg-white w-[70%] xl:w-[90%] xl:px-20 container mx-auto pb-10 gap-5">  
            <div className="z-10 relative w-full flex flex-col items-start gap-5 xl:w-[70%]">
                <h2 className="text-2xl font-bold text-red text-left xl:text-5xl">BOTONES<br/> ANTIPÁNICO</h2>  
                <motion.div 
                id="alarma-personal"
                  ref={lineRef} 
                  className="block border-r-4 border-b-4 xl:border-b-8 xl:border-r-8 border-red  absolute -top-20 md:-top-22 xl:-top-25 right-9 sm:right-5 md:right-1/5 xl:right-1/6 max-w-30 sm:!max-w-[20em] max-h-[6em] sm:max-h-[7em] md:!max-w-[20em] xl:max-h-[8em] xl:max-w-[20em]" 
                  initial={{ width: 0, height: 0 }}
                  animate={isInView ? { width: "35em", height: "25em" } : { width: 0, height: 0 }}
                  transition={{  
                    ease: "easeOut", 
                    width: { duration: 1.5  , delay: 1   }, 
                    height: { duration: 1, delay: 0 }, 
                    
                  }}
                />
                <p className="text-lg text-left text-black xl:text-3xl">
                    Más de 43.000 personas ya cuentan con la protección de
                    nuestros botones ante emergencias de violencia.<br/><br/>
                    Proveemos una herramienta de <b>contención, cuidado y prevención.</b>
                </p> 
                <motion.div 
                initial={{ scale: 1 }}
                animate={folletoIsInView ? { scale: 1.1   } : { scale: 1  }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }} 
                className="w-[50%] mx-auto xl:block  hidden"
            > 
                <a id="boton-seguridad-desktop-descarga-folleto" download href="/Boton-antipanico-folleto.pdf" ref={folletoRef} className="flex items-center justify-center gap-2 text-red font-bold w-full py-1 text-2xl border-1 border-red-light rounded-3xl my-10 hover:scale-105 transition-all duration-300">
                    FOLLETO 
                    <Image 
                        src="/icons/i_01.png" 
                        alt="Icono de folleto" 
                        width={1000} 
                        height={1000}
                        className="w-12 h-12"
                    />
                </a>
            </motion.div>
            </div>
            <div  
                className="relative w-fit xl:w-[50%] mx-auto"
            > 
                <Image  
                    src="/img/mendozav.png" 
                    alt="Imagen del boton de seguridad" 
                    width={1000} 
                    height={1000} 
                    className="relative w-50 h-80 object-contain xl:object-contain xl:object-top z-20 xl:w-full xl:h-[30em]"
                />
                <span  className="z-10 block  rounded-bl-3xl bg-red-light w-50 h-76 xl:h-full xl:w-[60%] xl:-bottom-8 absolute bottom-0 xl:left-10 -left-5"></span>
                {/* Mobile */}
                <motion.div 
                    className="origin-bottom-left border-l-4 border-t-4 sm:!max-left-[5em]  !max-w-[10em] !max-h-[4em] sm:-ml-20 md:-ml-40 md:!max-w-[20em] border-red absolute top-[90%] left-0 xl:hidden"
                    initial={{ width:0, height:0 ,left:"0" }}
                    animate={isInViewBottom ? { width:"70em", height:"30em", left: "-20%" } : {}}
                    transition={{   
                        ease: "easeOut", 
                        height: { duration: .6 , delay: .7 }, 
                        width: { duration:  .4, delay:0 },   
                        left: { duration:  .4, delay:0 },       
                    }}
                />
                {/* Desktop */}
                <motion.div
                className="origin-top border-l-8 border-b-8 border-red absolute -bottom-10 left-1/4 hidden xl:block 2xl:max-w-[8em]"
                initial={{ width: 0, height: 0, y: 0 }}
                animate={
                    isInViewBottom
                    ? { width: "10em", height: "10em", y: "8em" }
                    : { width: 0, height: 0, y: 0 }
                }
                transition={{
                    ease: "easeOut",
                    width: { duration: .6 , delay: 1 }, 
                    height: { duration:  .4, delay:0 },   
                    y: { duration: 1, delay: isInViewBottom ? 0 : 1 },
                }}
                />
            </div>
            
        </section>
    )
}