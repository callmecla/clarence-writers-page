"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "small-hours-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");

  // Read saved preference (or system preference) on first load
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as "day" | "night" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "night" : "day";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day and night mode"
      style={{
        position: "fixed",
        top: "26px",
        right: "6vw",
        zIndex: 30,
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        border: "1px solid var(--line)",
        background: "var(--paper)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background var(--transition-speed) ease, transform 0.4s ease",
      }}
    >
      {theme === "day" ? "☀️" : "🌙"}
    </button>
  );
}
