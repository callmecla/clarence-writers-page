import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 6vw",
        backdropFilter: "blur(6px)",
      }}
    >
      <Link
        href="/"
        className="display"
        style={{
          fontStyle: "italic",
          fontSize: "20px",
          letterSpacing: "0.02em",
          color: "var(--ink)",
          textDecoration: "none",
        }}
      >
        hello, rencey!
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "34px" }}>
        <ul
          style={{
            display: "flex",
            gap: "30px",
            listStyle: "none",
          }}
          className="site-nav-links"
        >
          <li><NavLink href="/">Home</NavLink></li>
          <li><NavLink href="/novels">Novels</NavLink></li>
          <li><NavLink href="/poetry">Poetry</NavLink></li>
          <li><NavLink href="/diary">Diary</NavLink></li>
          <li><NavLink href="/photos">Photographs</NavLink></li>
          <li><NavLink href="/about">About</NavLink></li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--ink-soft)",
        textDecoration: "none",
        fontSize: "14px",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </Link>
  );
}
