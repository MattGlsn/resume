import { useEffect, useState } from "react";
import { experienceRolesSorted } from "../content/experience";
import type { NavItem } from "../content/navigation";
import { experienceRoleAnchorId } from "./ExperienceCard";
import { useActiveSection } from "../hooks/useActiveSection";

type Row = NavItem & Readonly<{ depth: 0 | 1; startDate?: string }>;

const mainSection = (id: string, label: string): Row => ({
  id,
  label,
  href: `#${id}`,
  depth: 0,
});

/** Main sections of the page (profile is the header, contact the footer), with each role under Experience. */
const rows: readonly Row[] = [
  mainSection("experience", "Experience"),
  ...experienceRolesSorted.map((role): Row => {
    const id = experienceRoleAnchorId(role.id);
    return { id, label: role.title, href: `#${id}`, depth: 1, startDate: role.startDate };
  }),
  mainSection("skills", "Skills"),
  mainSection("languages", "Languages"),
];

/** Row height (px) of one menu entry; the path is drawn between the first and last dot centers. */
const ROW_PX = 36;
const lastIndex = rows.length - 1;

const linkClasses =
  "flex h-9 items-center rounded-md pr-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const controlClasses =
  "inline-flex size-4 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Scroll progress along the path, 0 (first section) to `lastIndex` (last section). */
const pathProgress = (): number => {
  const mid = window.scrollY + window.innerHeight * 0.4;
  const tops = rows.map((item) => {
    const el = document.getElementById(item.id);
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });

  let progress = 0;
  for (let i = 0; i < rows.length; i += 1) {
    const top = tops[i];
    if (top === null || mid < top) break;
    const next = i < lastIndex ? tops[i + 1] : null;
    progress =
      next === null || next === undefined
        ? i
        : i + Math.min(1, (mid - top) / Math.max(1, next - top));
  }
  return Math.min(lastIndex, progress);
};

const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setProgress(pathProgress());
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
};

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const activeId = useActiveSection(rows);
  const progress = useScrollProgress();

  useEffect(() => {
    // Half of (menu width + 1rem gap): 14rem expanded, 3.125rem collapsed (dots + chevron + padding + border).
    document.documentElement.style.setProperty("--side-nav-shift", collapsed ? "2.0625rem" : "7.5rem");
    return () => {
      document.documentElement.style.removeProperty("--side-nav-shift");
    };
  }, [collapsed]);

  return (
    <div className="pointer-events-none absolute bottom-8 top-24 left-[calc(50%_+_33rem_-_var(--side-nav-shift,7.5rem))] z-30 hidden w-56 min-[1280px]:block min-[1600px]:left-[calc(50%+32rem+1.5rem)]">
      <nav
        aria-label="On this page"
        className={`pointer-events-auto sticky top-24 flex flex-col items-start rounded-lg border border-border bg-[color-mix(in_srgb,var(--color-secondary)_65%,transparent)] p-4 backdrop-blur-sm ${collapsed ? "w-fit" : ""}`}
      >
        <div className="flex w-full items-center gap-2">
          <button
            aria-controls="side-nav-list"
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand page menu" : "Collapse page menu"}
            className={controlClasses}
            onClick={() => setCollapsed((prev) => !prev)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${
                collapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p
            className={`text-xs font-semibold uppercase tracking-wide text-muted-foreground ${
              collapsed ? "sr-only" : ""
            }`}
          >
            On this page
          </p>
        </div>

        <ul
          className="relative mt-2 w-full"
          id="side-nav-list"
        >
          <span
            aria-hidden
            className="absolute left-[7px] w-0.5 rounded-full bg-border"
            style={{ top: ROW_PX / 2, height: lastIndex * ROW_PX }}
          />
          <span
            aria-hidden
            className="absolute left-[7px] w-0.5 rounded-full bg-primary transition-[height] duration-150 ease-out motion-reduce:transition-none"
            style={{ top: ROW_PX / 2, height: progress * ROW_PX }}
          />
          {rows.map((item, index) => {
            const active = activeId === item.id;
            const reached = progress >= index - 0.001;
            return (
              <li className="relative" key={item.id}>
                <span
                  aria-hidden
                  className={`absolute top-1/2 -translate-y-1/2 rounded-full border-2 ${
                    item.depth === 0 ? "left-0 size-4" : "left-[3px] size-2.5"
                  } bg-background transition-colors duration-200 ${
                    reached ? "border-primary" : "border-border"
                  } ${active ? "bg-primary" : ""}`}
                />
                <a
                  aria-current={active ? "location" : undefined}
                  className={`${active ? `${linkClasses} font-medium text-foreground` : linkClasses} ${
                    collapsed ? "w-4 overflow-hidden pr-0" : item.depth === 0 ? "pl-6" : "pl-9"
                  }`}
                  title={collapsed ? item.label : undefined}
                  href={item.href}
                >
                  {item.startDate ? (
                    <span
                      className={`mr-1.5 shrink-0 tabular-nums text-primary ${collapsed ? "sr-only" : ""}`}
                    >
                      {item.startDate.slice(0, 4)}
                    </span>
                  ) : null}
                  <span className={`min-w-0 truncate ${collapsed ? "sr-only" : ""}`}>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
