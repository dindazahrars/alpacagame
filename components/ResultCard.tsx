"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlpacaAvatar } from "@/components/AlpacaAvatar";
import {
  DIMENSION_LABELS,
  PROFILE_ACCESSORIES_BY_TYPE,
  PROFILE_BADGES,
} from "@/lib/gameConfig";
import {
  getDominantDimension,
  getWeakestDimension,
} from "@/lib/profileCalculator";
import { DimensionScores, MentalHealthProfile } from "@/types/game";

interface ResultCardProps {
  profile: MentalHealthProfile;
  scores: DimensionScores;
  playerName?: string;
  onRestart: () => void;
}

const BADGE_COPY: Record<MentalHealthProfile["type"], string> = {
  silent_fighter: "Pejuang Diam",
  burnout_soul: "Jiwa yang Kelelahan",
  growing_butterfly: "Kupu-kupu yang Belajar",
  warm_hugger: "Pelukan Hangat",
  calm_explorer: "Penjelajah Tenang",
  cracked_light: "Cahaya yang Retak",
  overthinker_heart: "Hati yang Terlalu Berpikir",
  hidden_helper: "Penolong yang Tersembunyi",
  resilient_seed: "Benih yang Tangguh",
  numb_wanderer: "Pengembara yang Mati Rasa",
};

