import type {Locale} from "@/i18n/routing";

export type BadgeGroupContent = {
  key: "elec" | "fab" | "soft";
  label: string;
  items: string[];
};

export type ProjectContent = {
  id: "axionpad" | "cnc" | "tipe";
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  pipeline: string[];
  details: {challenge: string; process: string; outcome: string};
  stat: {label: string; value: string}[];
};

export type ExpertiseContent = {
  id: "fdm" | "sla" | "laser";
  title: string;
  pct: number;
  items: string[];
};

export type LogEntryContent = {
  id: string;
  ts: string;
  level: "ERROR" | "WARN" | "INFO" | "OK";
  sys: string;
  msg: string;
  fix?: string;
};

export type SiteContent = {
  locale: Locale;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    languageLabel: string;
    switchTo: string;
  };
  sectionDividers: {
    projects: string;
    atelier: string;
  };
  hero: {
    status: string;
    subtitle: string;
    bio: string;
    aside: string;
    primaryCta: string;
    secondaryCta: string;
    badges: BadgeGroupContent[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    aside: string;
    modalEyebrow: string;
    pipelineLabel: string;
    detailLabels: {
      challenge: string;
      process: string;
      outcome: string;
    };
    cardCta: string;
    dataStatus: string;
    items: ProjectContent[];
  };
  atelier: {
    eyebrow: string;
    title: string;
    intro: string;
    stackLabel: string;
    logsLabel: string;
    terminalCommand: string;
    terminalAside: string;
    resolutionLabel: string;
    entriesLabel: string;
    clickHint: string;
    expertise: ExpertiseContent[];
    logs: LogEntryContent[];
  };
  footer: {
    eyebrow: string;
    title: string;
    intro: string;
    aside: string;
    tagline: string;
    version: string;
  };
};

