"use client";

import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Brain, ChevronRight, Cpu, ExternalLink, Wrench, X} from "lucide-react";
import type {ProjectContent, SiteContent} from "@/content/siteContent";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_META = {
  axionpad: {tagColor: "#38b6d8", icon: <Cpu size={20} />},
  cnc: {tagColor: "#e8a030", icon: <Wrench size={20} />},
  tipe: {tagColor: "#a78bfa", icon: <Brain size={20} />},
};

type Project = ProjectContent & {
  tagColor: string;
  icon: React.ReactNode;
};

type ProjectLabels = Pick<
  SiteContent["projects"],
  "modalEyebrow" | "pipelineLabel" | "detailLabels" | "cardCta" | "dataStatus"
>;

function ProjectModal({
  project,
  labels,
  onClose,
}: {
  project: Project;
  labels: ProjectLabels;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, {opacity: 0}, {opacity: 1, duration: 0.3}).fromTo(
      panelRef.current,
      {y: 50, opacity: 0, scale: 0.97},
      {y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out"},
      0.1
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
      style={{background: "rgba(3,3,10,0.92)", backdropFilter: "blur(16px)"}}
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
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="font-mono-custom text-[10px] tracking-[0.35em] mb-3 uppercase" style={{color: project.tagColor, opacity: 0.7}}>
                {labels.modalEyebrow.replace("{index}", project.index)}
              </div>
              <h2 className="text-3xl font-black mb-1.5" style={{letterSpacing: "-0.025em"}}>
                {project.title}
              </h2>
              <p className="text-sm" style={{color: "rgba(240,235,224,0.4)"}}>
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 transition-all duration-200 hover:rotate-90"
              style={{border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,235,224,0.4)"}}
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-[11px] font-mono-custom" style={{background: `${project.tagColor}10`, border: `1px solid ${project.tagColor}30`, color: project.tagColor}}>
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {project.stat.map((s) => (
              <div key={s.label} className="p-5 text-center" style={{border: "1px solid rgba(255,255,255,0.06)", background: `${project.tagColor}05`}}>
                <div className="text-2xl font-black mb-1.5" style={{color: project.tagColor}}>
                  {s.value}
                </div>
                <div className="font-mono-custom text-[9px] tracking-[0.25em] uppercase" style={{color: "rgba(240,235,224,0.25)"}}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <div className="font-mono-custom text-[10px] tracking-[0.35em] uppercase mb-4" style={{color: "rgba(240,235,224,0.25)"}}>
              {labels.pipelineLabel}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {project.pipeline.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 text-[11px] font-mono-custom" style={{border: "1px solid rgba(255,255,255,0.07)", color: "rgba(240,235,224,0.55)"}}>
                    {step}
                  </span>
                  {i < project.pipeline.length - 1 && <ChevronRight size={11} style={{color: "rgba(240,235,224,0.18)", flexShrink: 0}} />}
                </div>
              ))}
            </div>
          </div>

          {[
            {label: labels.detailLabels.challenge, key: "challenge" as const, dot: "#f87171"},
            {label: labels.detailLabels.process, key: "process" as const, dot: project.tagColor},
            {label: labels.detailLabels.outcome, key: "outcome" as const, dot: "#4ade80"},
          ].map(({label, key, dot}) => (
            <div key={key} className="mb-7">
              <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-[0.3em] uppercase mb-2.5" style={{color: dot}}>
                <div className="w-1.5 h-1.5 rounded-full" style={{background: dot}} />
                {label}
              </div>
              <p className="text-[13px] leading-relaxed" style={{color: "rgba(240,235,224,0.5)", lineHeight: "1.85"}}>
                {project.details[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  labels,
  onOpen,
}: {
  project: Project;
  labels: Pick<ProjectLabels, "cardCta" | "dataStatus">;
  onOpen: () => void;
}) {
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
      gsap.to(glowRef.current, {x: x - 160, y: y - 160, opacity: 1, duration: 0.35, ease: "power2.out"});
    }
    if (dataRef.current) {
      gsap.to(dataRef.current, {x: ((x - cx) / cx) * 14, y: ((y - cy) / cy) * 14, duration: 0.3, ease: "power2.out"});
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.5)"});
    if (glowRef.current) gsap.to(glowRef.current, {opacity: 0, duration: 0.4});
    if (dataRef.current) gsap.to(dataRef.current, {x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)"});
  };

  return (
    <div ref={cardRef} className="relative cursor-pointer" style={{transformStyle: "preserve-3d", perspective: "1000px"}} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onOpen} data-cursor>
      <div ref={glowRef} className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-0" style={{background: `radial-gradient(circle, ${project.tagColor}25 0%, transparent 70%)`, zIndex: 0, top: 0, left: 0}} />

      <div className="relative overflow-hidden transition-all duration-200 group" style={{border: "1px solid rgba(255,255,255,0.06)", background: "rgba(7,7,15,0.7)", backdropFilter: "blur(12px)", zIndex: 1, minHeight: "400px"}}>
        <div className="hud-tl" />
        <div className="hud-br" />

        <div ref={dataRef} className="absolute top-5 right-5 opacity-8 pointer-events-none text-right">
          <div className="font-mono-custom text-[9px]" style={{color: project.tagColor, opacity: 0.2}}>
            <div>PROJ.{project.index}</div>
            <div>{labels.dataStatus}</div>
          </div>
        </div>

        <div className="p-8 md:p-10 flex flex-col h-full" style={{minHeight: "400px"}}>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono-custom text-[10px] tracking-[0.45em]" style={{color: "rgba(240,235,224,0.15)"}}>
              {project.index}
            </span>
            <div className="p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{border: `1px solid ${project.tagColor}28`, color: project.tagColor}}>
              {project.icon}
            </div>
          </div>

          <h3 className="text-2xl font-black mb-1.5" style={{letterSpacing: "-0.025em"}}>
            {project.title}
          </h3>
          <p className="text-sm mb-5" style={{color: "rgba(240,235,224,0.3)"}}>
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono-custom px-2 py-0.5" style={{color: project.tagColor, opacity: 0.65, border: `1px solid ${project.tagColor}18`}}>
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[13px] leading-loose flex-1" style={{color: "rgba(240,235,224,0.4)", lineHeight: "1.8"}}>
            {project.summary}
          </p>

          <div className="flex items-center gap-2 mt-8 text-[11px] font-mono-custom tracking-wider transition-all duration-300" style={{color: project.tagColor, opacity: 0.7}}>
            <span>{labels.cardCta}</span>
            <ExternalLink size={11} />
          </div>
        </div>

        <div className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out" style={{background: `linear-gradient(90deg, transparent, ${project.tagColor}, transparent)`}} />
      </div>
    </div>
  );
}

export default function ProjectsSection({content}: {content: SiteContent["projects"]}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projects: Project[] = content.items.map((project) => ({
    ...project,
    tagColor: PROJECT_META[project.id].tagColor,
    icon: PROJECT_META[project.id].icon,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1.0, ease: "power4.out", scrollTrigger: {trigger: headerRef.current, start: "top 82%", once: true}});

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card-item");
        gsap.fromTo(cards, {opacity: 0, y: 80, scale: 0.94}, {opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power4.out", stagger: 0.18, scrollTrigger: {trigger: gridRef.current, start: "top 80%", once: true}});
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10" style={{padding: "8rem clamp(2rem, 8vw, 6rem) 10rem"}}>
      <div ref={headerRef} style={{opacity: 0, marginBottom: "5rem"}}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-14" style={{background: "linear-gradient(90deg, var(--accent-amber), transparent)"}} />
          <span className="font-mono-custom text-[10px] tracking-[0.45em] uppercase" style={{color: "var(--accent-amber)"}}>
            {content.eyebrow}
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black" style={{letterSpacing: "-0.04em"}}>
          {content.title}
        </h2>
        <p className="mt-4 text-sm" style={{color: "rgba(240,235,224,0.3)"}}>
          {content.intro}
        </p>
        <p className="mt-3 font-mono-custom" style={{fontSize: "11px", fontStyle: "italic", color: "rgba(232,160,48,0.38)", letterSpacing: "0.01em"}}>
          {content.aside}
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div key={project.id} className="project-card-item" style={{opacity: 0}}>
            <ProjectCard project={project} labels={content} onOpen={() => setActiveProject(project)} />
          </div>
        ))}
      </div>

      {activeProject && <ProjectModal project={activeProject} labels={content} onClose={() => setActiveProject(null)} />}
    </section>
  );
}
