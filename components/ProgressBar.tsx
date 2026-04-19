interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const clamped = Math.min(Math.max(current, 0), safeTotal);
  const percentage = (clamped / safeTotal) * 100;

  return (
    <div className="progress-shell">
      <p className="font-accent text-[9px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.64)]">
        Skenario {clamped} dari {safeTotal}
      </p>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
