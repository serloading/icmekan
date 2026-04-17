import { cities, citiesBySlug, districts } from "@/data/locations";
import { services, servicesBySlug } from "@/data/services";
import type {
  City,
  District,
  PageLocation,
  ResolvedPageData,
  Service
} from "@/lib/types";

type LocationCandidate =
  | { kind: "city"; city: City }
  | { kind: "district"; city: City; district: District };

const districtCandidates = districts
  .map((district): LocationCandidate | null => {
    const city = citiesBySlug.get(district.citySlug);
    if (!city) {
      return null;
    }

    return { kind: "district", city, district };
  })
  .filter((value): value is Extract<LocationCandidate, { kind: "district" }> => value !== null)
  .sort((a, b) => b.district.slug.length - a.district.slug.length);
  .sort((a, b) => {
    const aSlug = a.kind === "district" ? a.district.slug : a.city.slug;
    const bSlug = b.kind === "district" ? b.district.slug : b.city.slug;
    return bSlug.length - aSlug.length;
  });

const cityCandidates: LocationCandidate[] = cities
  .map((city) => ({ kind: "city" as const, city }))
  .sort((a, b) => b.city.slug.length - a.city.slug.length);

function getLocationSlug(candidate: LocationCandidate) {
  return candidate.kind === "district" ? candidate.district.slug : candidate.city.slug;
}

function matchService(serviceSlug: string): Service | null {
  return servicesBySlug.get(serviceSlug) ?? null;
}

function resolveLocationMatch(
  slug: string,
  candidates: LocationCandidate[]
): { location: PageLocation; service: Service } | null {
  for (const candidate of candidates) {
    const locationSlug = getLocationSlug(candidate);
    const prefix = `${locationSlug}-`;
    if (!slug.startsWith(prefix)) {
      continue;
    }

    const serviceSlug = slug.slice(prefix.length);
    const service = matchService(serviceSlug);
    if (!service) {
      continue;
    }

    if (candidate.kind === "district") {
      if (!service.hasDistrictPages) {
        return null;
      }

      return {
        location: {
          kind: "district",
          city: candidate.city,
          district: candidate.district
        },
        service
      };
    }

    if (!service.hasCityPages) {
      return null;
    }

    return {
      location: {
        kind: "city",
        city: candidate.city
      },
      service
    };
  }

  return null;
}

export function resolvePageData(slug: string): ResolvedPageData | null {
  const normalizedSlug = slug.trim().toLocaleLowerCase("en-US");
  if (!normalizedSlug) {
    return null;
  }

  const directService = servicesBySlug.get(normalizedSlug);
  if (directService) {
    return {
      slug: normalizedSlug,
      pageType: "service",
      service: directService,
      location: { kind: "none" }
    };
  }

  const districtMatch = resolveLocationMatch(normalizedSlug, districtCandidates);
  if (districtMatch) {
    return {
      slug: normalizedSlug,
      pageType: "district-service",
      service: districtMatch.service,
      location: districtMatch.location
    };
  }

  const cityMatch = resolveLocationMatch(normalizedSlug, cityCandidates);
  if (cityMatch) {
    return {
      slug: normalizedSlug,
      pageType: "city-service",
      service: cityMatch.service,
      location: cityMatch.location
    };
  }

  return null;
}

export function getAllValidSlugs() {
  const validSlugs = new Set<string>();

  for (const service of services) {
    validSlugs.add(service.slug);
  }

  for (const city of cities) {
    for (const service of services) {
      if (service.hasCityPages) {
        validSlugs.add(`${city.slug}-${service.slug}`);
      }
    }
  }

  for (const district of districts) {
    for (const service of services) {
      if (service.hasDistrictPages) {
        validSlugs.add(`${district.slug}-${service.slug}`);
      }
    }
  }

  return [...validSlugs];
}