const fr: SiteContent = {
  locale: "fr",
  metadata: {
    title: "Arthur Delacour - Ingénieur Créatif",
    description:
      "Portfolio d'Arthur Delacour - Projets ingénierie, hardware, PCB, fabrication numérique et développement logiciel.",
    keywords: ["PCB", "RP2040", "Next.js", "Impression 3D", "CNC", "Ingénieur"],
  },
  nav: {
    languageLabel: "Langue",
    switchTo: "EN",
  },
  sectionDividers: {
    projects: "RÉALISATIONS // 001 -> 003",
    atelier: "L'ATELIER // FABRICATION & DEBUG LOGS",
  },
  hero: {
    status: "Disponible pour projets",
    subtitle: "Ingénierie · Hardware · Fabrication Numérique",
    bio:
      "Étudiant en sciences de l'ingénieur passionné par la CAO, le routage de PCB, le développement de solutions logicielles sur mesure et la fabrication numérique industrielle et personnelle.",
    aside: "— Ingénieux le jour, codeur la nuit, fatigué le reste du temps.",
    primaryCta: "Explorer l'Atelier",
    secondaryCta: "Contact",
    badges: [
      {
        key: "elec",
        label: "Electronics & CAD",
        items: ["EasyEDA", "Routage PCB", "RP2040", "Arduino"],
      },
      {
        key: "fab",
        label: "Fabrication Numérique",
        items: ["FDM — 8 ans", "Bambu Lab A1", "PLA · ABS · PETG", "SLA Bases", "Découpe Laser"],
      },
      {
        key: "soft",
        label: "Software",
        items: ["Python", "Next.js", "React", "Tailwind CSS", "Java"],
      },
    ],
  },
  projects: {
    eyebrow: "RÉALISATIONS",
    title: "La Vitrine",
    intro: "Cliquez sur un projet pour déployer l'étude de cas complète.",
    aside:
      "— Mon super-pouvoir ? Passer 48h d'affilée sur un projet pour économiser un achat à 15€ sur Amazon.",
    modalEyebrow: "PROJET {index} — ÉTUDE DE CAS",
    pipelineLabel: "PIPELINE",
    detailLabels: {
      challenge: "LE DÉFI",
      process: "PROCESSUS",
      outcome: "RÉSULTAT",
    },
    cardCta: "VOIR L'ÉTUDE DE CAS",
    dataStatus: "STATUS: COMPLETE",
    items: [
      {
        id: "axionpad",
        index: "001",
        title: "L'Axion Pad",
        subtitle: "Macro-pad Custom Open-Source",
        tags: ["#Hardware", "#PCBDesign", "#RP2040", "#NextJS"],
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
            "Produit commercial fonctionnel, site e-commerce Next.js, documentation open-source complète. 0 retour défectueux.",
        },
        stat: [
          {label: "Révisions PCB", value: "3"},
          {label: "Switches testés", value: "12+"},
          {label: "Stack", value: "5 tech"},
        ],
      },
      {
        id: "cnc",
        index: "002",
        title: "Projet CNC",
        subtitle: "Prototype de machine-outil à commande numérique",
        tags: ["#CNC", "#GRBL", "#Arduino", "#Conception3D"],
        summary:
          "Étude, modélisation et assemblage d'un prototype CNC. La première architecture Arduino Uno R3 + shield GRBL s'est révélée trop limitée, ce qui a déclenché une refonte du système de contrôle.",
        pipeline: [
          "Analyse cinématique",
          "Modélisation CAO",
          "Montage Arduino Uno R3 + shield",
          "Tests GRBL",
          "Refonte système à définir",
        ],
        details: {
          challenge:
            "Construire une base mécanique CNC exploitable avec un budget limité, puis trouver une électronique de contrôle capable de suivre les besoins réels de pilotage, de réglage et d'évolution.",
          process:
            "La première version a été montée autour d'un Arduino Uno R3 avec shield CNC et GRBL. Les essais ont permis de valider une partie de la mécanique et du câblage, mais les performances et la marge de contrôle étaient insuffisantes pour continuer proprement sur cette base.",
          outcome:
            "Projet volontairement mis en pause côté contrôle : la prochaine étape est de choisir une nouvelle architecture, probablement plus moderne et plus évolutive, avant de poursuivre les tests de performance.",
        },
        stat: [
          {label: "Statut", value: "Refonte"},
          {label: "Contrôle V1", value: "GRBL"},
          {label: "Carte V1", value: "Uno R3"},
        ],
      },
      {
        id: "tipe",
        index: "003",
        title: "TIPE — Nervure d'aile",
        subtitle: "Optimisation topologique pour impression 3D",
        tags: ["#Python", "#FEM", "#SIMP", "#Impression3D"],
        summary:
          "TIPE en cours sur l'optimisation topologique d'une nervure d'aile imprimée en 3D : modélisation éléments finis, méthode SIMP, puis confrontation entre prédiction numérique et pièce réellement fabriquée.",
        pipeline: [
          "Cadrage du sujet",
          "FEM 2D contraintes planes",
          "Optimisation SIMP",
          "Conversion STL",
          "Essais flexion 3 points",
        ],
        details: {
          challenge:
            "Optimiser la répartition de matière dans une nervure d'aile à masse fixée, tout en gardant une pièce fabricable en impression 3D PLA et testable expérimentalement.",
          process:
            "Le sujet est cadré autour d'une FEM 2D en contraintes planes et d'une boucle SIMP. Le travail actuel porte sur la compréhension théorique, la validation du solveur FEM sur cas analytique, puis l'application à une nervure de corde 200 mm avant export STL et impression.",
          outcome:
            "Projet en cours : la théorie FEM/SIMP est structurée, le périmètre est fixé, et la suite consiste à coder le solveur, valider les résultats numériques puis mesurer l'écart entre modèle et pièce imprimée.",
        },
        stat: [
          {label: "Statut", value: "En cours"},
          {label: "Méthode", value: "SIMP"},
          {label: "Stack", value: "Python"},
        ],
      },
    ],
  },
  atelier: {
    eyebrow: "EXPERTISE & CYCLE",
    title: "L'Atelier",
    intro: "Diagnostiquer précisément — Corriger méthodiquement — Documenter systématiquement.",
    stackLabel: "STACK FABRICATION",
    logsLabel: "LOGS TECHNIQUES — INCIDENTS RÉELS",
    terminalCommand: "arthur@atelier:~/debug$ tail -f incidents.log",
    terminalAside: "# J'adore automatiser les tâches de 5 min — ça ne me prend que 3 semaines.",
    resolutionLabel: "RÉSOLUTION :",
    entriesLabel: "entrées",
    clickHint: "Clic pour voir les résolutions",
    expertise: [
      {
        id: "fdm",
        title: "Impression FDM — 8 ans d'expertise",
        pct: 95,
        items: [
          "Bambu Lab A1 — machine principale",
          "Paramétrages avancés multi-matériaux",
          "Entretien complet (nozzle, axes, extrudeur)",
          "PLA · ABS · PETG · TPU — maîtrisés",
          "Tolérances mécaniques ±0.1–0.2mm",
        ],
      },
      {
        id: "sla",
        title: "Impression SLA — Bases acquises",
        pct: 35,
        items: [
          "Photopolymérisation UV",
          "Calibration d'exposition",
          "Post-traitement IPA + cure UV",
          "Résines standard testées",
        ],
      },
      {
        id: "laser",
        title: "Découpe Laser — Notions",
        pct: 25,
        items: [
          "Découpe vectorielle contreplaqué/acrylique",
          "Réglages puissance/vitesse",
          "Essais en atelier partagé",
        ],
      },
    ],
    logs: [
      {
        id: "l1",
        ts: "2023-11-14 09:32:17",
        level: "ERROR",
        sys: "AXIONPAD_V1",
        msg: "Court-circuit rail 3.3V — résistance mesurée : 0.2Ω VCC→GND",
        fix: "Trace 0.1mm trop fine → pont thermique sous soudure. Fix : trace 0.3mm, clearance 0.15mm. Validation à 3.35V stable.",
      },
      {
        id: "l2",
        ts: "2023-12-02 14:18:55",
        level: "WARN",
        sys: "FDM_BOITIER_V1",
        msg: "Warping sévère ABS 110°C — délaminage couches 3-7, déformation >2mm",
        fix: "Bed 90°C insuffisant, périmètre 60mm/s trop rapide. Fix : enclosure fermée, bed 110°C, périmètre 30mm/s, brim 8mm. Résultat : planéité <0.15mm.",
      },
      {
        id: "l3",
        ts: "2024-01-08 11:05:41",
        level: "ERROR",
        sys: "CNC_V1",
        msg: "Répétabilité axe X hors spec : drift +0.8mm après 50 passes — courroie GT2 slip",
        fix: "Tension courroie 42Hz (spec 65Hz, méthode Gates). Réglage +8 dents, contre-écrous M5. Répétabilité post-fix : ±0.08mm/200 passes.",
      },
      {
        id: "l4",
        ts: "2024-02-19 16:44:22",
        level: "WARN",
        sys: "RP2040_FW",
        msg: "USB HID latency spike 8ms→45ms sous charge — interrupt starving core0",
        fix: "RGB bloquait core0. Migration vers core1 (multicore RP2040). Latency stable 7-9ms. Commit : fw-v1.2.0.",
      },
      {
        id: "l5",
        ts: "2024-03-30 10:12:08",
        level: "INFO",
        sys: "TIPE_ALGO",
        msg: "Convergence oscillatoire Physarum iter 3000-3500 — oscillation conductance ±12%",
        fix: "Tuning γ 1.8→1.4, ajout μ_decay=0.0001/iter. Convergence stable iter 2800, δ<0.001.",
      },
      {
        id: "l6",
        ts: "2024-05-15 08:55:31",
        level: "OK",
        sys: "SLA_TEST_01",
        msg: "Première pièce SLA réussie — couche 0.05mm, trace circuit imprimée nette",
        fix: "Calibration : 2.0s/couche, 6.0s fond, anti-aliasing activé. Surface finale sans post-traitement.",
      },
    ],
  },
  footer: {
    eyebrow: "CONTACT",
    title: "Travaillons ensemble.",
    intro: "Projet hardware, logiciel, fabrication numérique — si c'est intéressant, je suis disponible.",
    aside:
      "Installez-vous confortablement et explorez — garantis avec beaucoup d'enthousiasme, un peu de scotch, et beaucoup de passion.",
    tagline: "Ingénierie · Hardware · Fabrication Numérique · Software",
    version: "PORTFOLIO v2.0 · NEXT.JS 16",
  },
};

