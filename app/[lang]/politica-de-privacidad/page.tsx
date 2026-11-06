import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, jsonLd, pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    ...pageMetadata({
      lang,
      path: "politica-de-privacidad/",
      title: `${t.privacy.title} | DYMCON`,
      description:
        lang === "es"
          ? "Política de privacidad y tratamiento de datos personales de DYMCON Arquitectura & Construcción, conforme a la Ley N.° 29733 del Perú."
          : "Privacy policy and personal data processing of DYMCON Architecture & Construction, under Peruvian Law No. 29733.",
    }),
    robots: { index: true, follow: true },
  };
}

/**
 * Estructura base según la Ley N.° 29733 y su reglamento (D.S. 016-2024-JUS).
 * Los datos de la empresa están marcados PENDIENTE: el texto final debe revisarlo un abogado.
 */
export default async function Privacy({ params }: P) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return (
    <article className="bg-hueso pb-[var(--section-y)] pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: t.nav.home, url: `${SITE_URL}/${lang}/` },
            { name: t.privacy.title, url: `${SITE_URL}/${lang}/politica-de-privacidad/` },
          ]),
        )}
      />
      <div className="container-x max-w-3xl space-y-6 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:text-[length:var(--text-title)] [&_h2]:font-bold">
        <h1 className="text-[length:var(--text-display)] font-bold">{t.privacy.title}</h1>
        <p className="label text-granate-vivo">PENDIENTE: revisión legal del texto final.</p>
        <h2>1. Responsable</h2>
        <p>
          DYMCON Arquitectura &amp; Construcción. Razón social: PENDIENTE. RUC: PENDIENTE. Domicilio: PENDIENTE, Lima, Perú.
          Correo de contacto para datos personales: PENDIENTE.
        </p>
        <h2>2. Datos que recogemos</h2>
        <p>Por el formulario de contacto: nombre, correo, teléfono (opcional) y el mensaje que nos escribes.</p>
        <h2>3. Finalidad</h2>
        <p>Responder tu consulta y enviarte información o cotizaciones que nos pidas. No vendemos ni cedemos tus datos.</p>
        <h2>4. Banco de datos y almacenamiento</h2>
        <p>
          Los datos se guardan en servicios de Google Firebase. Inscripción del banco de datos ante la Autoridad Nacional de
          Protección de Datos Personales: PENDIENTE.
        </p>
        <h2>5. Cookies</h2>
        <p>
          Usamos Google Analytics solo si lo aceptas en el aviso de cookies, para medir visitas de forma agregada. Puedes cambiar
          tu decisión borrando los datos del sitio en tu navegador.
        </p>
        <h2>6. Tus derechos (ARCO)</h2>
        <p>
          Puedes pedir acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiendo al correo indicado en
          el punto 1. También puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia.
        </p>
        <h2>7. Plazo de conservación</h2>
        <p>PENDIENTE.</p>
      </div>
    </article>
  );
}
