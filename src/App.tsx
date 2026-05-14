import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";

const skipLinkClasses =
  "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const sectionShell = "mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8";

const footerShell =
  "mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16";

const App = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
      <a className={skipLinkClasses} href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <div className="flex flex-1 flex-col">
        <Hero />
        <main className="flex flex-1 flex-col" id="main-content" tabIndex={-1}>
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
              <Skills />
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
        </main>
      </div>
      <footer
        aria-labelledby="contact-heading"
        className="animate-section-in mt-auto scroll-mt-20 bg-[color-mix(in_srgb,var(--color-foreground)_88%,var(--color-hero-from)))] text-background shadow-[inset_0_1px_0_rgb(255_252_248_/0.08)]"
        id="contact"
        style={{ animationDelay: "210ms" }}
      >
        <div className={footerShell}>
          <h2
            className="text-xl font-semibold tracking-tight sm:text-2xl"
            id="contact-heading"
          >
            Contact
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-background/80 sm:text-base">
            Contact details and form will appear here.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
