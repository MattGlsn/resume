import { useState } from "react";
import type { ExperienceRole } from "../content/experience";
import { experienceRolesSorted } from "../content/experience";

type ExperienceProps = Readonly<{
  roles?: readonly ExperienceRole[];
}>;

function formatMonthYear(isoYm: string): string {
  const [yRaw, mRaw] = isoYm.split("-");
  const y = Number(yRaw);
  const m = Number(mRaw);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return isoYm;
  return new Date(y, m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatEmploymentDates(startDate: string, endDate: string | null): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  return `${start} – ${end}`;
}

const linkFocusClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const companyLinkClasses =
  `font-semibold text-foreground underline decoration-primary/40 underline-offset-[3px] transition-colors hover:text-accent-foreground hover:decoration-accent-foreground ${linkFocusClasses}`;

const techPillClasses =
  "inline-flex items-center rounded-md border border-primary/25 bg-primary/5 px-2 py-1 text-xs font-medium text-accent-foreground";

const stepActionClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-40";

const Experience = (props?: ExperienceProps) => {
  const items = props?.roles ?? experienceRolesSorted;
  const [openId, setOpenId] = useState(() => items[0]?.id ?? "");

  const openIndex = items.findIndex((r) => r.id === openId);
  const safeIndex = openIndex >= 0 ? openIndex : 0;

  return (
    <>
      <h2
        className="text-2xl font-semibold tracking-tight text-foreground"
        id="experience-heading"
      >
        Experience
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        From CAD and ergonomics engineering into product management—international clients, AI/ML initiatives,
        and cross-functional delivery.
      </p>

      <ol className="mt-12 space-y-0">
        {items.map((role, index) => {
          const isActive = role.id === openId;
          const isLast = index === items.length - 1;
          const stepNumber = index + 1;

          return (
            <li className="relative flex gap-4 pb-12 last:pb-0 sm:gap-6" key={role.id}>
              <div className="relative flex w-10 shrink-0 justify-center sm:w-11">
                {!isLast ? (
                  <div
                    aria-hidden="true"
                    className="absolute start-1/2 top-10 bottom-0 z-0 w-px -translate-x-1/2 bg-border sm:top-11"
                  />
                ) : null}
                <button
                  aria-current={isActive ? "step" : undefined}
                  aria-expanded={isActive}
                  className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-transparent text-sm font-semibold tracking-tight transition-colors sm:size-11 sm:text-[0.95rem] ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground"
                  } ${linkFocusClasses}`}
                  id={`experience-step-trigger-${role.id}`}
                  onClick={() => setOpenId(role.id)}
                  type="button"
                >
                  <span className="sr-only">Step {stepNumber}, </span>
                  {stepNumber}
                </button>
              </div>

              <div className="min-w-0 flex-1 scroll-mt-20">
                <article aria-labelledby={`${role.id}-title`}>
                  <button
                    aria-controls={`experience-step-panel-${role.id}`}
                    aria-expanded={isActive}
                    className={`flex w-full flex-col gap-1 rounded-lg text-start transition-colors sm:gap-1.5 ${
                      isActive ? "-m-2 p-2" : "-m-2 p-2 hover:bg-muted/30"
                    } ${linkFocusClasses}`}
                    id={`experience-step-summary-${role.id}`}
                    onClick={() => setOpenId(role.id)}
                    type="button"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3
                        className={`text-[1.05rem] tracking-tight sm:text-lg ${isActive ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}
                        id={`${role.id}-title`}
                      >
                        {role.title}
                      </h3>
                      {isActive ? (
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
                    {!isActive ? (
                      <p className="text-sm leading-snug text-muted-foreground">{role.company}</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          <time>{formatEmploymentDates(role.startDate, role.endDate)}</time>
                          <span aria-hidden="true"> · </span>
                          <span>{role.location}</span>
                        </p>
                        {isLast ? (
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Last role
                          </p>
                        ) : null}
                      </>
                    )}
                  </button>

                  {isActive ? (
                    <div
                      className="mt-6 rounded-xl border border-border bg-muted/20 px-4 py-6 sm:px-5 sm:py-7"
                      id={`experience-step-panel-${role.id}`}
                      role="region"
                    >
                      <div className="space-y-5">
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
                              Skills
                            </h4>
                            <ul className="mt-2 list-disc space-y-2 ps-5 text-pretty leading-relaxed text-muted-foreground">
                              {role.achievements.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>

                      {role.technologies.length > 0 ? (
                        <div className="mt-6">
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
                          className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-5"
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

                      <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                          className={`${stepActionClasses} bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover`}
                          disabled={safeIndex >= items.length - 1}
                          onClick={() => {
                            if (safeIndex >= items.length - 1) return;
                            setOpenId(items[safeIndex + 1]?.id ?? openId);
                          }}
                          type="button"
                        >
                          Continue
                        </button>
                        <button
                          className={`${stepActionClasses} text-muted-foreground hover:text-foreground`}
                          disabled={safeIndex <= 0}
                          onClick={() => {
                            if (safeIndex <= 0) return;
                            setOpenId(items[safeIndex - 1]?.id ?? openId);
                          }}
                          type="button"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default Experience;
