"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/** Scroll suave (Lenis) sincronizado con ScrollTrigger. Se desactiva con prefers-reduced-motion. */
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
