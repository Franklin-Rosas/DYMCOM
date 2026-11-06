import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Servicio } from "@/lib/schemas";

/** Banda de palabras en movimiento continuo: solo usa contenido que ya existe en la web. */
export default function Marquee({ t, lang, servicios }: { t: Dictionary; lang: Locale; servicios: Servicio[] }) {
  const items = [...servicios.map((s) => s.titulo[lang]), ...t.tech.items.map((i) => i.t), lang === "es" ? "Lima, Perú" : "Lima, Peru"];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((it) => (
        <li key={it} className="flex items-center whitespace-nowrap px-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-none tracking-[-0.03em]">
          <span className="text-outline">{it}</span>
          <span className="ml-12 inline-block size-3 rotate-45 bg-granate-vivo" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={lang === "es" ? "Lo que hacemos" : "What we do"} className="overflow-hidden border-y border-hueso/10 bg-carbon py-10 text-hueso md:py-14">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
