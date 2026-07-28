"use client";

import { useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import type { DiaryEntry } from "@/lib/sanity/queries";

export default function DiaryEntries({ entries }: { entries: DiaryEntry[] }) {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  function goToRandomMemory() {
    if (entries.length === 0) return;
    let index = Math.floor(Math.random() * entries.length);
    if (entries.length > 1 && index === lastIndex) {
      index = (index + 1) % entries.length;
    }
    setLastIndex(index);
    const entry = entries[index];
    const el = refs.current[entry._id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setHighlightedId(entry._id);
    window.setTimeout(() => {
      setHighlightedId((id) => (id === entry._id ? null : id));
    }, 1600);
  }

  return (
    <>
      <button
        onClick={goToRandomMemory}
        className="random-memory-btn"
        style={{
          marginBottom: "40px",
        }}
      >
        🌸 a random memory
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "70px", maxWidth: "700px" }}>
        {entries.map((entry) => (
          <article
            key={entry._id}
            ref={(el) => {
              refs.current[entry._id] = el;
            }}
            className={highlightedId === entry._id ? "diary-entry highlight-pulse" : "diary-entry"}
            style={{
              background: "var(--paper)",
              border: "1px solid var(--paper-edge)",
              borderRadius: "6px",
              padding: "34px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <p style={{ fontSize: "12px", color: "var(--moss)" }}>
                {new Date(entry.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {entry.mood && (
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    border: "1px solid var(--moss)",
                    color: "var(--moss)",
                    borderRadius: "999px",
                    padding: "3px 10px",
                  }}
                >
                  {entry.mood}
                </span>
              )}
            </div>

            {entry.title && (
              <h2 className="display" style={{ fontStyle: "italic", fontSize: "24px", marginBottom: "16px" }}>
                {entry.title}
              </h2>
            )}

            <div style={{ fontSize: "15.5px", lineHeight: 1.85, color: "var(--ink)", fontWeight: 300 }}>
              <PortableText value={entry.body} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
