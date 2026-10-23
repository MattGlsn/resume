import { useMemo } from "react";
import type { Skill } from "../content/skills";
import { skillCategories, skills as defaultSkills } from "../content/skills";
import { formatSkillYears, formatSkillYearsShort, skillYearsBetween } from "../utils/skillYears";
import SectionHeading from "./SectionHeading";
import { surfaceCard } from "./styles";

type SkillsProps = Readonly<{
  skills?: readonly Skill[];
}>;

function maxYearsAcross(items: readonly Skill[]): number {
  let m = 0.1;
  for (const s of items) {
    m = Math.max(m, skillYearsBetween(s.startDate, s.endDate));
  }
  return m;
}

type SkillBarProps = Readonly<{
  skill: Skill;
  yearsMax: number;
  featured: boolean;
}>;

const SkillBar = ({ skill, yearsMax, featured }: SkillBarProps) => {
  const years = skillYearsBetween(skill.startDate, skill.endDate);
  const percent = Math.round((years / yearsMax) * 100);

  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex justify-between gap-2.5 text-sm">
        <span>{skill.name}</span>
        <span
          aria-label={`${formatSkillYears(years)} of experience`}
          className={`font-mono text-xs ${featured ? "" : "text-subtle"}`}
        >
          {formatSkillYearsShort(years)}
        </span>
      </div>
      <div
        aria-label={`${skill.name}: ${formatSkillYears(years)}`}
        aria-valuemax={yearsMax}
        aria-valuemin={0}
        aria-valuenow={years}
        className={`h-1.5 rounded-[3px] ${featured ? "bg-white/22" : "bg-track"}`}
        role="progressbar"
      >
        <div
          className={`h-1.5 rounded-[3px] ${featured ? "bg-white" : "bg-ink"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </li>
  );
};

function Skills(props?: SkillsProps) {
  const items = props?.skills ?? defaultSkills;

  const { sections, yearsMax } = useMemo(() => {
    const sections = skillCategories
      .map((cat) => ({ ...cat, skills: items.filter((s) => s.categoryId === cat.id) }))
      .filter((cat) => cat.skills.length > 0);
    return { sections, yearsMax: maxYearsAcross(items) };
  }, [items]);

  return (
    <div className="flex flex-col gap-7">
      <SectionHeading
        description={`One shared scale across groups: a full bar is ${formatSkillYears(yearsMax)}.`}
        id="skills-heading"
        label="03 · Skills"
      >
        Years in the <strong>toolbox</strong>.
      </SectionHeading>

      <div aria-label="Skills" className="flex flex-wrap gap-4" role="region">
        {sections.map((section) => {
          // Wide cards hold a multi-column grid; narrow ones a single list.
          const wide = section.featured || section.skills.length > 4;
          return (
            <section
              aria-labelledby={`skills-cat-${section.id}`}
              className={`flex min-w-0 flex-col gap-3.5 p-7 sm:p-8 ${
                wide ? "flex-[2_1_520px]" : "flex-[1_1_340px]"
              } ${section.featured ? "rounded-2xl bg-primary text-white" : surfaceCard}`}
              key={section.id}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <h3
                  className={`font-bold ${section.featured ? "text-[22px]" : "text-xl"}`}
                  id={`skills-cat-${section.id}`}
                >
                  {section.title}
                </h3>
                {section.featured ? (
                  <span className="rounded-[10px] bg-white/18 px-2.5 py-1 font-mono text-xs">CORE</span>
                ) : null}
              </div>
              <ul
                className={
                  !wide
                    ? "flex list-none flex-col gap-3.5 p-0"
                    : `grid list-none gap-x-7 gap-y-3.5 p-0 ${
                        section.featured
                          ? "grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]"
                          : "grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))]"
                      }`
                }
              >
                {section.skills.map((skill) => (
                  <SkillBar featured={section.featured} key={skill.id} skill={skill} yearsMax={yearsMax} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
