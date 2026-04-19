import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";

interface TopBarProps {
  current: number;
  total: number;
  playerName?: string;
}

export function TopBar({ current, total, playerName }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="mx-auto max-w-[1040px]">
        <div className="top-bar-inner">
          <Link
            href="/"
            className="font-ui text-[0.8rem] font-medium text-[rgba(139,94,60,0.64)] transition-colors hover:text-[#E8855A]"
          >
            {"\u2190"} Kembali
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <svg viewBox="0 0 28 28" className="h-4 w-4" aria-hidden="true">
              <circle cx="14" cy="14" r="5" fill="#F4A636" />
              <path
                d="M14 2.5v3.4M14 22.1v3.4M25.5 14h-3.4M5.9 14H2.5M22.3 5.8l-2.4 2.4M8.1 19.9l-2.4 2.4M22.3 22.2l-2.4-2.4M8.1 8.1L5.7 5.7"
                stroke="#C0392B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.24em] text-[#C0392B]/78">
                Perjalanan Alpa
              </p>
              {playerName ? (
                <p className="font-ui text-[0.72rem] text-[rgba(92,46,10,0.56)]">
                  Hai, {playerName}
                </p>
              ) : null}
            </div>
          </div>

          <div className="sm:hidden">
            <p className="font-accent text-[9px] font-bold uppercase tracking-[0.22em] text-[#C0392B]/78">
              Alpa
            </p>
          </div>

          <ProgressBar current={current} total={total} />
        </div>
      </div>
    </header>
  );
}
