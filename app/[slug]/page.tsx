import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { HeroSection } from "@/components/HeroSection";
import { SchemaScript } from "@/components/SchemaScript";
import { ServiceList } from "@/components/ServiceList";
import {
  getAreaLinks,
  getCtaCopy,
  getFaqItems,
  getIntroText,
  getPageContentBlocks,
  getRelatedServices
} from "@/data/content";
import { buildMetadata, getServiceBaseName } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  getPrimaryImagePath
} from "@/lib/schema";
import { BUSINESS_ADDRESS, EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_NUMBER } from "@/lib/site";
import { getAllValidSlugs, resolvePageData } from "@/lib/slug-resolver";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllValidSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageData = resolvePageData(params.slug);
  if (!pageData) {
    return {};
  }

  return buildMetadata(pageData);
}

function getPageTitle(slug: string) {
  const pageData = resolvePageData(slug);
  if (!pageData) {
    return null;
  }

  if (pageData.location.kind === "district") {
    return `${pageData.location.district.name} ${pageData.service.name}`;
  }

  if (pageData.location.kind === "city") {
    const serviceBase = getServiceBaseName(pageData.service.name);
    return `${pageData.location.city.name} ${serviceBase} Hizmeti`;
  }

  const serviceBase = getServiceBaseName(pageData.service.name);
  return `${serviceBase} Hizmeti`;
}

