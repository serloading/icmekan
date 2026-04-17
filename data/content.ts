import { districtsBySlug } from "@/data/locations";
import { services, servicesBySlug } from "@/data/services";
import { PHONE_HREF } from "@/lib/site";
import type { FaqItem, ResolvedPageData, Service } from "@/lib/types";

type PageCopy = {
  intro?: string;
  faq?: FaqItem[];
};

type PageCopyEntry = {
  key: string;
  value: PageCopy;
};

type PatternCopy = {
  intro: string[];
  jobs: string[];
  reason: string[];
  process: string[];
};

type ServicePatternSet = Record<string, PatternCopy>;

export type PageContentBlock = {
  title: string;
  body: string;
};

export type PageLinkItem = {
  href: string;
  label: string;
};

function buildPageCopyMap(entries: PageCopyEntry[]) {
  return Object.fromEntries(entries.map((entry) => [entry.key, entry.value])) as Record<
    string,
    PageCopy
  >;
}

function createDistrictKey(districtSlug: string, serviceSlug: string) {
  return `district:${districtSlug}:${serviceSlug}`;
}

function createCityKey(citySlug: string, serviceSlug: string) {
  return `city:${citySlug}:${serviceSlug}`;
}

function createServiceKey(serviceSlug: string) {
  return `service:${serviceSlug}`;
}

function getOverrideKey(pageData: ResolvedPageData) {
  if (pageData.location.kind === "district") {
    return createDistrictKey(pageData.location.district.slug, pageData.service.slug);
  }

  if (pageData.location.kind === "city") {
    return createCityKey(pageData.location.city.slug, pageData.service.slug);
  }

  return createServiceKey(pageData.service.slug);
}

function fillTemplate(copy: string, pageData: ResolvedPageData) {
  return copy
    .replaceAll("__CITY__", pageData.location.kind === "none" ? "" : pageData.location.city.name)
    .replaceAll(
      "__DISTRICT__",
      pageData.location.kind === "district" ? pageData.location.district.name : ""
    );
}