export function ResultCard({
  profile,
  scores,
  playerName,
  onRestart,
}: ResultCardProps) {
  const [barsReady, setBarsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setBarsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [profile.type]);

  const confettiColors = useMemo(
    () => [
      profile.colorTheme.primary,
      profile.colorTheme.secondary,
      profile.colorTheme.accent,
      "#FFF8EE",
    ],
    [profile.colorTheme],
  );

  const dominantDimension = DIMENSION_LABELS[getDominantDimension(scores)];
  const weakestDimension = DIMENSION_LABELS[getWeakestDimension(scores)];

  const shareText = `Aku baru selesai bermain Alpaca Mental Wellness Journey!\nHasilnya: ${profile.title} - ${profile.subtitle}\nCoba juga yuk! 🦙✨`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="content-entering">
      <div className="relative overflow-hidden rounded-[32px]">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(160deg, ${profile.colorTheme.bg} 0%, rgba(255,248,238,0.94) 100%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={`confetti-${profile.type}-${index}`}
              className="result-confetti"
              style={{
                left: `${6 + ((index * 5.2) % 86)}%`,
                width: `${index % 3 === 0 ? 10 : 7}px`,
                height: `${index % 2 === 0 ? 13 : 8}px`,
                background: confettiColors[index % confettiColors.length],
                opacity: profile.type === "cracked_light" ? 0.35 : 0.68,
                animationDuration:
                  profile.type === "cracked_light"
                    ? `${8 + index * 0.1}s`
                    : `${5 + index * 0.12}s`,
                animationDelay: `${index * 0.15}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-4 pb-4 pt-8 sm:px-7 sm:pb-7 sm:pt-10">
          <div className="text-center">
            <p className="font-display text-[1.75rem] font-semibold text-[#5C2E0A] sm:text-[2.2rem]">
              Perjalanan selesai! {"\u2728"}
            </p>
            <p className="mt-3 font-ui text-[0.95rem] leading-7 text-[rgba(92,46,10,0.7)]">
              {playerName
                ? `Hei ${playerName}, ini cerita kecil tentang cara hatimu bergerak saat hari terasa rumit.`
                : "Ini adalah cermin kecil tentang cara hatimu bergerak saat hari terasa rumit."}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <div
              className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full sm:h-[228px] sm:w-[228px]"
              style={{
                background: `radial-gradient(circle at 50% 35%, ${profile.colorTheme.accent} 0%, ${profile.colorTheme.secondary} 55%, ${profile.colorTheme.primary} 100%)`,
                boxShadow: `0 24px 60px ${profile.colorTheme.secondary}55`,
              }}
            >
              <AlpacaAvatar
                emotion={profile.alpacaVariant}
                size="large"
                accessories={PROFILE_ACCESSORIES_BY_TYPE[profile.type]}
              />
            </div>
          </div>

          <div className="result-card mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="profile-chip"
                style={{
                  background: `linear-gradient(135deg, ${profile.colorTheme.primary} 0%, ${profile.colorTheme.secondary} 100%)`,
                  color: "#FFF8EE",
                }}
              >
                {PROFILE_BADGES[profile.type]}
              </span>
              <span
                className="rounded-full px-3 py-1 font-ui text-[0.75rem] font-semibold"
                style={{
                  background: `${profile.colorTheme.accent}66`,
                  color: profile.colorTheme.text,
                }}
              >
                Fokus terkuat: {dominantDimension}
              </span>
              <span
                className="rounded-full px-3 py-1 font-ui text-[0.75rem] font-semibold"
                style={{
                  background: "#FFFFFFA6",
                  color: profile.colorTheme.text,
                }}
              >
                Perlu dijaga: {weakestDimension}
              </span>
            </div>

            <h2 className="mt-5 font-display text-[2rem] font-bold leading-tight text-[#5C2E0A]">
              {profile.title}
            </h2>
            <p className="mt-2 font-display text-[1.05rem] italic leading-8 text-[rgba(92,46,10,0.72)]">
              {profile.subtitle}
            </p>
            <p className="mt-4 font-display text-[1rem] leading-8 text-[#6B3D1E]">
              {profile.description}
            </p>

            <div className="divider-line my-6" />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.58)]">
                  Hal yang sudah kuat
                </p>
                <ul className="mt-3 space-y-3">
                  {profile.strengths.map((strength) => (
                    <li
                      key={strength}
                      className="flex gap-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]"
                    >
                      <span aria-hidden="true" className="mt-1 text-[#F4A636]">
                        {"\u2726"}
                      </span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.58)]">
                  Hal yang mungkin berat
                </p>
                <ul className="mt-3 space-y-3">
                  {profile.challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="flex gap-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]"
                    >
                      <span aria-hidden="true" className="mt-1 text-[rgba(139,94,60,0.45)]">
                        {"\u25CB"}
                      </span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="divider-line my-6" />

            <div className="quote-box">{profile.gentleMessage}</div>

            <div className="mt-6">
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.58)]">
                Langkah kecil yang bisa dicoba
              </p>
              <ol className="mt-3 space-y-3">
                {profile.actionSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    className="flex gap-3 font-ui text-[0.95rem] leading-7 text-[#6B3D1E]"
                  >
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-accent text-[11px] font-bold"
                      style={{
                        background: `${profile.colorTheme.accent}88`,
                        color: profile.colorTheme.text,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ol>
            </div>

            {profile.needsProfessionalNote ? (
              <div className="support-note mt-6">
                <div className="shrink-0 text-[30px]" aria-hidden="true">
                  {"\uD83D\uDC9B"}
                </div>
                <div className="font-ui text-[0.92rem] leading-7 text-[#6B3D1E]">
                  Hasil ini bukan diagnosis, tetapi bisa jadi sinyal bahwa kamu layak
                  mendapat ruang bantuan yang lebih aman dan profesional. Jika kamu
                  merasa sangat kewalahan atau tidak aman, coba hubungi orang yang
                  kamu percaya, konselor kampus, psikolog, atau layanan bantuan yang
                  tersedia. Jika kamu perlu, kamu bisa menyimpan kontak Into The Light
                  Indonesia: 119 ext 8 sebagai pengingat bahwa bantuan itu nyata.
                </div>
              </div>
            ) : null}

            <div className="divider-line my-6" />

            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-[rgba(139,94,60,0.58)]">
                Peta skor dirimu
              </p>
              <div className="mt-4 space-y-4">
                {(Object.entries(scores) as Array<[keyof DimensionScores, number]>).map(
                  ([dimension, value], index) => (
                    <div key={dimension} className="score-row">
                      <div className="flex items-center justify-between gap-4 font-ui text-[0.92rem] text-[#6B3D1E]">
                        <span>{DIMENSION_LABELS[dimension]}</span>
                        <span className="font-semibold">
                          {value}
                          <span className="text-[rgba(139,94,60,0.55)]">/24</span>
                        </span>
                      </div>
                      <div className="score-track">
                        <div
                          className="score-fill"
                          style={{
                            width: barsReady ? `${(value / 24) * 100}%` : "0%",
                            background: `linear-gradient(90deg, ${profile.colorTheme.primary} 0%, ${profile.colorTheme.secondary} 100%)`,
                            transitionDelay: `${index * 120}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onRestart} className="primary-cta">
                <span aria-hidden="true">{"\uD83D\uDD04"}</span>
                Mulai Ulang
              </button>

              <button type="button" onClick={handleShare} className="secondary-cta">
                <span aria-hidden="true">{"\uD83D\uDCE4"}</span>
                {copied ? "Teks Hasil Tersalin" : "Bagikan Hasil"}
              </button>

              <Link href="/resources" className="secondary-cta">
                <span aria-hidden="true">{"\uD83D\uDC9B"}</span>
                Pelajari Lebih Lanjut
              </Link>
            </div>

            <p className="mt-4 font-ui text-[0.82rem] leading-6 text-[rgba(92,46,10,0.58)]">
              {BADGE_COPY[profile.type]} bukan label permanen, melainkan potret kecil
              tentang pola yang sedang paling terlihat hari ini.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
