import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { CTASection } from "@/components/CTASection";
import { PHONE_HREF } from "@/lib/site";

const sampleLinks = [
  { href: "/kartal-alcipanci", label: "Kartal Alçıpan Ustası" },
  { href: "/istanbul-elektrikci", label: "İstanbul Elektrikçi" },
  { href: "/kadikoy-su-tesisatcisi", label: "Kadıköy Su Tesisatçısı" },
  { href: "/izmir-boyaci", label: "İzmir Boyacı" },
  { href: "/bodrum-koltuk-yikama", label: "Bodrum Koltuk Yıkama" }
];

export default function HomePage() {
  return (
    <main>
      <HeroSection
        eyebrow="İç Mekan"
        title="Eviniz ve iş yeriniz için güvenilir usta ve tadilat hizmetleri"
        locationLine="İstanbul, İzmir ve Muğla'da yerel ekip desteği"
        description="Alçıpan, boya, tesisat, elektrik, temizlik ve tadilat ihtiyaçlarınız için bulunduğunuz bölgeye uygun hizmet sayfasından hızlıca teklif alabilir, telefonla hemen ulaşabilirsiniz."
        badges={["Hızlı geri dönüş", "Yerinde keşif", "Temiz işçilik"]}
        actions={
          <>
            <a className="button" href={PHONE_HREF}>
              Hemen Ara
            </a>
            <Link className="button secondary" href="/kartal-alcipanci">
              Hizmet Bölgeleri
            </Link>
          </>
        }
        imagePath="/images/alcipanci/genel/alcipanci-genel-asma-tavan.webp"
        imageAlt="İç Mekan hizmetleri"
      />

      <section className="section">
        <div className="container stack">
          <div className="card" style={{ padding: "1.5rem" }}>
            <p className="eyebrow">Öne Çıkan Bölgeler</p>
            <div className="grid two" style={{ marginTop: "1rem" }}>
              {sampleLinks.map((item) => (
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

      <CTASection
        title="İhtiyacınızı anlatın, size uygun ekip yönlendirilsin"
        description="Tadilat, usta ya da temizlik hizmetlerinde doğru planlama için kısa bir ön görüşme yeterlidir. Bölgenize uygun ekip ve en yakın randevu bilgisi için hemen ulaşabilirsiniz."
        primaryLabel="Telefonla Ulaşın"
        primaryHref={PHONE_HREF}
        secondaryLabel="Kartal Alçıpan Ustası"
        secondaryHref="/kartal-alcipanci"
      />
    </main>
  );
}
