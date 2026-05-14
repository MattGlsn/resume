/** Resolve a path that lives under Vite `public/` (e.g. `/logos/x.png`) for the current `base` URL. */
export function publicUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${trimmed}`;
}
