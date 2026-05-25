"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Terminal, Layers, Zap, Radio } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LogEntry {
  id: string;
  ts: string;
  level: "ERROR" | "WARN" | "INFO" | "OK";
  sys: string;
  msg: string;
  fix?: string;
}

const LOGS: LogEntry[] = [
  {
    id: "l1", ts: "2023-11-14 09:32:17", level: "ERROR", sys: "AXIONPAD_V1",
    msg: "Court-circuit rail 3.3V — résistance mesurée : 0.2Ω VCC→GND",
    fix: "Trace 0.1mm trop fine → pont thermique sous soudure. Fix : trace 0.3mm, clearance 0.15mm. Validation à 3.35V stable.",
  },
  {
    id: "l2", ts: "2023-12-02 14:18:55", level: "WARN", sys: "FDM_BOITIER_V1",
    msg: "Warping sévère ABS 110°C — délaminage couches 3-7, déformation >2mm",
    fix: "Bed 90°C insuffisant, périmètre 60mm/s trop rapide. Fix : enclosure fermée, bed 110°C, périmètre 30mm/s, brim 8mm. Résultat : planéité <0.15mm.",
  },
  {
    id: "l3", ts: "2024-01-08 11:05:41", level: "ERROR", sys: "CNC_V1",
    msg: "Répétabilité axe X hors spec : drift +0.8mm après 50 passes — courroie GT2 slip",
    fix: "Tension courroie 42Hz (spec 65Hz, méthode Gates). Réglage +8 dents, contre-écrous M5. Répétabilité post-fix : ±0.08mm/200 passes.",
  },
  {
    id: "l4", ts: "2024-02-19 16:44:22", level: "WARN", sys: "RP2040_FW",
    msg: "USB HID latency spike 8ms→45ms sous charge — interrupt starving core0",
    fix: "RGB bloquait core0. Migration vers core1 (multicore RP2040). Latency stable 7-9ms. Commit : fw-v1.2.0.",
  },
  {
    id: "l5", ts: "2024-03-30 10:12:08", level: "INFO", sys: "TIPE_ALGO",
    msg: "Convergence oscillatoire Physarum iter 3000-3500 — oscillation conductance ±12%",
    fix: "Tuning γ 1.8→1.4, ajout μ_decay=0.0001/iter. Convergence stable iter 2800, δ<0.001.",
  },
  {
    id: "l6", ts: "2024-05-15 08:55:31", level: "OK", sys: "SLA_TEST_01",
    msg: "Première pièce SLA réussie — couche 0.05mm, trace circuit imprimée nette",
    fix: "Calibration : 2.0s/couche, 6.0s fond, anti-aliasing activé. Surface finale sans post-traitement.",
  },
];

const LOG_C = {
  ERROR: { bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.25)", text: "#f87171", dot: "#ef4444" },
  WARN: { bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.2)", text: "#fbbf24", dot: "#f59e0b" },
  INFO: { bg: "rgba(56,182,216,0.07)", border: "rgba(56,182,216,0.2)", text: "#38b6d8", dot: "#38bdf8" },
  OK: { bg: "rgba(74,222,128,0.07)", border: "rgba(74,222,128,0.2)", text: "#4ade80", dot: "#22c55e" },
};

const EXPERTISE = [
  {
    title: "Impression FDM — 8 ans d'expertise",
    icon: <Layers size={14} />,
    color: "#e8a030",
    pct: 95,
    items: ["Bambu Lab A1 — machine principale", "Paramétrages avancés multi-matériaux", "Entretien complet (nozzle, axes, extrudeur)", "PLA · ABS · PETG · TPU — maîtrisés", "Tolérances mécaniques ±0.1–0.2mm"],
  },
  {
    title: "Impression SLA — Bases acquises",
    icon: <Zap size={14} />,
    color: "#38b6d8",
    pct: 35,
    items: ["Photopolymérisation UV", "Calibration d'exposition", "Post-traitement IPA + cure UV", "Résines standard testées"],
  },
  {
    title: "Découpe Laser — Notions",
    icon: <Radio size={14} />,
    color: "#a78bfa",
    pct: 25,
    items: ["Découpe vectorielle contreplaqué/acrylique", "Réglages puissance/vitesse", "Essais en atelier partagé"],
  },
];

