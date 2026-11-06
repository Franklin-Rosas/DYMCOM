"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines": cada hijo directo sube en cascada. "fade": el bloque completo. */
  mode?: "lines" | "fade";
  delay?: number;
};

/** Revela contenido al entrar en pantalla. Sin JS o con movimiento reducido, todo se ve normal. */
export default function Reveal({ as: Tag = "div", children, className, mode = "fade", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = mode === "lines" ? Array.from(el.children) : [el];
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        yPercent: mode === "lines" ? 60 : 0,
        y: mode === "fade" ? 40 : 0,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [mode, delay]);
  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}
