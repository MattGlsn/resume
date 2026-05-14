/**
 * High-level skills for the dedicated Skills section (RPM-16).
 * Dates are month-precision (YYYY-MM); adjust to match your CV.
 */

export type SkillProficiency = "learning" | "proficient" | "expert";

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
  /** Associated technology or tool (subtitle). */
  tool: string;
  startDate: string;
  endDate: string | null;
  proficiency?: SkillProficiency;
  icon: SkillIconKey;
}>;

const skillsRaw = [
  {
    id: "typescript",
    name: "TypeScript",
    tool: "Language & type system",
    startDate: "2019-09",
    endDate: null,
    proficiency: "expert",
    icon: "typescript",
  },
  {
    id: "react",
    name: "React",
    tool: "UI library",
    startDate: "2021-01",
    endDate: null,
    proficiency: "proficient",
    icon: "react",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    tool: "Utility-first styling",
    startDate: "2022-04",
    endDate: null,
    proficiency: "proficient",
    icon: "tailwind",
  },
  {
    id: "catia",
    name: "CATIA V5",
    tool: "3D CAD / surfacing",
    startDate: "2016-02",
    endDate: "2023-06",
    proficiency: "expert",
    icon: "cad",
  },
  {
    id: "ramsis",
    name: "RAMSIS",
    tool: "Human factors / ergonomics",
    startDate: "2020-03",
    endDate: "2026-01",
    proficiency: "expert",
    icon: "ergonomics",
  },
  {
    id: "gitlab",
    name: "GitLab",
    tool: "Git, CI/CD, code review",
    startDate: "2020-06",
    endDate: null,
    proficiency: "proficient",
    icon: "gitlab",
  },
  {
    id: "jira",
    name: "Jira",
    tool: "Delivery & roadmaps",
    startDate: "2018-01",
    endDate: null,
    proficiency: "expert",
    icon: "jira",
  },
  {
    id: "confluence",
    name: "Confluence",
    tool: "Specs & stakeholder docs",
    startDate: "2019-03",
    endDate: null,
    proficiency: "proficient",
    icon: "confluence",
  },
  {
    id: "ai-tooling",
    name: "AI-assisted development",
    tool: "Cursor AI, VS Code agents",
    startDate: "2023-10",
    endDate: null,
    proficiency: "proficient",
    icon: "ai",
  },
] as const satisfies readonly Skill[];

export const skills: readonly Skill[] = skillsRaw;
