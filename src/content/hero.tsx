import type { ReactNode } from "react";

export const heroProfile = {
  fullName: "Matthieu Glaisner",
  professionalTitle: "Product Manager",
  /** Second, muted line of the hero headline */
  tagline: "Engineer at heart.",
  availability: "Open to PM roles in Toulouse",
  summary:
    "I lead AI-driven product development in the automotive industry, with a background in engineering, ergonomics, and technical design.",
} as const;

export type HeroStat = Readonly<{ value: string; label: string }>;

/** Dark hero card about the current role (title, company and start date come from `experience.ts`). */
export const currentRoleHighlight: Readonly<{ summary: string; stats: readonly HeroStat[] }> = {
  summary: "Owning an automotive AI/ML product from zero as PM, Product Designer and Scrum Master.",
  stats: [
    { value: "7", label: "devs · USA, DE, IN" },
    { value: "4", label: "market regions" },
  ],
};

export type HeroFact = Readonly<{
  id: string;
  label: string;
  title: ReactNode;
  /** Optional smaller line under the title */
  detail?: string;
}>;

/** Fact cards under the hero, next to the Languages card. */
export const heroFacts: readonly HeroFact[] = [
  {
    id: "clients",
    label: "Clients across",
    title: (
      <>
        Europe, Asia <span className="text-faint">&amp;</span> the USA
      </>
    ),
  },
  {
    id: "based-in",
    label: "Based in",
    title: (
      <>
        Munich <span className="text-primary">→</span> Toulouse
      </>
    ),
    detail: "Seeking opportunities in Toulouse, France",
  },
];
