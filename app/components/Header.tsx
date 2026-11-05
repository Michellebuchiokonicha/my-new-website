import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "../content";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#awards", label: "Awards" },
  { href: "/gallery", label: "Gallery" },
  { href: "/writing", label: "Writing" },
  { href: "/press", label: "Press" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="min-w-0 truncate font-serif text-lg leading-none sm:text-2xl">
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex shrink-0 items-center gap-4">
          <ul className="hidden gap-5 text-sm font-medium lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="ulink pb-0.5">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <details className="group relative lg:hidden">
            <summary
              aria-label="Open menu"
              className="btn-lift flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border-2 border-foreground bg-card [&::-webkit-details-marker]:hidden"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <ul className="absolute right-0 mt-3 w-56 rounded-2xl border-2 border-foreground bg-card p-2 text-base shadow-[6px_6px_0_var(--foreground)]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded-lg px-3 py-2 font-medium hover:bg-mustard hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
