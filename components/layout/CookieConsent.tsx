"use client";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

const KEY = "dymcon-consent";

/**
 * Aviso de cookies + Google Analytics 4 (Ley 29733).
 * Analytics se carga SOLO si la persona acepta. Sin ID de GA4 no se muestra nada.
 */
export default function CookieConsent({ gaId, t, policyHref }: { gaId: string; t: Dictionary["cookies"]; policyHref: string }) {
  const [state, setState] = useState<"unknown" | "granted" | "denied">("unknown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const v = localStorage.getItem(KEY);
      if (v === "granted" || v === "denied") setState(v);
    } catch {}
  }, []);

  useEffect(() => {
    if (state !== "granted" || !gaId || document.getElementById("ga4")) return;
    const s = document.createElement("script");
    s.id = "ga4";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", gaId, { anonymize_ip: true });
  }, [state, gaId]);

  const choose = (v: "granted" | "denied") => {
    setState(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  };

  if (!gaId || !mounted || state !== "unknown") return null;
  return (
    <div role="region" aria-label="Cookies" className="fixed inset-x-0 bottom-0 z-[70] p-4" style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}>
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-carbon p-5 text-hueso shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm">
          {t.text}{" "}
          <a href={policyHref} className="underline underline-offset-4">+ info</a>
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => choose("denied")} className="h-11 rounded-full border border-hueso/30 px-5 text-sm">
            {t.reject}
          </button>
          <button type="button" onClick={() => choose("granted")} className="h-11 rounded-full bg-hueso px-5 text-sm font-semibold text-carbon">
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
