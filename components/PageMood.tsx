"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Maps each section of the site to its own color mood.
// Pages not listed here (e.g. /photos) just use the base day/night palette.
const MOOD_BY_PATH: Record<string, string> = {
  "/": "morning",
  "/poetry": "midnight",
  "/diary": "summer",
};

export default function PageMood() {
  const pathname = usePathname();

  useEffect(() => {
    const mood = MOOD_BY_PATH[pathname] || "";
    if (mood) {
      document.documentElement.setAttribute("data-mood", mood);
    } else {
      document.documentElement.removeAttribute("data-mood");
    }
  }, [pathname]);

  return null;
}
