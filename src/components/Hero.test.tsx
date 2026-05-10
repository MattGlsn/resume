import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";
import { heroProfile } from "../content/hero";

describe("Hero", () => {
  it("renders identity, summary, and CTAs", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: heroProfile.fullName }),
    ).toBeInTheDocument();
    expect(screen.getByText(heroProfile.professionalTitle)).toBeInTheDocument();
    expect(screen.getByText(heroProfile.summary)).toBeInTheDocument();

    const contact = screen.getByRole("link", { name: "Contact" });
    const projects = screen.getByRole("link", { name: "View projects" });
    const resume = screen.getByRole("link", { name: "Download resume" });

    expect(contact).toHaveAttribute("href", "#contact");
    expect(projects).toHaveAttribute("href", "#projects");
    expect(resume).toHaveAttribute("href", "/resume.pdf");
  });
});
