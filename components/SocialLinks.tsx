// Replace these href values with your real profile URLs.
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/your-page",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.98 3.03 15.03 3 13.92 3c-2.32 0-3.92 1.42-3.92 4.02v2.58H7.24v3.2h2.76V21h3.5Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/your-handle",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Medium",
    href: "https://medium.com/@your-handle",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="6.5" cy="12" r="4.5" />
        <ellipse cx="15" cy="12" rx="3" ry="4.5" />
        <ellipse cx="20.5" cy="12" rx="1.3" ry="4.2" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/your-handle",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 4.03 2.5 7.47 6.04 8.86-.08-.75-.16-1.9.03-2.72.17-.74 1.1-4.7 1.1-4.7s-.28-.56-.28-1.38c0-1.3.75-2.26 1.69-2.26.8 0 1.18.6 1.18 1.32 0 .8-.51 2-.78 3.1-.22.93.47 1.68 1.38 1.68 1.66 0 2.94-1.75 2.94-4.28 0-2.24-1.61-3.8-3.9-3.8-2.66 0-4.22 1.99-4.22 4.05 0 .8.31 1.66.7 2.13a.28.28 0 0 1 .06.27c-.07.29-.23.93-.26 1.06-.04.17-.14.21-.32.13-1.2-.56-1.95-2.3-1.95-3.71 0-3.02 2.2-5.8 6.33-5.8 3.32 0 5.9 2.37 5.9 5.53 0 3.3-2.08 5.96-4.97 5.96-.97 0-1.88-.5-2.19-1.1l-.6 2.27c-.21.83-.8 1.87-1.19 2.5.9.28 1.85.43 2.84.43 5.25 0 9.5-4.25 9.5-9.5s-4.25-9.5-9.5-9.5Z" />
      </svg>
    ),
  },
  {
    label: "Wattpad",
    href: "https://wattpad.com/user/your-handle",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 5.5c1.7 0 2.6 1.1 3 2.7l1.8 7.7L9.9 6.3c.35-1.5 1.15-2.6 2.75-2.6s2.4 1.1 2.75 2.6l2.1 8.1 1.8-7.7c.4-1.6 1.3-2.7 3-2.7v1.7c-.6.1-.9.45-1.15 1.4L18.4 19h-2.7l-2.5-9.5c-.18-.6-.35-.9-.6-.9s-.42.3-.6.9L9.5 19H6.8L3.5 8.6c-.25-.95-.55-1.3-1.15-1.4V5.5Z" />
      </svg>
    ),
  },
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
          {s.icon}
        </a>
      ))}
    </div>
  );
}
