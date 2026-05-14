/**
 * High-level skills for the dedicated Skills section (RPM-16).
 * Dates are month-precision (YYYY-MM); adjust to match your CV.
 */

/** Section order and labels for the Skills area. */
export const skillCategories = [
  { id: "product-management", title: "Product management" },
  { id: "software-development", title: "Software development" },
  { id: "cad-human-factors", title: "CAD & human factors" },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]["id"];

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
  categoryId: SkillCategoryId;
}>;

const skillsRaw = [
  {
    id: "jira",
    name: "Jira",
    startDate: "2018-01",
    endDate: null,
    icon: "jira",
    categoryId: "product-management",
  },
  {
    id: "confluence",
    name: "Confluence",
    startDate: "2019-03",
    endDate: null,
    icon: "confluence",
    categoryId: "product-management",
  },
  {
    id: "typescript",
    name: "TypeScript",
    startDate: "2019-09",
    endDate: null,
    icon: "typescript",
    categoryId: "software-development",
  },
  {
    id: "react",
    name: "React",
    startDate: "2021-01",
    endDate: null,
    icon: "react",
    categoryId: "software-development",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    startDate: "2022-04",
    endDate: null,
    icon: "tailwind",
    categoryId: "software-development",
  },
  {
    id: "gitlab",
    name: "GitLab",
    startDate: "2020-06",
    endDate: null,
    icon: "gitlab",
    categoryId: "software-development",
  },
  {
    id: "ai-tooling",
    name: "AI-assisted development",
    startDate: "2023-10",
    endDate: null,
    icon: "ai",
    categoryId: "software-development",
  },
  {
    id: "catia",
    name: "CATIA V5",
    startDate: "2016-02",
    endDate: "2023-06",
    icon: "cad",
    categoryId: "cad-human-factors",
  },
  {
    id: "ramsis",
    name: "RAMSIS",
    startDate: "2020-03",
    endDate: "2026-01",
    icon: "ergonomics",
    categoryId: "cad-human-factors",
  },
] as const satisfies readonly Skill[];

export const skills: readonly Skill[] = skillsRaw;
