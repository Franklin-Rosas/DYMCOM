"use client";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import Eyebrow from "@/components/brand/Eyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Scroll horizontal fijado en escritorio; lista vertical en móvil y con movimiento reducido. */
export default function Process({ t }: { t: Dictionary }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const tr = track.current;
    if (!w || !tr || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dist = () => tr.scrollWidth - window.innerWidth;
      gsap.to(tr, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: w, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      gsap.fromTo(
        w.querySelector("[data-progress]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: w, start: "top top", end: () => `+=${dist()}`, scrub: true } },
      );
    });
    return () => mm.revert();
  }, []);

  const steps = t.process.steps;
  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="concrete section-dark scroll-mt-0 bg-carbon text-hueso">
      <div ref={wrap} className="relative overflow-hidden lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="container-x pt-[var(--section-y)] lg:pt-0">
          <Eyebrow axis="C" className="text-concreto">{t.process.eyebrow}</Eyebrow>
          <h2 id="proceso-titulo" className="mt-8 max-w-[18ch] text-[length:var(--text-display)] font-bold">
            {t.process.title}
          </h2>
        </div>
        <ol ref={track} className="container-x mt-14 flex flex-col gap-px pb-[var(--section-y)] lg:w-max lg:max-w-none lg:flex-row lg:gap-0 lg:pb-0 lg:pr-[20vw]">
          {steps.map((s, i) => (
            <li key={s.t} className="relative border-t border-hueso/15 py-8 lg:w-[min(34vw,480px)] lg:shrink-0 lg:border-l lg:border-t-0 lg:px-10 lg:py-4">
              <span className="label text-concreto">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-[length:var(--text-title)] font-bold">{s.t}</h3>
              <p className="mt-4 max-w-[36ch] text-concreto-claro">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="container-x absolute inset-x-0 bottom-10 hidden lg:block" aria-hidden="true">
          <div className="h-px bg-hueso/15">
            <div data-progress className="h-px origin-left scale-x-0 bg-marfil" />
          </div>
        </div>
      </div>
    </section>
  );
}
