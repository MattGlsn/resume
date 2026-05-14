import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "./Contact";
import { contactProfile } from "../content/contact";

function expectedMailtoHref(): string {
  return `mailto:${contactProfile.email}?subject=${encodeURIComponent(contactProfile.mailtoSubject)}`;
}

describe("Contact", () => {
  it("renders heading, CTA, mailto controls, LinkedIn, and location", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { level: 2, name: "Contact" })).toBeInTheDocument();
    expect(screen.getByText(contactProfile.ctaMessage)).toBeInTheDocument();

    const href = expectedMailtoHref();
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute("href", href);
    expect(screen.getByRole("link", { name: contactProfile.email })).toHaveAttribute("href", href);

    const linkedIn = screen.getByRole("link", { name: contactProfile.linkedInLabel });
    expect(linkedIn).toHaveAttribute("href", contactProfile.linkedInUrl);
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );

    expect(screen.getByText(contactProfile.location)).toBeInTheDocument();
  });

  it("does not render phone row when phone is omitted", () => {
    if (contactProfile.phone) {
      return;
    }
    render(<Contact />);
    expect(screen.queryByText("Phone")).not.toBeInTheDocument();
  });
});
