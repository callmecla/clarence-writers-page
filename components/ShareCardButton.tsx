"use client";

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#333";
}

export async function downloadQuoteCard({
  title,
  body,
  signature = "hello, rencey!",
}: {
  title: string;
  body: string;
  signature?: string;
}) {
  const width = 1080;
  const height = 1350; // 4:5, works well for both Instagram and Pinterest

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const skyTop = cssVar("--sky-top");
  const skyBottom = cssVar("--paper");
  const ink = cssVar("--ink");
  const inkSoft = cssVar("--ink-soft");
  const gold = cssVar("--gold");

  // background
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, skyTop);
  grad.addColorStop(1, skyBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // soft decorative border
  ctx.strokeStyle = gold;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, width - 96, height - 96);
  ctx.globalAlpha = 1;

  const maxTextWidth = width - 200;
  let y = height * 0.32;

  // title
  ctx.fillStyle = gold;
  ctx.font = "italic 52px Georgia, serif";
  ctx.textAlign = "center";
  const titleLines = wrapText(ctx, title, maxTextWidth);
  titleLines.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 64;
  });

  y += 40;

  // body
  ctx.fillStyle = ink;
  ctx.font = "36px Georgia, serif";
  const bodyLines = body.split("\n").flatMap((paragraph) =>
    paragraph.trim() ? wrapText(ctx, paragraph, maxTextWidth) : [""]
  );
  const maxBodyLines = 14;
  const shown = bodyLines.slice(0, maxBodyLines);
  shown.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 50;
  });
  if (bodyLines.length > maxBodyLines) {
    ctx.fillText("…", width / 2, y);
  }

  // signature
  ctx.fillStyle = inkSoft;
  ctx.font = "italic 30px Georgia, serif";
  ctx.fillText(signature, width / 2, height - 90);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export default function ShareCardButton({ title, body }: { title: string; body: string }) {
  return (
    <button
      type="button"
      className="share-card-btn"
      onClick={() => downloadQuoteCard({ title, body })}
    >
      🖼 save as image
    </button>
  );
}
