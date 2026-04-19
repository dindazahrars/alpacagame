"use client";

import { useEffect, useId, useState } from "react";
import { ScenarioSetting, SceneBackground } from "@/types/game";

interface SceneIllustrationProps {
  setting: ScenarioSetting;
  background: SceneBackground;
  className?: string;
}

const BG_MAP: Record<SceneBackground, [string, string, string]> = {
  golden: ["#FFB24D", "#FFD78A", "#FFF0D2"],
  dusk: ["#D7644A", "#E8855A", "#7B5EA7"],
  twilight: ["#2D1B4E", "#4A3B6B", "#7B5EA7"],
  night: ["#0A0515", "#1A1035", "#0D0820"],
  dawn: ["#FFB5A0", "#FFCBA4", "#FFF3E8"],
};

function getGradientId(colors: [string, string, string]) {
  return `sky-${colors.map((color) => color.replace("#", "")).join("-")}`;
}

function Sky({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={colors[0]} />
        <stop offset="55%" stopColor={colors[1]} />
        <stop offset="100%" stopColor={colors[2]} />
      </linearGradient>
    </defs>
  );
}

function BedroomMorning({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <rect x="0" y="0" width="1000" height="400" fill="#FFF6EB" opacity="0.55" />
      <rect x="80" y="50" width="250" height="170" rx="16" fill="#FFFDF8" opacity="0.88" />
      <rect x="105" y="76" width="200" height="118" rx="10" fill="#FFE8B6" opacity="0.72" />
      <path d="M305 76 L420 42 L420 226 L305 194 Z" fill="#FFD166" opacity="0.28" />
      <path d="M305 110 L450 66 L450 260 L305 206 Z" fill="#FFD166" opacity="0.12" />
      <rect x="60" y="270" width="300" height="70" rx="22" fill="#F2D8BA" />
      <rect x="82" y="236" width="180" height="56" rx="18" fill="#E8C9A0" />
      <rect x="590" y="220" width="190" height="20" rx="10" fill="#B67C4B" />
      <rect x="610" y="238" width="14" height="84" rx="7" fill="#8B5E3C" />
      <rect x="744" y="238" width="14" height="84" rx="7" fill="#8B5E3C" />
      <rect x="635" y="180" width="120" height="40" rx="12" fill="#D89B62" />
      <rect x="600" y="118" width="22" height="102" rx="10" fill="#8B5E3C" />
      <circle cx="612" cy="104" r="20" fill="#B8D4B8" />
      <circle cx="588" cy="122" r="18" fill="#8FC49A" />
      <circle cx="632" cy="124" r="16" fill="#A5CEA5" />
      <rect x="0" y="330" width="1000" height="70" fill="#EBCB9E" />
    </svg>
  );
}

function CampusHallway({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <rect x="0" y="0" width="1000" height="400" fill="#FFF9F0" opacity="0.5" />
      <path d="M150 0 L350 0 L460 400 L0 400 Z" fill="#F6E3CB" />
      <path d="M850 0 L650 0 L540 400 L1000 400 Z" fill="#F6E3CB" />
      <path d="M350 0 L650 0 L540 400 L460 400 Z" fill="#FFF8EE" opacity="0.9" />
      <path d="M460 400 L500 200 L540 400 Z" fill="#E4C79F" opacity="0.5" />
      <path d="M350 0 L460 400" stroke="#E6C08F" strokeWidth="4" />
      <path d="M650 0 L540 400" stroke="#E6C08F" strokeWidth="4" />
      <path d="M420 70 H578" stroke="#D8A46A" strokeWidth="8" strokeLinecap="round" />
      <rect x="170" y="86" width="120" height="84" rx="10" fill="#FFDFA8" opacity="0.64" />
      <rect x="710" y="78" width="120" height="90" rx="10" fill="#F8C98A" opacity="0.5" />
      {[
        [430, 220, 26],
        [505, 240, 22],
        [570, 216, 24],
      ].map(([x, y, size], index) => (
        <g key={index} opacity="0.4">
          <circle cx={x} cy={y} r={size} fill="#9B6D4C" />
          <rect x={x - 18} y={y + 18} width="36" height="80" rx="18" fill="#9B6D4C" />
        </g>
      ))}
    </svg>
  );
}

function CafeAfternoon({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <rect x="60" y="40" width="420" height="250" rx="24" fill="#FFF6EB" opacity="0.85" />
      <rect x="90" y="70" width="360" height="190" rx="14" fill="#FFD8A6" opacity="0.45" />
      <path d="M450 70 L640 20 L640 310 L450 260 Z" fill="#FFD166" opacity="0.16" />
      <rect x="520" y="250" width="150" height="18" rx="9" fill="#7A4B32" />
      <rect x="548" y="266" width="12" height="74" rx="6" fill="#7A4B32" />
      <rect x="628" y="266" width="12" height="74" rx="6" fill="#7A4B32" />
      <rect x="730" y="254" width="140" height="18" rx="9" fill="#7A4B32" />
      <rect x="756" y="270" width="12" height="70" rx="6" fill="#7A4B32" />
      <rect x="834" y="270" width="12" height="70" rx="6" fill="#7A4B32" />
      <path d="M160 286 h106 a34 34 0 0 0 0 -68 h-106 z" fill="#8B5E3C" opacity="0.92" />
      <path d="M252 252 q24 0 24 22 q0 22 -24 22" fill="none" stroke="#8B5E3C" strokeWidth="8" strokeLinecap="round" />
      <rect x="0" y="330" width="1000" height="70" fill="#E9C59F" />
    </svg>
  );
}

