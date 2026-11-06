"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Contador animado. El número final ya está en el HTML (se ve sin JS y lo lee Google). */
export default function Counter({ value, suffix = "", locale }: { value: number; suffix?: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => Math.round(n).toLocaleString(locale === "en" ? "en-US" : "es-PE");
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: "expo.out",
        onUpdate: () => {
          el.textContent = fmt(obj.n) + suffix;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      {fmt(value)}
      {suffix}
    </span>
  );
}
