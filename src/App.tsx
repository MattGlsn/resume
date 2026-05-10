import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <Hero />
      <main>
        <section
          aria-labelledby="projects-heading"
          className="scroll-mt-20 border-b border-neutral-200"
          id="projects"
        >
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2
              className="text-2xl font-semibold tracking-tight text-neutral-950"
              id="projects-heading"
            >
              Projects
            </h2>
            <p className="mt-3 max-w-2xl text-neutral-600">
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
              className="text-2xl font-semibold tracking-tight text-neutral-950"
              id="contact-heading"
            >
              Contact
            </h2>
            <p className="mt-3 max-w-2xl text-neutral-600">
              Contact details and form will appear here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
