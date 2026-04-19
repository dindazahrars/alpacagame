"use client";

import Image from "next/image";
import { AlpacaAccessory, AlpacaEmotion } from "@/types/game";

interface AlpacaAvatarProps {
  emotion: AlpacaEmotion;
  size?: "small" | "medium" | "large" | "hero";
  accessories?: AlpacaAccessory[];
  className?: string;
  isReacting?: boolean;
}

const SIZE_MAP = {
  small: { width: 88, height: 126 },
  medium: { width: 156, height: 224 },
  large: { width: 228, height: 320 },
  hero: { width: 320, height: 444 },
} as const;

const IDLE_CLASS: Record<AlpacaEmotion, string> = {
  happy: "alpaca-idle-bounce",
  nervous: "alpaca-idle-shake",
  sad: "alpaca-idle-sway",
  tired: "alpaca-idle-breathe",
  crying: "alpaca-idle-sway",
  thinking: "alpaca-idle-tilt",
  surprised: "alpaca-idle-pulse",
  determined: "alpaca-idle-bounce",
  cozy: "alpaca-idle-breathe",
  lonely: "alpaca-idle-sway",
  hopeful: "alpaca-idle-bounce",
  overwhelmed: "alpaca-idle-shake",
  peaceful: "alpaca-idle-float",
  proud: "alpaca-idle-bounce",
  empty: "alpaca-idle-sway",
};

// Use the user-provided alpaca crops and map nearby moods to the closest pose.
const EMOTION_IMAGE_MAP: Record<AlpacaEmotion, string> = {
  happy: "/alpaca/1.png",
  nervous: "/alpaca/2.png",
  sad: "/alpaca/6.png",
  tired: "/alpaca/9.png",
  crying: "/alpaca/5.png",
  thinking: "/alpaca/6.png",
  surprised: "/alpaca/2.png",
  determined: "/alpaca/7.png",
  cozy: "/alpaca/4.png",
  lonely: "/alpaca/6.png",
  hopeful: "/alpaca/8.png",
  overwhelmed: "/alpaca/3.png",
  peaceful: "/alpaca/9.png",
  proud: "/alpaca/7.png",
  empty: "/alpaca/9.png",
};

const EMOTION_FRAME_CLASS: Record<AlpacaEmotion, string> = {
  happy: "scale-[1.01]",
  nervous: "translate-y-1 scale-[0.98]",
  sad: "translate-y-3 scale-[0.95]",
  tired: "translate-y-3 scale-[0.94]",
  crying: "translate-y-2 scale-[0.97]",
  thinking: "translate-y-2 scale-[0.96]",
  surprised: "-translate-y-1 scale-[0.99]",
  determined: "-translate-y-1 scale-[1.02]",
  cozy: "translate-y-2 scale-[0.96]",
  lonely: "translate-y-3 scale-[0.94]",
  hopeful: "-translate-y-1 scale-[1.01]",
  overwhelmed: "translate-y-1 scale-[0.98]",
  peaceful: "translate-y-3 scale-[0.95]",
  proud: "-translate-y-1 scale-[1.02]",
  empty: "translate-y-3 scale-[0.94]",
};

const EMOTION_FILTER_MAP: Partial<Record<AlpacaEmotion, string>> = {
  sad: "saturate(0.92) brightness(0.98)",
  tired: "saturate(0.9) brightness(0.97)",
  lonely: "saturate(0.9) brightness(0.96)",
  peaceful: "saturate(0.94) brightness(1.02)",
  empty: "grayscale(0.18) saturate(0.78) brightness(0.95)",
};

function Spark({
  className,
  color = "#FFE9B5",
}: {
  className: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={`pointer-events-none absolute ${className} alpaca-sparkle`}
      aria-hidden="true"
    >
      <path
        d="M14 2 L16.8 11.2 L26 14 L16.8 16.8 L14 26 L11.2 16.8 L2 14 L11.2 11.2 Z"
        fill={color}
      />
    </svg>
  );
}

