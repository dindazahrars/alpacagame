"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlpacaAvatar } from "@/components/AlpacaAvatar";
import {
  DIMENSION_LEVEL_BADGES,
  DIMENSION_LEVEL_BADGE_STYLES,
  DIMENSION_LEVEL_GRADIENTS,
} from "@/lib/gameConfig";
import { DetailedProfile, DimensionResult, PsychDimension } from "@/types/game";

const COMPLETED_SESSION_KEY = "alpaca_game_session";

interface ResultScreenProps {
  profile: DetailedProfile;
  dimensionResults: Record<PsychDimension, DimensionResult>;
  playerName?: string;
  onRestart: () => void;
}

const POSITIVE_PROFILES = new Set([
  "warm_hugger",
  "calm_explorer",
  "growing_butterfly",
]);

const URGENCY_BADGES = {
  suggested: {
    text: "💛 Pertimbangkan berbicara dengan seseorang",
    background: "rgba(250, 204, 21, 0.16)",
    color: "#8A5A00",
  },
  recommended: {
    text: "🧡 Disarankan mencari dukungan profesional",
    background: "rgba(245, 158, 11, 0.18)",
    color: "#9A3412",
  },
  urgent: {
    text: "❤️ Penting: kamu tidak harus sendirian",
    background: "rgba(248, 113, 113, 0.18)",
    color: "#9F1239",
  },
} as const;

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

