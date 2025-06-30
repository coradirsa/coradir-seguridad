"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MenuMobile from "./components/menuMobile";  
import { useMediaQuery } from "@/hooks/useMediaQury";
import Link from "next/link";
import MenuDesktop from "./components/menuDesktop";
export default function Header() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isRedBg, setIsRedBg] = useState(false); 
    useEffect(() => {
        if(pathname === "/contacto") return;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 10);
            if (currentScrollY > lastScrollY && currentScrollY > 60) {
                setShow(false); // Scrolling down
            } else {
                setShow(true); // Scrolling up
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY,pathname]);  
    useEffect(()=>{
        setOpenMenu(false);
    },[pathname]);  
    useEffect(() => { 
        if (pathname === "/contacto") {
            setIsRedBg(true);
            setShow(true)
        } else if (isMobile) {
            setIsRedBg(openMenu);
        } else {
            setIsRedBg(false);
        }   
    }, [openMenu, isMobile, pathname]);
    return (
        <>
            <header
            className={`fixed top-0 left-0 p-4 w-full z-[9999]  xl:left-1/2 xl:-translate-x-1/2 transition-all duration-500
                ${show ? 'translate-y-0' : '-translate-y-full'}
                ${isRedBg  ? 'bg-red xl:bg-red/50' : ( scrolled ? 'backdrop-blur-md bg-black/20' : `bg-transparent xl:bg-red/50`)}
            `}
            onMouseEnter={!isMobile ? () => setIsRedBg(true) : () => {}}
            onMouseLeave={!isMobile ? () => setIsRedBg(false) : () => {}}
            >
                <div className="container flex justify-between items-center md:items-start xl:py-2 ">
                    <Link href="/" className="text-white text-xl xl:text-4xl uppercase"><b >Coradir</b> <i className="text-white/80">Seguridad</i></Link>
                    
                    {isMobile ? (
                        <button 
                        className="flex flex-col gap-1 items-center justify-between w-10 min-h-9 p-2 py-2.5 rounded-full border-1 transition-all duration-300"
                        aria-label="Menu"
                        onClick={() => setOpenMenu(!openMenu)}
                        style={{borderColor: openMenu ? 'white' : 'transparent' }}
                    >
                        <span
                            className="burger_slide"
                            style={{
                                transform: openMenu
                                    ? 'rotate(45deg) translate( 25%, 150%)'
                                    : 'none',
                            }}
                        ></span>
                        <span
                            className="burger_slide"
                            style={{
                                opacity: openMenu ? 0 : 1,
                                transition: 'opacity 300ms',
                            }}
                        ></span>
                        <span
                            className="burger_slide"
                            style={{
                                transform: openMenu
                                    ? 'rotate(-45deg) translate( 25%, -150%)'
                                    : 'none',
                            }}
                        ></span>
                    </button>
                    ) : (
                        <MenuDesktop isRedBg={isRedBg}/>
                    )}
                </div>
                <span className="block h-0.5 bg-white w-[99%] md:!hidden rounded-2xl mx-auto  mt-2" style={{display: isRedBg ? 'none' : 'block'}}></span> 
            </header>
            <MenuMobile openMenu={openMenu} />
        </>
    );
}