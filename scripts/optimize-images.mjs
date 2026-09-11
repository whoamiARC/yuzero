import { createRequire } from "node:module";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Re-encode supplied assets at their display sizes. Keep the original artwork.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public/media/v2");
await mkdir(output, { recursive: true });
const assets = [
  ["yuzero-logo.png", "logo", [480, 960], 92],
  ["products/go-food.webp", "go-food", [480, 960], 84],
  ["products/cettong-preview.png", "cettong", [640, 1280], 90],
  ["products/cofate-preview.png", "cofate", [640, 1280], 88],
];
for (const [source, name, widths, quality] of assets) {
  for (const width of widths) {
    const target = resolve(output, `${name}-${width}.webp`);
    await sharp(resolve(root, "public", source)).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(target);
    console.log(`${name}-${width}.webp: ${(await stat(target)).size} bytes`);
  }
}
const logo = resolve(root, "public/yuzero-logo.png");
for (const size of [32, 180]) {
  await sharp(logo).resize(size, size).png({ compressionLevel: 9 }).toFile(resolve(output, `icon-${size}.png`));
}
// Embed the tiny original logo in the header: no extra image request or JS gate.
// Brand's SVG viewport selects the symbol while retaining both complete braces.
const mark = await sharp(logo).resize(240, 240).webp({ quality: 95, effort: 6 }).toBuffer();
await writeFile(resolve(root, "lib/brand-image.ts"), `// Generated from the supplied logo by scripts/optimize-images.mjs.\nexport const brandImage = "data:image/webp;base64,${mark.toString("base64")}";\n`);
console.log(`Inline navigation logo: ${mark.length} bytes`);
