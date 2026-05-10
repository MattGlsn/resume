import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const skipLinkClasses =
  "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

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
          className="scroll-mt-20 border-b border-border"
          id="experience"
        >
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              id="experience-heading"
            >
              Experience
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Work history will appear here.
            </p>
          </div>
        </section>
        <section
          aria-labelledby="skills-heading"
          className="scroll-mt-20 border-b border-border"
          id="skills"
        >
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              id="skills-heading"
            >
              Skills
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Skills and expertise will appear here.
            </p>
          </div>
        </section>
        <section
          aria-labelledby="projects-heading"
          className="scroll-mt-20 border-b border-border"
          id="projects"
        >
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              id="projects-heading"
            >
              Projects
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Project highlights will appear here.
            </p>
          </div>
        </section>
        <section
          aria-labelledby="contact-heading"
          className="scroll-mt-20"
          id="contact"
        >
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
        </section>
      </main>
    </div>
  );
};

export default App;
