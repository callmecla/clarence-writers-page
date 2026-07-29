"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Novel } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";

function hashPosition(id: string, index: number, total: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  // spread orbs out more evenly than the dense poem starfield, since there
  // are far fewer novels and each one needs room to breathe
  const bandWidth = 100 / Math.max(total, 1);
  const left = bandWidth * index + 10 + (h % Math.max(bandWidth - 20, 10));
  const top = 15 + ((h >> 4) % 55);
  return { left: Math.min(left, 90), top };
}

export default function NovelConstellation({ novels }: { novels: Novel[] }) {
  const [openNovel, setOpenNovel] = useState<Novel | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const positioned = useMemo(
    () => novels.map((novel, i) => ({ novel, pos: hashPosition(novel._id, i, novels.length) })),
    [novels]
  );

  const linePoints = positioned.map((p) => `${p.pos.left},${p.pos.top}`).join(" ");

  return (
    <>
      <div className="novel-constellation-wrap">
        {positioned.length > 1 && (
          <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points={linePoints} fill="none" />
          </svg>
        )}

        {positioned.map(({ novel, pos }) => (
          <button
            key={novel._id}
            className="novel-orb"
            style={{ left: pos.left + "%", top: pos.top + "%" }}
            onMouseEnter={() => setHoveredId(novel._id)}
            onMouseLeave={() => setHoveredId((id) => (id === novel._id ? null : id))}
            onFocus={() => setHoveredId(novel._id)}
            onBlur={() => setHoveredId((id) => (id === novel._id ? null : id))}
            onClick={() => setOpenNovel(novel)}
            aria-label={`Open ${novel.title}`}
          >
            {novel.cover ? (
              <Image
                src={urlForImage(novel.cover).width(200).height(200).url()}
                alt={novel.title}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <span className="novel-orb-fallback" />
            )}
            {hoveredId === novel._id && (
              <span className="novel-orb-label">
                {novel.title}
                {novel.genre && <em>{novel.genre}</em>}
              </span>
            )}
          </button>
        ))}
      </div>

      {openNovel && (
        <div className="poem-modal-overlay" onClick={() => setOpenNovel(null)}>
          <div className="poem-modal novel-modal" onClick={(e) => e.stopPropagation()}>
            <button className="poem-modal-close" onClick={() => setOpenNovel(null)} aria-label="Close">
              ×
            </button>

            {openNovel.cover && (
              <div className="novel-modal-cover">
                <Image
                  src={urlForImage(openNovel.cover).width(700).height(400).url()}
                  alt={openNovel.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            {openNovel.genre && <span className="genre-tag-inline">{openNovel.genre}</span>}
            <h2 className="display" style={{ fontSize: "26px", margin: "10px 0 6px" }}>
              {openNovel.title}
            </h2>
            {openNovel.logline && (
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: "20px" }}>
                {openNovel.logline}
              </p>
            )}

            {openNovel.originStory && (
              <div className="novel-modal-section">
                <p className="novel-modal-label">where this idea came from</p>
                <p className="novel-modal-body">{openNovel.originStory}</p>
              </div>
            )}

            {(openNovel.moodColors?.length || openNovel.moodSong || openNovel.moodImage) && (
              <div className="novel-modal-section">
                <p className="novel-modal-label">mood board</p>

                {openNovel.moodImage && (
                  <div className="mood-board-image">
                    <Image
                      src={urlForImage(openNovel.moodImage).width(600).height(360).url()}
                      alt={`Mood for ${openNovel.title}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                {openNovel.moodColors && openNovel.moodColors.length > 0 && (
                  <div className="mood-board-palette">
                    {openNovel.moodColors.map((c, i) => (
                      <span key={i} className="mood-swatch" style={{ background: c }} title={c} />
                    ))}
                  </div>
                )}

                {openNovel.moodSong && (
                  <p className="mood-board-song">
                    ♪ {openNovel.moodSong}
                    {openNovel.moodSongUrl && (
                      <a href={openNovel.moodSongUrl} target="_blank" rel="noopener noreferrer">
                        {" "}
                        listen ↗
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}

            <a
              className="wattpad-cta"
              href={openNovel.wattpadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read on Wattpad →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
