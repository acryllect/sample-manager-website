/**
 * Central site configuration.
 *
 * The product name is set from this one variable. Every value written as [BRACKETED] is an open
 * placeholder from the approved copy: it stays exactly as written until the real value exists, so
 * nothing ships by accident. The build lists the ones still open (see openPlaceholders). Which
 * placeholders each support or policy page prints is in pages.ts; a page stays noindex until its
 * own are filled.
 */

export const productName = "SampleLantern";

export const site = {
  productName,
  siteUrl: "https://samplelantern.com",
  owner: "Alessandro Pelosio",
  year: 2026,
  title: `${productName} founding beta: Find the sounds you already own`,
  description:
    "Apply for a small €59 paid beta of a private Mac sample library for producers, sound designers, and composers with substantial local libraries.",
} as const;

/** Links. The first four are still open placeholders: replace the value with the real one, and leave
 *  the [BRACKET] until then. The other four are the site's own pages. */
export const links = {
  application: "[APPLICATION_URL]",
  demoVideo: "[DEMO_VIDEO_URL]",
  demoPoster: "[DEMO_POSTER]",
  demoCaptions: "[DEMO_CAPTIONS_URL]",
  knownIssues: "/known-issues/",
  supportedSetup: "/supported-setup/",
  safetyGuide: "/safety/",
  terms: "/terms/",
} as const;

export const text = {
  supportEmail: "[SUPPORT_EMAIL]",
  cohortStatus: "[COHORT_STATUS]",
  nextReviewDate: "[NEXT_REVIEW_DATE]",
  buildVersion: "[BUILD_VERSION]",
  supportedLibrarySize: "[SUPPORTED_LIBRARY_SIZE]",
  memoryRequirement: "[MEMORY_REQUIREMENT]",
  sellerDetails: "[SELLER_DETAILS]",
  foundingEntitlement: "[EXACT FOUNDING ENTITLEMENT]",
  refundPolicy: "[REFUND_POLICY]",
  paymentProvider: "[PAYMENT_PROVIDER]",
  applicationFormProvider: "[APPLICATION_FORM_PROVIDER]",
  termsLegalText: "[TERMS_LEGAL_TEXT]",
  privacyLegalText: "[PRIVACY_LEGAL_TEXT]",
} as const;

export const isPlaceholder = (value: string) => /^\[[A-Z_ ]+\]$/.test(value);

/**
 * The application link. Campaign parameters are appended only once the URL is real, so a
 * placeholder is never altered. utm_* values describe the page position, never the visitor.
 */
export function applyHref(placement: string): string {
  const base = links.application;
  if (isPlaceholder(base)) return base;
  const url = new URL(base);
  url.searchParams.set("utm_source", "samplelantern.com");
  url.searchParams.set("utm_medium", "site");
  url.searchParams.set("utm_campaign", "founding-beta");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

/** Every placeholder still open, for the build log. */
export function openPlaceholders(): string[] {
  return [...Object.values(links), ...Object.values(text)].filter(isPlaceholder);
}
