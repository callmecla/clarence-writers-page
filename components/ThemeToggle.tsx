"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "hello-rencey-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as "day" | "night" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "night" : "day";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const isNight = theme === "night";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day and night mode"
      style={{
        position: "relative",
        width: "58px",
        height: "30px",
        borderRadius: "999px",
        border: "1px solid var(--line)",
        background: isNight
          ? "linear-gradient(180deg, #1a2b22, #0f1c16)"
          : "linear-gradient(180deg, #cfe3d6, #eef1e3)",
        cursor: "pointer",
        padding: 0,
        transition: "background 0.7s ease, border-color 0.7s ease",
        opacity: mounted ? 1 : 0,
        overflow: "hidden",
      }}
    >
      {/* tiny stars, only visible in night mode */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          opacity: isNight ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <i style={dotStyle(10, 8)} />
        <i style={dotStyle(18, 18)} />
        <i style={dotStyle(30, 10)} />
      </span>

      {/* sliding handle */}
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: isNight ? "31px" : "3px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: isNight
            ? "radial-gradient(circle at 35% 30%, #f3ecd8, #d8cfa8)"
            : "radial-gradient(circle at 35% 30%, #fff6da, #ffd479)",
          boxShadow: isNight
            ? "0 0 10px 2px rgba(227,180,103,0.35)"
            : "0 0 10px 2px rgba(255,212,121,0.55)",
          transition: "left 0.6s cubic-bezier(.4,0,.2,1), background 0.6s ease",
        }}
      >
        {/* moon craters, fade in only at night */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            opacity: isNight ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <i style={craterStyle(5, 6, 5)} />
          <i style={craterStyle(13, 12, 3)} />
        </span>
      </span>
    </button>
  );
}

function dotStyle(left: number, top: number): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width: "2px",
    height: "2px",
    borderRadius: "50%",
    background: "#e7ecdf",
  };
}

function craterStyle(left: number, top: number, size: number): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width: size,
    height: size,
    borderRadius: "50%",
    background: "rgba(120,110,80,0.25)",
  };
}
