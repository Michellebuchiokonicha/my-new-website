import Image from "next/image";
import Link from "next/link";
import type { Post } from "../lib/store";
import { formatDate, readingTime } from "../lib/text";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-12">
      {posts.map((p, i) => (
        <li key={p.slug} data-reveal style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
          <article className="group grid gap-5 sm:grid-cols-[220px_1fr]">
            {p.coverImage && (
              <Link
                href={`/writing/${p.slug}`}
                aria-label={p.title}
                className="relative block aspect-[2/1] overflow-hidden border-2 border-foreground shadow-[5px_5px_0_var(--foreground)] transition group-hover:-translate-y-1 sm:aspect-[4/3]"
              >
                <Image src={p.coverImage} alt="" fill sizes="(min-width:640px) 220px, 100vw" className="object-cover" />
              </Link>
            )}
            <div className={p.coverImage ? "" : "sm:col-span-2"}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {formatDate(p.publishedAt)} · {readingTime(p.html)}
              </p>
              <Link href={`/writing/${p.slug}`} className="mt-1 block font-serif text-3xl leading-tight transition hover:text-accent">
                {p.title}
              </Link>
              {p.summary && <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>}
              {p.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Link href={`/writing/tag/${t}`} className="text-xs font-bold text-accent2 hover:underline">
                        #{t}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
