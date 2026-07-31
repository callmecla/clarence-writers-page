"use client";

import { useState } from "react";
import type { Light } from "@/lib/sanity/queries";

export default function Guestbook({ initialLights }: { initialLights: Light[] }) {
  const [lights, setLights] = useState(initialLights);
  const [showForm, setShowForm] = useState(false);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real visitors never see/fill this
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cooldown) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note.trim() || undefined, website }),
      });
      const data = await res.json();

      if (res.ok && data.light) {
        setLights((prev) => [data.light, ...prev]);
        setNote("");
        setShowForm(false);
        setCooldown(true);
        window.setTimeout(() => setCooldown(false), 8000); // gentle anti-spam
      }
    } catch {
      // fail quietly — leaving a light is a low-stakes action
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <button
          className="light-toggle-btn"
          onClick={() => setShowForm((v) => !v)}
          disabled={cooldown}
        >
          ✨ leave a light
        </button>
        <p style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
          {lights.length > 0
            ? `${lights.length} ${lights.length === 1 ? "light" : "lights"} left so far`
            : "be the first to leave one"}
        </p>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="light-form">
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
            placeholder="a short note, if you'd like (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={140}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "..." : "leave it"}
          </button>
        </form>
      )}

      {lights.length > 0 && (
        <div className="lights-field">
          {lights.map((light) => (
            <span
              key={light._id}
              className="left-light"
              onMouseEnter={() => setHoveredId(light._id)}
              onMouseLeave={() => setHoveredId((id) => (id === light._id ? null : id))}
            >
              {hoveredId === light._id && light.note && (
                <span className="light-note-tooltip">{light.note}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
