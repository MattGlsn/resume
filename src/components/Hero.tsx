import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi2";
import { contactProfile } from "../content/contact";
import { heroProfile, HeroSummary } from "../content/hero";

const easeMicro = [0.25, 0.46, 0.45, 0.94] as const;

const primaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] w-full sm:w-fit items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-primary-hover hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const heroSocialIconClasses =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background/45 text-foreground shadow-sm backdrop-blur-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-background hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-hero-from)]";

function heroVariants(reduceMotion: boolean): {
  column: Variants;
  ctaList: Variants;
  ctaItem: Variants;
  grid: Variants;
} {
  const none = { duration: 0 };
  return {
    grid: {
      hidden: {},
      show: {
        transition: reduceMotion
          ? { staggerChildren: 0 }
          : { staggerChildren: 0.1, delayChildren: 0.04 },
      },
    },
    column: {
      hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: reduceMotion ? none : { duration: 0.48, ease: easeMicro },
      },
    },
    ctaList: {
      hidden: {},
      show: {
        transition: reduceMotion
          ? { staggerChildren: 0 }
          : { staggerChildren: 0.07, delayChildren: 0.1 },
      },
    },
    ctaItem: {
      hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
      show: {
        opacity: 1,
        y: 0,
        transition: reduceMotion ? none : { duration: 0.34, ease: easeMicro },
      },
    },
  };
}

const Hero = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const v = heroVariants(reduceMotion);

  return (
    <header
      aria-labelledby="hero-heading"
      className="hero-editorial-surface flex min-h-dvh scroll-mt-20 flex-col border-b border-border"
      id="profile"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          animate="show"
          className="flex w-full flex-1 flex-col items-start justify-center gap-10"
          initial="hidden"
          variants={v.grid}
        >
          <motion.div className="flex w-full gap-6" variants={v.column}>
            <motion.div
              aria-hidden="true"
              className="mt-1 hidden w-0.5 shrink-0 rounded-full bg-primary/35 sm:block sm:min-h-[4.5rem]"
              initial={
                reduceMotion
                  ? { scaleY: 1, opacity: 1 }
                  : { scaleY: 0.32, opacity: 0.4, transformOrigin: "top center" }
              }
              animate={{ scaleY: 1, opacity: 1 }}
              style={{ transformOrigin: "top center" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
              }
            />
            <div className="min-w-0 w-full space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground">
                {heroProfile.professionalTitle}
              </p>
              <h1
                className="text-nowrap text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-wrap"
                id="hero-heading"
              >
                {heroProfile.fullName}
              </h1>
            </div>
          </motion.div>
          <motion.div className="flex w-full min-w-0 flex-col gap-8" variants={v.column}>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              <HeroSummary />
            </p>
            <motion.nav
              aria-label="Primary actions"
              className="flex w-full flex-row items-center gap-3"
              variants={v.ctaList}
            >
              <motion.a
                className={primaryButtonClasses}
                download
                href="/Matthieu_Glaisner_Resume.pdf"
                variants={v.ctaItem}
              >
                Download resume
              </motion.a>
              <motion.a
                aria-label={contactProfile.linkedInLabel}
                className={heroSocialIconClasses}
                href={contactProfile.linkedInUrl}
                rel="noopener noreferrer"
                target="_blank"
                variants={v.ctaItem}
              >
                <FiLinkedin aria-hidden className="h-6 w-6" strokeWidth={1.75} />
              </motion.a>
              <motion.a
                aria-label={contactProfile.githubLabel}
                className={heroSocialIconClasses}
                href={contactProfile.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
                variants={v.ctaItem}
              >
                <FiGithub aria-hidden className="h-6 w-6" strokeWidth={1.75} />
              </motion.a>
            </motion.nav>
          </motion.div>
        </motion.div>
        <motion.a
          animate="show"
          className="group flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-hero-from)]"
          href="#experience"
          initial="hidden"
          variants={v.column}
        >
          <p className="text-center text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            Scroll to learn more about me
          </p>
          <motion.span
            animate={reduceMotion ? { y: 0 } : { y: [0, 5, 0] }}
            aria-hidden
            className="text-muted-foreground transition-colors group-hover:text-foreground"
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] as const }
            }
          >
            <HiChevronDown className="size-4 opacity-90" />
          </motion.span>
        </motion.a>
      </div>
    </header>
  );
};

export default Hero;
