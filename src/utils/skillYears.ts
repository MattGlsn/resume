/** Month-precision ISO dates (YYYY-MM), same convention as `experience.ts`. */

function parseYearMonth(isoYm: string): { y: number; m: number } | null {
  const m = /^(\d{4})-(\d{2})$/.exec(isoYm);
  if (!m) return null;
  const y = Number(m[1]);
  const month = Number(m[2]);
  if (!Number.isFinite(y) || month < 1 || month > 12) return null;
  return { y, m: month };
}

/** Current calendar month as YYYY-MM (UTC-safe for resume month labels). */
export function currentYearMonth(): string {
  const d = new Date();
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  return `${y}-${String(mo).padStart(2, "0")}`;
}

/**
 * Inclusive span in whole months between the first day of `startDate` and the
 * last day of `endDate` month. `endDate === null` uses {@link currentYearMonth}.
 * Returns fractional years rounded to one decimal (minimum 0.1 when span ≥ 1 month).
 */
export function skillYearsBetween(startDate: string, endDate: string | null): number {
  const start = parseYearMonth(startDate);
  const endRaw = endDate ?? currentYearMonth();
  const end = parseYearMonth(endRaw);
  if (!start || !end) return 0;

  const startIdx = start.y * 12 + (start.m - 1);
  const endIdx = end.y * 12 + (end.m - 1);
  const inclusiveMonths = endIdx - startIdx + 1;
  if (inclusiveMonths < 1) return 0;

  const years = inclusiveMonths / 12;
  const rounded = Math.round(years * 10) / 10;
  return Math.max(0.1, rounded);
}

/** Display string for recruiter-facing cards (always shows a number of years). */
export function formatSkillYears(years: number): string {
  if (years < 1) return `${years} year${years === 1 ? "" : "s"}`;
  const rounded = Math.round(years * 10) / 10;
  const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${label} years`;
}
