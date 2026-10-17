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
  /** The build customers have: the marketing version, without the build number. */
  softwareVersion: "0.9.0",
  title: `${productName} founding beta: Find the sounds you already own`,
  description:
    "Apply for a small €59 paid beta of a private Mac sample library for producers, sound designers, and composers with substantial local libraries.",
  ogImageAlt:
    "SampleLantern: Find the sound. Skip the folders. Search results for metallic distorted impact in the app, on an Apple silicon Mac with macOS 14 or later.",
} as const;

/** Links. The first four are still open placeholders: replace the value with the real one, and leave
 *  the [BRACKET] until then. The other four are the site's own pages. */
export const links = {
  application: "https://tally.so/r/gDybaJ",
  demoVideo: "/media/samplelantern-film-v1.mp4",
  demoPoster: "/media/samplelantern-film-v1-poster.jpg",
  demoCaptions: "/media/samplelantern-film-v1.en.vtt",
  knownIssues: "/known-issues/",
  supportedSetup: "/supported-setup/",
  safetyGuide: "/safety/",
  terms: "/terms/",
} as const;

export const text = {
  supportEmail: "help@samplelantern.com",
  buildVersion: "0.9.0 (1)",
  supportedLibrarySize: "100,000",
  memoryRequirement: "8 GB or more, the least any Apple silicon Mac has",
  sellerDetails:
    "SampleLantern is sold by Lemon Squeezy as merchant of record. It is made by Alessandro Pelosio, sole proprietor (ditta individuale), P.IVA 04871100402, Italy. Contact: help@samplelantern.com.",
  foundingEntitlement:
    "Your €59 founding purchase includes private access to the beta and a perpetual licence to SampleLantern v1.x when it is released, with every beta and v1.x update. Future major versions, such as v2, aren't included unless I say so explicitly. One licence is for one person, on up to two Macs you control.",
  refundPolicy:
    "If SampleLantern doesn't work for you, email help@samplelantern.com within 14 days of paying and I'll refund you in full. You don't have to give a reason. The refund goes back through Lemon Squeezy to the way you paid. If I stop developing SampleLantern before v1 is released, every founding customer can ask for a full refund, whenever they bought. This doesn't affect any rights you have under the law where you live.",
  paymentProvider: "Lemon Squeezy",
} as const;

/**
 * The approved legal text (D193), as written. Each paragraph opens with a bold lead; `lead` and
 * `body` are joined by a space. The support address in any of it renders as a mailto link.
 */
export interface LegalParagraph {
  lead: string;
  body: string;
}

export const legal: Record<"terms" | "privacy", readonly LegalParagraph[]> = {
  terms: [
    { lead: "Your licence.", body: "When you buy SampleLantern, I grant you a personal, perpetual licence to use the version you bought on up to two Macs you control. You may not resell, share or redistribute the app or your licence key." },
    { lead: "Your files stay yours.", body: "SampleLantern reads your audio files where they are. It never moves, renames, overwrites or deletes them. Exports are new files. Its catalog is stored on your Mac." },
    { lead: "Pre-release software.", body: "The founding beta is pre-release software and may contain defects. Keep backups of anything you can't afford to lose, as you would with any software." },
    { lead: "Liability.", body: "I'm responsible for SampleLantern to the extent the law where you live requires. Beyond that, and as far as the law allows, my liability for any claim is limited to what you paid for the licence." },
    { lead: "Changes.", body: "I won't change these terms for purchases already made. New terms apply only to new purchases, and I'll say on this page when they changed." },
    { lead: "Law.", body: "These terms are governed by Italian law. If you are a consumer, you also keep the protections of the law where you live." },
  ],
  privacy: [
    { lead: "Who is responsible.", body: "I am: Alessandro Pelosio (details below). Write to help@samplelantern.com about anything on this page." },
    { lead: "This website", body: "sets no cookies, runs no analytics or tracking, and loads nothing from other services. My host, Cloudflare, processes the technical data any website needs to deliver a page (such as your IP address) for security and delivery." },
    { lead: "Applying.", body: "The application form is run by Tally. I use what you write there only to decide on your invitation and to talk to you about the beta. I delete applications I don't accept within 6 months." },
    { lead: "Buying.", body: "Lemon Squeezy, my merchant of record, processes your payment and invoice under its own privacy policy. I receive your name, email, country and order details, and use them for your licence, support and the law's accounting rules." },
    { lead: "Email.", body: "If you write to me, I keep the conversation to help you and for my records." },
    { lead: "The app.", body: "SampleLantern works on your Mac. Your audio files, your catalog and your searches never leave it. The founding-beta build makes no network connections." },
    { lead: "Your rights.", body: "You can ask me for a copy of your data, to correct it or to delete it, and you can complain to your data-protection authority (in Italy, the Garante per la protezione dei dati personali)." },
  ],
};

/** Splits text around the support address, so a page can render each occurrence as a mailto link. */
export const splitOnSupportEmail = (value: string): string[] =>
  value.split(text.supportEmail).flatMap((part, i) => (i === 0 ? [part] : [text.supportEmail, part]));

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
