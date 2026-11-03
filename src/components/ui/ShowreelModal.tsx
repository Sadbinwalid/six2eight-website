"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LINKS } from "@/content/links";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/cn";

/** Full-screen showreel player. Escape / backdrop click closes; focus returns to the trigger. */
export default function ShowreelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const mounted = useMounted();
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    video?.play().catch(() => {});

    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      video?.pause();
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="six2eight showreel"
      aria-hidden={!open}
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-[opacity,visibility] duration-500",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative aspect-video w-full max-w-[1120px] overflow-hidden rounded-[12px] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-[scale,translate] duration-700 ease-[var(--ease-out-expo)] lg:rounded-[16px]",
          open ? "translate-y-0 scale-100" : "translate-y-6 scale-95",
        )}
      >
        {LINKS.showreel ? (
          <video ref={videoRef} src={LINKS.showreel} controls playsInline className="size-full object-cover" />
        ) : (
          <div className="relative size-full">
            <img src="/figma/showreel-thumb.webp" alt="" className="absolute inset-0 size-full object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center lg:gap-3">
              <span className="t-card-title text-paper">Showreel</span>
              <span className="t-sm-regular text-paper-80 lg:t-md-regular">The showreel video will play here.</span>
            </div>
          </div>
        )}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close showreel"
          className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-white text-black transition-[rotate] duration-500 ease-[var(--ease-out-expo)] hover:rotate-90 lg:top-4 lg:right-4 lg:size-11"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}
