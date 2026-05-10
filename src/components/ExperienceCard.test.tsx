import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExperienceCard } from "./ExperienceCard";
import type { ExperienceRole } from "../content/experience";

const baseRole = (
  overrides: Partial<ExperienceRole> & Pick<ExperienceRole, "id" | "title" | "company">,
): ExperienceRole => ({
  location: "Remote",
  startDate: "2024-01",
  endDate: null,
  companyLogoSrc: "/logos/humanetics.png",
  responsibilities: ["Did things"],
  achievements: ["Shipped outcomes"],
  technologies: ["TypeScript"],
  ...overrides,
});

function renderCard(
  overrides: Parameters<typeof baseRole>[0],
  cardProps: Partial<{ isExpanded: boolean; isLast: boolean; onToggle: () => void }> = {},
) {
  const role = baseRole(overrides);
  const onToggle = cardProps.onToggle ?? vi.fn();
  render(
    <ul>
      <ExperienceCard
        isExpanded={cardProps.isExpanded ?? true}
        isLast={cardProps.isLast ?? false}
        onToggle={onToggle}
        role={role}
      />
    </ul>,
  );
  return { role, onToggle };
}

describe("ExperienceCard", () => {
  it("renders title, company, employment range, and responsibilities when expanded", () => {
    renderCard({
      id: "pm-acme",
      title: "Product Manager",
      company: "Acme Corp",
      startDate: "2023-04",
      endDate: null,
      responsibilities: ["Lead discovery", "Coordinate launch"],
    });

    expect(screen.getByRole("heading", { level: 3, name: "Product Manager" })).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText(/Apr 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Present/)).toBeInTheDocument();
    expect(screen.getByText("Lead discovery")).toBeInTheDocument();
    expect(screen.getByText("Coordinate launch")).toBeInTheDocument();
  });

  it("calls onToggle once when the summary button is clicked", () => {
    const onToggle = vi.fn();
    renderCard(
      { id: "click-target", title: "PM", company: "Co" },
      { onToggle },
    );

    fireEvent.click(screen.getByRole("button", { name: /^PM/ }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("renders the company name as a link when companyUrl is provided", () => {
    renderCard({
      id: "with-url",
      title: "PM",
      company: "Acme Corp",
      companyUrl: "https://acme.example",
    });

    const link = screen.getByRole("link", { name: "Acme Corp" });
    expect(link).toHaveAttribute("href", "https://acme.example");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders the company name as plain text when companyUrl is omitted", () => {
    renderCard({ id: "no-url", title: "PM", company: "Acme Corp" });

    expect(screen.queryByRole("link", { name: "Acme Corp" })).not.toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders the related-links nav when links are provided", () => {
    renderCard({
      id: "with-links",
      title: "PM",
      company: "Acme Corp",
      links: [
        { label: "Case study", href: "https://acme.example/case" },
        { label: "Talk", href: "https://acme.example/talk" },
      ],
    });

    const nav = screen.getByRole("navigation", { name: /Related links for Acme Corp/ });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Case study" })).toHaveAttribute(
      "href",
      "https://acme.example/case",
    );
    expect(screen.getByRole("link", { name: "Talk" })).toHaveAttribute(
      "href",
      "https://acme.example/talk",
    );
  });

  it("omits the related-links nav when links are absent or empty", () => {
    renderCard({ id: "no-links", title: "PM", company: "Acme Corp", links: [] });

    expect(screen.queryByRole("navigation", { name: /Related links/ })).not.toBeInTheDocument();
  });

  it("hides the expanded panel content when collapsed", () => {
    renderCard(
      {
        id: "collapsed",
        title: "PM",
        company: "Acme Corp",
        responsibilities: ["Hidden responsibility"],
      },
      { isExpanded: false },
    );

    expect(screen.queryByText("Hidden responsibility")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Responsibilities" })).not.toBeInTheDocument();
  });

  it("marks the last card with the 'Last role' caption only when isLast is true", () => {
    const { unmount } = render(
      <ul>
        <ExperienceCard
          isExpanded
          isLast
          onToggle={() => {}}
          role={baseRole({ id: "last", title: "Intern", company: "Co" })}
        />
      </ul>,
    );

    expect(screen.getByText("Last role")).toBeInTheDocument();
    unmount();

    render(
      <ul>
        <ExperienceCard
          isExpanded
          isLast={false}
          onToggle={() => {}}
          role={baseRole({ id: "not-last", title: "Intern", company: "Co" })}
        />
      </ul>,
    );

    expect(screen.queryByText("Last role")).not.toBeInTheDocument();
  });
});
