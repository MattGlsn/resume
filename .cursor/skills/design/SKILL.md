---
name: design
description: >-
  Reviews or updates application visual design only (no logic changes).
  Checks conformance to project design rules in .cursor/rules, or implements
  refreshed styling from user direction. Creates distinctive, production-grade
  frontend interfaces that avoid generic AI aesthetics—components, pages, or
  full UI shells—when those changes stay presentational. Use when the user
  invokes /design, @design, asks for a design review, design audit, UI polish,
  design-only updates, or a bold memorable frontend look; or when switching
  between “review guidelines” vs “update look and feel.”
disable-model-invocation: true
---

# Design review and updates

## Hard constraints

- **Allowed:** Visual and presentational work—CSS, Tailwind/layout classes, typography, color tokens, spacing, motion, borders, shadows, responsive layout, accessible markup that does **not** change program behavior (e.g. `aria-*` where it stays accurate).
- **Forbidden:** Changing application logic—behavior of components, hooks, data flow, API calls, routing, state, algorithms, conditions, or event-handler **semantics**. Do not refactor for “cleaner code” unless it is strictly necessary to adjust styling (prefer not to).
- If a change would fix a bug in behavior or data, **stop** and report it; do not fix it under this skill unless the user explicitly leaves the design skill and asks for a logic fix.

Everything in **Distinctive frontend direction** below applies **inside** these guardrails: creative layout, type, color, motion, and atmosphere must not change what the app *does*—only how it looks and feels.

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

## Distinctive frontend direction (Update mode)

This section guides **production-grade, memorable** presentational work—not generic “AI slop.” Implement real, working **styling and structure that is only for layout/visuals** (see hard constraints).

The user may supply frontend goals: a component, page, application shell, or interface refresh. They may include purpose, audience, or technical constraints.

### Design thinking

Before coding, understand the context and commit to a **bold aesthetic direction**:

- **Purpose:** What problem does this interface solve? Who uses it?
- **Tone:** Pick a clear direction (examples: brutally minimal, maximalist, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian). Use these as inspiration; choose one coherent direction true to the product—not a bland default.
- **Constraints:** Technical requirements (framework, performance, accessibility). Project rules in `.cursor/rules` still win unless the user explicitly overrides a specific rule.
- **Differentiation:** What makes this **unforgettable**? What is the one thing someone will remember?

**Critical:** Choose a clear conceptual direction and execute it with **intentionality** (bold maximalism and refined minimalism are both valid). Match implementation depth to the vision: maximalist work may need richer animation and layered visuals; minimal work needs restraint, precision, and typographic/spatial rigor.

Then implement presentational code (HTML/CSS, Tailwind, React/Vue styling layers, etc.) that is:

- Production-grade and functional **visually** (no new behavior).
- Visually striking and memorable within the chosen direction.
- Cohesive with a clear point of view.
- Meticulously refined in spacing, hierarchy, and detail.

### Frontend aesthetics guidelines

Focus on:

- **Typography:** Prefer beautiful, distinctive font choices over generic stacks. Avoid overused defaults (e.g. Arial, Inter, Roboto, bland system-ui-only) when the project allows custom fonts; pair a characterful display treatment with a refined body face. Respect `.cursor/rules` if the project mandates specific families.
- **Color and theme:** Commit to a cohesive palette; use CSS variables or design tokens for consistency. Strong dominant colors with sharp accents usually read better than timid, evenly washed palettes—unless minimalism *is* the direction.
- **Motion:** Use animation for effects and micro-interactions **without changing semantics** (no delayed submits, no hiding functional state). Prefer CSS-only motion where appropriate; use Motion (or similar) in React **when already available** in the project—do not add heavy dependencies unless the user asks. Favor high-impact moments: e.g. one orchestrated load with staggered `animation-delay` over scattered noise. Consider scroll-linked or hover-driven reveals that fit the tone—still accessible (prefers-reduced-motion, no essential info only in motion).
- **Spatial composition:** Favor intentional layout: asymmetry, overlap, diagonal rhythm, grid-breaking hero moments, generous negative space *or* controlled density—whichever matches the chosen tone.
- **Backgrounds and visual details:** Build atmosphere: textures, grain, geometric patterns, layered transparency, mesh-like gradients, decorative frames, custom cursors—**when** they serve the direction. Avoid clichéd “template” looks (e.g. meaningless purple-on-white hero gradients) that could apply to any product.

**Anti-slop (context-specific, not a ban on effects):** Reject generic AI-default aesthetics: interchangeable font picks, purple-gradient-on-white clichés, cookie-cutter card grids with no hierarchy, and designs that ignore the product’s audience. **Interpret creatively**—no two projects should converge on the same accidental “house style.” Vary light/dark, type, and mood across engagements; do not repeatedly reach for the same trendy display face or palette without a reason tied to this interface.

**Remember:** Strong creative work is encouraged **within** this skill’s scope—presentational excellence without smuggling in logic or behavior changes.

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

1. **Inputs:** User’s optional style words, references, or constraints; existing guidelines in `.cursor/rules` (treat as baseline unless the user says to override a specific rule). Apply **Design thinking** when building or refreshing UI.
2. **Plan:** Short plan—palette/typography, layout rhythm, component surfaces (cards, nav, buttons), motion strategy—still no logic.
3. **Implement:** Change only presentational layers—stylesheets, class names, layout wrappers, design tokens/CSS variables, static markup structure **only** when required for layout/visuals and without changing behavior. Follow **Frontend aesthetics guidelines** for craft and differentiation.
4. **Verify:** Quick pass that interactive elements still work as before (same targets, same navigation); visualRegression or manual reasoning; contrast for text on new backgrounds; reduced-motion behavior where applicable.
5. If the new direction **conflicts** with a rule file, say so and either follow the user’s override or keep the rule—do not silently ignore written project rules.

---

## Output discipline

- Prefer **code citations** to existing files when giving review feedback.
- Keep diffs **minimal** and focused on appearance.
- Do not add unsolicited README or doc files.
