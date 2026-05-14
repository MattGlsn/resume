import { motion, useReducedMotion } from "motion/react";
import type { Language } from "../content/languages";
import { cefrDescriptors, cefrStep, cefrStepMax } from "../content/languages";

export type LanguageCardProps = Readonly<{
  language: Language;
  index: number;
}>;

export function LanguageCard({ language, index }: LanguageCardProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const step = cefrStep(language.cefrLevel);
  const max = cefrStepMax;
  const fillPct = Math.min(100, Math.round((step / max) * 1000) / 10);
  const ease = [0.22, 1, 0.36, 1] as const;
  const barTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease, delay: index * 0.05 };
  const rowTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease, delay: index * 0.05 };
  const rowInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 };
  const barInitial = reduceMotion ? { width: `${fillPct}%` } : { width: "0%" };

  const descriptor = cefrDescriptors[language.cefrLevel];
  const meterLabel = `Proficiency for ${language.name}: CEFR ${language.cefrLevel} — ${descriptor} (step ${step} of ${max} on the CEFR scale).`;

  return (
    <motion.article
      className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/90 p-5 shadow-[0_1px_0_rgb(0_0_0_/0.04)]"
      initial={rowInitial}
      transition={rowTransition}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {language.flagEmoji ? (
            <span aria-hidden className="select-none text-lg leading-none">
              {language.flagEmoji}
            </span>
          ) : null}
          <h3 className="text-base font-semibold tracking-tight text-foreground">{language.name}</h3>
        </div>
        <div className="flex max-w-full flex-col items-end gap-1 text-right sm:max-w-[min(100%,22rem)]">
          <p className="text-sm font-medium tabular-nums tracking-tight text-foreground">
            <abbr className="no-underline" title="Common European Framework of Reference for Languages">
              CEFR
            </abbr>{" "}
            <span className="text-primary">{language.cefrLevel}</span>
          </p>
          {language.notes ? (
            <p className="text-xs text-muted-foreground">{language.notes}</p>
          ) : null}
        </div>
      </div>

      <div
        aria-label={meterLabel}
        aria-valuemax={max}
        aria-valuemin={1}
        aria-valuenow={step}
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-border"
        role="meter"
      >
        <motion.div
          aria-hidden
          className="h-full rounded-full bg-primary"
          initial={barInitial}
          transition={barTransition}
          viewport={{ once: true, amount: 0.1 }}
          whileInView={{ width: `${fillPct}%` }}
        />
      </div>

      {language.certification ? (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Certification:</span> {language.certification}
        </p>
      ) : null}
      {language.context ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{language.context}</p>
      ) : null}
    </motion.article>
  );
}
