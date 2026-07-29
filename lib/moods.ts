// Maps each section of the site to its own mood — both a color palette
// (handled in globals.css) and a distinct set of background animations
// (handled in AmbientBackground). Pages not listed here just use the
// base day/night look with no special mood.
export const MOOD_BY_PATH: Record<string, string> = {
  "/": "aurora",
  "/novels": "morning",
  "/poetry": "midnight",
  "/diary": "summer",
  "/photos": "dusk",
  "/about": "twilight",
};

export function moodForPath(pathname: string): string {
  return MOOD_BY_PATH[pathname] || "";
}
