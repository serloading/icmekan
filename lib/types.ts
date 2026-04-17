export type ServiceCategory = "usta" | "tadilat" | "temizlik" | "ic-mimar";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  hasCityPages: boolean;
  hasDistrictPages: boolean;
  imageType: string;
  description: string;
};

export type City = {
  slug: string;
  name: string;
};

export type District = {
  slug: string;
  name: string;
  citySlug: City["slug"];
};

export type PageType = "service" | "city-service" | "district-service";

export type PageLocation =
  | { kind: "none" }
  | { kind: "city"; city: City }
  | { kind: "district"; city: City; district: District };

export type ResolvedPageData = {
  slug: string;
  pageType: PageType;
  service: Service;
  location: PageLocation;
};

export type FaqItem = {
  question: string;
  answer: string;
};
