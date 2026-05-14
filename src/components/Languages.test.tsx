import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Languages from "./Languages";
import type { Language } from "../content/languages";

const fixtureWithCert: Language = {
  id: "fixture-es",
  name: "Spanish",
  cefrLevel: "B2",
  certification: "DELE B2",
  context: "Used daily with suppliers.",
};

describe("Languages", () => {
  it("renders default languages with CEFR levels", () => {
    render(<Languages />);

    const region = screen.getByRole("region", { name: "Languages" });
    expect(region).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "French", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "English", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "German", level: 3 })).toBeInTheDocument();

    expect(screen.getByText("Native / bilingual")).toBeInTheDocument();
    expect(screen.getAllByText("Full Professional Proficiency").length).toBe(2);
    expect(screen.getAllByText("C1").length).toBe(2);
    expect(screen.getByText("C2")).toBeInTheDocument();

    const englishMeter = screen.getByRole("meter", {
      name: /Proficiency for English:.*Full Professional Proficiency.*Effective operational proficiency/i,
    });
    expect(englishMeter).toBeInTheDocument();
  });

  it("exposes a meter aligned to the six-step CEFR scale", () => {
    render(<Languages />);

    const region = screen.getByRole("region", { name: "Languages" });
    const meters = within(region).getAllByRole("meter");
    expect(meters).toHaveLength(3);

    const frenchMeter = screen.getByLabelText(/Proficiency for French:.*Native \/ bilingual.*CEFR C2/i);
    expect(frenchMeter).toHaveAttribute("aria-valuenow", "6");
    expect(frenchMeter).toHaveAttribute("aria-valuemax", "6");
  });

  it("shows optional certification and context when provided", () => {
    render(<Languages languages={[fixtureWithCert]} />);

    expect(screen.getByText("DELE B2")).toBeInTheDocument();
    expect(screen.getByText(/Used daily with suppliers/i)).toBeInTheDocument();
  });
});
