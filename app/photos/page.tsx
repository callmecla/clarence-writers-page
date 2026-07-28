import { getPhotos } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import TiltPhoto from "@/components/TiltPhoto";

export const revalidate = 3600;

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <main style={{ paddingTop: "160px" }}>
      <section style={{ padding: "0 6vw 130px" }}>
        <div
          style={{
            marginBottom: "56px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "22px",
          }}
        >
          <h1 className="display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400 }}>
            Photographs
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "10px" }}>
            the light that started it
          </p>
        </div>

        {photos.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>
            No photographs published yet — add one in the Sanity Studio and it&apos;ll show up here.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {photos.map((photo) => (
              <TiltPhoto
                key={photo._id}
                src={urlForImage(photo.image).width(700).height(875).url()}
                alt={photo.caption || "Photograph"}
                caption={photo.caption}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
