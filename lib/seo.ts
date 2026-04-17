import type { Metadata } from "next";
import type { ResolvedPageData } from "@/lib/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function getServiceBaseName(serviceName: string) {
  return serviceName.replace(/\s+Ustası$/u, "").replace(/\s+Ustasi$/u, "");
}

function getPageLabel(pageData: ResolvedPageData) {
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

export function getCanonicalUrl(slug: string) {
  return `${SITE_URL}/${slug}`;
}

export function buildMetadata(pageData: ResolvedPageData): Metadata {
  const pageLabel = getPageLabel(pageData);
  const canonical = getCanonicalUrl(pageData.slug);
  const title = pageLabel;
  const description =
    pageData.location.kind === "district"
      ? `${pageData.location.district.name} bölgesinde ${pageData.service.name.toLocaleLowerCase("tr-TR")} ihtiyacı için hızlı dönüş, yerinde keşif ve temiz işçilik odaklı hizmet alın.`
      : pageData.location.kind === "city"
        ? `${pageData.location.city.name} genelinde ${pageData.service.name.toLocaleLowerCase("tr-TR")} hizmeti için keşif, fiyat bilgisi ve planlı uygulama desteği alın.`
        : `${pageData.service.name} için hızlı dönüş, keşif planlaması ve ihtiyaca uygun uygulama desteği alın.`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: SITE_NAME
    }
  };
}
