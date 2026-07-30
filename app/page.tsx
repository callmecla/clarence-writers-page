import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <main>
      <header
        style={{
          minHeight: "82vh",
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

      <section style={{ padding: "0 6vw 24px", maxWidth: "1040px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          — find your way in —
        </p>
      </section>

      <section style={{ padding: "0 6vw 30px", maxWidth: "1040px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <HomeTile
            href="/novels"
            accent="#e3a76f"
            title="Novels"
            tagline="stories, chapter by chapter"
            text="Full-length novels, with chapters continued on Wattpad."
            icon={
              <path d="M4 4.5c4 0 6 1 8 2.5 2-1.5 4-2.5 8-2.5v14c-4 0-6 1-8 2.5-2-1.5-4-2.5-8-2.5V4.5Z" />
            }
          />
          <HomeTile
            href="/poetry"
            accent="#b98fd1"
            title="Poetry"
            tagline="short lines, held gently"
            text="A growing collection of poems — click a star to read one."
            icon={<path d="M12 2.5l2.1 6.6h6.9l-5.6 4 2.1 6.6-5.5-4-5.5 4 2.1-6.6-5.6-4h6.9L12 2.5Z" />}
          />
          <HomeTile
            href="/diary"
            accent="#e8b93f"
            title="Diary"
            tagline="not everything, but something true"
            text="Reflections and fragments, posted when they're ready."
            icon={
              <path d="M5 3.5h11a3 3 0 0 1 3 3v13a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-11a2.5 2.5 0 0 1 2-2.4Zm0 0V19" />
            }
          />
          <HomeTile
            href="/photos"
            accent="#d98c3f"
            title="Photographs"
            tagline="the light that started it"
            text="Images that inspired a page, a line, or a quiet afternoon."
            icon={
              <>
                <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v10A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-10Z" />
                <circle cx="12" cy="13" r="3.4" />
              </>
            }
          />
        </div>
      </section>

      <section style={{ padding: "10px 6vw 140px", maxWidth: "1040px", margin: "0 auto" }}>
        <Link
          href="/about"
          className="home-tile"
          style={
            {
              "--accent": "#c98fa0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
              background: "var(--paper)",
              borderRadius: "10px",
              padding: "28px 32px",
              textDecoration: "none",
              color: "inherit",
            } as React.CSSProperties
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                flexShrink: 0,
                background: "linear-gradient(160deg, #c98fa0 0%, #e3a76f 100%)",
              }}
            />
            <div>
              <p className="display" style={{ fontStyle: "italic", fontSize: "18px" }}>
                a little about the one writing
              </p>
              <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "3px" }}>
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

function HomeTile({
  href,
  accent,
  title,
  tagline,
  text,
  icon,
}: {
  href: string;
  accent: string;
  title: string;
  tagline: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="home-tile"
      style={
        {
          "--accent": accent,
          background: "var(--paper)",
          borderRadius: "10px",
          padding: "30px 26px",
          display: "flex",
          flexDirection: "column",
          textDecoration: "none",
          color: "inherit",
        } as React.CSSProperties
      }
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: "18px" }}
      >
        {icon}
      </svg>
      <span style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: accent }}>
        {title}
      </span>
      <h3 className="display" style={{ fontStyle: "italic", fontSize: "21px", marginTop: "10px" }}>
        {tagline}
      </h3>
      <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "10px", lineHeight: 1.6, flexGrow: 1 }}>
        {text}
      </p>
    </Link>
  );
}
