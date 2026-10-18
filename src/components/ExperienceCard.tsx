import { HiChevronDown } from "react-icons/hi2";
import { motion, useReducedMotion } from "motion/react";
import type { ExperienceRole } from "../content/experience";
import { formatMonthYear } from "../utils/experienceFormat";
import { publicUrl } from "../utils/publicUrl";

const linkFocusClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const companyLinkClasses =
  `font-semibold text-foreground underline decoration-primary/40 underline-offset-[3px] transition-colors hover:text-accent-foreground hover:decoration-accent-foreground ${linkFocusClasses}`;

/** Shared tag chrome for Key skills + Technologies (size, radius, motion) */
const experienceTagBase =
  "inline-flex max-w-full items-center rounded-lg border px-3 py-1.5 text-sm font-medium leading-snug transition-colors duration-200 motion-reduce:transition-none";

const skillTagClasses = `${experienceTagBase} border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover`;

const techTagClasses = `${experienceTagBase} border-primary/25 bg-primary/5 text-accent-foreground hover:border-primary/40`;

type EmploymentMetaProps = Readonly<{
  endDate: string | null;
  location: string;
  /** Collapsed card: one wrapped line. Expanded: labeled rows. */
  layout: "compact" | "labeled";
  startDate: string;
}>;

function EmploymentMeta(props: EmploymentMetaProps) {
  const { endDate, location, layout, startDate } = props;
  const startLabel = formatMonthYear(startDate);
  const endLabel = endDate ? formatMonthYear(endDate) : "Present";

  const dateRange = (
    <>
      <time dateTime={startDate}>{startLabel}</time>
      <span aria-hidden="true" className="text-muted-foreground/75">
        {" "}
        –{" "}
      </span>
      {endDate ? (
        <time dateTime={endDate}>{endLabel}</time>
      ) : (
        <span className="font-medium text-foreground">{endLabel}</span>
      )}
    </>
  );

  if (layout === "compact") {
    return (
      <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <span className="sr-only">Dates: </span>
        {dateRange}
        <span aria-hidden="true" className="text-border">
          ·
        </span>
        <span className="sr-only">Location: </span>
        <span className="min-w-0 text-pretty">{location}</span>
      </p>
    );
  }

  return (
    <dl className="mt-3 space-y-1 text-xs leading-tight">
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-[5.25rem_1fr] sm:items-baseline sm:gap-x-3">
        <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-[11px]">
          Dates
        </dt>
        <dd className="min-w-0 text-xs text-foreground">{dateRange}</dd>
      </div>
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-[5.25rem_1fr] sm:items-baseline sm:gap-x-3">
        <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-[11px]">
          Location
        </dt>
        <dd className="min-w-0 text-xs text-foreground">
          <span className="text-pretty">{location}</span>
        </dd>
      </div>
    </dl>
  );
}

export type ExperienceCardProps = Readonly<{
  role: ExperienceRole;
  isExpanded: boolean;
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

/** DOM id of a role card, used by the page menu to link and track each role. */
export const experienceRoleAnchorId = (roleId: string) => `experience-${roleId}`;

export function ExperienceCard(props: ExperienceCardProps) {
  const { role, isExpanded, index = 0, onToggle } = props;
  const reduceMotion = useReducedMotion() ?? false;

  const entranceDelay = reduceMotion ? 0 : Math.min(index * 0.06, 0.3);

  return (
    <motion.li
      className="relative scroll-mt-24 overflow-hidden rounded-xl border border-border bg-secondary/90"
      id={experienceRoleAnchorId(role.id)}
      initial={{ opacity: 0, y: 14 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 420,
              damping: 32,
              delay: entranceDelay,
              mass: 0.85,
            }
      }
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -10% 0px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4 p-4 sm:gap-6 sm:p-5">
        <div className="flex w-10 shrink-0 flex-col items-center justify-start pt-0.5 sm:w-11">
          <button
            aria-controls={`experience-step-panel-${role.id}`}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} role: ${role.title} at ${role.company}`}
            className={`relative z-10 flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border p-1.5 transition-all duration-200 motion-reduce:transition-none sm:size-11 sm:p-2 ${
              isExpanded
                ? "border-primary bg-white shadow-sm ring-2 ring-primary/20"
                : "border-border bg-white hover:border-primary/40"
            } ${linkFocusClasses}`}
            id={`experience-step-trigger-${role.id}`}
            onClick={onToggle}
            type="button"
          >
            <img
              alt=""
              className={`h-7 w-7 shrink-0 object-contain object-center sm:h-8 sm:w-8 ${role.companyLogoImgClassName ?? ""}`}
              decoding="async"
              height={180}
              loading="lazy"
              src={publicUrl(role.companyLogoSrc)}
              width={180}
            />
          </button>
        </div>

        <div className="min-w-0 flex-1 scroll-mt-20">
          <article aria-labelledby={`${role.id}-title`}>
            <button
              aria-controls={`experience-step-panel-${role.id}`}
              aria-expanded={isExpanded}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg text-start -mx-1 px-2 py-2 transition-colors duration-200 motion-reduce:transition-none sm:gap-4 sm:px-3 ${linkFocusClasses}`}
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
                <div>
                  <p className="text-sm leading-snug text-muted-foreground">{role.company}</p>
                  <EmploymentMeta
                    endDate={role.endDate}
                    layout="compact"
                    location={role.location}
                    startDate={role.startDate}
                  />
                </div>
              ) : (
                <>
                  <EmploymentMeta
                    endDate={role.endDate}
                    layout="labeled"
                    location={role.location}
                    startDate={role.startDate}
                  />
                </>
              )}
            </div>
            <ExpandChevron expanded={isExpanded} reduceMotion={reduceMotion} />
          </button>

          {isExpanded ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 space-y-5 border-t border-border/80 pt-5"
              id={`experience-step-panel-${role.id}`}
              initial={{ opacity: 0, y: -4 }}
              role="region"
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 480, damping: 34, mass: 0.75 }
              }
            >
              {role.roleOverview ? (
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground/70">
                  {role.roleOverview}
                </p>
              ) : null}
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
                  <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2.5 sm:gap-x-2.5" role="list">
                    {role.achievements.map((item) => (
                      <li className={skillTagClasses} key={item}>
                        <span className="text-pretty">{item}</span>
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
                  <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2.5 sm:gap-x-2.5" role="list">
                    {role.technologies.map((tech) => (
                      <li className={techTagClasses} key={tech}>
                        <span className="text-pretty">{tech}</span>
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
      </div>
    </motion.li>
  );
}
