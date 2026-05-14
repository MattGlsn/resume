import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "./Contact";
import { contactProfile } from "../content/contact";

function expectedMailtoHref(): string {
  return `mailto:${contactProfile.email}?subject=${encodeURIComponent(contactProfile.mailtoSubject)}`;
}

describe("Contact", () => {
  it("renders heading, mailto controls, social links, phone, and location", () => {
    render(<Contact />);

    const href = expectedMailtoHref();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: contactProfile.email })).toHaveAttribute("href", href);

    const linkedIn = screen.getByRole("link", { name: contactProfile.linkedInLabel });
    expect(linkedIn).toHaveAttribute("href", contactProfile.linkedInUrl);
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );

    const github = screen.getByRole("link", { name: contactProfile.githubLabel });
    expect(github).toHaveAttribute("href", contactProfile.githubUrl);
    expect(github).toHaveAttribute("target", "_blank");
    expect(github.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );

    expect(screen.getByText(contactProfile.location)).toBeInTheDocument();

    if (contactProfile.phone) {
      expect(screen.getByText("Phone")).toBeInTheDocument();
      const tel = screen.getByRole("link", { name: contactProfile.phone });
      expect(tel).toHaveAttribute("href", "tel:+4917680042448");
    }
  });
});
