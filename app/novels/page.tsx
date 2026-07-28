import { getNovels } from "@/lib/sanity/queries";
import NovelCard from "@/components/NovelCard";

export const revalidate = 3600;

export default async function NovelsPage() {
  const novels = await getNovels();

  return (
    <main style={{ paddingTop: "160px" }}>
      <section style={{ padding: "0 6vw 130px", maxWidth: "1040px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "56px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "22px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h1 className="display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400 }}>
            Novels
          </h1>
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
    </main>
  );
}
