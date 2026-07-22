import Image from "next/image";
import { getPhotos } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";

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
              <figure key={photo._id} style={{ margin: 0 }}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--paper)",
                  }}
                >
                  <Image
                    src={urlForImage(photo.image).width(700).height(875).url()}
                    alt={photo.caption || "Photograph"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {photo.caption && (
                  <figcaption
                    style={{
                      marginTop: "10px",
                      fontSize: "13.5px",
                      color: "var(--ink-soft)",
                      fontStyle: "italic",
                    }}
                  >
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
