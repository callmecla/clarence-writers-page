"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { Poem, MarginaliaNote } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import ShareCardButton from "./ShareCardButton";
import MarginaliaNotes from "./MarginaliaNotes";

const ROW_HEIGHT = 130;
const WIND_AMPLITUDE = 22; // keeps the path within ~28%–72%, leaving room for labels

function windX(index: number): number {
  return 50 + Math.sin(index * 0.9) * WIND_AMPLITUDE;
}

export default function PoetryConstellation({ poems, notes }: { poems: Poem[]; notes: MarginaliaNote[] }) {
  const [openPoem, setOpenPoem] = useState<Poem | null>(null);
  const searchParams = useSearchParams();

  const points = useMemo(
    () => poems.map((poem, i) => ({ poem, x: windX(i), y: i * ROW_HEIGHT + ROW_HEIGHT / 2 })),
    [poems]
  );

  const totalHeight = poems.length * ROW_HEIGHT + ROW_HEIGHT / 2;

  // A smooth S-curve through every point — each pair connected by a
  // bezier that bulges toward the horizontal midpoint, so the line reads
  // as one continuous winding thread rather than sharp zigzags.
  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const midY = (p0.y + p1.y) / 2;
      d += ` C ${p0.x},${midY} ${p1.x},${midY} ${p1.x},${p1.y}`;
    }
    return d;
  }, [points]);

  // Support deep links like /poetry?open=<id>
  useEffect(() => {
    const openId = searchParams.get("open");
    if (!openId) return;
    const match = poems.find((p) => p._id === openId);
    if (match) setOpenPoem(match);
  }, [searchParams, poems]);

  return (
    <>
      <div className="firefly-thread" style={{ height: totalHeight }}>
        {points.length > 1 && (
          <svg className="firefly-path" viewBox={`0 0 100 ${totalHeight}`} preserveAspectRatio="none">
            <path d={pathD} fill="none" />
          </svg>
        )}

        {points.map(({ poem, x, y }, i) => {
          const labelOnRight = x < 50;
          return (
            <button
              key={poem._id}
              className="firefly-point"
              style={{ left: `${x}%`, top: y, animationDelay: `${i * 0.25}s` }}
              onClick={() => setOpenPoem(poem)}
              aria-label={`Read ${poem.title}`}
            >
              <span className="firefly-glow" />
              <span className={`firefly-label ${labelOnRight ? "label-right" : "label-left"}`}>
                <span className="firefly-title">{poem.title}</span>
                {poem.publishedAt && (
                  <span className="firefly-date">
                    {new Date(poem.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </span>
            </button>
          );
        })}
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

            {openPoem.image && (
              <div className="poem-modal-image">
                <Image
                  src={urlForImage(openPoem.image).width(600).height(340).url()}
                  alt={openPoem.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

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

            <MarginaliaNotes
              key={openPoem._id}
              targetType="poem"
              targetId={openPoem._id}
              initialNotes={notes.filter((n) => n.targetId === openPoem._id)}
            />
          </div>
        </div>
      )}
    </>
  );
}
