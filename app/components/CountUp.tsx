"use client";

import { useEffect, useRef, useState } from "react";

// "640+" -> counts 0..640 then shows "+". Non-numeric values ("1 + 2") are shown as-is.
export default function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const target = m ? parseInt(m[2], 10) : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!m) return;
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setN(0);
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {m[1]}
      {n}
      {m[3]}
    </span>
  );
}
