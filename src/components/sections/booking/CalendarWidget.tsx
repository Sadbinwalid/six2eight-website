"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { LINKS } from "@/content/links";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const SLOTS = ["12:00pm", "12:30pm", "1:00pm", "1:30pm", "9:30pm", "10:00pm", "10:30pm"];
/** Days after today that are bookable (until real Calendly availability is wired in). */
const AVAILABLE_DAYS = 7;

/* "Now" is captured once on the client; null during SSR so markup is deterministic. */
const CLIENT_NOW = typeof window !== "undefined" ? new Date() : null;
const noopSubscribe = () => () => {};

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Month laid out as 7 weekday columns (Mon-first), matching the Calendly embed in Figma. */
function monthColumns(year: number, month: number) {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))];
  while (cells.length % 7) cells.push(null);
  const cols: (Date | null)[][] = WEEKDAYS.map(() => []);
  cells.forEach((c, i) => cols[i % 7].push(c));
  return cols;
}

function DayButton({
  date,
  today,
  available,
  selected,
  onSelect,
}: {
  date: Date | null;
  today: Date;
  available: boolean;
  selected: boolean;
  onSelect: (d: Date) => void;
}) {
  if (!date) return <span aria-hidden className="size-[42px] shrink-0" />;
  return (
    <button
      type="button"
      disabled={!available}
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={date.toDateString()}
      className={cn(
        "relative size-[42px] shrink-0 rounded-full text-[16px] leading-6 tracking-[-0.02em] text-ink-80 transition-[background-color,scale] duration-300 ease-[var(--ease-out-expo)]",
        selected ? "bg-bg-brand font-medium text-black" : available ? "bg-bg-green hover:scale-105 hover:bg-[#d9ffa3]" : "bg-bg-secondary",
        available ? "cursor-pointer" : "cursor-default",
      )}
    >
      {date.getDate()}
      {sameDay(date, today) && (
        <span aria-hidden className="absolute top-8 left-1/2 size-1 -translate-x-1/2 rounded-[2px] bg-ink-60 opacity-40" />
      )}
    </button>
  );
}

