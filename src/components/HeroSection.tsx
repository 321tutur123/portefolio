"use client";

import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ArrowRight, Code2, Cpu, Layers, Zap} from "lucide-react";
import type {SiteContent} from "@/content/siteContent";

gsap.registerPlugin(ScrollTrigger);

const BADGE_META = {
  elec: {Icon: Cpu, color: "#38b6d8"},
  fab: {Icon: Layers, color: "#e8a030"},
  soft: {Icon: Code2, color: "#a78bfa"},
};

function LineReveal({
  children,
  delay,
  className,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;
    gsap.fromTo(
      innerRef.current,
      {yPercent: 108, opacity: 0},
      {yPercent: 0, opacity: 1, duration: 1.05, delay, ease: "power4.out"}
    );
  }, [delay]);

  return (
    <div className={className} style={{overflow: "hidden", display: "block", ...style}}>
      <div ref={innerRef} style={{display: "block"}}>
        {children}
      </div>
    </div>
  );
}

export default function HeroSection({content}: {content: SiteContent["hero"]}) {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({delay: 1.05});

      tl.fromTo(statusRef.current, {opacity: 0, y: 14}, {opacity: 1, y: 0, duration: 0.55, ease: "power3.out"}, 0)
        .fromTo(subtitleRef.current, {opacity: 0, y: 14}, {opacity: 1, y: 0, duration: 0.55, ease: "power3.out"}, 0.25)
        .fromTo(bioRef.current, {opacity: 0, y: 18}, {opacity: 1, y: 0, duration: 0.65, ease: "power3.out"}, 0.45)
        .fromTo(".badge-col", {opacity: 0, y: 24}, {opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1}, 0.65)
        .fromTo(ctaRef.current, {opacity: 0, y: 18}, {opacity: 1, y: 0, duration: 0.6, ease: "power3.out"}, 0.9)
        .fromTo(scrollIndRef.current, {opacity: 0}, {opacity: 1, duration: 0.5}, 1.1);

      gsap.to(sectionRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(5rem,9vw,7rem) clamp(1.5rem,7vw,5.5rem) 6rem",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "650px",
          height: "500px",
          background: "radial-gradient(ellipse at 30% 50%, rgba(232,160,48,0.09) 0%, transparent 65%)",
          filter: "blur(48px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "55%",
          right: "5%",
          width: "400px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(56,182,216,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{position: "relative", zIndex: 2}}>
        <div ref={statusRef} style={{display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "clamp(2.5rem, 4vw, 3.5rem)", opacity: 0}}>
          <div style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 14px", border: "1px solid rgba(74,222,128,0.22)", borderRadius: "999px", background: "rgba(74,222,128,0.05)"}}>
            <div style={{width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse-dot 2s ease-in-out infinite"}} />
            <span style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#4ade80"}}>
              {content.status}
            </span>
          </div>
          <Zap size={11} color="#e8a030" opacity={0.55} />
        </div>

        <div style={{marginBottom: "clamp(1.5rem, 2.5vw, 2rem)"}}>
          <LineReveal delay={0.2} style={{lineHeight: "0.92", marginBottom: "0.04em"}}>
            <span style={{display: "block", fontSize: "clamp(4.5rem, 13.5vw, 12.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 0.92}}>
              Arthur
            </span>
          </LineReveal>

          <LineReveal delay={0.38} style={{lineHeight: "0.92"}}>
            <span style={{display: "block", fontSize: "clamp(4.5rem, 13.5vw, 12.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, background: "linear-gradient(110deg, #b87010 0%, #ffbe50 45%, #e8a030 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 40px rgba(232,160,48,0.3))"}}>
              Delacour
            </span>
          </LineReveal>
        </div>

        <div ref={subtitleRef} style={{display: "flex", alignItems: "center", gap: "16px", marginBottom: "clamp(1.5rem, 2.5vw, 2rem)", opacity: 0}}>
          <div style={{width: "36px", height: "1px", background: "linear-gradient(90deg, #e8a030, transparent)", flexShrink: 0}} />
          <p style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)"}}>
            {content.subtitle}
          </p>
        </div>

        <p ref={bioRef} style={{fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)", lineHeight: 1.85, color: "rgba(255,255,255,0.62)", maxWidth: "560px", marginBottom: "1.25rem", opacity: 0}}>
          {content.bio}
        </p>

        <p style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "11.5px", fontStyle: "italic", color: "rgba(232,160,48,0.45)", marginBottom: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "0.01em"}}>
          {content.aside}
        </p>

        <div style={{display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(1rem, 2vw, 1.75rem)", marginBottom: "clamp(3rem, 5vw, 4.5rem)", maxWidth: "860px"}}>
          {content.badges.map(({key, label, items}) => {
            const {Icon, color} = BADGE_META[key];
            return (
              <div key={key} className="badge-col" style={{padding: "clamp(1rem, 2vw, 1.5rem)", border: `1px solid ${color}18`, background: `${color}04`, borderRadius: "2px", opacity: 0}}>
                <div style={{display: "flex", alignItems: "center", gap: "7px", marginBottom: "14px"}}>
                  <Icon size={11} color={color} opacity={0.8} />
                  <span style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color, opacity: 0.75}}>
                    {label}
                  </span>
                </div>
                <div style={{display: "flex", flexWrap: "wrap", gap: "6px"}}>
                  {items.map((item) => (
                    <span
                      key={item}
                      style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "11px", padding: "4px 10px", border: `1px solid ${color}20`, color: "rgba(255,255,255,0.45)", background: `${color}07`, borderRadius: "2px", cursor: "default", transition: "all 0.22s ease"}}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = `${color}55`;
                        el.style.color = color;
                        el.style.background = `${color}14`;
                        el.style.boxShadow = `0 0 14px ${color}20`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = `${color}20`;
                        el.style.color = "rgba(255,255,255,0.45)";
                        el.style.background = `${color}07`;
                        el.style.boxShadow = "none";
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ctaRef} style={{display: "flex", flexWrap: "wrap", gap: "14px", opacity: 0}}>
          <a href="#projects" className="btn-line" style={{display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", border: "1px solid #e8a030", color: "#e8a030", background: "rgba(232,160,48,0.04)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.3s, box-shadow 0.3s", boxShadow: "0 0 20px rgba(232,160,48,0.06)"}}>
            <span>{content.primaryCta}</span>
            <ArrowRight size={13} />
          </a>

          <a href="#contact" className="btn-line" style={{display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "border-color 0.3s, color 0.3s"}}>
            <span>{content.secondaryCta}</span>
          </a>
        </div>
      </div>

      <div ref={scrollIndRef} style={{position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", opacity: 0}}>
        <div style={{width: "1px", height: "56px", background: "rgba(255,255,255,0.07)", position: "relative", overflow: "hidden"}}>
          <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "55%", background: "linear-gradient(to bottom, transparent, #e8a030)", boxShadow: "0 0 8px #e8a030", animation: "scan-line 2s ease-in-out infinite"}} />
        </div>
        <span style={{fontFamily: "'SF Mono','Fira Code',monospace", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(232,160,48,0.4)"}}>
          SCROLL
        </span>
      </div>
    </section>
  );
}
