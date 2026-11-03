/**
 * Builds the web-ready image set used by the site.
 *
 *   assets/figma-source/*   raw exports from Figma (PNG/JPG/SVG, not served, not committed)
 *   public/figma/*          optimised output (WebP for rasters, SVG copied as-is)
 *
 * Run after adding or replacing an export:  npm run images
 */
import { access, mkdir, readdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("assets/figma-source");
const OUT = path.resolve("public/figma");
const MAX_WIDTH = 1800; // ≥ 2× the widest on-screen use (hero grid / service cards)
const MAX_HEIGHT = 4200; // tall website screenshots that scroll on hover

try {
  await access(SRC);
} catch {
  console.error(
    "assets/figma-source/ not found. Raw Figma exports are not committed (they are large);\n" +
      "export the images from the Figma file into assets/figma-source/ first. See docs/DEVELOPMENT-GUIDE.md.",
  );
  process.exit(1);
}

await mkdir(OUT, { recursive: true });

let before = 0;
let after = 0;
for (const file of (await readdir(SRC)).sort()) {
  const src = path.join(SRC, file);
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  before += (await stat(src)).size;

  if (ext === ".svg") {
    await copyFile(src, path.join(OUT, file));
    after += (await stat(src)).size;
    continue;
  }

  const out = path.join(OUT, `${name}.webp`);
  await sharp(src)
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 5 })
    .toFile(out);
  after += (await stat(out)).size;
}

const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
console.log(`images: ${mb(before)} → ${mb(after)}`);
