import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEmpresa, getServicios } from "@/lib/content";
import { jsonLd, organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Kpis from "@/components/sections/Kpis";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Marquee from "@/components/sections/Marquee";
import Manifesto from "@/components/sections/Manifesto";
import FreeConsult from "@/components/sections/FreeConsult";
import Tech from "@/components/sections/Tech";
import FinalCta from "@/components/sections/FinalCta";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return pageMetadata({ lang, title: t.meta.title, description: t.meta.description });
}

/*
 * Secciones del home. Las que dependen de datos reales (proyectos, historia, seguridad,
 * clientes, noticias) se agregan aquí cuando exista su contenido en /content.
 */
export default async function Home({ params }: P) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const empresa = getEmpresa();
  const servicios = getServicios();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationJsonLd(empresa, lang))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteJsonLd(lang))} />
      <Hero t={t} lang={lang} empresa={empresa} />
      <Marquee t={t} lang={lang} servicios={servicios} />
      <Kpis empresa={empresa} lang={lang} />
      <About t={t} lang={lang} empresa={empresa} />
      <Services t={t} lang={lang} servicios={servicios} />
      <FreeConsult t={t} />
      <Manifesto t={t} />
      <Process t={t} />
      <Tech t={t} />
      <FinalCta t={t} lang={lang} empresa={empresa} />
    </>
  );
}