function hashText(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickVariant(options: string[], key: string) {
  return options[hashText(key) % options.length];
}

function pickPattern<T>(patterns: Record<string, T>, key: string) {
  const keys = Object.keys(patterns);
  return patterns[keys[hashText(key) % keys.length]];
}

function createIntroCopy(intro: string): PageCopy {
  return { intro };
}

const pageCopyEntries: PageCopyEntry[] = [
  {
    key: createDistrictKey("kartal", "alcipanci"),
    value: createIntroCopy(
      "Kartal'da özellikle eski apartman dairelerinde tavan yenileme, salonu daha modern gösterecek asma tavan uygulamaları ve odaları daha kullanışlı hale getiren alçıpan bölmeler sık talep görüyor. Sahaya çıkmadan önce dairenin mevcut duvar yapısı, tesisat geçişleri ve istenen dekoratif detaylar değerlendirilerek temiz işçilikle ilerlenir."
    )
  },
  {
    key: createDistrictKey("kadikoy", "alcipanci"),
    value: createIntroCopy(
      "Kadıköy'de yüksek tavanlı eski apartman daireleri, sokak üstü ofisler ve butik mağazalar için alçıpan uygulamaları sık tercih edilir. Özellikle asma tavan, gizli ışık bandı ve kullanım alanını bölmeden düzenleyen dekoratif bölmeler, ilçedeki yenileme işlerinde öne çıkar."
    )
  },
  {
    key: createDistrictKey("besiktas", "alcipanci"),
    value: createIntroCopy(
      "Beşiktaş'ta apartman daireleri ile ofis katlarında alçıpan ihtiyacı çoğu zaman tavan düzenleme, ses bölmesi ve daha düzenli bir iç mekan kurgusu için ortaya çıkar. Dar planlı ama yoğun kullanılan alanlarda temiz montaj ve doğru profil uygulaması büyük fark yaratır."
    )
  },
  {
    key: createDistrictKey("uskudar", "alcipanci"),
    value: createIntroCopy(
      "Üsküdar'da aile yaşamının sürdüğü dairelerde salon tavanı yenileme, antre geçişlerini toparlama ve çocuk odalarında daha düzenli alan oluşturma amacıyla alçıpan uygulamaları öne çıkar. Ahşap detayların bulunduğu evlerde yeni tavan hattının mevcut mimariyle uyumlu ilerlemesi özellikle önemlidir."
    )
  },
  {
    key: createDistrictKey("sisli", "alcipanci"),
    value: createIntroCopy(
      "Şişli'de ofis katları, klinikler ve apartman dairelerinde alçıpan hizmeti genellikle hızlı yenileme ve alanı daha profesyonel gösterecek tavan çözümleri için talep edilir. Özellikle niş, aydınlatma bandı ve bölme duvar uygulamaları, işlevi bozmadan mekanı yenilemek isteyenler için sık kullanılır."
    )
  },
  {
    key: createDistrictKey("bakirkoy", "alcipanci"),
    value: createIntroCopy(
      "Bakırköy'de geniş salonlu eski dairelerde asma tavan, TV ünitesi arkası ve koridor geçişlerini toparlayan alçıpan detayları sık uygulanır. İlçedeki yenileme işlerinde amaç çoğu zaman mekanı kırıp dökmeden daha güncel ve düzenli bir görünüme kavuşturmaktır."
    )
  },
  {
    key: createDistrictKey("avcilar", "alcipanci"),
    value: createIntroCopy(
      "Avcılar'da sahil hattına yakın apartman daireleri ile öğrenciye kiralanan evlerde alçıpan işleri daha çok yıpranmış tavanların toparlanması ve odaları daha kullanışlı ayırmak için istenir. Özellikle yenileme öncesi salon tavanı ve giriş koridorlarında sade ama temiz bir görünüm hedeflenir."
    )
  },
  {
    key: createDistrictKey("bagcilar", "alcipanci"),
    value: createIntroCopy(
      "Bağcılar'da yoğun kullanılan aile daireleri ve cadde üzeri iş yerlerinde alçıpan uygulamaları, hem alanı daha düzenli göstermek hem de aydınlatmayı daha kontrollü kullanmak için tercih edilir. Bölme duvar ve düz asma tavan işleri ilçede en sık talep edilen uygulamalar arasındadır."
    )
  },
  {
    key: createDistrictKey("bahcelievler", "alcipanci"),
    value: createIntroCopy(
      "Bahçelievler'de kat planı klasik apartman düzenine sahip evlerde alçıpan, salon tavanını yenilemek, antre geçişlerini toparlamak ve ışık detaylarını daha şık göstermek için tercih edilir. İlçedeki yenileme işlerinde temiz köşe dönüşleri ve düzgün boya altı hazırlığı öne çıkar."
    )
  },
  {
    key: createDistrictKey("basaksehir", "alcipanci"),
    value: createIntroCopy(
      "Başakşehir'de yeni konut siteleri ve modern daire tiplerinde alçıpan hizmeti daha çok dekoratif tavan, spot aydınlatma hattı ve TV ünitesi arkası için istenir. Kullanıcılar burada çoğu zaman gösterişli ama abartısız bir salon tavanı ve düzenli geçiş detayları talep eder."
    )
  },
  {
    key: createDistrictKey("pendik", "alcipanci"),
    value: createIntroCopy(
      "Pendik'te yeni site daireleri ile müstakil yaşam alanlarında alçıpan ihtiyacı çoğunlukla dekoratif tavan uygulamaları, giyinme bölmesi ve çalışma alanı ayrımı için ortaya çıkar. Kullanım odaklı projelerde düzgün köşe bitişleri ve temiz boya altı yüzey hazırlığı önem kazanır."
    )
  },
  {
    key: createDistrictKey("maltepe", "alcipanci"),
    value: createIntroCopy(
      "Maltepe'de deniz manzaralı dairelerden aile apartmanlarına kadar farklı yapılarda alçıpan işleri, salona derinlik kazandıran asma tavanlar ve odaları daha düzenli kullandıran bölmeler için tercih edilir. Özellikle yaşam alanını ferah tutarken aydınlatmayı gizlemek isteyen kullanıcılar bu çözümlere yönelir."
    )
  },
  {
    key: createDistrictKey("umraniye", "alcipanci"),
    value: createIntroCopy(
      "Ümraniye'de hem aile dairelerinde hem de ofislerde alçıpan hizmeti, toplantı odası bölmesi, koridor tavanı düzenleme ve mağaza içi hacim planlaması için sık kullanılır. İlçedeki yapılarda hızlı ilerleyen ama sonradan boya ve aydınlatma ile uyumlu devam eden uygulamalar daha çok talep görür."
    )
  },
  {
    key: createDistrictKey("sariyer", "alcipanci"),
    value: createIntroCopy(
      "Sarıyer'de villa tipi yapılar, rezidans daireleri ve sahil hattına yakın konutlarda alçıpan uygulamaları daha çok estetik tavan detayları, gizli ışık bandı ve mekan geçişlerini yumuşatan mimari çözümler için istenir. Geniş hacimli yaşam alanlarında düzgün kot takibi, aydınlatma planına uygun taşıyıcı kurgu ve tavanda ferahlığı bozmayacak ölçülü tasarım anlayışı belirleyici olur."
    )
  },
  {
    key: createDistrictKey("beylikduzu", "alcipanci"),
    value: createIntroCopy(
      "Beylikdüzü'nde site yaşamının yaygın olduğu geniş dairelerde alçıpan uygulamaları çoğu zaman salon tavanına hareket katmak, yatak odasında niş oluşturmak ve giriş alanını daha derli toplu göstermek için tercih edilir. Yeni yapılarda düzgün ölçü ve aydınlatma uyumu öncelikli beklenti olur."
    )
  },
  {
    key: createDistrictKey("esenyurt", "alcipanci"),
    value: createIntroCopy(
      "Esenyurt'ta hem yoğun nüfuslu apartman bloklarında hem de zemin kat iş yerlerinde alçıpan ihtiyacı pratik ve hızlı çözümler üzerinden şekillenir. Oda ayırma, ofis içinde hafif bölme yapma ve mevcut tavanı daha temiz gösterecek sade asma tavan uygulamaları burada sık kullanılır."
    )
  },
  {
    key: createDistrictKey("kagithane", "alcipanci"),
    value: createIntroCopy(
      "Kağıthane'de dönüşüm geçiren mahallelerde yeni daireler ile yenilenen ofis katları yan yana olduğu için alçıpan uygulamaları da oldukça çeşitli ilerler. Bir tarafta modern salon tavanı istenirken diğer tarafta ofis içinde çalışma alanlarını ayıran bölme duvar çözümleri öne çıkar."
    )
  },
  {
    key: createDistrictKey("fatih", "alcipanci"),
    value: createIntroCopy(
      "Fatih'te yaşlı apartman dokusu, küçük esnaf dükkanları ve yenilenen daireler alçıpan işlerinde farklı ihtiyaçlar doğurur. Tavan bozukluklarını toparlama, dar alanı daha düzenli gösterme ve mağaza içinde düzenli bir arka plan oluşturma gibi işler ilçede sık talep edilir."
    )
  },
  {
    key: createDistrictKey("zeytinburnu", "alcipanci"),
    value: createIntroCopy(
      "Zeytinburnu'nda aile daireleri ile ticari kullanıma açık mekanlarda alçıpan uygulamaları genellikle yenileme sürecinin tamamlayıcı parçası olur. Özellikle koridor tavanı, salon ışık havuzu ve iş yerlerinde vitrin arkasını daha temiz gösterecek yüzey düzenlemeleri öne çıkar."
    )
  },
  {
    key: createDistrictKey("gungoren", "alcipanci"),
    value: createIntroCopy(
      "Güngören'de apartman içi daire yenilemelerinde alçıpan daha çok alanı bölmeden düzenleme ihtiyacına cevap verir. Salon tavanını sadeleştiren uygulamalar, küçük odalarda işlev kazandıran nişler ve boya öncesi düzgün yüzey hazırlığı ilçede sık karşılaşılan işler arasındadır."
    )
  },
  {
    key: createDistrictKey("gaziosmanpasa", "alcipanci"),
    value: createIntroCopy(
      "Gaziosmanpaşa'da eski yapıların yenilenmesi sırasında alçıpan işleri çoğu zaman elektrik ve boya uygulamalarıyla birlikte planlanır. Tavanı toparlayan çözümler, mağaza içi düzenlemeler ve odaları hafif şekilde ayıran duvar uygulamaları burada işlevsel sonuç verdiği için tercih edilir."
    )
  },
  {
    key: createDistrictKey("sultangazi", "alcipanci"),
    value: createIntroCopy(
      "Sultangazi'de geniş ailelerin yaşadığı dairelerde alçıpan uygulamaları, hem salonu daha toplu göstermek hem de kullanım alanlarını daha net ayırmak için istenir. Dekoratif asma tavanın yanında giyinme alanı, çocuk odası bölmesi ve TV duvarı detayları sık talep görür."
    )
  },
  {
    key: createDistrictKey("sancaktepe", "alcipanci"),
    value: createIntroCopy(
      "Sancaktepe'de yeni konut projeleri ve site dairelerinde alçıpan hizmeti çoğu zaman modern tavan tasarımı ve aydınlatma detaylarıyla birlikte düşünülür. Kullanıcılar burada daha çok salonu zenginleştiren ama günlük yaşamı daraltmayan sade dekoratif çözümler ister."
    )
  },
  {
    key: createDistrictKey("atasehir", "alcipanci"),
    value: createIntroCopy(
      "Ataşehir'de rezidans daireleri, plaza ofisleri ve modern yaşam alanlarında alçıpan uygulamaları daha çok düzgün hatlı tavan tasarımı, ofis içi hacim planlama ve gizli aydınlatma detayları için tercih edilir. Görünüm kadar uygulamanın temiz ve zamanında tamamlanması da burada önemli beklentidir."
    )
  },
  {
    key: createDistrictKey("beykoz", "alcipanci"),
    value: createIntroCopy(
      "Beykoz'da müstakil evler, geniş aile konutları ve doğaya yakın yaşam alanlarında alçıpan uygulamaları daha çok yüksek tavanlı mekanları dengelemek ve ışığı daha yumuşak dağıtmak için kullanılır. Villa tipi yapılarda tavan seviyesi, ışık detayı ve dekoratif nişler birlikte planlanır."
    )
  },
  {
    key: createDistrictKey("cekmekoy", "alcipanci"),
    value: createIntroCopy(
      "Çekmeköy'de yeni yerleşim alanları ve müstakil yaşam tipleri alçıpan işlerinde daha düzenli, daha modern ve daha sakin bir iç mekan görünümü beklentisini öne çıkarır. Özellikle salon tavanı, yatak odası nişi ve çalışma odasını ayıran hafif bölmeler sık uygulanır."
    )
  },
  {
    key: createDistrictKey("tuzla", "alcipanci"),
    value: createIntroCopy(
      "Tuzla'da sahil tarafındaki konutlar, yeni siteler ve atölye-ofis karışımı kullanım alanlarında alçıpan uygulamaları ihtiyaca göre değişir. Bir yerde dekoratif asma tavan istenirken başka bir yerde ofis içinde bölme duvar ya da koridoru toparlayan sade tavan çalışmaları öne çıkar."
    )
  },
  {
    key: createDistrictKey("buyukcekmece", "alcipanci"),
    value: createIntroCopy(
      "Büyükçekmece'de geniş daireler, yazlık kullanım gören evler ve villa tipi yapılar alçıpan uygulamalarında daha ferah ve gösterişli çözümleri öne çıkarır. Tavan çizgisini belirginleştiren asma tavanlar ve aydınlatma detayları, özellikle salon ve oturma alanlarında sık tercih edilir."
    )
  },
  {
    key: createDistrictKey("silivri", "alcipanci"),
    value: createIntroCopy(
      "Silivri'de yazlık evler, bahçeli yapılar ve yenilenen aile konutlarında alçıpan işleri çoğu zaman yaşam alanını daha sıcak ve toparlanmış göstermek için yapılır. Büyük salonlarda tavanı oranlı hale getiren uygulamalar ve oda geçişlerini sadeleştiren çözümler burada öne çıkar."
    )
  },
  {
    key: createDistrictKey("catalca", "alcipanci"),
    value: createIntroCopy(
      "Çatalca'da müstakil evler, çiftlik yaşamına yakın yapılar ve geniş iç hacimler alçıpan işlerinde farklı bir ihtiyaç doğurur. Burada daha çok tavanın boşluğunu dengeleyen uygulamalar, ek yaşam alanı hissi veren bölmeler ve yenileme sırasında temiz bir iç mekan dili oluşturacak detaylar tercih edilir."
    )
  },
  {
    key: createDistrictKey("kadikoy", "su-tesisatcisi"),
    value: {
      intro:
        "Kadıköy'de eski apartman stokunun yoğun olduğu sokaklarda su kaçağı, gider tıkanıklığı ve eski bağlantı elemanlarından kaynaklanan tekrar eden arızalar sık görülür. Özellikle mutfak ve banyo yenilenmemiş dairelerde önce mevcut hatların durumu kontrol edilip ardından en az müdahaleyle kalıcı çözüm planlanır.",
      faq: [
        {
          question: "Su kaçağı için kırma işlemi hemen yapılır mı?",
          answer:
            "Her durumda kırma işlemine geçilmez. Önce sorunun yeri tespit edilir, görünür bağlantılar kontrol edilir ve mümkünse daha az müdahaleyle çözüm sunulur."
        },
        {
          question: "Kadıköy'deki eski binalarda tesisat tamamen yenilenmeli mi?",
          answer:
            "Bu karar mevcut hattın durumuna göre verilir. Bazı dairelerde lokal onarım yeterli olurken, eski ve sık sorun çıkaran hatlarda kademeli yenileme daha ekonomik olabilir."
        }
      ]
    }
  },
  {
    key: createDistrictKey("besiktas", "elektrikci"),
    value: createIntroCopy(
      "Beşiktaş'ta hem eski apartman dairelerinde hem de yoğun kullanılan ofislerde elektrik yükü zaman içinde değiştiği için sigorta atması, yetersiz priz noktası ve aydınlatma sorunları sık yaşanır. Kullanım alışkanlığına göre hat düzeni değerlendirilip güvenli ve pratik bir çözüm planı çıkarılması önemlidir."
    )
  },
  {
    key: createDistrictKey("karsiyaka", "koltuk-yikama"),
    value: createIntroCopy(
      "Karşıyaka'da aile yaşamının yoğun olduğu evlerde koltuklar günlük kullanıma bağlı olarak hızlı kirlenebiliyor. Açık renk kumaşlarda leke görünürlüğü arttığı için işlem öncesi kumaş yapısı kontrol edilip hem temizleyen hem de dokuyu yormayan uygulama tercih edilir."
    )
  },
  {
    key: createDistrictKey("bodrum", "boyaci"),
    value: createIntroCopy(
      "Bodrum'da denize yakın konutlarda güneş, nem ve tuz etkisi boyanın ömrünü doğrudan etkiler. Bu yüzden uygulama öncesinde yüzey hazırlığı, doğru astar seçimi ve mekana uygun boya tercihi, sadece görüntü değil kalıcılık açısından da önem taşır."
    )
  },
  {
    key: createDistrictKey("fethiye", "mutfak-tadilat"),
    value: createIntroCopy(
      "Fethiye'de özellikle yazlık evlerde mutfak yenileme talepleri kullanım kolaylığı ve dayanıklı malzeme beklentisi etrafında şekillenir. Sezon içinde yoğun kullanım gören alanlarda tezgah, dolap iç düzeni ve nem dayanımı birlikte değerlendirilir."
    )
  },
  {
    key: createCityKey("izmir", "boyaci"),
    value: createIntroCopy(
      "İzmir genelinde boyacı hizmeti özellikle yaz öncesi yenileme döneminde hız kazanır. Güneş alan cephelerde renk seçimi, yüzey hazırlığı ve doğru boya tipi tercih edildiğinde hem daha ferah bir görünüm hem de daha uzun ömürlü sonuç alınır."
    )
  },
  {
    key: createCityKey("istanbul", "alcipanci"),
    value: createIntroCopy(
      "İstanbul alçıpan hizmeti, Anadolu Yakası'ndaki aile dairelerinden Avrupa Yakası'ndaki ofis ve mağaza yenilemelerine kadar çok farklı ihtiyaçlara cevap verir. Kartal, Kadıköy, Üsküdar, Şişli, Beşiktaş, Bakırköy ve Sarıyer gibi farklı yapı karakterine sahip ilçelerde asma tavan, bölme duvar ve ışık detaylı dekoratif uygulamalar sık talep edilir."
    )
  },
  {
    key: createCityKey("mugla", "ic-mimar"),
    value: {
      intro:
        "Muğla'da iç mimarlık hizmeti çoğu zaman yazlık kullanım, kısa dönem kiralama düzeni ve açık alanla bütünleşen yaşam alışkanlıkları dikkate alınarak planlanır. Mekanın sadece şık görünmesi değil, sezon yoğunluğunda da rahat kullanılabilmesi hedeflenir.",
      faq: [
        {
          question: "İç mimarlık süreci yalnızca çizim teslimiyle mi ilerler?",
          answer:
            "Hayır. İhtiyaca göre konsept, yerleşim, malzeme seçimi ve uygulama koordinasyonu birlikte yürütülebilir. Süreç, ne kadar desteğe ihtiyaç duyulduğuna göre şekillenir."
        },
        {
          question: "Muğla'daki yazlık projelerde nelere dikkat edilir?",
          answer:
            "Dayanıklı malzeme seçimi, kolay bakım, doğal ışığın kullanımı ve sezonluk kullanım yoğunluğu ilk değerlendirme başlıkları arasında yer alır."
        }
      ]
    }
  },
  {
    key: createServiceKey("hali-yikama"),
    value: createIntroCopy(
      "Halı yıkama hizmetinde amaç yalnızca gözle görünür kiri almak değil, dokunun yapısını koruyarak hijyenik ve rahat kullanılan bir sonuç elde etmektir. Halının türüne göre yıkama yöntemi ve teslim planı buna göre belirlenir."
    )
  }
];

const pageCopyMap = buildPageCopyMap(pageCopyEntries);

const segmentGroups = {
  apartment_old: [
    "fatih",
    "kadikoy",
    "bakirkoy",
    "gungoren",
    "gaziosmanpasa",
    "zeytinburnu",
    "avcilar"
  ],
  apartment_new: [
    "basaksehir",
    "beylikduzu",
    "esenyurt",
    "sancaktepe",
    "atasehir",
    "cekmekoy",
    "pendik"
  ],
  office: ["besiktas", "sisli", "kagithane", "atasehir", "bahcelievler"],
  shop: ["bagcilar", "fatih", "zeytinburnu", "gaziosmanpasa", "umraniye"],
  villa: ["sariyer", "beykoz", "buyukcekmece", "silivri", "catalca", "sile"],
  mixed_family: [
    "kartal",
    "maltepe",
    "uskudar",
    "umraniye",
    "tuzla",
    "bahcelievler",
    "sultangazi"
  ]
} as const;

function getDistrictSegment(districtSlug: string) {
  const groups = Object.entries(segmentGroups) as Array<[string, readonly string[]]>;
  for (const [segment, members] of groups) {
    if (members.includes(districtSlug)) {
      return segment;
    }
  }

  return "mixed_family";
}

function createPatterns(definition: PatternCopy): PatternCopy {
  return definition;
}

const servicePatterns: Record<string, ServicePatternSet> = {
  alcipanci: {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski apartman dairelerinde tavan yenileme, ışık detaylarını toparlama ve yaşam alanını daha modern gösterecek alçıpan çözümleri sık tercih edilir.",
        "__DISTRICT__ tarafında yaşı ilerlemiş apartman stokunda alçıpan uygulamaları daha çok bozuk tavan yüzeyini düzeltmek, salonu daha derli toplu göstermek ve hafif bölmeler oluşturmak için yapılır.",
        "__DISTRICT__ gibi eski yapı dokusunun öne çıktığı bölgelerde alçıpan, kırıp dökmeden iç mekanı yenilemenin en pratik yollarından biri olarak öne çıkar."
      ],
      jobs: [
        "Bu bölgede en çok salon asma tavanı, koridor geçiş düzenlemesi, TV ünitesi arkası ve oda bölme duvarı işleri yapılır.",
        "Eski planlı dairelerde ışık havuzu, sade tavan düşürme, niş uygulaması ve boya öncesi düzgün yüzey hazırlığı öne çıkan işler arasındadır.",
        "Sık talep edilen uygulamalar arasında dekoratif asma tavan, alçıpan niş, giriş holü tavan düzenleme ve oda ayırıcı hafif duvarlar yer alır."
      ],
      reason: [
        "Eski yapılarda hem görünümü toparlamak hem de tavanda daha temiz bir çizgi elde etmek için alçıpan tercih edilir.",
        "Daireyi komple kırmadan yenilik hissi vermesi ve aydınlatma planına kolay uyum sağlaması bu bölgede alçıpanı öne çıkarır.",
        "Kullanım devam ederken kontrollü ilerleyebilmesi ve sonucu hızlı hissettirmesi nedeniyle bölgede sık istenir."
      ],
      process: [
        "Önce ölçü alınır, mevcut tavan hattı ve duvar geçişleri kontrol edilir, ardından istenen görünüm için uygun profil ve uygulama sırası belirlenir.",
        "Keşif sırasında tavan yüksekliği, ışık detayı ve boya öncesi hazırlık ihtiyacı netleştirilir; sonrasında iş planı buna göre çıkarılır.",
        "Uygulama öncesinde alanın kullanım biçimi değerlendirilir, ardından montaj, derz hazırlığı ve boya altı düzenleme sırasıyla ilerlenir."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni konut siteleri ve modern daire tiplerinde alçıpan daha çok dekoratif tavan, gizli ışık ve düzenli geçiş detayları için tercih edilir.",
        "__DISTRICT__ bölgesindeki yeni yaşam alanlarında alçıpan uygulamaları, sade ama şık bir tavan etkisi oluşturmak ve iç mekanı daha bütünlüklü göstermek için öne çıkar.",
        "__DISTRICT__ gibi yeni konutların yoğun olduğu bölgelerde kullanıcılar çoğu zaman abartısız ama düzenli bir salon tavanı ve temiz aydınlatma detayı ister."
      ],
      jobs: [
        "Salon asma tavanı, ışık bandı, yatak odası nişi, TV ünitesi arkası ve giriş alanını toparlayan uygulamalar en sık yapılan işler arasındadır.",
        "Yeni dairelerde genellikle dekoratif tavan düşürme, spot altyapısı, giyinme alanı bölmesi ve koridor düzenleme işleri öne çıkar.",
        "Burada en çok talep edilen işler salon tavanına seviye verme, gizli LED hattı hazırlama ve alanı boğmadan dekoratif vurgu oluşturan alçıpan çözümleridir."
      ],
      reason: [
        "Yeni yapılarda temiz hatları bozmadan mekana karakter katması ve aydınlatmayı daha şık göstermesi nedeniyle tercih edilir.",
        "Minimal ama güçlü bir görsel etki sağlaması, yeni daire kullanıcılarının bu hizmete yönelmesindeki ana nedenlerden biridir.",
        "Konutun modern çizgisine uyum sağlaması ve fazla inşaat görüntüsü oluşturmadan uygulanabilmesi alçıpanı öne çıkarır."
      ],
      process: [
        "Uygulama öncesinde istenen tavan formu, spot yerleri ve boya ile uyumlu son görünüm netleştirilerek iş sırası belirlenir.",
        "Keşif aşamasında ölçü, aydınlatma noktaları ve yaşam alanının kullanım alışkanlığı değerlendirilir; ardından uygulama planına geçilir.",
        "Ön görüşmede istenen model belirlenir, sonra taşıyıcı kurgu hazırlanır ve montaj sonrası yüzeyler boyaya hazır hale getirilir."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofis katları, klinikler ve çalışma alanlarında alçıpan daha çok düzenli tavan hattı ve işlevsel alan ayrımı için tercih edilir.",
        "__DISTRICT__ bölgesindeki ofis ve ticari kullanım alanlarında alçıpan, mekanı daha profesyonel gösterecek sade ama etkili çözümler sunar.",
        "__DISTRICT__'da yoğun kullanılan ofis içlerinde alçıpan uygulamaları hem görünümü toparlamak hem de çalışma akışını destekleyen bölmeler oluşturmak için öne çıkar."
      ],
      jobs: [
        "Ofis bölme duvarı, resepsiyon arkası tavan düzenlemesi, koridor tavanı ve toplantı odası ayırıcı uygulamalar en sık yapılan işlerdir.",
        "Klinik, ofis ve mağaza katlarında sade asma tavan, gizli ışık hazırlığı ve hacim ayıran hafif duvar çözümleri öne çıkar.",
        "Sık talep edilen uygulamalar arasında tavan kotunu düzenleme, ışık hattı planlama ve çalışma alanlarını bölmeden yönlendiren detaylar yer alır."
      ],
      reason: [
        "Ofislerde daha düzenli, temiz ve kurumsal bir görünüm vermesi nedeniyle alçıpan çok tercih edilir.",
        "Hızlı uygulanabilmesi ve farklı kullanım alanlarını pratik şekilde ayırabilmesi bu bölgede önemli avantaj sağlar.",
        "Elektrik, boya ve aydınlatma işleriyle kolay uyumlu ilerlemesi nedeniyle ticari mekanlarda güçlü bir çözüm sunar."
      ],
      process: [
        "Önce mekanın kullanım akışı değerlendirilir, sonra tavan ve bölme ihtiyacına göre uygulama planı çıkarılır.",
        "Keşif sırasında çalışma alanları, geçiş noktaları ve ışık ihtiyacı belirlenir; montaj buna göre etaplanır.",
        "İlk aşamada ölçü ve işlev analizi yapılır, ardından taşıyıcı kurgu hazırlanır ve yüzeyler son kaplamaya uygun hale getirilir."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da mağaza ve küçük iş yerlerinde alçıpan daha çok vitrin arkasını toparlamak, tavanda temiz bir görünüm sağlamak ve ürün sunumunu desteklemek için tercih edilir.",
        "__DISTRICT__ tarafındaki cadde üstü dükkanlarda alçıpan uygulamaları, hızlı yenileme ve daha düzenli bir iç mekan etkisi için sık istenir.",
        "__DISTRICT__ bölgesinde alçıpan, mağaza içinde hem dekoratif bir çerçeve hissi vermek hem de aydınlatmayı ürünlere daha iyi yönlendirmek için kullanılır."
      ],
      jobs: [
        "Vitrin arka duvarı, kasaya yakın tavan düzenleme, ışık havuzu ve depo ile satış alanını ayıran hafif bölmeler bu bölgede sık yapılır.",
        "Mağaza içinde tavan çizgisini düzeltmek, LED hattı hazırlamak ve ürün sergileme alanını daha temiz gösterecek alçıpan detayları öne çıkar.",
        "Sık tercih edilen işler arasında kaset tavan düzeni, dekoratif niş, arka plan duvarı ve işlevsel bölme uygulamaları yer alır."
      ],
      reason: [
        "Ticari mekanın daha düzenli ve güven veren görünmesini sağladığı için mağaza yenilemelerinde sık tercih edilir.",
        "Hızlı sonuç vermesi ve sınırlı alanda etkili bir değişim yaratması bu segmentte alçıpanı öne çıkarır.",
        "Ürün odaklı aydınlatmayı desteklemesi ve iç mekana net bir çerçeve kazandırması önemli bir avantajdır."
      ],
      process: [
        "İş yeri kullanımına göre tavan ve bölme ihtiyacı belirlenir, ardından uygulama iş akışını aksatmayacak şekilde planlanır.",
        "Keşif sırasında vitrin düzeni, ışık yönü ve müşteri dolaşımı dikkate alınarak detaylar netleştirilir.",
        "Önce kullanım alanları ölçülür, sonra aydınlatma ve yüzey hazırlığıyla uyumlu bir montaj sırası oluşturulur."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da villa tipi yapılar ve geniş konutlarda alçıpan daha çok estetik tavan detayları ve hacmi dengeli gösterecek çözümler için tercih edilir.",
        "__DISTRICT__ tarafında geniş salonlar ve yüksek tavanlı yaşam alanlarında alçıpan, mekana karakter kazandıran kontrollü detaylar sunar.",
        "__DISTRICT__ bölgesindeki müstakil yapılarda alçıpan uygulamaları yalnızca tavan kapatma değil, iç mekanın atmosferini tamamlayan dekoratif bir çözüm olarak düşünülür."
      ],
      jobs: [
        "Seviyeli asma tavan, spot aydınlatma hazırlığı, şömine ya da TV arkası nişler ve yaşam alanını yönlendiren dekoratif geçişler öne çıkar.",
        "Villa tipi yapılarda geniş salon tavanı, koridor geçişini yumuşatan detaylar, yatak odası nişi ve ışık bandı gibi uygulamalar sık yapılır.",
        "En çok istenen işler arasında yüksek tavanı daha dengeli gösteren alçıpan çözümleri, dekoratif ışık havuzları ve hafif oda ayrımları yer alır."
      ],
      reason: [
        "Geniş hacimli yapılarda tavana ritim kazandırması ve aydınlatmayı daha kontrollü göstermesi bu hizmeti öne çıkarır.",
        "Estetik beklentisi yüksek konutlarda hem sade hem de etkili bir sonuç vermesi nedeniyle sık tercih edilir.",
        "Mekanın boş görünmesini engelleyip daha dengeli ve tamamlanmış bir iç mekan hissi vermesi önemli bir avantaj sağlar."
      ],
      process: [
        "İlk aşamada tavan yüksekliği, ışık planı ve istenen dekoratif etki değerlendirilir, ardından uygulama modeli netleştirilir.",
        "Keşifte salon, koridor ve odaların tavan ilişkisi birlikte ele alınır; sonra montaj ve yüzey hazırlığı buna göre planlanır.",
        "Önce kullanım senaryosu konuşulur, ardından tavan formu ve aydınlatma detaylarına uygun bir uygulama programı hazırlanır."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile yaşamının sürdüğü dairelerde alçıpan uygulamaları, salonu daha toplu göstermek, ışığı daha iyi dağıtmak ve alanı daha verimli kullanmak için tercih edilir.",
        "__DISTRICT__ bölgesindeki konutlarda alçıpan işleri genellikle yenileme sırasında devreye girer ve hem dekoratif hem işlevsel sonuçlar hedeflenir.",
        "__DISTRICT__'da alçıpan, günlük yaşamı zorlamadan evi daha düzenli ve daha güncel gösterecek hızlı çözümler arasında öne çıkar."
      ],
      jobs: [
        "Salon asma tavanı, antre düzenleme, çocuk odası nişi, TV duvarı arkası ve oda bölme duvarı gibi işler bu bölgede sık yapılır.",
        "Konutlarda genellikle ışık bandı, tavan havuzu, çalışma alanı bölmesi ve boya öncesi düzgün yüzey isteyen alçıpan uygulamaları talep edilir.",
        "Sık karşılaşılan işler arasında salon tavanını sadeleştirme, odaları daha işlevli ayırma ve koridoru daha düzenli gösteren detaylar yer alır."
      ],
      reason: [
        "Evin genel görünümünü toparlaması ve fazla kırma dökme olmadan fark edilir bir yenilik sunması nedeniyle tercih edilir.",
        "Hem dekoratif hem de günlük kullanıma uygun çözümler sunması bölgede alçıpanı güçlü bir seçenek haline getirir.",
        "Aydınlatma, boya ve mobilya planıyla uyumlu ilerleyebilmesi bu hizmetin en çok tercih edilme nedenlerinden biridir."
      ],
      process: [
        "İhtiyaç önce telefonda dinlenir, ardından ölçü ve model kararı için keşif planlanır; sonrasında uygulama sırası belirlenir.",
        "Ön görüşmede hangi alanlara müdahale edileceği netleştirilir, sonra montaj ve yüzey hazırlığı buna göre organize edilir.",
        "İlk adımda kullanım amacı ve tavan ya da bölme tipi belirlenir, sonra uygulama boyaya ve aydınlatmaya uygun şekilde ilerletilir."
      ]
    })
  },
  elektrikci: {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski apartman dairelerinde elektrik işleri çoğu zaman priz yetersizliği, sigorta sorunu ve yıllar içinde eklenmiş hatların düzensizliği nedeniyle gündeme gelir.",
        "__DISTRICT__ tarafındaki eski yapılarda elektrikçi ihtiyacı daha çok arıza çözümüyle başlar, ardından hat güvenliği ve kullanım kolaylığı için ek düzenlemeler gerekir.",
        "__DISTRICT__'da yaşlı bina stokunda elektrik hizmeti, mevcut tesisatı güvenli hale getirmek ve günlük kullanımda sorun çıkaran noktaları toparlamak için sık çağrılır."
      ],
      jobs: [
        "Priz yenileme, sigorta kutusu düzenleme, anahtar değişimi ve arızalı aydınlatma noktalarının onarımı sık yapılan işler arasındadır.",
        "Eski dairelerde genellikle hat kontrolü, kısa devreye neden olan bağlantıların düzeltilmesi ve yeni priz noktası açılması talep edilir.",
        "Sık karşılaşılan uygulamalar arasında sigorta yenileme, yanmış priz değişimi, avize hattı düzenleme ve mutfak-banyo hattını güçlendirme bulunur."
      ],
      reason: [
        "Güvenlik riski oluşturan eski bağlantıların giderilmesi ve daha rahat kullanım sağlaması nedeniyle tercih edilir.",
        "Zamanla eklenen elektrik yükünü mevcut hatta uygun hale getirmek için profesyonel müdahale gerekir.",
        "Eski yapılarda düzensiz hatlar hem arıza hem de kullanım sıkıntısı yarattığı için elektrik hizmeti öncelikli hale gelir."
      ],
      process: [
        "Önce arıza ya da ihtiyaç dinlenir, ardından hat durumu ve sigorta yapısı kontrol edilerek uygun çözüm sıralanır.",
        "Keşif sırasında hangi noktaların sorun çıkardığı görülür, sonra malzeme ve iş sırası buna göre netleştirilir.",
        "İlk aşamada mevcut tesisat kontrol edilir, daha sonra onarım ve gerekiyorsa yeni hat düzenlemesi planlanır."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni konutlarda elektrik işleri daha çok ek priz, aydınlatma planı ve yaşam alışkanlığına göre küçük revizyon ihtiyaçları etrafında şekillenir.",
        "__DISTRICT__ bölgesindeki yeni dairelerde kullanıcılar çoğunlukla standart teslimatı günlük hayata daha uygun hale getirmek için elektrikçi desteği alır.",
        "__DISTRICT__'da modern daire tiplerinde elektrik hizmeti, konforu artıran ek hatlar ve daha işlevli aydınlatma kurgusu için tercih edilir."
      ],
      jobs: [
        "Ek priz noktası açılması, avize-spot montajı, TV ünitesi için gizli kablo düzeni ve mutfakta cihaz kullanımına uygun hat planı öne çıkar.",
        "Yeni dairelerde sık talep edilen işler arasında dekoratif aydınlatma montajı, priz yerinin revizesi ve internet-TV hattı düzenlemesi yer alır.",
        "En çok karşılaşılan uygulamalar spot bağlantısı, salon aydınlatma senaryosu kurma, şarj-priz noktalarını artırma ve mutfak tezgah üstü elektrik düzenidir."
      ],
      reason: [
        "Standart teslim elektrik düzeni çoğu kullanıcı için yeterli olmadığından günlük yaşama uygun revizyon gerekir.",
        "Konforlu kullanım, düzenli kablo görünümü ve daha iyi aydınlatma etkisi bu bölgede elektrik hizmetini öne çıkarır.",
        "Yeni yapılarda küçük ama doğru dokunuşlarla kullanım kolaylığı ciddi şekilde arttığı için tercih edilir."
      ],
      process: [
        "İhtiyaçlar odalara göre dinlenir, ardından ek priz, aydınlatma ve hat düzeni için kısa bir plan çıkarılır.",
        "Ön görüşmede kullanım alışkanlıkları değerlendirilir; montaj ve bağlantı işleri buna göre sıralanır.",
        "İlk olarak hangi alanlarda revizyon istendiği netleştirilir, ardından malzeme ve uygulama süresi paylaşılır."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofis ve çalışma alanlarında elektrik hizmeti, kesintisiz çalışma düzeni ve ekipman yüküne uygun tesisat ihtiyacı nedeniyle öne çıkar.",
        "__DISTRICT__ bölgesindeki ofislerde elektrikçi çağrıları çoğu zaman priz yetersizliği, ağ ekipmanı bağlantıları ve aydınlatma sorunları etrafında yoğunlaşır.",
        "__DISTRICT__'da ticari çalışma alanlarında elektrik düzeni yalnızca arıza çözümü değil, iş akışını rahatlatan planlama için de önemlidir."
      ],
      jobs: [
        "Çalışma masalarına uygun priz planı, aydınlatma revizesi, sigorta yük kontrolü ve internet ekipmanı için düzenli bağlantı noktaları sık yapılır.",
        "Toplantı odası, resepsiyon ve ortak alan aydınlatması ile cihaz yoğunluğu olan noktalarda hat güçlendirme talepleri öne çıkar.",
        "Ofislerde genellikle armatür yenileme, priz hattı artırma, UPS-kasa bölgesi için düzenli elektrik altyapısı ve arıza çözümü yapılır."
      ],
      reason: [
        "İş akışını kesmeden güvenli ve düzenli elektrik kullanımı sağlamak için tercih edilir.",
        "Cihaz yükü arttıkça mevcut tesisatın daha dengeli hale getirilmesi gerektiğinden ofislerde elektrikçi ihtiyacı sık oluşur.",
        "Düzgün aydınlatma ve erişilebilir priz planı çalışan konforunu doğrudan etkilediği için hizmet önem kazanır."
      ],
      process: [
        "Önce ekipman yoğunluğu ve sorun yaşanan noktalar tespit edilir, sonra en az aksama ile uygulanacak plan hazırlanır.",
        "Keşifte masa yerleşimi, cihaz yükü ve aydınlatma ihtiyaçları değerlendirilir; iş buna göre etaplandırılır.",
        "İlk adımda kritik alanlar belirlenir, ardından bağlantılar ve hat düzenlemeleri çalışma saatlerine uygun planlanır."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da mağaza ve küçük iş yerlerinde elektrik işleri, vitrin aydınlatması, kasa noktası güvenliği ve yoğun kullanım nedeniyle önem kazanır.",
        "__DISTRICT__ bölgesindeki dükkanlarda elektrikçi hizmeti daha çok aydınlatma düzeni, tabela hattı ve günlük kullanımda sorun çıkaran prizler için çağrılır.",
        "__DISTRICT__'daki ticari alanlarda elektrik düzeni, müşteri alanını aydınlık ve güvenli tutmak açısından kritik bir rol oynar."
      ],
      jobs: [
        "Vitrin spotları, kasa arkası prizleri, tabela bağlantısı, depo aydınlatması ve sigorta kutusu düzenlemesi sık yapılan işler arasındadır.",
        "Dükkanlarda en sık karşılaşılan işler arasında ürün aydınlatması yenileme, ek priz çekme ve dış cephe tabela hattını düzenleme bulunur.",
        "Mağaza içi elektrik hizmetlerinde vitrin ışıkları, kasa bölgesi, güvenlik kamerası hattı ve iç aydınlatma ayarları öne çıkar."
      ],
      reason: [
        "Ticari alanlarda hem güvenli kullanım hem de ürün görünürlüğü açısından doğru elektrik altyapısı şarttır.",
        "Gün boyu aktif kullanılan mekanlarda küçük bir elektrik sorunu bile işi aksattığı için hızlı ve doğru çözüm gerekir.",
        "Aydınlatma kalitesi ve bağlantı güvenliği mağaza düzenini doğrudan etkilediği için hizmet sık tercih edilir."
      ],
      process: [
        "Önce sorunlu ya da yetersiz kalan noktalar belirlenir, ardından iş akışını kesmeyecek şekilde uygulama planı yapılır.",
        "Keşif sırasında vitrin, kasa ve depo alanı birlikte değerlendirilir; ardından müdahale sırası netleştirilir.",
        "İlk görüşmede ihtiyaçlar not edilir, sonra ticari kullanıma uygun malzeme ve uygulama süresi paylaşılır."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da müstakil evler ve geniş yaşam alanlarında elektrik hizmeti, farklı hacimlerde dengeli aydınlatma ve güvenli dağıtım ihtiyacı nedeniyle öne çıkar.",
        "__DISTRICT__ bölgesindeki villa tipi yapılarda elektrik işleri çoğu zaman iç mekan konforunu artırmak ve dış alanlarla uyumlu bir kullanım kurmak için planlanır.",
        "__DISTRICT__'da geniş konutlarda elektrikçi desteği, yalnızca arıza çözümü değil yaşam kalitesini yükseltecek detaylar için de tercih edilir."
      ],
      jobs: [
        "Bahçe aydınlatması, salon ve koridor ışık senaryosu, ek priz planı ve farklı katlarda sigorta dengesi sağlama sık yapılan işlerdir.",
        "Villa tipi yapılarda dış cephe aydınlatması, mutfak ve salon için ayrı kullanım senaryoları, güvenlik kamerası hattı ve akıllı anahtar düzeni öne çıkar.",
        "Geniş yapılarda en çok talep edilen işler kat bazlı elektrik dengelemesi, dekoratif aydınlatma montajı ve kullanım alanına uygun priz dağılımıdır."
      ],
      reason: [
        "Geniş mekanlarda hem estetik hem güvenli kullanım için elektrik düzeninin doğru kurulması gerekir.",
        "Farklı yaşam alanlarını tek bir düzen içinde rahat kullanabilmek için profesyonel planlama önemlidir.",
        "İç ve dış alanların birlikte kullanıldığı yapılarda konforlu bir sistem kurmak için tercih edilir."
      ],
      process: [
        "Önce yapı içindeki kullanım alanları ve elektrik beklentisi belirlenir, ardından iç-dış alan planı birlikte hazırlanır.",
        "Keşif sırasında katlar, bahçe ve ortak alanlar ayrı ayrı değerlendirilir; sonrasında uygulama buna göre planlanır.",
        "İlk görüşmede yaşam alışkanlığı ve aydınlatma beklentisi dinlenir, sonra teknik çözüm buna göre şekillenir."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile yaşamının yoğun olduğu dairelerde elektrik hizmeti daha çok günlük kullanımı rahatlatmak, güvenliği artırmak ve yetersiz priz sorununu gidermek için alınır.",
        "__DISTRICT__ bölgesindeki konutlarda elektrikçi çağrıları çoğu zaman arızalı anahtar-priz, mutfak yükü ve aydınlatma düzeni ihtiyacı üzerinden şekillenir.",
        "__DISTRICT__'da ev içi elektrik düzeni, hem güvenli hem pratik kullanım sağlamak için zaman zaman güncellenmek zorunda kalır."
      ],
      jobs: [
        "Priz ve anahtar değişimi, salon aydınlatması, mutfak için ek hat planı ve sigorta düzenleme en sık yapılan işler arasındadır.",
        "Konutlarda genellikle arıza tespiti, avize montajı, çocuk odası ya da çalışma alanı için ek priz ve mutfak hattı düzeni talep edilir.",
        "Sık karşılaşılan uygulamalar arasında sigorta kontrolü, bozuk priz yenileme, ışık arızası giderme ve yaşam alanına uygun ek bağlantılar yer alır."
      ],
      reason: [
        "Günlük yaşamı aksatan küçük elektrik sorunları ev içinde hızlıca fark edildiği için bu hizmet öncelikli hale gelir.",
        "Daha rahat kullanım, daha güvenli bağlantı ve düzenli aydınlatma için elektrik hizmeti tercih edilir.",
        "Evde cihaz sayısı arttıkça mevcut düzen yetersiz kaldığından profesyonel çözüm gerekir."
      ],
      process: [
        "Önce ihtiyaç ve sorunlu noktalar dinlenir, sonra ev içindeki elektrik yüküne göre çözüm sırası belirlenir.",
        "Keşif sırasında hangi odalarda sorun yaşandığı görülür; malzeme ve uygulama planı buna göre netleştirilir.",
        "İlk adımda güvenlik kontrolü yapılır, ardından istenen eklemeler ve düzeltmeler sırayla uygulanır."
      ]
    })
  },
  "su-tesisatcisi": {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski dairelerde su tesisatı işleri çoğu zaman sızıntı, rezervuar arızası ve yıllar içinde yıpranan bağlantı parçaları nedeniyle gündeme gelir.",
        "__DISTRICT__ tarafındaki eski apartmanlarda tesisat hizmeti, tekrar eden damlatma ve görünmeyen kaçak ihtimali nedeniyle sık ihtiyaç haline gelir.",
        "__DISTRICT__'da yaşlı yapı stoğunda su tesisatı sorunları genellikle küçük bir arıza gibi başlar ama zamanla daha büyük masraflara yol açabileceği için erken müdahale önemlidir."
      ],
      jobs: [
        "Batarya değişimi, rezervuar onarımı, lavabo altı bağlantı yenileme ve gider tıkanıklığı çözümü sık yapılan işler arasındadır.",
        "Eski dairelerde genellikle su kaçağı tespiti, musluk ve ara vana yenileme, sifon sorunları ve gider açma talepleri öne çıkar.",
        "Sık karşılaşılan uygulamalar arasında rezervuar iç takım değişimi, mutfak-banyo bağlantı onarımı ve nem yapan noktaların kontrolü yer alır."
      ],
      reason: [
        "Eski tesisat parçaları zamanla su kaçırdığı ve kullanım güvenliğini düşürdüğü için profesyonel destek gerekir.",
        "Arızayı büyümeden çözmek ve gereksiz kırma riskini azaltmak için tesisatçı hizmeti tercih edilir.",
        "Düzenli çalışmayan su noktaları günlük yaşamı doğrudan etkilediği için bu hizmet öne çıkar."
      ],
      process: [
        "Önce sorun yaşanan nokta kontrol edilir, ardından sızıntının kaynağı ve gerekli parça değişimi belirlenir.",
        "Keşifte görünür bağlantılar, batarya noktaları ve gider hattı incelenir; çözüm buna göre sıralanır.",
        "İlk aşamada arızanın kaynağı tespit edilir, sonra onarım ya da parça yenileme adımları uygulanır."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni konutlarda su tesisatı hizmeti daha çok kullanım alışkanlığına göre küçük revizyonlar ve montaj ihtiyaçları için alınır.",
        "__DISTRICT__ bölgesindeki yeni dairelerde tesisat işleri genellikle armatür değişimi, filtre montajı ve mutfak-banyo kullanımını daha pratik hale getiren dokunuşlar etrafında şekillenir.",
        "__DISTRICT__'da modern daire tiplerinde tesisatçı desteği çoğu zaman acil arıza değil, konfor odaklı düzenlemeler için tercih edilir."
      ],
      jobs: [
        "Batarya montajı, filtre bağlantısı, duş seti yenileme ve yeni cihazlara uygun su hattı düzenleme en sık yapılan işlerdendir.",
        "Yeni dairelerde lavabo ve eviye bağlantısı, çamaşır-bulaşık makinesi su hattı ve duş alanı revizesi sık talep edilir.",
        "Sık karşılaşılan uygulamalar arasında armatür değişimi, gider akış kontrolü ve mutfak altında daha düzenli bağlantı kurulması yer alır."
      ],
      reason: [
        "Standart teslim tesisat düzeni her kullanıcıya uymadığı için küçük ama etkili revizyonlar gerekir.",
        "Konforlu kullanım ve daha düzenli bağlantı görünümü sağlamak için tercih edilir.",
        "Armatür ve cihaz uyumu doğru kurulmadığında kullanım zorluğu oluştuğu için profesyonel destek öne çıkar."
      ],
      process: [
        "Önce istenen revizyon noktaları belirlenir, sonra montaj ve bağlantı işleri buna göre planlanır.",
        "Keşif sırasında mevcut bağlantılar ve yeni kullanılacak ürünler değerlendirilir; ardından uygulama yapılır.",
        "İlk adımda ihtiyaç listesi çıkarılır, sonra parça uyumu ve uygulama süresi netleştirilir."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofislerde su tesisatı işleri, mutfak alanı, lavabo noktaları ve ortak kullanım alanlarının sorunsuz çalışması için önem taşır.",
        "__DISTRICT__ bölgesindeki ofis ve kliniklerde tesisat hizmeti, çalışan konforunu bozan sızıntı ve gider sorunlarını hızlı çözmek için öne çıkar.",
        "__DISTRICT__'da ticari çalışma alanlarında tesisat problemleri iş akışını doğrudan etkilediği için gecikmeden müdahale edilmesi gerekir."
      ],
      jobs: [
        "Ofis mutfağı su bağlantısı, lavabo gider düzeni, sifon onarımı ve filtre bağlantıları sık yapılan işlerdendir.",
        "Ortak alan lavabo sorunları, mutfak hattı, damlatan armatürler ve gider akış problemleri bu segmentte öne çıkar.",
        "Sık karşılaşılan uygulamalar arasında su kaçağı kontrolü, kullanım alanına uygun batarya montajı ve gider tıkanıklığı çözümü yer alır."
      ],
      reason: [
        "Küçük bir sızıntı bile çalışma düzenini bozduğu için ticari alanlarda hızlı ve düzgün tesisat hizmeti önemlidir.",
        "Ortak kullanım alanlarının sorunsuz çalışması ve hijyenin korunması için tesisat düzeni kritik rol oynar.",
        "Ticari mekanda arızanın uzun sürmesi hem konforu hem operasyonu etkilediğinden profesyonel çözüm gerekir."
      ],
      process: [
        "Önce arızanın ofis akışını etkilediği noktalar belirlenir, sonra en kısa müdahale planı oluşturulur.",
        "Keşifte mutfak, lavabo ve gider alanları birlikte incelenir; iş buna göre sıralanır.",
        "İlk olarak sorunlu hat tespit edilir, ardından onarım ve parça değişimi ofis düzenini aksatmadan uygulanır."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da mağaza ve küçük iş yerlerinde tesisat hizmeti genellikle lavabo, mutfak köşesi ve gider hattında yaşanan aksaklıklar nedeniyle ihtiyaç haline gelir.",
        "__DISTRICT__ bölgesindeki ticari alanlarda su tesisatı sorunları çoğu zaman küçük görünse de günlük işleyişi zorlaştırdığı için hızlı çözüm ister.",
        "__DISTRICT__'da iş yerlerinde tesisat düzeni, çalışan alanlarının temiz ve kullanılabilir kalması açısından önemlidir."
      ],
      jobs: [
        "Lavabo bağlantısı, küçük mutfak hattı, gider açma ve damlatan batarya onarımı mağaza tarafında sık yapılan işlerdir.",
        "Ticari alanlarda en sık karşılaşılan uygulamalar arasında el yıkama alanı tesisatı, tıkanıklık çözümü ve bağlantı yenileme yer alır.",
        "Sık talep edilen işler lavabo altı kaçak giderme, armatür değişimi ve su kullanım alanlarını daha düzenli hale getiren müdahalelerdir."
      ],
      reason: [
        "İş yerinde küçük bir tesisat sorunu bile hijyen ve kullanım açısından ciddi aksama yarattığı için tercih edilir.",
        "Hızlı çözülebilen ama doğru yapılması gereken bağlantı işleri için profesyonel destek önemlidir.",
        "Gün boyu açık kalan mekanlarda sürekli damlatan ya da tıkanan noktalar doğrudan müşteri deneyimini etkiler."
      ],
      process: [
        "Önce sorun yaşanan kullanım alanı incelenir, sonra müdahalenin iş akışını minimum etkileyeceği bir sıralama yapılır.",
        "Keşif sırasında lavabo, gider ve su bağlantıları birlikte değerlendirilir; çözüm buna göre uygulanır.",
        "İlk aşamada arıza tespiti yapılır, ardından onarım ve gerekiyorsa parça değişimiyle süreç tamamlanır."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da villa tipi yapılarda tesisat hizmeti, farklı banyo ve mutfak alanlarının dengeli çalışması için daha kapsamlı planlama gerektirir.",
        "__DISTRICT__ bölgesindeki geniş konutlarda su tesisatı işleri tek bir noktadan ibaret olmaz; iç ve dış kullanım alanları birlikte değerlendirilir.",
        "__DISTRICT__'da müstakil yapılarda tesisat düzeni, yaşam konforunu ve uzun vadeli kullanım güvenliğini doğrudan etkiler."
      ],
      jobs: [
        "Birden fazla banyo hattı, mutfak bağlantıları, dış alan muslukları ve su basıncı dengesiyle ilgili işler sık yapılır.",
        "Villa tipi yapılarda rezervuar, duş alanı, dış mekan su hattı ve geniş kullanım alanları için ek bağlantı düzenlemeleri öne çıkar.",
        "Sık talep edilen uygulamalar arasında kat bazlı bağlantı kontrolü, armatür yenileme ve bahçe ya da dış alan su kullanım noktalarının düzenlenmesi bulunur."
      ],
      reason: [
        "Geniş yapılarda tesisatın düzenli çalışması için noktasal değil bütüncül değerlendirme gerekir.",
        "Birden fazla kullanım alanı bulunduğu için küçük arızaların yayılmadan çözülmesi önem taşır.",
        "İç ve dış alanların birlikte kullanıldığı yapılarda su tesisatı konforu doğrudan günlük yaşama yansır."
      ],
      process: [
        "Önce hangi kullanım alanlarında sorun ya da ihtiyaç olduğu belirlenir, ardından iç ve dış hatlar birlikte kontrol edilir.",
        "Keşifte banyo, mutfak ve dış mekan su noktaları ayrı ayrı değerlendirilir; çözüm buna göre planlanır.",
        "İlk aşamada genel sistem gözden geçirilir, sonrasında müdahale gerektiren noktalar sırayla ele alınır."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile dairelerinde tesisat hizmeti, günlük yaşamı aksatan damlatma, tıkanıklık ve bağlantı sorunları nedeniyle sık ihtiyaç haline gelir.",
        "__DISTRICT__ bölgesindeki konutlarda su tesisatı işleri çoğu zaman mutfak, banyo ve makine bağlantılarında yaşanan problemler üzerinden şekillenir.",
        "__DISTRICT__'da ev içi tesisat düzeni, rahat kullanım ve su kaçağı riskini önlemek için zaman zaman yenilenmek zorunda kalır."
      ],
      jobs: [
        "Mutfak eviye bağlantısı, banyo bataryası, makine su hattı ve gider açma işleri en sık yapılan uygulamalardandır.",
        "Konutlarda sık karşılaşılan işler arasında damlatan musluk onarımı, lavabo altı kaçak çözümü ve klozet-rezervuar düzeni yer alır.",
        "En çok talep edilen uygulamalar batarya yenileme, tıkanıklık giderme, makine bağlantısı ve su kaçağı kontrolüdür."
      ],
      reason: [
        "Ev içindeki küçük tesisat sorunları hızla büyüyebildiği ve günlük yaşamı zorlaştırdığı için hizmet öncelikli hale gelir.",
        "Rahat kullanım, su israfını önleme ve gereksiz masrafı engelleme açısından profesyonel müdahale önemlidir.",
        "Banyo ve mutfakta düzenli çalışan bağlantılar konforu doğrudan etkilediği için tercih edilir."
      ],
      process: [
        "Önce sorun dinlenir, ardından mutfak ya da banyo hattı kontrol edilerek arızanın kaynağı netleştirilir.",
        "Keşif sırasında bağlantı noktaları ve gider hattı birlikte değerlendirilir; çözüm buna göre planlanır.",
        "İlk adımda arıza tespiti yapılır, sonra onarım ve gerekirse parça değişimi uygulanır."
      ]
    })
  },
  boyaci: {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski apartman dairelerinde boya işleri çoğu zaman uzun süredir yenilenmeyen duvarları toparlamak ve evi daha ferah göstermek için yapılır.",
        "__DISTRICT__ tarafındaki yaşlı dairelerde boyacı ihtiyacı, çatlaklı yüzeyleri düzeltmek ve yorgun görünen iç mekanı tazelemek için öne çıkar.",
        "__DISTRICT__'da eski konutlarda boya uygulaması yalnızca renk değişimi değil, yüzeyi yeniden düzgün hale getiren bir yenileme süreci olarak düşünülür."
      ],
      jobs: [
        "Duvar çatlak düzeltme, tavan boyası, salon ve koridor yenileme ile boya öncesi yüzey hazırlığı en sık yapılan işlerdendir.",
        "Eski dairelerde genellikle zımpara, macun, astar ve ardından temiz iç cephe boyası uygulaması öne çıkar.",
        "Sık talep edilen uygulamalar arasında kirli duvarların yenilenmesi, tavan kararmasının giderilmesi ve boya öncesi yüzey toparlama bulunur."
      ],
      reason: [
        "Yüzey kusurlarını kapatıp evi daha bakımlı ve aydınlık göstermek için tercih edilir.",
        "Taşınma öncesi ya da yenileme dönemlerinde hızlı fark yaratan en etkili uygulamalardan biri olması nedeniyle öne çıkar.",
        "Eski duvarların yorgun görünümünü temiz ve düzenli hale getirdiği için sık istenir."
      ],
      process: [
        "Önce duvar durumu kontrol edilir, ardından gerekli düzeltme işlemleri ve boya planı belirlenir.",
        "Keşifte yüzey kusurları, renk beklentisi ve oda kullanım yoğunluğu değerlendirilir; sonra uygulamaya geçilir.",
        "İlk aşamada koruma ve hazırlık yapılır, ardından yüzey düzeltme ve boya uygulaması sırayla tamamlanır."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni dairelerde boya hizmeti daha çok kişisel zevke uygun renk geçişleri ve teslim görünümünü daha sıcak hale getirmek için tercih edilir.",
        "__DISTRICT__ bölgesindeki modern konutlarda boyacı desteği, standart beyaz duvarları daha yaşanır ve karakterli hale getirmek isteyenler için öne çıkar.",
        "__DISTRICT__'da yeni yaşam alanlarında boya işi genellikle dekorasyonu tamamlayan son güçlü adımlardan biri olarak düşünülür."
      ],
      jobs: [
        "Salon ve yatak odası renk geçişleri, tavan-boya uyumu, çocuk odası ton çalışmaları ve temiz koruma ile iç cephe boya uygulaması yapılır.",
        "Yeni dairelerde genellikle seçili duvar vurgusu, mat boya uygulaması ve yaşam alanına göre ton dengesi kuran işler talep edilir.",
        "Sık tercih edilen uygulamalar arasında tüm daire boyası, belirli duvarlara renk vurgu çalışması ve boya öncesi hafif yüzey düzeltmeleri yer alır."
      ],
      reason: [
        "Yeni daireyi daha kişisel, daha sıcak ve daha şık hale getirmek için tercih edilir.",
        "Standart teslim görünüm yerine karakterli ama temiz bir iç mekan etkisi sağladığı için öne çıkar.",
        "Mobilya ve ışıkla daha uyumlu bir atmosfer oluşturduğu için kullanıcılar boya hizmetine yönelir."
      ],
      process: [
        "Önce renk beklentisi ve mekanın ışık alma durumu değerlendirilir, sonra uygulama planı belirlenir.",
        "Keşifte yüzey durumu, renk geçişleri ve oda oda kullanım tarzı konuşulur; sonrasında korumalı uygulamaya geçilir.",
        "İlk adımda renk seçimi netleştirilir, ardından hazırlık ve boya uygulaması temiz çalışma düzeniyle ilerler."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofislerde boya hizmeti, mekanı daha profesyonel ve bakımlı göstermek için çoğu zaman yenileme planının önemli parçası olur.",
        "__DISTRICT__ bölgesindeki ofis katlarında boyacı desteği, müşteriye karşı daha temiz bir görünüm ve çalışanlar için daha düzenli bir ortam oluşturmak amacıyla tercih edilir.",
        "__DISTRICT__'da ticari çalışma alanlarında boya uygulaması, hızlı ama düzenli bir yenileme ile ortamın algısını değiştiren güçlü bir adımdır."
      ],
      jobs: [
        "Ofis duvar boyası, toplantı odası yenileme, resepsiyon arkası vurgu duvarı ve tavan boyası bu segmentte sık yapılır.",
        "Klinik ve ofislerde genellikle açık tonlu duvar yenileme, iz kapatma ve düzenli bir giriş alanı görünümü sağlayan boya işleri öne çıkar.",
        "Sık karşılaşılan uygulamalar arasında ortak alan boyası, duvar izlerinin kapatılması ve kurumsal tonlarla uyumlu iç cephe çalışmaları yer alır."
      ],
      reason: [
        "Bakımlı bir ofis görünümü güven verir ve çalışma ortamını daha düzenli hissettirir.",
        "Hızlı etki yaratması ve büyük tadilat gerektirmeden yenilik hissi vermesi nedeniyle tercih edilir.",
        "Müşteri karşılayan mekanlarda temiz duvar görünümü doğrudan algıyı etkilediği için öne çıkar."
      ],
      process: [
        "Önce alanın boşaltılma durumu ve çalışma saatleri değerlendirilir, sonra uygun uygulama planı oluşturulur.",
        "Keşif sırasında duvar izleri, renk ihtiyacı ve alanın kullanım yoğunluğu görülür; buna göre boya sırası belirlenir.",
        "İlk aşamada koruma yapılır, ardından gerekli yüzey düzeltmeleri ve boya uygulaması etaplı şekilde tamamlanır."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da mağaza ve küçük iş yerlerinde boya uygulaması, müşterinin mekana ilk bakışta daha düzenli ve güven veren bir izlenim alması için sık tercih edilir.",
        "__DISTRICT__ bölgesindeki dükkânlarda boyacı hizmeti çoğu zaman vitrin etkisini güçlendirmek ve iç mekanı daha temiz göstermek amacıyla alınır.",
        "__DISTRICT__'da ticari alan boyası, ürün sergilemesini daha iyi öne çıkaran sade ve düzenli bir zemin oluşturduğu için önemlidir."
      ],
      jobs: [
        "Vitrin arkası duvar yenileme, kasa bölgesi boyası, tavan temizleme ve dar alanda hızlı boya uygulamaları öne çıkar.",
        "Dükkanlarda sık yapılan işler arasında duvar kirlerini kapatma, marka renklerine yakın vurgu alanı oluşturma ve aydınlık görünüm sağlayan boya çalışmaları yer alır.",
        "Sık talep edilen uygulamalar mağaza içi genel boya, ürün rafı arka planını düzenleme ve giriş alanını daha bakımlı gösterecek dokunuşlardır."
      ],
      reason: [
        "Ticari alanda temiz duvarlar ürün sunumunu doğrudan güçlendirdiği için tercih edilir.",
        "Kısa sürede gözle görülür yenilik sağlaması mağaza boyasını etkili bir yatırım haline getirir.",
        "Müşteri ilk izlenimini iyileştirdiği ve mekânı daha düzenli gösterdiği için öne çıkar."
      ],
      process: [
        "Önce iş akışı ve kapanış saatleri değerlendirilir, ardından en uygun boya uygulama planı çıkarılır.",
        "Keşifte duvar durumu, renk ihtiyacı ve ürün yerleşimi birlikte düşünülerek uygulama planı yapılır.",
        "İlk aşamada koruma ve hazırlık tamamlanır, boya işi ticari düzeni bozmayacak şekilde ilerletilir."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da villa tipi yapılarda boya hizmeti, geniş yaşam alanlarını daha dengeli ve karakterli göstermek için daha seçici bir planlama gerektirir.",
        "__DISTRICT__ bölgesindeki müstakil konutlarda boyacı desteği, yalnızca yenileme değil iç mekan atmosferini belirleyen bir uygulama olarak öne çıkar.",
        "__DISTRICT__'da geniş hacimli yapılarda boya işi, doğal ışıkla uyumlu renk geçişleri ve uzun süre temiz kalan yüzey hedefiyle planlanır."
      ],
      jobs: [
        "Salon, merdiven boşluğu, koridor geçişleri ve yüksek duvarlı alanlar için uyumlu boya planı ve tavan geçişleri öne çıkar.",
        "Villa tipi yapılarda açık ton dengelemesi, vurgu duvarı, yüksek tavan boyası ve geniş yaşam alanlarını bölmeden yöneten renk kurgusu sık uygulanır.",
        "Sık tercih edilen işler arasında katlar arası renk uyumu, yüksek duvar hazırlığı ve özel alanlara daha karakterli ton çalışmaları yer alır."
      ],
      reason: [
        "Geniş alanlarda doğru renk planı mekanın algısını ciddi biçimde değiştirdiği için boya çok önemlidir.",
        "Doğal ışıkla birlikte çalışan dengeli renk kullanımı, villa tipi yapılarda güçlü sonuç verir.",
        "Hem estetik hem uzun ömürlü bir yüzey beklentisi olduğu için profesyonel boya hizmeti tercih edilir."
      ],
      process: [
        "Önce mekanın ışığı, tavan yüksekliği ve kullanım biçimi değerlendirilir; ardından oda oda renk planı çıkarılır.",
        "Keşif sırasında duvar yüzeyi, kat geçişleri ve dekorasyon hedefi birlikte ele alınır; sonrasında uygulama sırası belirlenir.",
        "İlk aşamada koruma ve yüzey kontrolü yapılır, ardından geniş alanlara uygun boya planı adım adım uygulanır."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile dairelerinde boya işi çoğu zaman evi daha temiz, daha ferah ve daha bakımlı göstermek için planlanır.",
        "__DISTRICT__ bölgesindeki konutlarda boyacı ihtiyacı, kirlenmiş duvarları yenilemek ve yaşam alanına yeni bir hava katmak için ortaya çıkar.",
        "__DISTRICT__'da iç cephe boya uygulaması, büyük tadilat yapmadan evi yenilenmiş hissettiren en etkili işlerden biri olarak öne çıkar."
      ],
      jobs: [
        "Salon, yatak odası, çocuk odası ve koridor boyası ile tavan yenileme konutlarda en sık yapılan işler arasındadır.",
        "Ev içi boya uygulamalarında genellikle duvar yenileme, tavan temizleme ve belirli alanlarda renk vurgu çalışmaları öne çıkar.",
        "Sık talep edilen işler arasında genel daire boyası, giriş alanını aydınlatan renk seçimi ve duvar izlerini kapatan yüzey hazırlıkları bulunur."
      ],
      reason: [
        "Evi daha aydınlık ve düzenli göstermesi nedeniyle boya hizmeti her zaman güçlü bir yenileme seçeneğidir.",
        "Kısa sürede fark yaratması ve mobilya düzenini daha iyi göstermesi bu hizmeti öne çıkarır.",
        "Büyük masraf gerektirmeden yaşam alanını tazelemesi kullanıcıların boya hizmetine yönelmesindeki temel nedenlerden biridir."
      ],
      process: [
        "Önce odalar ve yüzey durumu görülür, sonra hazırlık ve boya sırası netleştirilir.",
        "Keşif sırasında duvar kusurları, renk tercihi ve kullanım yoğunluğu değerlendirilir; uygulama buna göre planlanır.",
        "İlk adımda koruma ve yüzey hazırlığı yapılır, sonra boya işlemi temiz ve planlı şekilde ilerletilir."
      ]
    })
  },
  "koltuk-yikama": {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da uzun süredir kullanılan dairelerde koltuk yıkama hizmeti, kumaşa sinen toz ve lekeleri yerinde temizlemek için sık tercih edilir.",
        "__DISTRICT__ tarafındaki aile evlerinde koltuk yıkama ihtiyacı çoğu zaman günlük kullanımın bıraktığı izleri azaltmak ve evi daha hijyenik hale getirmek amacıyla doğar.",
        "__DISTRICT__'da yoğun kullanılan yaşam alanlarında koltuk temizliği, görünümü tazelemenin yanında kumaşın daha rahat kullanılmasını da sağlar."
      ],
      jobs: [
        "Yerinde koltuk yıkama, leke odaklı temizlik, kumaş yüzeyde biriken tozu alma ve koku azaltmaya yönelik işlemler uygulanır.",
        "Bu segmentte en sık üçlü koltuk, köşe koltuk ve sandalye döşemelerinde kumaşa uygun temizleme işlemleri yapılır.",
        "Koltuk yüzeyi temizliği, lekeli alanlara özel uygulama ve kuruma sürecini hızlandıran işlemler sık talep edilir."
      ],
      reason: [
        "Eski kullanım izlerini azaltmak ve koltuğu daha temiz hissettirmek için tercih edilir.",
        "Kumaşı sökmeden yerinde çözüm sunması ve ev düzenini çok bozmaması önemli avantaj sağlar.",
        "Özellikle çocuklu ve yoğun kullanılan evlerde hijyen beklentisi nedeniyle sık istenir."
      ],
      process: [
        "Önce kumaş tipi ve leke durumu görülür, sonra uygun ürün ve işlem sırası belirlenir.",
        "Keşif niteliğindeki ön görüşmede koltuk yapısı değerlendirilir; temizlik buna göre planlanır.",
        "İlk aşamada yüzey kontrolü yapılır, ardından yıkama ve nem alma süreci uygulanır."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni dairelerde koltuk yıkama hizmeti, açık renk kumaşları korumak ve düzenli bakım yapmak isteyenler için tercih edilir.",
        "__DISTRICT__ bölgesindeki modern konutlarda koltuk temizliği daha çok yaşam alanının temiz görünümünü korumak ve hafif lekeleri büyümeden gidermek için yapılır.",
        "__DISTRICT__'da yeni yaşam alanlarında koltuk yıkama, düzenli bakım anlayışının parçası olarak öne çıkar."
      ],
      jobs: [
        "Açık renk koltuk temizliği, köşe takımı bakımı, minder yüzeyindeki lekeleri çıkarma ve kumaşa uygun hassas yıkama işlemleri uygulanır.",
        "Yeni konutlarda en sık köşe koltuk, yemek sandalyesi ve salon oturma grubuna yönelik yüzey temizleme işleri talep edilir.",
        "Sık tercih edilen işlemler arasında oturma alanı temizliği, hafif leke giderme ve kumaşı yormadan bakım uygulamaları bulunur."
      ],
      reason: [
        "Düzenli bakım ile kumaşın görünümünü ve kullanım rahatlığını korumak için tercih edilir.",
        "Açık renk mobilyalarda küçük lekelerin hızla görünür hale gelmesi bu hizmeti önemli kılar.",
        "Yerinde temizlik sayesinde günlük düzenin çok bozulmaması kullanıcılar için büyük avantajdır."
      ],
      process: [
        "Önce kumaş yapısı değerlendirilir, ardından leke durumuna göre uygun temizleme yöntemi seçilir.",
        "Keşif niteliğindeki ilk görüşmede koltuk türü ve yüzey hassasiyeti belirlenir; sonra işlem uygulanır.",
        "İlk aşamada yüzey test edilir, ardından temizlik ve kuruma planı netleştirilir."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofislerde koltuk yıkama hizmeti, bekleme alanı ve toplantı odası mobilyalarının temiz görünmesi için önem taşır.",
        "__DISTRICT__ bölgesindeki ofis ve kliniklerde koltuk temizliği, müşteriye açık alanların daha düzenli ve hijyenik görünmesini sağlamak için tercih edilir.",
        "__DISTRICT__'da çalışma alanlarında döşemeli oturma gruplarının temizliği, hem görünüm hem kullanım konforu açısından öne çıkar."
      ],
      jobs: [
        "Bekleme koltuğu, toplantı odası oturma grubu, sandalye döşemesi ve giriş alanındaki kumaş yüzeylerin temizliği yapılır.",
        "Ofis segmentinde en sık resepsiyon koltuğu, ziyaretçi sandalyesi ve ortak alan oturma grupları için yıkama hizmeti istenir.",
        "Sık uygulanan işler arasında kumaş yüzey temizliği, leke odaklı işlem ve kullanıma bağlı oluşan izlerin azaltılması bulunur."
      ],
      reason: [
        "Müşteri karşılayan alanlarda temiz oturma grubu görünümü güven veren bir etki oluşturur.",
        "Kumaş yüzeylerde biriken kirin çalışma ortamını yormaması için düzenli bakım gerekir.",
        "Yoğun kullanılan alanlarda hızlı ve yerinde çözüm sunması bu hizmeti öne çıkarır."
      ],
      process: [
        "Önce kumaş durumu ve kullanım yoğunluğu değerlendirilir, sonra en uygun işlem planı çıkarılır.",
        "Keşif sırasında hangi alanların öncelikli olduğu belirlenir; uygulama buna göre yapılır.",
        "İlk adımda yüzey kontrol edilir, ardından temizlik ve kuruma süreci çalışma düzenine uygun planlanır."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da mağaza ve küçük işletmelerde koltuk yıkama hizmeti daha çok müşteri oturma alanlarının temiz ve düzenli görünmesi için tercih edilir.",
        "__DISTRICT__ bölgesindeki ticari alanlarda kumaş koltuk temizliği, bekleme noktalarında hijyen ve ilk izlenim açısından önem kazanır.",
        "__DISTRICT__'da dükkân içi oturma gruplarının temizliği, mekânın genel düzen hissini güçlendiren bir detay olarak öne çıkar."
      ],
      jobs: [
        "Bekleme koltuğu, mağaza içi oturma alanı, sandalye döşemesi ve kumaş bench temizliği sık yapılan işler arasındadır.",
        "Küçük işletmelerde en çok müşteri oturma alanı ve personel kullanımı yoğun koltuklar için temizlik uygulanır.",
        "Sık talep edilen işlemler arasında yüzey temizliği, leke giderme ve kumaşta biriken tozu azaltan yıkama uygulamaları yer alır."
      ],
      reason: [
        "Müşteri tarafından görülen alanların daha bakımlı görünmesini sağladığı için tercih edilir.",
        "Kumaş yüzeylerin hızlı kirlenmesi ve ticari görünüm üzerindeki etkisi bu hizmeti önemli hale getirir.",
        "Yerinde ve kısa sürede uygulanabilmesi işletmeler için pratik bir çözüm sunar."
      ],
      process: [
        "Önce koltuk tipi ve kullanım yoğunluğu değerlendirilir, sonra uygulama buna göre planlanır.",
        "Keşif sırasında leke durumu ve kuruma beklentisi konuşulur; ardından temizlik işlemi yapılır.",
        "İlk aşamada yüzey kontrol edilir, sonra ticari düzeni aksatmayacak şekilde yıkama süreci uygulanır."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da geniş konutlarda koltuk yıkama hizmeti, birden fazla oturma alanının düzenli bakımını sağlamak için tercih edilir.",
        "__DISTRICT__ bölgesindeki villa tipi yapılarda koltuk temizliği, salon, oturma odası ve açık alana yakın yaşam alanlarında hijyen dengesini korumak için önem taşır.",
        "__DISTRICT__'da büyük yaşam alanlarında kumaş mobilyaların temizliği, hem görünüm hem kullanım konforu açısından ayrı bir bakım ihtiyacı doğurur."
      ],
      jobs: [
        "Salon koltuk grubu, TV odası oturma takımı, sandalye döşemesi ve kullanım yoğunluğu yüksek minderli alanların temizliği yapılır.",
        "Villa segmentinde en sık büyük köşe koltuklar, açık renk oturma grupları ve misafir alanı kumaşları için temizlik istenir.",
        "Sık uygulanan işlemler arasında leke odaklı yüzey temizliği, geniş oturma gruplarında detaylı yıkama ve düzenli bakım uygulamaları yer alır."
      ],
      reason: [
        "Geniş yaşam alanlarında kumaş yüzeylerin temizliğini düzenli tutmak daha zahmetli olduğundan profesyonel destek tercih edilir.",
        "Açık renk ve büyük hacimli oturma gruplarında temizlik etkisi daha görünür olduğu için hizmet öne çıkar.",
        "Yerinde uygulama ile mobilyaları taşımadan sonuç alınabilmesi önemli avantaj sağlar."
      ],
      process: [
        "Önce oturma alanlarının sayısı ve kumaş türleri belirlenir, sonra temizlik planı buna göre hazırlanır.",
        "Keşif niteliğindeki ilk görüşmede leke yoğunluğu ve kuruma beklentisi değerlendirilir; ardından uygulama yapılır.",
        "İlk aşamada yüzeyler kontrol edilir, sonra bakım ve kuruma süreci alan bazlı ilerletilir."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile yaşamının sürdüğü evlerde koltuk yıkama hizmeti, günlük kullanımın bıraktığı izleri azaltmak ve salonu daha temiz hissettirmek için alınır.",
        "__DISTRICT__ bölgesindeki konutlarda kumaş koltuk temizliği, özellikle çocuklu ya da misafir trafiği yüksek evlerde sık ihtiyaç haline gelir.",
        "__DISTRICT__'da koltuk yıkama, evdeki en sık kullanılan yüzeyleri yenilemeden temiz ve bakımlı göstermek için tercih edilir."
      ],
      jobs: [
        "Koltuk takımı, berjer, sandalye döşemesi ve günlük kullanıma bağlı lekeli yüzeylerin temizliği uygulanır.",
        "Ev segmentinde en sık yapılan işler arasında köşe koltuk yıkama, açık renk döşeme temizliği ve minder yüzeyi bakımı yer alır.",
        "Sık karşılaşılan uygulamalar yüzey temizliği, leke giderme ve kumaşta biriken kir tabakasını hafifleten işlemlerdir."
      ],
      reason: [
        "Ev içinde en çok temas edilen alanlardan biri olduğu için koltuk temizliği doğrudan konfor hissi yaratır.",
        "Koltukları değiştirmeden daha temiz ve bakımlı görünüm elde etmek isteyenler bu hizmeti tercih eder.",
        "Çocuk, evcil hayvan ya da yoğun kullanım etkilerini azaltmak için düzenli bakım önemli hale gelir."
      ],
      process: [
        "Önce kumaş türü ve leke durumu görülür, ardından yüzeye uygun yıkama yöntemi belirlenir.",
        "Keşif sırasında koltuk yapısı ve kuruma beklentisi değerlendirilir; işlem buna göre uygulanır.",
        "İlk adımda yüzey kontrolü yapılır, sonra temizleme ve kuruma süreci planlı şekilde ilerler."
      ]
    })
  },
  "hali-yikama": {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski apartman dairelerinde halı yıkama hizmeti, toz birikimi ve günlük kullanımın oluşturduğu kir tabakasını azaltmak için sık tercih edilir.",
        "__DISTRICT__ tarafındaki konutlarda halı yıkama ihtiyacı çoğu zaman mevsim geçişlerinde ve uzun süredir detaylı temizlik yapılmamış alanlarda öne çıkar.",
        "__DISTRICT__'da yoğun kullanılan ev halılarında düzenli yıkama, görünümü tazelemenin yanında daha rahat bir kullanım da sağlar."
      ],
      jobs: [
        "Makine halısı, salon halısı, koridor halısı ve kullanım yoğunluğu yüksek alan halıları için yıkama planı oluşturulur.",
        "Bu segmentte en sık lekeli halı temizliği, toz yükü yoğun halıların yıkanması ve kurutma planı öne çıkar.",
        "Sık talep edilen işlemler arasında genel halı temizliği, leke odaklı yıkama ve dokuya uygun kurutma uygulamaları bulunur."
      ],
      reason: [
        "Ev içinde en çok toz tutan yüzeylerden biri olduğu için halı bakımı düzenli yapılmak istenir.",
        "Halıyı yıpratmadan temizlemek ve kullanım rahatlığını artırmak için profesyonel yıkama tercih edilir.",
        "Mevsimsel temizlik ve çocuklu yaşam alanlarında hijyen beklentisi bu hizmeti öne çıkarır."
      ],
      process: [
        "Önce halının türü ve kullanım durumu değerlendirilir, ardından uygun yıkama planı belirlenir.",
        "Keşif niteliğindeki ön görüşmede halı tipi, leke durumu ve teslim beklentisi konuşulur; sonra işlem uygulanır.",
        "İlk aşamada doku kontrol edilir, ardından yıkama ve kurutma süreci buna göre yürütülür."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni dairelerde halı yıkama hizmeti, açık tonlu ve dekoratif halıların düzenli bakımını sağlamak isteyenler için tercih edilir.",
        "__DISTRICT__ bölgesindeki modern konutlarda halı temizliği daha çok görünümü korumak ve lekeleri derinleşmeden gidermek amacıyla yapılır.",
        "__DISTRICT__'da yeni yaşam alanlarında halı yıkama, genel temizlik düzeninin tamamlayıcı parçası olarak öne çıkar."
      ],
      jobs: [
        "Salon halısı, yatak odası halısı ve özel dokulu dekoratif halıların kullanım şekline uygun yıkama planı yapılır.",
        "Yeni konutlarda en sık açık renk halılar, çocuk odası halıları ve dekoratif küçük ölçü halılar için temizlik hizmeti istenir.",
        "Sık yapılan işler arasında hafif leke giderme, genel yüzey temizliği ve halının formunu koruyan yıkama işlemleri yer alır."
      ],
      reason: [
        "Dekoratif halıların ilk günkü görünümünü daha uzun süre korumak için düzenli yıkama tercih edilir.",
        "Açık tonlu halılarda küçük kirler bile görünür olduğu için bakım ihtiyacı daha erken ortaya çıkar.",
        "Halıyı yormadan düzenli temiz tutmak isteyen kullanıcılar için pratik bir çözümdür."
      ],
      process: [
        "Önce halının doku ve renk yapısı değerlendirilir, ardından uygun yıkama yöntemi belirlenir.",
        "Keşif aşamasında kullanım yoğunluğu ve leke tipi konuşulur; teslim planı buna göre netleşir.",
        "İlk adımda halı tipi kontrol edilir, sonra temizlik ve kurutma süreci planlanır."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofislerde halı yıkama hizmeti, giriş ve ortak alanlarda temiz bir kullanım hissi sağlamak için önem taşır.",
        "__DISTRICT__ bölgesindeki ofis ve ticari çalışma alanlarında halı temizliği, yoğun giriş çıkışa bağlı oluşan kir yükünü azaltmak için tercih edilir.",
        "__DISTRICT__'da çalışma mekanlarında halı bakımı, genel düzen ve temizlik algısını korumak açısından öne çıkar."
      ],
      jobs: [
        "Ofis giriş halıları, ortak alan halıları ve yoğun kullanıma maruz kalan zemin tekstilleri için temizlik planı uygulanır.",
        "Bu segmentte en sık giriş alanı halısı, yönetici odası halısı ve toplantı alanı zemin tekstili temizliği talep edilir.",
        "Sık karşılaşılan işlemler arasında kir yoğunluğu yüksek alanlarda derin temizlik ve kuruma planı yer alır."
      ],
      reason: [
        "Yoğun ayak trafiğine bağlı kir görünümünü azaltmak ve iş yerini daha bakımlı göstermek için tercih edilir.",
        "Müşteri karşılayan alanlarda temiz zemin algısı doğrudan önemli olduğu için halı bakımı öne çıkar.",
        "Düzenli bakım ile halının ömrünü uzatmak ve kötü görünümü engellemek mümkün olur."
      ],
      process: [
        "Önce kullanım yoğunluğu değerlendirilir, sonra halının yapısına uygun yıkama yöntemi belirlenir.",
        "Keşif sırasında halı tipi ve teslim süresi konuşulur; operasyon buna göre planlanır.",
        "İlk aşamada durum kontrolü yapılır, ardından yıkama ve kurutma süreci belirlenen takvime göre ilerler."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da mağaza ve küçük işletmelerde halı yıkama hizmeti daha çok giriş alanı ve müşteri kullanımındaki zemin tekstillerinin temiz görünmesi için tercih edilir.",
        "__DISTRICT__ bölgesindeki ticari alanlarda halı temizliği, özellikle yoğun giriş çıkış nedeniyle kısa sürede kirlenen yüzeyleri toparlamak için öne çıkar.",
        "__DISTRICT__'da ticari kullanım gören halılar, müşteri deneyimini doğrudan etkilediği için düzenli bakım ister."
      ],
      jobs: [
        "Giriş halısı, bekleme alanı halısı ve küçük ölçü ticari zemin tekstilleri için temizleme planı uygulanır.",
        "Bu segmentte en çok yoğun kir tutan giriş halıları ve müşteri alanındaki dekoratif halılar için yıkama talep edilir.",
        "Sık yapılan işlemler arasında leke azaltma, toz yükünü düşürme ve düzenli görünümü geri kazandıran halı temizliği yer alır."
      ],
      reason: [
        "Ticari alanda zemin görünümü doğrudan ilk izlenimi etkilediği için düzenli halı bakımı önemlidir.",
        "Yoğun trafik nedeniyle hızlı kirlenen halıları profesyonel şekilde temizlemek için tercih edilir.",
        "İş yerini daha bakımlı ve düzenli göstermek açısından halı temizliği destekleyici rol oynar."
      ],
      process: [
        "Önce halının kullanım alanı değerlendirilir, sonra yıkama ve teslim planı buna göre hazırlanır.",
        "Keşif sırasında kir yoğunluğu ve iş yeri düzeni birlikte düşünülür; süreç buna göre planlanır.",
        "İlk adımda halı tipi ve kullanım yoğunluğu görülür, sonra uygun temizlik yöntemi uygulanır."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da geniş konutlarda halı yıkama hizmeti, farklı odalardaki halıların düzenli bakımı ve temiz görünümünü korumak için tercih edilir.",
        "__DISTRICT__ bölgesindeki villa tipi yapılarda halı temizliği, hem büyük ölçü halılar hem de özel dokulu parçalar için daha dikkatli bir planlama gerektirir.",
        "__DISTRICT__'da geniş yaşam alanlarında halı bakımı, genel konfor ve iç mekan temizliği açısından belirgin fark yaratır."
      ],
      jobs: [
        "Büyük salon halıları, özel dokulu halılar, yatak odası halıları ve kullanım yoğunluğu farklı alanlara göre yıkama planı yapılır.",
        "Villa segmentinde en sık geniş salon halısı, doğal dokulu halı ve dekoratif özel parça temizliği öne çıkar.",
        "Sık talep edilen işlemler arasında detaylı temizlik, dokuya uygun yıkama ve kontrollü kurutma süreçleri yer alır."
      ],
      reason: [
        "Geniş ve özel halıların doğru yıkanması, hem görünüm hem kullanım ömrü açısından önemlidir.",
        "Ev içindeki kalite algısını sürdürebilmek için düzenli ve kontrollü halı bakımı tercih edilir.",
        "Özel dokulu ürünlerde yanlış temizlik riskini azaltmak için profesyonel hizmet öne çıkar."
      ],
      process: [
        "Önce halı türleri ve kullanım alanları belirlenir, sonra uygun yıkama planı hazırlanır.",
        "Keşif aşamasında doku, ölçü ve kullanım yoğunluğu değerlendirilir; teslim süreci buna göre netleşir.",
        "İlk adımda halıların yapısı kontrol edilir, ardından temizlik ve kuruma planı uygulanır."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile evlerinde halı yıkama hizmeti, günlük kullanımın bıraktığı toz ve kir etkisini azaltmak için düzenli olarak tercih edilir.",
        "__DISTRICT__ bölgesindeki konutlarda halı temizliği daha çok mevsim geçişlerinde ve yoğun kullanılan alanları rahatlatmak amacıyla öne çıkar.",
        "__DISTRICT__'da halı yıkama, yaşam alanını daha temiz ve ferah hissettiren bakım hizmetlerinden biri olarak öne çıkar."
      ],
      jobs: [
        "Salon, koridor ve çocuk odası halıları için kullanım düzeyine uygun yıkama ve kurutma planı yapılır.",
        "Konut tarafında en sık aile salonunda kullanılan büyük halılar, giriş halıları ve çocuk kullanımına açık zemin tekstilleri temizlenir.",
        "Sık yapılan işlemler arasında genel halı temizliği, leke odaklı bakım ve dokuyu koruyan yıkama süreci bulunur."
      ],
      reason: [
        "Ev içinde tozu en çok tutan yüzeylerden biri olması nedeniyle halı bakımı düzenli istenir.",
        "Hijyen hissini artırması ve yaşam alanını daha derli toplu göstermesi bu hizmeti öne çıkarır.",
        "Özellikle çocuklu evlerde zemin tekstillerinin temizliği daha çok önem kazanır."
      ],
      process: [
        "Önce halı tipi ve kullanım yoğunluğu değerlendirilir, ardından uygun yıkama planı belirlenir.",
        "Keşif sırasında leke durumu ve teslim beklentisi not edilir; temizlik buna göre uygulanır.",
        "İlk aşamada halının yapısı görülür, sonrasında temizlik ve kuruma süreci planlı şekilde ilerler."
      ]
    })
  },
  "banyo-tadilat": {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski banyo alanlarında tadilat ihtiyacı çoğu zaman su yalıtımı, eskiyen seramikler ve işlevsiz yerleşim nedeniyle ortaya çıkar.",
        "__DISTRICT__ tarafındaki yaşlı dairelerde banyo tadilatı, hem görüntüyü yenilemek hem de tesisat kaynaklı sorunları çözmek için planlanır.",
        "__DISTRICT__'da eski banyo kullanımı zamanla yetersiz kaldığında tadilat, konfor ve güvenlik açısından önemli hale gelir."
      ],
      jobs: [
        "Seramik yenileme, duş alanı düzenleme, vitrifiye değişimi, dolap planı ve tesisat revizesi sık yapılan işlerdir.",
        "Eski banyolarda en çok su yalıtımı, yer eğimi düzeltme, duvar-zemin seramiği yenileme ve armatür değişimi öne çıkar.",
        "Sık talep edilen uygulamalar arasında duş kabini alanını toparlama, tesisatı yenileme ve daha kullanışlı depolama alanı oluşturma yer alır."
      ],
      reason: [
        "Eski banyolarda hem görünüm hem su kaynaklı riskler aynı anda sorun çıkardığı için tadilat tercih edilir.",
        "Günlük kullanımı kolaylaştırması ve uzun vadeli sorunları azaltması nedeniyle öne çıkar.",
        "Küçük ama yoğun kullanılan bir alan olduğu için yapılan doğru yenileme farkı hızlı hissettirir."
      ],
      process: [
        "Önce mevcut durum ve kullanım beklentisi değerlendirilir, sonra söküm ve yenileme planı çıkarılır.",
        "Keşif aşamasında ölçü, tesisat, seramik ve dolap ihtiyacı birlikte ele alınır; iş sırası buna göre belirlenir.",
        "İlk adımda alanın teknik durumu kontrol edilir, ardından uygulama aşamaları netleştirilir."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni dairelerde banyo tadilatı daha çok standart teslim görünümü kişiselleştirmek ve kullanım kalitesini artırmak için tercih edilir.",
        "__DISTRICT__ bölgesindeki modern konutlarda banyo yenilemesi, daha şık bir tasarım ve daha işlevsel depolama ihtiyacı etrafında şekillenir.",
        "__DISTRICT__'da yeni banyolarda tadilat ihtiyacı genellikle arıza değil konfor ve tasarım beklentisi üzerinden doğar."
      ],
      jobs: [
        "Duş alanı revizesi, dolap-tezgah düzeni, armatür değişimi ve seramik seçimiyle daha modern bir görünüm sağlanır.",
        "Yeni banyo tadilatında en sık yapılan işler arasında duş kabini yenileme, dolap uyarlama ve daha güçlü aydınlatma planı bulunur.",
        "Sık talep edilen uygulamalar lavabo alanını büyütme, depolamayı artırma ve sade ama şık yüzey dönüşümleridir."
      ],
      reason: [
        "Kullanım kolaylığını artırması ve banyoyu daha düzenli göstermesi nedeniyle tercih edilir.",
        "Standart teslim banyoyu daha kişisel ve kaliteli bir görünüme kavuşturmak isteyenler için güçlü bir çözümdür.",
        "Küçük dokunuşlarla ciddi fark yaratabilmesi bu hizmeti öne çıkarır."
      ],
      process: [
        "Önce beğenilen tarz ve kullanım sorunları dinlenir, sonra buna uygun yenileme planı oluşturulur.",
        "Keşif sırasında ölçü, depolama ihtiyacı ve malzeme tercihi değerlendirilir; uygulama takvimi buna göre çıkarılır.",
        "İlk aşamada tasarım ve ihtiyaçlar netleştirilir, ardından teknik ve görsel uygulama adımları belirlenir."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofis ve ticari alanlarda banyo tadilatı, çalışan konforu ve hijyen standardını yükseltmek için önemli hale gelir.",
        "__DISTRICT__ bölgesindeki ofislerde banyo yenilemesi çoğu zaman eskiyen kullanım alanlarını daha temiz ve düzenli hale getirmek amacıyla yapılır.",
        "__DISTRICT__'da ticari yapı içindeki ıslak hacimlerin yenilenmesi, mekanın genel kalitesini yükselten bir adım olarak öne çıkar."
      ],
      jobs: [
        "Zemin-seramik yenileme, lavabo alanı düzenleme, klozet değişimi ve aydınlatma iyileştirmesi sık yapılan işler arasındadır.",
        "Ofis banyolarında en çok malzeme yenileme, kullanım kolaylığı sağlayan armatür düzeni ve yüzey modernizasyonu öne çıkar.",
        "Sık talep edilen uygulamalar arasında duvar-zemin seramiği, lavabo ünitesi, ayna-ışık düzeni ve tesisat revizesi bulunur."
      ],
      reason: [
        "Çalışanların ve ziyaretçilerin kullandığı alanların daha temiz ve düzenli görünmesi için tercih edilir.",
        "Eskiyen ıslak hacimler tüm iş yerinin algısını etkilediği için yenileme önemli hale gelir.",
        "Daha kolay temizlenen ve daha düzenli görünen alanlar ticari kullanıma daha uygundur."
      ],
      process: [
        "Önce mevcut kullanım durumu görülür, ardından iş yerini minimum etkileyecek yenileme planı hazırlanır.",
        "Keşifte malzeme durumu, ölçü ve kullanıcı yoğunluğu değerlendirilir; iş buna göre etaplanır.",
        "İlk aşamada teknik ihtiyaçlar belirlenir, sonra görsel ve işlevsel yenileme adımları netleştirilir."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da küçük işletmelerde banyo tadilatı, çalışan ve müşteri kullanımındaki alanları daha temiz ve güven veren hale getirmek için yapılır.",
        "__DISTRICT__ bölgesindeki ticari alanlarda banyo yenilemesi çoğu zaman yıpranmış yüzeyleri ve kullanımı zor alanları iyileştirmek amacıyla tercih edilir.",
        "__DISTRICT__'da işletme içi ıslak hacimlerin düzenli görünmesi, mekanın genel bakım algısını doğrudan etkilediği için tadilat önem taşır."
      ],
      jobs: [
        "Klozet-lavabo yenileme, seramik değişimi, küçük alan düzenleme ve aydınlatma iyileştirmeleri bu segmentte öne çıkar.",
        "Küçük işletmelerde en sık yapılan işler arasında yüzey yenileme, lavabo alanını toparlama ve kullanımı rahatlatan ekipman değişimleri yer alır.",
        "Sık talep edilen uygulamalar arasında seramik yenileme, tesisat düzeni ve daha kolay temizlenen banyo yüzeyleri oluşturma bulunur."
      ],
      reason: [
        "Ticari mekanda küçük bir banyo alanı bile genel bakım izlenimini etkilediği için tadilat tercih edilir.",
        "Daha hijyenik ve kullanımı rahat bir alan oluşturmak için işletmeler bu hizmete yönelir.",
        "Eskiyen yüzeyleri hızlı şekilde yenileyebilmesi bu hizmeti cazip hale getirir."
      ],
      process: [
        "Önce alanın ölçüsü ve kullanım ihtiyacı değerlendirilir, sonra ticari düzene uygun bir yenileme planı çıkarılır.",
        "Keşif sırasında iş akışı, teknik ihtiyaç ve malzeme seviyesi görülür; ardından uygulama takvimi hazırlanır.",
        "İlk aşamada sorunlu noktalar tespit edilir, sonra işlevsel ve görsel çözümler birlikte uygulanır."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da villa tipi yapılarda banyo tadilatı, daha geniş ve daha konforlu kullanım alanları oluşturmak için daha detaylı planlanır.",
        "__DISTRICT__ bölgesindeki geniş konutlarda banyo yenilemesi, yalnızca sorun çözmek değil yaşam kalitesini yükselten bir tasarım işi olarak ele alınır.",
        "__DISTRICT__'da birden fazla banyosu olan yapılarda tadilat, her alanın kullanım biçimine göre ayrı çözümler gerektirir."
      ],
      jobs: [
        "Geniş duş alanı oluşturma, çift lavabo kurgusu, seramik-dolap uyumu ve aydınlatma planı villa segmentinde öne çıkar.",
        "Bu yapılarda en çok istenen işler arasında ebeveyn banyosu yenileme, depolama alanı artırma ve daha şık yüzey dönüşümleri bulunur.",
        "Sık tercih edilen uygulamalar arasında özel ölçü dolap, büyük format seramik ve farklı banyo alanlarını ayrı karakterde yenileme yer alır."
      ],
      reason: [
        "Banyo alanını sadece işlevsel değil daha konforlu ve estetik hale getirmek isteyenler için güçlü bir çözümdür.",
        "Geniş yapılarda doğru planlanmış bir banyo yenilemesi yaşam konforunu belirgin şekilde artırır.",
        "Malzeme kalitesi ve kullanım rahatlığını aynı anda yükseltmek isteyenler bu hizmete yönelir."
      ],
      process: [
        "Önce kullanım alışkanlığı ve beklenti dinlenir, ardından ölçü ve tasarım kararları birlikte netleştirilir.",
        "Keşifte teknik altyapı, depolama ihtiyacı ve görsel beklenti bir arada değerlendirilir; sonra uygulama sırası belirlenir.",
        "İlk aşamada plan oluşturulur, ardından söküm, altyapı ve yeni yüzey uygulamaları adım adım ilerler."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile dairelerinde banyo tadilatı, günlük kullanımı kolaylaştırmak ve küçük alanda daha düzenli bir görünüm elde etmek için tercih edilir.",
        "__DISTRICT__ bölgesindeki konutlarda banyo yenilemesi çoğu zaman eskiyen yüzeyleri değiştirmek ve depolama sorununu azaltmak amacıyla yapılır.",
        "__DISTRICT__'da banyo tadilatı, hem teknik sorunları çözmek hem de yaşam alanını daha rahat kullanılır hale getirmek için öne çıkar."
      ],
      jobs: [
        "Seramik yenileme, dolap düzenleme, duş alanı toparlama ve lavabo kullanımını rahatlatan çözümler sık yapılır.",
        "Konutlarda en sık karşılaşılan işler arasında klozet-lavabo değişimi, zemin yenileme ve daha işlevli banyo planı oluşturma yer alır.",
        "Sık talep edilen uygulamalar küçük banyoda alan kazandıran düzenlemeler, daha temiz yüzeyler ve modern armatür dönüşümleridir."
      ],
      reason: [
        "Küçük ama yoğun kullanılan bir alan olduğu için banyo tadilatı günlük yaşam konforunu hızla etkiler.",
        "Hem görünüm hem kullanım rahatlığı sağlaması nedeniyle aile dairelerinde sık tercih edilir.",
        "Eskiyen yüzeyleri ve depolama sorununu aynı anda çözebilmesi bu hizmeti öne çıkarır."
      ],
      process: [
        "Önce alanın ölçüsü ve kullanım sıkıntıları değerlendirilir, sonra buna uygun yenileme planı çıkarılır.",
        "Keşif sırasında teknik ihtiyaçlar ve görsel beklenti birlikte ele alınır; iş buna göre etaplanır.",
        "İlk aşamada mevcut durum görülür, sonra söküm ve yenileme sırası belirlenir."
      ]
    })
  },
  "mutfak-tadilat": {
    apartment_old: createPatterns({
      intro: [
        "__DISTRICT__'da eski mutfaklarda tadilat ihtiyacı çoğu zaman yetersiz depolama, eski dolap düzeni ve kullanım akışını zorlayan tesisat-elektrik yerleşimi nedeniyle doğar.",
        "__DISTRICT__ tarafındaki yaşlı dairelerde mutfak yenilemesi, hem görünümü toparlamak hem de daha rahat bir çalışma alanı kurmak için tercih edilir.",
        "__DISTRICT__'da eski mutfak planı günlük kullanıma cevap vermediğinde tadilat, evi en çok rahatlatan işlerden biri haline gelir."
      ],
      jobs: [
        "Dolap yenileme, tezgah değişimi, seramik düzenleme, priz-su hattı uyarlama ve depolama alanını artıran çözümler sık uygulanır.",
        "Eski mutfaklarda en çok istenen işler arasında dolap yerleşimini toparlama, tezgahı kullanışlı hale getirme ve zemin-duvar seramiğini yenileme bulunur.",
        "Sık talep edilen uygulamalar arasında ocak-evye düzenini iyileştirme, eski dolapları yenileme ve mutfak akışını kolaylaştıran dönüşümler yer alır."
      ],
      reason: [
        "Eski planlı mutfaklarda hareket alanını artırması ve kullanım kolaylığı sağlaması nedeniyle tercih edilir.",
        "Hem görsel yenilik hem de depolama avantajı sunması mutfak tadilatını güçlü bir yatırım haline getirir.",
        "Elektrik, su ve dolap düzenini bir arada iyileştirebilmesi bu hizmeti öne çıkarır."
      ],
      process: [
        "Önce mevcut mutfak düzeni ve kullanım alışkanlığı değerlendirilir, ardından en uygun yerleşim planı çıkarılır.",
        "Keşifte dolap, tezgah, tesisat ve elektrik noktaları birlikte ele alınır; uygulama buna göre planlanır.",
        "İlk aşamada ölçü ve ihtiyaç analizi yapılır, sonra söküm ve yenileme adımları sırayla ilerler."
      ]
    }),
    apartment_new: createPatterns({
      intro: [
        "__DISTRICT__'da yeni dairelerde mutfak tadilatı daha çok standart teslim görünümü kişiselleştirmek ve depolamayı güçlendirmek için tercih edilir.",
        "__DISTRICT__ bölgesindeki modern mutfaklarda yenileme ihtiyacı arızadan çok kullanım kalitesini ve estetik görünümü yükseltme amacıyla doğar.",
        "__DISTRICT__'da yeni konutlarda mutfak dönüşümü, yaşam alışkanlığına daha uygun bir plan kurmak isteyen kullanıcılar için öne çıkar."
      ],
      jobs: [
        "Dolap iç düzeni artırma, tezgah yenileme, tezgah üstü priz planı ve mutfak aydınlatmasını iyileştiren düzenlemeler sık yapılır.",
        "Yeni mutfaklarda en çok istenen işler arasında daha kullanışlı dolap planı, tezgah malzemesi değişimi ve renk-doku uyumu sağlayan yüzey yenilemeleri bulunur.",
        "Sık talep edilen uygulamalar mutfak ada ya da yarımada düzeni, depolama çözümleri ve cihaz kullanımını rahatlatan detaylardır."
      ],
      reason: [
        "Standart mutfak planını daha işlevli ve kişisel hale getirmek isteyenler için etkili bir çözümdür.",
        "Görünümü modernleştirirken günlük kullanımı kolaylaştırması bu hizmeti öne çıkarır.",
        "Depolama ve çalışma alanını birlikte iyileştirebilmesi kullanıcılar için önemli bir avantaj sağlar."
      ],
      process: [
        "Önce kullanım alışkanlığı ve beklenti konuşulur, sonra buna uygun mutfak düzeni çıkarılır.",
        "Keşif sırasında dolap, tezgah ve cihaz yerleşimi değerlendirilir; uygulama buna göre planlanır.",
        "İlk aşamada tasarım ve ölçü netleştirilir, ardından yenileme adımları sırayla uygulanır."
      ]
    }),
    office: createPatterns({
      intro: [
        "__DISTRICT__'da ofis mutfakları ve personel kullanım alanlarında tadilat ihtiyacı daha çok düzen, dayanıklılık ve kolay bakım beklentisiyle ortaya çıkar.",
        "__DISTRICT__ bölgesindeki ticari çalışma alanlarında mutfak yenilemesi, yoğun kullanıma dayanıklı ve rahat temizlenen çözümler oluşturmak için tercih edilir.",
        "__DISTRICT__'da ofis içi mutfak düzeni, çalışan konforu ve alan verimliliği açısından tadilat gerektirebilen önemli noktalardan biridir."
      ],
      jobs: [
        "Tezgah yenileme, dolap düzenleme, su-elektrik noktası uyarlama ve küçük alanı daha verimli kullanan çözümler uygulanır.",
        "Ofis mutfaklarında en çok depolama düzeni, tezgah yüzeyi ve cihaz kullanımına uygun priz-su planı öne çıkar.",
        "Sık talep edilen işler arasında dayanıklı yüzey seçimi, dolap revizesi ve ortak kullanım alanını daha düzenli gösteren uygulamalar bulunur."
      ],
      reason: [
        "Yoğun kullanılan ortak alanların daha düzenli ve dayanıklı hale gelmesi için tercih edilir.",
        "Küçük mutfak alanını daha işlevli kullanma ihtiyacı ticari yapıda bu hizmeti öne çıkarır.",
        "Kolay temizlenen ve kullanımı rahat bir mutfak çalışan konforunu doğrudan artırır."
      ],
      process: [
        "Önce alanın kullanım yoğunluğu değerlendirilir, sonra ticari kullanıma uygun yenileme planı hazırlanır.",
        "Keşif sırasında dolap, tezgah ve cihaz yerleşimi ele alınır; iş buna göre etaplanır.",
        "İlk aşamada ihtiyaçlar netleştirilir, ardından uygulama sırası ve malzeme planı oluşturulur."
      ]
    }),
    shop: createPatterns({
      intro: [
        "__DISTRICT__'da küçük işletmelerde mutfak tadilatı, personel kullanım alanını daha düzenli ve hijyenik hale getirmek için tercih edilir.",
        "__DISTRICT__ bölgesindeki ticari alanlarda küçük mutfak ya da hazırlık alanı yenilemesi, alanı verimli kullanmak isteyen işletmeler için önem taşır.",
        "__DISTRICT__'da mağaza ve işletme içi mutfak alanları, düzenli depolama ve rahat çalışma için zaman zaman tadilat ister."
      ],
      jobs: [
        "Hazırlık tezgahı, dolap yerleşimi, küçük eviye alanı ve dayanıklı yüzey yenilemeleri bu segmentte öne çıkar.",
        "Ticari kullanımda en sık yapılan işler arasında küçük alan depolama çözümleri, tezgah düzeni ve su-elektrik uyumu bulunur.",
        "Sık talep edilen uygulamalar arasında mutfak köşesini verimli kullanma, dolap yenileme ve hijyenik yüzey dönüşümleri yer alır."
      ],
      reason: [
        "Dar alanda daha rahat çalışmayı sağladığı ve düzen algısını yükselttiği için tercih edilir.",
        "Ticari hazırlık alanlarında pratik kullanım çok önemli olduğu için mutfak tadilatı öne çıkar.",
        "Kolay temizlenebilir ve dayanıklı bir alan oluşturmak işletmeler için güçlü avantaj sağlar."
      ],
      process: [
        "Önce kullanım ihtiyacı ve alan sınırları değerlendirilir, sonra buna uygun yenileme planı yapılır.",
        "Keşif sırasında dolap, tezgah ve bağlantı noktaları birlikte ele alınır; uygulama sırası buna göre belirlenir.",
        "İlk aşamada işlev ihtiyacı netleştirilir, ardından malzeme ve uygulama adımları planlanır."
      ]
    }),
    villa: createPatterns({
      intro: [
        "__DISTRICT__'da villa tipi yapılarda mutfak tadilatı, estetik beklenti ile yoğun günlük kullanım ihtiyacını birlikte karşılayacak şekilde planlanır.",
        "__DISTRICT__ bölgesindeki geniş mutfak alanlarında yenileme, depolama, hazırlık alanı ve görsel uyumu aynı anda ele alan kapsamlı bir çalışmaya dönüşür.",
        "__DISTRICT__'da büyük konut mutfakları yalnızca yemek yapılan alan değil yaşamın önemli parçası olduğu için tadilat çok daha dikkatli düşünülür."
      ],
      jobs: [
        "Büyük tezgah düzeni, ada planı, dolap hacmi artırma, aydınlatma ve su-elektrik uyumlu yenilemeler villa segmentinde öne çıkar.",
        "Geniş mutfaklarda en çok istenen işler arasında ada ya da yarımada kurgusu, özel ölçü dolap ve daha konforlu hazırlık alanı oluşturma yer alır.",
        "Sık talep edilen uygulamalar büyük depolama çözümleri, dayanıklı tezgahlar ve yaşam alanıyla uyumlu mutfak tasarımıdır."
      ],
      reason: [
        "Mutfak ve yaşam alanı ilişkisini güçlendirmesi, hem estetik hem işlev açısından bu hizmeti öne çıkarır.",
        "Geniş hacimli yapılarda doğru planlanmış bir mutfak günlük kullanım kalitesini belirgin biçimde artırır.",
        "Depolama, çalışma alanı ve tasarımı aynı anda geliştirebilmek villa kullanıcıları için güçlü avantaj sağlar."
      ],
      process: [
        "Önce kullanım biçimi, depolama ihtiyacı ve tasarım beklentisi değerlendirilir, ardından bütüncül plan çıkarılır.",
        "Keşif sırasında tezgah, dolap, cihaz yerleşimi ve dolaşım alanı birlikte ele alınır; sonra uygulama planlanır.",
        "İlk aşamada ölçü ve ihtiyaç analizi yapılır, ardından malzeme seçimi ve uygulama sırası netleştirilir."
      ]
    }),
    mixed_family: createPatterns({
      intro: [
        "__DISTRICT__'da aile dairelerinde mutfak tadilatı, depolamayı artırmak, hareket alanını rahatlatmak ve mutfağı daha kullanışlı hale getirmek için tercih edilir.",
        "__DISTRICT__ bölgesindeki konutlarda mutfak yenilemesi çoğu zaman eski dolap düzenini değiştirmek ve hazırlık alanını daha verimli kullanmak amacıyla yapılır.",
        "__DISTRICT__'da mutfak tadilatı, günlük yaşamı en çok kolaylaştıran yenileme adımlarından biri olduğu için öne çıkar."
      ],
      jobs: [
        "Dolap yenileme, tezgah değişimi, seramik düzenleme ve priz-su hattını mutfak kullanımına göre uyarlayan çözümler uygulanır.",
        "Konutlarda en sık yapılan işler arasında depolama alanını artırma, mutfak girişini toparlama ve daha rahat tezgah kullanımı sağlayan yenilemeler yer alır.",
        "Sık talep edilen uygulamalar arasında dolap iç düzeni, yüzey yenileme ve cihaz kullanımını kolaylaştıran plan değişiklikleri bulunur."
      ],
      reason: [
        "Mutfakta geçirilen zamanı daha konforlu hale getirmesi bu hizmeti aile dairelerinde çok değerli kılar.",
        "Hem görünüm hem işlev açısından hızlı fark yarattığı için sık tercih edilir.",
        "Küçük alanı daha verimli kullandırması ve depolama sorununu azaltması en büyük avantajlarındandır."
      ],
      process: [
        "Önce mutfak kullanım alışkanlığı değerlendirilir, sonra buna uygun dolap ve tezgah planı hazırlanır.",
        "Keşif sırasında mevcut düzen, cihaz yerleri ve hareket alanı birlikte ele alınır; iş buna göre sıralanır.",
        "İlk aşamada ölçü ve ihtiyaçlar netleştirilir, ardından söküm ve yenileme süreci planlı şekilde ilerler."
      ]
    })
  }
};

