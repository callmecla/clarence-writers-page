// A template.tsx (unlike layout.tsx) remounts every time you navigate to a
// new route, so the CSS animation below plays fresh on every page change —
// giving a soft "dissolve in" transition without needing any extra library.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
