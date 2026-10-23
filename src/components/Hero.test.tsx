import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";
import { contactProfile } from "../content/contact";
import { heroProfile } from "../content/hero";

describe("Hero", () => {
  it("renders the headline, availability, and CTAs", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: `${heroProfile.professionalTitle}.${heroProfile.tagline}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(heroProfile.availability)).toBeInTheDocument();
    expect(screen.getByText(heroProfile.summary)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      `mailto:${contactProfile.email}?subject=${encodeURIComponent(contactProfile.mailtoSubject)}`,
    );
    expect(screen.getByRole("link", { name: "Resume PDF" })).toHaveAttribute(
      "href",
      contactProfile.resumePdfPath,
    );
  });

  it("links the current role card to the product section", () => {
    render(<Hero />);

    const card = screen.getByRole("link", { name: /Product Manager at Humanetics/ });
    expect(card).toHaveAttribute("href", "#pm");
    expect(card).toHaveTextContent(/Now · Jan 2026/i);
  });

  it("lists languages with their level badges", () => {
    render(<Hero />);

    const list = screen.getByRole("list", { name: "Languages" });
    const items = within(list).getAllByRole("listitem");
    expect(items.map((li) => li.querySelector("span")?.textContent)).toEqual(["French", "English", "German"]);
    expect(items[0]).toHaveTextContent("C2 · native");
    expect(items[1]).toHaveTextContent("C1/B2");
    expect(items[2]).toHaveTextContent("C1");
    expect(items[2]).not.toHaveTextContent("C1/B2");
  });
});