function getServicePatternKey(pageData: ResolvedPageData) {
  if (pageData.location.kind === "district") {
    return getDistrictSegment(pageData.location.district.slug);
  }

  if (pageData.location.kind === "city") {
    return pickPattern(
    {
        apartment_old: true,
        apartment_new: true,
        office: true,
        mixed_family: true
      },
      `${pageData.location.city.slug}:${pageData.service.slug}`
    )
      ? Object.keys({
          apartment_old: true,
          apartment_new: true,
          office: true,
          mixed_family: true
        })[
          hashText(`${pageData.location.city.slug}:${pageData.service.slug}`) % 4
        ]
      : "mixed_family";
  }

  return "mixed_family";
}

function getGeneratedCopy(
  pageData: ResolvedPageData,
  section: keyof PatternCopy
): string | null {
  const patterns = servicePatterns[pageData.service.slug];
  if (!patterns) {
    return null;
  }

  const patternKey = getServicePatternKey(pageData);
  const pattern = patterns[patternKey] ?? patterns.mixed_family ?? Object.values(patterns)[0];
  if (!pattern) {
    return null;
  }

  return fillTemplate(
    pickVariant(pattern[section], `${pageData.slug}:${section}:${patternKey}`),
    pageData
  );
}

export function getIntroText(pageData: ResolvedPageData) {
  const override = pageCopyMap[getOverrideKey(pageData)]?.intro;
  if (override) {
    return override;
  }

  const generated = getGeneratedCopy(pageData, "intro");
  if (generated) {
    return generated;
  }

  return pageData.service.description;
}

