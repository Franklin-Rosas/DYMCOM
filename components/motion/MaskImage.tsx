"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Imagen dentro de una máscara que se abre al hacer scroll, con parallax suave. */
export default function MaskImage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(18% 12% 18% 12%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.6 },
        },
      );
      if (inner)
        gsap.fromTo(
          inner,
          { scale: 1.18, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
