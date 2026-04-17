import type { ReactNode } from "react";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  locationLine?: string;
  badges?: string[];
  actions?: ReactNode;
  imagePath?: string;
  imageAlt?: string;
};

export function HeroSection({
  eyebrow,
  title,
  description,
  locationLine,
  badges = [],
  actions,
  imagePath,
  imageAlt
}: HeroSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <div
          className="card"
          style={{
            padding: "2rem",
            overflow: "hidden",
            background:
              "linear-gradient(145deg, rgba(255,253,248,0.98) 0%, rgba(240,230,215,0.92) 100%)"
          }}
        >
          <div className="grid two" style={{ alignItems: "center", gap: "2rem" }}>
            <div className="stack">
              <p className="eyebrow" style={{ margin: 0 }}>
                {eyebrow}
              </p>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(2.3rem, 5vw, 4.75rem)",
                  lineHeight: 0.98
                }}
              >
                {title}
              </h1>
              {locationLine ? (
                <p style={{ margin: 0, fontWeight: 700, color: "var(--accent-strong)" }}>{locationLine}</p>
              ) : null}
              <p className="muted" style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.7 }}>
                {description}
              </p>
              {badges.length > 0 ? (
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                  {badges.map((badge) => (
                    <span key={badge} className="pill">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
              {actions ? <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>{actions}</div> : null}
            </div>
            {imagePath ? (
              <div className="card" style={{ overflow: "hidden" }}>
                <img
                  src={imagePath}
                  alt={imageAlt ?? title}
                  style={{ width: "100%", height: "100%", minHeight: "320px", objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
