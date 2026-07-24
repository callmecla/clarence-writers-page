"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { moodForPath } from "@/lib/moods";

export default function AmbientBackground() {
  const pathname = usePathname();
  const mood = moodForPath(pathname); // "morning" | "midnight" | "summer" | "dusk" | ""

  const cloudsRef = useRef<HTMLDivElement>(null);
  const birdsRef = useRef<HTMLDivElement>(null);
  const stardustRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const bokehRef = useRef<HTMLDivElement>(null);

  // ---- Morning (Novels): clouds + gliding birds ----
  useEffect(() => {
    if (mood !== "morning") return;

    if (cloudsRef.current) {
      const shapes = [
        { w: 220, h: 60, top: "10%" },
        { w: 160, h: 46, top: "20%" },
        { w: 190, h: 52, top: "6%" },
      ];
      shapes.forEach((s, i) => {
        const c = document.createElement("div");
        c.className = "cloud-shape";
        c.style.top = s.top;
        c.style.width = s.w + "px";
        c.style.animationDuration = 70 + i * 25 + "s";
        c.style.animationDelay = -(i * 20) + "s";
        c.innerHTML = `<svg width="${s.w}" height="${s.h}" viewBox="0 0 ${s.w} ${s.h}">
          <ellipse cx="${s.w * 0.25}" cy="${s.h * 0.6}" rx="${s.w * 0.22}" ry="${s.h * 0.4}"/>
          <ellipse cx="${s.w * 0.5}" cy="${s.h * 0.4}" rx="${s.w * 0.2}" ry="${s.h * 0.35}"/>
          <ellipse cx="${s.w * 0.72}" cy="${s.h * 0.6}" rx="${s.w * 0.22}" ry="${s.h * 0.38}"/>
        </svg>`;
        cloudsRef.current!.appendChild(c);
      });
    }

    if (birdsRef.current) {
      const birdSVG = `<svg width="18" height="10" viewBox="0 0 18 10">
        <path d="M0 5 Q4 -2 9 5 Q14 -2 18 5" fill="none" stroke="var(--ink)" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`;
      for (let i = 0; i < 5; i++) {
        const b = document.createElement("div");
        b.className = "bird";
        b.style.top = 15 + Math.random() * 30 + "%";
        b.style.animationDuration = 18 + Math.random() * 14 + "s";
        b.style.animationDelay = -(Math.random() * 20) + "s";
        b.innerHTML = birdSVG;
        birdsRef.current!.appendChild(b);
      }
    }
  }, [mood]);

  // ---- Midnight (Poetry): stars + falling stardust + shooting stars ----
  useEffect(() => {
    if (mood !== "midnight") return;

    if (starsRef.current) {
      for (let i = 0; i < 70; i++) {
        const s = document.createElement("div");
        s.className = "mood-star";
        const size = 1 + Math.random() * 1.8;
        s.style.width = size + "px";
        s.style.height = size + "px";
        s.style.left = Math.random() * 100 + "vw";
        s.style.top = Math.random() * 65 + "vh";
        s.style.animationDuration = 2 + Math.random() * 3 + "s";
        s.style.animationDelay = -(Math.random() * 4) + "s";
        starsRef.current!.appendChild(s);
      }
      // occasional shooting stars
      for (let i = 0; i < 3; i++) {
        const sh = document.createElement("div");
        sh.className = "shooting-star";
        sh.style.left = 60 + Math.random() * 30 + "vw";
        sh.style.top = 5 + Math.random() * 25 + "vh";
        sh.style.animationDuration = 8 + Math.random() * 6 + "s";
        sh.style.animationDelay = -(Math.random() * 10) + "s";
        starsRef.current!.appendChild(sh);
      }
    }

    if (stardustRef.current) {
      for (let i = 0; i < 16; i++) {
        const d = document.createElement("div");
        d.className = "stardust";
        d.style.left = Math.random() * 100 + "vw";
        d.style.setProperty("--drift", Math.random() * 40 - 20 + "px");
        d.style.animationDuration = 10 + Math.random() * 10 + "s";
        d.style.animationDelay = -(Math.random() * 18) + "s";
        stardustRef.current!.appendChild(d);
      }
    }
  }, [mood]);

  // ---- Summer (Diary): fireflies + falling petals ----
  useEffect(() => {
    if (mood !== "summer") return;

    if (firefliesRef.current) {
      for (let i = 0; i < 20; i++) {
        const f = document.createElement("div");
        f.className = "firefly";
        f.style.left = Math.random() * 100 + "vw";
        f.style.animationDuration = 14 + Math.random() * 14 + "s";
        f.style.animationDelay = -(Math.random() * 20) + "s";
        firefliesRef.current!.appendChild(f);
      }
    }

    if (petalsRef.current) {
      const petalSVG = `<svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 1 C11 1, 13 5, 7 13 C1 5, 3 1, 7 1Z" fill="#f3c9d6" opacity="0.9"/>
      </svg>`;
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("div");
        p.className = "falling-petal";
        p.style.left = Math.random() * 100 + "vw";
        p.style.setProperty("--drift", Math.random() * 100 - 50 + "px");
        p.style.animationDuration = 10 + Math.random() * 8 + "s";
        p.style.animationDelay = -(Math.random() * 18) + "s";
        p.innerHTML = petalSVG;
        const svgEl = p.querySelector("svg") as HTMLElement | null;
        if (svgEl) svgEl.style.animationDuration = 2 + Math.random() * 2 + "s";
        petalsRef.current!.appendChild(p);
      }
    }

    if (bokehRef.current) {
      for (let i = 0; i < 8; i++) {
        const b = document.createElement("div");
        b.className = "bo";
        const size = 30 + Math.random() * 60;
        b.style.width = size + "px";
        b.style.height = size + "px";
        b.style.left = Math.random() * 100 + "vw";
        b.style.top = Math.random() * 70 + "vh";
        b.style.animationDuration = 6 + Math.random() * 6 + "s";
        b.style.animationDelay = -(Math.random() * 8) + "s";
        bokehRef.current!.appendChild(b);
      }
    }
  }, [mood]);

  // ---- Dusk (Photos): drifting warm dust ----
  useEffect(() => {
    if (mood !== "dusk") return;

    if (dustRef.current) {
      for (let i = 0; i < 26; i++) {
        const d = document.createElement("div");
        d.className = "dust-particle";
        const size = 2 + Math.random() * 3;
        d.style.width = size + "px";
        d.style.height = size + "px";
        d.style.left = Math.random() * 100 + "vw";
        d.style.top = Math.random() * 90 + "vh";
        d.style.animationDuration = 5 + Math.random() * 6 + "s";
        d.style.animationDelay = -(Math.random() * 8) + "s";
        dustRef.current!.appendChild(d);
      }
    }
  }, [mood]);

  return (
    <>
      {/* illustrated foliage framing the scene — present on every page, tinted per mood */}
      <div className="foliage top-left">
        <svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
          <path className="branch-line" d="M-10 20 Q 120 60 180 160 Q 210 220 260 240" fill="none" strokeWidth="4" />
          <path className="leaf-fill" d="M40 10 Q90 -10 110 40 Q90 70 40 60 Q10 40 40 10Z" />
          <path className="leaf-fill-2" d="M90 40 Q150 20 170 80 Q140 110 90 90 Q60 65 90 40Z" />
          <path className="leaf-fill" d="M20 70 Q70 55 90 110 Q55 135 20 115 Q-5 95 20 70Z" />
          <path className="leaf-fill-2" d="M140 90 Q195 75 215 130 Q180 155 140 140 Q115 115 140 90Z" />
          <path className="leaf-fill" d="M170 150 Q215 140 235 190 Q205 210 170 200 Q145 175 170 150Z" />
          <path className="leaf-fill-2" d="M60 130 Q105 120 120 165 Q90 185 60 175 Q40 155 60 130Z" />
          <path className="leaf-fill" d="M210 200 Q250 195 265 235 Q235 250 205 240 Q185 220 210 200Z" />
          <circle cx="130" cy="55" r="4" fill="var(--gold)" opacity="0.8" />
          <circle cx="195" cy="115" r="3" fill="var(--gold)" opacity="0.7" />
        </svg>
      </div>
      <div className="foliage top-right">
        <svg viewBox="0 0 460 380" xmlns="http://www.w3.org/2000/svg">
          <path className="branch-line" d="M470 10 Q 340 40 300 130 Q 280 190 230 220" fill="none" strokeWidth="4" />
          <path className="leaf-fill-2" d="M420 20 Q370 0 350 50 Q375 80 420 65 Q445 45 420 20Z" />
          <path className="leaf-fill" d="M360 45 Q305 30 285 85 Q315 110 360 95 Q385 70 360 45Z" />
          <path className="leaf-fill-2" d="M400 85 Q350 70 335 120 Q365 145 405 130 Q425 105 400 85Z" />
          <path className="leaf-fill" d="M310 110 Q260 100 245 150 Q275 172 315 158 Q335 135 310 110Z" />
          <path className="leaf-fill-2" d="M270 165 Q225 155 212 200 Q240 220 275 208 Q292 187 270 165Z" />
          <circle cx="330" cy="60" r="3.5" fill="var(--gold)" opacity="0.8" />
        </svg>
      </div>
      <div className="foliage bottom-left">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <path className="branch-line" d="M-10 290 Q 100 260 150 190 Q 175 150 220 130" fill="none" strokeWidth="4" />
          <path className="leaf-fill" d="M20 260 Q70 245 85 290 Q55 310 20 300 Q0 280 20 260Z" />
          <path className="leaf-fill-2" d="M70 220 Q115 205 130 250 Q100 270 70 260 Q50 240 70 220Z" />
          <path className="leaf-fill" d="M120 175 Q160 160 175 200 Q148 220 120 210 Q102 192 120 175Z" />
          <circle cx="95" cy="240" r="3" fill="var(--gold)" opacity="0.7" />
        </svg>
      </div>

      {/* ---- Morning: sunrise, drifting clouds, birds, ground mist ---- */}
      {mood === "morning" && (
        <>
          <div className="godrays">
            <div className="ray ray1" /><div className="ray ray2" />
            <div className="ray ray3" /><div className="ray ray4" />
          </div>
          <div className="clouds" ref={cloudsRef} />
          <div className="birds" ref={birdsRef} />
          <div className="mist"><span /><span /><span /></div>
        </>
      )}

      {/* ---- Midnight: moon, stars, falling stardust, shooting stars ---- */}
      {mood === "midnight" && (
        <>
          <div className="moon-glow" />
          <div className="star-layer" ref={starsRef} />
          <div className="stardust-layer" ref={stardustRef} />
        </>
      )}

      {/* ---- Summer: sun flare, fireflies, falling petals, bokeh ---- */}
      {mood === "summer" && (
        <>
          <div className="godrays">
            <div className="ray ray1" /><div className="ray ray2" />
            <div className="ray ray3" /><div className="ray ray4" />
          </div>
          <div className="sun-flare" />
          <div className="fireflies" ref={firefliesRef} />
          <div className="petals-layer" ref={petalsRef} />
          <div className="bokeh" ref={bokehRef} />
        </>
      )}

      {/* ---- Dusk: vignette, warm drifting dust, sweeping light leak ---- */}
      {mood === "dusk" && (
        <>
          <div className="sun-flare soft" />
          <div className="dust-layer" ref={dustRef} />
          <div className="light-leak" />
          <div className="vignette" />
        </>
      )}
    </>
  );
}
