import Link from "next/link";
import { getNovels } from "@/lib/sanity/queries";
import NovelCard from "@/components/NovelCard";

// Revalidate every hour so new content from Sanity shows up
// without needing a full redeploy
export const revalidate = 3600;

export default async function Home() {
  const novels = await getNovels();

  return (
    <main>
      <header
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 6vw",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--moss)",
            marginBottom: "22px",
          }}
        >
          a writer&apos;s collection
        </div>
        <h1 className="display" style={{ fontSize: "clamp(48px, 9vw, 108px)", fontWeight: 500, lineHeight: 0.98 }}>
          stories kept in
          <br />
          <em style={{ color: "var(--gold)" }}>quiet hours</em>
        </h1>
        <p style={{ marginTop: "26px", maxWidth: "480px", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-soft)" }}>
          Novels, poems, and small true things — written slowly, and kept here like pressed
          flowers between pages.
        </p>
      </header>

      <section id="novels" style={{ padding: "130px 6vw" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "56px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "22px",
          }}
        >
          <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400 }}>Novels</h2>
          <span style={{ fontSize: "13px", color: "var(--ink-soft)" }}>full chapters live on Wattpad</span>
        </div>

        {novels.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>
            No novels published yet — add one in the Sanity Studio and it&apos;ll show up here.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "44px",
            }}
          >
            {novels.map((novel) => (
              <NovelCard key={novel._id} novel={novel} />
            ))}
          </div>
        )}
      </section>

      <section style={{ padding: "0 6vw 130px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "var(--line)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <PreviewPanel href="/poetry" num="Poetry" title="short lines, held gently" text="A growing collection of poems — some finished, some just a good first line waiting for the rest." />
          <PreviewPanel href="/diary" num="Diary" title="not everything, but something true" text="Reflections and fragments, posted when they're ready to be read rather than when they're written." />
          <PreviewPanel href="/photos" num="Photographs" title="the light that started it" text="Images that inspired a page, a line, or a whole quiet afternoon." />
        </div>
      </section>
    </main>
  );
}

function PreviewPanel({
  href,
  num,
  title,
  text,
}: {
  href: string;
  num: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      style={{
        background: "var(--paper)",
        padding: "44px 34px",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span style={{ fontSize: "12px", color: "var(--moss)", letterSpacing: "0.1em" }}>{num}</span>
      <div>
        <h3 className="display" style={{ fontStyle: "italic", fontSize: "24px", marginTop: "18px" }}>
          {title}
        </h3>
        <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "10px", lineHeight: 1.6 }}>
          {text}
        </p>
      </div>
    </Link>
  );
}