function TimeSlots({ slot, onPick }: { slot: string | null; onPick: (t: string) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:flex xl:flex-col">
      {SLOTS.map((t) => (
        <li key={t} className="xl:w-[201px]">
          {slot === t ? (
            <div className="flex gap-1.5 [animation:fade-up_0.4s_var(--ease-out-expo)]">
              <span className="t-md-medium flex flex-1 items-center justify-center rounded-[6px] bg-[#5c5c5c] p-3 text-white">{t}</span>
              <a
                href={LINKS.calendly}
                className="t-md-medium flex flex-1 items-center justify-center rounded-[6px] bg-bg-brand p-3 text-black transition-[filter] hover:brightness-95"
              >
                Next
              </a>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onPick(t)}
              className="w-full rounded-[6px] border border-brand p-3 text-center transition-[box-shadow,background-color] duration-300 hover:bg-bg-green hover:shadow-[inset_0_0_0_1px_var(--color-brand)]"
            >
              <span className="t-md-medium text-black">{t}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Calendly-style date & time picker. Selecting a time reveals Calendly's
 * "Next" step, which hands over to the real booking page (LINKS.calendly).
 */
export function CalendarWidget() {
  const now = useSyncExternalStore(
    noopSubscribe,
    () => CLIENT_NOW,
    () => null,
  );
  const firstAvailable = now ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) : null;
  const [viewState, setView] = useState<{ y: number; m: number } | null>(null);
  const [selectedState, setSelected] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const view = viewState ?? (firstAvailable ? { y: firstAvailable.getFullYear(), m: firstAvailable.getMonth() } : { y: 2024, m: 3 });
  const selected = selectedState ?? firstAvailable;
  const today = useMemo(() => (now ? startOfDay(now) : new Date(2024, 3, 23)), [now]);
  const cols = useMemo(() => monthColumns(view.y, view.m), [view.y, view.m]);

  const isAvailable = (d: Date) => {
    const diff = Math.round((startOfDay(d).getTime() - today.getTime()) / 86400000);
    return diff >= 1 && diff <= AVAILABLE_DAYS;
  };
  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const tz = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Asia/Dhaka";
  const tzTime = now ? now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(" ", "").toLowerCase() : "10:48pm";
  const selectedLabel = selected ? selected.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";

  return (
    <div data-bk="widget" className="flex w-full flex-col rounded-[16px] bg-bg-secondary xl:w-auto xl:flex-row xl:items-start">
      <div className="flex w-full flex-col items-start gap-5 p-4 md:p-7 xl:w-[400px] xl:gap-10">
        <div className="flex w-full flex-col items-start gap-5 xl:gap-10">
          <p className="t-lg-semibold text-black">Select a Date &amp; Time</p>
          <div className="flex w-full flex-col items-center gap-4 xl:gap-6">
            <div className="flex w-full max-w-[343.14px] items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => shift(-1)}
                className="size-[37.905px] shrink-0 rounded-full transition-colors hover:bg-bg-primary"
              >
                <img src="/figma/cal-prev.svg" alt="" className="block size-full" />
              </button>
              <p className="t-md-medium text-black" aria-live="polite">
                {monthLabel}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => shift(1)}
                className="size-[38px] shrink-0 rounded-full transition-[filter] hover:brightness-95"
              >
                <img src="/figma/cal-next.svg" alt="" className="block size-full" />
              </button>
            </div>
            <div className="flex w-full max-w-[343.14px] items-start justify-between xl:justify-start xl:gap-[5.985px]">
              {cols.map((col, ci) => (
                <div key={WEEKDAYS[ci]} className="flex flex-col items-center gap-[15.96px]">
                  <p className="t-xs-regular text-black">{WEEKDAYS[ci]}</p>
                  <div className="flex flex-col items-center gap-[7.98px]">
                    {col.map((d, ri) => (
                      <DayButton
                        key={ri}
                        date={d}
                        today={today}
                        available={!!d && isAvailable(d)}
                        selected={!!d && !!selected && sameDay(d, selected)}
                        onSelect={(date) => {
                          setSelected(date);
                          setSlot(null);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* time slots inline below the calendar on smaller screens */}
        <div className="w-full xl:hidden">
          <p className="t-md-medium mb-3 text-black">{selectedLabel}</p>
          <TimeSlots slot={slot} onPick={setSlot} />
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1 border-y border-ink-10 py-3 xl:py-4">
            <p className="t-sm-semibold text-black">Time zone</p>
            <p className="flex items-center gap-1">
              <span className="relative size-4 shrink-0">
                <img src="/figma/globe.svg" alt="" className="absolute block max-w-none" style={{ left: 1.77, top: 0.73 }} />
              </span>
              <span className="t-sm-regular text-black">
                {tz} ({tzTime})
              </span>
              <img src="/figma/caret-down.svg" alt="" className="block size-3 -scale-y-100" />
            </p>
          </div>
          <div className="flex w-full items-start justify-between text-[14px] leading-5 text-black">
            <a href="#" className="hover:underline">
              Cookie settings
            </a>
            <a href="#" className="hover:underline">
              Report abuse
            </a>
          </div>
        </div>
      </div>

      {/* time column (desktop) */}
      <div className="hidden flex-col items-start self-stretch border-l border-ink-10 px-7 pt-24 xl:flex">
        <div className="flex flex-col items-start gap-5">
          <p className="t-md-medium text-black">{selectedLabel || "Thursday, August 23"}</p>
          <div key={selectedLabel} className="[animation:fade-up_0.5s_var(--ease-out-expo)]">
            <TimeSlots slot={slot} onPick={setSlot} />
          </div>
        </div>
      </div>
    </div>
  );
}
