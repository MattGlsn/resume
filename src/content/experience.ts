import { productFocusAreas } from "./productRole";

/** Month-precision ISO dates (YYYY-MM) for sorting and formatting. */

export type ExperienceRole = Readonly<{
  /** Stable id for lists / tests */
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  /** `null` = current role */
  endDate: string | null;
  /** One line under the title, readable without opening the role */
  headline: string;
  /** 3–4 short points shown first when the role is opened */
  highlights: readonly string[];
  /** Short paragraph shown with the full responsibilities */
  roleOverview?: string;
  responsibilities: readonly string[];
  achievements: readonly string[];
  technologies: readonly string[];
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
    location: "Munich, Germany",
    startDate: "2026-01",
    endDate: null,
    headline: "Owns an automotive AI/ML product from scratch as PM, Product Designer and Scrum Master.",
    highlights: [
      "Leads a team of 7 developers across the USA, Germany and India",
      "Runs customer discovery with clients in China, Japan, Germany and the USA, in English and German",
      "Turns customer needs into product vision, roadmap, PRDs and KPIs",
      "Builds early prototypes with AI tools to test new product ideas",
    ],
    roleOverview:
      "Product Manager for automotive AI/ML and digital initiatives at Humanetics, leading a 7-developer team across the USA, Germany and India. Roadmaps, PRDs, Agile delivery and executive-ready insights.",
    responsibilities: productFocusAreas.flatMap((area) => area.items),
    achievements: [
      "Zero-to-One Product Launch",
      "Product Design",
      "Scrum Master",
      "Global Team Leadership (USA, Germany, India)",
      "Agile / SCRUM",
      "Product Discovery",
      "Roadmap Planning",
      "Backlog Prioritization",
      "Risk Management",
      "Product Management",
      "PRDs",
      "Communication",
      "Structured Thinking",
      "Reporting",
      "KPI Definition & Tracking",
      "Executive Communication",
      "Cross-Functional Collaboration",
      "Stakeholder Management",
      "Problem-Solving",
      "Decision-Making",
      "Risk Anticipation",
      "Customer Discovery",
      "Strategic Planning",
    ],
    technologies: ["Office 365", "Jira", "Confluence", "Claude", "Claude Code", "Claude Design", "GitLab"],
  },
  {
    id: "app-eng-humanetics",
    title: "Application Engineer, Human Factors & Ergonomics",
    company: "Humanetics",
    location: "Munich, Germany",
    startDate: "2023-07",
    endDate: "2026-01",
    headline: "Ergonomics studies and digital mock-ups of car interiors for major carmakers.",
    highlights: [
      "Ran RAMSIS ergonomics studies on reach, visibility, comfort and accessibility",
      "Built full-scale digital mock-ups in CATIA V5 for about five OEM projects a year",
      "Contributed to the ergonomics of the BMW “Neue Klasse” platform",
      "Worked fully in German with OEM engineering teams and customers",
    ],
    roleOverview:
      "Human factors and ergonomics engineer: RAMSIS-led interior studies, CATIA V5 surfacing for full-scale digital mock-ups, and OEM delivery from concept through prototyping (about five major programs per year), including BMW Neue Klasse. Worked fully in German in an international automotive environment.",
    responsibilities: [
      "Performed ergonomics analyses using RAMSIS to support interior concept development with a strong focus on user experience, including reachability, visibility, comfort, accessibility, and driver/passenger positioning",
      "Contributed to both concept and prototyping phases across approximately five projects per year for major OEM customers",
      "Designed and developed full-scale digital mock-ups using CATIA V5 advanced surfacing modeling (GSD, Part Design, Assembly Design), based on designer surfaces, packaging constraints, and engineering data",
      "Supported ergonomics studies through anthropometric analyses using Humanetics data and realistic user scenarios",
      "Collaborated closely with prototype manufacturing and machining teams to ensure consistency between digital mock-ups and physical prototypes",
      "Applied OEM standards and methodologies, including nomenclature, PLM processes, CAD structuring, and technical documentation requirements",
      "Maintained direct communication with OEM engineering teams and participated in regular customer meetings and internal reviews to present project progress and technical solutions",
      "Managed project planning and reporting activities while ensuring challenging milestones, quality expectations, and customer deadlines were consistently achieved",
      "Worked fully in German in an international automotive environment, including technical meetings, presentations, and written communication",
      "Contributed to the ergonomics development of the BMW “Neue Klasse” platform, supporting next-generation vehicle interior concepts and user experience studies",
    ],
    achievements: [
      "Ergonomics engineering",
      "Interior concept development",
      "Digital mock-up design",
      "OEM coordination",
      "Anthropometric analysis",
      "Project planning",
      "Stakeholder communication",
      "Advanced surfacing modeling",
    ],
    technologies: [
      "CATIA V5",
      "RAMSIS",
      "Office 365",
    ],
  },
  {
    id: "technical-designer-rotarex",
    title: "Technical Designer",
    company: "ROTAREX",
    location: "Lintgen, Luxembourg",
    startDate: "2021-04",
    endDate: "2023-07",
    headline: "3D design and production drawings for industrial valves.",
    highlights: [
      "Designed 3D models and manufacturing drawings for industrial valves in CATIA V5",
      "Covered both standard catalogue products and customer-specific designs",
      "Kept PLM data and technical documentation consistent, in English and French",
    ],
    roleOverview:
      "Technical Designer specialized in 3D mechanical design of industrial valves using CATIA V5, delivering precise technical documentation and production-ready designs for standard catalogue products and custom customer solutions.",
    responsibilities: [
      "Created and updated 3D models and technical drawings for industrial valves",
      "Ensured accuracy, quality, and compliance of manufacturing drawings used directly in production",
      "Managed PLM updates and maintained technical documentation consistency",
      "Collaborated with engineering and production teams throughout the design process",
      "Supported development of both standard products and customer-specific valve designs",
      "Worked in an international English/French environment",
    ],
    achievements: [
      "Mechanical Design",
      "Technical Drawing Creation",
      "Manufacturing Documentation",
      "Quality Control",
      "Product Lifecycle Management (PLM)",
      "Industrial Valve Design",
      "Cross-functional Collaboration",
    ],
    technologies: ["CATIA V5", "PLM Systems", "Microsoft Office Suite"],
  },
  {
    id: "cad-designer-hutchinson",
    title: "CAD Designer",
    company: "Hutchinson",
    location: "Montargis, France",
    startDate: "2018-01",
    endDate: "2021-04",
    headline: "Automotive and aerospace R&D: thermal management and composite parts.",
    highlights: [
      "Designed thermal management solutions in Creo with thermal engineers",
      "Prototyped and assembled concept demonstrators for automotive applications",
      "Designed composite aircraft parts and supported patent development",
    ],
    roleOverview:
      "Automotive and aerospace R&D, specializing in thermal management solutions and composite part design, developing innovative products from concept to prototype.",
    responsibilities: [
      "Designed thermal management solutions in Creo in collaboration with thermal engineers",
      "Ensured designs met thermal, mechanical, and manufacturing requirements",
      "Designed, prototyped, and assembled sub-assemblies and concept demonstrators for automotive applications",
      "Supported patent development for innovative thermal solutions",
      "Designed composite aircraft components and produced detailed technical drawings",
      "Developed aerospace designs based on engineering calculations, industry standards, and customer specifications",
      "Collaborated with cross-functional engineering and R&D teams throughout product development",
    ],
    achievements: [
      "3D CAD Design",
      "Thermal Solution Design",
      "Mechanical Design",
      "Composite Part Design",
      "Technical Drawings",
      "Prototyping & Assembly",
      "Product Development",
      "R&D Engineering Support",
      "Problem Solving",
      "Cross-functional Collaboration",
    ],
    technologies: [
      "Creo Parametric",
      "CATIA V5",
      "Technical Drawing Standards",
      "Composite Materials",
    ],
  },
  {
    id: "cad-intern-ifpen",
    title: "CAD Design Intern",
    company: "IFP Energies nouvelles",
    location: "Rueil-Malmaison, France",
    startDate: "2017-04",
    endDate: "2017-12",
    headline: "A parametric CAD model that sped up combustion engine design.",
    highlights: [
      "Built a fully parametric CATIA V5 model of a 4-valve engine's upper section",
      "Let engineers adjust chamber volume, valve position, intake angle and camshaft placement",
      "Shortened development time from concept to testing",
    ],
    roleOverview:
      "Developed a parametric CATIA V5 model for the upper section of a 4-valve direct injection combustion engine, letting engineers rapidly configure and prototype engine architectures and significantly reducing development time from concept to testing.",
    responsibilities: [
      "Designed and implemented a fully parametric 3D model of the engine upper assembly",
      "Created configurable parameters for combustion chamber volume, valve positioning, intake duct angle, and camshaft placement",
      "Collaborated on engine architecture optimization and prototyping workflows",
      "Improved design iteration speed by enabling rapid geometry modifications",
    ],
    achievements: [
      "Parametric CAD modeling",
      "Mechanical design",
      "Combustion engine architecture",
      "Design optimization",
      "Engineering prototyping",
      "Technical problem-solving",
    ],
    technologies: ["CATIA V5", "Mechanical Engineering Design", "3D Parametric Modeling"],
  },
] satisfies readonly ExperienceRole[];

export const experienceRoles: readonly ExperienceRole[] = rolesRaw;

export const experienceRolesSorted =
  sortedExperienceRoles(experienceRoles);
