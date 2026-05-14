import { contactProfile } from "../content/contact";

const primaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-primary-hover hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))]";

const secondaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg border border-background/35 bg-background/10 px-5 py-2.5 text-sm font-semibold text-background shadow-sm backdrop-blur-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-background/18 hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))]";

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
      <div className="space-y-3">
        <h2
          className="text-xl font-semibold tracking-tight sm:text-2xl"
          id="contact-heading"
        >
          Contact
        </h2>
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-background/80 sm:text-base">
          {contactProfile.ctaMessage}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <a className={primaryButtonClasses} href={mailtoHref}>
          Email me
        </a>
        <a
          aria-label={contactProfile.linkedInLabel}
          className={secondaryButtonClasses}
          href={contactProfile.linkedInUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
      </div>

      <p className="text-sm text-background/75 sm:text-base">
        <span className="font-medium text-background/90">Email: </span>
        <a
          className="rounded-sm font-medium text-background underline decoration-background/50 underline-offset-4 transition-colors hover:decoration-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))]"
          href={mailtoHref}
        >
          {contactProfile.email}
        </a>
      </p>

      <dl className="grid max-w-lg gap-x-6 gap-y-3 text-sm text-background/85 sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:text-base">
        <dt className="font-medium text-background/90">Location</dt>
        <dd>{contactProfile.location}</dd>
        {showPhone && phone ? (
          <>
            <dt className="font-medium text-background/90">Phone</dt>
            <dd>
              <a
                className="rounded-sm font-medium text-background underline decoration-background/50 underline-offset-4 transition-colors hover:decoration-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))]"
                href={toTelHref(phone)}
              >
                {phone}
              </a>
            </dd>
          </>
        ) : null}
      </dl>
    </div>
  );
};

export default Contact;
