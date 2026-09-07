"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { Poem, MarginaliaNote } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import ShareCardButton from "./ShareCardButton";
import MarginaliaNotes from "./MarginaliaNotes";

export default function PoetryConstellation({ poems, notes }: { poems: Poem[]; notes: MarginaliaNote[] }) {
  const [openPoem, setOpenPoem] = useState<Poem | null>(null);
  const searchParams = useSearchParams();

  // Support deep links like /poetry?open=<id>
  useEffect(() => {
    const openId = searchParams.get("open");
    if (!openId) return;
    const match = poems.find((p) => p._id === openId);
    if (match) setOpenPoem(match);
  }, [searchParams, poems]);

  return (
    <>
      <div className="poem-list">
        {poems.map((poem) => (
          <button
            key={poem._id}
            className="poem-list-item"
            onClick={() => setOpenPoem(poem)}
            aria-label={`Read ${poem.title}`}
          >
            <span className="poem-list-star" aria-hidden="true" />
            <span className="poem-list-title">{poem.title}</span>
            {poem.publishedAt && (
              <span className="poem-list-date">
                {new Date(poem.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
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
