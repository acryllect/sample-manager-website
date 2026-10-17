# SampleLantern website

The founding paid-beta landing page for **SampleLantern**, a native macOS app for searching and
organising large local sample libraries. One static page, plus six support and policy pages the app
and the footer link to, a pricing page and a changelog. No backend, no analytics, no cookie banner,
no third-party scripts and no third-party requests: Inter is self-hosted from `public/fonts/`
(rsms/inter v4.1, SIL Open Font License 1.1, `public/fonts/LICENSE.txt`).

The page has one job: let a qualified visitor decide they fit, understand the pre-release
trade-off, and apply for a purchase invitation. It has no download link and no trial.

## Stack

- [Astro](https://astro.build) as a static build tool. It ships no client framework; the only
  JavaScript is inline: the contrast theme, the `js` / `motion` classes and the scroll reveal in
  `BaseLayout.astro`, and one script in `index.astro` for the tour tabs and auto-advance, the
  animated search field, the audition sweep and the hero film's play button.
- The SampleLantern Web design system, copied in: `src/styles/tokens.css` (generated from the
  system's `tokens.json`) and `src/styles/bundle.css` (its `sl-*` components, with the Inter
  `@import` removed because the font is self-hosted: `@font-face` in `site.css`, preloaded from
  `<head>`). `src/styles/site.css` holds page
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

In order: hero (the 32-second film, `links.demoVideo`), search ("Your library is bigger than your memory."), how it works (the tour), today and next (`id="beta-scope"`: today cards, planned items, what is not in
the beta), privacy (S09), offer (`id="offer"`), who it's for and how joining works, FAQ (`id="faq"`),
closing call to action. "Apply for an invitation" appears exactly four times: header, hero, offer,
closing.

## Screenshots and the demo video

Until a capture exists, each screenshot is a labelled placeholder (shot ID and state). The page
never mocks an app screen in HTML. To ship a capture, put its 2400 x 1500 PNG master at
`src/assets/shots/<ID>.png` and set `captured: true` on that shot in `src/data/shots.ts` (one line).
The hero window is 1,200 CSS px wide, so 2400 is a sharp 2x. `astro:assets` builds AVIF, WebP and a
JPEG fallback at 720, 1200 and 2400 px wide. Every shot on the page lazy-loads. Each shot appears
once: S05 S02 S06 S04 S10 S08 in the tour (in that order), S09 in the privacy section.
Captures come from the notarized paid-beta build with the demo library. The hero holds the demo
video (the 32-second film) in place of S01. It uses `links.demoVideo`, `links.demoPoster` (the hero
still) and `links.demoCaptions`; it is a 16:9 frame with `preload="none"`, so only the still loads
until someone presses play. A play button sits centred over the still; one click plays the film
with sound and shows the controls, and at the end the still and the button come back. There is no
`playsinline`, so an iPhone plays it full screen. Its captions track is available but off by
default, because the lines are already on screen. Without scripts the markup's `controls` stay and
the play button stays hidden. It is never behind a form. The film MP4 lives on R2 at
`https://media.samplelantern.com/`, because iOS plays video only from a server that answers byte-range
requests (`206`) and Workers static assets do not; the CSP's `media-src` allows that host. The
still and the captions stay in `public/media/`. Every media file has a version in its name
(`-v1`), and `public/media/` has an immutable cache header.

The social card is `public/og/home.png` (1200 x 630), built from S01, the app icon, the wordmark and
the headline with a one-off sharp script (sharp is what Astro already installs), using
`Inter-SemiBold.ttf` and `Inter-Medium.ttf` from the same Inter release (`extras/ttf/`). The script
is kept with the WEB-03 evidence, outside this repository; rebuild the card when S01 or the
headline changes.

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
  (WEB-01): `.sl-glow` is not used, and the page has no glow at all. The hero film and the closing
  icon both have black shadows instead (WEB-06, founder): the film's reaches `--halo-reach` all round
  (64px, 24px on phones), the icon's is a drop shadow that follows its rounded shape.
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
