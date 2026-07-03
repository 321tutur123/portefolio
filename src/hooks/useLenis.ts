"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let mounted = true;

    const updateLenis = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      if (!mounted) return;

      lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        wheelMultiplier: 1,
        infinite: false,
        autoRaf: false,
      });

      // ← THE FIX: feed lenis scroll into ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // ← THE FIX: use gsap ticker (not rAF) so timing is synced
      gsap.ticker.add(updateLenis);

      // ← Prevents lag compensation that breaks smooth feel
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      mounted = false;
      gsap.ticker.remove(updateLenis);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
