/**
 * High-level skills for the dedicated Skills section (RPM-16).
 * Dates are month-precision (YYYY-MM); adjust to match your CV.
 */

/** Keys mapped to icons in `SkillSlide`. */
export type SkillIconKey =
  | "react"
  | "tailwind"
  | "typescript"
  | "cad"
  | "ergonomics"
  | "gitlab"
  | "jira"
  | "confluence"
  | "ai";

export type Skill = Readonly<{
  id: string;
  name: string;
  startDate: string;
  endDate: string | null;
  icon: SkillIconKey;
}>;

const skillsRaw = [
  {
    id: "typescript",
    name: "TypeScript",
    startDate: "2019-09",
    endDate: null,
    icon: "typescript",
  },
  {
    id: "react",
    name: "React",
    startDate: "2021-01",
    endDate: null,
    icon: "react",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    startDate: "2022-04",
    endDate: null,
    icon: "tailwind",
  },
  {
    id: "catia",
    name: "CATIA V5",
    startDate: "2016-02",
    endDate: "2023-06",
    icon: "cad",
  },
  {
    id: "ramsis",
    name: "RAMSIS",
    startDate: "2020-03",
    endDate: "2026-01",
    icon: "ergonomics",
  },
  {
    id: "gitlab",
    name: "GitLab",
    startDate: "2020-06",
    endDate: null,
    icon: "gitlab",
  },
  {
    id: "jira",
    name: "Jira",
    startDate: "2018-01",
    endDate: null,
    icon: "jira",
  },
  {
    id: "confluence",
    name: "Confluence",
    startDate: "2019-03",
    endDate: null,
    icon: "confluence",
  },
  {
    id: "ai-tooling",
    name: "AI-assisted development",
    startDate: "2023-10",
    endDate: null,
    icon: "ai",
  },
] as const satisfies readonly Skill[];

export const skills: readonly Skill[] = skillsRaw;
