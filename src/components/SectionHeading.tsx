import type { ReactNode } from "react";
import { eyebrow } from "./styles";

type SectionHeadingProps = Readonly<{
  /** e.g. "01 · Product management" */
  label: string;
  /** DOM id of the h2, for the section's `aria-labelledby` */
  id: string;
  /** Headline; wrap key words in `<strong>` to set them in bold */
  children: ReactNode;
  description?: ReactNode;
}>;

/** Numbered mono label, large light headline with bold key words, optional intro paragraph. */
const SectionHeading = ({ label, id, children, description }: SectionHeadingProps) => (
  <div className="flex w-full flex-col gap-4">
    <div className="flex flex-col gap-3.5">
      <span className={`${eyebrow} text-primary-strong`}>{label}</span>
      <h2
        className="text-4xl leading-none font-normal tracking-[-0.035em] text-heading-muted sm:text-5xl lg:text-[56px] [&_strong]:font-bold"
        id={id}
      >
        {children}
      </h2>
    </div>
    {description ? (
      <p className="text-base leading-relaxed text-pretty text-muted-foreground">{description}</p>
    ) : null}
  </div>
);

export default SectionHeading;
