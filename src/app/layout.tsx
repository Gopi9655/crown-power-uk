import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company, siteUrl } from "@/data/site";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: company.name, template: "%s | Crown Power Energy Systems" },
  description:
    "Electrical power engineering for renewable integration, smart energy technologies and industrial power systems.",
  openGraph: { type: "website", locale: "en_GB", siteName: company.name },
  icons: { apple: "/icon.png" },
};
export const viewport: Viewport = {
  themeColor: "#071B4D",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }: { children: ReactNode }) {
  const organisation = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/crown-power-logo.png`,
    email: company.email,
    telephone: company.phone,
    identifier: company.companyNumber,
  };
  return (
    <html lang="en-GB" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisation).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
