"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlpacaAvatar } from "@/components/AlpacaAvatar";
import { AtmosphericLayers } from "@/components/AtmosphericLayers";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { ChoiceButton } from "@/components/ChoiceButton";
import { MilestoneScreen } from "@/components/MilestoneScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { SceneCard } from "@/components/SceneCard";
import { TopBar } from "@/components/TopBar";
import { PROFILES } from "@/data/profiles";
import { useGameState } from "@/hooks/useGameState";
import {
  RESULT_BACKGROUND_MAP,
  SCENARIO_SPEECHES,
  SETTING_BACKGROUND_MAP,
} from "@/lib/gameConfig";
import { Choice, SceneBackground } from "@/types/game";

type ContentPhase = "idle" | "entering" | "leaving";

const CHOICE_LABELS = ["A", "B", "C"];

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

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

  return reducedMotion;
}

function getMilestoneNumber(answerCount: number): 1 | 2 | 3 | null {
  if (answerCount === 5) {
    return 1;
  }
  if (answerCount === 10) {
    return 2;
  }
  if (answerCount === 15) {
    return 3;
  }
  return null;
}

function getMilestoneBackground(answerCount: number): SceneBackground {
  if (answerCount === 5) {
    return "golden";
  }
  if (answerCount === 10) {
    return "dusk";
  }
  return "twilight";
}

