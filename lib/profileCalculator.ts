import { PROFILES } from "@/data/profiles";
import {
  DimensionScores,
  MentalHealthProfile,
  PsychDimension,
  ProfileType,
} from "@/types/game";

type ScoreBand = "low" | "medium" | "high";

export function categorize(score: number): ScoreBand {
  if (score <= 8) {
    return "low";
  }

  if (score <= 16) {
    return "medium";
  }

  return "high";
}

export function getDominantDimension(scores: DimensionScores): PsychDimension {
  const entries = Object.entries(scores) as Array<[PsychDimension, number]>;
  const [dimension] = entries.reduce((best, current) => {
    if (current[1] > best[1]) {
      return current;
    }

    return best;
  });

  return dimension;
}

export function getWeakestDimension(scores: DimensionScores): PsychDimension {
  const entries = Object.entries(scores) as Array<[PsychDimension, number]>;
  const [dimension] = entries.reduce((lowest, current) => {
    if (current[1] < lowest[1]) {
      return current;
    }

    return lowest;
  });

  return dimension;
}

export function calculateProfile(scores: DimensionScores): MentalHealthProfile {
  const categories = {
    EMOTIONAL_AWARENESS: categorize(scores.EMOTIONAL_AWARENESS),
    SOCIAL_CONNECTION: categorize(scores.SOCIAL_CONNECTION),
    SELF_COMPASSION: categorize(scores.SELF_COMPASSION),
    STRESS_COPING: categorize(scores.STRESS_COPING),
    HELP_SEEKING: categorize(scores.HELP_SEEKING),
  };

  let type: ProfileType = "calm_explorer";

  if (
    categories.EMOTIONAL_AWARENESS === "low" &&
    categories.STRESS_COPING === "low" &&
    (categories.SELF_COMPASSION === "low" ||
      categories.HELP_SEEKING === "low")
  ) {
    type = "cracked_light";
  } else if (
    categories.STRESS_COPING === "low" &&
    categories.HELP_SEEKING === "low" &&
    categories.SOCIAL_CONNECTION === "low"
  ) {
    type = "silent_fighter";
  } else if (
    categories.EMOTIONAL_AWARENESS === "high" &&
    categories.STRESS_COPING === "low" &&
    categories.SELF_COMPASSION === "low"
  ) {
    type = "burnout_soul";
  } else if (
    ["medium", "high"].includes(categories.SELF_COMPASSION) &&
    categories.HELP_SEEKING === "medium" &&
    ["medium", "high"].includes(categories.EMOTIONAL_AWARENESS)
  ) {
    type = "growing_butterfly";
  } else if (
    categories.SOCIAL_CONNECTION === "high" &&
    categories.SELF_COMPASSION === "high"
  ) {
    type = "warm_hugger";
  }

  return PROFILES[type];
}
