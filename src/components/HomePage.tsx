"use client";

import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import {useLenis} from "@/hooks/useLenis";
import type {SiteContent} from "@/content/siteContent";
import CustomCursor from "@/components/CustomCursor";
import HUDOverlay from "@/components/HUDOverlay";
import ParallaxGrid from "@/components/ParallaxGrid";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AtelierSection from "@/components/AtelierSection";
import FooterSection from "@/components/FooterSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage({content}: {content: SiteContent}) {
  useLenis();

  return (
    <>
      <CustomCursor />
      <HUDOverlay />
      <LanguageSwitcher content={content.nav} />
      <ParallaxGrid />
      <GlowOrbs />
      <IntroLoader />

      <main className="relative z-10">
        <HeroSection content={content.hero} />
        <SectionDivider label={content.sectionDividers.projects} />
        <ProjectsSection content={content.projects} />
        <SectionDivider label={content.sectionDividers.atelier} />
        <AtelierSection content={content.atelier} />
        <FooterSection content={content.footer} />
      </main>
    </>
  );
}

function GlowOrbs() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 120% 80% at 0% 0%, #0d0a16 0%, #03030a 55%, #040610 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.028,
          mixBlendMode: "overlay",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "900px",
          height: "700px",
          top: "-150px",
          left: "-200px",
          background: "radial-gradient(ellipse at 35% 40%, rgba(232,160,48,0.22) 0%, rgba(232,160,48,0.08) 35%, transparent 68%)",
          filter: "blur(60px)",
          animation: "orb-drift 20s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "400px",
          top: "30vh",
          left: "15%",
          background: "radial-gradient(ellipse, rgba(200,100,20,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift 26s ease-in-out infinite reverse",
          animationDelay: "-6s",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "38vh",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(232,160,48,0.12) 25%, rgba(232,160,48,0.06) 50%, rgba(56,182,216,0.06) 75%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "600px",
          top: "75vh",
          right: "-180px",
          background: "radial-gradient(ellipse at 65% 35%, rgba(56,182,216,0.14) 0%, rgba(56,182,216,0.04) 40%, transparent 68%)",
          filter: "blur(70px)",
          animation: "orb-drift 28s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "500px",
          top: "160vh",
          left: "10%",
          background: "radial-gradient(ellipse, rgba(167,139,250,0.11) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "orb-drift 22s ease-in-out infinite reverse",
          animationDelay: "-15s",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "400px",
          bottom: "0",
          right: "15%",
          background: "radial-gradient(ellipse, rgba(232,160,48,0.13) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb-drift 18s ease-in-out infinite",
          animationDelay: "-4s",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 75% 90% at 50% 30%, transparent 40%, rgba(3,3,10,0.65) 100%)",
        }}
      />
    </div>
  );
}

function IntroLoader() {
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({delay: 0.05});

    tl.to(overlayRef.current, {opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1});

    tl.fromTo(
      lineRef.current,
      {scaleX: 0, transformOrigin: "left center"},
      {scaleX: 1, duration: 0.7, ease: "power4.inOut"},
      0.0
    ).to(lineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.5,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <>
      <div ref={overlayRef} className="fixed inset-0 z-[500] pointer-events-none" style={{background: "var(--bg-primary)"}} />
      <div
        ref={lineRef}
        className="fixed top-0 left-0 right-0 h-[2px] z-[501] pointer-events-none origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent-amber-bright), var(--accent-amber), transparent)",
          boxShadow: "0 0 20px var(--accent-amber), 0 0 40px rgba(232,160,48,0.3)",
        }}
      />
    </>
  );
}

function SectionDivider({label}: {label: string}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      {opacity: 0, scaleX: 0.6},
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="relative z-10 mx-8 md:mx-16 lg:mx-24 my-4 flex items-center gap-6" style={{opacity: 0}}>
      <div className="h-px flex-1" style={{background: "linear-gradient(90deg, transparent, rgba(232,160,48,0.2), transparent)"}} />
      <span className="font-mono-custom text-[9px] tracking-[0.4em] uppercase whitespace-nowrap" style={{color: "rgba(232,160,48,0.35)"}}>
        {label}
      </span>
      <div className="h-px flex-1" style={{background: "linear-gradient(90deg, transparent, rgba(232,160,48,0.2), transparent)"}} />
    </div>
  );
}