const serviceFaqs: Record<string, FaqItem[]> = {
  alcipanci: [
    {
      question: "Alçıpan fiyatı neye göre değişir?",
      answer:
        "Fiyat; yapılacak alanın metrekaresine, düz tavan mı dekoratif uygulama mı istendiğine, kullanılacak profil ve levha tipine ve ek boya hazırlığı gerekip gerekmediğine göre değişir."
    },
    {
      question: "Asma tavan ne kadar sürer?",
      answer:
        "Süre işin büyüklüğüne göre değişir. Küçük oda ve salon uygulamaları daha kısa sürede tamamlanırken, ışık bandı, niş ya da çok bölümlü tavan işlerinde süre keşif sonrası netleşir."
    },
    {
      question: "Bölme duvar için keşif gerekli mi?",
      answer:
        "Evet, özellikle oda ayırma, ofis bölme ya da giyinme alanı oluşturma gibi işlerde ölçü ve kullanım amacı doğru planlanmalıdır. Keşif ile kapı konumu, ses ihtiyacı ve hat geçişleri birlikte değerlendirilir."
    },
    {
      question: "Hangi alanlarda alçıpan kullanılır?",
      answer:
        "Salon tavanlarında, koridorlarda, TV ünitesi arkalarında, mağaza içlerinde, ofis bölmelerinde, yatak odası nişlerinde ve gizli ışık detaylarında alçıpan sık kullanılır."
    }
  ],
  elektrikci: [
    {
      question: "Elektrik arızasında önce ne kontrol edilir?",
      answer:
        "Önce sigorta durumu, arızanın tek bir noktada mı yoksa hatta mı olduğu ve bağlantı güvenliği kontrol edilir. Sorunun kaynağı netleşmeden rastgele müdahale edilmesi önerilmez."
    },
    {
      question: "Yeni priz hattı çekmek mümkün mü?",
      answer:
        "Evet. Mekanın yapısına ve mevcut yük durumuna göre yeni priz noktaları planlanabilir. Özellikle mutfak, çalışma alanı ve TV ünitesi çevresinde bu ihtiyaç sık görülür."
    },
    {
      question: "Sigorta neden sürekli atar?",
      answer:
        "Aşırı yük, arızalı cihaz, gevşek bağlantı veya eski hat yapısı buna neden olabilir. Net neden için hattın ve kullanılan cihazların birlikte değerlendirilmesi gerekir."
    },
    {
      question: "Aydınlatma montajı da yapılıyor mu?",
      answer:
        "Evet. Avize, spot, aplik ve dekoratif aydınlatmalar için bağlantı ve montaj desteği sağlanabilir."
    }
  ],
  "su-tesisatcisi": [
    {
      question: "Su kaçağı nasıl anlaşılır?",
      answer:
        "Beklenmeyen nem, duvarda kabarma, sürekli damlama ya da faturada anormal artış gibi belirtiler su kaçağına işaret edebilir. Kaynağı görmek için bağlantıların ve kullanım noktalarının kontrol edilmesi gerekir."
    },
    {
      question: "Gider tıkanıklığı için ne zaman müdahale gerekir?",
      answer:
        "Su geç akıyorsa, kötü koku varsa ya da geri tepme başladıysa gecikmeden müdahale edilmesi gerekir. Erken çözüm daha büyük sorunu engeller."
    },
    {
      question: "Batarya değişimi ne kadar sürer?",
      answer:
        "Uygun bağlantı varsa çoğu batarya değişimi kısa sürede tamamlanabilir. Ancak eski bağlantı elemanları sorunluysa süre uzayabilir."
    },
    {
      question: "Tesisat yenilemesi her zaman gerekli mi?",
      answer:
        "Hayır. Bazı durumlarda lokal onarım yeterli olur. Karar, hattın genel durumu ve arızanın tekrarlama riskine göre verilir."
    }
  ],
  boyaci: [
    {
      question: "Boya öncesi duvar hazırlığı yapılıyor mu?",
      answer:
        "Evet. Çatlak, delik ve yüzey bozuklukları kontrol edilir; gerekiyorsa macun, zımpara ve astar işlemleri uygulanır. Hazırlık kalitesi son görünümü doğrudan etkiler."
    },
    {
      question: "Evde yaşarken boya yapılabilir mi?",
      answer:
        "İşin kapsamına göre planlanabilir. Oda oda ilerleme ile yaşam alanı tamamen devre dışı kalmadan boya uygulanabilir."
    },
    {
      question: "Renk seçiminde destek veriliyor mu?",
      answer:
        "Evet. Mekanın ışık alma durumu, mobilya düzeni ve istenen atmosfer dikkate alınarak yönlendirme yapılabilir."
    },
    {
      question: "Boya ne kadar sürede tamamlanır?",
      answer:
        "Süre metrekare, yüzey durumu ve uygulanacak kat sayısına göre değişir. Net plan keşif sonrası paylaşılır."
    }
  ],
  "koltuk-yikama": [
    {
      question: "Koltuk yıkama ne kadar sürer?",
      answer:
        "Süre koltuk sayısına, kumaş yapısına ve leke yoğunluğuna göre değişir. Çoğu yerinde uygulama birkaç saat içinde tamamlanır."
    },
    {
      question: "Her leke çıkar mı?",
      answer:
        "Lekenin türüne ve ne kadar süredir kumaşta olduğuna göre sonuç değişebilir. Uygulama öncesi beklenti buna göre değerlendirilir."
    },
    {
      question: "Kumaşa zarar gelir mi?",
      answer:
        "Doğru ürün ve uygun işlem seçildiğinde kumaş korunur. Bu yüzden kumaş tipi kontrol edilmeden gelişigüzel işlem yapılmaz."
    },
    {
      question: "Koltuklar ne zaman kullanıma hazır olur?",
      answer:
        "Kuruma süresi ortam sıcaklığına ve kumaş yapısına bağlıdır. Genellikle işlem sonrası belirli bir bekleme süresi gerekir."
    }
  ],
  "hali-yikama": [
    {
      question: "Halı yıkama süresi neye göre değişir?",
      answer:
        "Halı türü, kir yoğunluğu ve kurutma ihtiyacı süreyi etkiler. Teslim planı halının yapısına göre belirlenir."
    },
    {
      question: "Özel dokulu halılar için ayrı işlem uygulanır mı?",
      answer:
        "Evet. Yün ya da hassas dokulu halılarda standart işlem yerine yapıya uygun daha kontrollü yöntem tercih edilir."
    },
    {
      question: "Leke tamamen çıkmazsa ne olur?",
      answer:
        "Bazı eski ve derine işlemiş lekelerde tam sonuç her zaman mümkün olmayabilir. Ancak yüzeye ve dokuya zarar vermeden en uygun yöntem uygulanır."
    },
    {
      question: "Koku sorunu da giderilir mi?",
      answer:
        "Halıdaki koku kaynağına göre temizlik sonrası belirgin rahatlama sağlanabilir. Sonuç halının yapısı ve kullanım durumuna bağlıdır."
    }
  ],
  "banyo-tadilat": [
    {
      question: "Banyo tadilatı süresi neye göre değişir?",
      answer:
        "Alanın büyüklüğü, söküm ihtiyacı, tesisat durumu ve seçilecek malzemeler süreyi doğrudan etkiler. Net zamanlama keşif sonrası paylaşılır."
    },
    {
      question: "Tesisat tamamen yenilenmek zorunda mı?",
      answer:
        "Her zaman değil. Mevcut hattın durumu kontrol edilir; gerekiyorsa kısmi ya da tam yenileme önerilir."
    },
    {
      question: "Küçük banyolarda alan kazanmak mümkün mü?",
      answer:
        "Evet. Doğru dolap planı, duş alanı seçimi ve lavabo yerleşimiyle küçük banyolar daha kullanışlı hale getirilebilir."
    },
    {
      question: "Malzeme seçimi konusunda destek veriliyor mu?",
      answer:
        "Evet. Kullanım yoğunluğu, bütçe ve görünüm beklentisine göre malzeme yönlendirmesi yapılabilir."
    }
  ],
  "mutfak-tadilat": [
    {
      question: "Mutfak tadilatında önce ne planlanır?",
      answer:
        "Önce kullanım alışkanlığı, depolama ihtiyacı ve cihaz yerleşimi değerlendirilir. Sonrasında dolap, tezgah, su ve elektrik düzeni buna göre şekillenir."
    },
    {
      question: "Dolapları tamamen değiştirmek şart mı?",
      answer:
        "Her durumda değil. Mevcut dolap yapısına göre kapak, gövde veya tüm sistem için farklı yenileme seçenekleri değerlendirilebilir."
    },
    {
      question: "Mutfak tadilat süresi ne kadar olur?",
      answer:
        "Süre iş kalemlerine göre değişir. Yalnızca dolap-tezgah yenilemesi ile tesisat-seramik işlerinin de dahil olduğu kapsamlı tadilat aynı süreyi gerektirmez."
    },
    {
      question: "Küçük mutfak daha kullanışlı hale getirilebilir mi?",
      answer:
        "Evet. Dolap yerleşimi, tezgah planı ve depolama çözümleri doğru tasarlanırsa küçük mutfaklar belirgin şekilde rahatlatılabilir."
    }
  ]
};

