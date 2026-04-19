"use client";

import { CSSProperties, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AlpacaAccessory, AlpacaEmotion } from "@/types/game";

interface AlpacaAvatarProps {
  emotion: AlpacaEmotion;
  size?: "small" | "medium" | "large" | "hero";
  accessories?: AlpacaAccessory[];
  className?: string;
  isReacting?: boolean;
  interactive?: boolean;
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
  sad: "/alpaca/10.png",
  tired: "/alpaca/16.png",
  crying: "/alpaca/12.png",
  thinking: "/alpaca/6.png",
  surprised: "/alpaca/18.png",
  determined: "/alpaca/7.png",
  cozy: "/alpaca/4.png",
  lonely: "/alpaca/5.png",
  hopeful: "/alpaca/8.png",
  overwhelmed: "/alpaca/3.png",
  peaceful: "/alpaca/9.png",
  proud: "/alpaca/7.png",
  empty: "/alpaca/9.png",
};

const REACTION_IMAGE_MAP: Partial<Record<AlpacaEmotion, string>> = {
  happy: "/alpaca/7.png",
  nervous: "/alpaca/18.png",
  sad: "/alpaca/10.png",
  tired: "/alpaca/16.png",
  crying: "/alpaca/12.png",
  surprised: "/alpaca/18.png",
  determined: "/alpaca/11.png",
  cozy: "/alpaca/14.png",
  lonely: "/alpaca/10.png",
  hopeful: "/alpaca/13.png",
  overwhelmed: "/alpaca/11.png",
  peaceful: "/alpaca/14.png",
  proud: "/alpaca/13.png",
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

const EMOTION_GLOW_MAP: Record<AlpacaEmotion, string> = {
  happy: "rgba(255, 224, 166, 0.44)",
  nervous: "rgba(168, 212, 234, 0.3)",
  sad: "rgba(183, 199, 224, 0.34)",
  tired: "rgba(226, 198, 156, 0.28)",
  crying: "rgba(168, 212, 234, 0.34)",
  thinking: "rgba(201, 184, 232, 0.3)",
  surprised: "rgba(255, 203, 164, 0.36)",
  determined: "rgba(255, 209, 141, 0.36)",
  cozy: "rgba(255, 243, 232, 0.34)",
  lonely: "rgba(183, 199, 224, 0.28)",
  hopeful: "rgba(255, 225, 133, 0.38)",
  overwhelmed: "rgba(232, 133, 90, 0.28)",
  peaceful: "rgba(255, 248, 238, 0.36)",
  proud: "rgba(255, 214, 112, 0.42)",
  empty: "rgba(148, 163, 184, 0.24)",
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

function MoodAccent({
  emotion,
  isVisible,
}: {
  emotion: AlpacaEmotion;
  isVisible: boolean;
}) {
  if (!isVisible) {
    return null;
  }

  if (emotion === "happy" || emotion === "hopeful" || emotion === "proud") {
    return (
      <>
        <Spark className="left-[4%] top-[22%] h-4 w-4 opacity-70" />
        <Spark className="right-[8%] top-[18%] h-3.5 w-3.5 opacity-70" color="#FFF8EE" />
      </>
    );
  }

  if (emotion === "nervous" || emotion === "surprised" || emotion === "overwhelmed") {
    return (
      <>
        <span className="alpaca-accent-ring left-[10%] top-[18%]" />
        <span className="alpaca-accent-ring right-[8%] top-[12%]" />
      </>
    );
  }

  if (emotion === "tired" || emotion === "peaceful" || emotion === "cozy") {
    return (
      <>
        <span className="alpaca-accent-dot left-[10%] top-[18%]" />
        <span className="alpaca-accent-dot right-[12%] top-[14%]" />
        <span className="alpaca-accent-dot right-[8%] top-[25%]" />
      </>
    );
  }

  if (emotion === "sad" || emotion === "crying" || emotion === "lonely") {
    return (
      <>
        <span className="alpaca-accent-drop left-[10%] top-[22%]" />
        <span className="alpaca-accent-drop right-[10%] top-[18%]" />
      </>
    );
  }

  return null;
}

export function AlpacaAvatar({
  emotion,
  size = "medium",
  accessories = [],
  className = "",
  isReacting = false,
  interactive = true,
}: AlpacaAvatarProps) {
  const dimension = SIZE_MAP[size];
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const resetPokeTimerRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPoked, setIsPoked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pointerStyle, setPointerStyle] = useState<{
    rotateX: number;
    rotateY: number;
    translateX: number;
    translateY: number;
    scale: number;
  }>({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resetPokeTimerRef.current) {
        window.clearTimeout(resetPokeTimerRef.current);
      }
    };
  }, []);

  const source =
    isReacting && REACTION_IMAGE_MAP[emotion]
      ? REACTION_IMAGE_MAP[emotion]!
      : EMOTION_IMAGE_MAP[emotion];
  const frameClass = EMOTION_FRAME_CLASS[emotion];
  const filterStyle = EMOTION_FILTER_MAP[emotion];
  const glowColor = EMOTION_GLOW_MAP[emotion];
  const motionStyle = useMemo(
    () =>
      ({
        transform: `perspective(900px) rotateX(${pointerStyle.rotateX}deg) rotateY(${pointerStyle.rotateY}deg) translate3d(${pointerStyle.translateX}px, ${pointerStyle.translateY}px, 0) scale(${pointerStyle.scale})`,
      }) satisfies CSSProperties,
    [pointerStyle],
  );

  const resetMotion = () => {
    setPointerStyle({
      rotateX: 0,
      rotateY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    });
  };

  const triggerPoke = () => {
    if (reducedMotion || !interactive) {
      return;
    }

    setIsPoked(false);

    if (resetPokeTimerRef.current) {
      window.clearTimeout(resetPokeTimerRef.current);
    }

    window.requestAnimationFrame(() => {
      setIsPoked(true);
    });

    resetPokeTimerRef.current = window.setTimeout(() => {
      setIsPoked(false);
    }, 480);
  };

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !interactive || !wrapperRef.current) {
      return;
    }

    const rect = wrapperRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    setPointerStyle({
      rotateX: Number((-relativeY * 8).toFixed(2)),
      rotateY: Number((relativeX * 10).toFixed(2)),
      translateX: Number((relativeX * 6).toFixed(2)),
      translateY: Number((relativeY * -4).toFixed(2)),
      scale: 1.02,
    });
  };

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
      <div
        ref={wrapperRef}
        className="relative h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          resetMotion();
        }}
        onMouseMove={handlePointerMove}
        onMouseDown={triggerPoke}
        onTouchStart={triggerPoke}
      >
        <div
          className={`pointer-events-none absolute inset-x-[15%] bottom-[8%] top-[16%] rounded-[48%] blur-[22px] transition-opacity duration-300 ${
            isHovered || isReacting ? "opacity-100" : "opacity-70"
          }`}
          style={{
            background: `radial-gradient(circle at 50% 36%, ${glowColor} 0%, rgba(255,248,238,0.16) 56%, transparent 100%)`,
          }}
        />

        <div
          className={`alpaca-hover-ring ${isHovered || isReacting ? "alpaca-hover-ring--active" : ""}`}
          style={{
            borderColor: glowColor,
          }}
        />

        <MoodAccent emotion={emotion} isVisible={isHovered || isReacting || isPoked} />

        <div
          className={`relative h-full w-full transition-transform duration-300 ease-out ${frameClass}`}
          style={filterStyle ? { filter: filterStyle } : undefined}
        >
          <div
            className={`alpaca-motion-shell ${isPoked ? "alpaca-motion-shell--poked" : ""}`}
            style={reducedMotion || !interactive ? undefined : motionStyle}
          >
            <Image
              src={source}
              alt=""
              fill
              quality={100}
              unoptimized
              sizes={`${dimension.width}px`}
              className="select-none object-contain drop-shadow-[0_18px_28px_rgba(55,34,28,0.16)]"
            />
          </div>
        </div>

        {accessories.map((accessory) => (
          <AccessoryDecoration key={accessory} accessory={accessory} />
        ))}

        {isPoked ? (
          <>
            <Spark className="left-[6%] top-[14%] h-4 w-4 opacity-80 alpaca-poke-burst" />
            <Spark className="right-[8%] top-[18%] h-3 w-3 opacity-75 alpaca-poke-burst" color="#FFF8EE" />
          </>
        ) : null}
      </div>
    </div>
  );
}