const en: SiteContent = {
  ...fr,
  locale: "en",
  metadata: {
    title: "Arthur Delacour - Creative Engineer",
    description:
      "Arthur Delacour's portfolio - Engineering, hardware, PCB, digital fabrication and software projects.",
    keywords: ["PCB", "RP2040", "Next.js", "3D Printing", "CNC", "Engineer"],
  },
  nav: {
    languageLabel: "Language",
    switchTo: "FR",
  },
  sectionDividers: {
    projects: "PROJECTS // 001 -> 003",
    atelier: "WORKSHOP // FABRICATION & DEBUG LOGS",
  },
  hero: {
    status: "Available for projects",
    subtitle: "Engineering · Hardware · Digital Fabrication",
    bio:
      "Engineering sciences student focused on CAD, PCB routing, custom software development, and both industrial and personal digital fabrication.",
    aside: "— Inventive by day, coding by night, tired the rest of the time.",
    primaryCta: "Explore the Workshop",
    secondaryCta: "Contact",
    badges: [
      {
        key: "elec",
        label: "Electronics & CAD",
        items: ["EasyEDA", "PCB routing", "RP2040", "Arduino"],
      },
      {
        key: "fab",
        label: "Digital Fabrication",
        items: ["FDM — 8 years", "Bambu Lab A1", "PLA · ABS · PETG", "SLA basics", "Laser cutting"],
      },
      {
        key: "soft",
        label: "Software",
        items: ["Python", "Next.js", "React", "Tailwind CSS", "Java"],
      },
    ],
  },
  projects: {
    ...fr.projects,
    eyebrow: "PROJECTS",
    title: "The Showcase",
    intro: "Click a project to open the full case study.",
    aside:
      "— My superpower? Spending 48 hours on a project to save a 15€ Amazon purchase.",
    modalEyebrow: "PROJECT {index} — CASE STUDY",
    detailLabels: {
      challenge: "THE CHALLENGE",
      process: "PROCESS",
      outcome: "OUTCOME",
    },
    cardCta: "OPEN CASE STUDY",
    items: [
      {
        ...fr.projects.items[0],
        title: "The Axion Pad",
        subtitle: "Custom Open-Source Macro Pad",
        summary:
          "Independent electronic design of an open-source macro-pad device — from EasyEDA schematic to the axionpad.fr e-commerce site.",
        pipeline: [
          "EasyEDA schematic",
          "0.15mm PCB routing",
          "FDM ABS enclosure ±0.2mm",
          "RP2040 firmware",
          "axionpad.fr site",
        ],
        details: {
          challenge:
            "Design a production-ready PCB — ground planes, USB differential routing, and mechanical tolerances between enclosure and PCB.",
          process:
            "V1: 3.3V rail short detected with a multimeter (0.2Ω resistance VCC→GND). Trace too thin (0.1mm). V2: trace redrawn at 0.3mm, 0.15mm clearance, improved ground plane. Stable 3.35V validation. Every switch tested with CircuitPython firmware before assembly.",
          outcome:
            "Functional commercial product, Next.js e-commerce site, complete open-source documentation. 0 defective returns.",
        },
        stat: [
          {label: "PCB revisions", value: "3"},
          {label: "Switches tested", value: "12+"},
          {label: "Stack", value: "5 tech"},
        ],
      },
      {
        ...fr.projects.items[1],
        title: "CNC Project",
        subtitle: "CNC machine prototype",
        tags: ["#CNC", "#GRBL", "#Arduino", "#3DDesign"],
        summary:
          "Study, modeling and assembly of a CNC prototype. The first Arduino Uno R3 + GRBL shield architecture proved too limited, triggering a redesign of the control system.",
        pipeline: [
          "Kinematic analysis",
          "CAD modeling",
          "Arduino Uno R3 + shield setup",
          "GRBL testing",
          "Control redesign TBD",
        ],
        details: {
          challenge:
            "Build a usable CNC mechanical base on a limited budget, then find a control stack capable of meeting the real needs for tuning, motion control and future upgrades.",
          process:
            "The first version used an Arduino Uno R3 with a CNC shield and GRBL. Testing validated part of the mechanical build and wiring, but the performance and control headroom were not good enough to continue cleanly on that architecture.",
          outcome:
            "The project is intentionally paused on the control side: the next step is choosing a newer, more scalable architecture before continuing performance testing.",
        },
        stat: [
          {label: "Status", value: "Redesign"},
          {label: "V1 control", value: "GRBL"},
          {label: "V1 board", value: "Uno R3"},
        ],
      },
      {
        ...fr.projects.items[2],
        title: "TIPE — Wing rib",
        subtitle: "Topology optimization for 3D printing",
        tags: ["#Python", "#FEM", "#SIMP", "#3DPrinting"],
        summary:
          "Ongoing TIPE project on the topology optimization of a 3D-printed wing rib: finite element modeling, SIMP optimization, then comparison between numerical prediction and the real printed part.",
        pipeline: [
          "Project framing",
          "2D plane-stress FEM",
          "SIMP optimization",
          "STL conversion",
          "3-point bending tests",
        ],
        details: {
          challenge:
            "Optimize material distribution inside a wing rib at fixed mass, while keeping the part printable in PLA and suitable for experimental testing.",
          process:
            "The project is framed around a 2D plane-stress FEM solver and a SIMP loop. Current work focuses on theory, validating the FEM solver on analytical cases, then applying it to a 200 mm chord rib before STL export and printing.",
          outcome:
            "Work in progress: the FEM/SIMP theory and scope are structured, and the next steps are coding the solver, validating numerical results and measuring the gap between model and printed part.",
        },
        stat: [
          {label: "Status", value: "Ongoing"},
          {label: "Method", value: "SIMP"},
          {label: "Stack", value: "Python"},
        ],
      },
    ],
  },
  atelier: {
    ...fr.atelier,
    eyebrow: "EXPERTISE & CYCLE",
    title: "The Workshop",
    intro: "Diagnose precisely — Fix methodically — Document systematically.",
    stackLabel: "FABRICATION STACK",
    logsLabel: "TECHNICAL LOGS — REAL INCIDENTS",
    terminalAside: "# I love automating 5-minute tasks — it only takes me 3 weeks.",
    resolutionLabel: "RESOLUTION:",
    entriesLabel: "entries",
    clickHint: "Click to view resolutions",
    expertise: [
      {
        id: "fdm",
        title: "FDM printing — 8 years of experience",
        pct: 95,
        items: [
          "Bambu Lab A1 — main machine",
          "Advanced multi-material tuning",
          "Full maintenance (nozzle, axes, extruder)",
          "PLA · ABS · PETG · TPU — mastered",
          "Mechanical tolerances ±0.1–0.2mm",
        ],
      },
      {
        id: "sla",
        title: "SLA printing — Core basics",
        pct: 35,
        items: [
          "UV photopolymerization",
          "Exposure calibration",
          "IPA post-processing + UV curing",
          "Standard resins tested",
        ],
      },
      {
        id: "laser",
        title: "Laser cutting — Working knowledge",
        pct: 25,
        items: [
          "Vector cutting plywood/acrylic",
          "Power/speed tuning",
          "Shared workshop trials",
        ],
      },
    ],
    logs: [
      {
        ...fr.atelier.logs[0],
        msg: "3.3V rail short — measured resistance: 0.2Ω VCC→GND",
        fix: "0.1mm trace too thin → solder thermal bridge. Fix: 0.3mm trace, 0.15mm clearance. Validated stable at 3.35V.",
      },
      {
        ...fr.atelier.logs[1],
        msg: "Severe ABS warping at 110°C — layer delamination 3-7, deformation >2mm",
        fix: "90°C bed too low, 60mm/s perimeter too fast. Fix: closed enclosure, 110°C bed, 30mm/s perimeter, 8mm brim. Result: flatness <0.15mm.",
      },
      {
        ...fr.atelier.logs[2],
        msg: "X-axis repeatability out of spec: +0.8mm drift after 50 passes — GT2 belt slip",
        fix: "Belt tension 42Hz (65Hz spec, Gates method). Adjustment +8 teeth, M5 lock nuts. Post-fix repeatability: ±0.08mm/200 passes.",
      },
      {
        ...fr.atelier.logs[3],
        msg: "USB HID latency spike 8ms→45ms under load — interrupt starving core0",
        fix: "RGB blocked core0. Moved to core1 (RP2040 multicore). Stable 7-9ms latency. Commit: fw-v1.2.0.",
      },
      {
        ...fr.atelier.logs[4],
        msg: "Oscillating Physarum convergence iter 3000-3500 — conductance oscillation ±12%",
        fix: "Tuned γ 1.8→1.4, added μ_decay=0.0001/iter. Stable convergence at iter 2800, δ<0.001.",
      },
      {
        ...fr.atelier.logs[5],
        msg: "First successful SLA part — 0.05mm layer, clean printed circuit trace",
        fix: "Calibration: 2.0s/layer, 6.0s base, anti-aliasing enabled. Final surface without post-processing.",
      },
    ],
  },
  footer: {
    eyebrow: "CONTACT",
    title: "Let's work together.",
    intro: "Hardware, software, digital fabrication — if it's interesting, I'm available.",
    aside:
      "Settle in and explore — guaranteed with a lot of enthusiasm, a little tape, and plenty of passion.",
    tagline: "Engineering · Hardware · Digital Fabrication · Software",
    version: "PORTFOLIO v2.0 · NEXT.JS 16",
  },
};

export const siteContent = {fr, en} satisfies Record<Locale, SiteContent>;
