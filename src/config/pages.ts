/**
 * The support and policy pages, and the [PLACEHOLDER] values from `text` that each one prints.
 * While any of a page's values is still an open placeholder the page is noindex (DocPage) and out
 * of the sitemap (astro.config.mjs). To lift both for a page, put the real value in site.ts: nothing
 * else changes. DocPage fails the build if a page prints a placeholder that is not listed here, so
 * the list cannot drift from the copy.
 */
import { text, isPlaceholder } from "./site.ts";

export const docPages: Record<string, readonly string[]> = {
  "/known-issues/": [text.buildVersion, text.supportEmail],
  "/supported-setup/": [text.buildVersion, text.memoryRequirement, text.supportedLibrarySize],
  "/safety/": [text.supportEmail],
  "/support/": [text.supportEmail],
  "/privacy/": [text.sellerDetails, text.supportEmail],
  // Its refund line links to /terms/, so it stays noindex until the refund policy is real.
  "/pricing/": [text.refundPolicy],
  "/changelog/": [],
  "/terms/": [text.foundingEntitlement, text.paymentProvider, text.refundPolicy, text.sellerDetails],
};

/** Pages that stay noindex and out of the sitemap for good: the thank-you page the application
 *  form redirects to. */
export const unlistedPages: readonly string[] = ["/applied/"];

/** True while the page still prints an open placeholder, or always for an unlisted page. Both keep
 *  the page noindex and out of the sitemap. */
export const hasOpenPlaceholder = (path: string) =>
  unlistedPages.includes(path) || (docPages[path] ?? []).some(isPlaceholder);
