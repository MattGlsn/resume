import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";
import { navItems, siteName } from "../content/navigation";

describe("Navbar", () => {
  it("renders the brand link to #profile", () => {
    render(<Navbar />);

    const brand = screen.getByRole("link", { name: siteName });
    expect(brand).toHaveAttribute("href", "#profile");
  });

  it("renders one desktop link per nav item with correct hrefs", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const links = within(nav).getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThanOrEqual(1);
      for (const link of links) {
        expect(link).toHaveAttribute("href", item.href);
      }
    }
  });

  it("toggles the mobile menu and closes on Escape", () => {
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "primary-nav");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Open menu");
  });

  it("closes the mobile menu when a link is activated", () => {
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const contactLinks = screen.getAllByRole("link", { name: "Contact" });
    fireEvent.click(contactLinks[contactLinks.length - 1]);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
