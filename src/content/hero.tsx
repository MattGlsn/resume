import type { ReactNode } from "react";

export const heroProfile = {
  fullName: "Matthieu Glaisner",
  professionalTitle: "Product Manager",
} as const;

function highlight(children: ReactNode) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

/** Inline hero bio — edit wording here; use `highlight(…)` for emphasized phrases. */
export function HeroSummary() {
  return (
    <>
      {highlight("Product Manager")} with a background in{" "}
      {highlight("engineering, ergonomics, and technical design")}, focused on{" "}
      {highlight("AI-driven product development")} in the {highlight("automotive industry")}. Experienced in{" "}
      {highlight("customer discovery")}, {highlight("cross-functional collaboration")}, and{" "}
      {highlight("rapid prototyping")} using {highlight("AI tools")} to translate business needs into actionable
      product initiatives. {highlight("Autonomous, curious, and solution-oriented")}, with proven ability to work
      effectively with international stakeholders across {highlight("Europe, Asia, and the USA")}.
      <br />
      Currently seeking opportunities in {highlight("Toulouse, France")}, to contribute to innovative product teams
      where {highlight("AI, technology, and business strategy")} intersect, with a strong interest in building impactful
      digital products, driving innovation, and shaping the future of {highlight("mobility")} and{" "}
      {highlight("intelligent systems")}.
    </>
  );
}
