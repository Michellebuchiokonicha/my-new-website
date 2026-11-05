export default function Marquee({
  items,
  className = "",
  speed = 40,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-5">{t}</span>
          <span aria-hidden="true" className="opacity-70">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" style={{ ["--speed" as string]: `${speed}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
