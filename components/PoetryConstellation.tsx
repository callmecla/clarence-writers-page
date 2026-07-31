"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Poem } from "@/lib/sanity/queries";
import ShareCardButton from "./ShareCardButton";

// Deterministic pseudo-random position per poem so it doesn't shift between
// server and client renders, or on re-render — based on the poem's own id.
function hashPosition(id: string, index: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const left = 4 + ((h + index * 37) % 92);
  const top = 8 + ((h >> 3) + index * 53) % 78;
  const size = 6 + (h % 5); // 6-10px
  return { left, top, size };
}

export default function PoetryConstellation({ poems }: { poems: Poem[] }) {
  const [openPoem, setOpenPoem] = useState<Poem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const positioned = useMemo(
    () => poems.map((poem, i) => ({ poem, pos: hashPosition(poem._id, i) })),
    [poems]
  );

  // Support deep links like /poetry?open=<id> — used by the "surprise me" button
  useEffect(() => {
    const openId = searchParams.get("open");
    if (!openId) return;
    const match = poems.find((p) => p._id === openId);
    if (match) setOpenPoem(match);
  }, [searchParams, poems]);

  return (
    <>
      <div className="constellation-wrap">
        {positioned.map(({ poem, pos }) => (
          <button
            key={poem._id}
            className="poem-star"
            style={{
              left: pos.left + "%",
              top: pos.top + "%",
              width: pos.size,
              height: pos.size,
            }}
            onMouseEnter={() => setHoveredId(poem._id)}
            onMouseLeave={() => setHoveredId((id) => (id === poem._id ? null : id))}
            onFocus={() => setHoveredId(poem._id)}
            onBlur={() => setHoveredId((id) => (id === poem._id ? null : id))}
            onClick={() => setOpenPoem(poem)}
            aria-label={`Read ${poem.title}`}
          >
            {hoveredId === poem._id && <span className="poem-label">{poem.title}</span>}
          </button>
        ))}
      </div>

      {openPoem && (
        <div className="poem-modal-overlay" onClick={() => setOpenPoem(null)}>
          <div className="poem-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="poem-modal-close"
              onClick={() => setOpenPoem(null)}
              aria-label="Close poem"
            >
              ×
            </button>
            <h2 className="display" style={{ fontStyle: "italic", fontSize: "26px", marginBottom: "6px" }}>
              {openPoem.title}
            </h2>
            {openPoem.publishedAt && (
              <p style={{ fontSize: "12px", color: "var(--moss)", marginBottom: "18px" }}>
                {new Date(openPoem.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "var(--ink)",
                whiteSpace: "pre-wrap",
                fontWeight: 300,
              }}
            >
              {openPoem.body}
            </p>
            <ShareCardButton title={openPoem.title} body={openPoem.body} />
          </div>
        </div>
      )}
    </>
  );
}