const categoryFaqs: Record<Service["category"], FaqItem[]> = {
  usta: [
    {
      question: "Fiyat neye göre belirlenir?",
      answer:
        "Usta hizmetlerinde fiyat; arızanın ya da yapılacak işin kapsamına, kullanılacak malzemeye ve yerinde ek işlem gerekip gerekmediğine göre belirlenir."
    },
    {
      question: "Aynı gün hizmet almak mümkün mü?",
      answer:
        "Müsaitlik durumuna göre aynı gün yönlendirme yapılabilir. Acil durumlarda önce telefonla sorun dinlenir, ardından en hızlı şekilde uygun ekip planlanır."
    },
    {
      question: "Malzemeyi siz mi getiriyorsunuz?",
      answer:
        "Çoğu uygulamada gerekli ana malzemeler ve bağlantı parçaları ekip tarafından temin edilebilir. Özel tercih isteniyorsa marka ve ürün seçimi birlikte netleştirilir."
    },
    {
      question: "Keşif gerekli olur mu?",
      answer:
        "Arıza tespiti ve kapsamı net olmayan işler için keşif ya da fotoğraflı ön değerlendirme önerilir. Böylece iş planı daha doğru çıkarılır."
    }
  ],
  tadilat: [
    {
      question: "Tadilat süresi neye göre değişir?",
      answer:
        "Süre; alanın büyüklüğüne, söküm gerekip gerekmediğine, uygulanacak iş kalemlerine ve malzeme tedarikine göre belirlenir."
    },
    {
      question: "Evde yaşam devam ederken çalışma yapılabilir mi?",
      answer:
        "İşin türüne göre planlama yapılabilir. Bazı işlerde bölümlü çalışma mümkündür, bazı kapsamlı uygulamalarda ise alanın daha kontrollü kullanılması gerekir."
    },
    {
      question: "Malzeme seçimi konusunda destek veriliyor mu?",
      answer:
        "Evet. Bütçe, kullanım yoğunluğu ve görünüm beklentisi birlikte değerlendirilerek yönlendirme yapılabilir."
    },
    {
      question: "Önceden keşif yapılması gerekli mi?",
      answer:
        "Tadilat işlerinde keşif neredeyse her zaman önerilir. Böylece ölçü, mevcut altyapı ve iş sırası doğru planlanır."
    }
  ],
  temizlik: [
    {
      question: "Kullanılan ürünler yüzeye uygun mu seçiliyor?",
      answer:
        "Evet. Kumaş, doku ve yüzey yapısı dikkate alınarak uygun ürün ve yöntem seçilir."
    },
    {
      question: "İşlem ne kadar sürer?",
      answer:
        "Süre hizmet tipine ve alanın durumuna göre değişir. Net yönlendirme ön bilgi sonrası yapılabilir."
    },
    {
      question: "Leke tamamen çıkar mı?",
      answer:
        "Lekenin türüne ve ne kadar süredir yüzeyde olduğuna göre sonuç değişebilir. Uygulama öncesinde bu durum netleştirilir."
    },
    {
      question: "Randevu almadan önce bilgi verebilir miyim?",
      answer:
        "Elbette. Alanın büyüklüğü, kullanım durumu ya da leke gibi detayları paylaşırsanız daha doğru yönlendirme yapılabilir."
    }
  ],
  "ic-mimar": [
    {
      question: "İç mimarlık hizmeti hangi aşamaları kapsar?",
      answer:
        "İhtiyaca göre konsept geliştirme, yerleşim planı, malzeme seçimi, uygulama detayları ve saha koordinasyonu bir arada sunulabilir."
    },
    {
      question: "Sadece bir oda için destek alınabilir mi?",
      answer:
        "Evet. Tüm ev yerine salon, mutfak, ofis bölümü ya da belirli kullanım alanları için de destek planlanabilir."
    },
    {
      question: "Uygulama sürecinde takip yapılıyor mu?",
      answer:
        "Talebe göre uygulama sürecinde kontrol ve malzeme uyumu takibi de hizmetin parçası olabilir."
    },
    {
      question: "Bütçeye göre çözüm üretmek mümkün mü?",
      answer:
        "Evet. Tasarım kararları bütçe öncelikleri ve kullanım ihtiyaçlarına göre şekillendirilebilir."
    }
  ]
};

