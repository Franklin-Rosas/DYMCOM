import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import { getProyectos } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "politica-de-privacidad/", ...getProyectos().map((p) => `proyectos/${p.slug}/`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}/${p}`,
      lastModified: new Date(),
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}/${p}`])) },
    })),
  );
}
