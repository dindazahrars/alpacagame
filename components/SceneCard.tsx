import { ReactNode } from "react";
import { SceneIllustration } from "@/components/SceneIllustration";
import { SETTING_LABELS } from "@/lib/gameConfig";
import { Scenario, SceneBackground } from "@/types/game";

interface SceneCardProps {
  scenario: Scenario;
  background: SceneBackground;
  phase?: "idle" | "entering" | "leaving";
  illustrationOverlay?: ReactNode;
}

export function SceneCard({
  scenario,
  background,
  phase = "idle",
  illustrationOverlay,
}: SceneCardProps) {
  return (
    <section
      className={`story-shell ${
        phase === "entering" ? "content-entering" : phase === "leaving" ? "content-leaving" : ""
      }`}
    >
      <div className="story-illustration">
        <SceneIllustration setting={scenario.setting} background={background} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-[rgba(28,16,11,0.15)]" />
        {illustrationOverlay}
      </div>

      <article className="story-card">
        <span className="story-badge">
          Skenario {String(scenario.scenarioNumber).padStart(2, "0")}
          <span className="opacity-45">{"\u2022"}</span>
          {SETTING_LABELS[scenario.setting]}
        </span>

        <h2 className="story-title">{scenario.title}</h2>

        <div className="mt-4 space-y-3">
          {scenario.situation.map((paragraph, index) => (
            <p
              key={`${scenario.id}-${index}`}
              className="story-copy story-paragraph"
              style={{
                animationDelay: `${index * 180}ms`,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
