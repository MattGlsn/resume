/**
 * High-level skills for the dedicated Skills section (RPM-16).
 * Dates are month-precision (YYYY-MM); adjust to match your CV.
 */

/** Section order and labels for the Skills area. */
export const skillCategories = [
  { id: "product-management", title: "Product management" },
  { id: "human-factors", title: "Human factors" },
  { id: "software-development", title: "Software development" },
  { id: "mechanical-engineer", title: "Mechanical engineer" },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]["id"];

/** Keys mapped to icons in `SkillSlide`. */
export type SkillIconKey =
  | "ergonomics"
  | "jira"
  | "ai"
  | "users"
  | "roadmap"
  | "agile"
  | "docs"
  | "kpi"
  | "stakeholders"
  | "design"
  | "github"
  | "gitlab"
  | "react"
  | "typescript"
  | "tailwind"
  | "sql"
  | "cad"
  | "simulation";

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
    id: "atlassian-suite",
    name: "Atlassian suite (JIRA, JPD, Confluence)",
    startDate: "2025-06",
    endDate: null,
    icon: "jira",
    categoryId: "product-management",
  },
  {
    id: "agentic-ai-coding",
    name: "Agentic AI coding",
    startDate: "2025-06",
    endDate: null,
    icon: "ai",
    categoryId: "product-management",
  },
  {
    id: "product-design",
    name: "Product design",
    startDate: "2025-12",
    endDate: null,
    icon: "design",
    categoryId: "product-management",
  },
  {
    id: "customer-discovery",
    name: "Customer discovery",
    startDate: "2025-06",
    endDate: null,
    icon: "users",
    categoryId: "product-management",
  },
  {
    id: "roadmap-prioritization",
    name: "Roadmap & backlog prioritization",
    startDate: "2025-06",
    endDate: null,
    icon: "roadmap",
    categoryId: "product-management",
  },
  {
    id: "agile-scrum",
    name: "Agile / Scrum leadership",
    startDate: "2025-06",
    endDate: null,
    icon: "agile",
    categoryId: "product-management",
  },
  {
    id: "prds",
    name: "PRDs & requirements",
    startDate: "2025-06",
    endDate: null,
    icon: "docs",
    categoryId: "product-management",
  },
  {
    id: "kpis",
    name: "KPI definition & tracking",
    startDate: "2025-06",
    endDate: null,
    icon: "kpi",
    categoryId: "product-management",
  },
  {
    id: "stakeholder-management",
    name: "Stakeholder management",
    startDate: "2025-06",
    endDate: null,
    icon: "stakeholders",
    categoryId: "product-management",
  },
  {
    id: "ramsis",
    name: "RAMSIS",
    startDate: "2023-06",
    endDate: "2026-05",
    icon: "ergonomics",
    categoryId: "human-factors",
  },
  {
    id: "human-factors-engineering",
    name: "Human factors engineering",
    startDate: "2023-06",
    endDate: "2026-05",
    icon: "ergonomics",
    categoryId: "human-factors",
  },
  {
    id: "github",
    name: "GitHub",
    startDate: "2024-06",
    endDate: "2026-05",
    icon: "github",
    categoryId: "software-development",
  },
  {
    id: "react",
    name: "React",
    startDate: "2024-06",
    endDate: "2026-05",
    icon: "react",
    categoryId: "software-development",
  },
  {
    id: "typescript",
    name: "TypeScript",
    startDate: "2024-06",
    endDate: "2026-05",
    icon: "typescript",
    categoryId: "software-development",
  },
  {
    id: "sql",
    name: "SQL",
    startDate: "2024-06",
    endDate: "2026-05",
    icon: "sql",
    categoryId: "software-development",
  },
  {
    id: "gitlab",
    name: "GitLab",
    startDate: "2025-12",
    endDate: "2026-05",
    icon: "gitlab",
    categoryId: "software-development",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    startDate: "2024-06",
    endDate: "2026-05",
    icon: "tailwind",
    categoryId: "software-development",
  },
  {
    id: "conception-produit",
    name: "Conception produit",
    startDate: "2021-06",
    endDate: "2026-05",
    icon: "cad",
    categoryId: "mechanical-engineer",
  },
  {
    id: "computing-simulation",
    name: "Computing / simulation",
    startDate: "2025-06",
    endDate: "2026-05",
    icon: "simulation",
    categoryId: "mechanical-engineer",
  },
  {
    id: "catia-v5",
    name: "CATIA V5",
    startDate: "2020-06",
    endDate: "2026-05",
    icon: "cad",
    categoryId: "mechanical-engineer",
  },
  {
    id: "creo",
    name: "Creo",
    startDate: "2024-06",
    endDate: "2026-05",
    icon: "cad",
    categoryId: "mechanical-engineer",
  },
] as const satisfies readonly Skill[];

export const skills: readonly Skill[] = skillsRaw;
