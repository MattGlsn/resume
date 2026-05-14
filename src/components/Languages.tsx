import type { Language } from "../content/languages";
import { languages as defaultLanguages } from "../content/languages";
import { LanguageCard } from "./LanguageCard";

type LanguagesProps = Readonly<{
  languages?: readonly Language[];
}>;

function Languages(props?: LanguagesProps) {
  const items = props?.languages ?? defaultLanguages;

  return (
    <div aria-label="Languages" className="mt-8 w-full lg:mt-10" role="region">
      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((lang, index) => (
          <li key={lang.id}>
            <LanguageCard index={index} language={lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Languages;
