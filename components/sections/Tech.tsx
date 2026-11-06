import type { Dictionary } from "@/i18n/dictionaries";
import Eyebrow from "@/components/brand/Eyebrow";
import Reveal from "@/components/motion/Reveal";

export default function Tech({ t }: { t: Dictionary }) {
  return (
    <section id="tecnologia" className="section-y scroll-mt-20 bg-hueso-2">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <Eyebrow axis="D" className="text-concreto">{t.tech.eyebrow}</Eyebrow>
          <Reveal as="h2" mode="lines" className="mt-8 text-[length:var(--text-display)] font-bold">
            <span className="block">{t.tech.title}</span>
          </Reveal>
        </div>
        <ul className="grid gap-px bg-negro/10 sm:grid-cols-2 md:col-span-7">
          {t.tech.items.map((it) => (
            <li key={it.t} className="bg-hueso-2 p-8 md:p-10">
              <Reveal>
                <h3 className="text-[length:var(--text-title)] font-bold">{it.t}</h3>
                <p className="mt-4 text-negro/70">{it.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