export function getFaqItems(pageData: ResolvedPageData): FaqItem[] {
  const override = pageCopyMap[getOverrideKey(pageData)]?.faq;
  if (override) {
    return override;
  }

  return serviceFaqs[pageData.service.slug] ?? categoryFaqs[pageData.service.category];
}

const relatedMap: Record<string, string[]> = {
  alcipanci: ["boyaci", "elektrikci", "banyo-tadilat"],
  elektrikci: ["su-tesisatcisi", "mutfak-tadilat", "boyaci"],
  "su-tesisatcisi": ["elektrikci", "banyo-tadilat", "mutfak-tadilat"],
  boyaci: ["alcipanci", "banyo-tadilat", "mutfak-tadilat"],
  "koltuk-yikama": ["hali-yikama", "boyaci", "alcipanci"],
  "hali-yikama": ["koltuk-yikama", "boyaci", "alcipanci"],
  "banyo-tadilat": ["su-tesisatcisi", "elektrikci", "boyaci"],
  "mutfak-tadilat": ["elektrikci", "su-tesisatcisi", "boyaci"],
  "ic-mimar": ["mutfak-tadilat", "banyo-tadilat", "boyaci"]
};

function getClosestServices(currentService: Service) {
  return services
    .filter((service) => service.slug !== currentService.slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.category === currentService.category) * 2 +
        Number(left.hasDistrictPages === currentService.hasDistrictPages);
      const rightScore =
        Number(right.category === currentService.category) * 2 +
        Number(right.hasDistrictPages === currentService.hasDistrictPages);

      return rightScore - leftScore;
    })
    .slice(0, 3);
}

