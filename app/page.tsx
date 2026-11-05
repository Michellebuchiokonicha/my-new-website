import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import {
  site,
  stats,
  about,
  skills,
  projects,
  experience,
  awards,
  talks,
  articles,
  community,
  ticker,
  speakingTopics,
  currently,
  type Project,
} from "./content";
import SectionTitle from "./components/SectionTitle";
import AwardCard from "./components/AwardCard";
import Marquee from "./components/Marquee";
import CountUp from "./components/CountUp";
import Parallax from "./components/Parallax";
import { formatDate } from "./lib/text";
import { getGallery, publicFileExists } from "./lib/gallery";
import { listPublishedPosts } from "./lib/store";

const statColors = [
  "bg-accent text-onaccent",
  "bg-accent2 text-onaccent2",
  "bg-mustard text-ink",
  "bg-inkblock text-oninkblock",
];

const index = [
  { href: "#work", label: "Work", note: "Projects & experience" },
  { href: "#awards", label: "Awards", note: "Recognition" },
  { href: "/writing", label: "Writing", note: "Articles on this site" },
  { href: "/gallery", label: "Gallery", note: "Hall of fame & memories" },
  { href: "/press", label: "Press", note: "Papers & features" },
  { href: "#contact", label: "Contact", note: "Hire or invite me" },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const tops = ["bg-accent", "bg-accent2", "bg-mustard", "bg-inkblock"];
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${(i % 2) * 100}ms` }}
      className={`group flex flex-col border-2 bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--foreground)] ${
        p.todo ? "border-dashed border-line" : "border-foreground"
      }`}
    >
      <div className={`h-3 ${tops[i % 4]}`} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl leading-tight">
            {p.href ? (
              <a href={p.href} target="_blank" rel="noreferrer" className="transition hover:text-accent">
                {p.name} <span aria-hidden="true" className="text-base">↗</span>
              </a>
            ) : (
              p.name
            )}
          </h3>
          {p.period && <span className="shrink-0 text-xs font-bold text-muted">{p.period}</span>}
        </div>
        <p className="mt-1 text-sm font-medium text-accent2">{p.role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full border border-foreground px-2.5 py-0.5 text-xs">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default async function Home() {
  await connection();
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);
  const gallery = getGallery().slice(0, 6);
  const latestPosts = (await listPublishedPosts()).slice(0, 3);
  const hasHeadshot = publicFileExists("/headshot.jpg");
  const hasCv = publicFileExists(site.cvUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    email: site.email,
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ticker */}
      <Marquee items={ticker} speed={36} className="bg-accent2 py-2 text-sm font-bold uppercase tracking-[0.16em] text-onaccent2" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-[3px] border-foreground">
        <Parallax className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.35fr_1fr] lg:pb-24">
          <div>
            <p className="fade-up text-xs font-bold uppercase tracking-[0.22em] text-accent" style={{ ["--d" as string]: "100ms" }}>
              Vol. 2026 · {site.title}
            </p>
            <h1 className="mt-4 font-serif leading-[0.88]">
              <span className="mask text-[clamp(4.2rem,17vw,10.5rem)]">
                <span className="rise" style={{ ["--d" as string]: "150ms" }}>{site.shortName}</span>
              </span>
              <span className="mask text-[clamp(2.2rem,8.2vw,5.4rem)] italic text-accent">
                <span className="rise" style={{ ["--d" as string]: "320ms" }}>Buchi Okonicha</span>
              </span>
            </h1>
            <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed sm:text-xl" style={{ ["--d" as string]: "700ms" }}>
              {site.tagline}
            </p>
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "850ms" }}>
              <a href="#contact" className="btn-lift rounded-full border-2 border-foreground bg-accent px-6 py-3 text-sm font-bold text-onaccent">
                Get in touch
              </a>
              {hasCv && (
                <a href={site.cvUrl} className="btn-lift rounded-full border-2 border-foreground bg-card px-6 py-3 text-sm font-bold">
                  Download CV
                </a>
              )}
              <Link href="/writing" className="ulink self-center px-2 py-3 text-sm font-bold">
                Read my writing →
              </Link>
            </div>
          </div>

          {/* Collage */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="px absolute -bottom-4 -right-4 h-full w-full bg-accent2" style={{ ["--px" as string]: "-14" }} aria-hidden="true" />
            <div className="px pop relative aspect-[4/5] border-[3px] border-foreground bg-paper2" style={{ ["--d" as string]: "400ms", ["--px" as string]: "8" }}>
              {hasHeadshot ? (
                <Image src="/headshot.jpg" alt={`Portrait of ${site.name}`} fill priority sizes="(min-width:1024px) 400px, 80vw" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
                  Your photo goes here
                  <br />
                  (public/headshot.jpg)
                </div>
              )}
            </div>
            <div className="px absolute -left-3 top-6 sm:-left-8" style={{ ["--px" as string]: "18" }}>
              <div className="pop" style={{ ["--d" as string]: "900ms" }}>
                <div className="wobble flex h-28 w-28 items-center justify-center rounded-full border-2 border-foreground bg-mustard p-3 text-center text-xs font-bold uppercase leading-tight text-ink sm:h-32 sm:w-32">
                  Build, speak, write
                </div>
              </div>
            </div>
            <div className="px absolute -bottom-5 left-2 sm:-left-6" style={{ ["--px" as string]: "-10" }}>
              <div className="pop border-2 border-foreground bg-card px-4 py-3 shadow-[5px_5px_0_var(--foreground)]" style={{ ["--d" as string]: "1050ms", ["--r1" as string]: "-3deg", ["--r0" as string]: "-10deg" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Google</p>
                <p className="font-serif text-lg leading-tight">Developer Expert</p>
              </div>
            </div>
          </div>
        </Parallax>
      </section>

      {/* Stats */}
      <section aria-label="In numbers" className="border-b-[3px] border-foreground">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className={`${statColors[i % 4]} p-6 sm:p-8`}>
              <dt className="font-serif text-5xl sm:text-7xl">
                <CountUp value={s.value} />
              </dt>
              <dd className="mt-2 text-sm font-medium opacity-90">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Inside this issue */}
      <section aria-label="Inside" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Inside this issue</p>
        <ul className="mt-4 grid border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-3">
          {index.map((x, i) => (
            <li key={x.label} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }} className="border-b-2 border-foreground">
              <Link href={x.href} className="group flex items-baseline justify-between gap-4 px-1 py-4 transition hover:bg-mustard hover:px-4 hover:text-ink">
                <span>
                  <span className="mr-3 text-xs font-bold text-accent group-hover:text-ink">0{i + 1}</span>
                  <span className="font-serif text-2xl">{x.label}</span>
                  <span className="mt-0.5 block pl-7 text-xs text-muted group-hover:text-ink">{x.note}</span>
                </span>
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionTitle kicker="About" num="01">
            A bit about <em className="text-accent">me</em>
          </SectionTitle>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed" data-reveal>
              {about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="space-y-8">
              {skills.map((g, gi) => (
                <div key={g.group} data-reveal style={{ ["--d" as string]: `${gi * 100}ms` }}>
                  <h3 className="font-serif text-xl">{g.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-full border-2 border-foreground px-3 py-1 text-xs font-medium transition hover:bg-mustard hover:text-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionTitle kicker="Work" num="02">
            Projects &amp; <em className="text-accent">experience</em>
          </SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((p, i) => (
              <ProjectCard key={p.name} p={p} i={i} />
            ))}
          </div>

          {more.length > 0 && (
            <>
              <h3 className="mb-6 mt-16 font-serif text-3xl" data-reveal>More work</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {more.map((p, i) => (
                  <ProjectCard key={p.name} p={p} i={i + 2} />
                ))}
              </div>
            </>
          )}

          <h3 className="mb-8 mt-20 font-serif text-3xl" data-reveal>Experience</h3>
          <ol className="space-y-10 border-l-[3px] border-foreground pl-7">
            {experience.map((j) => (
              <li key={j.org + j.period} className="relative" data-reveal="left">
                <span className="absolute -left-[39px] top-1.5 h-4 w-4 rounded-full border-[3px] border-foreground bg-mustard" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{j.period}</p>
                <h4 className="mt-1 font-serif text-2xl">
                  {j.role} <span className="text-muted">· {j.org}</span>
                </h4>
                <ul className="mt-2 max-w-3xl space-y-1.5 text-sm leading-relaxed text-muted">
                  {j.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills strip */}
      <Marquee
        items={skills.flatMap((g) => g.items)}
        speed={60}
        separator="●"
        className="border-y-[3px] border-foreground bg-mustard py-3 font-serif text-2xl text-ink"
      />

      {/* Awards */}
      <section id="awards" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionTitle kicker="Awards" num="03">
            Recognition, <em className="text-accent">framed</em>
          </SectionTitle>
          <div className="grid gap-12 md:grid-cols-2 md:gap-14">
            {awards.map((a, i) => (
              <AwardCard key={a.title} a={a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      {gallery.length > 0 && (
        <section id="gallery" className="scroll-mt-20 border-y-[3px] border-foreground bg-card py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-serif text-4xl sm:text-6xl" data-reveal>
                Hall of fame &amp; <em className="text-accent">memories</em>
              </h2>
              <Link href="/gallery" className="ulink shrink-0 pb-1 text-sm font-bold">
                See all →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((g, i) => (
                <li
                  key={g.src}
                  data-reveal="tilt"
                  style={{ ["--r" as string]: ["-1.5deg", "1.2deg", "-0.8deg"][i % 3], ["--d" as string]: `${(i % 3) * 90}ms` }}
                  className="relative aspect-square border-2 border-foreground bg-paper2 shadow-[5px_5px_0_var(--foreground)]"
                >
                  <Link href="/gallery" aria-label={g.caption || "Open gallery"}>
                    <Image src={g.src} alt={g.caption || g.categoryLabel} fill sizes="(min-width:640px) 33vw, 50vw" className="object-cover" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Speaking & writing */}
      <section id="speaking" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionTitle kicker="Speaking & writing" num="04">
            Talks, articles &amp; <em className="text-accent">press</em>
          </SectionTitle>

          {/* Speaking block */}
          <div data-reveal className="mb-16 grid gap-8 border-[3px] border-foreground bg-accent2 p-7 text-onaccent2 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h3 className="font-serif text-3xl sm:text-5xl">Invite me to speak</h3>
              <p className="mt-3 max-w-md leading-relaxed">
                60+ talks, workshops and panels so far. I&apos;m happy to join conferences, meetups, podcasts and university events.
              </p>
              <a href={`mailto:${site.email}?subject=Speaking%20invitation`} className="btn-lift mt-6 inline-block rounded-full border-2 border-foreground bg-mustard px-6 py-3 text-sm font-bold text-ink">
                Send an invitation
              </a>
            </div>
            <ul className="flex flex-wrap content-start gap-2">
              {speakingTopics.map((t) => (
                <li key={t} className="rounded-full border-2 border-current px-3.5 py-1.5 text-sm font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className={`grid gap-12 ${talks.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {talks.length > 0 && (
              <div data-reveal>
                <h3 className="mb-4 font-serif text-2xl">Talks</h3>
                <ul className="space-y-4">
                  {talks.map((t, i) => (
                    <li key={i} className="border-b-2 border-foreground pb-4">
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-muted">
                        {t.event} · {t.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div data-reveal style={{ ["--d" as string]: "100ms" }}>
              <h3 className="mb-4 font-serif text-2xl">Latest writing</h3>
              <ul className="space-y-4">
                {latestPosts.map((p) => (
                  <li key={p.slug} className="border-b-2 border-foreground pb-4">
                    <Link href={`/writing/${p.slug}`} className="font-medium transition hover:text-accent">
                      {p.title}
                    </Link>
                    <p className="text-sm text-muted">On this site · {formatDate(p.publishedAt)}</p>
                  </li>
                ))}
                {articles.slice(0, Math.max(0, 3 - latestPosts.length)).map((a, i) => (
                  <li key={i} className="border-b-2 border-foreground pb-4">
                    <a href={a.href} target="_blank" rel="noreferrer" className="font-medium transition hover:text-accent">
                      {a.title}
                    </a>
                    <p className="text-sm text-muted">{a.platform}</p>
                  </li>
                ))}
              </ul>
              <Link href="/writing" className="ulink mt-4 inline-block text-sm font-bold">
                All articles →
              </Link>
            </div>

            <div data-reveal style={{ ["--d" as string]: "200ms" }}>
              <h3 className="mb-4 font-serif text-2xl">Papers &amp; press</h3>
              <p className="leading-relaxed text-muted">
                One published research paper and two under review, plus features, interviews and conversations about my work.
              </p>
              <Link href="/press" className="ulink mt-4 inline-block text-sm font-bold">
                Papers, features &amp; conversations →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community + currently */}
      <section id="community" className="scroll-mt-20 border-t-[3px] border-foreground bg-card py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal className="border-[3px] border-foreground bg-accent p-8 text-onaccent sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Community</p>
            <h3 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{community.headline}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed">{community.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {community.roles.map((r) => (
                <li key={r} className="rounded-full border-2 border-current px-3 py-1 text-sm">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ ["--d" as string]: "120ms" }} className="border-[3px] border-foreground bg-mustard p-8 text-ink">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Currently</p>
            <ul className="mt-4 space-y-4 font-serif text-xl leading-snug">
              {currently.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true">✦</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-footerbg py-24 text-footerfg sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-serif text-[clamp(3.5rem,13vw,9rem)] leading-[0.9]" data-reveal>
            Say <em className="text-mustard">hello.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-footermuted" data-reveal>
            Hiring, inviting me to speak, or want to collaborate? Email is the best way to reach me.
          </p>
          <a
            href={`mailto:${site.email}`}
            data-reveal
            className="ulink mt-6 inline-block break-all font-serif text-2xl sm:text-4xl"
          >
            {site.email}
          </a>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-footermuted">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="ulink">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
