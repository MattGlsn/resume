import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import type { Skill } from "../content/skills";
import { skills as defaultSkills } from "../content/skills";
import { SkillSlide } from "./SkillSlide";

const navButtonClasses =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-secondary-border bg-secondary text-foreground shadow-sm transition-[color,background-color,border-color,transform] duration-200 ease-out hover:-translate-y-px hover:bg-background hover:shadow-md active:translate-y-0 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type SkillsProps = Readonly<{
  skills?: readonly Skill[];
}>;

function Skills(props?: SkillsProps) {
  const items = props?.skills ?? defaultSkills;
  const reduceMotion = useReducedMotion() ?? false;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return undefined;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateScrollState) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
    };
  }, [items, updateScrollState]);

  const scrollByPage = useCallback(
    (direction: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const firstCard = el.querySelector("article");
      const gap = 16;
      const step =
        firstCard instanceof HTMLElement
          ? firstCard.getBoundingClientRect().width + gap
          : Math.max(240, el.clientWidth * 0.72);
      el.scrollBy({
        left: direction * step,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(updateScrollState);
      });
    },
    [reduceMotion, updateScrollState],
  );

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

      <div className="mt-8 lg:mt-10">
        <div className="mb-3 flex items-center justify-end gap-2 lg:hidden">
          <span className="me-auto text-xs text-muted-foreground">Swipe or use arrows</span>
          <button
            aria-controls="skills-carousel"
            aria-label="Show previous skills"
            className={navButtonClasses}
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            type="button"
          >
            <HiChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            aria-controls="skills-carousel"
            aria-label="Show next skills"
            className={navButtonClasses}
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            type="button"
          >
            <HiChevronRight aria-hidden className="size-5" />
          </button>
        </div>

        <div
          aria-label="Skill cards"
          className="-mx-1 flex flex-nowrap gap-4 overflow-x-auto overscroll-x-contain px-1 pb-2 pt-1 [scrollbar-width:thin] snap-x snap-mandatory lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pb-0 lg:pt-0 xl:grid-cols-3"
          id="skills-carousel"
          onScroll={updateScrollState}
          ref={scrollerRef}
          role="region"
          tabIndex={0}
        >
          {items.map((skill) => (
            <SkillSlide key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Skills;