export function getRelatedServices(currentSlug: string) {
  const mapped = relatedMap[currentSlug];
  if (mapped) {
    return mapped
      .map((slug) => servicesBySlug.get(slug))
      .filter((service): service is Service => Boolean(service));
  }

  const currentService = servicesBySlug.get(currentSlug);
  if (!currentService) {
    return services.slice(0, 3);
  }

  return getClosestServices(currentService);
}

export function getPageContentBlocks(pageData: ResolvedPageData): PageContentBlock[] {
  const generatedJobs = getGeneratedCopy(pageData, "jobs");
  const generatedReason = getGeneratedCopy(pageData, "reason");
  const generatedProcess = getGeneratedCopy(pageData, "process");

  const blocks: PageContentBlock[] = [];

  if (generatedJobs) {
    blocks.push({
      title: "Hangi işler yapılır?",
      body: generatedJobs
    });
  }

  if (generatedReason) {
    blocks.push({
      title: "Neden tercih edilir?",
      body: generatedReason
    });
  }

  if (generatedProcess) {
    blocks.push({
      title: "Süreç nasıl işler?",
      body: generatedProcess
    });
  }

  return blocks;
}

const majorIstanbulDistricts = [
  "kadikoy",
  "kartal",
  "uskudar",
  "sisli",
  "besiktas",
  "bakirkoy",
  "maltepe",
  "pendik",
  "umraniye",
  "sariyer"
];

