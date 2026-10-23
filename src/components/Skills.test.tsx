import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Skills from "./Skills";
import type { Skill } from "../content/skills";

const fixtureSkills: readonly Skill[] = [
  {
    id: "fixture-pm",
    name: "Fixture skill",
    startDate: "2020-01",
    endDate: "2021-12",
    categoryId: "product-management",
  },
  {
    id: "fixture-cad",
    name: "Fixture CAD",
    startDate: "2018-01",
    endDate: "2021-12",
    categoryId: "mechanical-engineer",
  },
];

describe("Skills", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders categories and compact years per skill", () => {
    render(<Skills skills={fixtureSkills} />);

    expect(screen.getByRole("heading", { name: "Product management", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mechanical engineering", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("CORE")).toBeInTheDocument();
    expect(screen.getByLabelText("2 years of experience")).toHaveTextContent("2 y");
    expect(screen.getByLabelText("4 years of experience")).toHaveTextContent("4 y");
  });

  it("scales every bar against the longest skill", () => {
    render(<Skills skills={fixtureSkills} />);

    expect(screen.getByText(/a full bar is 4 years/)).toBeInTheDocument();

    const region = screen.getByRole("region", { name: "Skills" });
    const [pm, cad] = within(region).getAllByRole("progressbar");
    expect(pm).toHaveAttribute("aria-valuenow", "2");
    expect(pm).toHaveAttribute("aria-valuemax", "4");
    expect(pm.firstElementChild).toHaveStyle({ width: "50%" });
    expect(cad.firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("omits categories without skills", () => {
    render(<Skills skills={fixtureSkills} />);

    expect(screen.queryByRole("heading", { name: "Human factors" })).not.toBeInTheDocument();
  });
});
