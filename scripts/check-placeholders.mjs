// Fails the build if a [PLACEHOLDER] is left in the built site: in a link or source
// (href="[", src="[", poster="[") or as a bare [UPPER_CASE] token. The pages that
// src/config/pages.ts allows to print placeholders (terms, privacy) are skipped while they still
// list one, but only for bare tokens in their copy: a placeholder link fails on every page.
// No dependencies: run after `astro build`.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { hasOpenPlaceholder } from "../src/config/pages.ts";

const dist = new URL("../dist/", import.meta.url).pathname;
const allowed = ["/terms/", "/privacy/"].filter(hasOpenPlaceholder);

const html = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? html(join(dir, e.name)) : e.name.endsWith(".html") ? [join(dir, e.name)] : [],
  );

const route = (file) => {
  const rel = relative(dist, file).split(sep).join("/");
  return "/" + rel.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "/");
};

const link = /(?:href|src|poster)="\[[^"]*/g;
const token = /\[[A-Z][A-Z_ ]*\]/g;
let failures = 0;
for (const file of html(dist)) {
  const text = readFileSync(file, "utf8");
  // A token inside a link is reported once, as the link.
  const bare = allowed.includes(route(file)) ? [] : [...text.replace(link, "").matchAll(token)];
  for (const m of [...text.matchAll(link), ...bare]) {
    console.error(`[placeholders] ${relative(dist, file)}: ${m[0]}`);
    failures++;
  }
}
if (failures) {
  console.error(`[placeholders] ${failures} placeholder(s) in dist/. Fill them in src/config/site.ts before deploying.`);
  process.exit(1);
}
console.log("[placeholders] none in dist/ outside the allowed pages");
