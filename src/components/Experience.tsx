import { useState } from "react";
import type { ExperienceRole } from "../content/experience";
import { experienceRolesSorted } from "../content/experience";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceProps = Readonly<{
  roles?: readonly ExperienceRole[];
}>;

/** Initial expanded set for `items`; each id starts open. */
function allExpandedIds(items: readonly ExperienceRole[]): Set<string> {
  return new Set(items.map((r) => r.id));
}

const Experience = (props?: ExperienceProps) => {
  const items = props?.roles ?? experienceRolesSorted;
  const [expandedIds, setExpandedIds] = useState(() => allExpandedIds(items));

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
          const isExpanded = expandedIds.has(role.id);
          const isLast = index === items.length - 1;

          return (
            <ExperienceCard
              isExpanded={isExpanded}
              isLast={isLast}
              key={role.id}
              onToggle={() => toggle(role.id)}
              role={role}
            />
          );
        })}
      </ol>
    </>
  );
};

export default Experience;
