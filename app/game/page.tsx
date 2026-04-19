"use client";

import { useEffect, useMemo, useState } from "react";
import { AlpacaAvatar } from "@/components/AlpacaAvatar";
import { AtmosphericLayers } from "@/components/AtmosphericLayers";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { ChoiceButton } from "@/components/ChoiceButton";
import { ResultCard } from "@/components/ResultCard";
import { SceneCard } from "@/components/SceneCard";
import { TopBar } from "@/components/TopBar";
import { useGameState } from "@/hooks/useGameState";
import {
  RESULT_BACKGROUND_MAP,
  SCENARIO_SPEECHES,
  SETTING_BACKGROUND_MAP,
} from "@/lib/gameConfig";
import { Choice } from "@/types/game";

type ContentPhase = "idle" | "entering" | "leaving";

const CHOICE_LABELS = ["A", "B", "C"];

export default function GamePage() {
  const {
    state,
    setPlayerName,
    startNameInput,
    startPlaying,
    submitChoice,
    advanceAfterReaction,
    restartGame,
    getCurrentScenario,
    getProgress,
  } = useGameState();

  const scenario =
    state.phase === "playing" || state.phase === "reaction"
      ? getCurrentScenario()
      : null;

  const progress = getProgress();
  const [contentPhase, setContentPhase] = useState<ContentPhase>("entering");
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  useEffect(() => {
    setContentPhase("entering");
    const timer = window.setTimeout(() => {
      setContentPhase("idle");
    }, 420);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state.phase, state.currentScenarioIndex, state.profile?.type]);

  const background = useMemo(() => {
    if (state.phase === "result" && state.profile) {
      return RESULT_BACKGROUND_MAP[state.profile.type];
    }

    if (state.phase === "name_input") {
      return "dawn";
    }

    if (scenario) {
      return SETTING_BACKGROUND_MAP[scenario.setting];
    }

    return "golden";
  }, [scenario, state.phase, state.profile]);

  const reactionEmotion =
    state.phase === "reaction" && state.lastChoiceReaction
      ? state.lastChoiceReaction.emotion
      : scenario?.alpacaDefaultEmotion ?? "happy";

  const reactionNarrative =
    state.phase === "reaction" && state.lastChoiceReaction
      ? state.lastChoiceReaction.narrative
      : scenario
        ? SCENARIO_SPEECHES[scenario.id]
        : "Aku siap jalan bareng kamu.";

  const handleChoice = (choice: Choice) => {
    if (state.phase !== "playing" || state.isTransitioning) {
      return;
    }

    setSelectedChoiceId(choice.id);
    submitChoice(choice);
  };

  const continueFromReaction = () => {
    if (state.phase !== "reaction") {
      return;
    }

    setContentPhase("leaving");

    window.setTimeout(() => {
      advanceAfterReaction();
      setSelectedChoiceId(null);
    }, 260);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AtmosphericLayers variant={background} />
      <BackgroundCanvas variant={background} />

      <div className="relative z-20 flex min-h-screen flex-col">
        {state.phase !== "intro" ? (
          <TopBar
            current={progress.current}
            total={progress.total}
            playerName={state.playerName || undefined}
          />
        ) : null}

        <div className="flex-1 px-4 pb-16 pt-6 sm:px-6">
          <div className="mx-auto max-w-[680px]">
            {state.phase === "intro" ? (
              <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
                <div className="glass-card-strong w-full max-w-[620px] rounded-[30px] px-5 py-8 text-center sm:px-8 sm:py-10">
                  <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-[rgba(139,94,60,0.62)]">
                    Cerita Interaktif
                  </p>

                  <div className="mt-5 flex justify-center">
                    <div className="rounded-full bg-white/20 p-5 shadow-[0_20px_55px_rgba(232,133,90,0.18)] backdrop-blur-[10px]">
                      <AlpacaAvatar
                        emotion="happy"
                        size="hero"
                        accessories={["stars_around"]}
                      />
                    </div>
                  </div>

                  <h1 className="mt-6 font-display text-[2rem] font-bold text-[#5C2E0A] sm:text-[2.6rem]">
                    Hai! Aku Alpa {"\uD83E\uDD99"}
                  </h1>

                  <div className="mx-auto mt-4 max-w-[520px] space-y-3 font-ui text-[1rem] leading-8 text-[#6B3D1E]">
                    <p>
                      Aku mau ngajak kamu jalan-jalan sebentar. Kita akan menghadapi
                      beberapa situasi sehari-hari bareng.
                    </p>
                    <p>
                      Tidak ada jawaban benar atau salah - cukup pilih yang paling
                      terasa seperti kamu.
                    </p>
                  </div>

                  <p className="mt-4 font-ui text-[0.95rem] leading-7 text-[rgba(92,46,10,0.68)]">
                    Di akhir perjalanan, aku akan ceritakan sesuatu tentang dirimu.{" "}
                    {"\u2728"}
                  </p>

                  <div className="mt-8">
                    <button type="button" onClick={startNameInput} className="primary-cta">
                      Ayo Mulai!
                      <span aria-hidden="true">{"\u2192"}</span>
                    </button>
                  </div>

                  <p className="mx-auto mt-6 max-w-[520px] font-ui text-[0.82rem] leading-6 text-[rgba(92,46,10,0.58)]">
                    Ini bukan diagnosis klinis. Hasilnya adalah refleksi ringan untuk
                    membantu kamu lebih mengenal dirimu sendiri.
                  </p>
                </div>
              </section>
            ) : null}

            {state.phase === "name_input" ? (
              <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
                <div className="glass-card form-shell content-entering">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-white/26 p-3">
                      <AlpacaAvatar emotion="thinking" size="large" />
                    </div>
                  </div>

                  <h1 className="mt-5 text-center font-display text-[1.7rem] font-semibold text-[#5C2E0A]">
                    Eh, boleh aku tahu namamu?
                  </h1>
                  <p className="mt-2 text-center font-ui text-[0.95rem] text-[rgba(92,46,10,0.66)]">
                    Opsional kok. Kalau mau, nanti Alpa akan menyapamu di akhir.
                  </p>

                  <div className="mt-6">
                    <input
                      value={state.playerName}
                      onChange={(event) => setPlayerName(event.target.value)}
                      className="warm-input"
                      placeholder="Panggil aku..."
                      maxLength={24}
                    />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={startPlaying} className="primary-cta">
                      Lanjut
                      <span aria-hidden="true">{"\u2192"}</span>
                    </button>
                    <button type="button" onClick={startPlaying} className="secondary-cta">
                      Lewati saja
                    </button>
                  </div>
                </div>
              </section>
            ) : null}

            {scenario ? (
              <div className="scene-stack">
                <SceneCard
                  scenario={scenario}
                  background={background}
                  phase={contentPhase}
                  illustrationOverlay={
                    <div className="absolute inset-0 flex items-end justify-center pb-2 sm:pb-4">
                      <AlpacaAvatar emotion={scenario.alpacaDefaultEmotion} size="medium" />
                    </div>
                  }
                />

                {state.phase === "playing" || state.phase === "reaction" ? (
                  <section
                    className={`speech-card text-left ${
                      state.phase === "playing" ? "speech-card-connected" : ""
                    } ${
                      contentPhase === "leaving" ? "content-leaving" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                      <div className="rounded-[24px] bg-white/25 p-3">
                        <AlpacaAvatar
                          key={`${scenario.id}-${reactionEmotion}`}
                          emotion={reactionEmotion}
                          size="medium"
                          isReacting={state.phase === "reaction"}
                        />
                      </div>

                      <div className="w-full flex-1">
                        <div className="speech-bubble">
                          <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.48)]">
                            Suara hati Alpa
                          </p>
                          <p className="mt-2 font-display text-[1rem] leading-8 text-[#6B3D1E]">
                            {reactionNarrative}
                          </p>
                        </div>

                        {state.phase === "reaction" ? (
                          <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="reaction-tip">
                              Kalau sudah siap, lanjut ke momen berikutnya.
                            </p>
                            <button
                              type="button"
                              onClick={continueFromReaction}
                              className="primary-cta min-w-[150px] justify-center"
                            >
                              Lanjut
                              <span aria-hidden="true">{"\u2192"}</span>
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </section>
                ) : null}

                {state.phase === "playing" ? (
                  <section className="choice-card choice-card-connected">
                    <p className="choice-heading">
                      {"\u2726"} Apa yang akan Alpa lakukan?
                    </p>
                    <p className="choice-question">{scenario.question}</p>

                    <div className="mt-5 space-y-3">
                      {scenario.choices.map((choice, index) => (
                        <ChoiceButton
                          key={choice.id}
                          choice={choice}
                          label={CHOICE_LABELS[index] ?? String(index + 1)}
                          index={index}
                          isSelected={selectedChoiceId === choice.id}
                          isEntering={contentPhase === "entering"}
                          disabled={state.isTransitioning}
                          onSelect={handleChoice}
                        />
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            ) : null}

            {state.phase === "result" && state.profile ? (
              <ResultCard
                profile={state.profile}
                scores={state.scores}
                playerName={state.playerName || undefined}
                onRestart={restartGame}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
