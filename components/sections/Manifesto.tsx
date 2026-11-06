import type { Dictionary } from "@/i18n/dictionaries";
import SurrealScene from "@/components/motion/SurrealScene";
import Reveal from "@/components/motion/Reveal";

/** Pausa de pantalla completa con la escena surrealista y una frase corta. */
export default function Manifesto({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="manifiesto-titulo" className="section-dark relative flex min-h-[100svh] items-end overflow-hidden bg-carbon text-hueso">
      <SurrealScene variant={1} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-carbon/40" />
      <div className="container-x relative pb-[var(--section-y)] pt-40">
        <p className="label mb-8 flex items-center gap-4 text-marfil/80">
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          {t.manifesto.eyebrow}
        </p>
        <Reveal>
          <h2 id="manifiesto-titulo" className="max-w-[16ch] text-[length:var(--text-mega)] font-extrabold">
            {t.manifesto.title}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
