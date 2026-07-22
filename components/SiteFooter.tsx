export default function SiteFooter() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 5,
        textAlign: "center",
        padding: "70px 6vw 50px",
        fontSize: "13px",
        color: "var(--ink-soft)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        style={{ margin: "0 auto 20px", display: "block", opacity: 0.6 }}
      >
        <path
          d="M2 10 Q 15 2, 30 10 T 58 10"
          fill="none"
          stroke="var(--moss)"
          strokeWidth="1.2"
        />
        <circle cx="30" cy="10" r="2" fill="var(--gold)" />
      </svg>

      <p>
        small hours — a study kept by{" "}
        <span className="display" style={{ fontStyle: "italic", color: "var(--ink)" }}>
          Rencey
        </span>
      </p>
      <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.75 }}>
        © {new Date().getFullYear()}. Novels continued on{" "}
        <a
          href="https://www.wattpad.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ink-soft)" }}
        >
          Wattpad
        </a>
        .
      </p>
    </footer>
  );
}
