"use client";

import { useState } from "react";
import type { MarginaliaNote } from "@/lib/sanity/queries";

// Deterministic small tilt per note so they read as scattered scribbles
// rather than a tidy list, but don't jump around on re-render.
function tiltFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 13) - 6; // -6deg to +6deg
}

export default function MarginaliaNotes({
  targetType,
  targetId,
  initialNotes,
}: {
  targetType: "poem" | "diaryEntry";
  targetId: string;
  initialNotes: MarginaliaNote[];
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [showForm, setShowForm] = useState(false);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/marginalia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note.trim(), targetType, targetId, website }),
      });
      const data = await res.json();

      if (res.ok && data.note) {
        setNotes((prev) => [...prev, data.note]);
        setNote("");
        setShowForm(false);
      }
    } catch {
      // leaving a note is low-stakes — fail quietly
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="marginalia">
      {notes.length > 0 && (
        <div className="marginalia-notes">
          {notes.map((n) => (
            <span key={n._id} className="marginalia-note" style={{ transform: `rotate(${tiltFor(n._id)}deg)` }}>
              {n.note}
            </span>
          ))}
        </div>
      )}

      {!showForm ? (
        <button className="marginalia-add-btn" onClick={() => setShowForm(true)}>
          + scribble a note
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="marginalia-form">
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
            placeholder="leave a little note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={140}
            autoFocus
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "..." : "leave it"}
          </button>
        </form>
      )}
    </div>
  );
}
