import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "./Contact";
import { contactProfile } from "../content/contact";

function expectedMailtoHref(): string {
  return `mailto:${contactProfile.email}?subject=${encodeURIComponent(contactProfile.mailtoSubject)}`;
}

describe("Contact", () => {
  it("renders heading, mailto button, social links, resume, and phone", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { level: 2, name: "Shaping the future with AI?Let’s talk." })).toHaveAttribute(
      "id",
      "contact-heading",
    );
    expect(screen.getByRole("link", { name: contactProfile.email })).toHaveAttribute("href", expectedMailtoHref());

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

    expect(screen.getByRole("link", { name: "Download resume" })).toHaveAttribute(
      "href",
      contactProfile.resumePdfPath,
    );

    if (contactProfile.phone) {
      const tel = screen.getByRole("link", { name: contactProfile.phone });
      expect(tel).toHaveAttribute("href", "tel:+4917680042448");
    }
  });
});