export default function GamePage() {
  const {
    state,
    savedResult,
    savedProgress,
    lastCompletedProfileTitle,
    setPlayerName,
    startNameInput,
    startPlaying,
    submitChoice,
    advanceAfterReaction,
    continueAfterMilestone,
    restoreSavedProgress,
    restoreSavedResult,
    restartGame,
    getCurrentScenario,
    getProgress,
  } = useGameState();

  const reducedMotion = useReducedMotionPreference();
  const scenario =
    state.phase === "playing" || state.phase === "reaction"
      ? getCurrentScenario()
      : null;

  const progress = getProgress();
  const [contentPhase, setContentPhase] = useState<ContentPhase>("entering");
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [previewChoiceId, setPreviewChoiceId] = useState<string | null>(null);
  const [keyboardChoiceIndex, setKeyboardChoiceIndex] = useState<number | null>(null);
  const [isScenarioLoading, setIsScenarioLoading] = useState(false);

  useEffect(() => {
    setContentPhase("entering");
    const timer = window.setTimeout(() => {
      setContentPhase("idle");
    }, reducedMotion ? 20 : 420);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reducedMotion, state.phase, state.currentScenarioIndex, state.profile?.type]);

  useEffect(() => {
    if (state.phase !== "playing") {
      setIsScenarioLoading(false);
      return;
    }

    setSelectedChoiceId(null);
    setPreviewChoiceId(null);
    setKeyboardChoiceIndex(null);

    if (reducedMotion) {
      setIsScenarioLoading(false);
      return;
    }

    setIsScenarioLoading(true);
    const timer = window.setTimeout(() => {
      setIsScenarioLoading(false);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reducedMotion, state.phase, state.currentScenarioIndex]);

  const milestoneNumber = getMilestoneNumber(state.answers.length);

  const background = useMemo(() => {
    if (state.phase === "result" && state.profile) {
      return RESULT_BACKGROUND_MAP[state.profile.type];
    }

    if (state.phase === "milestone" && milestoneNumber) {
      return getMilestoneBackground(state.answers.length);
    }

    if (state.phase === "name_input") {
      return "dawn";
    }

    if (scenario) {
      return SETTING_BACKGROUND_MAP[scenario.setting];
    }

    return "golden";
  }, [milestoneNumber, scenario, state.answers.length, state.phase, state.profile]);

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

  const previewChoice =
    scenario?.choices.find((choice) => choice.id === previewChoiceId) ?? null;

  const selectedChoice =
    scenario?.choices.find((choice) => choice.id === selectedChoiceId) ?? null;

  const speakingEmotion =
    state.phase === "playing" && previewChoice
      ? previewChoice.alpacaReaction
      : reactionEmotion;

  const speakingNarrative =
    state.phase === "playing" && previewChoice
      ? previewChoice.subtext ?? previewChoice.text
      : reactionNarrative;

  const speakingLabel =
    state.phase === "playing" && previewChoice
      ? "Alpa membayangkan langkah ini"
      : "Suara hati Alpa";

  const handleChoice = useCallback((choice: Choice) => {
    if (state.phase !== "playing" || state.isTransitioning || isScenarioLoading) {
      return;
    }

    setSelectedChoiceId(choice.id);
    setPreviewChoiceId(choice.id);
    submitChoice(choice);
  }, [isScenarioLoading, state.isTransitioning, state.phase, submitChoice]);

  const continueFromReaction = useCallback(() => {
    if (state.phase !== "reaction") {
      return;
    }

    setContentPhase("leaving");

    window.setTimeout(() => {
      advanceAfterReaction();
      setSelectedChoiceId(null);
      setPreviewChoiceId(null);
      setKeyboardChoiceIndex(null);
    }, reducedMotion ? 20 : 260);
  }, [advanceAfterReaction, reducedMotion, state.phase]);

  useEffect(() => {
    const isTypingField = (eventTarget: EventTarget | null) => {
      const element = eventTarget as HTMLElement | null;

      if (!element) {
        return false;
      }

      const tagName = element.tagName.toLowerCase();
      return (
        tagName === "input" ||
        tagName === "textarea" ||
        element.isContentEditable
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingField(event.target)) {
        return;
      }

      if (
        state.phase === "playing" &&
        scenario &&
        !state.isTransitioning &&
        !isScenarioLoading
      ) {
        if (event.key === "1" || event.key === "2" || event.key === "3") {
          const index = Number(event.key) - 1;
          const choice = scenario.choices[index];

          if (!choice) {
            return;
          }

          setKeyboardChoiceIndex(index);
          setSelectedChoiceId(choice.id);
          setPreviewChoiceId(choice.id);
          return;
        }

        if (event.key === "Enter" && keyboardChoiceIndex !== null) {
          const choice = scenario.choices[keyboardChoiceIndex];

          if (choice) {
            event.preventDefault();
            handleChoice(choice);
          }
        }
      }

      if (state.phase === "reaction" && event.key === "Enter") {
        event.preventDefault();
        continueFromReaction();
      }

      if (state.phase === "milestone" && event.key === "Enter") {
        event.preventDefault();
        continueAfterMilestone();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    continueAfterMilestone,
    continueFromReaction,
    handleChoice,
    isScenarioLoading,
    keyboardChoiceIndex,
    scenario,
    state.isTransitioning,
    state.phase,
  ]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AtmosphericLayers variant={background} />
      <BackgroundCanvas variant={background} />

      <div className="relative z-20 flex min-h-screen flex-col">
        {state.phase === "playing" ||
        state.phase === "reaction" ||
        state.phase === "milestone" ? (
          <TopBar
            current={progress.current}
            total={progress.total}
            playerName={state.playerName || undefined}
            variant={background}
            isComplete={state.phase === "milestone" && state.answers.length === progress.total}
          />
        ) : null}

        <div className="flex-1 px-4 pb-16 pt-6 sm:px-6">
          <div className="mx-auto max-w-[720px]">
            {state.phase === "intro" ? (
              <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
                <div className="glass-card-strong w-full max-w-[640px] rounded-[30px] px-5 py-8 text-center sm:px-8 sm:py-10">
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

                  <div className="mx-auto mt-4 max-w-[540px] space-y-3 font-ui text-[1rem] leading-8 text-[#6B3D1E]">
                    <p>
                      Aku mau ngajak kamu jalan-jalan sebentar lewat 20 situasi kecil
                      yang mungkin terasa dekat dengan hidupmu.
                    </p>
                    <p>
                      Tidak ada jawaban benar atau salah. Cukup pilih yang paling
                      terasa seperti kamu.
                    </p>
                  </div>

                  <p className="mt-4 font-ui text-[0.95rem] leading-7 text-[rgba(92,46,10,0.68)]">
                    Di akhir perjalanan, aku akan menunjukkan gambaran kecil tentang
                    caramu menghadapi hari-hari yang rumit. {"\u2728"}
                  </p>

                  <div className="mt-8">
                    <button type="button" onClick={startNameInput} className="primary-cta">
                      Ayo Mulai!
                      <span aria-hidden="true">{"\u2192"}</span>
                    </button>
                  </div>

                  {savedProgress ? (
                    <div className="mt-6 rounded-[22px] border border-white/40 bg-white/45 px-5 py-4 text-left shadow-[0_16px_34px_rgba(92,46,10,0.08)]">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/45 p-2">
                          <AlpacaAvatar emotion="thinking" size="small" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-[1rem] font-semibold text-[#5C2E0A]">
                            Lanjutkan dari tadi?
                          </p>
                          <p className="mt-1 font-ui text-[0.88rem] leading-6 text-[rgba(92,46,10,0.68)]">
                            Perjalananmu masih tersimpan di skenario{" "}
                            {Math.min(savedProgress.currentScenarioIndex + 1, 20)} dari 20.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={restoreSavedProgress}
                        className="secondary-cta mt-4"
                      >
                        Lanjutkan dari tadi
                      </button>
                    </div>
                  ) : null}

                  {savedResult && lastCompletedProfileTitle ? (
                    <div className="mt-4 rounded-[22px] border border-white/40 bg-white/45 px-5 py-4 text-left shadow-[0_16px_34px_rgba(92,46,10,0.08)]">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/45 p-2">
                          <AlpacaAvatar emotion={PROFILES[savedResult.profileType].alpacaVariant} size="small" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-[1rem] font-semibold text-[#5C2E0A]">
                            Lihat hasil terakhirmu
                          </p>
                          <p className="mt-1 font-ui text-[0.88rem] leading-6 text-[rgba(92,46,10,0.68)]">
                            Hasil terakhir{savedResult.playerName ? ` untuk ${savedResult.playerName}` : ""}:{" "}
                            {lastCompletedProfileTitle}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={restoreSavedResult}
                        className="secondary-cta mt-4"
                      >
                        Lihat hasil terakhirmu
                      </button>
                    </div>
                  ) : null}

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
                    Opsional kok. Kalau mau, nanti aku akan menyapamu di hasil akhir.
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

            {state.phase === "milestone" && milestoneNumber ? (
              <MilestoneScreen
                milestoneNumber={milestoneNumber}
                onContinue={continueAfterMilestone}
              />
            ) : null}

            {scenario && (state.phase === "playing" || state.phase === "reaction") ? (
              <div className="scene-stack">
                {isScenarioLoading && state.phase === "playing" ? (
                  <section className="glass-card-strong rounded-[30px] px-5 py-8 text-center">
                    <div className="flex justify-center">
                      <AlpacaAvatar emotion="thinking" size="large" />
                    </div>
                    <p className="mt-4 font-display text-[1.2rem] italic leading-8 text-[#6B3D1E]">
                      Alpa sedang memikirkan momen berikutnya...
                    </p>
                  </section>
                ) : (
                  <>
                    <SceneCard
                      scenario={scenario}
                      background={background}
                      phase={contentPhase}
                      illustrationOverlay={
                        <div className="absolute inset-0 flex items-end justify-center pb-2 sm:pb-4">
                          <AlpacaAvatar
                            emotion={scenario.alpacaDefaultEmotion}
                            size="medium"
                          />
                        </div>
                      }
                    />

                    {state.phase === "playing" ? (
                      <section
                        className={`decision-card text-left ${
                          contentPhase === "leaving" ? "content-leaving" : ""
                        }`}
                      >
                        <div className="decision-top">
                          <div className="decision-avatar-shell">
                            <AlpacaAvatar
                              key={`${scenario.id}-${speakingEmotion}`}
                              emotion={speakingEmotion}
                              size="medium"
                            />
                          </div>

                          <div className="w-full flex-1">
                            <div className={`speech-bubble ${previewChoice ? "speech-bubble-preview" : ""}`}>
                              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.48)]">
                                {speakingLabel}
                              </p>
                              <p className="mt-2 font-display text-[1rem] leading-8 text-[#6B3D1E]">
                                {speakingNarrative}
                              </p>
                              <p className="mt-3 font-ui text-[0.82rem] leading-6 text-[rgba(92,46,10,0.58)]">
                                {previewChoice
                                  ? "Kalau ini terasa paling pas, Alpa akan melangkah dengan perasaan itu."
                                  : "Arahkan pilihan untuk melihat bagaimana Alpa membayangkan langkah berikutnya."}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="decision-divider" />

                        <div className="decision-bottom">
                          <p className="choice-heading">{"\u2726"} Apa yang akan Alpa lakukan?</p>
                          <p className="choice-question">{scenario.question}</p>
                          <p className="mt-2 text-center font-accent text-[10px] uppercase tracking-[0.14em] text-[rgba(92,46,10,0.45)]">
                            Tekan 1, 2, atau 3 lalu Enter jika ingin memilih dengan keyboard
                          </p>

                          <div className="mt-5 space-y-3">
                            {scenario.choices.map((choice, index) => (
                              <ChoiceButton
                                key={choice.id}
                                choice={choice}
                                label={CHOICE_LABELS[index] ?? String(index + 1)}
                                index={index}
                                isSelected={selectedChoiceId === choice.id}
                                isPreviewing={previewChoiceId === choice.id}
                                isEntering={contentPhase === "entering"}
                                disabled={state.isTransitioning || isScenarioLoading}
                                onPreviewStart={(previewingChoice) => {
                                  setPreviewChoiceId(previewingChoice.id);
                                }}
                                onPreviewEnd={() => {
                                  if (state.phase === "playing") {
                                    setPreviewChoiceId(
                                      keyboardChoiceIndex !== null
                                        ? scenario.choices[keyboardChoiceIndex]?.id ?? null
                                        : null,
                                    );
                                  }
                                }}
                                onSelect={handleChoice}
                              />
                            ))}
                          </div>
                        </div>
                      </section>
                    ) : null}

                    {state.phase === "reaction" ? (
                      <section
                        className={`speech-card text-left ${
                          contentPhase === "leaving" ? "content-leaving" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                          <div className="decision-avatar-shell">
                            <AlpacaAvatar
                              key={`${scenario.id}-${reactionEmotion}`}
                              emotion={reactionEmotion}
                              size="medium"
                              isReacting
                            />
                          </div>

                          <div className="w-full flex-1">
                            <div className="speech-bubble">
                              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.48)]">
                                Suara hati Alpa
                              </p>
                              {selectedChoice ? (
                                <div className="mt-2 inline-flex rounded-full bg-[rgba(232,133,90,0.12)] px-3 py-1 font-ui text-[0.76rem] font-semibold text-[#B85A4B]">
                                  Pilihanmu: {selectedChoice.text}
                                </div>
                              ) : null}
                              <p className="mt-2 font-display text-[1rem] leading-8 text-[#6B3D1E]">
                                {reactionNarrative}
                              </p>
                            </div>

                            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <p className="reaction-tip">
                                Kalau sudah siap, klik lanjut atau tekan Enter.
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
                          </div>
                        </div>
                      </section>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}

            {state.phase === "result" && state.profile && state.dimensionResults ? (
              <ResultScreen
                profile={state.profile}
                dimensionResults={state.dimensionResults}
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
