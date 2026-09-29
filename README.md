# SampleLantern website

The founding paid-beta landing page for **SampleLantern**, a native macOS app for searching and
organising large local sample libraries. One static page, plus two placeholder pages the app links
to (`/support/`, `/privacy/`). No backend, no analytics, no cookie banner, no third-party scripts.
Inter from Google Fonts is the only external request.

The page has one job: let a qualified visitor decide they fit, understand the pre-release
trade-off, and apply for a purchase invitation. It has no download link and no trial.

## Stack

- [Astro](https://astro.build) as a static build tool. It ships no client framework; the only
  JavaScript is a few inline lines for the gallery, the tabs and the contrast theme.
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
| Screenshot list, captions, alt text, tour tabs | `src/data/shots.ts` |
| The page | `src/pages/index.astro` |
| Header, footer, screenshot frame, waveform | `src/components/` |
| Tokens, components, page layout | `src/styles/` |
| App icon (resized), Core icons | `public/assets/` |

## Open placeholders

Everything written `[LIKE_THIS]` is an open placeholder from the approved copy. It stays exactly as
written until the real value exists, so nothing ships by accident. `npm run build` prints the ones
still open. The application link goes through `applyHref()`, which adds `utm_*` campaign
parameters only once the URL is real, and never any personal data.

## Screenshots and the demo video

Until a capture exists, each screenshot is a labelled placeholder (shot ID and state). The page
never mocks an app screen in HTML. To ship a capture, put a 16:10 crop under `public/screenshots/`
and set `src` on that shot in `src/data/shots.ts`. Captures come from the notarized paid-beta
build with the demo library. The demo video uses `links.demoVideo`, `links.demoPoster` and
`links.demoCaptions`; it plays muted with captions on and is never behind a form.

## Design-system rules this page follows

- Dark only. `data-theme="contrast"` is set on `<html>` when `prefers-contrast: more` matches.
- LanternGlow appears exactly twice: behind the main gallery screenshot and behind the closing
  call to action.
- Core icons are provisional and used sparingly: folder, file, similar, search, chevron down.
- Sample audio is never uploaded, and the page carries no analytics. Adding either needs a
  decision and a privacy-page change first.

## Legal and support pages

`/support/` and `/privacy/` are placeholders (`[SUPPORT_PAGE_COPY]`, `[PRIVACY_PAGE_COPY]`) marked
`noindex` and left out of the sitemap. When the final copy lands, drop `noindex` in
`src/components/InfoPage.astro` and remove them from the sitemap filter in `astro.config.mjs`.
