/**
 * Central site configuration.
 *
 * Every brand, legal, and commercial string that could plausibly change —
 * name, seller identity, domain, prices, external URLs — lives here so the
 * rest of the site never hardcodes them. Update this file, not the pages.
 */

export const siteConfig = {
  /** Product identity */
  productName: "SampleLantern",
  tagline: "Find the sound. Skip the folders.",
  domain: "samplelantern.com",
  siteUrl: "https://samplelantern.com",

  /** Contact & legal */
  supportEmail: "support@samplelantern.com",
  legalSeller: "Alessandro Pelosio",

  /** Founder identity — used for first-person, direct-from-the-founder copy */
  founderName: "Alessandro Pelosio",
  founderFirstName: "Alessandro",
  founderRole: "Producer, sound engineer, and solo developer",
  /** Path under /public once a photo exists, e.g. "/founder.jpg". Leave empty for the placeholder mark. */
  founderImage: "",
  founderBioShort:
    "I'm Alessandro — a producer and sound engineer. I started building SampleLantern around the same problem I kept running into in real sessions: I had plenty of sounds, but finding the right one was taking too long.",

  /** Founding beta commercial terms */
  foundingPrice: "€79",
  foundingPriceNumeric: 79,
  foundingCurrency: "EUR",

  /**
   * Whether the founding-beta program is currently accepting applications.
   * Keep false until the build, checkout, and policy gates in
   * docs/commercial/11-LAUNCH-BUILD-QUEUE.md have passed. Flipping this to
   * true does not by itself expose a checkout — see checkoutUrl below.
   */
  betaOpen: false,

  /**
   * Tally form URL for the founding-beta application.
   * Leave empty to show the "applications opening soon" placeholder on /apply.
   */
  tallyFormUrl: "",

  /**
   * Hosted demo video URL (e.g. a signed asset or streaming embed).
   * Leave empty to show the placeholder demo frame on / and /demo.
   */
  demoVideoUrl: "",

  /**
   * Hosted checkout URL for accepted applicants.
   * This is intentionally never linked from public pages — checkout is sent
   * privately to qualified applicants after founder review. Kept here only
   * so a future founder-only flow has one place to read it from.
   */
  checkoutUrl: "",

  /** Supported environment for the current founding beta */
  supportedMacOS: "macOS 14 or later",
  supportedArchitecture: "Apple silicon",

  /** Third-party analytics — off by default; see README for how to enable */
  analyticsEnabled: false,

  /** Last-updated date for the known-issues page, ISO format */
  knownIssuesUpdated: "2026-09-07",
} as const;

export type SiteConfig = typeof siteConfig;
