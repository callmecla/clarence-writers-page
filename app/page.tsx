import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <main>
      <header
        style={{
          minHeight: "88vh",
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
        <div style={{ marginTop: "34px" }}>
          <SocialLinks />
        </div>
      </header>

      <section style={{ padding: "0 6vw 60px", maxWidth: "1040px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2px",
            background: "var(--line)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <PreviewPanel href="/novels" num="Novels" title="stories, chapter by chapter" text="Full-length novels, with chapters continued on Wattpad." />
          <PreviewPanel href="/poetry" num="Poetry" title="short lines, held gently" text="A growing collection of poems — click a star to read one." />
          <PreviewPanel href="/diary" num="Diary" title="not everything, but something true" text="Reflections and fragments, posted when they're ready." />
          <PreviewPanel href="/photos" num="Photographs" title="the light that started it" text="Images that inspired a page, a line, or a quiet afternoon." />
        </div>
      </section>

      <section style={{ padding: "0 6vw 140px", maxWidth: "1040px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <Link
          href="/about"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            background: "var(--paper)",
            border: "1px solid var(--paper-edge)",
            borderRadius: "6px",
            padding: "30px 34px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                flexShrink: 0,
                background: "linear-gradient(160deg, var(--moss) 0%, var(--gold) 100%)",
              }}
            />
            <div>
              <p className="display" style={{ fontStyle: "italic", fontSize: "19px" }}>
                a little about the one writing
              </p>
              <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "4px" }}>
                Who&apos;s behind these pages, and a way to say hello.
              </p>
            </div>
          </div>
          <span style={{ fontSize: "13.5px", color: "var(--ink)", whiteSpace: "nowrap" }}>Meet the writer →</span>
        </Link>
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
        padding: "40px 30px",
        minHeight: "210px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span style={{ fontSize: "12px", color: "var(--moss)", letterSpacing: "0.1em" }}>{num}</span>
      <div>
        <h3 className="display" style={{ fontStyle: "italic", fontSize: "22px", marginTop: "16px" }}>
          {title}
        </h3>
        <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "10px", lineHeight: 1.6 }}>
          {text}
        </p>
      </div>
    </Link>
  );
}
