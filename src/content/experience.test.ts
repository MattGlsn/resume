import { describe, expect, it } from "vitest";
import {
  compareExperienceRoles,
  experienceRoles,
  experienceRolesSorted,
  sortedExperienceRoles,
  type ExperienceRole,
} from "./experience";

function role(
  id: string,
  startDate: string,
  endDate: string | null,
): ExperienceRole {
  return {
    id,
    title: "Role",
    company: "Co",
    companyLogoSrc: "/logos/humanetics.png",
    location: "X",
    startDate,
    endDate,
    responsibilities: [],
    achievements: [],
    technologies: [],
  };
}

describe("compareExperienceRoles", () => {
  it("sorts newest start date first", () => {
    const a = role("older", "2019-01", "2020-01");
    const b = role("newer", "2021-06", null);
    expect(compareExperienceRoles(a, b)).toBeGreaterThan(0);
    expect(compareExperienceRoles(b, a)).toBeLessThan(0);
  });

  it("ties on start date longer end date wins (more recent tenure end)", () => {
    const a = role("a", "2020-01", "2022-06");
    const b = role("b", "2020-01", null);
    expect(compareExperienceRoles(a, b)).toBeGreaterThan(0);
  });
});

describe("experienceRolesSorted (data invariant)", () => {
  it("equals sortedExperienceRoles(experienceRoles) — pre-sorted at module load", () => {
    expect(experienceRolesSorted).toEqual(sortedExperienceRoles(experienceRoles));
  });

  it("is reverse-chronological for every adjacent pair", () => {
    for (let i = 0; i < experienceRolesSorted.length - 1; i += 1) {
      const a = experienceRolesSorted[i];
      const b = experienceRolesSorted[i + 1];
      expect(compareExperienceRoles(a, b)).toBeLessThanOrEqual(0);
    }
  });

  it("contains every role exactly once", () => {
    expect(experienceRolesSorted).toHaveLength(experienceRoles.length);
    const ids = experienceRolesSorted.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
