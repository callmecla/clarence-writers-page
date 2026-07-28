"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { moodForPath } from "@/lib/moods";

export default function PageMood() {
  const pathname = usePathname();

  useEffect(() => {
    const mood = moodForPath(pathname);
    if (mood) {
      document.documentElement.setAttribute("data-mood", mood);
    } else {
      document.documentElement.removeAttribute("data-mood");
    }
  }, [pathname]);

  return null;
}
