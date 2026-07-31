"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real visitors never see/fill this
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--paper-edge)",
          borderRadius: "6px",
          padding: "34px",
          textAlign: "center",
        }}
      >
        <p className="display" style={{ fontStyle: "italic", fontSize: "20px", marginBottom: "8px" }}>
          Thank you for writing.
        </p>
        <p style={{ color: "var(--ink-soft)", fontSize: "14.5px" }}>
          Your message has been sent — I&apos;ll read it soon.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "4px",
    border: "1px solid var(--paper-edge)",
    background: "var(--paper)",
    color: "var(--ink)",
    fontFamily: "inherit",
    fontSize: "14.5px",
    outline: "none",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "480px",
      }}
    >
      {/* Honeypot field — invisible to real visitors, tabIndex/autoComplete
          off so it's skipped by keyboard nav and browser autofill, but
          bots that blindly fill every input will trip it. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <textarea
        placeholder="Say hello..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
      />

      {status === "error" && (
        <p style={{ color: "var(--gold)", fontSize: "13.5px" }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          alignSelf: "flex-start",
          padding: "12px 28px",
          borderRadius: "999px",
          border: "1px solid var(--ink)",
          background: status === "sending" ? "var(--paper-edge)" : "var(--ink)",
          color: status === "sending" ? "var(--ink-soft)" : "var(--paper)",
          fontFamily: "inherit",
          fontSize: "14px",
          letterSpacing: "0.02em",
          cursor: status === "sending" ? "default" : "pointer",
          transition: "background 0.3s ease, color 0.3s ease",
        }}
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
