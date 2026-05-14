/** Month-precision ISO dates (YYYY-MM) for sorting and formatting. */

export type ExperienceLink = Readonly<{
  label: string;
  href: string;
}>;

export type ExperienceRole = Readonly<{
  /** Stable id for lists / tests */
  id: string;
  title: string;
  company: string;
  /** Public URL under `public/logos/` */
  companyLogoSrc: string;
  /** Optional extra classes on the company logo `<img>` (e.g. padded mark assets). */
  companyLogoImgClassName?: string;
  /** Shown when no explicit company link is needed */
  location: string;
  startDate: string;
  /** `null` = current role */
  endDate: string | null;
  /** Optional short paragraph above Responsibilities when expanded */
  roleOverview?: string;
  responsibilities: readonly string[];
  achievements: readonly string[];
  technologies: readonly string[];
  companyUrl?: string;
  links?: readonly ExperienceLink[];
}>;

/** Newest-first (standard resume chronology). */
export function compareExperienceRoles(
  a: ExperienceRole,
  b: ExperienceRole,
): number {
  const byStart = b.startDate.localeCompare(a.startDate);
  if (byStart !== 0) return byStart;

  const endA = a.endDate ?? "9999-12";
  const endB = b.endDate ?? "9999-12";
  return endB.localeCompare(endA);
}

export function sortedExperienceRoles(
  roles: readonly ExperienceRole[],
): ExperienceRole[] {
  return [...roles].sort(compareExperienceRoles);
}

/** Source: Confluence “Experiences” (RPM space), synced with LinkedIn-derived content */
const rolesRaw = [
  {
    id: "pm-humanetics",
    title: "Product Manager",
    company: "Humanetics",
    companyLogoSrc: "/logos/humanetics.png",
    location: "Munich, Germany",
    startDate: "2026-01",
    endDate: null,
    roleOverview:
      "Product Manager focused on AI-driven product development in the automotive industry, leading customer discovery activities and supporting strategic innovation initiatives with international stakeholders. Collaborating across engineering, sales, and management teams to transform business needs into actionable product opportunities and rapid AI-powered prototypes.",
    responsibilities: [
      "Conduct customer discovery interviews with international clients",
      "Support AI/ML product initiatives",
      "Prepare executive reports and project insights",
      "Collaborate with engineering, sales, and management teams",
      "Develop early prototypes using AI development tools",
    ],
    achievements: [
      "Product Management",
      "Cross-functional collaboration",
      "Communication",
      "Structured problem solving",
      "AI/ML exploration",
    ],
    technologies: ["Cursor AI", "VS Code", "GitLab", "Office 365"],
  },
  {
    id: "app-eng-humanetics",
    title: "Application Engineer — Human Factors & Ergonomics",
    company: "Humanetics",
    companyLogoSrc: "/logos/humanetics.png",
    location: "Munich, Germany",
    startDate: "2023-07",
    endDate: "2026-01",
    roleOverview:
      "Application Engineer specialized in human factors and ergonomics, supporting automotive product development through RAMSIS analyses and 1:1 mockup design in CATIA V5. Worked closely with international clients and design teams to deliver ergonomic solutions in a fast-paced engineering environment.",
    responsibilities: [
      "Conduct ergonomics analyses using RAMSIS",
      "Create 1:1 scale mockups with CATIA V5",
      "Coordinate with international clients",
      "Support design and evaluation workflows",
    ],
    achievements: [
      "Ergonomics analysis",
      "CAD conception",
      "Client coordination",
      "Product design",
    ],
    technologies: ["CATIA V5", "RAMSIS", "Office 365"],
  },
  {
    id: "technical-designer-rotarex",
    title: "Technical Designer",
    company: "ROTAREX",
    companyLogoSrc: "/logos/rotarex.png",
    location: "Luxembourg",
    startDate: "2021-04",
    endDate: "2023-07",
    responsibilities: [
      "Design and develop technical CAD solutions",
      "Support engineering and manufacturing workflows",
      "Collaborate with cross-functional teams",
    ],
    achievements: [],
    technologies: [],
  },
  {
    id: "cad-designer-hutchinson",
    title: "CAD Designer",
    company: "Hutchinson",
    companyLogoSrc: "/logos/hutchinson.png",
    companyLogoImgClassName: "scale-110",
    location: "France",
    startDate: "2018-01",
    endDate: "2021-04",
    responsibilities: [
      "Create CAD models and technical drawings",
      "Support industrial product development",
      "Collaborate with engineering teams",
    ],
    achievements: [],
    technologies: [],
  },
  {
    id: "cad-intern-ifpen",
    title: "CAD Design Intern",
    company: "IFP Energies nouvelles",
    companyLogoSrc: "/logos/ifp-energies-nouvelles.png",
    location: "France",
    startDate: "2017-04",
    endDate: "2017-12",
    responsibilities: [
      "Support technical drawing and conception tasks",
      "Participate in engineering project activities",
    ],
    achievements: [],
    technologies: [],
  },
] satisfies readonly ExperienceRole[];

export const experienceRoles: readonly ExperienceRole[] = rolesRaw;

export const experienceRolesSorted =
  sortedExperienceRoles(experienceRoles);
