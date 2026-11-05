// Copy articles from dev.to onto this site.
//
//   node scripts/import-devto.mts <dev.to URL or article id> [more...]
//
// Where it saves depends on the environment, exactly like the site itself:
//   - no DATABASE_URL  -> .data/posts.json (local preview)
//   - DATABASE_URL set -> the Neon database used in production
//     (copy it from Vercel → Settings → Environment Variables into .env.local,
//      then run `node --env-file=.env.local scripts/import-devto.mts <url>`)
//
// Cover images are downloaded into public/posts/ so they ship with the site.
// Each post keeps a canonical link to dev.to, so search engines credit the original.
// Re-running for the same article updates it rather than duplicating it.

import fs from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";
import { cleanHtml } from "../app/lib/sanitize.ts";
import { getPost, savePost, storageMode, type Post } from "../app/lib/store.ts";
import { slugify } from "../app/lib/text.ts";

type DevtoArticle = {
  id: number;
  title: string;
  description: string;
  slug: string;
  url: string;
  canonical_url: string;
  cover_image: string | null;
  published_at: string;
  tags: string[];
  body_html: string;
};

const UA = { "User-Agent": "buchi-site-import" };

async function fetchArticle(ref: string): Promise<DevtoArticle> {
  // Accept an id, or a URL like https://dev.to/<user>/<slug>
  const api = /^\d+$/.test(ref)
    ? `https://dev.to/api/articles/${ref}`
    : `https://dev.to/api/articles/${new URL(ref).pathname.replace(/^\/+|\/+$/g, "")}`;
  const res = await fetch(api, { headers: UA });
  if (!res.ok) throw new Error(`dev.to returned ${res.status} for ${ref}`);
  return (await res.json()) as DevtoArticle;
}

// dev.to serves covers through a resizing proxy: .../https%3A%2F%2F<original>. Use the original.
function originalImageUrl(url: string): string {
  const i = url.indexOf("/https%3A");
  return i >= 0 ? decodeURIComponent(url.slice(i + 1)) : url;
}

async function downloadCover(url: string, slug: string): Promise<string> {
  const src = originalImageUrl(url);
  const res = await fetch(src, { headers: UA });
  if (!res.ok) throw new Error(`Could not download cover image (${res.status})`);
  let bytes: Buffer = Buffer.from(await res.arrayBuffer());
  let ext = (path.extname(new URL(src).pathname) || ".png").toLowerCase();

  // Covers are often multi-MB PNGs. Shrink to a 1600px JPEG so they don't bloat the repo.
  // sharp ships with Next.js; if it's ever missing, keep the original file.
  try {
    const sharp = (await import("sharp")).default;
    bytes = await sharp(bytes).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    ext = ".jpg";
  } catch {
    console.warn("  (sharp not available, saving the cover image unresized)");
  }

  const dir = path.join(process.cwd(), "public", "posts");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${slug}${ext}`), bytes);
  return `/posts/${slug}${ext}`;
}

// dev.to adds UI chrome to its HTML (copy/fullscreen buttons with SVG icons, heading anchors).
// Remove it first; otherwise the icons' <title> text would leak into the article as plain words.
function stripDevtoChrome(html: string): string {
  const pass = sanitizeHtml(html, {
    allowedTags: false, // keep every tag for now; cleanHtml() below applies the real allowlist
    allowedAttributes: false,
    allowVulnerableTags: true, // safe: this is only a pre-pass, cleanHtml() runs afterwards
    nonTextTags: ["script", "style", "textarea", "noscript", "svg", "button"],
    exclusiveFilter: (frame) =>
      // empty heading anchors: <a name="x" href="#x"></a>
      (frame.tag === "a" && !frame.text.trim() && !!frame.attribs.name) ||
      // the copy / fullscreen panel on code blocks
      (frame.tag === "div" && /highlight__panel/.test(frame.attribs.class ?? "")),
  });
  return pass;
}

// dev.to descriptions are the first ~150 characters with "..." appended. Keep the first clean line.
function summaryFrom(description: string): string {
  return description.split(/\s{2,}/)[0].replace(/\.\.\.$/, "").trim().slice(0, 400);
}

async function importOne(ref: string): Promise<void> {
  const a = await fetchArticle(ref);
  const slug = slugify(a.slug.replace(/-[a-z0-9]{3,5}$/, "")); // drop dev.to's random suffix
  const existing = await getPost(slug);
  const now = new Date().toISOString();
  const summary = summaryFrom(a.description);

  let html = cleanHtml(stripDevtoChrome(a.body_html)).trim();
  // Many articles open with an italic subtitle that is the same text as the summary.
  // The page already shows the summary under the title, so drop the repeat.
  const first = html.match(/^<p>\s*<em>([\s\S]*?)<\/em>\s*<\/p>/);
  if (first && first[1].trim() === summary) html = html.slice(first[0].length).trim();

  const post: Post = {
    slug,
    title: a.title,
    summary,
    coverImage: a.cover_image ? await downloadCover(a.cover_image, slug) : "",
    tags: [...new Set(a.tags.map(slugify).filter(Boolean))].slice(0, 5),
    html,
    status: "published",
    createdAt: existing?.createdAt ?? a.published_at,
    updatedAt: now,
    publishedAt: a.published_at,
    canonicalUrl: a.canonical_url || a.url,
  };

  await savePost(post);
  console.log(`${existing ? "updated" : "imported"}: /writing/${slug}  (${a.title})`);
}

const refs = process.argv.slice(2);
if (!refs.length) {
  console.error("Usage: node scripts/import-devto.mts <dev.to URL or id> [more...]");
  process.exit(1);
}
console.log(`Saving to: ${storageMode()}`);
for (const r of refs) await importOne(r);
