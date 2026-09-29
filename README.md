# SampleLantern website

The founding paid-beta landing page for **SampleLantern**, a native macOS app for searching and
organising large local sample libraries. One static page, plus six support and policy pages the app
and the footer link to. No backend, no analytics, no cookie banner, no third-party scripts. Inter
from Google Fonts is the only external request.

The page has one job: let a qualified visitor decide they fit, understand the pre-release
trade-off, and apply for a purchase invitation. It has no download link and no trial.

## Stack

- [Astro](https://astro.build) as a static build tool. It ships no client framework; the only
  JavaScript is inline: the contrast theme, the `js` / `motion` classes and the scroll reveal in
  `BaseLayout.astro`, and one script in `index.astro` for the tour tabs and auto-advance, the
  animated search field and the audition sweep.
- The SampleLantern Web design system, copied in: `src/styles/tokens.css` (generated from the
  system's `tokens.json`) and `src/styles/bundle.css` (its `sl-*` components, with the Inter
  `@import` removed because the font is linked from `<head>`). `src/styles/site.css` holds page
  layout only.

## Run, build, test, deploy

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check (types) + astro build -> dist/
npm run preview   # serve dist/ locally
```

There is no automated test suite. Before shipping, run `npm run build` and walk the checklist in
[DEPLOYMENT.md](DEPLOYMENT.md#10-deployment-smoke-test). Deploys come from the GitHub to Cloudflare
pipeline described there: build command `npm run build`, output directory `dist`.

## Where things live

| What | Where |
|---|---|
| Product name (one variable) and site facts | `src/config/site.ts` (`productName`) |
| Every link and text placeholder | `src/config/site.ts` (`links`, `text`) |
| Screenshot list, captions, alt text, tour tabs (order and labels) | `src/data/shots.ts` |
| The landing page (sections below) | `src/pages/index.astro` |
| The six support and policy pages, and the 404 | `src/pages/{known-issues,supported-setup,safety,support,privacy,terms,404}.astro` |
| The doc page layout, its sections, menu paths and the support address | `src/components/{DocPage,DocSection,Path,SupportEmail}.astro` |
| Which placeholders each doc page prints (drives noindex and the sitemap) | `src/config/pages.ts` |
| Header, footer, screenshot frame, waveform | `src/components/` |
| Tokens, components, page layout | `src/styles/` |
| App icon (72, 96, 160 and 240px; the last two come from `sips -z` on the 1024px master), Core icons | `public/assets/` |

## Open placeholders

Everything written `[LIKE_THIS]` is an open placeholder from the approved copy. It stays exactly as
written until the real value exists, so nothing ships by accident. `npm run build` prints the ones
still open. The application link goes through `applyHref()`, which adds `utm_*` campaign
parameters only once the URL is real, and never any personal data.

## Page sections

In order: hero (S01), search ("Your library is bigger than your memory."), how it works (the tour,
then the demo video), today and next (`id="beta-scope"`: today cards, planned items, what is not in
the beta), privacy (S09), offer (`id="offer"`), who it's for and how joining works, FAQ (`id="faq"`),
closing call to action. "Apply for an invitation" appears exactly four times: header, hero, offer,
closing.

## Screenshots and the demo video

Until a capture exists, each screenshot is a labelled placeholder (shot ID and state). The page
never mocks an app screen in HTML. To ship a capture, put a 16:10 crop under `public/screenshots/`
and set `src` on that shot in `src/data/shots.ts`. Crop at 2400 x 1500: the hero window is 1,200 CSS
px wide, so that is a sharp 2x. Only S01 (hero) loads eagerly; the rest lazy-load. Each shot appears
once: S01 hero, S05 S02 S06 S04 S10 S08 in the tour (in that order), S09 in the privacy section.
Captures come from the notarized paid-beta build with the demo library. The demo video uses
`links.demoVideo`, `links.demoPoster` and `links.demoCaptions`; it is a 16:9 frame that plays muted
with captions on and is never behind a form.

## Motion

All motion uses only `transform` and `opacity` (the one exception is the card border brightening on
hover, which the brief asked for) and is off under `prefers-reduced-motion: reduce`. Every
hidden-before-reveal state in `site.css` sits behind the `motion` class that the head script puts on
`<html>` only when motion is allowed, so without JavaScript or with reduced motion the whole page is
visible at once (the search field shows its finished state, the tour shows all panels in a stack).
It covers the hero entrance, the scroll reveal, the tour crossfade and one-time auto-advance (with a
Pause/Play button; any click, key press or focus inside the tab list ends it for good), the typed
search field, the audition playhead sweep and the card hover.

## Design-system rules this page follows

- Dark only. `data-theme="contrast"` is set on `<html>` when `prefers-contrast: more` matches.
- The design system says LanternGlow appears exactly twice. The founder overrode that for this page
  (WEB-01): `.sl-glow` is not used. `site.css` defines a page-level halo instead: a restrained light
  behind the hero window only (at most 64px past its left, right and bottom edges, 24px on phones,
  never above its top edge) and a small radial glow behind the closing icon only. No text, button
  or control may overlap a glow, and there is no glow with Increase Contrast. `--halo-strength` in
  `site.css` (`:root`) sets both; `0%` switches them off.
- `site.css` also overrides three design-system classes, each noted at the top of the file: `.sl-nav`
  (translucent header), `.sl-section` (tighter section rhythm) and `.sl-search--large` (phone
  wrapping for the animated field).
- Core icons are provisional and used sparingly: folder, file, similar, search, chevron down.
- Sample audio is never uploaded, and the page carries no analytics. Adding either needs a
  decision and a privacy-page change first.

## Support and policy pages

| Page | Route | Link in `site.ts` |
|---|---|---|
| Supported setup | `/supported-setup/` | `links.supportedSetup` |
| Known issues | `/known-issues/` | `links.knownIssues` |
| Safety guide | `/safety/` | `links.safetyGuide` |
| Support | `/support/` | linked directly |
| Privacy | `/privacy/` | linked directly |
| Founding beta terms | `/terms/` | `links.terms` |

All six share `DocPage.astro`: a centred article about 680px wide (H1, a lead, then H2 sections built
with `DocSection.astro`), and on screens 1024px and wider a sticky "On this page" list, built from
the H2s, when a page has four or more sections. Menu paths are written with `Path.astro` (the `▸`
separator, labels in medium weight); app button and menu labels elsewhere use `<span class="ui">`.
The 404 page uses the same layout.

The copy comes from the cockpit's fact sheet (2026-09-29). Where a fact is missing it is a
placeholder from `text` in `site.ts`, written exactly as `[LIKE_THIS]`:
`[BUILD_VERSION]`, `[SUPPORTED_LIBRARY_SIZE]`, `[MEMORY_REQUIREMENT]`, `[SELLER_DETAILS]`,
`[EXACT FOUNDING ENTITLEMENT]`, `[REFUND_POLICY]`, `[PAYMENT_PROVIDER]`,
`[APPLICATION_FORM_PROVIDER]`, `[TERMS_LEGAL_TEXT]`, `[PRIVACY_LEGAL_TEXT]`, plus `[SUPPORT_EMAIL]`
(a `mailto:` link once it is real).

### noindex and the sitemap, per page

A doc page is `noindex` and left out of the sitemap while it prints an open placeholder.
`src/config/pages.ts` lists the `text` values each page prints; `DocPage.astro` reads it for the
`noindex` meta tag and `astro.config.mjs` reads it for the sitemap filter, and `DocPage` stops the
build if a page prints a placeholder that is not listed. To lift both for one page, put the real
values in `src/config/site.ts` for every placeholder listed for that page in `pages.ts` (for
example, `/support/` and `/safety/` only need `supportEmail`). Nothing else changes: on the next
build the page loses `noindex` and appears in `sitemap-0.xml`. Check the built `dist/sitemap-0.xml`
and the page's `<meta name="robots">` before deploying.
