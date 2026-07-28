// Replace these href values with your real profile URLs.
const SOCIALS = [
  { label: "Facebook", short: "f", href: "https://facebook.com/your-page" },
  { label: "Instagram", short: "ig", href: "https://instagram.com/your-handle" },
  { label: "Medium", short: "m", href: "https://medium.com/@your-handle" },
  { label: "Pinterest", short: "p", href: "https://pinterest.com/your-handle" },
  { label: "Wattpad", short: "w", href: "https://wattpad.com/user/your-handle" },
];

export default function SocialLinks() {
  return (
    <div className="social-links">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-pill"
          aria-label={s.label}
          title={s.label}
        >
          {s.short}
        </a>
      ))}
    </div>
  );
}
