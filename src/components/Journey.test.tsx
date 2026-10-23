import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Journey from "./Journey";
import type { ExperienceRole } from "../content/experience";

const role = (overrides: Partial<ExperienceRole> & Pick<ExperienceRole, "id" | "title">): ExperienceRole => ({
  company: "Acme Corp",
  location: "Paris, France",
  startDate: "2019-03",
  endDate: "2021-06",
  headline: "Designed the things.",
  highlights: ["Led the redesign"],
  roleOverview: "A longer summary of the role.",
  responsibilities: ["Shipped the thing", "Wrote the docs"],
  achievements: [],
  technologies: ["CATIA V5", "Creo"],
  ...overrides,
});

describe("Journey", () => {
  it("lists every role newest first, including the current one", () => {
    render(<Journey />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    const expected = [
      "Product Manager",
      "Application Engineer, Human Factors & Ergonomics",
      "Technical Designer",
      "CAD Designer",
      "CAD Design Intern",
    ];
    expect(headings).toHaveLength(expected.length);
    headings.forEach((heading, i) => expect(within(heading).getByText(expected[i])).toBeInTheDocument());
    expect(headings[0]).toHaveTextContent("2026 – Present");
  });

  it("shows the year range, headline, company and location in each closed row", () => {
    render(
      <Journey
        roles={[role({ id: "a", title: "Designer" }), role({ id: "b", title: "Intern", startDate: "2017-04", endDate: "2017-12" })]}
      />,
    );

    expect(screen.getByText("2019 – 2021")).toBeInTheDocument();
    expect(screen.getByText("2017")).toBeInTheDocument();
    expect(screen.getAllByText("Designed the things.")).toHaveLength(2);
    expect(screen.getAllByText("Acme Corp · Paris, France")).toHaveLength(2);
  });

  it("opens a role on its highlights and tools, with the full responsibilities behind a toggle", () => {
    render(<Journey roles={[role({ id: "a", title: "Designer" })]} />);

    const button = screen.getByRole("button", { name: /Designer/ });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Led the redesign")).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls", "journey-panel-a");
    expect(within(screen.getByRole("list", { name: "Highlights" })).getByText("Led the redesign")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Tools" })).toHaveTextContent("CATIA V5Creo");
    expect(screen.queryByText("Shipped the thing")).not.toBeInTheDocument();

    const more = screen.getByRole("button", { name: /Show all 2 responsibilities/ });
    fireEvent.click(more);
    expect(more).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("A longer summary of the role.")).toBeInTheDocument();
    expect(screen.getByText("Shipped the thing")).toBeInTheDocument();
    expect(screen.getByText("Wrote the docs")).toBeInTheDocument();
  });

  it("rounds a header's top corners only while the row above is open", () => {
    render(<Journey roles={[role({ id: "a", title: "Designer" }), role({ id: "b", title: "Intern" })]} />);

    const upper = screen.getByRole("button", { name: /Designer/ });
    const lower = screen.getByRole("button", { name: /Intern/ });
    expect(lower.className).not.toMatch(/rounded-t-2xl/);

    fireEvent.click(upper);
    expect(upper.className).toMatch(/rounded-b-2xl/);
    expect(lower.className).toMatch(/rounded-t-2xl/);
    expect(lower.className).not.toMatch(/rounded-b-2xl/);

    fireEvent.click(upper);
    expect(lower.className).not.toMatch(/rounded-t-2xl/);
  });

  it("closes an open role on a second click", async () => {
    render(<Journey roles={[role({ id: "a", title: "Designer" })]} />);

    const button = screen.getByRole("button", { name: /Designer/ });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(screen.queryByText("Led the redesign")).not.toBeInTheDocument());
  });
});
