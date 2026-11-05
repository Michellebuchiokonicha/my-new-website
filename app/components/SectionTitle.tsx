export default function SectionTitle({
  kicker,
  children,
  as: Tag = "h2",
  num,
}: {
  kicker: string;
  children: React.ReactNode;
  as?: "h1" | "h2";
  num?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14" data-reveal>
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
        {num && <span className="rounded-full bg-accent px-2 py-0.5 text-onaccent">{num}</span>}
        {kicker}
        <span className="h-[2px] w-16 bg-accent" aria-hidden="true" />
      </p>
      <Tag className="mt-3 font-serif text-4xl leading-[1.05] sm:text-6xl">{children}</Tag>
    </div>
  );
}
