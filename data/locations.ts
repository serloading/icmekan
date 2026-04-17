import type { City, District } from "@/lib/types";

export const cities: City[] = [
  { slug: "istanbul", name: "İstanbul" },
  { slug: "izmir", name: "İzmir" },
  { slug: "mugla", name: "Muğla" }
];

type DistrictSeed = Omit<District, "citySlug">;

function createDistricts(
  citySlug: City["slug"],
  items: DistrictSeed[]
): District[] {
  return items.map((item) => ({
    ...item,
    citySlug
  }));
}

// This grouped source makes it easy to expand toward full district coverage city by city.
// Add new entries to the relevant city array without touching resolver logic or route structure.
export const districtCatalog: Record<City["slug"], DistrictSeed[]> = {
  istanbul: [
    { slug: "adalar", name: "Adalar" },
    { slug: "arnavutkoy", name: "Arnavutköy" },
    { slug: "atasehir", name: "Ataşehir" },
    { slug: "avcilar", name: "Avcılar" },
    { slug: "bagcilar", name: "Bağcılar" },
    { slug: "bahcelievler", name: "Bahçelievler" },
    { slug: "bakirkoy", name: "Bakırköy" },
    { slug: "basaksehir", name: "Başakşehir" },
    { slug: "bayrampasa", name: "Bayrampaşa" },
    { slug: "kartal", name: "Kartal" },
    { slug: "kadikoy", name: "Kadıköy" },
    { slug: "besiktas", name: "Beşiktaş" },
    { slug: "beylikduzu", name: "Beylikdüzü" },
    { slug: "beykoz", name: "Beykoz" },
    { slug: "beyoglu", name: "Beyoğlu" },
    { slug: "buyukcekmece", name: "Büyükçekmece" },
    { slug: "catalca", name: "Çatalca" },
    { slug: "cekmekoy", name: "Çekmeköy" },
    { slug: "esenler", name: "Esenler" },
    { slug: "esenyurt", name: "Esenyurt" },
    { slug: "eyupsultan", name: "Eyüpsultan" },
    { slug: "fatih", name: "Fatih" },
    { slug: "gaziosmanpasa", name: "Gaziosmanpaşa" },
    { slug: "gungoren", name: "Güngören" },
    { slug: "kagithane", name: "Kağıthane" },
    { slug: "kucukcekmece", name: "Küçükçekmece" },
    { slug: "maltepe", name: "Maltepe" },
    { slug: "pendik", name: "Pendik" },
    { slug: "sancaktepe", name: "Sancaktepe" },
    { slug: "sariyer", name: "Sarıyer" },
    { slug: "sile", name: "Şile" },
    { slug: "silivri", name: "Silivri" },
    { slug: "sisli", name: "Şişli" },
    { slug: "sultanbeyli", name: "Sultanbeyli" },
    { slug: "sultangazi", name: "Sultangazi" },
    { slug: "tuzla", name: "Tuzla" },
    { slug: "umraniye", name: "Ümraniye" },
    { slug: "uskudar", name: "Üsküdar" },
    { slug: "zeytinburnu", name: "Zeytinburnu" }
  ],
  izmir: [
    { slug: "karsiyaka", name: "Karşıyaka" },
    { slug: "urla", name: "Urla" }
  ],
  mugla: [
    { slug: "bodrum", name: "Bodrum" },
    { slug: "fethiye", name: "Fethiye" },
    { slug: "marmaris", name: "Marmaris" }
  ]
};

export const districts: District[] = Object.entries(districtCatalog).flatMap(
  ([citySlug, items]) => createDistricts(citySlug as City["slug"], items)
);

export const citiesBySlug = new Map(cities.map((city) => [city.slug, city]));
export const districtsBySlug = new Map(districts.map((district) => [district.slug, district]));
