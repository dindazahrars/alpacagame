import { SCENARIOS } from "@/data/scenarios";
import { PROFILES } from "@/data/profiles";
import {
  DetailedProfile,
  DimensionLevel,
  DimensionResult,
  DimensionScores,
  PsychDimension,
  ProfileType,
} from "@/types/game";

type MaxDimensionScores = Record<PsychDimension, number>;

function buildMaxRawScores(): MaxDimensionScores {
  const totals: MaxDimensionScores = {
    EMOTIONAL_AWARENESS: 0,
    SOCIAL_CONNECTION: 0,
    SELF_COMPASSION: 0,
    STRESS_COPING: 0,
    HELP_SEEKING: 0,
  };

  SCENARIOS.forEach((scenario) => {
    (Object.keys(totals) as PsychDimension[]).forEach((dimension) => {
      const bestForDimension = scenario.choices.reduce((best, choice) => {
        const weight =
          choice.weights.find((item) => item.dimension === dimension)?.score ?? 0;
        return Math.max(best, weight);
      }, 0);

      totals[dimension] += bestForDimension;
    });
  });

  return totals;
}

const MAX_RAW_SCORES = buildMaxRawScores();

function normalizeScore(score: number, maxRawScore: number): number {
  if (maxRawScore <= 0) {
    return 0;
  }

  const normalized = Math.round((score / maxRawScore) * 60);
  return Math.max(0, Math.min(60, normalized));
}

export function normalizeScores(scores: DimensionScores): DimensionScores {
  return {
    EMOTIONAL_AWARENESS: normalizeScore(
      scores.EMOTIONAL_AWARENESS,
      MAX_RAW_SCORES.EMOTIONAL_AWARENESS,
    ),
    SOCIAL_CONNECTION: normalizeScore(
      scores.SOCIAL_CONNECTION,
      MAX_RAW_SCORES.SOCIAL_CONNECTION,
    ),
    SELF_COMPASSION: normalizeScore(
      scores.SELF_COMPASSION,
      MAX_RAW_SCORES.SELF_COMPASSION,
    ),
    STRESS_COPING: normalizeScore(
      scores.STRESS_COPING,
      MAX_RAW_SCORES.STRESS_COPING,
    ),
    HELP_SEEKING: normalizeScore(scores.HELP_SEEKING, MAX_RAW_SCORES.HELP_SEEKING),
  };
}

export function categorizeLevel(score: number): DimensionLevel {
  if (score <= 12) {
    return "critical";
  }
  if (score <= 24) {
    return "low";
  }
  if (score <= 36) {
    return "developing";
  }
  if (score <= 48) {
    return "healthy";
  }
  return "thriving";
}

export function calculateDimensionResults(
  scores: DimensionScores,
): Record<PsychDimension, DimensionResult> {
  const normalized = normalizeScores(scores);

  const labels = {
    EMOTIONAL_AWARENESS: { label: "Kesadaran Emosi", icon: "🧠" },
    SOCIAL_CONNECTION: { label: "Koneksi Sosial", icon: "🤝" },
    SELF_COMPASSION: { label: "Kasih Sayang pada Diri", icon: "💛" },
    STRESS_COPING: { label: "Menghadapi Tekanan", icon: "🌊" },
    HELP_SEEKING: { label: "Mencari Dukungan", icon: "🙋" },
  } as const;

  const levelDescriptions: Record<
    PsychDimension,
    Record<DimensionLevel, string>
  > = {
    EMOTIONAL_AWARENESS: {
      critical: "Sulit mengenali atau menamai perasaan sendiri",
      low: "Kadang menyadari perasaan, tapi sering mengabaikannya",
      developing: "Mulai bisa mengenali emosi, meski belum selalu",
      healthy: "Cukup baik dalam memahami apa yang dirasakan",
      thriving: "Sangat sadar dan peka terhadap kondisi emosional diri",
    },
    SOCIAL_CONNECTION: {
      critical: "Cenderung sangat menarik diri dari orang lain",
      low: "Koneksi sosial terasa sulit atau melelahkan",
      developing: "Mulai membuka diri, meski masih hati-hati",
      healthy: "Punya hubungan yang cukup bermakna",
      thriving: "Koneksi sosial yang kuat dan saling mendukung",
    },
    SELF_COMPASSION: {
      critical: "Sangat keras dan tidak adil pada diri sendiri",
      low: "Sering mengkritik diri lebih dari yang seharusnya",
      developing: "Mulai belajar bersikap lebih lembut pada diri",
      healthy: "Cukup baik dalam memperlakukan diri dengan adil",
      thriving: "Memperlakukan diri dengan kebaikan dan pengertian",
    },
    STRESS_COPING: {
      critical: "Cara menghadapi tekanan sering memperburuk keadaan",
      low: "Strategi coping masih kurang efektif",
      developing: "Mulai menemukan cara yang lebih sehat",
      healthy: "Punya beberapa strategi coping yang cukup baik",
      thriving: "Menghadapi tekanan dengan cara yang sehat dan adaptif",
    },
    HELP_SEEKING: {
      critical: "Sangat sulit atau tidak mau mencari bantuan",
      low: "Enggan meminta bantuan meski sangat membutuhkan",
      developing: "Mulai terbuka untuk mencari dukungan",
      healthy: "Cukup nyaman mencari bantuan saat dibutuhkan",
      thriving: "Aktif mencari dukungan dan tidak segan meminta bantuan",
    },
  };

  return {
    EMOTIONAL_AWARENESS: {
      score: normalized.EMOTIONAL_AWARENESS,
      level: categorizeLevel(normalized.EMOTIONAL_AWARENESS),
      label: labels.EMOTIONAL_AWARENESS.label,
      description:
        levelDescriptions.EMOTIONAL_AWARENESS[
          categorizeLevel(normalized.EMOTIONAL_AWARENESS)
        ],
      icon: labels.EMOTIONAL_AWARENESS.icon,
    },
    SOCIAL_CONNECTION: {
      score: normalized.SOCIAL_CONNECTION,
      level: categorizeLevel(normalized.SOCIAL_CONNECTION),
      label: labels.SOCIAL_CONNECTION.label,
      description:
        levelDescriptions.SOCIAL_CONNECTION[
          categorizeLevel(normalized.SOCIAL_CONNECTION)
        ],
      icon: labels.SOCIAL_CONNECTION.icon,
    },
    SELF_COMPASSION: {
      score: normalized.SELF_COMPASSION,
      level: categorizeLevel(normalized.SELF_COMPASSION),
      label: labels.SELF_COMPASSION.label,
      description:
        levelDescriptions.SELF_COMPASSION[
          categorizeLevel(normalized.SELF_COMPASSION)
        ],
      icon: labels.SELF_COMPASSION.icon,
    },
    STRESS_COPING: {
      score: normalized.STRESS_COPING,
      level: categorizeLevel(normalized.STRESS_COPING),
      label: labels.STRESS_COPING.label,
      description:
        levelDescriptions.STRESS_COPING[categorizeLevel(normalized.STRESS_COPING)],
      icon: labels.STRESS_COPING.icon,
    },
    HELP_SEEKING: {
      score: normalized.HELP_SEEKING,
      level: categorizeLevel(normalized.HELP_SEEKING),
      label: labels.HELP_SEEKING.label,
      description:
        levelDescriptions.HELP_SEEKING[categorizeLevel(normalized.HELP_SEEKING)],
      icon: labels.HELP_SEEKING.icon,
    },
  };
}

