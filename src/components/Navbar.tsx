import { useEffect, useRef, useState } from "react";
import { navItems, siteName, type NavItem } from "../content/navigation";

const linkBaseClasses =
  "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const linkActiveClasses = "text-accent-foreground";

const mobileLinkBaseClasses =
  "flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const toggleButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-md border border-secondary-border bg-secondary text-secondary-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:hidden";

const brandClasses =
  "inline-flex min-h-11 items-center rounded-md px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const useActiveSection = (items: readonly NavItem[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [items]);

  return activeId;
};

type NavLinkProps = {
  item: NavItem;
  active: boolean;
  className: string;
  activeClassName?: string;
  onClick?: () => void;
};

const NavLink = ({ item, active, className, activeClassName, onClick }: NavLinkProps) => {
  const composed = active && activeClassName ? `${className} ${activeClassName}` : className;
  return (
    <a
      aria-current={active ? "location" : undefined}
      className={composed}
      href={item.href}
      onClick={onClick}
    >
      {item.label}
    </a>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const activeId = useActiveSection(navItems);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className={brandClasses} href="#profile" onClick={closeMenu}>
          {siteName}
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                active={activeId === item.id}
                activeClassName={linkActiveClasses}
                className={linkBaseClasses}
                item={item}
              />
            </li>
          ))}
        </ul>

        <button
          aria-controls="primary-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={toggleButtonClasses}
          onClick={() => setOpen((prev) => !prev)}
          ref={toggleRef}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`sm:hidden ${open ? "block" : "hidden"} border-t border-border bg-background`}
        hidden={!open}
        id="primary-nav"
      >
        <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                active={activeId === item.id}
                activeClassName={linkActiveClasses}
                className={mobileLinkBaseClasses}
                item={item}
                onClick={closeMenu}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
