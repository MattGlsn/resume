import { FiGithub, FiLinkedin } from "react-icons/fi";
import { contactProfile } from "../content/contact";

const iconSocialButtonClasses =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-background/35 bg-background/10 text-background shadow-sm backdrop-blur-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-background/18 hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))]";

const footerLinkClasses =
  "rounded-sm font-medium text-background underline decoration-background/50 underline-offset-4 transition-colors hover:decoration-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))]";

function buildMailtoHref(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/** Digits and leading + only, for `tel:` hrefs */
function toTelHref(display: string): string {
  const normalized = display.replace(/[^\d+]/g, "");
  return `tel:${normalized}`;
}

const Contact = () => {
  const mailtoHref = buildMailtoHref(contactProfile.email, contactProfile.mailtoSubject);
  const phone = contactProfile.phone?.trim();
  const showPhone = Boolean(phone);

  return (
    <div className="space-y-8">
      <h2
        className="text-xl font-semibold tracking-tight sm:text-2xl"
        id="contact-heading"
      >
        Contact
      </h2>

      <div className="flex w-full flex-col flex-nowrap gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <dl className="order-1 grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 text-sm text-background/85 sm:order-none sm:max-w-lg sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:gap-x-6 sm:text-base">
          <dt className="shrink-0 font-medium text-background/90">Email</dt>
          <dd className="min-w-0 text-end sm:text-start">
            <a className={footerLinkClasses} href={mailtoHref}>
              {contactProfile.email}
            </a>
          </dd>
          {showPhone && phone ? (
            <>
              <dt className="shrink-0 font-medium text-background/90">Phone</dt>
              <dd className="min-w-0 text-end sm:text-start">
                <a className={footerLinkClasses} href={toTelHref(phone)}>
                  {phone}
                </a>
              </dd>
            </>
          ) : null}
          <dt className="shrink-0 font-medium text-background/90">Location</dt>
          <dd className="min-w-0 text-end sm:text-start">{contactProfile.location}</dd>
        </dl>

        <div className="order-2 flex w-full shrink-0 flex-wrap items-center justify-center gap-3 sm:order-none sm:w-auto sm:justify-end">
          <a
            aria-label={contactProfile.linkedInLabel}
            className={iconSocialButtonClasses}
            href={contactProfile.linkedInUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FiLinkedin aria-hidden className="h-6 w-6" strokeWidth={1.75} />
          </a>
          <a
            aria-label={contactProfile.githubLabel}
            className={iconSocialButtonClasses}
            href={contactProfile.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FiGithub aria-hidden className="h-6 w-6" strokeWidth={1.75} />
          </a>
        </div>
      </div>

      <p className="border-t border-background/15 pt-6 text-center text-xs text-background/70 sm:text-end">
        Resume {contactProfile.resumeVersion}
      </p>
    </div>
  );
};

export default Contact;