export function ResultScreen({
  profile,
  dimensionResults,
  playerName,
  onRestart,
}: ResultScreenProps) {
  const reducedMotion = useReducedMotionPreference();
  const [barsReady, setBarsReady] = useState(reducedMotion);
  const [copied, setCopied] = useState(false);
  const [challengeTaken, setChallengeTaken] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [reducedMotion]);

  useEffect(() => {
    const stored = window.localStorage.getItem(COMPLETED_SESSION_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { weeklyChallengeTaken?: boolean };
      setChallengeTaken(Boolean(parsed.weeklyChallengeTaken));
    } catch {
      setChallengeTaken(false);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setBarsReady(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setBarsReady(true);
    }, 1500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  const shareText = `Aku baru selesai bermain Alpaca Mental Wellness Journey! 🦙\nHasilku: ${profile.title}\n"${profile.tagline}"\nCoba juga yuk!`;

  const confettiColors = useMemo(
    () => [
      profile.colorTheme.primary,
      profile.colorTheme.secondary,
      profile.colorTheme.accent,
      "#FFF8EE",
    ],
    [profile.colorTheme],
  );

  const urgencyBadge =
    profile.urgencyLevel === "none" ? null : URGENCY_BADGES[profile.urgencyLevel];

  const dimensionEntries = Object.entries(dimensionResults) as Array<
    [PsychDimension, DimensionResult]
  >;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleMarkChallenge = () => {
    setChallengeTaken(true);

    const stored = window.localStorage.getItem(COMPLETED_SESSION_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Record<string, unknown>;
      parsed.weeklyChallengeTaken = true;
      window.localStorage.setItem(COMPLETED_SESSION_KEY, JSON.stringify(parsed));
    } catch {
      window.localStorage.setItem(
        COMPLETED_SESSION_KEY,
        JSON.stringify({
          completedAt: new Date().toISOString(),
          profileType: profile.type,
          scores: Object.fromEntries(
            dimensionEntries.map(([dimension, result]) => [dimension, result.score]),
          ),
          playerName: playerName ?? "",
          weeklyChallengeTaken: true,
        }),
      );
    }
  };

  return (
    <section className="content-entering">
      <div
        className="relative overflow-hidden rounded-[34px] border border-white/35"
        style={{
          background: `linear-gradient(180deg, ${profile.colorTheme.bg} 0%, rgba(255,248,238,0.95) 100%)`,
          boxShadow: "0 26px 80px rgba(92, 46, 10, 0.16)",
        }}
      >
        {POSITIVE_PROFILES.has(profile.type) && !reducedMotion ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, index) => (
              <span
                key={`celebration-${index}`}
                className="result-confetti"
                style={{
                  left: `${2 + ((index * 1.9) % 95)}%`,
                  width: `${index % 2 === 0 ? 8 : 10}px`,
                  height: `${index % 3 === 0 ? 8 : 12}px`,
                  background: confettiColors[index % confettiColors.length],
                  animationDuration: `${3 + (index % 6) * 0.16}s`,
                  animationDelay: `${(index % 8) * 0.1}s`,
                  opacity: 0.78,
                }}
              />
            ))}
          </div>
        ) : null}

        <div className="relative z-10 px-4 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
          <div className="text-center">
            <div
              className="mx-auto flex h-[240px] w-[240px] items-center justify-center rounded-full sm:h-[320px] sm:w-[320px]"
              style={{
                background: `radial-gradient(circle at 50% 32%, ${profile.colorTheme.accent} 0%, ${profile.colorTheme.secondary} 52%, ${profile.colorTheme.primary} 100%)`,
                boxShadow: `0 24px 62px ${profile.colorTheme.secondary}55`,
                animation: reducedMotion ? "none" : "contentEnter 600ms ease 200ms both",
              }}
            >
              <AlpacaAvatar
                emotion={profile.alpacaVariant}
                size="hero"
                accessories={profile.accessories}
              />
            </div>

            <p
              className="mt-6 font-accent text-[10px] uppercase tracking-[0.28em] text-[rgba(92,46,10,0.52)]"
              style={{ animation: reducedMotion ? "none" : "contentEnter 420ms ease 400ms both" }}
            >
              HASIL PERJALANANMU
            </p>
            <p
              className="mt-3 font-display text-[1.04rem] italic leading-8"
              style={{
                color: `${profile.colorTheme.text}B8`,
                animation: reducedMotion ? "none" : "contentEnter 420ms ease 600ms both",
              }}
            >
              {profile.tagline}
            </p>
            <h1
              className="mt-2 font-display text-[2rem] font-bold leading-tight sm:text-[2.4rem]"
              style={{
                color: profile.colorTheme.primary,
                animation: reducedMotion ? "none" : "contentEnter 460ms ease 800ms both",
              }}
            >
              {profile.title}
            </h1>
            <p
              className="mx-auto mt-3 max-w-[640px] font-display text-[1rem] italic leading-8"
              style={{
                color: `${profile.colorTheme.text}CC`,
                animation: reducedMotion ? "none" : "contentEnter 420ms ease 1000ms both",
              }}
            >
              {playerName
                ? `${profile.subtitle} ${playerName}, hasil ini mencerminkan pola kecil dari perjalananmu hari ini.`
                : profile.subtitle}
            </p>

            {urgencyBadge ? (
              <div
                className="mt-5 inline-flex rounded-full px-4 py-2 font-ui text-[0.86rem] font-semibold shadow-[0_10px_24px_rgba(92,46,10,0.08)]"
                style={{
                  background: urgencyBadge.background,
                  color: urgencyBadge.color,
                  animation: reducedMotion ? "none" : "contentEnter 420ms ease 1200ms both",
                }}
              >
                {urgencyBadge.text}
              </div>
            ) : null}
          </div>

          <div
            className="result-card mt-8"
            style={{
              animation: reducedMotion ? "none" : "contentEnter 480ms ease 1500ms both",
            }}
          >
            <div>
              <h2 className="font-display text-[1.25rem] font-semibold text-[#5C2E0A]">
                Gambaran Kondisimu
              </h2>
              <p className="mt-2 font-ui text-[0.92rem] leading-7 text-[rgba(92,46,10,0.68)]">
                Berdasarkan pilihan-pilihanmu dalam 20 situasi
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {dimensionEntries.map(([dimension, result], index) => {
                const badgeStyle = DIMENSION_LEVEL_BADGE_STYLES[result.level];

                return (
                  <div key={dimension} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="text-[1.05rem]" aria-hidden="true">
                          {result.icon}
                        </span>
                        <span className="font-ui text-[0.96rem] font-semibold text-[#5C2E0A]">
                          {result.label}
                        </span>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-right font-ui text-[0.74rem] font-semibold"
                        style={badgeStyle}
                      >
                        {DIMENSION_LEVEL_BADGES[result.level]}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-full bg-[rgba(0,0,0,0.08)]">
                      <div
                        className="h-[10px] rounded-full transition-[width] duration-[800ms] ease-out"
                        style={{
                          width: barsReady ? `${(result.score / 60) * 100}%` : "0%",
                          background: DIMENSION_LEVEL_GRADIENTS[result.level],
                          transitionDelay: `${index * 150}ms`,
                        }}
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <p className="font-display text-[0.9rem] italic leading-7 text-[rgba(92,46,10,0.7)]">
                        {result.description}
                      </p>
                      <span className="shrink-0 font-ui text-[0.86rem] font-semibold text-[rgba(92,46,10,0.72)]">
                        {result.score}/60
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="divider-line my-7" />

            <div>
              <h3 className="font-display text-[1.24rem] font-semibold text-[#5C2E0A]">
                Tentang Profilmu
              </h3>
              <p className="mt-4 font-display text-[1rem] leading-8 text-[#6B3D1E]">
                {profile.description}
              </p>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-display text-[1.05rem] font-semibold text-[#5C2E0A]">
                  ✦ Kekuatanmu
                </p>
                <ul className="mt-3 space-y-3">
                  {profile.strengths.map((strength) => (
                    <li
                      key={strength}
                      className="flex gap-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]"
                    >
                      <span aria-hidden="true" className="mt-1 text-[#F4A636]">
                        ✦
                      </span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-display text-[1.05rem] font-semibold text-[#5C2E0A]">
                  ○ Yang Perlu Diperhatikan
                </p>
                <ul className="mt-3 space-y-3">
                  {profile.challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="flex gap-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]"
                    >
                      <span aria-hidden="true" className="mt-1 text-[#E8855A]">
                        ○
                      </span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="mt-7 rounded-[20px] px-5 py-5"
              style={{
                background: `${profile.colorTheme.primary}10`,
                border: `1px solid ${profile.colorTheme.primary}22`,
              }}
            >
              <p className="font-display text-[1.04rem] font-semibold text-[#5C2E0A]">
                🔍 Yang Mungkin Belum Kamu Sadari
              </p>
              <ul className="mt-3 space-y-3">
                {profile.blindSpots.map((spot) => (
                  <li
                    key={spot}
                    className="flex gap-3 font-display text-[0.96rem] italic leading-8 text-[rgba(92,46,10,0.76)]"
                  >
                    <span aria-hidden="true">🔍</span>
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 quote-box relative">
              <span className="absolute left-4 top-3 font-display text-[2.2rem] leading-none text-[rgba(244,166,54,0.28)]">
                &quot;
              </span>
              <div className="pl-4">{profile.gentleMessage}</div>
            </div>

            <div
              className="mt-7 rounded-[18px] px-5 py-5"
              style={{
                background: `${profile.colorTheme.primary}14`,
                border: `1px solid ${profile.colorTheme.primary}26`,
              }}
            >
              <p className="font-display text-[1.05rem] font-semibold text-[#5C2E0A]">
                🎯 Tantangan Kecilmu Minggu Ini
              </p>
              <p className="mt-3 font-ui text-[0.96rem] leading-7 text-[#6B3D1E]">
                {profile.weeklyChallenge}
              </p>
              <button
                type="button"
                onClick={handleMarkChallenge}
                disabled={challengeTaken}
                className="secondary-cta mt-4"
              >
                {challengeTaken ? "Sudah ditandai! 💛" : "Tandai sebagai tantanganku ✓"}
              </button>
            </div>

            <div className="mt-7">
              <p className="font-display text-[1.05rem] font-semibold text-[#5C2E0A]">
                Langkah yang Bisa Kamu Coba
              </p>
              <ol className="mt-4 space-y-3">
                {profile.actionSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    className="flex gap-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]"
                  >
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold text-white"
                      style={{
                        background: profile.colorTheme.primary,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div
              className="mt-8 rounded-[22px] px-5 py-6 text-center"
              style={{
                background: `linear-gradient(135deg, ${profile.colorTheme.bg} 0%, ${profile.colorTheme.accent}44 100%)`,
                animation: reducedMotion ? "none" : "contentEnter 500ms ease 3000ms both",
              }}
            >
              <p className="font-display text-[1.22rem] font-bold italic leading-8 sm:text-[1.34rem]">
                <span
                  style={{
                    color: profile.colorTheme.primary,
                    textShadow: `0 0 18px ${profile.colorTheme.accent}`,
                  }}
                >
                  {profile.affirmation}
                </span>
              </p>
            </div>
          </div>

          {profile.needsProfessionalNote ? (
            <div
              className="mt-8 rounded-[22px] border-2 px-5 py-5 sm:px-6"
              style={{
                background: "linear-gradient(135deg, #FFF5F5 0%, #FFF0E8 100%)",
                borderColor: "rgba(252, 129, 129, 0.4)",
                animation: reducedMotion ? "none" : "contentEnter 500ms ease 2500ms both",
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="text-[32px]" aria-hidden="true">
                  💛
                </div>
                <div>
                  <h3 className="font-display text-[1.2rem] font-semibold text-[#7F1D1D]">
                    Kamu Tidak Harus Menanggung Ini Sendirian
                  </h3>
                  <p className="mt-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]">
                    Hasil ini bukan diagnosis, tetapi bisa menjadi penanda lembut bahwa
                    kamu layak mendapat ruang bantuan yang aman. Berbicara dengan
                    profesional kesehatan mental bisa membantu kamu menaruh semua rasa
                    ini di tempat yang lebih teratur dan lebih ringan.
                  </p>
                </div>
              </div>

              {profile.urgencyLevel === "urgent" ? (
                <div className="mt-5 rounded-[18px] bg-[rgba(252,129,129,0.12)] px-5 py-4">
                  <p className="font-ui text-[0.95rem] font-semibold text-[#9F1239]">
                    Jika kamu merasa sangat tidak aman atau butuh bicara sekarang:
                  </p>
                  <ul className="mt-3 space-y-2 font-ui text-[0.92rem] leading-7 text-[#6B3D1E]">
                    <li>Into The Light Indonesia: 119 ext 8</li>
                    <li>Yayasan Pulih: (021) 788-42580</li>
                    <li>Into The Light Chat: www.intothelightid.org</li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          <div
            className="result-card mt-8"
            style={{
              animation: reducedMotion ? "none" : "contentEnter 500ms ease 3500ms both",
            }}
          >
            <h3 className="font-display text-[1.16rem] font-semibold text-[#5C2E0A]">
              Bagikan hasil perjalananmu
            </h3>

            <div className="mt-4 rounded-[18px] border border-white/40 bg-white/60 px-4 py-4">
              <p className="font-ui text-[0.92rem] leading-7 text-[#6B3D1E]">
                Aku baru selesai bermain Alpaca Mental Wellness Journey! 🦙
                <br />
                Hasilku: {profile.title}
                <br />
                &quot;{profile.tagline}&quot;
                <br />
                Coba juga yuk!
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handleCopy} className="secondary-cta">
                📋 Salin Teks
              </button>
              {copied ? (
                <span className="inline-flex items-center rounded-full bg-[rgba(255,255,255,0.7)] px-4 py-2 font-ui text-[0.9rem] text-[#5C2E0A]">
                  Tersalin! ✓
                </span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onRestart} className="primary-cta">
                🔄 Mulai Lagi dari Awal
              </button>
              <Link href="/" className="secondary-cta">
                🏠 Kembali ke Beranda
              </Link>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-[760px] text-center font-ui text-[0.75rem] leading-6 text-[rgba(92,46,10,0.54)]">
            Hasil ini bukan diagnosis klinis dan tidak menggantikan penilaian
            profesional kesehatan mental. Ini adalah refleksi ringan berdasarkan
            pilihan-pilihanmu dalam game ini. Jika kamu merasa membutuhkan bantuan,
            jangan ragu untuk menghubungi profesional.
          </p>
        </div>
      </div>
    </section>
  );
}
