import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import type { Skill } from "../content/skills";
import { skillCategories, skills as defaultSkills } from "../content/skills";
import { skillYearsBetween } from "../utils/skillYears";
import { SkillSlide } from "./SkillSlide";

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

function skillsInCategory(items: readonly Skill[], categoryId: string): Skill[] {
  return items.filter((s) => s.categoryId === categoryId);
}

function Skills(props?: SkillsProps) {
  const items = props?.skills ?? defaultSkills;
  const reduceMotion = useReducedMotion() ?? false;

  const sections = useMemo(() => {
    return skillCategories
      .map((cat) => {
        const list = skillsInCategory(items, cat.id);
        if (list.length === 0) return null;
        return {
          ...cat,
          skills: list,
          yearsMax: maxYearsAcross(list),
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);
  }, [items]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="mt-3 max-w-2xl text-pretty text-sm text-muted-foreground">
          Grouped by practice area. Bars compare skills within each category (longest in the group fills the
          track).
        </p>
      </motion.div>

      <div aria-label="Skills" className="mt-6 max-w-xl space-y-10 lg:mt-8" role="region">
        {sections.map((section, sectionIndex) => (
          <motion.section
            aria-labelledby={`skills-cat-${section.id}`}
            className="space-y-1"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            key={section.id}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: sectionIndex * 0.06 }
            }
            viewport={{ once: true, amount: 0.15 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              id={`skills-cat-${section.id}`}
            >
              {section.title}
            </h3>
            <div className="mt-3 border-t border-border/80 pt-1" role="list">
              {section.skills.map((skill, index) => (
                <SkillSlide
                  index={index}
                  key={skill.id}
                  skill={skill}
                  yearsMax={section.yearsMax}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </>
  );
}

export default Skills;
