import type { Novel } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import Image from "next/image";

export default function NovelCard({ novel }: { novel: Novel }) {
  return (
    <div
      className="novel-card"
      style={{
        background: "var(--paper)",
        border: "1px solid var(--paper-edge)",
        borderRadius: "6px",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        className="novel-cover"
        style={{
          aspectRatio: "3 / 4.4",
          borderRadius: "3px",
          position: "relative",
          overflow: "hidden",
          background: "var(--moss)",
        }}
      >
        {novel.cover && (
          <Image
            src={urlForImage(novel.cover).width(600).height(880).url()}
            alt={novel.title}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <span className="page-curl" />
      </div>

      {novel.genre && (
        <span
          style={{
            alignSelf: "flex-start",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--moss)",
            border: "1px solid var(--moss)",
            borderRadius: "100px",
            padding: "4px 12px",
          }}
        >
          {novel.genre}
        </span>
      )}

      <h3 className="display" style={{ fontSize: "22px" }}>
        {novel.title}
      </h3>

      {novel.logline && (
        <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "var(--ink-soft)", flexGrow: 1 }}>
          {novel.logline}
        </p>
      )}

      <a
        href={novel.wattpadUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "13.5px",
          color: "var(--ink)",
          textDecoration: "none",
          paddingTop: "6px",
          borderTop: "1px solid var(--line)",
        }}
      >
        Read on Wattpad →
      </a>
    </div>
  );
}
