import type { Dictionary } from "@/i18n/dictionaries";
import type { Empresa } from "@/lib/schemas";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/brand/Eyebrow";
import Dimension from "@/components/brand/Dimension";
import Reveal from "@/components/motion/Reveal";
import MaskImage from "@/components/motion/MaskImage";
import Picture from "@/components/ui/Picture";

export default function About({ t, lang, empresa }: { t: Dictionary; lang: Locale; empresa: Empresa }) {
  return (
    <section id="nosotros" className="section-y scroll-mt-20 bg-hueso">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:pt-10">
          <Eyebrow axis="A" className="text-concreto">{t.about.eyebrow}</Eyebrow>
          <Reveal as="h2" mode="lines" className="mt-8 text-[length:var(--text-display)] font-bold">
            <span className="block">{t.about.title}</span>
          </Reveal>
          <Reveal className="mt-8 max-w-[44ch] space-y-4 text-lg text-negro/75">
            <p>{t.about.body}</p>
            {empresa.mision && <p>{empresa.mision[lang]}</p>}
          </Reveal>
          {empresa.brochurePdf && (
            <a href={empresa.brochurePdf} className="mt-10 inline-flex h-14 items-center gap-3 rounded-full border border-negro px-7 font-semibold transition-colors hover:bg-negro hover:text-hueso" download>
              {t.about.brochure} <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
        <div className="md:col-span-7">
          <MaskImage className="aspect-[1584/672] bg-hueso-2">
            <Picture name="dymcon-banner" alt={t.about.imageAlt} width={1584} height={672} className="h-full w-full object-cover" />
          </MaskImage>
          <Dimension label="DYMCON · MD STUDIO" className="mt-4 text-concreto" />
        </div>
      </div>
    </section>
  );
}
