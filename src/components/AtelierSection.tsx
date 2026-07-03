"use client";

import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {CheckCircle2, Layers, Radio, Terminal, Zap} from "lucide-react";
import type {ExpertiseContent, LogEntryContent, SiteContent} from "@/content/siteContent";

gsap.registerPlugin(ScrollTrigger);

const LOG_C = {
  ERROR: {bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.25)", text: "#f87171", dot: "#ef4444"},
  WARN: {bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.2)", text: "#fbbf24", dot: "#f59e0b"},
  INFO: {bg: "rgba(56,182,216,0.07)", border: "rgba(56,182,216,0.2)", text: "#38b6d8", dot: "#38bdf8"},
  OK: {bg: "rgba(74,222,128,0.07)", border: "rgba(74,222,128,0.2)", text: "#4ade80", dot: "#22c55e"},
};

const EXPERTISE_META = {
  fdm: {icon: <Layers size={14} />, color: "#e8a030"},
  sla: {icon: <Zap size={14} />, color: "#38b6d8"},
  laser: {icon: <Radio size={14} />, color: "#a78bfa"},
};

function LogCard({
  log,
  i,
  resolutionLabel,
}: {
  log: LogEntryContent;
  i: number;
  resolutionLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const c = LOG_C[log.level];

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      {opacity: 0, x: -30},
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: "power3.out",
        delay: i * 0.07,
        scrollTrigger: {trigger: ref.current, start: "top 88%", once: true},
      }
    );
  }, [i]);

  return (
    <div
      ref={ref}
      className="log-terminal cursor-pointer transition-all duration-200"
      style={{padding: "20px 24px", background: open ? c.bg : "transparent", borderColor: open ? c.border : "rgba(255,255,255,0.05)", opacity: 0}}
      onClick={() => setOpen(!open)}
      data-cursor
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full animate-pulse-dot" style={{background: c.dot, boxShadow: `0 0 8px ${c.dot}`}} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
            <span className="font-mono-custom tracking-widest px-2 py-0.5 rounded text-[10px] font-bold" style={{color: c.text, background: `${c.dot}18`}}>
              {log.level}
            </span>
            <span className="font-mono-custom text-[10px]" style={{color: "rgba(255,255,255,0.2)"}}>
              {log.ts}
            </span>
            <span className="font-mono-custom text-[10px] font-medium" style={{color: "rgba(255,255,255,0.42)"}}>
              [{log.sys}]
            </span>
          </div>

          <p className="font-mono-custom text-[13px]" style={{color: "rgba(255,255,255,0.72)", lineHeight: "1.7"}}>
            {log.msg}
          </p>

          {open && log.fix && (
            <div className="mt-4 pt-4 font-mono-custom text-[12px] leading-relaxed" style={{borderTop: `1px solid ${c.border}`, color: "rgba(255,255,255,0.5)", lineHeight: "1.8"}}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={11} style={{color: c.text, flexShrink: 0}} />
                <span className="font-bold text-[11px] tracking-wider" style={{color: c.text}}>
                  {resolutionLabel}
                </span>
              </div>
              {log.fix}
            </div>
          )}
        </div>

        <div className="font-mono-custom text-[11px] mt-1 flex-shrink-0 transition-transform duration-300" style={{color: "rgba(255,255,255,0.2)", transform: open ? "rotate(180deg)" : "rotate(0deg)"}}>
          ▼
        </div>
      </div>
    </div>
  );
}

