import type { Dictionary } from "@/i18n/dictionaries";
import type { Empresa } from "@/lib/schemas";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/brand/Eyebrow";
import ContactForm from "@/components/ui/ContactForm";
import BlueprintGrid from "@/components/brand/BlueprintGrid";

export default function FinalCta({ t, lang, empresa }: { t: Dictionary; lang: Locale; empresa: Empresa }) {
  return (
    <section id="contacto" className="concrete section-dark relative min-h-[100svh] scroll-mt-0 overflow-hidden bg-granate text-hueso">
      <BlueprintGrid className="text-hueso" />
      <div className="container-x relative grid gap-16 py-[var(--section-y)] md:grid-cols-12">
        <div className="md:col-span-6">
          <Eyebrow axis="E" className="text-marfil/80">{t.cta.eyebrow}</Eyebrow>
          <h2 className="mt-8 text-[length:var(--text-mega)] font-extrabold">{t.cta.title}</h2>
          <p className="mt-8 max-w-md text-lg text-marfil/85">{t.cta.body}</p>
        </div>
        <div className="md:col-span-6 md:pt-24">
          <ContactForm t={t.form} lang={lang} whatsapp={empresa.contacto.whatsapp} />
        </div>
      </div>
    </section>
  );
}
