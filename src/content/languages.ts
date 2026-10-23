/**
 * Spoken languages for the Languages card in the hero (RPM-17).
 * Levels use the European CEFR scale (A1–C2).
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

export type Language = Readonly<{
  id: string;
  name: string;
  cefrLevel: CefrLevel;
  /** When set, shown instead of `cefrLevel` in the level badge. */
  cefrLevelDisplay?: string;
  /** Short word appended to the badge after a dot (e.g. "native"). */
  levelNote?: string;
  /** Proficiency in words, read by screen readers with the level. */
  notes?: string;
}>;

const languagesRaw = [
  {
    id: "fr",
    name: "French",
    cefrLevel: "C2",
    levelNote: "native",
    notes: "Native / bilingual",
  },
  {
    id: "en",
    name: "English",
    cefrLevel: "C1",
    cefrLevelDisplay: "C1/B2",
    notes: "Full Professional Proficiency",
  },
  {
    id: "de",
    name: "German",
    cefrLevel: "C1",
    notes: "Full Professional Proficiency",
  },
] as const satisfies readonly Language[];

export const languages: readonly Language[] = languagesRaw;

/** Badge text, e.g. "C2 · native" or "C1/B2". */
export function languageBadge(language: Language): string {
  const level = language.cefrLevelDisplay ?? language.cefrLevel;
  return language.levelNote ? `${level} · ${language.levelNote}` : level;
}
