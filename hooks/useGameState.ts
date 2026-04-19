"use client";

import { useEffect, useMemo, useState } from "react";
import { SCENARIOS } from "@/data/scenarios";
import { PROFILES } from "@/data/profiles";
import { EMPTY_SCORES } from "@/lib/gameConfig";
import {
  calculateDimensionResults,
  calculateProfile,
  createFallbackProfile,
} from "@/lib/profileCalculator";
import {
  Choice,
  DetailedProfile,
  DimensionResult,
  DimensionScores,
  GamePhase,
  GameState,
  PsychDimension,
  Scenario,
} from "@/types/game";

const COMPLETED_SESSION_KEY = "alpaca_game_session";
const PROGRESS_SESSION_KEY = "alpaca_game_progress";
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const MILESTONE_BREAKPOINTS = [5, 10, 15];

interface CompletedGameSession {
  playerName: string;
  completedAt: string;
  profileType: DetailedProfile["type"];
  scores: DimensionScores;
  weeklyChallengeTaken: boolean;
}

interface InProgressSession {
  playerName: string;
  currentScenarioIndex: number;
  answers: GameState["answers"];
  scores: DimensionScores;
  lastChoiceReaction: GameState["lastChoiceReaction"];
  phase: Extract<GamePhase, "playing" | "reaction" | "milestone">;
  showMilestone: boolean;
}

function createInitialScores(): DimensionScores {
  return {
    ...EMPTY_SCORES,
  };
}

export const initialState: GameState = {
  phase: "intro",
  playerName: "",
  currentScenarioIndex: 0,
  answers: [],
  scores: createInitialScores(),
  profile: null,
  dimensionResults: null,
  lastChoiceReaction: null,
  isTransitioning: false,
  showMilestone: false,
};

function createInitialState(): GameState {
  return {
    ...initialState,
    answers: [],
    scores: createInitialScores(),
    dimensionResults: null,
  };
}

function applyChoiceScores(
  previousScores: DimensionScores,
  choice: Choice,
): DimensionScores {
  const nextScores = {
    ...previousScores,
  };

  choice.weights.forEach((weight) => {
    nextScores[weight.dimension] += weight.score;
  });

  return nextScores;
}

function isValidPhase(
  phase: string,
): phase is Extract<GamePhase, "playing" | "reaction" | "milestone"> {
  return phase === "playing" || phase === "reaction" || phase === "milestone";
}

