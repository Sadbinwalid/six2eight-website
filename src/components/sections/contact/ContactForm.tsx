"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { BrandButton } from "@/components/ui/Button";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, UPLOAD_RULES } from "@/content/contact";
import { LINKS } from "@/content/links";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "services" | "files", string>>;

function Label({ children, required, htmlFor, id }: { children: ReactNode; required?: boolean; htmlFor?: string; id?: string }) {
  const Tag = htmlFor ? "label" : "p";
  return (
    <Tag id={id} htmlFor={htmlFor} className="flex h-5 w-full items-center gap-1">
      <span className="t-sm-medium text-black lg:t-md-medium lg:capitalize">{children}</span>
      {required && (
        <span aria-hidden className="text-[16px] leading-5 text-required lg:text-[20px]">
          *
        </span>
      )}
    </Tag>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="t-sm-regular -mt-1 text-required [animation:fade-up_0.3s_var(--ease-out-expo)]">
      {children}
    </p>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-[18px] border px-3 py-1 transition-[background-color,border-color,color,scale] duration-300 ease-[var(--ease-out-expo)] active:scale-95 lg:h-9 lg:py-0",
        active ? "border-black bg-black text-white" : "border-ink-10 bg-bg-secondary text-black hover:border-ink-20 hover:bg-bg-primary",
      )}
    >
      <span className="t-sm-regular whitespace-nowrap lg:t-lg-regular">{label}</span>
    </button>
  );
}

const INPUT =
  "w-full border-b border-ink-20 bg-transparent pb-3 text-[16px] leading-6 tracking-[-0.02em] text-black outline-none transition-colors duration-300 placeholder:text-ink-50 focus:border-black lg:text-[18px] lg:leading-7 lg:tracking-normal aria-[invalid=true]:border-required";

