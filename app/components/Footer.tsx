"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "../content";

export default function Footer() {
  const home = usePathname() === "/";
  return (
    <footer className="bg-footerbg text-footerfg">
      {!home && (
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pt-14 sm:px-8">
          <p className="font-serif text-4xl sm:text-6xl">
            Say <em className="text-mustard">hello.</em>
          </p>
          <a href={`mailto:${site.email}`} className="ulink w-fit break-all text-lg sm:text-2xl">
            {site.email}
          </a>
        </div>
      )}
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-footermuted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><Link href="/writing" className="ulink">Writing</Link></li>
          <li><Link href="/gallery" className="ulink">Gallery</Link></li>
          <li><Link href="/press" className="ulink">Press</Link></li>
          <li><a href="/feed.xml" className="ulink">RSS</a></li>
          {site.socials.slice(0, 2).map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="ulink">{s.label} ↗</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
