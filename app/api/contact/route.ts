import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";

// Lazily create the client so the app doesn't crash at build time if the
// env var isn't set yet — it only actually needs to exist when someone submits.
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // 5 messages per 10 minutes per IP — generous for a real visitor,
    // tight enough to stop a script from hammering the endpoint
    if (isRateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many messages sent recently — please try again in a little while." },
        { status: 429 }
      );
    }

    const { name, email, message, website } = await request.json();

    // Honeypot: a hidden field real visitors never see or fill in. Bots that
    // auto-fill every field on a form will trip this. Return a generic
    // success response rather than an error, so bots don't learn it exists.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and a message." },
        { status: 400 }
      );
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "That doesn't look like a valid email." }, { status: 400 });
    }
    if (String(name).length > 100 || String(message).length > 3000) {
      return NextResponse.json({ error: "That message is a bit too long." }, { status: 400 });
    }

    const resend = getResendClient();
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resend || !toEmail) {
      console.error("Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { error: "The contact form isn't fully set up yet. Please try again later." },
        { status: 500 }
      );
    }

    // Resend's shared "onboarding@resend.dev" address works without verifying
    // a custom domain, as long as it's sending TO the Resend account's own
    // verified email — which is exactly this use case (a message to yourself).
    const { error } = await resend.emails.send({
      from: "hello, rencey! <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New message from ${name} — hello, rencey!`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
