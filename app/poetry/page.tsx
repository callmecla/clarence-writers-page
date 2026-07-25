import { getPoems } from "@/lib/sanity/queries";

export const revalidate = 3600;

export default async function PoetryPage() {
  const poems = await getPoems();

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
            Poetry
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "10px" }}>
            short lines, held gently
          </p>
        </div>

        {poems.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>
            No poems published yet — add one in the Sanity Studio and it&apos;ll show up here.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "64px", maxWidth: "700px" }}>
            {poems.map((poem) => (
              <article key={poem._id}>
                <h2 className="display" style={{ fontStyle: "italic", fontSize: "26px", marginBottom: "6px" }}>
                  {poem.title}
                </h2>
                {poem.publishedAt && (
                  <p style={{ fontSize: "12px", color: "var(--moss)", marginBottom: "18px" }}>
                    {new Date(poem.publishedAt).toLocaleDateString("en-US", {
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
                  {poem.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
