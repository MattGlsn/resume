import { describe, expect, it } from "vitest";
import { formatEmploymentDates, formatMonthYear } from "./experienceFormat";

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
});
