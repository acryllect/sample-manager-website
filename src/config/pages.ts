/**
 * The support and policy pages, and the [PLACEHOLDER] values from `text` that each one prints.
 * While any of a page's values is still an open placeholder the page is noindex (DocPage) and out
 * of the sitemap (astro.config.mjs). To lift both for a page, put the real value in site.ts: nothing
 * else changes. DocPage fails the build if a page prints a placeholder that is not listed here, so
 * the list cannot drift from the copy.
 */
import { text, isPlaceholder } from "./site";

export const docPages: Record<string, readonly string[]> = {
  "/known-issues/": [text.buildVersion, text.supportEmail],
  "/supported-setup/": [text.buildVersion, text.memoryRequirement, text.supportedLibrarySize],
  "/safety/": [text.supportEmail],
  "/support/": [text.supportEmail],
  "/privacy/": [text.applicationFormProvider, text.paymentProvider, text.sellerDetails, text.privacyLegalText, text.supportEmail],
  "/terms/": [text.foundingEntitlement, text.paymentProvider, text.refundPolicy, text.termsLegalText, text.sellerDetails],
};

/** True while the page still prints an open placeholder. */
export const hasOpenPlaceholder = (path: string) => (docPages[path] ?? []).some(isPlaceholder);
