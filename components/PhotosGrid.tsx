"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import TiltPhoto from "./TiltPhoto";

interface PhotoItem {
  _id: string;
  src: string;
  alt: string;
  caption?: string;
}

export default function PhotosGrid({ photos }: { photos: PhotoItem[] }) {
  const searchParams = useSearchParams();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  // Support deep links like /photos?open=<id> — used by the "surprise me" button
  useEffect(() => {
    const openId = searchParams.get("open");
    if (!openId) return;
    const el = refs.current[openId];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightedId(openId);
    const t = window.setTimeout(() => {
      setHighlightedId((id) => (id === openId ? null : id));
    }, 1600);
    return () => window.clearTimeout(t);
  }, [searchParams, photos]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "28px",
      }}
    >
      {photos.map((photo) => (
        <div
          key={photo._id}
          ref={(el) => {
            refs.current[photo._id] = el;
          }}
          className={highlightedId === photo._id ? "highlight-pulse" : undefined}
          style={{ borderRadius: "8px" }}
        >
          <TiltPhoto src={photo.src} alt={photo.alt} caption={photo.caption} />
        </div>
      ))}
    </div>
  );
}