function BedroomNight({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <rect x="0" y="0" width="1000" height="400" fill="#201633" opacity="0.36" />
      <rect x="640" y="48" width="200" height="160" rx="20" fill="#131027" opacity="0.78" />
      <circle cx="766" cy="106" r="24" fill="#FFF8E7" />
      {[
        [706, 78],
        [730, 126],
        [790, 82],
        [812, 138],
      ].map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="2.4" fill="#FFF8E7" opacity="0.9" />
      ))}
      <rect x="72" y="256" width="320" height="72" rx="24" fill="#3B2B4F" />
      <rect x="102" y="224" width="180" height="54" rx="18" fill="#564068" />
      <rect x="520" y="250" width="210" height="18" rx="9" fill="#8B5E3C" />
      <rect x="548" y="266" width="12" height="74" rx="6" fill="#8B5E3C" />
      <rect x="698" y="266" width="12" height="74" rx="6" fill="#8B5E3C" />
      <rect x="534" y="176" width="138" height="72" rx="12" fill="#2A213F" />
      <rect x="560" y="188" width="88" height="46" rx="8" fill="#151122" />
      <circle cx="504" cy="200" r="18" fill="#FFD166" opacity="0.9" />
      <path d="M504 180 L490 236 L518 236 Z" fill="#C37E3C" />
      <circle cx="504" cy="200" r="58" fill="#FFD166" opacity="0.16" />
      <rect x="0" y="330" width="1000" height="70" fill="#1A1528" />
    </svg>
  );
}

function ParkSunset({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <circle cx="500" cy="250" r="70" fill="#FFD166" opacity="0.92" />
      <path d="M0 284 Q220 244 420 292 T1000 280 V400 H0 Z" fill="#7D5A5A" opacity="0.42" />
      <path d="M0 304 Q240 264 460 320 T1000 302 V400 H0 Z" fill="#4C3559" opacity="0.58" />
      <rect x="302" y="236" width="132" height="14" rx="7" fill="#3D271C" />
      <rect x="322" y="250" width="12" height="54" rx="6" fill="#3D271C" />
      <rect x="402" y="250" width="12" height="54" rx="6" fill="#3D271C" />
      <rect x="112" y="178" width="14" height="138" rx="7" fill="#2F1F17" />
      <circle cx="118" cy="148" r="40" fill="#412A1D" />
      <circle cx="92" cy="168" r="28" fill="#412A1D" />
      <circle cx="146" cy="168" r="28" fill="#412A1D" />
      <rect x="836" y="166" width="14" height="150" rx="7" fill="#2F1F17" />
      <circle cx="842" cy="142" r="44" fill="#412A1D" />
      <circle cx="810" cy="168" r="30" fill="#412A1D" />
      <circle cx="874" cy="170" r="30" fill="#412A1D" />
      <path d="M0 320 C120 290 280 300 420 332 C600 370 790 360 1000 318 V400 H0 Z" fill="#5B7B53" />
    </svg>
  );
}

function GroupChat({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);
  const bubbles = [
    { x: 110, y: 86, w: 220, h: 72, fill: "rgba(255,255,255,0.72)" },
    { x: 428, y: 136, w: 240, h: 78, fill: "rgba(168,212,234,0.34)" },
    { x: 240, y: 238, w: 270, h: 82, fill: "rgba(255,255,255,0.5)" },
    { x: 610, y: 76, w: 190, h: 68, fill: "rgba(201,184,232,0.44)" },
  ];

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 16 }).map((__, col) => (
          <circle
            key={`${row}-${col}`}
            cx={70 + col * 56}
            cy={48 + row * 30}
            r="2"
            fill="rgba(255,255,255,0.16)"
          />
        )),
      )}
      {bubbles.map((bubble, index) => (
        <g key={index}>
          <rect x={bubble.x} y={bubble.y} width={bubble.w} height={bubble.h} rx="28" fill={bubble.fill} />
          <path d={`M ${bubble.x + 46} ${bubble.y + bubble.h} L ${bubble.x + 62} ${bubble.y + bubble.h + 18} L ${bubble.x + 86} ${bubble.y + bubble.h}`} fill={bubble.fill} />
          <rect x={bubble.x + 24} y={bubble.y + 22} width={bubble.w - 48} height="10" rx="5" fill="rgba(92,46,10,0.18)" />
          <rect x={bubble.x + 24} y={bubble.y + 42} width={bubble.w - 88} height="10" rx="5" fill="rgba(92,46,10,0.12)" />
        </g>
      ))}
    </svg>
  );
}

