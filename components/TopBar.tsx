import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { SceneBackground } from "@/types/game";

interface TopBarProps {
  current: number;
  total: number;
  playerName?: string;
  variant: SceneBackground;
  isComplete?: boolean;
}

export function TopBar({
  current,
  total,
  playerName,
  variant,
  isComplete = false,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
        <div className="py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="font-ui text-[0.82rem] font-medium text-[rgba(139,94,60,0.68)] transition-colors hover:text-[#E8855A]"
            >
              ← Beranda
            </Link>

            <div className="min-w-0 flex-1 px-3 text-center">
              <p className="truncate font-ui text-[0.86rem] font-semibold text-[#5C2E0A]">
                {playerName ? `${playerName} bersama Alpa` : "Bersama Alpa"}
              </p>
            </div>

            <p className="shrink-0 font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(92,46,10,0.62)]">
              Skenario {current}/{total}
            </p>
          </div>

          <ProgressBar
            current={current}
            total={total}
            variant={variant}
            isComplete={isComplete}
          />
        </div>
      </div>
    </header>
  );
}
