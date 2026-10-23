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
  /** Path under `public/` of the downloadable resume */
  resumePdfPath: string;
  /** Resume version label shown at the bottom of the footer (bump on each content update). */
  resumeVersion: string;
  resumeDate: string;
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
  resumePdfPath: "/Matthieu_Glaisner_Resume.pdf",
  resumeVersion: "v2.0",
  resumeDate: "23 October 2026",
};
