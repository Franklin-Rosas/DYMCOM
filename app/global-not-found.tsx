import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const manrope = localFont({ src: "./fonts/manrope.woff2", variable: "--font-manrope", weight: "200 800" });
const inter = localFont({ src: "./fonts/inter.woff2", variable: "--font-inter", weight: "100 900" });

export const metadata: Metadata = {
  title: "Página no encontrada | DYMCON",
  description: "La página que buscas no existe en el sitio de DYMCON Arquitectura & Construcción.",
  robots: { index: false },
};

/** Página 404 personalizada (Firebase sirve out/404.html). */
export default function GlobalNotFound() {
  return (
    <html lang="es-PE" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <main className="concrete section-dark flex min-h-[100svh] items-center bg-carbon text-hueso">
          <div className="container-x">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/dymcon-logo-light.webp" alt="DYMCON Arquitectura & Construcción" width={499} height={143} className="h-10 w-auto" />
            <p className="label mt-16 text-concreto">Error 404</p>
            <h1 className="mt-6 text-[length:var(--text-mega)] font-extrabold">Página no encontrada</h1>
            <p className="mt-6 text-lg text-concreto-claro">
              La dirección que escribiste no existe. <span lang="en">The page you are looking for does not exist.</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/es/" className="inline-flex h-14 items-center rounded-full bg-hueso px-7 font-semibold text-carbon">
                Volver al inicio
              </Link>
              <Link href="/en/" lang="en" className="inline-flex h-14 items-center rounded-full border border-hueso/40 px-7 font-semibold">
                Home (EN)
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
