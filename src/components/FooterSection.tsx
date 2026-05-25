"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitFork, Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const emailBtnRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEmailHover = (entering: boolean) => {
    const btn = emailBtnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      scale: entering ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative z-10"
      style={{
        padding: "8rem clamp(2rem, 8vw, 6rem) 4rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(200,169,110,0.02), transparent)",
        }}
      />

      <div ref={contentRef} className="opacity-0">
        {/* Main CTA */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "var(--accent-amber)" }} />
            <span
              className="font-mono-custom text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "var(--accent-amber)" }}
            >
              CONTACT
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-black mb-3"
            style={{ letterSpacing: "-0.03em" }}
          >
            Travaillons ensemble.
          </h2>
          <p className="text-sm mb-4 max-w-md" style={{ color: "rgba(255,255,255,0.35)" }}>
            Projet hardware, logiciel, fabrication numérique — si c&apos;est intéressant,
            je suis disponible.
          </p>
          <p
            className="font-mono-custom text-sm italic mb-10 max-w-lg"
            style={{ color: "rgba(232,160,48,0.45)", letterSpacing: "0.01em" }}
          >
            Installez-vous confortablement et explorez — garantis avec beaucoup d&apos;enthousiasme,
            un peu de scotch, et beaucoup de passion.
          </p>

          {/* Email button */}
          <a
            ref={emailBtnRef}
            href="mailto:arthurdelacour7@gmail.com"
            className="btn-line group inline-flex items-center gap-4 px-10 py-5 relative overflow-hidden"
            style={{
              border: "1px solid var(--accent-amber)",
              color: "var(--accent-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
            onMouseEnter={() => handleEmailHover(true)}
            onMouseLeave={() => handleEmailHover(false)}
          >
            {/* Fill animation */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(200,169,110,0.06)" }}
            />
            <Mail size={16} className="relative z-10" />
            <span className="relative z-10">arthurdelacour7@gmail.com</span>
            <ArrowUpRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: name + tagline */}
          <div>
            <div className="font-mono-custom text-[11px] tracking-widest mb-1" style={{ color: "rgba(232,224,208,0.4)" }}>
              ARTHUR DELACOUR
            </div>
            <div className="font-mono-custom text-[9px]" style={{ color: "rgba(232,224,208,0.15)" }}>
              Ingénierie · Hardware · Fabrication Numérique · Software
            </div>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/321tutur123"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 transition-all duration-200"
              style={{ color: "rgba(232,224,208,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,224,208,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,224,208,0.3)")}
            >
              <GitFork size={14} />
              <span className="font-mono-custom text-[11px] tracking-wider">GitHub</span>
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>

            <div
              className="w-px h-4"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />

            <div
              className="font-mono-custom text-[9px] tracking-wider"
              style={{ color: "rgba(232,224,208,0.12)" }}
            >
              PORTFOLIO v2.0 · NEXT.JS 15
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
