import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import SectionTitle from "../components/SectionTitle";
import { articles, writingPlatforms } from "../content";
import { listPublishedPosts, tagsOf } from "../lib/store";
import PostList from "../components/PostList";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical articles on AI, machine learning and building in public.",
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default async function WritingPage() {
  await connection();
  const posts = await listPublishedPosts();
  const tags = tagsOf(posts);

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionTitle kicker="Writing" as="h1">
        Articles
      </SectionTitle>
      <p className="-mt-6 max-w-2xl text-lg leading-relaxed" data-reveal>
        Technical writing on machine learning, agents and building products. Newer pieces are published here; older
        ones live on dev.to.
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {writingPlatforms.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="btn-lift rounded-full border-2 border-foreground bg-card px-4 py-1.5 text-sm font-bold"
            >
              {p.name} ↗
            </a>
          </li>
        ))}
        <li>
          <a
            href="/feed.xml"
            className="btn-lift rounded-full border-2 border-foreground bg-card px-4 py-1.5 text-sm font-bold"
          >
            RSS feed
          </a>
        </li>
      </ul>

      <section className="mt-14">
        <h2 className="mb-6 font-serif text-3xl">On this site</h2>

        {tags.length > 0 && (
          <ul className="mb-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t.tag}>
                <Link
                  href={`/writing/tag/${t.tag}`}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-onaccent transition hover:bg-mustard hover:text-ink"
                >
                  #{t.tag} <span className="opacity-60">{t.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {posts.length > 0 ? <PostList posts={posts} /> : (
          <p className="border-2 border-dashed border-foreground p-8 text-muted">
            Articles published directly on this site will appear here. The first ones are on their way. In the
            meantime, everything I&apos;ve written so far is listed below.
          </p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="mb-6 font-serif text-3xl">Elsewhere</h2>
        <ul className="divide-y-2 divide-foreground border-y-2 border-foreground">
          {articles.map((a, i) => (
            <li key={i}>
              <a href={a.href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-4 py-4">
                <span className="font-medium transition group-hover:text-accent">{a.title}</span>
                <span className="shrink-0 text-sm text-muted">
                  {a.platform}
                  {a.date ? ` · ${a.date}` : ""} ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Looking for research papers and features?{" "}
          <Link href="/press" className="font-bold text-accent2 underline underline-offset-4">
            See press &amp; papers
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