/** Project inquiry form. Validates client-side; submission endpoint is still to be connected. */
export function ContactForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const ok = Array.from(list).filter((f) => f.size <= UPLOAD_RULES.maxMb * 1024 * 1024);
    setFiles((prev) => [...prev, ...ok]);
    setErrors((e) => ({ ...e, files: ok.length < list.length ? `Files must be under ${UPLOAD_RULES.maxMb} MB each.` : undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") ?? "").trim())) next.email = "Please enter a valid company email.";
    if (!services.length) next.services = "Pick at least one service.";
    setErrors(next);
    if (Object.keys(next).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    // TODO: send to the chosen endpoint (CRM / email service) together with `files`.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  return (
    <form
      data-cta="form"
      noValidate
      onSubmit={onSubmit}
      className="relative flex w-full flex-col items-start gap-5 overflow-hidden rounded-[16px] bg-bg-secondary p-4 md:p-8 lg:gap-6 xl:w-[min(720px,51.5%)] xl:shrink-0 xl:p-10"
    >
      <div className="flex w-full flex-col items-start gap-5 lg:gap-6">
        <div className="flex w-full flex-col items-start gap-2 lg:gap-3">
          <Label required htmlFor="cta-name">
            Full name
          </Label>
          <input
            id="cta-name"
            name="name"
            autoComplete="name"
            placeholder="Minhaj Uddin"
            aria-required
            aria-invalid={!!errors.name}
            aria-describedby="cta-name-err"
            className={INPUT}
          />
          <FieldError id="cta-name-err">{errors.name}</FieldError>
        </div>
        <div className="flex w-full flex-col items-start gap-2 lg:gap-3">
          <Label required htmlFor="cta-email">
            Company email
          </Label>
          <input
            id="cta-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="minhaj@domain.com"
            aria-required
            aria-invalid={!!errors.email}
            aria-describedby="cta-email-err"
            className={INPUT}
          />
          <FieldError id="cta-email-err">{errors.email}</FieldError>
        </div>
        <div className="flex w-full flex-col items-start gap-2 lg:gap-3">
          <Label required id="cta-services">
            What Service Do You Need
          </Label>
          <div
            role="group"
            aria-labelledby="cta-services"
            aria-describedby="cta-services-err"
            data-invalid={!!errors.services}
            tabIndex={errors.services ? -1 : undefined}
            className="flex w-full flex-wrap content-start items-start gap-1.5 border-b border-ink-20 pb-3 outline-none"
          >
            {SERVICE_OPTIONS.map((s) => (
              <Chip
                key={s}
                label={s}
                active={services.includes(s)}
                onClick={() => setServices((v) => (v.includes(s) ? v.filter((x) => x !== s) : [...v, s]))}
              />
            ))}
          </div>
          <FieldError id="cta-services-err">{errors.services}</FieldError>
        </div>
        <div className="flex w-full flex-col items-start gap-2 lg:gap-4">
          <Label id="cta-budget">Budget range</Label>
          <div
            role="group"
            aria-labelledby="cta-budget"
            className="flex w-full flex-wrap content-start items-start gap-1.5 border-b border-ink-20 pb-3"
          >
            {BUDGET_OPTIONS.map((b) => (
              <Chip key={b} label={b} active={budget === b} onClick={() => setBudget(budget === b ? null : b)} />
            ))}
          </div>
        </div>
        <div className="flex h-[90px] w-full flex-col items-start gap-2 lg:h-[99px] lg:gap-3">
          <Label htmlFor="cta-info">Additional info?</Label>
          <textarea
            id="cta-info"
            name="info"
            placeholder="Goals, scope, timeline, or helpful links..."
            className={cn(INPUT, "min-h-0 flex-1 resize-none")}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2 lg:gap-3">
          <Label htmlFor="cta-files">Documents Upload</Label>
          <label
            htmlFor="cta-files"
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              addFiles(e.dataTransfer.files);
            }}
            className={cn(
              "flex w-full cursor-pointer items-start gap-3 rounded-[8px] border border-dashed p-3 transition-colors duration-300 focus-within:border-black lg:items-center",
              drag ? "border-black bg-bg-primary" : "border-ink-20 bg-bg-secondary hover:bg-bg-primary/60",
            )}
          >
            <span className="relative size-8 shrink-0">
              <img src="/figma/attachment.svg" alt="" className="absolute block max-w-none" style={{ left: 3, top: 3 }} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-1.5 lg:w-[325px] lg:flex-none">
              <span className="t-md-semibold w-full text-black">Drop files or click to upload</span>
              <span className="t-sm-regular w-full text-ink-50">{UPLOAD_RULES.hint}</span>
            </span>
            <input
              id="cta-files"
              ref={fileInput}
              type="file"
              multiple
              accept={UPLOAD_RULES.accept}
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
          {files.length > 0 && (
            <ul className="flex w-full flex-wrap gap-1.5">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="t-sm-regular flex items-center gap-2 rounded-full bg-bg-primary py-1 pr-1.5 pl-3 text-black"
                >
                  <span className="max-w-[200px] truncate">{f.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((v) => v.filter((_, j) => j !== i))}
                    className="flex size-5 items-center justify-center rounded-full transition-colors hover:bg-black/10"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <FieldError id="cta-files-err">{errors.files}</FieldError>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 lg:items-start">
        <BrandButton type="submit" className="w-full" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit Inquiry"}
        </BrandButton>
        <p className="w-[246px] text-center text-[16px] leading-[23px] font-medium tracking-[-0.02em] text-black capitalize lg:w-auto lg:text-left lg:text-[18px] lg:leading-7">
          Prefer a Direct Conversation?{" "}
          <a
            href={LINKS.calendly}
            className="text-link-blue underline decoration-from-font underline-offset-2 transition-opacity hover:opacity-75"
          >
            Book a Consultation
          </a>
        </p>
      </div>

      {/* success state */}
      <div
        aria-live="polite"
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-secondary p-10 text-center transition-[opacity,visibility] duration-700",
          status === "sent" ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {status === "sent" && (
          <>
            <span className="flex size-16 items-center justify-center rounded-full bg-bg-brand [animation:fade-up_0.6s_var(--ease-out-expo)]">
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden>
                <path d="M2 10.5l7.5 7.5L24 2" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="t-card-title text-black">Thanks — we’ll be in touch.</p>
            <p className="t-md-regular max-w-[380px] text-ink-80">
              Your inquiry is in. Expect a reply from the six2eight team within one business day.
            </p>
          </>
        )}
      </div>
    </form>
  );
}
