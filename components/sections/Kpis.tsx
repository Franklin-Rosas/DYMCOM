import type { Empresa } from "@/lib/schemas";
import type { Locale } from "@/i18n/config";
import Counter from "@/components/motion/Counter";

/** Solo se muestra si hay KPIs reales en content/empresa.json. */
export default function Kpis({ empresa, lang }: { empresa: Empresa; lang: Locale }) {
  if (!empresa.kpis.length) return null;
  return (
    <section aria-label="Cifras" className="section-dark bg-carbon text-hueso">
      <div className="container-x grid grid-cols-2 gap-px border-y border-hueso/10 md:grid-cols-5">
        {empresa.kpis.map((k) => (
          <div key={k.etiqueta.es} className="py-10 pr-4">
            <p className="font-display text-[length:var(--text-title)] font-bold">
              <Counter value={k.valor} suffix={k.sufijo} locale={lang} />
            </p>
            <p className="label mt-2 text-concreto">{k.etiqueta[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
