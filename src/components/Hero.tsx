import { heroProfile } from "../content/hero";

const primaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-primary-hover hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const secondaryButtonClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg border border-secondary-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-background hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const tertiaryLinkClasses =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-accent-foreground underline-offset-4 transition-[color,text-decoration-color,transform] duration-200 ease-out hover:-translate-y-px hover:underline active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const Hero = () => {
  return (
    <header
      aria-labelledby="hero-heading"
      className="hero-editorial-surface scroll-mt-20 border-b border-border"
      id="profile"
    >
      <div className="mx-auto flex min-h-[min(100dvh,56rem)] max-w-5xl flex-col justify-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="hero-stagger-root grid items-start gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          <div className="flex gap-6 lg:col-span-5">
            <div
              aria-hidden="true"
              className="hero-accent-bar mt-1 hidden w-0.5 shrink-0 rounded-full bg-primary/35 sm:block sm:min-h-[4.5rem]"
            />
            <div className="max-w-md space-y-4 lg:max-w-none">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground">
                {heroProfile.professionalTitle}
              </p>
              <h1
                className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
                id="hero-heading"
              >
                {heroProfile.fullName}
              </h1>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-7 lg:pt-2">
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl lg:max-w-none">
              {heroProfile.summary}
            </p>
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
        </div>
      </div>
    </header>
  );
};

export default Hero;
