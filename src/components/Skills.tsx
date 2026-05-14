import { motion, useReducedMotion } from "motion/react";
import type { Skill } from "../content/skills";
import { skills as defaultSkills } from "../content/skills";
import { SkillSlide } from "./SkillSlide";

type SkillsProps = Readonly<{
  skills?: readonly Skill[];
}>;

function Skills(props?: SkillsProps) {
  const items = props?.skills ?? defaultSkills;
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
        }
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
          Tools and platforms I use regularly—experience length and timelines are computed from the same
          month-level dates as the CV, so this section stays easy to update.
        </p>
      </motion.div>

      <div
        aria-label="Skill cards"
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 xl:grid-cols-3"
        role="region"
      >
        {items.map((skill) => (
          <SkillSlide key={skill.id} skill={skill} />
        ))}
      </div>
    </>
  );
}

export default Skills;
