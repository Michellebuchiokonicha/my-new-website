import type { Metadata } from "next";
import SectionTitle from "../components/SectionTitle";
import { press, type PressItem } from "../content";

export const metadata: Metadata = {
  title: "Press & papers",
  description: "Research papers, magazine features, interviews and conversations.",
};

const groups: { title: string; types: PressItem["type"][] }[] = [
  { title: "Research papers", types: ["Paper"] },
  { title: "Magazine & press features", types: ["Feature", "Mention"] },
  { title: "Interviews, podcasts & talks", types: ["Interview", "Podcast", "Talk"] },
];

const typeColor: Record<PressItem["type"], string> = {
  Paper: "bg-accent2 text-onaccent2",
  Feature: "bg-accent text-onaccent",
  Mention: "bg-accent text-onaccent",
  Interview: "bg-mustard text-ink",
  Podcast: "bg-mustard text-ink",
  Talk: "bg-inkblock text-oninkblock",
};

export default function PressPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionTitle kicker="Press & papers" as="h1">
        Papers, features &amp; conversations
      </SectionTitle>
      <p className="-mt-6 max-w-2xl text-lg leading-relaxed">
        Where my research has been published and where my work has been featured or discussed.
      </p>

      {groups.map((g) => {
        const items = press.filter((p) => g.types.includes(p.type));
        if (items.length === 0) return null;
        return (
          <section key={g.title} className="mt-14">
            <h2 className="mb-6 font-serif text-3xl">{g.title}</h2>
            <ul className="divide-y-2 divide-foreground border-y-2 border-foreground">
              {items.map((p, i) => (
                <li key={i} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                  {(() => {
                    const inner = (
                      <>
                        <span>
                          <span className="block font-serif text-xl transition group-hover:text-accent">{p.title}</span>
                          <span className="block text-sm text-muted">{p.outlet}</span>
                        </span>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${typeColor[p.type]}`}>
                          {p.type}
                          {p.date ? ` · ${p.date}` : ""}
                        </span>
                      </>
                    );
                    return p.href && p.href !== "#" ? (
                      <a href={p.href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-4 py-4">
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-baseline justify-between gap-4 py-4">{inner}</div>
                    );
                  })()}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
