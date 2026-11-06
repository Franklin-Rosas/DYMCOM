import manifest from "@/media/manifest.json";

type Entry = { widths: number[]; formats: string[] };

/**
 * <picture> con AVIF/WebP en 640/1280/1920 generados por scripts/optimize-images.mjs.
 * `name` es el nombre del archivo original sin extensión (en media/originales).
 */
export default function Picture({
  name,
  alt,
  width,
  height,
  sizes = "(min-width: 768px) 60vw, 100vw",
  className,
  priority = false,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const e = (manifest as Record<string, Entry>)[name];
  if (!e) throw new Error(`Imagen "${name}" no encontrada. Ejecuta: npm run images`);
  const set = (fmt: string) => e.widths.map((w) => `/media/${name}-${w}.${fmt} ${w}w`).join(", ");
  const largest = e.widths[e.widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/media/${name}-${largest}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
