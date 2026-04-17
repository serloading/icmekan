# İç Mekan Yerel Hizmet Sitesi

Next.js 14 App Router ve TypeScript ile hazırlanmış, hizmet ve lokasyon odaklı yerel servis web sitesi.

## Temel Özellikler

- Tek dinamik route: `app/[slug]/page.tsx`
- Hizmet, şehir ve ilçe bazlı sayfa yapısı
- Gerçek kullanıcı odaklı içerik
- Dinamik metadata, canonical ve JSON-LD schema
- Bölgesel içerik farklılaştırma altyapısı

## Başlangıç

```bash
npm install
npm run dev
```

## Örnek URL'ler

- `/alcipanci`
- `/istanbul-alcipanci`
- `/kartal-alcipanci`
- `/mugla-ic-mimar`

## Dikkat Edilen Kurallar

- `ic-mimar` ilçe sayfası üretmez
- Geçersiz slug ya da kombinasyonlar `404` döner
- Görseller `/images/{service}/{location}/{service}-{location}-{type}.webp` yapısıyla türetilir
