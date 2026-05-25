"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ExternalLink, ChevronRight, Cpu, Wrench, Brain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  tagColor: string;
  icon: React.ReactNode;
  summary: string;
  pipeline: string[];
  details: { challenge: string; process: string; outcome: string };
  stat: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "axionpad",
    index: "001",
    title: "L'Axion Pad",
    subtitle: "Macro-pad Custom Open-Source",
    tags: ["#Hardware", "#PCBDesign", "#RP2040", "#NextJS"],
    tagColor: "#38b6d8",
    icon: <Cpu size={20} />,
    summary:
      "Conception électronique autonome d'un périphérique macro-pad open-source — du schéma EasyEDA au site e-commerce axionpad.fr.",
    pipeline: [
      "Schéma EasyEDA",
      "Routage PCB 0.15mm",
      "Boîtier FDM ABS ±0.2mm",
      "Firmware RP2040",
      "Site axionpad.fr",
    ],
    details: {
      challenge:
        "Concevoir un PCB fonctionnel en production — gestion des plans de masse, routage différentiel USB, tolérances mécaniques boîtier/PCB.",
      process:
        "V1 : court-circuit sur rail 3.3V détecté au multimètre (résistance 0.2Ω VCC→GND). Trace trop fine (0.1mm). V2 : trace redessinée 0.3mm, clearance 0.15mm, plan de masse amélioré. Validation 3.35V stable. Chaque switch testé via firmware CircuitPython avant montage.",
      outcome:
        "Produit commercial fonctionnel, site e-commerce Next.js 15, documentation open-source complète. 0 retour défectueux.",
    },
    stat: [
      { label: "Révisions PCB", value: "3" },
      { label: "Switches testés", value: "12+" },
      { label: "Stack", value: "5 tech" },
    ],
  },
  {
    id: "cnc",
    index: "002",
    title: "Projet CNC",
    subtitle: "Machine-outil à Commande Numérique",
    tags: ["#CNC", "#Mécanique", "#Conception3D", "#Automatisme"],
    tagColor: "#e8a030",
    icon: <Wrench size={20} />,
    summary:
      "Étude, modélisation et assemblage d'une machine CNC — rigidité structurelle, transmission de puissance, calibration broche.",
    pipeline: [
      "Analyse cinématique",
      "Modélisation CAO",
      "Transmission GT2/vis à billes",
      "Câblage drivers stepper",
      "Calibration & tests",
    ],
    details: {
      challenge:
        "Répétabilité < 0.1mm avec budget optimisé. Vibrations haute fréquence de la broche sur structure alu.",
      process:
        "Analyse FEM simplifiée pour profilés 2040. Silent blocks pour isolation vibratoire. Calibration tension courroies par mesure Hz (méthode Gates) : 42Hz→65Hz. Ajout contre-écrous M5.",
      outcome:
        "Machine opérationnelle sur alu et bois. Répétabilité ±0.08mm sur 200 passes. Découpe boîtiers PCB et panneaux front aluminium.",
    },
    stat: [
      { label: "Répétabilité", value: "±0.08mm" },
      { label: "Course X/Y", value: "300×300" },
      { label: "Matériaux", value: "Al + Bois" },
    ],
  },
  {
    id: "tipe",
    index: "003",
    title: "TIPE — Physarum",
    subtitle: "Optimisation Structurelle Bio-inspirée",
    tags: ["#Python", "#Algorithmes", "#Simulation", "#Maths"],
    tagColor: "#a78bfa",
    icon: <Brain size={20} />,
    summary:
      "Algorithme de réduction de masse sous contraintes mécaniques — réseau du Physarum Polycephalum hybridé avec Dijkstra.",
    pipeline: [
      "Modélisation graphes",
      "Équations Tero 2010",
      "Hybridation Dijkstra",
      "Visualisation numpy",
      "Validation cas tests",
    ],
    details: {
      challenge:
        "Reproduire l'émergence de structures optimales du blob Physarum Polycephalum pour topologie structurelle — sans données d'entraînement.",
      process:
        "Implémentation équations différentielles de conductance (modèle Tero). Hybridation Dijkstra pour garantir connectivité. Paramétrage : γ=1.4 (renforcement), μ_decay=0.0001/iter. 5000 itérations jusqu'à convergence δ<0.001.",
      outcome:
        "Réduction de masse théorique 38% sur poutre isostatique. Résultats cohérents avec littérature SIMP. Convergence stable à iter 2800.",
    },
    stat: [
      { label: "Réduction masse", value: "38%" },
      { label: "Itérations", value: "5000" },
      { label: "Modèle", value: "Tero 2010" },
    ],
  },
];

