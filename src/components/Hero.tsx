import { heroProfile } from "../content/hero";

const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

const secondaryButtonClasses =
  "inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400";

const tertiaryLinkClasses =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-emerald-800 underline-offset-4 transition hover:text-emerald-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

const Hero = () => {
  return (
    <header
      aria-labelledby="hero-heading"
      className="border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="mx-auto flex min-h-[min(100dvh,56rem)] max-w-5xl flex-col justify-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-800">
            {heroProfile.professionalTitle}
          </p>
          <h1
            className="text-balance text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl"
            id="hero-heading"
          >
            {heroProfile.fullName}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-neutral-700 sm:text-xl">
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
