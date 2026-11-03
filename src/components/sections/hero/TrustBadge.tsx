import { MaskShape, maskStyles } from "@/components/ui/MaskShape";

const ICON = "relative size-10 shrink-0 overflow-hidden rounded-full border-3 border-black bg-white";

/**
 * Google · Clutch · Trustpilot · Upwork badges + rating line.
 * Built at the desktop 40px size and scaled to 32px on mobile (Figma: 2.4px border = 3 × 0.8).
 */
export function TrustBadge() {
  return (
    <div data-hero="badge" className="flex flex-col items-center gap-2">
      <div className="flex h-8 items-center lg:h-10">
        <div className="isolate flex scale-80 items-center lg:scale-100">
          <span className={`${ICON} z-[4] mr-[-3px]`}>
            <span className="absolute top-1/2 left-[calc(50%-0.5px)] h-6 w-[23px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <span
                className="absolute"
                style={{ inset: "-0.42% -0.73% -0.73% -0.75%", ...maskStyles("/figma/google-mask.svg", "0.172px 0.102px", "23px 24px") }}
              >
                <span className="absolute" style={{ inset: "-9.56% -2.01% -1.94% -3.98%" }}>
                  <img src="/figma/google-g.svg" alt="Google" className="block size-full max-w-none" />
                </span>
              </span>
            </span>
          </span>
          <span className={`${ICON} z-[3] mr-[-3px]`}>
            <img
              src="/figma/clutch.svg"
              alt="Clutch"
              className="absolute block max-w-none"
              style={{ left: 6, top: 5, width: 21.25, height: 24 }}
            />
          </span>
          <span className={`${ICON} z-[2] mr-[-3px]`}>
            <img
              src="/figma/trustpilot-star.svg"
              alt="Trustpilot"
              className="absolute top-1/2 left-[calc(50%-0.5px)] h-6 w-[25px] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </span>
          <span className={`${ICON} z-[1]`} role="img" aria-label="Upwork">
            <MaskShape
              src="/figma/upwork-mask.webp"
              color="#000"
              style={{ left: 4.29, top: 10.92, width: 25.51, height: 15.258 }}
              maskPosition="0.715px 0.078px"
              maskSize="24px 15.02px"
            />
          </span>
        </div>
      </div>
      <p className="text-[12px] leading-normal tracking-[-0.03em] whitespace-nowrap text-paper uppercase lg:text-[14px] lg:leading-[17px]">
        4.8 average across platforms
      </p>
    </div>
  );
}
