/**
 * Product screenshots. The PNG masters (2400 x 1500, 16:10, a sharp 2x of the 1,200 CSS px hero
 * window) live in src/assets/shots/<ID>.png; astro:assets turns each into AVIF, WebP and JPEG at
 * several widths (ShotWindow). A shot with `captured: false` draws a labelled placeholder, never a
 * mock of the app. To ship a capture: add its PNG and set `captured: true`, one line. Only S01
 * loads eagerly; every other shot lazy-loads. Each shot appears once on the page: S01 hero, S05 S02
 * S06 S04 S10 S08 in the tour, S09 in the privacy section. Alt text is written now.
 */
import type { ImageMetadata } from "astro";

const masters = import.meta.glob<{ default: ImageMetadata }>("../assets/shots/*.png", { eager: true });

/** The master for a captured shot. A shot marked captured without its PNG stops the build. */
export function shotImage(shot: Shot): ImageMetadata | undefined {
  if (!shot.captured) return undefined;
  const master = masters[`../assets/shots/${shot.id}.png`];
  if (!master) throw new Error(`${shot.id} is marked captured but src/assets/shots/${shot.id}.png is missing`);
  return master.default;
}

export interface Shot {
  id: string;
  /** Short name for the shot. */
  title: string;
  /** The state the capture must show. Printed on the placeholder. */
  state: string;
  alt: string;
  caption: string;
  /** True once src/assets/shots/<id>.png is the real capture. */
  captured: boolean;
}

export const shots: Record<string, Shot> = {
  S01: {
    id: "S01",
    title: "Search results",
    state: 'Search results for "metallic distorted impact", one item selected, waveform visible',
    alt: "SampleLantern search results for metallic distorted impact, with one result selected and its waveform shown.",
    caption: "Search what a sound is, not only what it's called.",
    captured: true,
  },
  S02: {
    id: "S02",
    title: "Structured search",
    state: "Structured search: bpm:118-124 key:Amin type:loop as chips",
    alt: "The SampleLantern search field with BPM 118 to 124, key A minor and type loop shown as chips, above the narrowed results.",
    caption: "Go broad, then narrow in seconds.",
    captured: true,
  },
  S04: {
    id: "S04",
    title: "Find Similar",
    state: "Find Similar: a source item plus a clearly related result set",
    alt: "SampleLantern Find Similar, with one source sound and a list of closely related sounds beside it.",
    caption: "Turn one close sound into the right one.",
    captured: true,
  },
  S05: {
    id: "S05",
    title: "Library overview",
    state: "Library overview: several locations indexed",
    alt: "The SampleLantern library overview listing several indexed locations across folders and drives.",
    caption: "One library across packs, folders, and drives.",
    captured: true,
  },
  S06: {
    id: "S06",
    title: "Waveform audition",
    state: "Waveform audition: waveform, playback controls, metadata",
    alt: "A SampleLantern result being auditioned, with its waveform, playback controls and metadata visible.",
    caption: "Hear and compare without leaving the search.",
    captured: true,
  },
  S08: {
    id: "S08",
    title: "Drag and export",
    state: "Drag and export: a sample mid-drag toward its destination",
    alt: "A sample being dragged out of SampleLantern toward its destination.",
    caption: "From search result to project.",
    captured: false,
  },
  S09: {
    id: "S09",
    title: "Files stay put",
    state: "Adding a folder: its files stay where they are",
    alt: "Adding an existing folder to SampleLantern. The files stay where they are.",
    caption: "Index in place. Keep your files on your Mac.",
    captured: false,
  },
  S10: {
    id: "S10",
    title: "Collections",
    state: "Crates: three crates with meaningful names, one selected",
    alt: "SampleLantern crates with meaningful names, one selected and its sounds listed.",
    caption: "Organise discoveries without rebuilding folders.",
    captured: true,
  },
};

/** Tabbed tour: tab label and the shot it switches to. */
export const tour = [
  { label: "Add sounds", shot: "S05" },
  { label: "Search", shot: "S02" },
  { label: "Audition", shot: "S06" },
  { label: "Find similar", shot: "S04" },
  { label: "Crates", shot: "S10" },
  { label: "Drag out", shot: "S08" },
] as const;
