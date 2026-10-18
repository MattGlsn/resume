import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";
import { contactProfile } from "../content/contact";
import { heroProfile } from "../content/hero";

describe("Hero", () => {
  it("renders identity, summary, and CTAs", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: heroProfile.fullName }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroProfile.professionalTitle, {
        selector: "p.text-sm.font-medium.uppercase",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Toulouse, France/)).toBeInTheDocument();
    expect(screen.getByText(/intelligent systems/)).toBeInTheDocument();

    const resume = screen.getByRole("link", { name: "Download resume" });
    expect(resume).toHaveAttribute("href", "/Matthieu_Glaisner_Resume.pdf");
    const linkedIn = screen.getByRole("link", { name: contactProfile.linkedInLabel });
    expect(linkedIn).toHaveAttribute("href", contactProfile.linkedInUrl);
    const github = screen.getByRole("link", { name: contactProfile.githubLabel });
    expect(github).toHaveAttribute("href", contactProfile.githubUrl);
    const scrollToExperience = screen.getByRole("link", { name: "Scroll to learn more about me" });
    expect(scrollToExperience).toHaveAttribute("href", "#experience");
  });
});
