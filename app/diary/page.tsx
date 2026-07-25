import { PortableText } from "@portabletext/react";
import { getDiaryEntries } from "@/lib/sanity/queries";

export const revalidate = 3600;

export default async function DiaryPage() {
  const entries = await getDiaryEntries();

  return (
    <main style={{ paddingTop: "160px" }}>
      <section style={{ padding: "0 6vw 130px", maxWidth: "1040px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "56px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "22px",
          }}
        >
          <h1 className="display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400 }}>
            Diary
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "10px" }}>
            not everything, but something true
          </p>
        </div>

        {entries.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>
            No entries published yet — add one in the Sanity Studio and it&apos;ll show up here.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "70px", maxWidth: "700px" }}>
            {entries.map((entry) => (
              <article
                key={entry._id}
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
        )}
      </section>
    </main>
  );
}
