export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

export const siteName = "Matthieu Glaisner" as const;

export const navItems: readonly NavItem[] = [
  { id: "profile", label: "Profile", href: "#profile" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "languages", label: "Languages", href: "#languages" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
