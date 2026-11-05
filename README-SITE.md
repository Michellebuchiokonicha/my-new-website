# How to update your site

Everything is edited in files, then pushed to GitHub. Vercel redeploys automatically.

## Text, projects, awards, article links, press
Edit **`app/content.ts`**. Search for `TODO` to find placeholders.

## Add photos to the Gallery (Hall of fame, Awards, Memories)
1. Drop the image into one of these folders:
   - `public/gallery/hall-of-fame/`
   - `public/gallery/awards/`
   - `public/gallery/memories/`
2. Name it with the date first, e.g. `2026-10-full-circle-award.jpg`. Newest filenames show first, and the caption is made from the rest of the name ("Full circle award").
3. Optional custom caption: add a line to `public/gallery/captions.json`:
   ```json
   { "awards/2026-10-full-circle-award.jpg": "Receiving the Full Circle Award at Google Showcase" }
   ```
4. Push. That's it. Use JPG, PNG, WebP or AVIF (convert iPhone HEIC photos first).

## Award photos on the Awards section
Put each photo in `public/awards/` using the file names listed in `app/content.ts` (e.g. `full-circle-award.jpg`).

## Write and publish articles on your site (like dev.to / Medium)
Go to **yourdomain.com/admin**, sign in, and press **New article**.
- Rich text editor: headings, bold/italic/underline, links, lists, quotes, code blocks, dividers.
- Cover image and inline images: use the Image button, or paste / drag images into the article.
- Tags (up to 5), custom URL, optional publish date, and "originally published at" (use this when you
  first posted it on dev.to / Hashnode / Medium, so search engines credit the original).
- **Save draft** keeps it private (you can preview it). **Publish** makes it live straight away. **Unpublish** hides it again.
- Published articles show on `/writing`, on tag pages, in the RSS feed (`/feed.xml`) and in the sitemap.

### One-time setup in Vercel (needed before /admin can save anything)
1. Project → **Storage** → create a **Neon (Postgres)** database and connect it to the project. This stores your articles.
2. Project → **Storage** → create a **Blob** store and connect it. This stores your article images.
3. Project → **Settings → Environment Variables**: add `ADMIN_PASSWORD` (a long passphrase) and `SESSION_SECRET` (any long random string).
4. **Redeploy** (Deployments → the latest → Redeploy). Then open `/admin`.

Locally (`npm run dev`) the editor works with no setup: copy `.env.example` to `.env.local`, set a password, and articles are saved to a local file.

## Copy an article from dev.to onto your site
```
npm run import:devto -- https://dev.to/michellebuchiokonicha/<article-slug>
```
It copies the text, code blocks and tables, saves the cover image into `public/posts/`, and keeps a
canonical link to dev.to so search engines credit the original. Running it again updates the copy.

- Without `DATABASE_URL` it saves to your local preview (`.data/posts.json`).
- To publish to the live site: copy `DATABASE_URL` from Vercel (Project → Settings → Environment Variables)
  into `.env.local`, then run `node --env-file=.env.local scripts/import-devto.mts <url>`.
  Commit and push the new file in `public/posts/` so the cover image deploys too.
- Imported articles contain tables, which the /admin editor can't edit yet. Opening and saving one there
  will flatten its tables, so edit on dev.to and re-import instead.

## Link to articles on dev.to, Hashnode, Medium
Add one line per article to `articles` in `app/content.ts`. Set your profile URLs in `writingPlatforms`.
They appear under "Elsewhere" on `/writing`, below your on-site articles.

## Papers, magazine features, interviews
Add items to `press` in `app/content.ts`. They show on `/press`.

## Other files to add
- `public/cv.pdf` – your CV (leave your phone number off the public copy)
- `public/headshot.jpg` – your photo (then replace the placeholder block in `app/page.tsx`)

## Run locally
```
npm install
npm run dev
```


## Design & animations ("The Feature")

The site uses an editorial magazine look: warm paper background, ink-black rules, and tomato / cobalt / mustard colour blocks. Animations: hero name slides up, photo collage pops in with mouse parallax, wobbling sticker, scrolling ticker and skills strip, count-up stats, scroll-reveal sections, tilting award polaroids, and a scroll progress bar. All of it is switched off for visitors who prefer reduced motion.

- Colours: edit the tokens at the top of `app/globals.css`.
- Hero ticker, speaking topics and the "Currently" panel: `ticker`, `speakingTopics`, `currently` at the bottom of `app/content.ts`.
- Your photo: save it as `public/headshot.jpg` (portrait, about 4:5). It appears in the hero automatically.
- Your CV: `public/cv.pdf`. Award photos: `public/awards/` (names listed in `content.ts`).
- Press items with `href: "#"` show as plain rows until you add the link.
