import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import ProductRole from "./components/ProductRole";
import Skills from "./components/Skills";
import TopNav from "./components/TopNav";
import { pageColumn } from "./components/styles";
import { contactProfile } from "./content/contact";
import { heroProfile } from "./content/hero";

const skipLinkClasses =
  "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

// `scroll-mt` keeps anchored sections clear of the sticky top bar.
const sectionShell = `${pageColumn} animate-section-in scroll-mt-6 pt-16 pb-6 sm:scroll-mt-24 sm:pt-[72px]`;

/**
 * Large soft grey glows behind the page. Drawn as radial gradients: a `blur()` filter this wide
 * is too slow to paint while scrolling.
 */
const BackdropGlow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    <div className="backdrop-glow absolute -top-[400px] left-[calc(15%-200px)] size-[1120px] [--glow-alpha:0.14]" />
    <div className="backdrop-glow absolute top-[calc(42%-200px)] -right-[460px] size-[1080px] [--glow-alpha:0.11]" />
    <div className="backdrop-glow absolute -bottom-[440px] left-[calc(5%-200px)] size-[1120px] [--glow-alpha:0.12]" />
  </div>
);

const App = () => {
  return (
    // `overflow-clip`, not `overflow-hidden`: hidden makes a scroll container, which stops the top bar from sticking.
    <div className="relative isolate min-h-dvh overflow-clip bg-background px-4 pt-4 font-sans text-foreground antialiased sm:px-5 sm:pt-5">
      <a className={skipLinkClasses} href="#main-content">
        Skip to main content
      </a>
      <BackdropGlow />
      <TopNav />
      <Hero />
      <main id="main-content" tabIndex={-1}>
        <section aria-labelledby="pm-heading" className={sectionShell} id="pm">
          <ProductRole />
        </section>
        <section aria-labelledby="journey-heading" className={sectionShell} id="journey" style={{ animationDelay: "70ms" }}>
          <Journey />
        </section>
        <section aria-labelledby="skills-heading" className={sectionShell} id="skills" style={{ animationDelay: "140ms" }}>
          <Skills />
        </section>
        <section aria-labelledby="contact-heading" className={sectionShell} id="contact" style={{ animationDelay: "210ms" }}>
          <Contact />
        </section>
      </main>
      <footer
        className={`${pageColumn} flex flex-wrap justify-between gap-3 pt-6 pb-8 text-sm text-[#5b606a]`}
      >
        <span>
          {new Date().getFullYear()} {heroProfile.fullName} · {contactProfile.location}
        </span>
        <span className="font-mono text-[13px]">
          Resume {contactProfile.resumeVersion} · {contactProfile.resumeDate}
        </span>
      </footer>
    </div>
  );
};

export default App;
