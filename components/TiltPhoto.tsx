"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function TiltPhoto({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * 14; // left/right tilt
    const rotateX = (0.5 - py) * 14; // up/down tilt
    setTilt({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          aspectRatio: "4 / 5",
          borderRadius: "6px",
          overflow: "hidden",
          background: "var(--paper)",
          perspective: "800px",
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
            tilt.x || tilt.y ? 1.03 : 1
          })`,
          transition: "transform 0.25s ease-out",
          boxShadow:
            tilt.x || tilt.y
              ? "0 20px 40px -16px rgba(20,15,10,0.35)"
              : "0 4px 12px -8px rgba(20,15,10,0.15)",
        }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: "10px",
            fontSize: "13.5px",
            color: "var(--ink-soft)",
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
