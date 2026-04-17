import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container">
        <div className="card stack" style={{ padding: "2rem" }}>
          <p className="eyebrow">404</p>
          <h1 style={{ margin: 0 }}>Sayfa bulunamadı</h1>
          <p className="muted" style={{ margin: 0 }}>
            Aradığınız hizmet ya da bölge sayfasına şu an ulaşamadık. Ana sayfadan hizmet kategorilerine göz atabilir ya da bizi arayarak doğrudan bilgi alabilirsiniz.
          </p>
          <div>
            <Link className="button" href="/">
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
