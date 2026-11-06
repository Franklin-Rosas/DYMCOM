import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEmpresa } from "@/lib/content";
import { GA_ID } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CookieConsent from "@/components/layout/CookieConsent";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";

const manrope = localFont({ src: "../fonts/manrope.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" });
const inter = localFont({ src: "../fonts/inter.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#0e0e10", width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icons/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } : undefined,
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang as Locale);
  const empresa = getEmpresa();
  return (
    <html lang={lang === "es" ? "es-PE" : "en"} className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        <Cursor />
        <Header t={t} lang={lang as Locale} />
        <main id="contenido">{children}</main>
        <Footer t={t} lang={lang as Locale} empresa={empresa} />
        <WhatsAppButton number={empresa.contacto.whatsapp} label={t.whatsapp} />
        <CookieConsent gaId={GA_ID} t={t.cookies} policyHref={`/${lang}/politica-de-privacidad/`} />
      </body>
    </html>
  );
}
