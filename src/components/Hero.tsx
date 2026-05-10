import { heroProfile } from "../content/hero";

const primaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const secondaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg border border-secondary-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const tertiaryLinkClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-accent-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const Hero = () => {
  return (
    <header
      aria-labelledby="hero-heading"
      className="scroll-mt-20 border-b border-border bg-gradient-to-b from-hero-from to-hero-to"
      id="profile"
    >
      <div className="mx-auto flex min-h-[min(100dvh,56rem)] max-w-5xl flex-col justify-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-accent-foreground">
            {heroProfile.professionalTitle}
          </p>
          <h1
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            id="hero-heading"
          >
            {heroProfile.fullName}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {heroProfile.summary}
          </p>
        </div>
        <nav
          aria-label="Primary actions"
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a className={primaryButtonClasses} href="#contact">
            Contact
          </a>
          <a className={secondaryButtonClasses} href="#projects">
            View projects
          </a>
          <a className={tertiaryLinkClasses} href="/resume.pdf" download>
            Download resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Hero;