const districtNeighbors: Record<string, string[]> = {
  kartal: ["maltepe", "pendik", "kadikoy"],
  kadikoy: ["uskudar", "maltepe", "besiktas"],
  besiktas: ["sisli", "sariyer", "beyoglu"],
  uskudar: ["kadikoy", "umraniye", "atasehir"],
  sisli: ["besiktas", "kagithane", "sariyer"],
  bakirkoy: ["bahcelievler", "zeytinburnu", "kucukcekmece"],
  pendik: ["kartal", "tuzla", "maltepe"],
  maltepe: ["kartal", "kadikoy", "umraniye"],
  umraniye: ["uskudar", "atasehir", "sancaktepe"],
  sariyer: ["besiktas", "sisli", "beykoz"]
};

function toDistrictLink(slug: string, serviceSlug: string) {
  const district = districtsBySlug.get(slug);
  if (!district) {
    return null;
  }

  return {
    href: `/${slug}-${serviceSlug}`,
    label: `${district.name} ${servicesBySlug.get(serviceSlug)?.name ?? ""}`.trim()
  };
}

export function getAreaLinks(pageData: ResolvedPageData): PageLinkItem[] {
  if (pageData.service.slug !== "alcipanci") {
    return [];
  }

  if (pageData.location.kind === "city" && pageData.location.city.slug === "istanbul") {
    return majorIstanbulDistricts
  .map((slug) => toDistrictLink(slug, "alcipanci"))
  .filter((item): item is PageLinkItem => Boolean(item));
  }

  if (pageData.location.kind !== "district") {
    return [];
  }

  if (pageData.location.city.slug !== "istanbul") {
    return [];
  }

  const currentDistrictSlug = pageData.location.district.slug;

  const links: PageLinkItem[] = [
    {
      href: "/istanbul-alcipanci",
      label: "İstanbul Alçıpan Hizmeti"
    }
  ];

  const neighbors =
    districtNeighbors[currentDistrictSlug] ??
    majorIstanbulDistricts.filter((slug) => slug !== currentDistrictSlug).slice(0, 3);

  return links.concat(
    neighbors
  .filter((slug) => slug !== currentDistrictSlug)
  .map((slug) => toDistrictLink(slug, "alcipanci"))
  .filter((item): item is PageLinkItem => Boolean(item))
  );
}

export function getCtaCopy(pageData: ResolvedPageData) {
  if (pageData.service.slug === "alcipanci" && pageData.location.kind === "city" && pageData.location.city.slug === "istanbul") {
    return {
      title: "İstanbul için alçıpan keşfi ve fiyat bilgisi alın",
      description:
        "Anadolu Yakası ya da Avrupa Yakası fark etmeksizin yapılacak işi kısaca paylaşın; alanın durumuna göre ön bilgi, keşif yönlendirmesi ve uygun uygulama planı için hızlıca dönüş yapalım.",
      primaryLabel: "Telefonla Bilgi Al",
      primaryHref: PHONE_HREF
    };
  }

  if (pageData.location.kind === "district") {
    return {
      title: `${pageData.location.district.name} için ${pageData.service.name.toLocaleLowerCase("tr-TR")} desteği alın`,
      description:
        "Yapılacak işi, alanın durumunu ve beklentinizi paylaştığınızda size uygun keşif, ön bilgi ve uygulama planı için hızlıca dönüş yapalım.",
      primaryLabel: "Hemen Ara",
      primaryHref: PHONE_HREF
    };
  }

  if (pageData.location.kind === "city") {
    return {
      title: `${pageData.location.city.name} için ${pageData.service.name.toLocaleLowerCase("tr-TR")} planlaması yapalım`,
      description:
        "Telefon üzerinden ihtiyacınızı kısaca paylaşın; şehir genelindeki iş planı, yaklaşık süreç ve ön bilgi için sizi doğru şekilde yönlendirelim.",
      primaryLabel: "Telefonla Bilgi Al",
      primaryHref: PHONE_HREF
    };
  }

  return null;
}

export const contentExpansionGuide = {
  keys: {
    district: "district:{districtSlug}:{serviceSlug}",
    city: "city:{citySlug}:{serviceSlug}",
    service: "service:{serviceSlug}"
  },
  notes: [
    "Önce pageCopyEntries ile güçlü manuel içerik ekleyin; sistem bunu otomatik içerik üretimine tercih eder.",
    "Override yazmadığınız sayfalarda servicePatterns içindeki varyasyon motoru devreye girer.",
    "Yeni hizmet eklerken intro/jobs/reason/process ve serviceFaqs alanlarını birlikte tanımlayın."
  ]
} as const;
