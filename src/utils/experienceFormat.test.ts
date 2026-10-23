import { describe, expect, it } from "vitest";
import { formatEmploymentDates, formatEmploymentYears, formatMonthYear } from "./experienceFormat";

describe("experienceFormat", () => {
  it("formats month-year from ISO YYYY-MM", () => {
    expect(formatMonthYear("2024-01")).toMatch(/Jan/);
    expect(formatMonthYear("2024-01")).toMatch(/2024/);
  });

  it("returns raw string when parse fails", () => {
    expect(formatMonthYear("not-a-date")).toBe("not-a-date");
  });

  it("formats employment range with Present when end is null", () => {
    expect(formatEmploymentDates("2023-01", null)).toContain("Present");
  });

  it("formats a year-only range, collapsing same-year roles", () => {
    expect(formatEmploymentYears("2023-07", "2026-01")).toBe("2023 – 2026");
    expect(formatEmploymentYears("2017-04", "2017-12")).toBe("2017");
    expect(formatEmploymentYears("2026-01", null)).toBe("2026 – Present");
  });
});
