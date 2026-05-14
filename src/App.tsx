import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Languages from "./components/Languages";
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
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground"
                id="skills-heading"
              >
                Skills
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Grouped by practice area. Bars compare skills within each category (longest in the group fills
                the track).
              </p>
              <Skills />
            </div>
          </section>
          <section
            aria-labelledby="languages-heading"
            className="animate-section-in scroll-mt-20 border-b border-border bg-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]"
            id="languages"
            style={{ animationDelay: "140ms" }}
          >
            <div className={sectionShell}>
              <h2
                className="text-2xl font-semibold tracking-tight text-foreground"
                id="languages-heading"
              >
                Languages
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Levels use the European CEFR scale (A1–C2). The bar is a coarse visual along that scale, not an
                exam score.
              </p>
              <Languages />
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
          <Contact />
        </div>
      </footer>
    </div>
  );
};

export default App;
