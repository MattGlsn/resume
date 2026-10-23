import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ExperienceRole } from "../content/experience";
import { experienceRolesSorted } from "../content/experience";
import { formatEmploymentYears } from "../utils/experienceFormat";
import SectionHeading from "./SectionHeading";

type JourneyProps = Readonly<{
  roles?: readonly ExperienceRole[];
}>;

const easeOut = [0.22, 1, 0.36, 1] as const;

type JourneyRowProps = Readonly<{
  role: ExperienceRole;
  isOpen: boolean;
  /** The row above is open: this header rounds its top corners against those details. */
  followsOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}>;

function tabClasses({ isOpen, followsOpen, isFirst }: Pick<JourneyRowProps, "isOpen" | "followsOpen" | "isFirst">) {
  const classes = ["journey-tab"];
  if (!isFirst) {
    // Divider above the row; against the tinted details of an open row above, it also casts a shade upward.
    classes.push(
      followsOpen
        ? "rounded-t-2xl [--tab-top-line:var(--color-border)] [--tab-shade-up:rgb(11_13_18_/_0.16)]"
        : "[--tab-top-line:var(--color-border-subtle)]",
    );
  }
  if (isOpen) {
    classes.push("rounded-b-2xl [--tab-bottom-line:var(--color-border)] [--tab-shade-down:rgb(11_13_18_/_0.16)]");
  } else {
    classes.push("hover:bg-[#fafbfc]");
  }
  return classes.join(" ");
}

const JourneyRow = ({ role, isOpen, followsOpen, isFirst, onToggle }: JourneyRowProps) => {
  const reduceMotion = useReducedMotion() ?? false;
  const panelId = `journey-panel-${role.id}`;

  // Height and fade run together; the content also rises slightly as it appears.
  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { height: { duration: 0.38, ease: easeOut }, opacity: { duration: 0.24, ease: "linear" as const } };

  return (
    // The tint shows through around the header's rounded corners and behind the details.
    <li className="bg-surface-muted">
      {/* The header is a white tab: rounded at the bottom when open, at the top when the row above is open. */}
      <h3 className="relative z-10">
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className={`flex min-h-11 w-full cursor-pointer flex-wrap items-center gap-x-6 gap-y-2 bg-surface px-5 py-6 text-start transition-[border-radius,box-shadow,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-7 ${tabClasses(
            { isOpen, followsOpen, isFirst },
          )}`}
          onClick={onToggle}
          type="button"
        >
          <span className="flex-[0_0_150px] font-mono text-[13px] text-subtle">
            {formatEmploymentYears(role.startDate, role.endDate)}
          </span>
          <span className="min-w-0 flex-[999_1_320px] text-xl font-bold tracking-[-0.01em]">{role.title}</span>
          <span className="flex-[1_1_200px] text-[15px] text-muted">
            {role.company} · {role.location}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            aria-hidden
            className={`inline-flex size-8 items-center justify-center rounded-[10px] text-xl leading-none transition-colors duration-200 ${
              isOpen ? "bg-primary-soft text-primary-strong" : "bg-chip"
            }`}
            initial={false}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: easeOut }}
          >
            +
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            key="panel"
            transition={panelTransition}
          >
            <motion.div
              animate={{ y: 0 }}
              className="flex flex-col gap-3.5 px-5 pt-6 pb-7 sm:px-7"
              exit={{ y: reduceMotion ? 0 : -6 }}
              initial={{ y: reduceMotion ? 0 : -10 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: easeOut }}
            >
              {role.roleOverview ? (
                <p className="text-[15.5px] leading-[1.65] text-body">{role.roleOverview}</p>
              ) : null}
              {role.responsibilities.length > 0 ? (
                <ul className="flex list-disc flex-col gap-1.5 pl-[18px] text-[14.5px] leading-relaxed text-muted-foreground">
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {role.technologies.length > 0 ? (
                <p className="font-mono text-xs text-subtle">
                  <span className="sr-only">Tools: </span>
                  {role.technologies.join(" · ")}
                </p>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
};

const Journey = (props?: JourneyProps) => {
  const roles = props?.roles ?? experienceRolesSorted;
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-7">
      <SectionHeading
        description="From CAD and ergonomics engineering into product management: international clients, AI/ML initiatives, and cross-functional delivery. Open any role for the details."
        id="journey-heading"
        label="02 · Journey"
      >
        From <strong>CAD to product</strong>.
      </SectionHeading>

      <ol className="list-none overflow-hidden rounded-2xl border border-border bg-surface p-0 shadow-float">
        {roles.map((role, index) => (
          <JourneyRow
            followsOpen={index > 0 && openIds.has(roles[index - 1].id)}
            isFirst={index === 0}
            isOpen={openIds.has(role.id)}
            key={role.id}
            onToggle={() => toggle(role.id)}
            role={role}
          />
        ))}
      </ol>
    </div>
  );
};

export default Journey;
