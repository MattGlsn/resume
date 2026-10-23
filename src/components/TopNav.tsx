import { useEffect, useState } from "react";
import { contactNavItem, navItems } from "../content/navigation";
import { heroProfile } from "../content/hero";
import { useActiveSection } from "../hooks/useActiveSection";
import { focusRing, pageColumn } from "./styles";

const linkBase = `inline-flex min-h-11 items-center rounded-[10px] px-4 text-sm no-underline transition-colors duration-200 ${focusRing}`;

/** True once the page has scrolled past the top, so the sticky bar can lift off the content. */
const useScrolled = (): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
};

const TopNav = () => {
  const activeId = useActiveSection(navItems);
  const scrolled = useScrolled();

  // Sticky from `sm`: on phones the links wrap to a second row, too tall to keep on screen.
  return (
    <nav
      aria-label="Main"
      className={`${pageColumn} z-40 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-border bg-surface py-2 pr-2 pl-5 transition-shadow duration-200 sm:sticky sm:top-6 ${
        scrolled ? "sm:shadow-nav" : ""
      }`}
    >
      <a
        className={`inline-flex items-center gap-2.5 rounded-md text-base font-bold text-foreground no-underline ${focusRing}`}
        href="#top"
      >
        <span aria-hidden className="size-2.5 rounded-full bg-primary" />
        {heroProfile.fullName}
      </a>
      <div className="flex flex-wrap items-center gap-0.5">
        {navItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              aria-current={isActive ? "location" : undefined}
              className={`${linkBase} ${
                isActive
                  ? "bg-primary-soft font-semibold text-primary-strong"
                  : "font-medium text-muted-foreground hover:bg-chip hover:text-foreground"
              }`}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </a>
          );
        })}
        <a
          className={`${linkBase} bg-foreground px-5 font-semibold text-surface hover:bg-ink-border`}
          href={contactNavItem.href}
        >
          {contactNavItem.label}
        </a>
      </div>
    </nav>
  );
};

export default TopNav;