export default function DynamicSeoPage({ params }: PageProps) {
  const pageData = resolvePageData(params.slug);

  if (!pageData) {
    notFound();
  }

  const introText = getIntroText(pageData);
  const faqItems = getFaqItems(pageData);
  const relatedServices = getRelatedServices(pageData.service.slug);
  const contentBlocks = getPageContentBlocks(pageData);
  const areaLinks = getAreaLinks(pageData);
  const ctaCopy = getCtaCopy(pageData);
  const imagePath = getPrimaryImagePath(pageData);
  const title = getPageTitle(pageData.slug);
  const locationLine =
    pageData.location.kind === "district"
      ? `${pageData.location.district.name}, ${pageData.location.city.name} bölgesinde hizmet`
      : pageData.location.kind === "city"
        ? `${pageData.location.city.name} genelinde profesyonel destek`
        : "Uzman ekip ve planlı uygulama desteği";

  return (
    <main>
      <SchemaScript id="local-business-schema" schema={buildLocalBusinessSchema(pageData)} />
      <SchemaScript id="service-schema" schema={buildServiceSchema(pageData)} />
      <SchemaScript id="breadcrumb-schema" schema={buildBreadcrumbSchema(pageData)} />

      <HeroSection
        eyebrow="İç Mekan"
        title={title ?? pageData.service.name}
        locationLine={locationLine}
        description={introText}
        badges={[
          "Ücretsiz ön görüşme",
          "Hızlı dönüş",
          "Yerinde keşif"
        ]}
        actions={
          <>
            <a className="button" href={PHONE_HREF}>
              Hemen Ara
            </a>
            <Link className="button secondary" href="#iletisim">
              Teklif İste
            </Link>
            {pageData.location.kind === "district" ? (
              <Link
                className="button secondary"
                href={`/${pageData.location.city.slug}-${pageData.service.slug}`}
              >
                Şehir sayfası
              </Link>
            ) : null}
          </>
        }
        imagePath={imagePath}
        imageAlt={`${pageData.location.kind === "district"
          ? pageData.location.district.name
          : pageData.location.kind === "city"
            ? pageData.location.city.name
            : "Genel"} ${pageData.service.name} hizmeti`}
      />

      <section className="section">
        <div className="container grid two">
          <article className="card stack" style={{ padding: "1.5rem" }}>
            <p className="eyebrow" style={{ margin: 0 }}>
              Hizmet Detayı
            </p>
            <div className="prose">
              <p>{pageData.service.description}</p>
              <p>{introText}</p>
              <p>
                Uygulama öncesinde ihtiyaç netleştirilir, mümkünse keşif yapılır ve iş planı buna göre
                oluşturulur. Böylece hem süre hem de maliyet tarafında daha sağlıklı bir süreç yürütülür.
              </p>
            </div>
          </article>

          <aside className="card stack" style={{ padding: "1.5rem" }}>
            <p className="eyebrow" style={{ margin: 0 }}>
              Neden İç Mekan?
            </p>
            <div className="stack">
              <span className="pill">Temiz ve düzenli çalışma</span>
              <span className="pill">Bölgeye uygun planlama</span>
              <span className="pill">Telefonla hızlı bilgilendirme</span>
              <span className="pill">İhtiyaca göre keşif desteği</span>
            </div>
          </aside>
        </div>
      </section>

      {contentBlocks.length > 0 ? (
        <section className="section">
          <div className="container stack">
            <div>
              <p className="eyebrow" style={{ margin: 0 }}>
                Alçıpan Uygulamaları
              </p>
              <h2 style={{ marginBottom: "0.5rem" }}>
                {title} için öne çıkan işler ve kullanım alanları
              </h2>
            </div>
            <div className="grid three">
              {contentBlocks.map((block) => (
                <article key={block.title} className="card stack" style={{ padding: "1.25rem" }}>
                  <h3 style={{ margin: 0 }}>{block.title}</h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {areaLinks.length > 0 ? (
        <section className="section">
          <div className="container">
            <div className="card stack" style={{ padding: "1.5rem" }}>
              <p className="eyebrow" style={{ margin: 0 }}>
                Yakın Bölgeler
              </p>
              <h2 style={{ margin: 0 }}>
                {pageData.location.kind === "city"
                  ? "İstanbul'da öne çıkan alçıpan bölgeleri"
                  : "İstanbul alçıpan sayfalarında devam edin"}
              </h2>
              <div className="grid two">
                {areaLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="pill"
                    style={{ justifyContent: "space-between" }}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="card grid two" style={{ padding: "1.5rem", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow" style={{ margin: 0 }}>
                Bölgenize Uygun Hizmet
              </p>
              <h2 style={{ margin: 0 }}>{title} için planlı ilerleme</h2>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                Her işin kapsamı farklı olduğu için kullanılacak malzeme, süre ve uygulama şekli keşif
                sonrasında netleştirilir. Amaç yalnızca işi tamamlamak değil, alanı uzun süre sorunsuz
                kullanabileceğiniz bir sonuç ortaya çıkarmaktır.
              </p>
            </div>

            <div className="stack">
              <span className="pill">Telefon: {PHONE_NUMBER}</span>
              <span className="pill">Konum: {locationLine}</span>
              <span className="pill">Randevu ve ön bilgi için hızlı dönüş</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="iletisim">
        <div className="container">
          <div className="card grid two" style={{ padding: "1.5rem", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow" style={{ margin: 0 }}>
                İletişim
              </p>
              <h2 style={{ margin: 0 }}>Teklif ve randevu için hemen ulaşın</h2>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                Yapılacak işi kısaca anlattığınızda size uygun zamanlama, ön bilgi ve gerekiyorsa keşif
                planlaması hakkında hızlıca dönüş yapılır.
              </p>
            </div>
            <div className="stack">
              <a className="button" href={PHONE_HREF}>
                {PHONE_NUMBER}
              </a>
              <a className="button secondary" href={EMAIL_HREF}>
                {EMAIL}
              </a>
              <span className="pill">
                {BUSINESS_ADDRESS.streetAddress}, {BUSINESS_ADDRESS.addressLocality}
              </span>
            </div>
          </div>
        </div>
      </section>

      <ServiceList
        title="İhtiyacınıza yakın diğer hizmetler"
        description="Aynı bölgede ihtiyaç duyabileceğiniz diğer hizmetleri de inceleyebilirsiniz."
        services={relatedServices}
        hrefBuilder={(service) => {
          if (pageData.location.kind === "district" && service.hasDistrictPages) {
            return `/${pageData.location.district.slug}-${service.slug}`;
          }

          if (pageData.location.kind === "district" && service.hasCityPages) {
            return `/${pageData.location.city.slug}-${service.slug}`;
          }

          if (pageData.location.kind === "city" && service.hasCityPages) {
            return `/${pageData.location.city.slug}-${service.slug}`;
          }

          return `/${service.slug}`;
        }}
      />

      <FAQSection title={`${title ?? pageData.service.name} hakkında sorular`} items={faqItems} />

      <CTASection
        title={ctaCopy?.title ?? "İşi ertelemeden doğru planla başlamak daha kolay"}
        description={
          ctaCopy?.description ??
          "Bulunduğunuz bölgeyi ve ihtiyacınızı paylaşın; uygun ekip, yaklaşık süreç ve ilk yönlendirme için hızlıca bilgi verelim."
        }
        primaryLabel={ctaCopy?.primaryLabel ?? "Telefonla Bilgi Al"}
        primaryHref={ctaCopy?.primaryHref ?? PHONE_HREF}
        secondaryLabel="Ana Sayfaya Dön"
        secondaryHref="/"
      />
    </main>
  );
}
