"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/lib/sanity/client";
import type { ContentRef } from "@/lib/sanity/queries";

const SECTION_PATH: Record<ContentRef["_type"], string> = {
  novel: "/novels",
  poem: "/poetry",
  diaryEntry: "/diary",
  photo: "/photos",
};

export default function SurpriseButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const refs: ContentRef[] = await client.fetch(
        `*[
          (_type == "novel" && published == true) ||
          (_type == "poem" && isDraft != true) ||
          _type == "diaryEntry" ||
          _type == "photo"
        ]{ _type, _id }`
      );

      if (refs.length === 0) {
        router.push("/");
        return;
      }

      const pick = refs[Math.floor(Math.random() * refs.length)];
      router.push(`${SECTION_PATH[pick._type]}?open=${pick._id}`);
    } catch {
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="surprise-btn" onClick={handleClick} disabled={loading} title="Take me somewhere">
      {loading ? "..." : "✨ surprise me"}
    </button>
  );
}
