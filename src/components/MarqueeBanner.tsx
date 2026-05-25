"use client";

const PHRASES = [
  "Ingénieux le jour, codeur la nuit, fatigué le reste du temps.",
  "Mon super-pouvoir ? Passer 48h d'affilée sur un projet pour économiser un achat à 15€ sur Amazon.",
  "J'adore automatiser les tâches de 5 minutes. Ça ne me prend généralement que 3 semaines de développement.",
];

const SEP = "◈";

/* Build one full pass of content */
const ITEMS = [...PHRASES, ...PHRASES, ...PHRASES]; // triple for smooth infinite

export default function MarqueeBanner() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "14px 0",
        background: "rgba(232,160,48,0.022)",
      }}
      aria-hidden
    >
      {/* Fade masks on edges */}
      <div
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "120px",
          background: "linear-gradient(90deg, var(--bg-primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: "120px",
          background: "linear-gradient(-90deg, var(--bg-primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Track — duplicated for seamless loop */}
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee-scroll 55s linear infinite",
          willChange: "transform",
        }}
      >
        {[0, 1].map((pass) => (
          <div key={pass} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            {ITEMS.map((phrase, i) => (
              <span key={`${pass}-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "'SF Mono','Fira Code',monospace",
                    fontSize: "11px",
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.38)",
                    padding: "0 32px",
                  }}
                >
                  {phrase}
                </span>
                <span
                  style={{
                    color: "#e8a030",
                    opacity: 0.5,
                    fontSize: "9px",
                    flexShrink: 0,
                  }}
                >
                  {SEP}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
