"use client";

import { useEffect, useState } from "react";

export default function TypewriterText({
  text,
  speed = 35,
  charsPerTick = 2,
}: {
  text: string;
  speed?: number;
  charsPerTick?: number;
}) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    let i = 0;
    const interval = window.setInterval(() => {
      i += charsPerTick;
      setVisibleChars(Math.min(i, text.length));
      if (i >= text.length) window.clearInterval(interval);
    }, speed);
    return () => window.clearInterval(interval);
  }, [text, speed, charsPerTick]);

  const done = visibleChars >= text.length;

  return (
    <>
      {text.slice(0, visibleChars)}
      {!done && <span className="typewriter-cursor">▍</span>}
    </>
  );
}
