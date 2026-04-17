import Link from "next/link";
import type { Service } from "@/lib/types";

type ServiceListProps = {
  title: string;
  description: string;
  services: Service[];
  hrefBuilder: (service: Service) => string;
};

export function ServiceList({
  title,
  description,
  services,
  hrefBuilder
}: ServiceListProps) {
  return (
    <section className="section">
      <div className="container stack">
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>
            Diğer Hizmetler
          </p>
          <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {description}
          </p>
        </div>

        <div className="grid three">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={hrefBuilder(service)}
              className="card"
              style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}
            >
              <span className="pill" style={{ width: "fit-content" }}>
                {service.category}
              </span>
              <strong>{service.name}</strong>
              <span className="muted" style={{ lineHeight: 1.6 }}>
                {service.description}
              </span>
              <span style={{ fontWeight: 700 }}>Detayları incele →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
