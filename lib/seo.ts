import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import type { Empresa } from "./schemas";
import { SITE_URL } from "./site";

export function pageMetadata({
  lang,
  path = "",
  title,
  description,
  image = "/brand/og-image.jpg",
}: {
  lang: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}/${lang}/${path}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: { es: `${SITE_URL}/es/${path}`, en: `${SITE_URL}/en/${path}`, "x-default": `${SITE_URL}/es/${path}` },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "DYMCON Arquitectura & Construcción",
      locale: lang === "es" ? "es_PE" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: "DYMCON Arquitectura & Construcción" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** schema.org: Organization + ConstructionBusiness (GeneralContractor). Solo datos reales. */
export function organizationJsonLd(e: Empresa, lang: Locale) {
  const c = e.contacto;
  const base = {
    "@context": "https://schema.org",
    "@type": ["Organization", "GeneralContractor"],
    "@id": `${SITE_URL}/#organizacion`,
    name: e.nombreCompleto,
    alternateName: ["DYMCON", "DYMCOM", "DYMCON Arquitectura y Construcción"],
    url: `${SITE_URL}/${lang}/`,
    logo: `${SITE_URL}/brand/dymcon-logo.png`,
    image: `${SITE_URL}/brand/og-image.jpg`,
    description: e.propuestaDeValor[lang],
    address: {
      "@type": "PostalAddress",
      addressLocality: e.ciudad,
      addressRegion: "Lima",
      addressCountry: "PE",
      ...(c.direccion ? { streetAddress: c.direccion } : {}),
    },
    areaServed: "Lima, Perú",
    ...(c.telefono ? { telephone: c.telefono } : {}),
    ...(c.correo ? { email: c.correo } : {}),
    ...(c.redes.length ? { sameAs: c.redes.map((r) => r.url) } : {}),
  };
  return base;
}

/** Nombre del sitio para Google (aparece sobre el resultado de búsqueda). */
export function websiteJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#sitio`,
    name: "DYMCON",
    alternateName: ["DYMCOM", "DYMCON Arquitectura & Construcción"],
    url: `${SITE_URL}/`,
    inLanguage: lang === "es" ? "es-PE" : "en",
    publisher: { "@id": `${SITE_URL}/#organizacion` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
