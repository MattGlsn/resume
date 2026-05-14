import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import type { Skill } from "../content/skills";
import { skills as defaultSkills } from "../content/skills";
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

function Skills(props?: SkillsProps) {
  const items = props?.skills ?? defaultSkills;
  const reduceMotion = useReducedMotion() ?? false;
  const yearsMax = useMemo(() => maxYearsAcross(items), [items]);

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
          Relative experience (years) within this list—bars scale to the longest tenure shown.
        </p>
      </motion.div>

      <div
        aria-label="Skills"
        className="mt-6 max-w-xl lg:mt-8"
        role="list"
      >
        {items.map((skill, index) => (
          <SkillSlide index={index} key={skill.id} skill={skill} yearsMax={yearsMax} />
        ))}
      </div>
    </>
  );
}

export default Skills;
