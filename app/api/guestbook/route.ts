import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";

export async function POST(request: Request) {
  try {
    const { note } = await request.json();

    if (note && typeof note === "string" && note.length > 140) {
      return NextResponse.json({ error: "That note is a bit too long." }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.error("Guestbook: missing SANITY_API_TOKEN");
      return NextResponse.json(
        { error: "The guestbook isn't fully set up yet." },
        { status: 500 }
      );
    }

    const doc = await writeClient.create({
      _type: "light",
      note: note ? note.trim().slice(0, 140) : undefined,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, light: doc });
  } catch (err) {
    console.error("Guestbook route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
