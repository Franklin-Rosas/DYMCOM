import type { Dictionary } from "@/i18n/dictionaries";
import Eyebrow from "@/components/brand/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

/** Consultoría gratuita: oferta de primera consulta sin costo, con llamada al formulario. */
export default function FreeConsult({ t }: { t: Dictionary }) {
  const c = t.consult;
  return (
    <section id="consultoria" aria-labelledby="consultoria-titulo" className="section-y relative scroll-mt-20 overflow-hidden bg-hueso">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.06em] top-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[clamp(10rem,30vw,28rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(70_0_3/0.18)]"
      >
        S/&nbsp;0
      </span>
      <div className="container-x relative grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow axis="0" className="text-granate-vivo">{c.eyebrow}</Eyebrow>
          <Reveal as="h2" mode="lines" className="mt-8 text-[length:var(--text-display)] font-bold">
            <span id="consultoria-titulo" className="block">{c.title}</span>
          </Reveal>
          <p className="mt-8 max-w-xl text-lg text-negro/75 md:text-xl">{c.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#contacto" className="inline-flex h-14 items-center rounded-full bg-granate px-8 font-semibold text-hueso transition-colors hover:bg-granate-vivo">
                {c.cta}
              </a>
            </Magnetic>
            <span className="label text-concreto">{c.note}</span>
          </div>
        </div>
        <ol className="md:col-span-5 md:pt-16">
          {c.steps.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-negro/15 py-7 last:border-b">
              <span className="label pt-1 text-granate-vivo">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 text-negro/70">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
