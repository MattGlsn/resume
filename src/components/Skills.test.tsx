import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Skills from "./Skills";
import type { Skill } from "../content/skills";

const fixtureSkill: Skill = {
  id: "fixture-jira",
  name: "Fixture skill",
  startDate: "2020-01",
  endDate: "2021-12",
  icon: "jira",
  categoryId: "product-management",
};

describe("Skills", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders skill name and years without proficiency or tool", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01"));

    render(<Skills skills={[fixtureSkill]} />);

    expect(screen.getByRole("heading", { name: "Product management", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fixture skill", level: 4 })).toBeInTheDocument();
    expect(screen.getByLabelText("2 years of experience")).toBeInTheDocument();
    expect(screen.queryByText("Proficient")).not.toBeInTheDocument();
    expect(screen.queryByText("Expert")).not.toBeInTheDocument();
    expect(screen.queryByText("UI")).not.toBeInTheDocument();
  });

  it("exposes a progress bar for relative experience", () => {
    render(<Skills skills={[fixtureSkill]} />);

    const region = screen.getByRole("region", { name: "Skills" });
    const bar = within(region).getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "2");
  });

  it("does not render horizontal carousel controls", () => {
    render(<Skills skills={[fixtureSkill]} />);

    expect(screen.queryByRole("button", { name: "Show previous skills" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Show next skills" })).not.toBeInTheDocument();
  });
});
