// Builds public/og/home.png (1200 x 630): the S01 render in a window frame, the app icon, the
// wordmark and the site's headline, on the site's canvas colour. Run by hand when S01 or the copy
// changes: `node scripts/make-og.mjs <dir with Inter-SemiBold.ttf and Inter-Medium.ttf>`.
// The TTFs come from Inter's official release (rsms/inter, extras/ttf/); only the woff2 is served.
// sharp is the image library Astro already installs for astro:assets: no new dependency.
import sharp from "sharp";
import { join } from "node:path";

const fonts = process.argv[2];
if (!fonts) throw new Error("usage: node scripts/make-og.mjs <dir with Inter TTFs>");
const root = new URL("../", import.meta.url).pathname;
const W = 1200, H = 630;
const canvas = "#131415";

const text = async (str, file, size, color) =>
  sharp({ text: { text: `<span foreground="${color}">${str}</span>`, fontfile: join(fonts, file), font: `Inter ${size}`, dpi: 72, rgba: true } }).png().toBuffer();

// Screenshot: 740 px wide, top-left 500,200, bleeding off the bottom-right like the hero.
const shotW = 740, shotH = Math.round(shotW * 1500 / 2400);
const radius = 12;
const mask = Buffer.from(`<svg width="${shotW}" height="${shotH}"><rect width="${shotW}" height="${shotH}" rx="${radius}" ry="${radius}"/></svg>`);
const shot = await sharp(join(root, "src/assets/shots/S01.png")).resize(shotW, shotH).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const frame = Buffer.from(`<svg width="${shotW + 2}" height="${shotH + 2}"><rect x="0.5" y="0.5" width="${shotW + 1}" height="${shotH + 1}" rx="${radius + 1}" fill="none" stroke="#3d4045"/></svg>`);
const halo = Buffer.from(`<svg width="${W}" height="${H}"><defs><radialGradient id="g" cx="0.72" cy="0.75" r="0.6"><stop offset="0" stop-color="#5aa2ff" stop-opacity="0.22"/><stop offset="1" stop-color="#5aa2ff" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);

const icon = await sharp(join(root, "public/assets/app-icon-240.png")).resize(64, 64).png().toBuffer();
const wordmark = await text("SampleLantern", "Inter-SemiBold.ttf", 34, "#f3f4f6");
const line1 = await text("Find the sound.", "Inter-SemiBold.ttf", 46, "#f3f4f6");
const line2 = await text("Skip the folders.", "Inter-SemiBold.ttf", 46, "#f3f4f6");
const req = await text("Apple silicon · macOS 14 or later", "Inter-Medium.ttf", 22, "#b3b8bf");

const shotX = 500, shotY = 200;
await sharp({ create: { width: W, height: H, channels: 4, background: canvas } })
  .composite([
    { input: halo, left: 0, top: 0 },
    { input: icon, left: 64, top: 60 },
    { input: wordmark, left: 144, top: 74 },
    { input: line1, left: 64, top: 160 },
    { input: line2, left: 64, top: 218 },
    { input: req, left: 64, top: 296 },
    { input: frame, left: shotX - 1, top: shotY - 1 },
    { input: shot, left: shotX, top: shotY },
  ])
  .flatten({ background: canvas })
  .png({ compressionLevel: 9 })
  .toFile(join(root, "public/og/home.png"));
console.log("wrote public/og/home.png");
