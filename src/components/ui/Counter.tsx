"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

/**
 * Rolling odometer counter (the superside.com treatment, via NumberFlow):
 * each digit spins up from 0 on its own column with a soft masked edge
 * the first time the number scrolls into view.
 */
export function Counter({
  value,
  unit,
  delay = 0,
  className,
}: {
  value: number;
  unit?: string;
  /** ms — lets a group of counters cascade */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = setTimeout(() => setShown(value), delay);
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [value, delay]);

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={shown}
        suffix={unit}
        trend={1}
        willChange
        spinTiming={{ duration: 1800, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        transformTiming={{ duration: 900, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        opacityTiming={{ duration: 450, easing: "ease-out" }}
        aria-label={`${value}${unit ?? ""}`}
      />
    </span>
  );
}
