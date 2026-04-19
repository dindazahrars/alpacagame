import { SceneBackground } from "@/types/game";

interface ProgressBarProps {
  current: number;
  total: number;
  variant: SceneBackground;
  isComplete?: boolean;
}

const VARIANT_GRADIENTS: Record<SceneBackground, string> = {
  golden: "linear-gradient(90deg, #F4A636 0%, #FFD166 100%)",
  dusk: "linear-gradient(90deg, #E8855A 0%, #D4687A 100%)",
  twilight: "linear-gradient(90deg, #7B5EA7 0%, #4A3B6B 100%)",
  night: "linear-gradient(90deg, #4A6FA5 0%, #8AAFD4 100%)",
  dawn: "linear-gradient(90deg, #FFB5A0 0%, #F4A636 100%)",
};

const MARKERS = [5, 10, 15, 20];

export function ProgressBar({
  current,
  total,
  variant,
  isComplete = false,
}: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const clamped = Math.min(Math.max(current, 0), safeTotal);
  const percentage = (clamped / safeTotal) * 100;
  const activeDotIndex = Math.min(Math.max(clamped - 1, 0), safeTotal - 1);

  return (
    <div className="mt-3">
      <div className="relative px-0.5">
        <div className="absolute -top-4 left-0 right-0 flex justify-between">
          {MARKERS.map((marker) => {
            const isPassed = clamped >= marker;
            const isFinalMarker = marker === MARKERS[MARKERS.length - 1];

            return (
              <div
                key={marker}
                className="flex min-w-[20px] -translate-x-1/2 flex-col items-center first:translate-x-0 last:translate-x-0"
                style={{
                  left: `${(marker / safeTotal) * 100}%`,
                  position: "absolute",
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border"
                  style={{
                    borderColor: isPassed ? "#F4A636" : "rgba(255,255,255,0.42)",
                    background: isPassed
                      ? isFinalMarker && isComplete
                        ? "#F4A636"
                        : "#F9D98B"
                      : "transparent",
                    boxShadow: isPassed ? "0 0 0 2px rgba(244,166,54,0.15)" : "none",
                  }}
                />
                <span className="mt-1 font-accent text-[9px] text-[rgba(92,46,10,0.58)]">
                  {isFinalMarker ? "✓" : marker}
                </span>
              </div>
            );
          })}
        </div>

        <div className="h-[6px] overflow-hidden rounded-full bg-white/35">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${percentage}%`,
              background: VARIANT_GRADIENTS[variant],
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {Array.from({ length: safeTotal }).map((_, index) => {
          const step = index + 1;
          const isMilestone = MARKERS.includes(step);
          const isDone = step < clamped || (isComplete && step === clamped);
          const isCurrent = !isComplete && activeDotIndex === index && clamped > 0;

          return (
            <span
              key={`dot-${step}`}
              className={`rounded-full border transition-all duration-300 ${
                isCurrent ? "animate-pulse" : ""
              }`}
              style={{
                width: isMilestone ? "10px" : "8px",
                height: isMilestone ? "10px" : "8px",
                borderColor: isDone
                  ? "#F4A636"
                  : isCurrent
                    ? "#FFD166"
                    : "rgba(255,255,255,0.38)",
                background: isDone
                  ? "#F4A636"
                  : isCurrent
                    ? "#FFE8A0"
                    : "transparent",
                boxShadow: isCurrent ? "0 0 0 3px rgba(255,209,102,0.18)" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
