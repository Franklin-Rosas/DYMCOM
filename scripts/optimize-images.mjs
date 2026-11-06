// Optimiza las imágenes de media/originales → public/media en AVIF y WebP (640, 1280, 1920 px).
// Se ejecuta solo antes de cada compilación (npm run build). No agranda imágenes pequeñas.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "media/originales";
const OUT = "public/media";
const WIDTHS = [640, 1280, 1920];
const exts = /\.(jpe?g|png|webp|tiff?|avif)$/i;

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : exts.test(d.name) ? [p] : [];
  });
}

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(exts, "").split(path.sep).join("-");
  const meta = await sharp(file).metadata();
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, meta.width)))];
  for (const w of widths) {
    for (const [fmt, opts] of [["avif", { quality: 55 }], ["webp", { quality: 78 }]]) {
      const out = path.join(OUT, `${rel}-${w}.${fmt}`);
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(file).mtimeMs) continue;
      await sharp(file).resize({ width: w }).toFormat(fmt, opts).toFile(out);
    }
  }
  manifest[rel] = { widths, formats: ["avif", "webp"], width: meta.width, height: meta.height };
  console.log(`✓ ${rel} → ${widths.join(", ")} px`);
}

fs.writeFileSync("media/manifest.json", JSON.stringify(manifest, null, 2));
