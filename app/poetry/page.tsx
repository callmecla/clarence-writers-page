import { getPoems, getMarginaliaNotes } from "@/lib/sanity/queries";
import PoetryConstellation from "@/components/PoetryConstellation";

export const revalidate = 3600;

export default async function PoetryPage() {
  const [poems, notes] = await Promise.all([getPoems(), getMarginaliaNotes()]);

  return (
    <main style={{ paddingTop: "160px" }}>
      <section style={{ padding: "0 6vw 60px", maxWidth: "1040px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "22px",
          }}
        >
          <h1 className="display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400 }}>
            Poetry
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "10px" }}>
            short lines, held gently — click a star to read one
          </p>
        </div>

        {poems.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", padding: "40px 0 100px" }}>
            No poems published yet — add one in the Sanity Studio and it&apos;ll show up here.
          </p>
        ) : (
          <PoetryConstellation poems={poems} notes={notes.filter((n) => n.targetType === "poem")} />
        )}
      </section>
    </main>
  );
}
