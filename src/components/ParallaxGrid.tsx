"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ParallaxGrid() {
  const layerFineRef = useRef<HTMLDivElement>(null);
  const layerCoarseRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouse);

    let raf: number;
    const animate = () => {
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.05;

      if (layerFineRef.current) {
        gsap.set(layerFineRef.current, {
          x: currentRef.current.x * 12,
          y: currentRef.current.y * 12,
        });
      }
      if (layerCoarseRef.current) {
        gsap.set(layerCoarseRef.current, {
          x: currentRef.current.x * 4,
          y: currentRef.current.y * 4,
        });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden>

      {/* Grille fine — réagit beaucoup à la souris */}
      <div
        ref={layerFineRef}
        className="absolute inset-[-8%]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Grille large — réagit peu, donne profondeur */}
      <div
        ref={layerCoarseRef}
        className="absolute inset-[-8%]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,160,48,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,48,0.045) 1px, transparent 1px)",
          backgroundSize: "220px 220px",
          backgroundPosition: "28px 28px",
        }}
      />

      {/* Réticule de précision — haut gauche */}
      <div
        className="absolute animate-float"
        style={{ top: "18%", left: "12%", animationDelay: "0s", opacity: 0.18 }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="#e8a030" strokeWidth="0.6" />
          <circle cx="18" cy="18" r="8" stroke="#e8a030" strokeWidth="0.4" />
          <circle cx="18" cy="18" r="1.5" fill="#e8a030" />
          <line x1="18" y1="2" x2="18" y2="9" stroke="#e8a030" strokeWidth="0.6" />
          <line x1="18" y1="27" x2="18" y2="34" stroke="#e8a030" strokeWidth="0.6" />
          <line x1="2" y1="18" x2="9" y2="18" stroke="#e8a030" strokeWidth="0.6" />
          <line x1="27" y1="18" x2="34" y2="18" stroke="#e8a030" strokeWidth="0.6" />
        </svg>
      </div>

      {/* Carré rotatif — bas droite */}
      <div
        className="absolute animate-spin-slow"
        style={{ top: "68%", right: "14%", opacity: 0.10 }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="8" y="8" width="28" height="28" stroke="#38b6d8" strokeWidth="0.6" />
          <rect x="2" y="2" width="40" height="40" stroke="#38b6d8" strokeWidth="0.3" strokeDasharray="4 4" />
          <circle cx="22" cy="22" r="2" fill="#38b6d8" />
        </svg>
      </div>

      {/* Trace circuit — milieu gauche */}
      <div
        className="absolute animate-float"
        style={{ top: "48%", left: "6%", animationDelay: "2s", opacity: 0.09 }}
      >
        <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
          <path d="M0 35 H20 V10 H60 V35 H100" stroke="#38b6d8" strokeWidth="0.8" />
          <circle cx="20" cy="10" r="2" fill="#38b6d8" />
          <circle cx="60" cy="10" r="2" fill="#38b6d8" />
          <circle cx="60" cy="35" r="2" fill="#38b6d8" />
          <path d="M40 35 V55 H70 V65" stroke="#38b6d8" strokeWidth="0.5" strokeDasharray="3 3" />
          <path d="M20 10 V4" stroke="#38b6d8" strokeWidth="0.8" />
          <rect x="17" y="1" width="6" height="3" stroke="#38b6d8" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Coin HUD — haut droite */}
      <div
        className="absolute animate-float"
        style={{ top: "22%", right: "10%", animationDelay: "1.5s", opacity: 0.12 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M0 0 H16" stroke="#a78bfa" strokeWidth="1" />
          <path d="M0 0 V16" stroke="#a78bfa" strokeWidth="1" />
          <path d="M50 50 H34" stroke="#a78bfa" strokeWidth="1" />
          <path d="M50 50 V34" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="25" cy="25" r="3" stroke="#a78bfa" strokeWidth="0.5" />
          <line x1="25" y1="10" x2="25" y2="20" stroke="#a78bfa" strokeWidth="0.4" strokeDasharray="2 2" />
          <line x1="25" y1="30" x2="25" y2="40" stroke="#a78bfa" strokeWidth="0.4" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Vignette douce sur les bords */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 85% at 50% 45%, transparent 55%, rgba(3,3,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
