import type { Dictionary } from "@/i18n/dictionaries";
import type { Servicio } from "@/lib/schemas";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/brand/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import Picture from "@/components/ui/Picture";

export default function Services({ t, lang, servicios }: { t: Dictionary; lang: Locale; servicios: Servicio[] }) {
  return (
    <section id="servicios" className="section-y scroll-mt-20 bg-hueso">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow axis="B" className="text-concreto">{t.services.eyebrow}</Eyebrow>
            <Reveal as="h2" mode="lines" className="mt-8 text-[length:var(--text-display)] font-bold">
              <span className="block">{t.services.title}</span>
            </Reveal>
          </div>
        </div>
        <ul className="mt-16 border-t border-negro/15">
          {servicios.map((s) => (
            <li key={s.slug} className="group relative isolate overflow-hidden border-b border-negro/15">
              {/* Fondo que se revela al pasar el mouse: foto si existe, si no la grilla de plano */}
              <div className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-carbon transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100 group-focus-within:scale-y-100">
                {s.imagen ? (
                  <Picture name={s.imagen} alt="" width={1920} height={1080} sizes="100vw" className="h-full w-full object-cover opacity-50" />
                ) : (
                  <div className="blueprint absolute inset-0 text-hueso !opacity-[0.12]" />
                )}
              </div>
              <div className="grid items-baseline gap-4 py-10 transition-colors duration-500 group-hover:text-hueso group-focus-within:text-hueso md:grid-cols-12 md:py-14">
                <span className="label text-concreto md:col-span-1">{s.codigo}</span>
                <h3 className="text-[length:var(--text-display)] font-bold md:col-span-7">{s.titulo[lang]}</h3>
                <p className="max-w-sm text-lg opacity-75 md:col-span-4">{s.resumen[lang]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
