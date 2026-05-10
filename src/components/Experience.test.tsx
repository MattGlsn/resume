import { render, screen } from "@testing-library/react";
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

  it("highlights technologies from Confluence-sourced Humanetics roles", () => {
    render(<Experience />);

    expect(screen.getByText("Cursor AI")).toBeInTheDocument();
    expect(screen.getByText("GitLab")).toBeInTheDocument();
    expect(screen.getByText("RAMSIS")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Technologies", level: 4 })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: "Skills", level: 4 })).toHaveLength(2);
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
