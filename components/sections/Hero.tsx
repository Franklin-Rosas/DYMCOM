import type { Dictionary } from "@/i18n/dictionaries";
import type { Empresa } from "@/lib/schemas";
import type { Locale } from "@/i18n/config";
import HeroDrawing from "@/components/brand/HeroDrawing";
import BlueprintGrid from "@/components/brand/BlueprintGrid";
import Magnetic from "@/components/motion/Magnetic";

export default function Hero({ t, lang, empresa }: { t: Dictionary; lang: Locale; empresa: Empresa }) {
  const v = empresa.heroVideo;
  return (
    <section className="concrete section-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-carbon text-hueso">
      {v ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={v.poster}
          aria-hidden="true"
        >
          <source media="(orientation: portrait)" src={v.vertical} type="video/mp4" />
          <source src={v.horizontal} type="video/mp4" />
        </video>
      ) : (
        <>
          <BlueprintGrid className="text-hueso" />
          <HeroDrawing className="absolute -right-24 bottom-0 h-[78%] text-hueso/35 sm:right-0 md:right-[6%] md:h-[88%] md:text-hueso/45" />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />

      <div className="container-x relative mt-auto pb-14 pt-36 md:pb-20">
        <p className="label mb-8 flex items-center gap-4 text-concreto-claro">
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          {t.hero.eyebrow} · {empresa.ciudad}, {empresa.pais}
        </p>
        <h1 className="max-w-[14ch] text-[length:var(--text-mega)] font-extrabold">
          {t.hero.title.map((w, i) => (
            <span key={i} className="word-mask">
              <span className="word" style={{ ["--i" as string]: i }}>
                {w}
              </span>
              {i < t.hero.title.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-md text-lg text-concreto-claro md:col-span-5 md:text-xl">{empresa.propuestaDeValor[lang]}</p>
          <div className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
            <Magnetic>
              <a href="#contacto" className="inline-flex h-14 items-center rounded-full bg-hueso px-7 font-semibold text-carbon transition-colors hover:bg-marfil">
                {t.hero.primary}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#servicios" className="inline-flex h-14 items-center rounded-full border border-hueso/40 px-7 font-semibold transition-colors hover:border-hueso">
                {t.hero.secondary}
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="mt-14 hidden items-center justify-between border-t border-hueso/15 pt-5 text-concreto md:flex">
          <span className="label">{t.hero.scroll} ↓</span>
          <span className="label">12°02′S · 77°02′W</span>
        </div>
      </div>
    </section>
  );
}
