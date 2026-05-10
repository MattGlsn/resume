---
name: design
description: >-
  Reviews or updates application visual design only (no logic changes).
  Checks conformance to project design rules in .cursor/rules, or implements
  refreshed styling from user direction. Use when the user invokes /design,
  @design, asks for a design review, design audit, UI polish, or design-only
  updates; or when switching between “review guidelines” vs “update look and
  feel.”
disable-model-invocation: true
---

# Design review and updates

## Hard constraints

- **Allowed:** Visual and presentational work—CSS, Tailwind/layout classes, typography, color tokens, spacing, motion, borders, shadows, responsive layout, accessible markup that does **not** change program behavior (e.g. `aria-*` where it stays accurate).
- **Forbidden:** Changing application logic—behavior of components, hooks, data flow, API calls, routing, state, algorithms, conditions, or event-handler **semantics**. Do not refactor for “cleaner code” unless it is strictly necessary to adjust styling (prefer not to).
- If a change would fix a bug in behavior or data, **stop** and report it; do not fix it under this skill unless the user explicitly leaves the design skill and asks for a logic fix.

## Before any work

1. **Discover guidelines:** Read all relevant files under `.cursor/rules/` (at minimum anything about design, UI, brand, or tokens—e.g. `design-guidelines.mdc`). If the user points at a specific rule file, prioritize it.
2. **Map the UI:** Identify main entry points (e.g. `App.tsx`, layout components, global styles) and shared primitives so feedback and edits stay consistent.

## Mode selection

Ask once if unclear:

| User intent | Action |
|-------------|--------|
| **Review** | Audit the site against the guidelines; do not change code unless the user later asks to apply fixes. |
| **Update** | Propose or implement a new look; honor optional user style notes (e.g. “minimal,” “more contrast,” “warmer palette”). Still obey “no logic changes.” |

Default if the user only says “design” or `/design`: briefly offer both modes and proceed with **Review** if they do not choose.

---

## Mode: Review (guidelines compliance)

1. Build a **checklist** from `.cursor/rules` (typography, color, spacing patterns, components, copy tone if specified).
2. **Scan** representative pages/sections: global styles, root layout, navigation, main content, buttons/links, forms if any.
3. Report **findings** with file/component pointers:
   - **Must fix:** Violates an explicit guideline or hurts accessibility/contrast in a way the rules forbid.
   - **Should fix:** Inconsistency or weak fit with stated tokens/patterns.
   - **Nice to have:** Subjective polish that still aligns with guidelines.
4. Optionally end with a short **summary table** (area → guideline → status).
5. **Do not** edit files in Review mode unless the user explicitly asks you to apply fixes.

---

## Mode: Update (new design)

1. **Inputs:** User’s optional style words, references, or constraints; existing guidelines in `.cursor/rules` (treat as baseline unless the user says to override a specific rule).
2. **Plan:** Short plan—palette/typography, layout rhythm, component surfaces (cards, nav, buttons)—still no logic.
3. **Implement:** Change only presentational layers—stylesheets, class names, layout wrappers, design tokens/CSS variables, static markup structure **only** when required for layout/visuals and without changing behavior.
4. **Verify:** Quick pass that interactive elements still work as before (same targets, same navigation); visualRegression or manual reasoning; contrast for text on new backgrounds.
5. If the new direction **conflicts** with a rule file, say so and either follow the user’s override or keep the rule—do not silently ignore written project rules.

---

## Output discipline

- Prefer **code citations** to existing files when giving review feedback.
- Keep diffs **minimal** and focused on appearance.
- Do not add unsolicited README or doc files.
