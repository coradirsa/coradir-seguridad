"use client"
import AntipanicButtonSection from "./components/antipanicButtonSection";
import BenefitsSection from "./components/benefitsSection";
import DiscoveredSection from "./components/discoveredSection";
import HeroSection from "./components/heroSection";
import SafeSection from "./components/safeSection";
import { useRef } from "react";

export default function Home() {
    const lineRef = useRef<HTMLDivElement | null>(null);  
    return (
        <>
            <HeroSection />
            <DiscoveredSection />
            <AntipanicButtonSection lineBottomRef={lineRef} />
            <BenefitsSection lineBottomRef={lineRef}/>
            <SafeSection />
        </>
    )
}