function AccessoryDecoration({
  accessory,
}: {
  accessory: AlpacaAccessory;
}) {
  switch (accessory) {
    case "stars_around":
      return (
        <>
          <Spark className="left-[2%] top-[16%] h-5 w-5 opacity-90" />
          <Spark
            className="right-[4%] top-[12%] h-4 w-4 opacity-80"
            color="#FFF8EE"
          />
          <Spark
            className="right-[10%] top-[34%] h-3.5 w-3.5 opacity-75"
            color="#FFD166"
          />
        </>
      );

    case "heart_balloon":
      return (
        <svg
          viewBox="0 0 120 180"
          className="pointer-events-none absolute right-[-3%] top-[5%] h-[38%] w-[28%]"
          aria-hidden="true"
        >
          <path
            d="M60 44 C60 28 79 22 87 36 C95 22 114 28 114 44 C114 60 87 84 87 84 C87 84 60 60 60 44 Z"
            fill="#E8855A"
          />
          <path
            d="M87 84 C83 106 79 124 74 160"
            fill="none"
            stroke="#E8855A"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );

    case "broken_heart":
      return (
        <svg
          viewBox="0 0 80 80"
          className="pointer-events-none absolute right-[3%] top-[18%] h-10 w-10"
          aria-hidden="true"
        >
          <path
            d="M18 26 C18 15 31 11 36 20 C41 11 54 15 54 26 C54 35 42 46 36 52 C30 46 18 35 18 26 Z"
            fill="#D4687A"
          />
          <path
            d="M36 20 L31 30 L38 34 L34 46"
            fill="none"
            stroke="#FFF8EE"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "flower_wreath":
      return (
        <svg
          viewBox="0 0 220 70"
          className="pointer-events-none absolute left-1/2 top-[4%] h-[16%] w-[68%] -translate-x-1/2"
          aria-hidden="true"
        >
          {[
            [26, 40, "#F2A7B0"],
            [62, 24, "#FFD166"],
            [110, 18, "#FFCBA4"],
            [158, 24, "#F2A7B0"],
            [194, 40, "#FFD166"],
          ].map(([x, y, color], index) => (
            <g key={`flower-${index}`} transform={`translate(${x} ${y})`}>
              <circle cx="0" cy="0" r="8" fill={String(color)} />
              <circle cx="-7" cy="0" r="5" fill="#FFF8EE" />
              <circle cx="7" cy="0" r="5" fill="#FFF8EE" />
              <circle cx="0" cy="-7" r="5" fill="#FFF8EE" />
              <circle cx="0" cy="7" r="5" fill="#FFF8EE" />
            </g>
          ))}
        </svg>
      );

    case "tiny_crown":
      return (
        <svg
          viewBox="0 0 90 50"
          className="pointer-events-none absolute left-1/2 top-[2%] h-[14%] w-[26%] -translate-x-1/2"
          aria-hidden="true"
        >
          <path
            d="M8 34 L18 12 L34 28 L46 10 L58 28 L74 12 L82 34 Z"
            fill="#FFD166"
            stroke="#E0A93A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="8" y="34" width="74" height="10" rx="5" fill="#F4A636" />
        </svg>
      );

    case "scarf":
      return (
        <>
          <div className="pointer-events-none absolute bottom-[18%] left-1/2 h-[8%] w-[42%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#B85A4B_0%,#CF7D62_50%,#B85A4B_100%)] opacity-90 shadow-[0_8px_18px_rgba(184,90,75,0.18)]" />
          <div className="pointer-events-none absolute bottom-[13%] left-[56%] h-[11%] w-[9%] rounded-b-[16px] rounded-t-[8px] bg-[linear-gradient(180deg,#CF7D62_0%,#B85A4B_100%)] opacity-90" />
        </>
      );

    case "backpack":
      return (
        <>
          <div className="pointer-events-none absolute left-[6%] bottom-[27%] h-[19%] w-[9%] rounded-full bg-[#8FC49A]/70 blur-[1px]" />
          <div className="pointer-events-none absolute right-[6%] bottom-[27%] h-[19%] w-[9%] rounded-full bg-[#6B9E7A]/70 blur-[1px]" />
        </>
      );

    default:
      return null;
  }
}

export function AlpacaAvatar({
  emotion,
  size = "medium",
  accessories = [],
  className = "",
  isReacting = false,
}: AlpacaAvatarProps) {
  const dimension = SIZE_MAP[size];
  const source = EMOTION_IMAGE_MAP[emotion];
  const frameClass = EMOTION_FRAME_CLASS[emotion];
  const filterStyle = EMOTION_FILTER_MAP[emotion];

  return (
    <div
      className={`alpaca-avatar ${IDLE_CLASS[emotion]} ${
        isReacting ? "alpaca-reacting" : ""
      } ${className}`}
      style={{
        width: dimension.width,
        height: dimension.height,
      }}
      aria-hidden="true"
    >
      <div className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-x-[15%] bottom-[8%] top-[16%] rounded-[48%] bg-[radial-gradient(circle_at_50%_36%,rgba(255,248,238,0.48)_0%,rgba(255,248,238,0.14)_56%,transparent_100%)] blur-[22px]" />

        <div
          className={`relative h-full w-full transition-transform duration-300 ease-out ${frameClass}`}
          style={filterStyle ? { filter: filterStyle } : undefined}
        >
          <Image
            src={source}
            alt=""
            fill
            quality={100}
            sizes={`${dimension.width}px`}
            className="select-none object-contain drop-shadow-[0_18px_28px_rgba(55,34,28,0.16)]"
          />
        </div>

        {accessories.map((accessory) => (
          <AccessoryDecoration key={accessory} accessory={accessory} />
        ))}
      </div>
    </div>
  );
}
