# SampleLantern website

The public marketing site for **SampleLantern**, a native macOS sample-library
manager. This is a small, static Astro site — no backend, no database, no
build-time dependency on the macOS app in the parent repository.

Currently in **founding-beta mode**: the site explains the product, sets
expectations for the pre-release build, and routes interested producers to an
application — not a public download or checkout. See
[`../docs/commercial/`](../docs/commercial/) for the commercial docs this site
is built from.

## Stack

- [Astro](https://astro.build) (static output) + TypeScript
- Plain CSS with design tokens (no Tailwind, no component library)
- No client-side framework — a few small `<script>` blocks handle the mobile
  nav toggle; everything else is static HTML/CSS
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
  for `sitemap-index.xml`

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:4321`.

Other scripts:

```bash
npm run build    # astro check (typecheck) + astro build -> dist/
npm run preview  # serve the built dist/ locally
npm run check    # typecheck only
```

## Project structure

```
src/
  config/site.ts       # single source of truth — see "Configuration" below
  layouts/
    BaseLayout.astro   # HTML shell, meta/OG/Twitter tags, header + footer
    LegalLayout.astro  # narrow prose layout for legal/support pages
  components/          # Header, Footer, Hero, WorkflowStep, FeatureCard,
                        # TrustSection, BetaOffer, FitSection, FAQ, DemoFrame,
                        # ScreenshotFrame, ConfigNotice, Logo
  pages/                # one file per route (see "Routes" below)
  styles/global.css     # design tokens (color/type/spacing) + base styles
public/                 # favicon, OG image, robots.txt, _redirects
```

## Configuration

**Everything brand- and commercial-specific lives in
[`src/config/site.ts`](src/config/site.ts).** No page hardcodes the product
name, price, domain, or external URLs — update that one file and every page
picks it up.

Key fields and what flipping them does:

| Field | Effect |
|---|---|
| `productName`, `tagline`, `domain`, `siteUrl` | Brand strings and canonical/OG URLs everywhere |
| `supportEmail`, `legalSeller` | Contact links in the footer, support page, and legal placeholders |
| `foundingPrice` | The €79 figure shown in the hero, offer card, and FAQ |
| `betaOpen` | Controls the `/apply` page: `false` shows "applications are not yet open"; `true` moves to the next check below |
| `tallyFormUrl` | When `betaOpen` is `true` and this is set, `/apply` embeds the Tally form. Empty shows "applications opening soon" |
| `demoVideoUrl` | When set, `/` and `/demo` embed the video (direct `.mp4`/`.webm` or an iframe embed URL). Empty shows the placeholder frame |
| `checkoutUrl` | **Intentionally unused by any page.** Founding-beta checkout is sent privately to accepted applicants, never linked publicly. Kept here only so a future founder-only tool has one place to read it from |
| `supportedMacOS`, `supportedArchitecture` | System-requirements copy across the site |
| `analyticsEnabled` | Currently unused — no analytics script is installed. See "Analytics" below before wiring anything to this flag |

## Content-update workflow

- **Copy changes**: edit the relevant file in `src/pages/` or the component it
  pulls from. Most homepage sections are just arrays of strings at the top of
  `src/pages/index.astro`.
- **Screenshots**: once real founding-beta screenshots exist, drop them under
  `public/screenshots/` and pass `src="/screenshots/xyz.png"` to the relevant
  `<ScreenshotFrame>` call (matching `id` values to
  `docs/commercial/03-DEMO-AND-SCREENSHOTS.md`). Without `src`, the component
  renders a clearly-marked placeholder — never a fabricated UI mockup.
- **Demo video**: set `demoVideoUrl` in `site.ts` once the 75-second demo is
  captured from a real release-candidate build.
- **Legal pages** (`/privacy`, `/terms`, `/refunds`): each currently shows a
  `TODO: FINAL LEGAL COPY` notice (see `src/components/ConfigNotice.astro`).
  Replace the placeholder content in `src/pages/privacy.astro`,
  `terms.astro`, and `refunds.astro` with approved copy once the founder and
  legal review is complete — do not remove the notice until real copy
  replaces the placeholder sections.
- **Known issues**: `src/pages/known-issues.astro` lists only issues that are
  documented in the commercial docs / engineering audit. Update
  `knownIssuesUpdated` in `site.ts` whenever this page's content changes.

## Analytics

No third-party analytics, tracking pixel, or advertising script is installed,
by design — see `docs/commercial/02-GTM-FOUNDATION.md` and the founder
operations guide. If Cloudflare Web Analytics (or similar) is added later:

1. Gate it behind the `analyticsEnabled` flag in `site.ts`.
2. Document what it collects here and reflect that in `/privacy` once that
   page has approved copy.
3. Do not add Meta Pixel, Google Analytics, Hotjar, FullStory, or similar —
   see the project brief for why.

## Routes

| Route | Purpose |
|---|---|
| `/` | Founding-beta landing page |
| `/apply` | Application entry point (Tally embed once configured) |
| `/demo` | 75-second demo (placeholder until captured) |
| `/support` | Support hub: setup, known issues, Reference mode, contact |
| `/system-requirements` | Current founding-beta hardware/OS requirements |
| `/known-issues` | Dated list of confirmed current limitations |
| `/privacy`, `/terms`, `/refunds` | Legal pages — placeholders pending approval |

## Where things live

- **Brand/commercial config**: `src/config/site.ts`
- **Beta application URLs**: `tallyFormUrl` in `site.ts`
- **Demo video URL**: `demoVideoUrl` in `site.ts`
- **Legal copy**: `src/pages/privacy.astro`, `terms.astro`, `refunds.astro`
- **Commercial source docs this site is built from**: `../docs/commercial/`

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the full GitHub → Cloudflare Pages →
Porkbun DNS walkthrough. Short version:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Root directory** (if this repo also contains the macOS app): `website`