export function determineProfile(
  scores: DimensionScores,
  levels: Record<PsychDimension, DimensionLevel>,
): ProfileType {
  const EA = levels.EMOTIONAL_AWARENESS;
  const SC = levels.SOCIAL_CONNECTION;
  const SCP = levels.SELF_COMPASSION;
  const COPE = levels.STRESS_COPING;
  const HS = levels.HELP_SEEKING;

  void scores;

  if (
    EA === "critical" &&
    COPE === "critical" &&
    (SCP === "critical" || HS === "critical")
  ) {
    return "cracked_light";
  }

  if ([EA, SC, SCP, COPE, HS].filter((level) => level === "critical" || level === "low").length >= 4) {
    return "numb_wanderer";
  }

  if (
    (COPE === "low" || COPE === "critical") &&
    (HS === "low" || HS === "critical") &&
    (SC === "low" || SC === "critical")
  ) {
    return "silent_fighter";
  }

  if (
    (EA === "healthy" || EA === "thriving") &&
    (COPE === "low" || COPE === "critical") &&
    (SCP === "low" || SCP === "critical")
  ) {
    return "burnout_soul";
  }

  if (
    (EA === "healthy" || EA === "thriving") &&
    (COPE === "low" || COPE === "developing") &&
    (SCP === "low" || SCP === "developing") &&
    (SC === "developing" || SC === "healthy")
  ) {
    return "overthinker_heart";
  }

  if (
    (SC === "healthy" || SC === "thriving") &&
    (HS === "healthy" || HS === "thriving") &&
    (SCP === "low" || SCP === "critical")
  ) {
    return "hidden_helper";
  }

  if ([EA, SC, SCP, COPE, HS].filter((level) => level === "developing").length >= 3) {
    return "resilient_seed";
  }

  if (
    (SCP === "developing" || SCP === "healthy") &&
    (HS === "developing" || HS === "healthy") &&
    (EA === "developing" || EA === "healthy")
  ) {
    return "growing_butterfly";
  }

  if (
    (SC === "healthy" || SC === "thriving") &&
    (SCP === "healthy" || SCP === "thriving")
  ) {
    return "warm_hugger";
  }

  return "calm_explorer";
}

export function calculateProfile(scores: DimensionScores): DetailedProfile {
  const dimensionResults = calculateDimensionResults(scores);

  const levels: Record<PsychDimension, DimensionLevel> = {
    EMOTIONAL_AWARENESS: dimensionResults.EMOTIONAL_AWARENESS.level,
    SOCIAL_CONNECTION: dimensionResults.SOCIAL_CONNECTION.level,
    SELF_COMPASSION: dimensionResults.SELF_COMPASSION.level,
    STRESS_COPING: dimensionResults.STRESS_COPING.level,
    HELP_SEEKING: dimensionResults.HELP_SEEKING.level,
  };

  const type = determineProfile(scores, levels);
  return PROFILES[type];
}

export function createFallbackProfile(): DetailedProfile {
  return {
    ...PROFILES.calm_explorer,
    subtitle: "Terjadi kesalahan kecil, tapi perjalananmu tetap berarti!",
    gentleMessage:
      "Meski ada gangguan kecil saat membaca hasilmu, pilihan-pilihanmu tetap bermakna dan tetap layak dihargai.",
  };
}

export function getDominantDimension(scores: DimensionScores): PsychDimension {
  const normalized = normalizeScores(scores);
  const entries = Object.entries(normalized) as Array<[PsychDimension, number]>;
  const [dimension] = entries.reduce((best, current) => {
    if (current[1] > best[1]) {
      return current;
    }

    return best;
  });

  return dimension;
}

export function getWeakestDimension(scores: DimensionScores): PsychDimension {
  const normalized = normalizeScores(scores);
  const entries = Object.entries(normalized) as Array<[PsychDimension, number]>;
  const [dimension] = entries.reduce((lowest, current) => {
    if (current[1] < lowest[1]) {
      return current;
    }

    return lowest;
  });

  return dimension;
}
