import { describe, expect, it, vi, afterEach } from "vitest";
import {
  currentYearMonth,
  formatSkillYears,
  formatSkillYearsShort,
  skillYearsBetween,
} from "./skillYears";

describe("skillYearsBetween", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts inclusive months across year boundary", () => {
    // Jan 2020 – Dec 2020 = 12 months = 1.0 year
    expect(skillYearsBetween("2020-01", "2020-12")).toBe(1);
  });

  it("treats null end as current month (mocked)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-15"));
    // Jan 2025 – May 2026 = 17 months → ~1.4 years rounded to 1 decimal
    const y = skillYearsBetween("2025-01", null);
    expect(y).toBe(1.4);
  });

  it("returns 0.1 minimum for a single-month span", () => {
    expect(skillYearsBetween("2024-06", "2024-06")).toBe(0.1);
  });

  it("returns 0 for invalid dates", () => {
    expect(skillYearsBetween("not-a-date", "2024-01")).toBe(0);
    expect(skillYearsBetween("2024-01", "bad")).toBe(0);
  });
});

describe("formatSkillYears", () => {
  it("formats sub-one-year values", () => {
    expect(formatSkillYears(0.5)).toBe("0.5 years");
  });

  it("formats whole years without decimal noise", () => {
    expect(formatSkillYears(5)).toBe("5 years");
  });

  it("formats one decimal when needed", () => {
    expect(formatSkillYears(5.3)).toBe("5.3 years");
  });
});

describe("currentYearMonth", () => {
  it("matches mocked clock", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-03-07"));
    expect(currentYearMonth()).toBe("2024-03");
    vi.useRealTimers();
  });
});

describe("formatSkillYearsShort", () => {
  it("drops decimal noise and uses a short unit", () => {
    expect(formatSkillYearsShort(6)).toBe("6 y");
    expect(formatSkillYearsShort(1.4)).toBe("1.4 y");
    expect(formatSkillYearsShort(0.5)).toBe("0.5 y");
  });
});
