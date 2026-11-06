"use client";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { firebaseReady, waLink } from "@/lib/site";

type Errors = Partial<Record<"nombre" | "correo" | "mensaje" | "consent", string>>;

const field =
  "peer w-full border-0 border-b border-hueso/30 bg-transparent px-0 pb-3 pt-6 text-lg text-hueso placeholder-transparent focus:border-hueso focus:outline-none focus:ring-0";
const label =
  "pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-[0.14em] text-concreto-claro transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.14em]";

export default function ContactForm({ t, lang, whatsapp }: { t: Dictionary["form"]; lang: string; whatsapp: string | null }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("empresa_web") || "")) return; // honeypot: los bots lo llenan, las personas no lo ven
    const data = {
      nombre: String(f.get("nombre") || "").trim().slice(0, 120),
      correo: String(f.get("correo") || "").trim().slice(0, 160),
      telefono: String(f.get("telefono") || "").trim().slice(0, 30),
      mensaje: String(f.get("mensaje") || "").trim().slice(0, 2000),
    };
    const errs: Errors = {};
    if (!data.nombre) errs.nombre = t.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.correo)) errs.correo = t.invalidEmail;
    if (data.mensaje.length < 10) errs.mensaje = t.required;
    if (!f.get("consent")) errs.consent = t.consentRequired;
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    if (!firebaseReady) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const { sendLead } = await import("@/lib/leads");
      await sendLead({ ...data, idioma: lang, origen: "home" });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const wa = waLink(whatsapp);
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-2 text-sm text-[#ffb4ab]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="empresa_web">No llenar</label>
        <input id="empresa_web" name="empresa_web" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="relative">
        <input id="nombre" name="nombre" className={field} placeholder=" " autoComplete="name" aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? "err-nombre" : undefined} />
        <label htmlFor="nombre" className={label}>{t.name}</label>
        {err("nombre")}
      </div>
      <div className="relative">
        <input id="correo" name="correo" type="email" className={field} placeholder=" " autoComplete="email" aria-invalid={!!errors.correo} aria-describedby={errors.correo ? "err-correo" : undefined} />
        <label htmlFor="correo" className={label}>{t.email}</label>
        {err("correo")}
      </div>
      <div className="relative md:col-span-2">
        <input id="telefono" name="telefono" type="tel" className={field} placeholder=" " autoComplete="tel" />
        <label htmlFor="telefono" className={label}>{t.phone}</label>
      </div>
      <div className="relative md:col-span-2">
        <textarea id="mensaje" name="mensaje" rows={3} className={`${field} resize-none`} placeholder=" " aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? "err-mensaje" : undefined} />
        <label htmlFor="mensaje" className={label}>{t.message}</label>
        {err("mensaje")}
      </div>
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-concreto-claro">
          <input type="checkbox" name="consent" id="consent" className="mt-1 h-5 w-5 shrink-0 accent-[#e8e2d0]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "err-consent" : undefined} />
          <span>
            {t.consent}{" "}
            <a href={`/${lang}/politica-de-privacidad/`} className="text-hueso underline underline-offset-4">{t.policy}</a>{" "}
            (Ley N.° 29733).
          </span>
        </label>
        {err("consent")}
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-14 items-center justify-center rounded-full bg-hueso px-8 font-semibold text-carbon transition-colors hover:bg-marfil disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
            {t.whatsapp}
          </a>
        )}
      </div>
      <p role="status" aria-live="polite" className="text-sm md:col-span-2">
        {status === "ok" && t.ok}
        {status === "error" && (firebaseReady ? t.error : t.notReady)}
      </p>
    </form>
  );
}
