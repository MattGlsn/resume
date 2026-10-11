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
      "Product Manager for automotive AI/ML and digital initiatives—discovery with OEMs across China, Japan, Germany, and the USA in English and German; roadmaps, PRDs, Agile delivery, and executive-ready insights. French (native); English and German at professional working proficiency.",
    responsibilities: [
      "Conduct customer discovery interviews with international clients (China, Japan, Germany, USA) in English and German to better understand customer needs, market expectations, and product opportunities",
      "Define product vision and contribute to roadmap prioritization for new products based on customer feedback, business value, and strategic objectives",
      "Contribute to the development of business plans for new initiatives, particularly around AI/ML integration and digital transformation opportunities",
      "Translate customer and business requirements into structured Product Requirement Documents (PRDs) to align stakeholders and guide development teams",
      "Manage and prioritize product backlogs in alignment with roadmap milestones, delivery timelines, and business priorities using Agile/SCRUM methodologies",
      "Support executive decision-making by preparing reports, risk assessments, and strategic insights on ongoing projects and innovation initiatives",
      "Anticipate project risks, identify dependencies early, and propose mitigation strategies to ensure smooth execution and delivery",
      "Work closely with cross-functional teams (engineering, sales, management, and product teams) to support product development, alignment, and execution",
      "Facilitate communication across departments to ensure efficient coordination of initiatives and stakeholder alignment",
      "Develop early prototypes using AI tools (Claude, Claude Code, Claude Design, VS Code, GitLab) to explore, validate, and iterate on new product ideas and AI-driven concepts",
      "Support Agile project management workflows using Jira and Confluence for sprint planning, documentation, backlog management, and team collaboration",
    ],
    achievements: [
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
    title: "Application Engineer — Human Factors & Ergonomics",
    company: "Humanetics",
    companyLogoSrc: "/logos/humanetics.png",
    location: "Munich, Germany",
    startDate: "2023-07",
    endDate: "2026-01",
    roleOverview:
      "Human factors and ergonomics engineer—RAMSIS-led interior studies, CATIA V5 surfacing for full-scale digital mock-ups, and OEM delivery from concept through prototyping (~five major programs per year), including BMW Neue Klasse. Worked fully in German in an international automotive environment (meetings, presentations, documentation).",
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
    companyLogoSrc: "/logos/rotarex.png",
    location: "Lintgen, Luxembourg",
    startDate: "2021-04",
    endDate: "2023-07",
    roleOverview:
      "Technical Designer specialized in 3D mechanical design of industrial valves using CATIA V5. Worked in collaboration with senior engineers to deliver precise technical documentation and production-ready designs for both standard catalogue products and custom customer solutions.",
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
    companyLogoSrc: "/logos/hutchinson.png",
    companyLogoImgClassName: "scale-110",
    location: "Montargis, France",
    startDate: "2018-01",
    endDate: "2021-04",
    roleOverview:
      "Technical Designer with experience in automotive and aerospace R&D, specializing in thermal management solutions and composite part design. Worked closely with engineering teams to develop innovative products from concept to prototype while ensuring compliance with technical and customer requirements.",
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
    companyLogoSrc: "/logos/ifp-energies-nouvelles.png",
    location: "Rueil-Malmaison, France",
    startDate: "2017-04",
    endDate: "2017-12",
    roleOverview:
      "Developed a parametric CATIA V5 model for the upper section of a 4-valve direct injection combustion engine. The tool enabled engineers to rapidly configure and prototype different engine architectures, significantly reducing development time from concept to testing.",
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
