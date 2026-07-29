import { getNovels } from "@/lib/sanity/queries";
import NovelConstellation from "@/components/NovelConstellation";

export const revalidate = 3600;

export default async function NovelsPage() {
  const novels = await getNovels();

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
            Novels
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "10px" }}>
            full chapters live on Wattpad — click a world to open it
          </p>
        </div>

        {novels.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", padding: "40px 0 100px" }}>
            No novels published yet — add one in the Sanity Studio and it&apos;ll show up here.
          </p>
        ) : (
          <NovelConstellation novels={novels} />
        )}
      </section>
    </main>
  );
}
