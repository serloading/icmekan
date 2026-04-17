import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: CTASectionProps) {
  return (
    <section className="section">
      <div className="container">
        <div
          className="card"
          style={{
            padding: "2rem",
            background:
              "linear-gradient(135deg, rgba(123,66,23,0.95) 0%, rgba(162,95,43,0.92) 55%, rgba(203,149,97,0.9) 100%)",
            color: "#fff8f1"
          }}
        >
          <div className="stack">
            <p className="eyebrow" style={{ margin: 0, color: "#ffe7d2" }}>
              Hızlı İletişim
            </p>
            <h2 style={{ margin: 0 }}>{title}</h2>
            <p style={{ margin: 0, lineHeight: 1.7, maxWidth: "65ch" }}>{description}</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {primaryHref.startsWith("tel:") || primaryHref.startsWith("mailto:") ? (
                <a className="button" href={primaryHref}>
                  {primaryLabel}
                </a>
              ) : (
                <Link className="button" href={primaryHref}>
                  {primaryLabel}
                </Link>
              )}
              {secondaryLabel && secondaryHref ? (
                secondaryHref.startsWith("tel:") || secondaryHref.startsWith("mailto:") ? (
                  <a
                    className="button secondary"
                    href={secondaryHref}
                    style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff8f1" }}
                  >
                    {secondaryLabel}
                  </a>
                ) : (
                  <Link
                    className="button secondary"
                    href={secondaryHref}
                    style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff8f1" }}
                  >
                    {secondaryLabel}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
