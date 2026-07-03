"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".about-reveal");
      if (!items) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        padding: "7rem clamp(1.5rem, 7vw, 5.5rem) 7rem",
      }}
    >
      {/* Subtle left accent bar */}
      <div
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 7vw, 5.5rem)",
          top: "7rem",
          bottom: "7rem",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, rgba(232,160,48,0.25) 20%, rgba(232,160,48,0.25) 80%, transparent)",
        }}
      />

      <div
        style={{
          paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
          maxWidth: "780px",
        }}
      >

        {/* Label */}
        <div
          className="about-reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "2.5rem",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'SF Mono','Fira Code',monospace",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#e8a030",
              opacity: 0.7,
            }}
          >
            ARTHUR DELACOUR
          </span>
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "linear-gradient(90deg, rgba(232,160,48,0.5), transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'SF Mono','Fira Code',monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            À PROPOS
          </span>
        </div>

        {/* Ligne 1 — grande citation d'accroche */}
        <div
          className="about-reveal"
          style={{ marginBottom: "3.5rem", opacity: 0 }}
        >
          {/* Guillemet décoratif */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 0.9,
              color: "rgba(232,160,48,0.15)",
              marginBottom: "-0.5rem",
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>
          <p
            style={{
              fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              color: "#ffffff",
            }}
          >
            Ingénieux le jour,{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #b87010, #ffbe50, #e8a030)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              codeur la nuit,
            </span>{" "}
            fatigué le reste du temps.
          </p>
        </div>

        {/* Ligne 2 — super-pouvoir */}
        <div
          className="about-reveal"
          style={{
            marginBottom: "2rem",
            paddingLeft: "1.5rem",
            borderLeft: "2px solid rgba(56,182,216,0.3)",
            opacity: 0,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono','Fira Code',monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#38b6d8",
              marginBottom: "8px",
              opacity: 0.7,
            }}
          >
            MON SUPER-POUVOIR
          </div>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Passer 48 heures d&apos;affilée sur un projet pour économiser{" "}
            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
              un achat à 15€ sur Amazon.
            </span>
          </p>
        </div>

        {/* Ligne 3 — automatisation */}
        <div
          className="about-reveal"
          style={{
            marginBottom: "3.5rem",
            paddingLeft: "1.5rem",
            borderLeft: "2px solid rgba(167,139,250,0.3)",
            opacity: 0,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono','Fira Code',monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#a78bfa",
              marginBottom: "8px",
              opacity: 0.7,
            }}
          >
            PHILOSOPHIE DE TRAVAIL
          </div>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            J&apos;adore automatiser les tâches de 5 minutes.{" "}
            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
              Ça ne me prend généralement que 3 semaines de développement.
            </span>
          </p>
        </div>

        {/* Closing — invitation */}
        <div
          className="about-reveal"
          style={{
            padding: "1.75rem 2rem",
            border: "1px solid rgba(232,160,48,0.12)",
            background: "rgba(232,160,48,0.03)",
            position: "relative",
            opacity: 0,
          }}
        >
          {/* HUD corners */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "12px", height: "12px",
            borderTop: "1px solid rgba(232,160,48,0.5)",
            borderLeft: "1px solid rgba(232,160,48,0.5)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: "12px", height: "12px",
            borderBottom: "1px solid rgba(232,160,48,0.5)",
            borderRight: "1px solid rgba(232,160,48,0.5)",
          }} />

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              fontStyle: "italic",
            }}
          >
            Installez-vous confortablement, et explorez mes projets —{" "}
            <span style={{ color: "rgba(255,255,255,0.75)", fontStyle: "normal" }}>
              garantis avec beaucoup d&apos;enthousiasme, un peu de scotch, et beaucoup de passion.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
