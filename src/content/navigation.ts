export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

/** Links in the top bar; the contact link is drawn as the call to action. */
export const navItems: readonly NavItem[] = [
  { id: "pm", label: "Product role", href: "#pm" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "skills", label: "Skills", href: "#skills" },
];

export const contactNavItem: NavItem = { id: "contact", label: "Let’s talk", href: "#contact" };
