"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function HUDOverlay() {
  const [time, setTime] = useState("");
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [scrollPct, setScrollPct] = useState(0);
  const coordsRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      );
    };
    tick();
    const interval = setInterval(tick, 1000);

    const onMouse = (e: MouseEvent) => {
      coordsRef.current = { x: e.clientX, y: e.clientY };
    };

    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.round(pct));
    };

    let raf: number;
    const updateCoords = () => {
      setMouseCoords({ ...coordsRef.current });
      raf = requestAnimationFrame(updateCoords);
    };
    raf = requestAnimationFrame(updateCoords);

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Top-left status */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
          <span className="font-mono-custom text-[10px] text-green-400 tracking-widest uppercase">
            SYS.ONLINE
          </span>
        </div>
        <div className="font-mono-custom text-[10px] text-white/20 tracking-widest">
          {time}
        </div>
        <div className="font-mono-custom text-[10px] text-white/15 tracking-wider mt-0.5">
          X:{mouseCoords.x.toString().padStart(4, "0")} Y:{mouseCoords.y.toString().padStart(4, "0")}
        </div>
      </div>

      {/* Top-right */}
      <div className="fixed top-6 right-6 z-50 pointer-events-none text-right">
        <div className="font-mono-custom text-[10px] text-white/15 tracking-widest uppercase">
          ARTHUR DELACOUR
        </div>
        <div className="font-mono-custom text-[10px] tracking-widest mt-0.5" style={{ color: "var(--accent-amber)", opacity: 0.4 }}>
          PORTFOLIO v2.0
        </div>
      </div>

      {/* Scroll progress — right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center gap-1">
        <div className="font-mono-custom text-[9px] text-white/15 tracking-widest [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </div>
        <div className="w-px h-24 bg-white/10 relative overflow-hidden rounded">
          <div
            className="absolute top-0 left-0 w-full rounded transition-all duration-300"
            style={{
              height: `${scrollPct}%`,
              background: "var(--accent-amber)",
              opacity: 0.6,
            }}
          />
        </div>
        <div className="font-mono-custom text-[9px] text-white/15">
          {scrollPct.toString().padStart(3, "0")}
        </div>
      </div>

      {/* Bottom-left version */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <div className="font-mono-custom text-[9px] text-white/10 tracking-widest">
          BUILD 2025.01 — NEXT.JS 15
        </div>
      </div>
    </>
  );
}
