/** Public contact methods for the footer — edit values here (single source of truth). */
export type ContactProfile = Readonly<{
  email: string;
  /** Shown in mailto query string */
  mailtoSubject: string;
  linkedInUrl: string;
  /** Accessible name for the LinkedIn control */
  linkedInLabel: string;
  location: string;
  ctaMessage: string;
  /** When set, a tel: link is shown (omit or leave unset to hide the phone line). */
  phone?: string;
}>;

export const contactProfile: ContactProfile = {
  email: "matthieu.glaisner@gmail.com",
  mailtoSubject: "Hello — from your resume site",
  linkedInUrl: "https://www.linkedin.com/in/matthieu-glaisner/",
  linkedInLabel: "Open Matthieu Glaisner's LinkedIn profile in a new tab",
  location: "Munich, Germany",
  ctaMessage:
    "Open to conversations with recruiters and hiring teams about product management, discovery, and delivery. Prefer email or LinkedIn—whichever fits your process.",
};
