import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { contactProfile } from "../content/contact";
import { publicUrl } from "../utils/publicUrl";
import { eyebrow } from "./styles";

const inkFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

/** Size and type shared by every contact button, so the email button and the row below match. */
const buttonBase = `inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] text-[15px] font-semibold no-underline ${inkFocusRing}`;

const outlineButtonClasses = `${buttonBase} border border-white/25 text-white transition-colors duration-200 hover:bg-white/10`;

/** Icon beside a label */
const labelIcon = "size-4";
/** Icon alone in a square button */
const soloIcon = "size-[18px]";

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

  return (
    <div className="ink-glow-bottom-left flex flex-col gap-9 rounded-2xl bg-ink px-6 py-12 text-white sm:px-14 sm:py-16">
      <div className="flex flex-col gap-3.5">
        <span className={`${eyebrow} text-ink-accent`}>04 · Contact</span>
        <h2
          className="text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[64px]"
          id="contact-heading"
        >
          Shaping the future with AI?
          <br />
          <span className="text-primary">Let’s talk.</span>
        </h2>
      </div>

      <a
        className={`${buttonBase} max-w-full flex-wrap self-start bg-white px-5 py-2 [overflow-wrap:anywhere] text-foreground transition-transform duration-200 hover:-translate-y-px`}
        href={mailtoHref}
      >
        {contactProfile.email}
        <FiArrowUpRight aria-hidden className={labelIcon} strokeWidth={2.2} />
      </a>

      <div className="flex flex-wrap gap-2.5">
        <a
          aria-label={contactProfile.linkedInLabel}
          className={`${outlineButtonClasses} size-12`}
          href={contactProfile.linkedInUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <FiLinkedin aria-hidden className={soloIcon} strokeWidth={2} />
        </a>
        <a
          aria-label={contactProfile.githubLabel}
          className={`${outlineButtonClasses} size-12`}
          href={contactProfile.githubUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="GitHub"
        >
          <FiGithub aria-hidden className={soloIcon} strokeWidth={2} />
        </a>
        <a
          className={`${outlineButtonClasses} px-5`}
          download
          href={publicUrl(contactProfile.resumePdfPath)}
        >
          <FiDownload aria-hidden className={labelIcon} strokeWidth={2.2} />
          Download resume
        </a>
        {phone ? (
          <a
            className={`inline-flex min-h-12 items-center rounded-[10px] px-2 text-[15px] text-ink-muted no-underline hover:text-white ${inkFocusRing}`}
            href={toTelHref(phone)}
          >
            {phone}
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default Contact;