function ExpertiseItem({item, i}: {item: ExpertiseContent; i: number}) {
  const meta = EXPERTISE_META[item.id];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div style={{color: meta.color}}>{meta.icon}</div>
          <span className="text-sm font-semibold" style={{color: "var(--accent-primary)"}}>
            {item.title}
          </span>
        </div>
        <span className="font-mono-custom text-[11px] font-bold" style={{color: meta.color}}>
          {item.pct}%
        </span>
      </div>

      <div className="h-1 w-full rounded-full overflow-hidden mb-4" style={{background: "rgba(255,255,255,0.05)"}}>
        <div
          id={`bar-fill-${i}`}
          data-width={`${item.pct}%`}
          className="h-full rounded-full"
          style={{width: "0%", background: `linear-gradient(90deg, ${meta.color}70, ${meta.color})`, boxShadow: `0 0 10px ${meta.color}40`}}
        />
      </div>

      <ul className="space-y-1.5">
        {item.items.map((d) => (
          <li key={d} className="flex items-center gap-2.5 text-[11px] font-mono-custom" style={{color: "rgba(240,235,224,0.3)"}}>
            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{background: meta.color, opacity: 0.5}} />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AtelierSection({content}: {content: SiteContent["atelier"]}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1.0, ease: "power4.out", scrollTrigger: {trigger: headerRef.current, start: "top 80%", once: true}});
      gsap.fromTo(leftRef.current, {opacity: 0, x: -40}, {opacity: 1, x: 0, duration: 0.9, ease: "power4.out", scrollTrigger: {trigger: leftRef.current, start: "top 78%", once: true}});
      gsap.fromTo(rightRef.current, {opacity: 0, x: 40}, {opacity: 1, x: 0, duration: 0.9, ease: "power4.out", scrollTrigger: {trigger: rightRef.current, start: "top 78%", once: true}});

      content.expertise.forEach((_, i) => {
        const bar = document.querySelector(`#bar-fill-${i}`) as HTMLElement;
        if (bar) {
          const targetW = bar.dataset.width || "0%";
          gsap.fromTo(bar, {width: "0%"}, {width: targetW, duration: 1.4, ease: "power3.out", scrollTrigger: {trigger: bar, start: "top 85%", once: true}});
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [content.expertise]);

  return (
    <section ref={sectionRef} id="atelier" className="relative z-10" style={{padding: "8rem clamp(2rem, 8vw, 6rem) 10rem"}}>
      <div className="absolute inset-0 pointer-events-none" style={{background: "linear-gradient(180deg, transparent 0%, rgba(232,160,48,0.018) 50%, transparent 100%)"}} />

      <div ref={headerRef} style={{opacity: 0, marginBottom: "5rem"}}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-14" style={{background: "linear-gradient(90deg, var(--accent-amber), transparent)"}} />
          <span className="font-mono-custom text-[10px] tracking-[0.45em] uppercase" style={{color: "var(--accent-amber)"}}>
            {content.eyebrow}
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-4" style={{letterSpacing: "-0.04em"}}>
          {content.title}
        </h2>
        <p className="text-sm max-w-lg" style={{color: "rgba(240,235,224,0.3)", lineHeight: "1.8"}}>
          {content.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div ref={leftRef} style={{opacity: 0}}>
          <div className="font-mono-custom text-[10px] tracking-[0.35em] uppercase mb-8" style={{color: "rgba(240,235,224,0.2)"}}>
            {content.stackLabel}
          </div>
          <div className="space-y-10">
            {content.expertise.map((item, i) => (
              <ExpertiseItem key={item.id} item={item} i={i} />
            ))}
          </div>
        </div>

        <div ref={rightRef} style={{opacity: 0}}>
          <div className="flex items-center gap-3 mb-6">
            <Terminal size={11} style={{color: "rgba(240,235,224,0.25)"}} />
            <span className="font-mono-custom text-[10px] tracking-[0.35em] uppercase" style={{color: "rgba(240,235,224,0.2)"}}>
              {content.logsLabel}
            </span>
          </div>

          <div style={{border: "1px solid rgba(255,255,255,0.05)", background: "rgba(3,3,10,0.6)"}}>
            <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{borderColor: "rgba(255,255,255,0.05)"}}>
              <div className="w-2.5 h-2.5 rounded-full" style={{background: "rgba(248,113,113,0.5)"}} />
              <div className="w-2.5 h-2.5 rounded-full" style={{background: "rgba(251,191,36,0.5)"}} />
              <div className="w-2.5 h-2.5 rounded-full" style={{background: "rgba(74,222,128,0.5)"}} />
              <div className="ml-3 flex flex-col gap-0.5">
                <span className="font-mono-custom text-[9px] tracking-wider" style={{color: "rgba(240,235,224,0.18)"}}>
                  {content.terminalCommand}
                </span>
                <span className="font-mono-custom text-[9px] italic" style={{color: "rgba(232,160,48,0.3)"}}>
                  {content.terminalAside}
                </span>
              </div>
            </div>

            <div className="p-2 space-y-1">
              {content.logs.map((log, i) => (
                <LogCard key={log.id} log={log} i={i} resolutionLabel={content.resolutionLabel} />
              ))}
            </div>

            <div className="px-4 py-3 border-t" style={{borderColor: "rgba(255,255,255,0.04)"}}>
              <span className="font-mono-custom text-[9px]" style={{color: "rgba(240,235,224,0.12)"}}>
                {content.logs.length} {content.entriesLabel} — {content.clickHint}
                <span className="animate-blink ml-0.5">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
