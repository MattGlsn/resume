/** Public contact methods for the footer — edit values here (single source of truth). */
export type ContactProfile = Readonly<{
  email: string;
  /** Shown in mailto query string */
  mailtoSubject: string;
  linkedInUrl: string;
  /** Accessible name for the LinkedIn control */
  linkedInLabel: string;
  githubUrl: string;
  /** Accessible name for the GitHub control */
  githubLabel: string;
  location: string;
  /** When set, a tel: link is shown (omit or leave unset to hide the phone line). */
  phone?: string;
  /** Resume version label shown at the bottom of the footer (bump on each content update). */
  resumeVersion: string;
}>;

export const contactProfile: ContactProfile = {
  email: "matthieu.glaisner@live.fr",
  mailtoSubject: "Hello — from your resume site",
  linkedInUrl: "https://www.linkedin.com/in/matthieu-glaisner/",
  linkedInLabel: "Open Matthieu Glaisner's LinkedIn profile in a new tab",
  githubUrl: "https://github.com/MattGlsn",
  githubLabel: "Open Matthieu Glaisner's GitHub profile in a new tab",
  location: "Munich, Germany",
  phone: "+49 176 80042448",
  resumeVersion: "v1.4",
};
