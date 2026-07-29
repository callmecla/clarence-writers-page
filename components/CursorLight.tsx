"use client";

import { useEffect, useRef } from "react";

export default function CursorLight() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const frame = useRef<number>();

  useEffect(() => {
    // Skip entirely on touch devices and for people who've asked for
    // reduced motion — a trailing glow adds nothing for either.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || reducedMotion) return;

    function handleMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
      if (!active.current) {
        active.current = true;
        dotRef.current?.classList.add("is-active");
      }
    }
    function handleLeave() {
      active.current = false;
      dotRef.current?.classList.remove("is-active");
    }

    function tick() {
      // ease the displayed position toward the real cursor position —
      // this is what gives it that soft, slightly-delayed drifting feel
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      frame.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div ref={dotRef} className="cursor-light" />;
}
