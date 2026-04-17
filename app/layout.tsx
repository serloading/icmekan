import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "İç Mekan | Usta, Tadilat ve Temizlik Hizmetleri",
    template: "%s | İç Mekan"
  },
  description:
    "İç Mekan; alçıpan, boya, elektrik, tesisat, temizlik ve tadilat ihtiyaçlarında İstanbul, İzmir ve Muğla için hızlı dönüş sağlayan yerel hizmet desteği sunar."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
