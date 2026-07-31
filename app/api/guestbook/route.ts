import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // 3 lights per 10 minutes per IP — leaving a light is a one-time
    // gesture, not something a real visitor needs to repeat rapidly
    if (isRateLimited(`guestbook:${ip}`, 3, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many lights left recently — please try again later." },
        { status: 429 }
      );
    }

    const { note, website } = await request.json();

    // Honeypot: hidden field real visitors never fill in. Silently accept
    // (without actually creating anything) rather than error, so bots
    // don't learn the check exists.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

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
