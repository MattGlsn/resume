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
  /** Shown when no explicit company link is needed */
  location: string;
  startDate: string;
  /** `null` = current role */
  endDate: string | null;
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

const rolesRaw = [
  {
    id: "pm-ai-platform",
    title: "Senior Product Manager",
    company: "Helio Analytics",
    location: "Berlin, Germany · Hybrid",
    startDate: "2022-04",
    endDate: null,
    responsibilities: [
      "Owned discovery-to-launch for AI-assisted workflow features partnering with ML, design, and GTM.",
      "Ran prioritization and roadmap rituals across squads; aligned exec stakeholders on measurable outcomes.",
      "Translated qualitative research into crisp problem statements and success metrics.",
    ],
    achievements: [
      "Shipped an AI-assisted triage flow that shortened analyst review time materially for pilot customers.",
      "Introduced a lightweight experiment framework reused by adjacent product lines.",
    ],
    technologies: [
      "Jira",
      "Productboard",
      "Figma",
      "Python prototyping",
      "LLM evaluation pipelines",
    ],
    links: [{ label: "GitHub profile", href: "https://github.com/MattGlsn" }],
  },
  {
    id: "pm-growth",
    title: "Product Manager",
    company: "Northwind Manufacturing",
    location: "Munich, Germany",
    startDate: "2019-01",
    endDate: "2022-03",
    responsibilities: [
      "Managed roadmap for digital tools used by operations and field teams across European plants.",
      "Facilitated workshops with plant leads in DE, PL, and CZ to align requirements and rollout plans.",
      "Partnered with engineering on reliability, observability, and phased feature delivery.",
    ],
    achievements: [
      "Scaled a mobile-first approvals tool to seven sites with localization and offline considerations.",
      "Reduced cycle time for escalation handling through clearer ownership and escalation paths.",
    ],
    technologies: [
      "Azure DevOps",
      "SQL",
      "Miro",
      "Amplitude",
    ],
  },
  {
    id: "ergonomics-cad",
    title: "Ergonomics Engineer · CAD Specialist",
    company: "Kinematics Automotive",
    location: "Paris, France",
    startDate: "2015-09",
    endDate: "2018-12",
    responsibilities: [
      "Modeled workstation and assembly layouts in CAD; validated designs against ergonomic norms.",
      "Collaborated with design-for-assembly teams in France and supplier partners in Asia.",
      "Supported prototyping reviews and ergonomic risk assessments for new vehicle programs.",
    ],
    achievements: [
      "Reduced rework on two pilot lines by aligning reach envelopes and tooling clearances earlier in CAD.",
      "Documented repeatable CAD conventions adopted by sibling vehicle programs.",
    ],
    technologies: [
      "CATIA",
      "SIEMENS NX",
      "Biomechanical assessment templates",
      "MS Project",
    ],
  },
] satisfies readonly ExperienceRole[];

export const experienceRoles: readonly ExperienceRole[] = rolesRaw;

export const experienceRolesSorted =
  sortedExperienceRoles(experienceRoles);
