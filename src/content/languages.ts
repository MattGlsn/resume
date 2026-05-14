/**
 * Spoken languages for the Languages section (RPM-17).
 * `proficiencyRank` is a coarse 1–3 scale for the relative meter only (not a CEFR score).
 */

export type ProficiencyRank = 1 | 2 | 3;

export type Language = Readonly<{
  id: string;
  name: string;
  proficiencyLabel: string;
  proficiencyRank: ProficiencyRank;
  certification?: string;
  context?: string;
  /** Decorative; paired with visible language name — keep `aria-hidden` in UI. */
  flagEmoji?: string;
}>;

const languagesRaw = [
  {
    id: "fr",
    name: "French",
    proficiencyLabel: "Native / bilingual",
    proficiencyRank: 3,
    flagEmoji: "🇫🇷",
  },
  {
    id: "en",
    name: "English",
    proficiencyLabel: "Full professional proficiency",
    proficiencyRank: 2,
    flagEmoji: "🇬🇧",
  },
  {
    id: "de",
    name: "German",
    proficiencyLabel: "Full professional proficiency",
    proficiencyRank: 2,
    flagEmoji: "🇩🇪",
  },
] as const satisfies readonly Language[];

export const languages: readonly Language[] = languagesRaw;

export const proficiencyRankMax: ProficiencyRank = 3;
