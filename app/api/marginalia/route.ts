import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // 5 notes per 10 minutes per IP
    if (isRateLimited(`marginalia:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many notes left recently — please try again later." },
        { status: 429 }
      );
    }

    const { note, targetType, targetId, website } = await request.json();

    // Honeypot — silently accept without creating anything
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!note || typeof note !== "string" || !note.trim()) {
      return NextResponse.json({ error: "Write something first." }, { status: 400 });
    }
    if (note.length > 140) {
      return NextResponse.json({ error: "That note is a bit too long." }, { status: 400 });
    }
    if (targetType !== "poem" && targetType !== "diaryEntry") {
      return NextResponse.json({ error: "Invalid target." }, { status: 400 });
    }
    if (!targetId || typeof targetId !== "string") {
      return NextResponse.json({ error: "Invalid target." }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.error("Marginalia: missing SANITY_API_TOKEN");
      return NextResponse.json({ error: "Notes aren't set up yet." }, { status: 500 });
    }

    const doc = await writeClient.create({
      _type: "marginaliaNote",
      note: note.trim().slice(0, 140),
      targetType,
      targetId,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, note: doc });
  } catch (err) {
    console.error("Marginalia route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
