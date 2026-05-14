import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Skills from "./Skills";
import type { Skill } from "../content/skills";

const fixtureSkill: Skill = {
  id: "fixture-react",
  name: "Fixture React",
  tool: "UI",
  startDate: "2020-01",
  endDate: "2021-12",
  proficiency: "proficient",
  icon: "react",
};

describe("Skills", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders fixture skill name and timeline from props", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01"));

    render(<Skills skills={[fixtureSkill]} />);

    expect(screen.getByRole("heading", { name: "Fixture React", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();

    const carousel = screen.getByRole("region", { name: "Skill cards" });
    expect(within(carousel).getByText(/Jan 2020/)).toBeInTheDocument();
    expect(within(carousel).getByText(/Dec 2021/)).toBeInTheDocument();
  });

  it("exposes carousel navigation controls on small layouts", () => {
    render(<Skills skills={[fixtureSkill]} />);

    expect(screen.getByRole("button", { name: "Show previous skills" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show next skills" })).toBeInTheDocument();
  });
});