function FamilyDinner({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <circle cx="500" cy="82" r="34" fill="#FFD166" />
      <rect x="490" y="0" width="20" height="70" rx="10" fill="#8B5E3C" />
      <circle cx="500" cy="82" r="86" fill="#FFD166" opacity="0.18" />
      <ellipse cx="500" cy="286" rx="270" ry="44" fill="#8B5E3C" />
      <ellipse cx="500" cy="272" rx="250" ry="34" fill="#A77145" />
      {[
        [370, 264],
        [470, 256],
        [566, 260],
        [650, 270],
      ].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="24" fill="#FFF8EE" opacity="0.9" />
          <circle cx={x} cy={y} r="13" fill="#FFDFA8" opacity="0.8" />
        </g>
      ))}
      <rect x="294" y="244" width="18" height="94" rx="9" fill="#7A4B32" />
      <rect x="690" y="244" width="18" height="94" rx="9" fill="#7A4B32" />
      <rect x="330" y="202" width="24" height="90" rx="12" fill="#B07D52" opacity="0.6" />
      <rect x="646" y="202" width="24" height="90" rx="12" fill="#B07D52" opacity="0.6" />
      <rect x="0" y="336" width="1000" height="64" fill="#D9B388" />
    </svg>
  );
}

function ExamRoom({ colors }: { colors: [string, string, string] }) {
  const gradientId = getGradientId(colors);

  return (
    <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
      <Sky colors={colors} />
      <rect width="1000" height="400" fill={`url(#${gradientId})`} />
      <rect x="0" y="0" width="1000" height="400" fill="#F4F2FB" opacity="0.42" />
      <rect x="90" y="44" width="180" height="128" rx="16" fill="#F8FBFF" opacity="0.82" />
      <rect x="116" y="70" width="128" height="74" rx="10" fill="#DCE8F8" opacity="0.72" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = 200 + col * 150 + row * 18;
          const y = 170 + row * 62;

          return (
            <g key={`${row}-${col}`} opacity={0.9 - row * 0.15}>
              <rect x={x} y={y} width="86" height="18" rx="8" fill="#C1A58B" />
              <rect x={x + 12} y={y + 18} width="10" height="42" rx="5" fill="#8B5E3C" />
              <rect x={x + 64} y={y + 18} width="10" height="42" rx="5" fill="#8B5E3C" />
            </g>
          );
        }),
      )}
      <path d="M100 168 L500 80 L900 168" fill="none" stroke="rgba(92,46,10,0.16)" strokeWidth="4" />
      <path d="M80 332 L500 120 L920 332" fill="none" stroke="rgba(92,46,10,0.12)" strokeWidth="4" />
    </svg>
  );
}

function IllustrationGraphic({
  setting,
  background,
}: {
  setting: ScenarioSetting;
  background: SceneBackground;
}) {
  const colors = BG_MAP[background];

  switch (setting) {
    case "bedroom_morning":
      return <BedroomMorning colors={colors} />;
    case "campus_hallway":
      return <CampusHallway colors={colors} />;
    case "cafe_afternoon":
      return <CafeAfternoon colors={colors} />;
    case "bedroom_night":
      return <BedroomNight colors={colors} />;
    case "park_sunset":
      return <ParkSunset colors={colors} />;
    case "group_chat":
      return <GroupChat colors={colors} />;
    case "family_dinner":
      return <FamilyDinner colors={colors} />;
    case "exam_room":
      return <ExamRoom colors={colors} />;
    default:
      return <BedroomMorning colors={colors} />;
  }
}

export function SceneIllustration({
  setting,
  background,
  className = "",
}: SceneIllustrationProps) {
  const [activeKey, setActiveKey] = useState(`${setting}-${background}`);
  const [previousKey, setPreviousKey] = useState<string | null>(null);
  const [showPrevious, setShowPrevious] = useState(false);
  const uniqueId = useId();

  useEffect(() => {
    const nextKey = `${setting}-${background}`;

    if (nextKey === activeKey) {
      return;
    }

    setPreviousKey(activeKey);
    setShowPrevious(true);
    setActiveKey(nextKey);

    const frame = window.requestAnimationFrame(() => {
      setShowPrevious(false);
    });
    const timeout = window.setTimeout(() => {
      setPreviousKey(null);
    }, 640);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [activeKey, background, setting]);

  const [activeSetting, activeBackground] = activeKey.split("-") as [
    ScenarioSetting,
    SceneBackground,
  ];

  const previousParts = previousKey
    ? (previousKey.split("-") as [ScenarioSetting, SceneBackground])
    : null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="illustration-layer opacity-100">
        <IllustrationGraphic
          setting={activeSetting}
          background={activeBackground}
          key={`${uniqueId}-${activeKey}`}
        />
      </div>

      {previousParts ? (
        <div
          className={`illustration-layer previous ${
            showPrevious ? "opacity-100" : "opacity-0"
          }`}
        >
          <IllustrationGraphic
            setting={previousParts[0]}
            background={previousParts[1]}
            key={`${uniqueId}-${previousKey}`}
          />
        </div>
      ) : null}
    </div>
  );
}
