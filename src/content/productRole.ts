/**
 * Current Product Manager role, grouped by responsibility area for the "Product role" tabs.
 * The role's `responsibilities` in `experience.ts` are built from these areas.
 */

export type ProductFocusArea = Readonly<{
  id: string;
  label: string;
  items: readonly string[];
  /** Tools used in this area, listed as tags under the Product role card */
  tools?: readonly string[];
}>;

export const productFocusAreas: readonly ProductFocusArea[] = [
  {
    id: "discovery",
    label: "Discovery & strategy",
    items: [
      "Conduct customer discovery interviews with international clients (China, Japan, Germany, USA) in English and German to better understand customer needs, market expectations, and product opportunities",
      "Define product vision and contribute to roadmap prioritization for new products based on customer feedback, business value, and strategic objectives",
      "Contribute to the development of business plans for new initiatives, particularly around AI/ML integration and digital transformation opportunities",
      "Translate customer and business requirements into structured Product Requirement Documents (PRDs) to align stakeholders and guide development teams",
    ],
  },
  {
    id: "delivery",
    label: "Delivery & team",
    items: [
      "Lead a product started from scratch, from initial discovery and vision through PRDs, design, and delivery, as the single owner across product management, product design, and Agile facilitation",
      "Serve as Product Manager, Product Designer (using Claude Design for UX concepts, mockups, and prototypes), and Scrum Master, combining all three roles to keep decisions and delivery tightly connected",
      "Lead and coordinate a globally distributed development team of 7 developers across the USA, Germany, and India, aligning priorities and handoffs across time zones",
      "Facilitate Scrum ceremonies (sprint planning, daily stand-ups, reviews, retrospectives) and remove blockers to maintain a predictable delivery cadence for the distributed team",
      "Manage and prioritize product backlogs in alignment with roadmap milestones, delivery timelines, and business priorities using Agile/SCRUM methodologies",
      "Support Agile project management workflows using Jira and Confluence for sprint planning, documentation, backlog management, and team collaboration",
    ],
  },
  {
    id: "leadership",
    label: "Leadership & stakeholders",
    items: [
      "Provide frequent updates to upper management on product progress, risks, and priorities to keep leadership aligned and informed",
      "Define, create, and maintain KPIs to track product performance and delivery, and use them to guide prioritization and decision-making",
      "Support executive decision-making by preparing reports, risk assessments, and strategic insights on ongoing projects and innovation initiatives",
      "Anticipate project risks, identify dependencies early, and propose mitigation strategies to ensure smooth execution and delivery",
      "Work closely with cross-functional teams (engineering, sales, management, and product teams) to support product development, alignment, and execution",
      "Facilitate communication across departments to ensure efficient coordination of initiatives and stakeholder alignment",
    ],
  },
  {
    id: "ai-prototyping",
    label: "AI prototyping",
    items: [
      "Develop early prototypes using AI tools (Claude, Claude Code, Claude Design, VS Code, GitLab) to explore, validate, and iterate on new product ideas and AI-driven concepts.",
    ],
    tools: ["Claude", "Claude Code", "Claude Design", "VS Code", "GitLab"],
  },
];

/** Tags listed under the tabs. */
export const productKeySkills: readonly string[] = [
  "Zero-to-One Product Launch",
  "Product Discovery",
  "Roadmap Planning",
  "Backlog Prioritization",
  "PRDs",
  "KPI Definition & Tracking",
  "Scrum Master",
  "Global Team Leadership",
  "Risk Management",
  "Executive Communication",
  "Stakeholder Management",
  "Strategic Planning",
];
