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

const Experience = (props?: ExperienceProps) => {
  const items = props?.roles ?? experienceRolesSorted;
  return (
    <>
      <h2
        className="text-2xl font-semibold tracking-tight text-foreground"
        id="experience-heading"
      >
        Experience
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Product management delivery, AI-enhanced workflows, and earlier depth in ergonomics engineering
        and CAD—often across international teams.
      </p>

      <ol className="mt-12 flex flex-col gap-8 lg:gap-10">
        {items.map((role) => (
          <li className="scroll-mt-20" key={role.id}>
            <article
              aria-labelledby={`${role.id}-title`}
              className="relative overflow-hidden rounded-xl border border-border bg-background shadow-sm"
            >
              <div className="absolute inset-y-0 start-0 w-1 rounded-l-xl bg-primary/45" />
              <div className="px-5 py-6 ps-6 sm:px-7 sm:py-7 sm:ps-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <h3
                      className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]"
                      id={`${role.id}-title`}
                    >
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-muted-foreground">
                      {role.companyUrl ? (
                        <a
                          className={companyLinkClasses}
                          href={role.companyUrl}
                          rel="noopener noreferrer"
                        >
                          {role.company}
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{role.company}</span>
                      )}
                      <span aria-hidden="true" className="text-border max-sm:hidden">
                        ·
                      </span>
                      <time>{formatEmploymentDates(role.startDate, role.endDate)}</time>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.location}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
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
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Achievements
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 ps-5 text-pretty leading-relaxed text-muted-foreground">
                      {role.achievements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Technologies &amp; tools
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-2" role="list">
                    {role.technologies.map((tech) => (
                      <li className={techPillClasses} key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

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
              </div>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Experience;
