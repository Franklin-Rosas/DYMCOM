import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { Empresa } from "@/lib/schemas";
import { waLink } from "@/lib/site";

export default function Footer({ t, lang, empresa }: { t: Dictionary; lang: Locale; empresa: Empresa }) {
  const c = empresa.contacto;
  const items = [
    c.direccion && { k: "Dirección", v: c.direccion },
    c.telefono && { k: "Tel.", v: c.telefono, href: `tel:${c.telefono.replace(/\s/g, "")}` },
    c.correo && { k: "Email", v: c.correo, href: `mailto:${c.correo}` },
    c.whatsapp && { k: "WhatsApp", v: `+${c.whatsapp}`, href: waLink(c.whatsapp)! },
  ].filter(Boolean) as { k: string; v: string; href?: string }[];

  return (
    <footer className="concrete section-dark relative bg-carbon text-hueso">
      <div className="container-x grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/dymcon-logo-light.webp" alt="DYMCON Arquitectura & Construcción" width={499} height={143} loading="lazy" className="h-12 w-auto" />
          <p className="mt-6 max-w-sm text-concreto-claro">{empresa.propuestaDeValor[lang]}</p>
        </div>
        <div className="md:col-span-4">
          <p className="label text-concreto">{t.nav.contact}</p>
          <ul className="mt-4 space-y-2">
            <li>{t.footer.location}</li>
            {items.map((i) => (
              <li key={i.k}>
                {i.href ? (
                  <a href={i.href} className="underline-offset-4 hover:underline">
                    {i.v}
                  </a>
                ) : (
                  i.v
                )}
              </li>
            ))}
          </ul>
          {c.redes.length > 0 && (
            <ul className="mt-6 flex gap-4">
              {c.redes.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="label hover:text-marfil">
                    {r.red}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-3">
          <p className="label text-concreto">DYMCON</p>
          <ul className="mt-4 space-y-2">
            <li><a href="#nosotros" className="hover:text-marfil">{t.nav.about}</a></li>
            <li><a href="#servicios" className="hover:text-marfil">{t.nav.services}</a></li>
            <li><a href={`/${lang}/politica-de-privacidad/`} className="hover:text-marfil">{t.footer.privacy}</a></li>
          </ul>
          {empresa.certificaciones.length > 0 && (
            <p className="label mt-6 text-concreto">{empresa.certificaciones.join(" · ")}</p>
          )}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-hueso/10 py-6 text-sm text-concreto sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {empresa.nombreCompleto}. {t.footer.rights}</p>
        <p className="label">12°02′S · 77°02′W</p>
      </div>
    </footer>
  );
}
