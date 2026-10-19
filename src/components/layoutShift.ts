/**
 * On classic desktop widths the "On this page" menu has no gutter to sit in, so the page shell moves left
 * by half of (menu width + gap) and the shell + menu pair stays centered.
 * `--side-nav-shift` is set by SideNav and follows its collapsed state. At 1600px+ the gutter is wide enough.
 */
export const shellShift =
  "min-[1280px]:max-[1599px]:relative min-[1280px]:max-[1599px]:right-[var(--side-nav-shift,7.5rem)] motion-safe:transition-[right] motion-safe:duration-200";
