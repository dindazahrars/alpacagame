"use client";

import { useEffect, useState } from "react";
import { SceneBackground } from "@/types/game";

interface AtmosphericLayersProps {
  variant: SceneBackground;
}

const BASE_GRADIENTS: Record<SceneBackground, string> = {
  golden:
    "radial-gradient(ellipse at 70% 30%, #FFD166 0%, #FF9A3C 30%, #FFCBA4 60%, #FFE8D6 100%)",
  dusk:
    "radial-gradient(ellipse at 60% 40%, #E8855A 0%, #C0392B 25%, #7B5EA7 60%, #4A3B6B 100%)",
  twilight:
    "radial-gradient(ellipse at 50% 20%, #7B5EA7 0%, #4A3B6B 40%, #2D1B4E 70%, #1A1035 100%)",
  night:
    "radial-gradient(ellipse at 40% 10%, #2D1B4E 0%, #1A1035 50%, #0A0515 100%)",
  dawn:
    "radial-gradient(ellipse at 50% 60%, #FFD166 0%, #FFB5A0 30%, #FFCBA4 60%, #FFF3E8 100%)",
};

export function AtmosphericLayers({ variant }: AtmosphericLayersProps) {
  const [currentVariant, setCurrentVariant] = useState<SceneBackground>(variant);
  const [previousVariant, setPreviousVariant] = useState<SceneBackground | null>(
    null,
  );
  const [showPrevious, setShowPrevious] = useState(false);

  useEffect(() => {
    if (variant === currentVariant) {
      return;
    }

    setPreviousVariant(currentVariant);
    setShowPrevious(true);
    setCurrentVariant(variant);

    const frame = window.requestAnimationFrame(() => {
      setShowPrevious(false);
    });
    const timeout = window.setTimeout(() => {
      setPreviousVariant(null);
    }, 1500);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [variant, currentVariant]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-[1500ms] ease-out"
        style={{
          background: BASE_GRADIENTS[currentVariant],
        }}
      />

      {previousVariant ? (
        <div
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1500ms] ease-out ${
            showPrevious ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: BASE_GRADIENTS[previousVariant],
          }}
        />
      ) : null}

      <div className="pointer-events-none fixed inset-0 z-[1] atmospheric-noise opacity-[0.03]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_48%)]" />
      <div className="pointer-events-none fixed inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)]" />
    </>
  );
}
