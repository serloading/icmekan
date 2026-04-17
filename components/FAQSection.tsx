import type { FaqItem } from "@/lib/types";

type FAQSectionProps = {
  title: string;
  items: FaqItem[];
};

export function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <section className="section">
      <div className="container stack">
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>
            Sık Sorulanlar
          </p>
          <h2 style={{ marginBottom: 0 }}>{title}</h2>
        </div>

        <div className="grid two">
          {items.map((item) => (
            <details key={item.question} className="card" style={{ padding: "1.25rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>{item.question}</summary>
              <p className="muted" style={{ margin: "0.9rem 0 0", lineHeight: 1.7 }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
