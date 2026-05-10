import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Experience from "./Experience";
import type { ExperienceRole } from "../content/experience";

const minimalRole = (
  overrides: Partial<ExperienceRole> & Pick<ExperienceRole, "id" | "title" | "company">,
): ExperienceRole => ({
  location: "Remote",
  startDate: "2024-01",
  endDate: null,
  responsibilities: ["Did things"],
  achievements: ["Shipped outcomes"],
  technologies: ["TypeScript"],
  ...overrides,
});

describe("Experience", () => {
  it("lists default roles in reverse-chronological order", () => {
    render(<Experience />);

    expect(screen.getByRole("heading", { level: 2, name: "Experience" })).toHaveAttribute(
      "id",
      "experience-heading",
    );

    const titles = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(titles).toEqual([
      "Product Manager",
      "Application Engineer — Human Factors & Ergonomics",
      "Technical Designer",
      "CAD Designer",
      "CAD Design Intern",
    ]);
  });

  it("stepper exposes one role panel at a time with Humanetics-era technologies", () => {
    render(<Experience />);

    expect(screen.getByText("Cursor AI")).toBeInTheDocument();
    expect(screen.getByText("GitLab")).toBeInTheDocument();
    expect(screen.queryByText("RAMSIS")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.queryByText("Cursor AI")).not.toBeInTheDocument();
    expect(screen.getByText("RAMSIS")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.queryByText("RAMSIS")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Skills", level: 4 })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByText("RAMSIS")).toBeInTheDocument();
  });

  it("links the company name when companyUrl is provided", () => {
    render(
      <Experience
        roles={[
          minimalRole({
            id: "acme",
            title: "PM",
            company: "Acme Corp",
            companyUrl: "https://acme.example",
            startDate: "2023-01",
            endDate: null,
            responsibilities: [],
            achievements: [],
            technologies: [],
          }),
        ]}
      />,
    );

    const company = screen.getByRole("link", { name: "Acme Corp" });
    expect(company).toHaveAttribute("href", "https://acme.example");
  });
});
