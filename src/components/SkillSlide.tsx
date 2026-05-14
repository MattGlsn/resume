import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { HiCpuChip } from "react-icons/hi2";
import { MdArchitecture, MdPrecisionManufacturing } from "react-icons/md";
import { SiConfluence, SiGitlab, SiJira, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import type { Skill, SkillIconKey, SkillProficiency } from "../content/skills";
import { formatEmploymentDates } from "../utils/experienceFormat";
import { formatSkillYears, skillYearsBetween } from "../utils/skillYears";

function skillIcon(key: SkillIconKey): ReactNode {
  const className = "size-9 shrink-0 text-primary sm:size-10";
  switch (key) {
    case "react":
      return <SiReact aria-hidden className={className} title="" />;
    case "tailwind":
      return <SiTailwindcss aria-hidden className={className} title="" />;
    case "typescript":
      return <SiTypescript aria-hidden className={className} title="" />;
    case "cad":
      return <MdPrecisionManufacturing aria-hidden className={className} title="" />;
    case "ergonomics":
      return <MdArchitecture aria-hidden className={className} title="" />;
    case "gitlab":
      return <SiGitlab aria-hidden className={className} title="" />;
    case "jira":
      return <SiJira aria-hidden className={className} title="" />;
    case "confluence":
      return <SiConfluence aria-hidden className={className} title="" />;
    case "ai":
      return <HiCpuChip aria-hidden className={className} title="" />;
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

const proficiencyLabel: Record<SkillProficiency, string> = {
  learning: "Growing",
  proficient: "Proficient",
  expert: "Expert",
};

const proficiencyChip: Record<SkillProficiency, string> = {
  learning: "border-border bg-muted/40 text-muted-foreground",
  proficient: "border-primary/30 bg-primary/8 text-accent-foreground",
  expert: "border-primary bg-primary text-primary-foreground",
};

export type SkillSlideProps = Readonly<{
  skill: Skill;
}>;

export function SkillSlide(props: SkillSlideProps) {
  const { skill } = props;
  const reduceMotion = useReducedMotion() ?? false;
  const years = skillYearsBetween(skill.startDate, skill.endDate);
  const yearsText = formatSkillYears(years);
  const timeline = formatEmploymentDates(skill.startDate, skill.endDate);

  return (
    <motion.article
      className="flex h-full min-h-[13.5rem] w-[min(22rem,calc(100vw-2.75rem))] shrink-0 snap-start flex-col rounded-xl border border-border bg-secondary/90 p-5 shadow-[0_1px_0_rgb(0_0_0_/0.04)] transition-shadow duration-200 hover:shadow-md lg:w-full lg:min-w-0 lg:snap-none"
      transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? {} : { y: -2 }}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg border border-border bg-background/80 p-2 shadow-sm">
          {skillIcon(skill.icon)}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{skill.name}</h3>
            {skill.proficiency ? (
              <span
                className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${proficiencyChip[skill.proficiency]}`}
              >
                {proficiencyLabel[skill.proficiency]}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">{skill.tool}</p>
        </div>
      </div>

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div className="rounded-lg border border-border/80 bg-background/50 px-3 py-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Experience
          </dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-foreground">{yearsText}</dd>
        </div>
        <div className="rounded-lg border border-border/80 bg-background/50 px-3 py-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Timeline
          </dt>
          <dd className="mt-0.5 text-foreground">
            <span className="tabular-nums">{timeline}</span>
          </dd>
        </div>
      </dl>
    </motion.article>
  );
}
