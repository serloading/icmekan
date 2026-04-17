import type { ResolvedPageData } from "@/lib/types";
import { getServiceBaseName } from "@/lib/seo";
import { BUSINESS_ADDRESS, PHONE_NUMBER, SITE_NAME, SITE_URL } from "@/lib/site";

function getPostalAddress(pageData: ResolvedPageData) {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_ADDRESS.streetAddress,
    addressCountry: BUSINESS_ADDRESS.addressCountry,
    addressRegion: BUSINESS_ADDRESS.addressRegion,
    addressLocality: BUSINESS_ADDRESS.addressLocality
  };
}

function getAreaServed(pageData: ResolvedPageData) {
  if (pageData.location.kind === "district") {
    return `${pageData.location.district.name}, ${pageData.location.city.name}`;
  }

  if (pageData.location.kind === "city") {
    return pageData.location.city.name;
  }

  return "Türkiye";
}

function getPageTitle(pageData: ResolvedPageData) {
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

export function buildLocalBusinessSchema(pageData: ResolvedPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: `${SITE_URL}/${pageData.slug}`,
    areaServed: getAreaServed(pageData),
    description: pageData.service.description,
    image: `${SITE_URL}${getPrimaryImagePath(pageData)}`,
    telephone: PHONE_NUMBER,
    address: getPostalAddress(pageData)
  };
}

export function buildServiceSchema(pageData: ResolvedPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: getPageTitle(pageData),
    serviceType: pageData.service.name,
    areaServed: getAreaServed(pageData),
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: PHONE_NUMBER,
      address: getPostalAddress(pageData)
    },
    description: pageData.service.description,
    url: `${SITE_URL}/${pageData.slug}`
  };
}

export function buildBreadcrumbSchema(pageData: ResolvedPageData) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: SITE_URL
    }
  ];

  if (pageData.location.kind === "none") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: pageData.service.name,
      item: `${SITE_URL}/${pageData.slug}`
    });
  }

  if (pageData.location.kind === "city") {
    items.push(
      {
        "@type": "ListItem",
        position: 2,
        name: pageData.service.name,
        item: `${SITE_URL}/${pageData.service.slug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageData.location.city.name,
        item: `${SITE_URL}/${pageData.slug}`
      }
    );
  }

  if (pageData.location.kind === "district") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: pageData.service.name,
      item: `${SITE_URL}/${pageData.service.slug}`
    });
    items.push({
      "@type": "ListItem",
      position: 3,
      name: pageData.location.city.name,
      item: `${SITE_URL}/${pageData.location.city.slug}-${pageData.service.slug}`
    });
    items.push({
      "@type": "ListItem",
      position: 4,
      name: pageData.location.district.name,
      item: `${SITE_URL}/${pageData.slug}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  };
}

export function getPrimaryImagePath(pageData: ResolvedPageData) {
  const locationSlug =
    pageData.location.kind === "district"
      ? pageData.location.district.slug
      : pageData.location.kind === "city"
        ? pageData.location.city.slug
        : "genel";

  return `/images/${pageData.service.slug}/${locationSlug}/${pageData.service.slug}-${locationSlug}-${pageData.service.imageType}.webp`;
}
