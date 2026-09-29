/**
 * Product screenshots. Until a capture exists (`src` empty) the page draws a labelled
 * ScreenshotFrame placeholder, never a mock of the app. To ship a capture, put the 16:10 crop under
 * public/screenshots/ and set `src` (for example "/screenshots/S01.jpg"). Alt text is written now.
 */

export interface Shot {
  id: string;
  /** Short name, used on thumbnails and tabs. */
  title: string;
  /** The state the capture must show. Printed on the placeholder. */
  state: string;
  alt: string;
  caption: string;
  src?: string;
}

export const shots: Record<string, Shot> = {
  S01: {
    id: "S01",
    title: "Search results",
    state: 'Search results for "dark metallic impact", one item selected, waveform visible',
    alt: "SampleLantern search results for dark metallic impact, with one result selected and its waveform shown.",
    caption: "Search what a sound is, not only what it's called.",
  },
  S02: {
    id: "S02",
    title: "Structured search",
    state: "Structured search: bpm:118-124 key:Amin type:loop as chips",
    alt: "The SampleLantern search field with BPM 118 to 124, key A minor and type loop shown as chips, above the narrowed results.",
    caption: "Go broad, then narrow in seconds.",
  },
  S04: {
    id: "S04",
    title: "Find Similar",
    state: "Find Similar: a source item plus a clearly related result set",
    alt: "SampleLantern Find Similar, with one source sound and a list of closely related sounds beside it.",
    caption: "Turn one close sound into the right one.",
  },
  S05: {
    id: "S05",
    title: "Library overview",
    state: "Library overview: several locations indexed",
    alt: "The SampleLantern library overview listing several indexed locations across folders and drives.",
    caption: "One library across packs, folders, and drives.",
  },
  S06: {
    id: "S06",
    title: "Waveform audition",
    state: "Waveform audition: waveform, playback controls, metadata",
    alt: "A SampleLantern result being auditioned, with its waveform, playback controls and metadata visible.",
    caption: "Hear and compare without leaving the search.",
  },
  S08: {
    id: "S08",
    title: "Drag and export",
    state: "Drag and export: a sample mid-drag toward its destination",
    alt: "A sample being dragged out of SampleLantern toward its destination.",
    caption: "From search result to project.",
  },
  S09: {
    id: "S09",
    title: "Reference mode",
    state: "Reference mode: adding a library in Reference mode",
    alt: "Adding an existing folder to SampleLantern in Reference mode, so the files stay where they are.",
    caption: "Index in place. Keep your files on your Mac.",
  },
  S10: {
    id: "S10",
    title: "Collections",
    state: "Collections: nested crates with meaningful names",
    alt: "SampleLantern collections showing nested crates with meaningful names.",
    caption: "Organise discoveries without rebuilding folders.",
  },
};

/** Main gallery, in thumbnail order. */
export const galleryIds = ["S01", "S02", "S05", "S06", "S08"] as const;

/** Tabbed tour: tab label and the shot it switches to. */
export const tour = [
  { label: "Add a folder", shot: "S09" },
  { label: "Search", shot: "S02" },
  { label: "Audition", shot: "S06" },
  { label: "Find Similar", shot: "S04" },
  { label: "Crates", shot: "S10" },
  { label: "Drag out", shot: "S08" },
] as const;
