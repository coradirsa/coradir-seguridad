"use client"
import { motion } from "framer-motion"; 
import { useRef } from "react";
import { useInView } from "framer-motion";
export default function HeroSection() { 
    const bannerRef = useRef(null); 
    const isInView = useInView(bannerRef, { amount: 0.5, once: false });
    return (
        <section className="flex flex-col justify-start items-center bg-white">
            < div
                className="w-full h-[50vh] md:h-[80vh] xl:h-[100vh] flex flex-col items-end  justify-end overflow-hidden"
                style={{
                    backgroundImage: "url('/img/hero.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }} 
            >
                <motion.h1 
                ref={bannerRef}
                    className="bg-red/30 rounded-bl-3xl text-4xl xl:text-6xl font-bold pl-5   md:pl-20 xl:py-10 py-2 xl:leading-17 w-[90%]  text-left text-white"
                    initial={{ opacity: 0, x: "50%" }}
                    animate={isInView ? { opacity: 1, x: "0%" } : { opacity: 0, x: "50%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >PROTECCIÓN <br className="xl:hidden"/> INTEGRAL<br className="hidden xl:block"/> PARA <br className="xl:hidden"/> COMUNIDADES <br /> MÁS SEGURAS</motion.h1>
                <p className=" p-3 terxt-lg bg-red text-white text-left rounded-tr-2xl  rounded-bl-2xl w-[40%] md:block hidden text-xl xl:text-4xl xl:px-20 xl:w-[60%] xl:mr-[25%] xl:p-12">
                  Cuidamos tu tranquilidad, la de quienes te rodean y nos adaptamos a tus necesidades
                </p>
            </div> 
           <p className=" p-3 terxt-lg bg-red text-white text-center rounded-tr-2xl container rounded-bl-2xl w-[80%] md:w-[40%] md:hidden ">
           Cuidamos tu tranquilidad, la de quienes te rodean y nos adaptamos a tus necesidades
           </p>
        </section>
    )
}