/* ─── Full-screen project modal ─── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        panelRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" },
        0.1
      );

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(3,3,10,0.92)", backdropFilter: "blur(16px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto"
        style={{
          background: "rgba(7,7,15,0.99)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 80px ${project.tagColor}18, 0 40px 100px rgba(0,0,0,0.8)`,
        }}
      >
        <div className="hud-tl" />
        <div className="hud-br" />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="font-mono-custom text-[10px] tracking-[0.35em] mb-3 uppercase" style={{ color: project.tagColor, opacity: 0.7 }}>
                PROJET {project.index} — ÉTUDE DE CAS
              </div>
              <h2 className="text-3xl font-black mb-1.5" style={{ letterSpacing: "-0.025em" }}>
                {project.title}
              </h2>
              <p className="text-sm" style={{ color: "rgba(240,235,224,0.4)" }}>
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 transition-all duration-200 hover:rotate-90"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,235,224,0.4)" }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] font-mono-custom"
                style={{
                  background: `${project.tagColor}10`,
                  border: `1px solid ${project.tagColor}30`,
                  color: project.tagColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {project.stat.map((s) => (
              <div
                key={s.label}
                className="p-5 text-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: `${project.tagColor}05`,
                }}
              >
                <div className="text-2xl font-black mb-1.5" style={{ color: project.tagColor }}>
                  {s.value}
                </div>
                <div className="font-mono-custom text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(240,235,224,0.25)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="mb-10">
            <div className="font-mono-custom text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(240,235,224,0.25)" }}>
              PIPELINE
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {project.pipeline.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className="px-3 py-1.5 text-[11px] font-mono-custom"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(240,235,224,0.55)" }}
                  >
                    {step}
                  </span>
                  {i < project.pipeline.length - 1 && (
                    <ChevronRight size={11} style={{ color: "rgba(240,235,224,0.18)", flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detail sections */}
          {[
            { label: "LE DÉFI", key: "challenge" as const, dot: "#f87171" },
            { label: "PROCESSUS", key: "process" as const, dot: project.tagColor },
            { label: "RÉSULTAT", key: "outcome" as const, dot: "#4ade80" },
          ].map(({ label, key, dot }) => (
            <div key={key} className="mb-7">
              <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-[0.3em] uppercase mb-2.5" style={{ color: dot }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                {label}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(240,235,224,0.5)", lineHeight: "1.85" }}>
                {project.details[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Project card with 3D tilt ─── */
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;

    gsap.to(card, {
      rotateX: ((y - cy) / cy) * -7,
      rotateY: ((x - cx) / cx) * 7,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 900,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, { x: x - 160, y: y - 160, opacity: 1, duration: 0.35, ease: "power2.out" });
    }
    if (dataRef.current) {
      gsap.to(dataRef.current, {
        x: ((x - cx) / cx) * 14,
        y: ((y - cy) / cy) * 14,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    if (dataRef.current) gsap.to(dataRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onOpen}
      data-cursor
    >
      {/* Radial glow follow */}
      <div
        ref={glowRef}
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${project.tagColor}25 0%, transparent 70%)`,
          zIndex: 0,
          top: 0, left: 0,
        }}
      />

      <div
        className="relative overflow-hidden transition-all duration-200 group"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(7,7,15,0.7)",
          backdropFilter: "blur(12px)",
          zIndex: 1,
          minHeight: "400px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${project.tagColor}35`;
          e.currentTarget.style.boxShadow = `0 0 40px ${project.tagColor}10, inset 0 1px 0 ${project.tagColor}15`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="hud-tl" />
        <div className="hud-br" />

        {/* Floating data layer */}
        <div ref={dataRef} className="absolute top-5 right-5 opacity-8 pointer-events-none text-right">
          <div className="font-mono-custom text-[9px]" style={{ color: project.tagColor, opacity: 0.2 }}>
            <div>PROJ.{project.index}</div>
            <div>STATUS: COMPLETE</div>
          </div>
        </div>

        <div className="p-8 md:p-10 flex flex-col h-full" style={{ minHeight: "400px" }}>
          {/* Top row */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono-custom text-[10px] tracking-[0.45em]" style={{ color: "rgba(240,235,224,0.15)" }}>
              {project.index}
            </span>
            <div
              className="p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{ border: `1px solid ${project.tagColor}28`, color: project.tagColor }}
            >
              {project.icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black mb-1.5" style={{ letterSpacing: "-0.025em" }}>
            {project.title}
          </h3>
          <p className="text-sm mb-5" style={{ color: "rgba(240,235,224,0.3)" }}>
            {project.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono-custom px-2 py-0.5"
                style={{ color: project.tagColor, opacity: 0.65, border: `1px solid ${project.tagColor}18` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Summary */}
          <p className="text-[13px] leading-loose flex-1" style={{ color: "rgba(240,235,224,0.4)", lineHeight: "1.8" }}>
            {project.summary}
          </p>

          {/* CTA */}
          <div
            className="flex items-center gap-2 mt-8 text-[11px] font-mono-custom tracking-wider transition-all duration-300"
            style={{ color: project.tagColor, opacity: 0.7 }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "12px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; }}
          >
            <span>VOIR L&apos;ÉTUDE DE CAS</span>
            <ExternalLink size={11} />
          </div>
        </div>

        {/* Animated bottom bar */}
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
          style={{ background: `linear-gradient(90deg, transparent, ${project.tagColor}, transparent)` }}
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        }
      );

      // Cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power4.out", stagger: 0.18,
            scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10"
      style={{ padding: "8rem clamp(2rem, 8vw, 6rem) 10rem" }}
    >
      {/* Header */}
      <div ref={headerRef} style={{ opacity: 0, marginBottom: "5rem" }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-14" style={{ background: "linear-gradient(90deg, var(--accent-amber), transparent)" }} />
          <span className="font-mono-custom text-[10px] tracking-[0.45em] uppercase" style={{ color: "var(--accent-amber)" }}>
            RÉALISATIONS
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black" style={{ letterSpacing: "-0.04em" }}>
          La Vitrine
        </h2>
        <p className="mt-4 text-sm" style={{ color: "rgba(240,235,224,0.3)" }}>
          Cliquez sur un projet pour déployer l&apos;étude de cas complète.
        </p>
        <p
          className="mt-3 font-mono-custom"
          style={{
            fontSize: "11px",
            fontStyle: "italic",
            color: "rgba(232,160,48,0.38)",
            letterSpacing: "0.01em",
          }}
        >
          — Mon super-pouvoir ? Passer 48h d&apos;affilée sur un projet pour économiser un achat à 15€ sur Amazon.
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project, i) => (
          <div key={project.id} className="project-card-item" style={{ opacity: 0 }}>
            <ProjectCard project={project} index={i} onOpen={() => setActiveProject(project)} />
          </div>
        ))}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
