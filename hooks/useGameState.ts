"use client";

import { useState } from "react";
import { SCENARIOS } from "@/data/scenarios";
import { EMPTY_SCORES } from "@/lib/gameConfig";
import { calculateProfile } from "@/lib/profileCalculator";
import {
  Choice,
  DimensionScores,
  GamePhase,
  GameState,
  Scenario,
} from "@/types/game";

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
  lastChoiceReaction: null,
  isTransitioning: false,
};

function createInitialState(): GameState {
  return {
    ...initialState,
    answers: [],
    scores: createInitialScores(),
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

export function useGameState() {
  const [state, setState] = useState<GameState>(() => createInitialState());

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
    setPhase("name_input");
  };

  const startPlaying = () => {
    setState((previousState) => ({
      ...previousState,
      phase: "playing",
      playerName: previousState.playerName.trim(),
      isTransitioning: false,
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
      const nextIndex = previousState.currentScenarioIndex + 1;

      if (nextIndex >= SCENARIOS.length) {
        return {
          ...previousState,
          phase: "result",
          profile: calculateProfile(previousState.scores),
          lastChoiceReaction: null,
          isTransitioning: false,
        };
      }

      return {
        ...previousState,
        currentScenarioIndex: nextIndex,
        phase: "playing",
        lastChoiceReaction: null,
        isTransitioning: false,
      };
    });
  };

  const restartGame = () => {
    setState(createInitialState());
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

    if (state.phase === "reaction") {
      return {
        current: Math.min(state.currentScenarioIndex + 2, SCENARIOS.length),
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

  return {
    state,
    setPlayerName,
    startNameInput,
    startPlaying,
    submitChoice,
    advanceAfterReaction,
    restartGame,
    getCurrentScenario,
    getProgress,
  };
}
