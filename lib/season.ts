export type Season = "winter" | "spring" | "summer" | "autumn";

// Meteorological seasons, Northern Hemisphere (the common default when a
// site has no way to know the visitor's actual hemisphere without asking
// for location permission, which felt like overkill for a subtle effect).
export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth(); // 0 = January
  if (month === 11 || month === 0 || month === 1) return "winter";
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  return "autumn"; // 8, 9, 10
}
