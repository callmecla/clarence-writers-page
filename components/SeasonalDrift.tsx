"use client";

import { useEffect, useRef } from "react";
import { getCurrentSeason, type Season } from "@/lib/season";

export default function SeasonalDrift() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const season: Season = getCurrentSeason();
    document.documentElement.setAttribute("data-season", season);

    const layer = layerRef.current;
    if (!layer) return;

    if (season === "winter") {
      for (let i = 0; i < 22; i++) {
        const s = document.createElement("div");
        s.className = "snowflake";
        const size = 2 + Math.random() * 3;
        s.style.width = size + "px";
        s.style.height = size + "px";
        s.style.left = Math.random() * 100 + "vw";
        s.style.setProperty("--drift", Math.random() * 60 - 30 + "px");
        s.style.animationDuration = 10 + Math.random() * 12 + "s";
        s.style.animationDelay = -(Math.random() * 18) + "s";
        layer.appendChild(s);
      }
    }

    if (season === "spring") {
      const petalSVG = `<svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M6 1 C9 1, 11 4, 6 11 C1 4, 3 1, 6 1Z" fill="#f6c9d8" opacity="0.9"/>
      </svg>`;
      for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.className = "blossom";
        p.style.left = Math.random() * 100 + "vw";
        p.style.setProperty("--drift", Math.random() * 70 - 35 + "px");
        p.style.animationDuration = 12 + Math.random() * 10 + "s";
        p.style.animationDelay = -(Math.random() * 20) + "s";
        p.innerHTML = petalSVG;
        layer.appendChild(p);
      }
    }

    if (season === "summer") {
      for (let i = 0; i < 14; i++) {
        const g = document.createElement("div");
        g.className = "sunglint";
        const size = 2 + Math.random() * 2;
        g.style.width = size + "px";
        g.style.height = size + "px";
        g.style.left = Math.random() * 100 + "vw";
        g.style.top = Math.random() * 100 + "vh";
        g.style.animationDuration = 2 + Math.random() * 3 + "s";
        g.style.animationDelay = -(Math.random() * 4) + "s";
        layer.appendChild(g);
      }
    }

    if (season === "autumn") {
      const leafSVG = `<svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 1 C11 3, 12 8, 7 13 C2 8, 3 3, 7 1Z" fill="#c76b3a" opacity="0.9"/>
      </svg>`;
      for (let i = 0; i < 10; i++) {
        const l = document.createElement("div");
        l.className = "autumn-leaf";
        l.style.left = Math.random() * 100 + "vw";
        l.style.setProperty("--drift", Math.random() * 80 - 40 + "px");
        l.style.animationDuration = 11 + Math.random() * 9 + "s";
        l.style.animationDelay = -(Math.random() * 18) + "s";
        l.innerHTML = leafSVG;
        layer.appendChild(l);
      }
    }
  }, []);

  return (
    <>
      <div className="seasonal-overlay" />
      <div className="seasonal-layer" ref={layerRef} />
    </>
  );
}
