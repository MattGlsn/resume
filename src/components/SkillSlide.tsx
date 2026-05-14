import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { HiCpuChip, HiUserGroup } from "react-icons/hi2";
import { MdArchitecture, MdPrecisionManufacturing, MdSpeed } from "react-icons/md";
import {
  SiGithub,
  SiGitlab,
  SiJira,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { Skill, SkillIconKey } from "../content/skills";
import { skillYearsBetween } from "../utils/skillYears";

function skillIcon(key: SkillIconKey): ReactNode {
  const className = "size-5 shrink-0 text-primary";
  switch (key) {
    case "ergonomics":
      return <MdArchitecture aria-hidden className={className} title="" />;
    case "jira":
      return <SiJira aria-hidden className={className} title="" />;
    case "ai":
      return <HiCpuChip aria-hidden className={className} title="" />;
    case "users":
      return <HiUserGroup aria-hidden className={className} title="" />;
    case "github":
      return <SiGithub aria-hidden className={className} title="" />;
    case "gitlab":
      return <SiGitlab aria-hidden className={className} title="" />;
    case "react":
      return <SiReact aria-hidden className={className} title="" />;
    case "typescript":
      return <SiTypescript aria-hidden className={className} title="" />;
    case "tailwind":
      return <SiTailwindcss aria-hidden className={className} title="" />;
    case "sql":
      return <SiPostgresql aria-hidden className={className} title="" />;
    case "cad":
      return <MdPrecisionManufacturing aria-hidden className={className} title="" />;
    case "simulation":
      return <MdSpeed aria-hidden className={className} title="" />;
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

function formatYearsValue(years: number): string {
  const rounded = Math.round(years * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function yearsWordForDisplay(yearsNumeric: number): "year" | "years" {
  if (yearsNumeric < 1 || yearsNumeric === 1) return "year";
  return "years";
}

export type SkillSlideProps = Readonly<{
  skill: Skill;
  yearsMax: number;
  index: number;
}>;

export function SkillSlide(props: SkillSlideProps) {
  const { skill, yearsMax, index } = props;
  const reduceMotion = useReducedMotion() ?? false;
  const years = skillYearsBetween(skill.startDate, skill.endDate);
  const denom = Math.max(yearsMax, 0.1);
  const fillPct = Math.min(100, Math.round((years / denom) * 1000) / 10);
  const yearsLabel = formatYearsValue(years);

  const ease = [0.22, 1, 0.36, 1] as const;
  const barTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease, delay: index * 0.05 };
  const rowTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease, delay: index * 0.05 };

  const rowInitial = reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 };
  const yearsInitial = reduceMotion ? { opacity: 1 } : { opacity: 0 };
  const barInitial = reduceMotion ? { width: `${fillPct}%` } : { width: "0%" };
  const ariaYears = Number.parseFloat(yearsLabel);
  const yearWord = yearsWordForDisplay(ariaYears);
  const yearsWithUnit = `${yearsLabel} ${yearWord}`;

  return (
    <motion.article
      className="flex flex-col gap-2 border-b border-border/80 py-3 last:border-b-0 lg:border-b-0 lg:py-2.5"
      initial={rowInitial}
      role="listitem"
      transition={rowTransition}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          aria-hidden
          className="flex shrink-0"
          initial={reduceMotion ? { scale: 1 } : { scale: 0.94 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease }}
          viewport={{ once: true }}
          whileInView={{ scale: 1 }}
        >
          {skillIcon(skill.icon)}
        </motion.span>
        <h4 className="min-w-0 flex-1 text-sm font-medium tracking-tight text-foreground">{skill.name}</h4>
        <motion.span
          aria-label={`${yearsWithUnit} of experience`}
          className="shrink-0 tabular-nums text-sm text-muted-foreground"
          initial={yearsInitial}
          transition={{ ...barTransition, duration: reduceMotion ? 0 : 0.42 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          {yearsWithUnit}
        </motion.span>
      </div>

      <div
        aria-valuemax={Math.round(denom * 10) / 10}
        aria-valuemin={0}
        aria-valuenow={ariaYears}
        className="relative h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
      >
        <motion.div
          aria-hidden
          className="h-full rounded-full bg-primary"
          initial={barInitial}
          transition={barTransition}
          viewport={{ once: true, amount: 0.1 }}
          whileInView={{ width: `${fillPct}%` }}
        />
      </div>
    </motion.article>
  );
}
