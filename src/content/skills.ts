/**
 * High-level skills for the dedicated Skills section (RPM-16).
 * Dates are month-precision (YYYY-MM); adjust to match your CV.
 * Skills show in the order listed here, within their category.
 */

/** Section order and labels for the Skills area. `featured` draws the category as the large accent card. */
export const skillCategories = [
  { id: "product-management", title: "Product management", featured: true },
  { id: "mechanical-engineer", title: "Mechanical engineering", featured: false },
  { id: "human-factors", title: "Human factors", featured: false },
  { id: "software-development", title: "Software development", featured: false },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]["id"];

export type Skill = Readonly<{
  id: string;
  name: string;
  startDate: string;
  endDate: string | null;
  categoryId: SkillCategoryId;
}>;

const skillsRaw = [
  {
    id: "customer-discovery",
    name: "Customer discovery",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "roadmap-prioritization",
    name: "Roadmap & backlog",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "agile-scrum",
    name: "Agile / Scrum leadership",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "prds",
    name: "PRDs & requirements",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "kpis",
    name: "KPI definition & tracking",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "stakeholder-management",
    name: "Stakeholder management",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "atlassian-suite",
    name: "Atlassian (Jira, JPD, Confluence)",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "agentic-ai-coding",
    name: "Agentic AI coding",
    startDate: "2025-06",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "product-design",
    name: "Product design",
    startDate: "2025-12",
    endDate: null,
    categoryId: "product-management",
  },
  {
    id: "catia-v5",
    name: "CATIA V5",
    startDate: "2020-06",
    endDate: "2026-05",
    categoryId: "mechanical-engineer",
  },
  {
    id: "conception-produit",
    name: "Product design (conception produit)",
    startDate: "2021-06",
    endDate: "2026-05",
    categoryId: "mechanical-engineer",
  },
  {
    id: "creo",
    name: "Creo",
    startDate: "2024-06",
    endDate: "2026-05",
    categoryId: "mechanical-engineer",
  },
  {
    id: "computing-simulation",
    name: "Computing / simulation",
    startDate: "2025-06",
    endDate: "2026-05",
    categoryId: "mechanical-engineer",
  },
  {
    id: "ramsis",
    name: "RAMSIS",
    startDate: "2023-06",
    endDate: "2026-05",
    categoryId: "human-factors",
  },
  {
    id: "human-factors-engineering",
    name: "Human factors engineering",
    startDate: "2023-06",
    endDate: "2026-05",
    categoryId: "human-factors",
  },
  {
    id: "react",
    name: "React",
    startDate: "2024-06",
    endDate: "2026-05",
    categoryId: "software-development",
  },
  {
    id: "typescript",
    name: "TypeScript",
    startDate: "2024-06",
    endDate: "2026-05",
    categoryId: "software-development",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    startDate: "2024-06",
    endDate: "2026-05",
    categoryId: "software-development",
  },
  {
    id: "sql",
    name: "SQL",
    startDate: "2024-06",
    endDate: "2026-05",
    categoryId: "software-development",
  },
  {
    id: "github",
    name: "GitHub",
    startDate: "2024-06",
    endDate: "2026-05",
    categoryId: "software-development",
  },
  {
    id: "gitlab",
    name: "GitLab",
    startDate: "2025-12",
    endDate: "2026-05",
    categoryId: "software-development",
  },
] as const satisfies readonly Skill[];

export const skills: readonly Skill[] = skillsRaw;
