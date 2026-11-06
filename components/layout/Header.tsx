"use client";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import Magnetic from "@/components/motion/Magnetic";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = { t: Dictionary; lang: Locale };

export default function Header({ t, lang }: Props) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const other: Locale = lang === "es" ? "en" : "es";
  const links = [
    { href: "#nosotros", label: t.nav.about },
    { href: "#servicios", label: t.nav.services },
    { href: "#proceso", label: t.nav.process },
    { href: "#tecnologia", label: t.nav.tech },
    { href: "#contacto", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    document.documentElement.classList.toggle("lenis-stopped", open);
    if (open) {
      el.hidden = false;
      if (!prefersReducedMotion()) {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.out" });
        gsap.fromTo(el.querySelectorAll("[data-item]"), { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, delay: 0.1 });
      }
      el.querySelector<HTMLElement>("a")?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else if (!el.hidden) {
      el.hidden = true;
      buttonRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-hueso focus:px-4 focus:py-2 focus:text-negro">
        {t.nav.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !open ? "bg-carbon/90 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 text-hueso">
          <a href={`/${lang}/`} className="relative z-[60] shrink-0" aria-label={`DYMCON — ${t.nav.home}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/dymcon-logo-light.webp" alt="DYMCON Arquitectura & Construcción" width={499} height={143} className="h-9 w-auto md:h-10" />
          </a>
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.95rem]">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group relative py-2 opacity-85 transition-opacity hover:opacity-100">
                    {l.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative z-[60] flex items-center gap-3 md:gap-5">
            <a href={`/${other}/`} hrefLang={other} lang={other} className="label opacity-80 hover:opacity-100" aria-label={other === "en" ? "English version" : "Versión en español"}>
              <span className={lang === "es" ? "opacity-100" : "opacity-50"}>ES</span>
              <span className="mx-1 opacity-40">/</span>
              <span className={lang === "en" ? "opacity-100" : "opacity-50"}>EN</span>
            </a>
            <span className="hidden sm:inline-block">
              <Magnetic>
                <a href="#contacto" className="inline-flex h-11 items-center rounded-full bg-hueso px-5 text-sm font-semibold text-carbon transition-colors hover:bg-marfil">
                  {t.nav.cta}
                </a>
              </Magnetic>
            </span>
            <button
              ref={buttonRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div
        ref={menuRef}
        id="menu-movil"
        hidden
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className="concrete fixed inset-0 z-40 bg-carbon text-hueso lg:hidden"
      >
        <nav className="container-x flex h-full flex-col justify-between pb-10 pt-28">
          <ul className="flex flex-col gap-2">
            {links.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <a
                  data-item
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.25rem,10vw,4rem)] font-semibold tracking-tight"
                >
                  <span className="label text-concreto">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" onClick={() => setOpen(false)} className="inline-flex h-14 items-center justify-center rounded-full bg-hueso font-semibold text-carbon">
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </>
  );
}
