import { NextResponse } from "next/server";
import { Resend } from "resend";

// Lazily create the client so the app doesn't crash at build time if the
// env var isn't set yet — it only actually needs to exist when someone submits.
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and a message." },
        { status: 400 }
      );
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
