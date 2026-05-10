import { HiChevronDown } from "react-icons/hi2";
import { motion, useReducedMotion } from "motion/react";
import type { ExperienceRole } from "../content/experience";
import { formatEmploymentDates } from "../utils/experienceFormat";

const linkFocusClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const companyLinkClasses =
  `font-semibold text-foreground underline decoration-primary/40 underline-offset-[3px] transition-colors hover:text-accent-foreground hover:decoration-accent-foreground ${linkFocusClasses}`;

const techPillClasses =
  "inline-flex items-center rounded-md border border-primary/25 bg-primary/5 px-2 py-1 text-xs font-medium text-accent-foreground transition-colors duration-200 motion-reduce:transition-none hover:border-primary/40 hover:bg-primary/10";

const skillPillClasses =
  "inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-1 text-xs font-medium text-foreground transition-colors duration-200 motion-reduce:transition-none hover:border-primary/30 hover:bg-muted";

export type ExperienceCardProps = Readonly<{
  role: ExperienceRole;
  isExpanded: boolean;
  isLast: boolean;
  /** 0-based position in the list; drives the on-mount entrance stagger. */
  index?: number;
  onToggle: () => void;
}>;

function ExpandChevron(props: Readonly<{ expanded: boolean; reduceMotion: boolean }>) {
  return (
    <motion.span
      aria-hidden
      animate={{ rotate: props.expanded ? -180 : 0 }}
      className="pointer-events-none inline-flex shrink-0 items-center justify-center self-center text-muted-foreground"
      transition={{ duration: props.reduceMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      <HiChevronDown className="size-5" strokeWidth={2} />
    </motion.span>
  );
}

export function ExperienceCard(props: ExperienceCardProps) {
  const { role, isExpanded, isLast, index = 0, onToggle } = props;
  const reduceMotion = useReducedMotion() ?? false;

  const entranceDuration = reduceMotion ? 0 : 0.35;
  const entranceDelay = reduceMotion ? 0 : Math.min(index * 0.06, 0.3);
  const panelDuration = reduceMotion ? 0 : 0.2;

  return (
    <motion.li
      animate={{ opacity: 1, y: 0 }}
      className="relative flex gap-4 pb-12 last:pb-0 sm:gap-6"
      initial={{ opacity: 0, y: 8 }}
      transition={{
        duration: entranceDuration,
        delay: entranceDelay,
        ease: "easeOut",
      }}
    >
      <div className="relative flex w-10 shrink-0 justify-center sm:w-11">
        {!isLast ? (
          <div
            aria-hidden="true"
            className="absolute start-1/2 top-10 bottom-0 z-0 w-px -translate-x-1/2 bg-border sm:top-11"
          />
        ) : null}
        <button
          aria-controls={`experience-step-panel-${role.id}`}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Collapse" : "Expand"} role: ${role.title} at ${role.company}`}
          className={`relative z-10 flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border p-1.5 transition-all duration-200 motion-reduce:transition-none sm:size-11 sm:p-2 ${
            isExpanded
              ? "border-primary bg-background shadow-sm ring-2 ring-primary/20"
              : "border-border bg-background hover:border-primary/40"
          } ${linkFocusClasses}`}
          id={`experience-step-trigger-${role.id}`}
          onClick={onToggle}
          type="button"
        >
          <img
            alt=""
            className="h-7 w-7 object-contain object-center sm:h-8 sm:w-8"
            decoding="async"
            loading="lazy"
            src={role.companyLogoSrc}
          />
        </button>
      </div>

      <div className="min-w-0 flex-1 scroll-mt-20">
        <article aria-labelledby={`${role.id}-title`}>
          <button
            aria-controls={`experience-step-panel-${role.id}`}
            aria-expanded={isExpanded}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg text-start -m-2 p-2 transition-colors duration-200 motion-reduce:transition-none sm:gap-4 hover:bg-muted/40 ${linkFocusClasses}`}
            id={`experience-step-summary-${role.id}`}
            onClick={onToggle}
            type="button"
          >
            <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3
                  className={`text-[1.05rem] tracking-tight sm:text-lg transition-colors duration-200 motion-reduce:transition-none ${
                    isExpanded ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                  }`}
                  id={`${role.id}-title`}
                >
                  {role.title}
                </h3>
                {isExpanded ? (
                  <>
                    <span aria-hidden="true" className="text-border">
                      —
                    </span>
                    {role.companyUrl ? (
                      <a
                        className={`text-sm font-medium sm:text-[0.95rem] ${companyLinkClasses}`}
                        href={role.companyUrl}
                        onClick={(e) => e.stopPropagation()}
                        rel="noopener noreferrer"
                      >
                        {role.company}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground sm:text-[0.95rem]">
                        {role.company}
                      </span>
                    )}
                  </>
                ) : null}
              </div>
              {!isExpanded ? (
                <p className="text-sm leading-snug text-muted-foreground">{role.company}</p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    <time>{formatEmploymentDates(role.startDate, role.endDate)}</time>
                    <span aria-hidden="true"> · </span>
                    <span>{role.location}</span>
                  </p>
                  {isLast ? (
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Last role</p>
                  ) : null}
                </>
              )}
            </div>
            <ExpandChevron expanded={isExpanded} reduceMotion={reduceMotion} />
          </button>

          {isExpanded ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-5"
              id={`experience-step-panel-${role.id}`}
              initial={{ opacity: 0, y: -4 }}
              role="region"
              transition={{ duration: panelDuration, ease: "easeOut" }}
            >
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Responsibilities
                </h4>
                <ul className="mt-2 list-disc space-y-2 ps-5 text-pretty leading-relaxed text-muted-foreground">
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {role.achievements.length > 0 ? (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Key skills
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-2" role="list">
                    {role.achievements.map((item) => (
                      <li className={skillPillClasses} key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {role.technologies.length > 0 ? (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Technologies
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-2" role="list">
                    {role.technologies.map((tech) => (
                      <li className={techPillClasses} key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {role.links && role.links.length > 0 ? (
                <nav
                  aria-label={`Related links for ${role.company}`}
                  className="flex flex-wrap gap-x-4 gap-y-2 pt-5"
                >
                  {role.links.map((link) => (
                    <a
                      className={`text-sm font-semibold text-accent-foreground underline-offset-4 transition-colors hover:underline ${linkFocusClasses}`}
                      href={link.href}
                      key={link.href + link.label}
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              ) : null}
            </motion.div>
          ) : null}
        </article>
      </div>
    </motion.li>
  );
}
