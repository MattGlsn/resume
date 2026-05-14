/**
 * Spoken languages for the Languages section (RPM-17).
 * Levels use the European CEFR scale (A1–C2). The meter uses step 1–6 for relative display only.
 */

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type CefrLevel = (typeof CEFR_LEVELS)[number];

/** CEFR illustrative descriptor (Council of Europe wording, English). */
export const cefrDescriptors: Record<CefrLevel, string> = {
  A1: "Breakthrough or beginner",
  A2: "Waystage or elementary",
  B1: "Threshold or intermediate",
  B2: "Vantage or upper intermediate",
  C1: "Effective operational proficiency",
  C2: "Mastery or proficiency",
};

export function cefrStep(level: CefrLevel): number {
  return CEFR_LEVELS.indexOf(level) + 1;
}

export const cefrStepMax = CEFR_LEVELS.length;

export type Language = Readonly<{
  id: string;
  name: string;
  cefrLevel: CefrLevel;
  /** Short proficiency line (left column under the language name). */
  notes?: string;
  certification?: string;
  context?: string;
  /** Decorative; paired with visible language name — keep `aria-hidden` in UI. */
  flagEmoji?: string;
}>;

const languagesRaw = [
  {
    id: "fr",
    name: "French",
    cefrLevel: "C2",
    notes: "Native / bilingual",
    flagEmoji: "🇫🇷",
  },
  {
    id: "en",
    name: "English",
    cefrLevel: "C1",
    notes: "Full Professional Proficiency",
    flagEmoji: "🇬🇧",
  },
  {
    id: "de",
    name: "German",
    cefrLevel: "C1",
    notes: "Full Professional Proficiency",
    flagEmoji: "🇩🇪",
  },
] as const satisfies readonly Language[];

export const languages: readonly Language[] = languagesRaw;
