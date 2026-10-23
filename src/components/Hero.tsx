import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { contactProfile } from "../content/contact";
import { experienceRolesSorted } from "../content/experience";
import { currentRoleHighlight, heroFacts, heroProfile } from "../content/hero";
import { cefrDescriptors, languageBadge, languages } from "../content/languages";
import { formatMonthYear } from "../utils/experienceFormat";
import { publicUrl } from "../utils/publicUrl";
import { eyebrow, focusRing, pageColumn, surfaceCard } from "./styles";

const easeMicro = [0.25, 0.46, 0.45, 0.94] as const;

const buttonBase = `inline-flex min-h-13 items-center gap-2 rounded-[10px] px-6 text-base font-semibold no-underline transition-[background-color,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 ${focusRing}`;

// Stacked from the top, so titles line up across cards whether or not a card has a detail line.
const factCard = `${surfaceCard} flex min-w-0 flex-[1_1_260px] flex-col gap-3.5 p-7`;

function heroVariants(reduceMotion: boolean): { group: Variants; item: Variants } {
  return {
    group: {
      hidden: {},
      show: { transition: reduceMotion ? { staggerChildren: 0 } : { staggerChildren: 0.08 } },
    },
    item: {
      hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: reduceMotion ? { duration: 0 } : { duration: 0.48, ease: easeMicro },
      },
    },
  };
}

const LanguagesCard = () => (
  <div className={`${surfaceCard} flex min-w-0 flex-[1_1_260px] flex-col gap-3.5 p-7`}>
    <h2 className={`${eyebrow} text-subtle`} id="languages-heading">
      Languages
    </h2>
    <ul aria-labelledby="languages-heading" className="flex list-none flex-col gap-2.5 p-0">
      {languages.map((lang) => (
        <li className="flex items-center justify-between gap-3" key={lang.id}>
          <span className="text-base font-semibold">{lang.name}</span>
          <span
            className="rounded-[10px] bg-primary-soft px-2.5 py-0.5 font-mono text-xs text-primary-strong"
            title={`CEFR ${lang.cefrLevelDisplay ?? lang.cefrLevel}: ${cefrDescriptors[lang.cefrLevel]}`}
          >
            {languageBadge(lang)}
            {lang.notes ? <span className="sr-only">, {lang.notes}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const Hero = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const v = heroVariants(reduceMotion);
  const currentRole = experienceRolesSorted[0];

  return (
    <motion.header
      animate="show"
      aria-labelledby="hero-heading"
      className={`${pageColumn} flex flex-col gap-4 pt-10 pb-6 sm:pt-14`}
      id="top"
      initial="hidden"
      variants={v.group}
    >
      <div className="flex flex-wrap gap-4">
        <motion.div
          className={`${surfaceCard} flex min-w-0 flex-[2_1_600px] flex-col justify-between gap-10 p-7 sm:p-12`}
          variants={v.item}
        >
          <p className="inline-flex items-center gap-2 self-start rounded-[10px] bg-success-soft py-1.5 pr-3.5 pl-2.5 text-sm font-semibold text-success-strong">
            <span aria-hidden className="size-2 rounded-full bg-success shadow-[0_0_0_4px_rgb(22_163_74_/_0.18)]" />
            {heroProfile.availability}
          </p>
          <div className="flex flex-col gap-5">
            <h1
              className="text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-7xl lg:text-[84px]"
              id="hero-heading"
            >
              {heroProfile.professionalTitle}
              <span className="text-primary">.</span>
              <br />
              <span className="text-faint">{heroProfile.tagline}</span>
            </h1>
            <p className="max-w-[620px] text-lg leading-relaxed text-pretty text-muted-foreground sm:text-[19px]">
              {heroProfile.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary-hover`}
              href={`mailto:${contactProfile.email}?subject=${encodeURIComponent(contactProfile.mailtoSubject)}`}
            >
              Get in touch
              <FiArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
            </a>
            <a
              className={`${buttonBase} bg-chip text-foreground hover:bg-track`}
              download
              href={publicUrl(contactProfile.resumePdfPath)}
            >
              Resume PDF
            </a>
          </div>
        </motion.div>

        <motion.a
          className={`ink-glow-top-right flex min-w-0 flex-[1_1_360px] flex-col justify-between gap-8 rounded-2xl border border-ink-border bg-ink p-7 text-white no-underline transition-transform duration-200 hover:-translate-y-0.5 sm:p-9 ${focusRing}`}
          href="#pm"
          variants={v.item}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-xs tracking-[0.06em] text-ink-accent uppercase">
              Now · {formatMonthYear(currentRole.startDate)} →
            </span>
            <span aria-hidden className="inline-flex size-10 items-center justify-center rounded-[10px] bg-white/12">
              <FiArrowUpRight className="size-[18px]" />
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-[32px] leading-[1.1] font-bold tracking-[-0.02em]">
              {currentRole.title} at {currentRole.company}
            </p>
            <p className="text-[15px] leading-[1.55] text-ink-muted">{currentRoleHighlight.summary}</p>
          </div>
          <dl className="grid grid-cols-2 gap-2.5">
            {currentRoleHighlight.stats.map((stat) => (
              <div className="flex flex-col-reverse rounded-[10px] bg-white/8 p-3.5" key={stat.label}>
                <dt className="mt-0.5 text-[13px] text-ink-muted">{stat.label}</dt>
                <dd className="text-[26px] font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.a>
      </div>

      <motion.div className="flex flex-wrap gap-4" variants={v.item}>
        <LanguagesCard />
        {heroFacts.map((fact) => (
          <div className={factCard} key={fact.id}>
            <span className={`${eyebrow} text-subtle`}>{fact.label}</span>
            <p className="text-[26px] leading-[1.2] font-bold tracking-[-0.02em]">{fact.title}</p>
            {fact.detail ? <p className="text-sm text-muted">{fact.detail}</p> : null}
          </div>
        ))}
      </motion.div>
    </motion.header>
  );
};

export default Hero;
