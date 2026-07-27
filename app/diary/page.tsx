import { getDiaryEntries } from "@/lib/sanity/queries";
import DiaryEntries from "@/components/DiaryEntries";

export const revalidate = 3600;

export default async function DiaryPage() {
  const entries = await getDiaryEntries();

  return (
    <main style={{ paddingTop: "160px" }}>
      <section style={{ padding: "0 6vw 130px", maxWidth: "1040px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "40px",
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
          <DiaryEntries entries={entries} />
        )}
      </section>
    </main>
  );
}
