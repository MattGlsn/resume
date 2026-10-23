import { useId, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { experienceRolesSorted } from "../content/experience";
import { productFocusAreas, productKeySkills, type ProductFocusArea } from "../content/productRole";
import SectionHeading from "./SectionHeading";
import { focusRing, surfaceCard } from "./styles";

type ProductRoleProps = Readonly<{
  areas?: readonly ProductFocusArea[];
}>;

const itemGrid = "grid list-none grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-3.5 p-0";

const Check = ({ className }: Readonly<{ className: string }>) => (
  <FiCheck aria-hidden className={`mt-[3px] size-[18px] shrink-0 ${className}`} strokeWidth={2.6} />
);

const itemCard = "rounded-[10px] border border-border-subtle bg-surface-muted p-5 text-[15.5px] leading-relaxed text-body";

/** Items as light cards in a two-column grid. */
const AreaPanel = ({ area }: Readonly<{ area: ProductFocusArea }>) => (
  <ul className={itemGrid}>
    {area.items.map((item) => (
      <li className={`${itemCard} flex gap-3`} key={item}>
        <Check className="text-link" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/** Tag shape shared by the tools and key skills rows under the card */
const tag = "rounded-[10px] border px-3.5 py-2 text-sm";

/** Current role, split into responsibility areas; one area shows at a time. */
const ProductRole = (props?: ProductRoleProps) => {
  const areas = props?.areas ?? productFocusAreas;
  const [activeId, setActiveId] = useState(areas[0]?.id);
  const baseId = useId();
  const active = areas.find((a) => a.id === activeId) ?? areas[0];
  const currentRole = experienceRolesSorted[0];
  // Tools from every area, shown under the card whichever area is selected.
  const tools = [...new Set(areas.flatMap((area) => area.tools ?? []))];

  return (
    <div className="flex flex-col gap-7">
      <SectionHeading description={currentRole.roleOverview} id="pm-heading" label="01 · Product management">
        <strong>One owner</strong>, from <strong>vision to delivery</strong>.
      </SectionHeading>

      <div className={`${surfaceCard} flex flex-col gap-3 p-3 shadow-float`}>
        <div
          aria-label="Responsibility areas"
          className="flex flex-wrap gap-1.5 rounded-[10px] bg-background p-1.5"
          role="group"
        >
          {areas.map((area) => {
            const selected = area.id === active?.id;
            return (
              <button
                aria-controls={`${baseId}-panel`}
                aria-pressed={selected}
                className={`flex min-h-13 flex-[1_1_200px] cursor-pointer items-center justify-between gap-2.5 rounded-[10px] border-0 px-[18px] text-[15px] font-semibold transition-colors duration-200 ${
                  selected
                    ? "bg-surface text-foreground shadow-[inset_0_0_0_1px_#d9dce1]"
                    : "bg-transparent text-muted hover:text-foreground"
                } ${focusRing}`}
                key={area.id}
                onClick={() => setActiveId(area.id)}
                type="button"
              >
                <span>{area.label}</span>
                <span className="font-mono text-xs opacity-80">{String(area.items.length).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {active ? (
          <div aria-label={active.label} className="px-4 pt-4 pb-5 sm:px-7 sm:pt-6 sm:pb-7" id={`${baseId}-panel`} role="region">
            <AreaPanel area={active} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        {tools.length > 0 ? (
          <ul aria-label="Tools" className="mb-2 flex list-none flex-wrap gap-2 p-0">
            {tools.map((tool) => (
              <li className={`${tag} border-ink bg-ink font-medium text-white`} key={tool}>
                {tool}
              </li>
            ))}
          </ul>
        ) : null}
        <ul aria-label="Key skills" className="flex list-none flex-wrap gap-2 p-0">
          {productKeySkills.map((skill) => (
            <li className={`${tag} border-border bg-surface`} key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductRole;
