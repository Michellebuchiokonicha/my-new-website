import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Error 404</p>
      <h1 className="mt-3 font-serif text-[clamp(4rem,16vw,10rem)] leading-[0.9]">
        Lost <em className="text-accent">page.</em>
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">That page has wandered off. Let&apos;s get you somewhere real.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-lift rounded-full border-2 border-foreground bg-accent px-6 py-3 text-sm font-bold text-onaccent">Home</Link>
        <Link href="/writing" className="btn-lift rounded-full border-2 border-foreground bg-card px-6 py-3 text-sm font-bold">Writing</Link>
        <Link href="/gallery" className="btn-lift rounded-full border-2 border-foreground bg-card px-6 py-3 text-sm font-bold">Gallery</Link>
      </div>
    </main>
  );
}
