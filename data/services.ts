import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "alcipanci",
    name: "Alçıpan Ustası",
    category: "usta",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "asma-tavan",
    description:
      "Asma tavan, bölme duvar ve dekoratif alçıpan uygulamaları için keşif ve uygulama hizmeti."
  },
  {
    slug: "elektrikci",
    name: "Elektrikçi",
    category: "usta",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "elektrik-tesisati",
    description:
      "Priz, aydınlatma, arıza tespiti, sigorta ve iç tesisat işlemleri için uzman elektrik ustası desteği."
  },
  {
    slug: "su-tesisatcisi",
    name: "Su Tesisatçısı",
    category: "usta",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "su-tesisati",
    description:
      "Su kaçağı, gider tıkanıklığı, batarya değişimi ve tesisat yenileme işlemleri için hızlı müdahale hizmeti."
  },
  {
    slug: "boyaci",
    name: "Boyacı",
    category: "tadilat",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "ic-cephe-boya",
    description:
      "Daire, villa ve iş yerleri için temiz işçilikle iç cephe boya uygulaması yapan deneyimli boyacı desteği."
  },
  {
    slug: "koltuk-yikama",
    name: "Koltuk Yıkama",
    category: "temizlik",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "koltuk-temizleme",
    description:
      "Yerinde koltuk yıkama, leke çıkarma ve kumaş türüne uygun temizlik uygulamaları ile hijyenik sonuç sunar."
  },
  {
    slug: "hali-yikama",
    name: "Halı Yıkama",
    category: "temizlik",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "hali-temizleme",
    description:
      "Makine halısı, yün halı ve özel dokuma halılar için kontrollü yıkama ve teslimat hizmeti sağlar."
  },
  {
    slug: "banyo-tadilat",
    name: "Banyo Tadilatı",
    category: "tadilat",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "banyo-yenileme",
    description:
      "Seramik, duş alanı, tesisat ve dolap yenilemelerini planlı şekilde ilerleten anahtar teslim banyo tadilatı hizmeti."
  },
  {
    slug: "mutfak-tadilat",
    name: "Mutfak Tadilatı",
    category: "tadilat",
    hasCityPages: true,
    hasDistrictPages: true,
    imageType: "mutfak-yenileme",
    description:
      "Dolap, tezgah, seramik, elektrik ve tesisat uyumunu birlikte ele alan mutfak tadilat çözümleri sunar."
  },
  {
    slug: "ic-mimar",
    name: "İç Mimar",
    category: "ic-mimar",
    hasCityPages: true,
    hasDistrictPages: false,
    imageType: "ic-mimari-proje",
    description:
      "Konut ve ticari projelerde konsept geliştirme, alan planlama ve uygulama koordinasyonu."
  }
];

export const servicesBySlug = new Map(services.map((service) => [service.slug, service]));