function parseCompletedSession(raw: string | null): CompletedGameSession | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as CompletedGameSession;

    if (!parsed.completedAt || !parsed.profileType || !parsed.scores) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function parseInProgressSession(raw: string | null): InProgressSession | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as InProgressSession;

    if (
      typeof parsed.currentScenarioIndex !== "number" ||
      !parsed.scores ||
      !Array.isArray(parsed.answers) ||
      !isValidPhase(parsed.phase)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function buildOutcome(scores: DimensionScores): {
  profile: DetailedProfile;
  dimensionResults: Record<PsychDimension, DimensionResult>;
} {
  try {
    return {
      profile: calculateProfile(scores),
      dimensionResults: calculateDimensionResults(scores),
    };
  } catch {
    const fallback = createFallbackProfile();
    return {
      profile: fallback,
      dimensionResults: calculateDimensionResults(scores),
    };
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(() => createInitialState());
  const [savedResult, setSavedResult] = useState<CompletedGameSession | null>(null);
  const [savedProgress, setSavedProgress] = useState<InProgressSession | null>(null);
  const [hasHydratedStorage, setHasHydratedStorage] = useState(false);

  useEffect(() => {
    const lastCompleted = parseCompletedSession(
      window.localStorage.getItem(COMPLETED_SESSION_KEY),
    );
    const progressSnapshot = parseInProgressSession(
      window.sessionStorage.getItem(PROGRESS_SESSION_KEY),
    );

    if (
      lastCompleted &&
      Date.now() - new Date(lastCompleted.completedAt).getTime() <= DAY_IN_MS
    ) {
      setSavedResult(lastCompleted);
    } else if (lastCompleted) {
      window.localStorage.removeItem(COMPLETED_SESSION_KEY);
    }

    if (progressSnapshot) {
      setSavedProgress(progressSnapshot);
    }

    setHasHydratedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedStorage) {
      return;
    }

    if (state.phase === "result" && state.profile) {
      const shouldPreserveChallenge = state.answers.length === 0;
      const session: CompletedGameSession = {
        playerName: state.playerName,
        completedAt:
          shouldPreserveChallenge && savedResult?.completedAt
            ? savedResult.completedAt
            : new Date().toISOString(),
        profileType: state.profile.type,
        scores: state.scores,
        weeklyChallengeTaken:
          shouldPreserveChallenge && savedResult
            ? savedResult.weeklyChallengeTaken
            : false,
      };

      window.localStorage.setItem(COMPLETED_SESSION_KEY, JSON.stringify(session));
      window.sessionStorage.removeItem(PROGRESS_SESSION_KEY);
      setSavedResult(session);
      setSavedProgress(null);
      return;
    }

    if (
      state.phase === "playing" ||
      state.phase === "reaction" ||
      state.phase === "milestone"
    ) {
      const session: InProgressSession = {
        playerName: state.playerName,
        currentScenarioIndex: state.currentScenarioIndex,
        answers: state.answers,
        scores: state.scores,
        lastChoiceReaction: state.lastChoiceReaction,
        phase: state.phase,
        showMilestone: state.showMilestone,
      };

      window.sessionStorage.setItem(PROGRESS_SESSION_KEY, JSON.stringify(session));
      setSavedProgress(session);
      return;
    }

    window.sessionStorage.removeItem(PROGRESS_SESSION_KEY);
    setSavedProgress(null);
  }, [hasHydratedStorage, savedResult, state]);

  const setPlayerName = (playerName: string) => {
    setState((previousState) => ({
      ...previousState,
      playerName,
    }));
  };

  const setPhase = (phase: GamePhase) => {
    setState((previousState) => ({
      ...previousState,
      phase,
    }));
  };

  const startNameInput = () => {
    setState((previousState) => ({
      ...createInitialState(),
      phase: "name_input",
      playerName: previousState.playerName,
    }));
    window.sessionStorage.removeItem(PROGRESS_SESSION_KEY);
    setSavedProgress(null);
  };

  const startPlaying = () => {
    setState((previousState) => ({
      ...previousState,
      phase: "playing",
      playerName: previousState.playerName.trim(),
      isTransitioning: false,
      showMilestone: false,
    }));
  };

  const submitChoice = (choice: Choice): void => {
    setState((previousState) => {
      const scenario = SCENARIOS[previousState.currentScenarioIndex];
      const scores = applyChoiceScores(previousState.scores, choice);

      return {
        ...previousState,
        answers: [
          ...previousState.answers,
          {
            scenarioId: scenario.id,
            choiceId: choice.id,
            weights: choice.weights,
          },
        ],
        scores,
        lastChoiceReaction: {
          emotion: choice.alpacaReaction,
          narrative: choice.narrativeResponse,
        },
        phase: "reaction",
        isTransitioning: true,
      };
    });
  };

  const advanceAfterReaction = () => {
    setState((previousState) => {
      const completedCount = previousState.answers.length;
      const nextIndex = previousState.currentScenarioIndex + 1;

      if (completedCount >= SCENARIOS.length) {
        const outcome = buildOutcome(previousState.scores);

        return {
          ...previousState,
          phase: "result",
          profile: outcome.profile,
          dimensionResults: outcome.dimensionResults,
          lastChoiceReaction: null,
          isTransitioning: false,
          showMilestone: false,
        };
      }

      if (MILESTONE_BREAKPOINTS.includes(completedCount)) {
        return {
          ...previousState,
          currentScenarioIndex: nextIndex,
          phase: "milestone",
          lastChoiceReaction: null,
          isTransitioning: false,
          showMilestone: true,
        };
      }

      return {
        ...previousState,
        currentScenarioIndex: nextIndex,
        phase: "playing",
        lastChoiceReaction: null,
        isTransitioning: false,
        showMilestone: false,
      };
    });
  };

  const continueAfterMilestone = () => {
    setState((previousState) => ({
      ...previousState,
      phase: "playing",
      isTransitioning: false,
      showMilestone: false,
    }));
  };

  const restoreSavedProgress = () => {
    if (!savedProgress) {
      return;
    }

    setState({
      ...createInitialState(),
      playerName: savedProgress.playerName,
      currentScenarioIndex: savedProgress.currentScenarioIndex,
      answers: savedProgress.answers,
      scores: savedProgress.scores,
      lastChoiceReaction: savedProgress.lastChoiceReaction,
      phase: savedProgress.phase,
      showMilestone: savedProgress.showMilestone,
      isTransitioning: false,
    });
  };

  const restoreSavedResult = () => {
    if (!savedResult) {
      return;
    }

    const profile = PROFILES[savedResult.profileType] ?? createFallbackProfile();
    const dimensionResults = calculateDimensionResults(savedResult.scores);

    setState({
      ...createInitialState(),
      phase: "result",
      playerName: savedResult.playerName,
      currentScenarioIndex: SCENARIOS.length - 1,
      answers: [],
      scores: savedResult.scores,
      profile,
      dimensionResults,
      lastChoiceReaction: null,
      isTransitioning: false,
      showMilestone: false,
    });
  };

  const restartGame = () => {
    setState(createInitialState());
    window.sessionStorage.removeItem(PROGRESS_SESSION_KEY);
    setSavedProgress(null);
  };

  const getCurrentScenario = (): Scenario => {
    return SCENARIOS[state.currentScenarioIndex];
  };

  const getProgress = (): { current: number; total: number } => {
    if (state.phase === "intro" || state.phase === "name_input") {
      return {
        current: 0,
        total: SCENARIOS.length,
      };
    }

    if (state.phase === "milestone") {
      return {
        current: state.answers.length,
        total: SCENARIOS.length,
      };
    }

    if (state.phase === "reaction") {
      return {
        current: Math.min(state.currentScenarioIndex + 1, SCENARIOS.length),
        total: SCENARIOS.length,
      };
    }

    if (state.phase === "result") {
      return {
        current: SCENARIOS.length,
        total: SCENARIOS.length,
      };
    }

    return {
      current: state.currentScenarioIndex + 1,
      total: SCENARIOS.length,
    };
  };

  const lastCompletedProfileTitle = useMemo(() => {
    if (!savedResult) {
      return null;
    }

    return PROFILES[savedResult.profileType]?.title ?? null;
  }, [savedResult]);

  return {
    state,
    savedResult,
    savedProgress,
    lastCompletedProfileTitle,
    setPlayerName,
    setPhase,
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
  };
}
