import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductRole from "./ProductRole";
import { productFocusAreas, productKeySkills } from "../content/productRole";

describe("ProductRole", () => {
  it("shows the first area by default with its item count", () => {
    render(<ProductRole />);

    expect(screen.getByRole("heading", { level: 2, name: "One owner, from vision to delivery." })).toBeInTheDocument();

    const first = productFocusAreas[0];
    const button = screen.getByRole("button", { name: new RegExp(`^${first.label}`) });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveTextContent(String(first.items.length).padStart(2, "0"));
    expect(screen.getByText(first.items[0])).toBeInTheDocument();
  });

  it("switches the visible items when another area is picked", () => {
    render(<ProductRole />);

    const [first, second] = productFocusAreas;
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${second.label}`) }));

    expect(screen.getByRole("button", { name: new RegExp(`^${second.label}`) })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: second.label })).toBeInTheDocument();
    expect(screen.getByText(second.items[0])).toBeInTheDocument();
    expect(screen.queryByText(first.items[0])).not.toBeInTheDocument();
  });

  it("lists tools for an area that has them", () => {
    render(
      <ProductRole areas={[{ id: "ai", label: "AI", items: ["Prototype things"], tools: ["Claude", "GitLab"] }]} />,
    );

    expect(screen.getByRole("list", { name: "Tools" })).toHaveTextContent("ClaudeGitLab");
  });

  it("renders the key skill tags", () => {
    render(<ProductRole />);

    const tags = screen.getByRole("list", { name: "Key skills" });
    expect(tags.children).toHaveLength(productKeySkills.length);
  });
});
