/** Month-precision ISO dates (YYYY-MM) for display. */

export function formatMonthYear(isoYm: string): string {
  const [yRaw, mRaw] = isoYm.split("-");
  const y = Number(yRaw);
  const m = Number(mRaw);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return isoYm;
  return new Date(y, m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatEmploymentDates(
  startDate: string,
  endDate: string | null,
): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  return `${start} – ${end}`;
}