function LogCard({ log, i }: { log: LogEntry; i: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const c = LOG_C[log.level];

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.55, ease: "power3.out", delay: i * 0.07,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      }
    );
  }, [i]);

  return (
    <div
      ref={ref}
      className="log-terminal cursor-pointer transition-all duration-200"
      style={{
        padding: "20px 24px",
        background: open ? c.bg : "transparent",
        borderColor: open ? c.border : "rgba(255,255,255,0.05)",
        opacity: 0,
      }}
      onClick={() => setOpen(!open)}
      data-cursor
    >
      <div className="flex items-start gap-4">
        {/* Indicator dot */}
        <div
          className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full animate-pulse-dot"
          style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
        />

        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
            <span
              className="font-mono-custom tracking-widest px-2 py-0.5 rounded text-[10px] font-bold"
              style={{ color: c.text, background: `${c.dot}18` }}
            >
              {log.level}
            </span>
            <span
              className="font-mono-custom text-[10px]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {log.ts}
            </span>
            <span
              className="font-mono-custom text-[10px] font-medium"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              [{log.sys}]
            </span>
          </div>

          {/* Message */}
          <p
            className="font-mono-custom text-[13px]"
            style={{ color: "rgba(255,255,255,0.72)", lineHeight: "1.7" }}
          >
            {log.msg}
          </p>

          {/* Fix — expanded */}
          {open && log.fix && (
            <div
              className="mt-4 pt-4 font-mono-custom text-[12px] leading-relaxed"
              style={{
                borderTop: `1px solid ${c.border}`,
                color: "rgba(255,255,255,0.5)",
                lineHeight: "1.8",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={11} style={{ color: c.text, flexShrink: 0 }} />
                <span className="font-bold text-[11px] tracking-wider" style={{ color: c.text }}>
                  RÉSOLUTION :
                </span>
              </div>
              {log.fix}
            </div>
          )}
        </div>

        {/* Toggle arrow */}
        <div
          className="font-mono-custom text-[11px] mt-1 flex-shrink-0 transition-transform duration-300"
          style={{
            color: "rgba(255,255,255,0.2)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </div>
      </div>
    </div>
  );
}

export default function AtelierSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1.0, ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
      });

      gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 78%", once: true },
      });

      gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 78%", once: true },
      });

      // Animate progress bars when visible
      EXPERTISE.forEach((_, i) => {
        const bar = document.querySelector(`#bar-fill-${i}`) as HTMLElement;
        if (bar) {
          const targetW = bar.dataset.width || "0%";
          gsap.fromTo(bar, { width: "0%" }, {
            width: targetW, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 85%", once: true },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="atelier"
      className="relative z-10"
      style={{ padding: "8rem clamp(2rem, 8vw, 6rem) 10rem" }}
    >
      {/* Ambient line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(232,160,48,0.018) 50%, transparent 100%)" }}
      />

      {/* Header */}
      <div ref={headerRef} style={{ opacity: 0, marginBottom: "5rem" }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-14" style={{ background: "linear-gradient(90deg, var(--accent-amber), transparent)" }} />
          <span className="font-mono-custom text-[10px] tracking-[0.45em] uppercase" style={{ color: "var(--accent-amber)" }}>
            EXPERTISE & CYCLE
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-4" style={{ letterSpacing: "-0.04em" }}>
          L&apos;Atelier
        </h2>
        <p className="text-sm max-w-lg" style={{ color: "rgba(240,235,224,0.3)", lineHeight: "1.8" }}>
          Diagnostiquer précisément — Corriger méthodiquement — Documenter systématiquement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* ── Left: Expertise ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div className="font-mono-custom text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: "rgba(240,235,224,0.2)" }}>
            STACK FABRICATION
          </div>
          <div className="space-y-10">
            {EXPERTISE.map((item, i) => (
              <div key={item.title}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div style={{ color: item.color }}>{item.icon}</div>
                    <span className="text-sm font-semibold" style={{ color: "var(--accent-primary)" }}>
                      {item.title}
                    </span>
                  </div>
                  <span className="font-mono-custom text-[11px] font-bold" style={{ color: item.color }}>
                    {item.pct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1 w-full rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    id={`bar-fill-${i}`}
                    data-width={`${item.pct}%`}
                    className="h-full rounded-full"
                    style={{
                      width: "0%",
                      background: `linear-gradient(90deg, ${item.color}70, ${item.color})`,
                      boxShadow: `0 0 10px ${item.color}40`,
                    }}
                  />
                </div>

                <ul className="space-y-1.5">
                  {item.items.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-[11px] font-mono-custom" style={{ color: "rgba(240,235,224,0.3)" }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: item.color, opacity: 0.5 }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Debug terminal ── */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <Terminal size={11} style={{ color: "rgba(240,235,224,0.25)" }} />
            <span className="font-mono-custom text-[10px] tracking-[0.35em] uppercase" style={{ color: "rgba(240,235,224,0.2)" }}>
              LOGS TECHNIQUES — INCIDENTS RÉELS
            </span>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(3,3,10,0.6)" }}>
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(248,113,113,0.5)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,191,36,0.5)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(74,222,128,0.5)" }} />
              <div className="ml-3 flex flex-col gap-0.5">
                <span className="font-mono-custom text-[9px] tracking-wider" style={{ color: "rgba(240,235,224,0.18)" }}>
                  arthur@atelier:~/debug$ tail -f incidents.log
                </span>
                <span className="font-mono-custom text-[9px] italic" style={{ color: "rgba(232,160,48,0.3)" }}>
                  # J&apos;adore automatiser les tâches de 5 min — ça ne me prend que 3 semaines.
                </span>
              </div>
            </div>

            <div className="p-2 space-y-1">
              {LOGS.map((log, i) => (
                <LogCard key={log.id} log={log} i={i} />
              ))}
            </div>

            <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <span className="font-mono-custom text-[9px]" style={{ color: "rgba(240,235,224,0.12)" }}>
                {LOGS.length} entrées — Clic pour voir les résolutions
                <span className="animate-blink ml-0.5">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
