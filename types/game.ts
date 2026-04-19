export type SceneBackground =
  | "golden"
  | "dusk"
  | "twilight"
  | "night"
  | "dawn";

export type PsychDimension =
  | "EMOTIONAL_AWARENESS"
  | "SOCIAL_CONNECTION"
  | "SELF_COMPASSION"
  | "STRESS_COPING"
  | "HELP_SEEKING";

export interface DimensionScores {
  EMOTIONAL_AWARENESS: number;
  SOCIAL_CONNECTION: number;
  SELF_COMPASSION: number;
  STRESS_COPING: number;
  HELP_SEEKING: number;
}

export type DimensionLevel =
  | "critical"
  | "low"
  | "developing"
  | "healthy"
  | "thriving";

export interface DimensionResult {
  score: number;
  level: DimensionLevel;
  label: string;
  description: string;
  icon: string;
}

export interface ChoiceWeight {
  dimension: PsychDimension;
  score: number;
}

export interface Choice {
  id: string;
  text: string;
  subtext?: string;
  weights: ChoiceWeight[];
  alpacaReaction: AlpacaEmotion;
  narrativeResponse: string;
}

export interface Scenario {
  id: string;
  scenarioNumber: number;
  setting: ScenarioSetting;
  title: string;
  situation: string[];
  question: string;
  choices: Choice[];
  alpacaDefaultEmotion: AlpacaEmotion;
}

export type AlpacaEmotion =
  | "happy"
  | "nervous"
  | "sad"
  | "tired"
  | "crying"
  | "thinking"
  | "surprised"
  | "determined"
  | "cozy"
  | "lonely"
  | "hopeful"
  | "overwhelmed"
  | "peaceful"
  | "proud"
  | "empty";

export type AlpacaAccessory =
  | "tiny_crown"
  | "flower_wreath"
  | "scarf"
  | "backpack"
  | "heart_balloon"
  | "broken_heart"
  | "stars_around";

export type ScenarioSetting =
  | "bedroom_morning"
  | "campus_hallway"
  | "cafe_afternoon"
  | "bedroom_night"
  | "park_sunset"
  | "group_chat"
  | "family_dinner"
  | "exam_room";

export type ProfileType =
  | "silent_fighter"
  | "burnout_soul"
  | "growing_butterfly"
  | "warm_hugger"
  | "calm_explorer"
  | "cracked_light"
  | "overthinker_heart"
  | "hidden_helper"
  | "resilient_seed"
  | "numb_wanderer";

export interface ProfileColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}

export interface DetailedProfile {
  type: ProfileType;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  strengths: string[];
  challenges: string[];
  blindSpots: string[];
  gentleMessage: string;
  weeklyChallenge: string;
  actionSuggestions: string[];
  affirmation: string;
  needsProfessionalNote: boolean;
  urgencyLevel: "none" | "suggested" | "recommended" | "urgent";
  alpacaVariant: AlpacaEmotion;
  accessories: AlpacaAccessory[];
  colorTheme: ProfileColorTheme;
  relatedProfiles: ProfileType[];
}

export type MentalHealthProfile = DetailedProfile;

export interface GameState {
  phase: GamePhase;
  playerName: string;
  currentScenarioIndex: number;
  answers: AnsweredScenario[];
  scores: DimensionScores;
  profile: DetailedProfile | null;
  dimensionResults: Record<PsychDimension, DimensionResult> | null;
  lastChoiceReaction: {
    emotion: AlpacaEmotion;
    narrative: string;
  } | null;
  isTransitioning: boolean;
  showMilestone: boolean;
}

export type GamePhase =
  | "intro"
  | "name_input"
  | "playing"
  | "reaction"
  | "milestone"
  | "result";

export interface AnsweredScenario {
  scenarioId: string;
  choiceId: string;
  weights: ChoiceWeight[];
}
