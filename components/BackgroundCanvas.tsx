"use client";

import { useEffect, useRef } from "react";
import { SceneBackground } from "@/types/game";

interface BackgroundCanvasProps {
  variant: SceneBackground;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  colorIndex: number;
  type: "orb" | "star";
}

const PALETTES: Record<SceneBackground, string[]> = {
  golden: ["#FFD166", "#FFECB3", "#FFCBA4", "#FFE8CC"],
  dusk: ["#E8855A", "#FFB37C", "#7B5EA7", "#C89BFF"],
  twilight: ["#7B5EA7", "#B5A3FF", "#4A3B6B", "#C9C4FF"],
  night: ["#DDE6FF", "#C9B8E8", "#FFFFFF", "#A7C6FF"],
  dawn: ["#FFD166", "#FFCFB5", "#FFE8CC", "#FFF3E8"],
};

const BLOB_COLORS: Record<SceneBackground, [string, string, string]> = {
  golden: ["#FFD166", "#E8855A", "#FFF3E8"],
  dusk: ["#E8855A", "#7B5EA7", "#FFD7A1"],
  twilight: ["#7B5EA7", "#4A3B6B", "#C9B8E8"],
  night: ["#4A3B6B", "#A7C6FF", "#FFF8E7"],
  dawn: ["#FFB5A0", "#FFD166", "#FFF3E8"],
};

function hexToRgb(hex: string): RGB {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    size: randomBetween(1.2, 3.4),
    speedY: randomBetween(0.2, 0.5),
    drift: randomBetween(-0.22, 0.22),
    baseOpacity: randomBetween(0.22, 0.82),
    twinkleSpeed: randomBetween(0.0008, 0.0019),
    twinkleOffset: randomBetween(0, Math.PI * 2),
    colorIndex: Math.floor(randomBetween(0, PALETTES.golden.length)),
    type: Math.random() > 0.7 ? "star" : "orb",
  };
}

function resetParticle(
  particle: Particle,
  width: number,
  height: number,
  randomizeY = false,
) {
  particle.x = randomBetween(0, width);
  particle.y = randomizeY ? randomBetween(0, height) : height + randomBetween(8, 72);
  particle.size = randomBetween(1.2, 3.4);
  particle.speedY = randomBetween(0.2, 0.5);
  particle.drift = randomBetween(-0.22, 0.22);
  particle.baseOpacity = randomBetween(0.22, 0.82);
  particle.twinkleSpeed = randomBetween(0.0008, 0.0019);
  particle.twinkleOffset = randomBetween(0, Math.PI * 2);
  particle.colorIndex = Math.floor(randomBetween(0, PALETTES.golden.length));
  particle.type = Math.random() > 0.7 ? "star" : "orb";
}

function drawStar(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha: number,
) {
  context.beginPath();
  context.moveTo(x, y - size);
  context.lineTo(x, y + size);
  context.moveTo(x - size, y);
  context.lineTo(x + size, y);
  context.strokeStyle = color;
  context.lineWidth = Math.max(0.75, size * 0.5);
  context.globalAlpha = alpha;
  context.stroke();
}

export function BackgroundCanvas({ variant }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const currentColorsRef = useRef<RGB[]>(PALETTES[variant].map(hexToRgb));
  const targetColorsRef = useRef<RGB[]>(PALETTES[variant].map(hexToRgb));
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const globalAlphaRef = useRef(1);
  const globalAlphaTargetRef = useRef(1);

  useEffect(() => {
    targetColorsRef.current = PALETTES[variant].map(hexToRgb);
    globalAlphaTargetRef.current = 0.4;

    const timeout = window.setTimeout(() => {
      globalAlphaTargetRef.current = 1;
      particlesRef.current.forEach((particle) => {
        particle.colorIndex = Math.floor(randomBetween(0, PALETTES[variant].length));
      });
    }, 240);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const particleCount = width < 640 ? 30 : 50;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { width, height, dpr };
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(width, height),
      );
    };

    resizeCanvas();

    let previousTimestamp = performance.now();

    const render = (timestamp: number) => {
      const delta = Math.min((timestamp - previousTimestamp) / 16.67, 2);
      previousTimestamp = timestamp;

      const { width, height } = sizeRef.current;
      globalAlphaRef.current +=
        (globalAlphaTargetRef.current - globalAlphaRef.current) * 0.045;

      currentColorsRef.current = currentColorsRef.current.map((color, index) => {
        const target =
          targetColorsRef.current[index] ??
          targetColorsRef.current[targetColorsRef.current.length - 1];

        return {
          r: color.r + (target.r - color.r) * 0.04,
          g: color.g + (target.g - color.g) * 0.04,
          b: color.b + (target.b - color.b) * 0.04,
        };
      });

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      particlesRef.current.forEach((particle) => {
        const motionScale = reduceMotion ? 0.35 : 1;
        particle.y -= particle.speedY * delta * 1.45 * motionScale;
        particle.x +=
          Math.sin(timestamp * particle.twinkleSpeed + particle.twinkleOffset) *
          particle.drift *
          delta *
          2.4 *
          motionScale;

        if (
          particle.y + particle.size < 0 ||
          particle.x < -40 ||
          particle.x > width + 40
        ) {
          resetParticle(particle, width, height);
        }

        const color =
          currentColorsRef.current[particle.colorIndex] ?? currentColorsRef.current[0];
        const twinkle =
          0.62 +
          (Math.sin(timestamp * particle.twinkleSpeed + particle.twinkleOffset) + 1) *
            0.18;
        const alpha = clamp(
          particle.baseOpacity * twinkle * globalAlphaRef.current,
          0.08,
          0.82,
        );
        const rgb = `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;

        context.shadowBlur = particle.type === "star" ? 16 : 22;
        context.shadowColor = `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${alpha * 0.8})`;

        if (particle.type === "star") {
          drawStar(context, particle.x, particle.y, particle.size + 0.4, rgb, alpha);
        } else {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fillStyle = rgb;
          context.globalAlpha = alpha;
          context.fill();
        }
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      animationRef.current = window.requestAnimationFrame(render);
    };

    animationRef.current = window.requestAnimationFrame(render);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }

      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[2] hidden sm:block">
        <div
          className="ambient-blob ambient-blob-a"
          style={{
            background: BLOB_COLORS[variant][0],
          }}
        />
        <div
          className="ambient-blob ambient-blob-b"
          style={{
            background: BLOB_COLORS[variant][1],
            opacity: 0.12,
          }}
        />
        <div
          className="ambient-blob ambient-blob-c"
          style={{
            background: BLOB_COLORS[variant][2],
            opacity: 0.08,
          }}
        />
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
        aria-hidden="true"
      />
    </>
  );
}
