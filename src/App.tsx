import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const skipLinkClasses =
  "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const sectionShell = "mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8";

const App = () => {
  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a className={skipLinkClasses} href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <Hero />
      <main id="main-content" tabIndex={-1}>
        <section
          aria-labelledby="experience-heading"
          className="animate-section-in scroll-mt-20 border-b border-border bg-[color-mix(in_srgb,var(--color-secondary)_65%,transparent)]"
          id="experience"
          style={{ animationDelay: "0ms" }}
        >
          <div className={sectionShell}>
            <Experience />
          </div>
        </section>
        <section
          aria-labelledby="skills-heading"
          className="animate-section-in scroll-mt-20 border-b border-border"
          id="skills"
          style={{ animationDelay: "70ms" }}
        >
          <div className={sectionShell}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground"
                id="skills-heading"
              >
                Skills
              </h2>
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 translate-y-[-0.35rem] bg-gradient-to-r from-primary/35 to-transparent sm:ms-10 sm:block"
              />
            </div>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Skills and expertise will appear here.
            </p>
            <div aria-hidden="true" className="mt-10 flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <span
                  className="h-9 min-w-[4.5rem] rounded-full border border-dashed border-primary/35 bg-primary/[0.06]"
                  key={index}
                />
              ))}
            </div>
          </div>
        </section>
        <section
          aria-labelledby="projects-heading"
          className="animate-section-in scroll-mt-20 border-b border-border"
          id="projects"
          style={{ animationDelay: "140ms" }}
        >
          <div className={sectionShell}>
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              id="projects-heading"
            >
              Projects
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Project highlights will appear here.
            </p>
            <div aria-hidden="true" className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/90 p-6 shadow-[0_1px_0_rgb(0_0_0_/0.04)]">
                <div className="h-3 w-2/5 max-w-[12rem] rounded bg-muted/60" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded bg-muted/40" />
                  <div className="h-2 w-[92%] rounded bg-muted/35" />
                  <div className="h-2 w-[78%] rounded bg-muted/30" />
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/90 p-6 shadow-[0_1px_0_rgb(0_0_0_/0.04)]">
                <div className="h-3 w-1/2 max-w-[11rem] rounded bg-muted/60" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded bg-muted/40" />
                  <div className="h-2 w-[88%] rounded bg-muted/35" />
                  <div className="h-2 w-[70%] rounded bg-muted/30" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          aria-labelledby="contact-heading"
          className="animate-section-in scroll-mt-20"
          id="contact"
          style={{ animationDelay: "210ms" }}
        >
          <div className={sectionShell}>
            <div className="rounded-xl border border-border border-t-primary border-t-4 bg-secondary/90 p-8 shadow-[0_1px_0_rgb(0_0_0_/0.04)] sm:p-10">
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground"
                id="contact-heading"
              >
                Contact
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Contact details and form will appear here.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
