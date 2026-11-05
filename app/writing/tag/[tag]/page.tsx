import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import PostList from "../../../components/PostList";
import SectionTitle from "../../../components/SectionTitle";
import { listPublishedPosts } from "../../../lib/store";

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag}`, description: `Articles tagged ${tag}.` };
}

export default async function TagPage({ params }: Props) {
  await connection();
  const { tag } = await params;
  const posts = (await listPublishedPosts()).filter((p) => p.tags.includes(tag));

  return (
    <main className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20">
      <Link href="/writing" className="text-sm text-muted transition hover:text-accent">
        ← All articles
      </Link>
      <div className="mt-8">
        <SectionTitle kicker="Tag" as="h1">
          #{tag}
        </SectionTitle>
      </div>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="border-2 border-dashed border-foreground p-8 text-muted">No articles with this tag yet.</p>
      )}
    </main>
  );
}
