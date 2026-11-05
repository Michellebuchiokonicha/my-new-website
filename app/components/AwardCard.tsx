import Image from "next/image";
import type { Award } from "../content";
import { awardImageExists } from "../lib/gallery";

const tilts = ["-2.2deg", "1.8deg", "-1.2deg", "2.4deg"];
const tapes = ["bg-mustard", "bg-accent", "bg-accent2", "bg-mustard"];

export default function AwardCard({ a, i = 0 }: { a: Award; i?: number }) {
  const hasImage = awardImageExists(a.image);
  return (
    <article
      data-reveal="tilt"
      style={{ ["--r" as string]: tilts[i % 4], ["--d" as string]: `${(i % 2) * 120}ms` }}
      className="relative border-2 border-foreground bg-card p-4 pb-6 shadow-[8px_8px_0_var(--foreground)]"
    >
      <span aria-hidden="true" className={`absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 opacity-90 ${tapes[i % 4]}`} />
      <div className="relative aspect-[4/3] border-2 border-foreground bg-paper2">
        {hasImage ? (
          <Image src={a.image} alt={`${a.title}, ${a.org} ${a.year}`} fill sizes="(min-width:768px) 45vw, 100vw" className="object-contain" />
        ) : (
          // No photo yet (add one at public{a.image}): show a typographic tile instead of an empty frame.
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <span aria-hidden="true" className="font-serif text-6xl leading-none text-accent">★</span>
            <span className="font-serif text-2xl leading-tight">{a.org}</span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{a.year}</span>
          </div>
        )}
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
        {a.org} · {a.year}
      </p>
      <h3 className="mt-1 font-serif text-2xl leading-tight">{a.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
    </article>
  );
}
