import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Languages from "./Languages";
import type { Language } from "../content/languages";

const fixtureWithCert: Language = {
  id: "fixture-es",
  name: "Spanish",
  proficiencyLabel: "Professional working proficiency",
  proficiencyRank: 2,
  certification: "DELE B2",
  context: "Used daily with suppliers.",
};

describe("Languages", () => {
  it("renders default languages with proficiency text", () => {
    render(<Languages />);

    const region = screen.getByRole("region", { name: "Languages" });
    expect(region).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "French", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "English", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "German", level: 3 })).toBeInTheDocument();

    expect(screen.getByText("Native / bilingual")).toBeInTheDocument();
    expect(screen.getAllByText("Full professional proficiency").length).toBe(2);
  });

  it("exposes a meter for relative proficiency per language", () => {
    render(<Languages />);

    const region = screen.getByRole("region", { name: "Languages" });
    const meters = within(region).getAllByRole("meter");
    expect(meters).toHaveLength(3);

    const frenchMeter = screen.getByLabelText(/Proficiency for French:/i);
    expect(frenchMeter).toHaveAttribute("aria-valuenow", "3");
    expect(frenchMeter).toHaveAttribute("aria-valuemax", "3");
  });

  it("shows optional certification and context when provided", () => {
    render(<Languages languages={[fixtureWithCert]} />);

    expect(screen.getByText("DELE B2")).toBeInTheDocument();
    expect(screen.getByText(/Used daily with suppliers/i)).toBeInTheDocument();
  });
});
