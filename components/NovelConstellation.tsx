"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { Novel } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import ShareCardButton from "./ShareCardButton";

function hashPosition(id: string, index: number, total: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const bandWidth = 100 / Math.max(total, 1);
  const left = bandWidth * index + 10 + (h % Math.max(bandWidth - 20, 10));
  const top = 15 + ((h >> 4) % 55);
  return { left: Math.min(left, 90), top };
}

function isLocked(novel: Novel): boolean {
  return !!novel.nextUpdateAt && new Date(novel.nextUpdateAt) > new Date();
}

function formatUnlockDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCountdown(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "very soon";
  if (days === 1) return "in 1 day";
  if (days < 30) return `in ${days} days`;
  const months = Math.round(days / 30);
  return months === 1 ? "in about a month" : `in about ${months} months`;
}

export default function NovelConstellation({ novels }: { novels: Novel[] }) {
  const [openNovel, setOpenNovel] = useState<Novel | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const positioned = useMemo(
    () => novels.map((novel, i) => ({ novel, pos: hashPosition(novel._id, i, novels.length) })),
    [novels]
  );

  useEffect(() => {
    const openId = searchParams.get("open");
    if (!openId) return;
    const match = novels.find((n) => n._id === openId);
    if (match) setOpenNovel(match);
  }, [searchParams, novels]);

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
            {isLocked(novel) && <span className="novel-orb-lock">🔒</span>}
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

            {isLocked(openNovel) && openNovel.nextUpdateAt && (
              <div className="locked-chapter-banner">
                <span className="locked-chapter-icon">🔒</span>
                <div>
                  <p className="locked-chapter-title">Next chapter locked</p>
                  <p className="locked-chapter-sub">
                    Opens {formatUnlockDate(openNovel.nextUpdateAt)} — {formatCountdown(openNovel.nextUpdateAt)}
                  </p>
                </div>
              </div>
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

            <div style={{ marginTop: "14px" }}>
              <ShareCardButton
                title={openNovel.title}
                body={[openNovel.logline, openNovel.originStory].filter(Boolean).join("\n\n")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
