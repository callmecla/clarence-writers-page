"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const motesRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const bokehRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // fireflies / rising motes
    if (motesRef.current) {
      const MOTE_COUNT = 22;
      for (let i = 0; i < MOTE_COUNT; i++) {
        const m = document.createElement("div");
        m.className = "mote";
        m.style.left = Math.random() * 100 + "vw";
        m.style.animationDuration = 14 + Math.random() * 14 + "s";
        m.style.animationDelay = Math.random() * -20 + "s";
        motesRef.current.appendChild(m);
      }
    }

    // stars (only visible at night, via CSS)
    if (starsRef.current) {
      const STAR_COUNT = 60;
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = document.createElement("div");
        s.className = "star";
        const size = 1 + Math.random() * 1.8;
        s.style.width = size + "px";
        s.style.height = size + "px";
        s.style.left = Math.random() * 100 + "vw";
        s.style.top = Math.random() * 60 + "vh";
        s.style.animationDuration = 2 + Math.random() * 3 + "s";
        s.style.animationDelay = Math.random() * -4 + "s";
        starsRef.current.appendChild(s);
      }
    }

    // bokeh dappled light
    if (bokehRef.current) {
      const BOKEH_COUNT = 10;
      for (let i = 0; i < BOKEH_COUNT; i++) {
        const b = document.createElement("div");
        b.className = "bo";
        const size = 30 + Math.random() * 70;
        b.style.width = size + "px";
        b.style.height = size + "px";
        b.style.left = Math.random() * 100 + "vw";
        b.style.top = Math.random() * 70 + "vh";
        b.style.animationDuration = 6 + Math.random() * 6 + "s";
        b.style.animationDelay = Math.random() * -8 + "s";
        bokehRef.current.appendChild(b);
      }
    }

    // falling leaves
    if (leavesRef.current) {
      const LEAF_COUNT = 14;
      const leafSVG = (fillVar: string) => `
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 1 C13 3, 14 9, 8 15 C2 9, 3 3, 8 1Z" fill="${fillVar}" opacity="0.85"/>
          <line x1="8" y1="2" x2="8" y2="14" stroke="rgba(0,0,0,0.15)" stroke-width="0.6"/>
        </svg>`;
      for (let i = 0; i < LEAF_COUNT; i++) {
        const wrap = document.createElement("div");
        wrap.className = "falling-leaf";
        wrap.style.left = Math.random() * 100 + "vw";
        wrap.style.setProperty("--drift", Math.random() * 80 - 40 + "px");
        wrap.style.animationDuration = 12 + Math.random() * 10 + "s";
        wrap.style.animationDelay = Math.random() * -20 + "s";
        wrap.innerHTML = leafSVG(i % 2 === 0 ? "var(--moss)" : "var(--gold)");
        const svgEl = wrap.querySelector("svg") as HTMLElement | null;
        if (svgEl) svgEl.style.animationDuration = 2 + Math.random() * 2 + "s";
        leavesRef.current.appendChild(wrap);
      }
    }
  }, []);

  return (
    <>
      {/* illustrated foliage framing the scene */}
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

      {/* dappled sunlight / god rays */}
      <div className="godrays">
        <div className="ray ray1" />
        <div className="ray ray2" />
        <div className="ray ray3" />
        <div className="ray ray4" />
      </div>

      {/* mood-specific atmosphere: morning mist, midnight moon glow,
          summer/dusk sun flare, dusk vignette. Visibility is CSS-only,
          driven by the data-mood attribute PageMood sets on <html>. */}
      <div className="mist">
        <span />
        <span />
        <span />
      </div>
      <div className="moon-glow" />
      <div className="sun-flare" />
      <div className="vignette" />

      {/* soft bokeh light, filled client-side */}
      <div className="bokeh" ref={bokehRef} />

      {/* gently falling leaves, filled client-side */}
      <div className="leaves" ref={leavesRef} />

      {/* fireflies (day, subtle) / stars (night) */}
      <div className="motes" ref={motesRef} />
      <div className="motes" ref={starsRef} />
    </>
  );
}
