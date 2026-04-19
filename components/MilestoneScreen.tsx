"use client";

import { AlpacaAvatar } from "@/components/AlpacaAvatar";

interface MilestoneScreenProps {
  milestoneNumber: 1 | 2 | 3;
  onContinue: () => void;
}

const MILESTONE_COPY = {
  1: {
    emotion: "hopeful" as const,
    title: "5 Situasi Terlewati! ✨",
    body:
      "Kamu sudah melewati 5 momen bersama Alpa. Tidak ada jawaban benar atau salah di sini - hanya kejujuranmu tentang dirimu sendiri.",
    fact:
      "Tahukah kamu? Mengenali pola respons emosional adalah langkah pertama menuju kesehatan mental yang lebih baik.",
    button: "Lanjutkan Perjalanan →",
  },
  2: {
    emotion: "thinking" as const,
    title: "Setengah Perjalanan! 🌙",
    body:
      "Alpa sudah cukup mengenalmu sekarang. Setiap pilihan yang kamu buat mencerminkan cara kamu menghadapi dunia - dan itu berharga.",
    fact:
      "Penelitian menunjukkan bahwa kesadaran diri adalah salah satu faktor terkuat dalam kesehatan mental jangka panjang.",
    button: "Teruskan →",
  },
  3: {
    emotion: "determined" as const,
    title: "Hampir Sampai! 🌅",
    body:
      "Hanya 5 situasi lagi. Terima kasih sudah jujur sampai sejauh ini. Kejujuranmu adalah hadiah terbesar yang bisa kamu berikan untuk dirimu sendiri.",
    fact:
      "Mencari bantuan saat dibutuhkan adalah tanda kekuatan, bukan kelemahan. 1 dari 4 orang mengalami masalah kesehatan mental di suatu titik dalam hidupnya.",
    button: "Selesaikan Perjalanan →",
  },
};

export function MilestoneScreen({
  milestoneNumber,
  onContinue,
}: MilestoneScreenProps) {
  const content = MILESTONE_COPY[milestoneNumber];

  return (
    <section className="content-entering">
      <div className="glass-card-strong rounded-[30px] px-5 py-8 text-center shadow-[0_28px_70px_rgba(55,30,24,0.18)] sm:px-8 sm:py-10">
        <div className="flex justify-center">
          <div className="rounded-full bg-white/20 p-4 shadow-[0_18px_40px_rgba(232,133,90,0.18)]">
            <AlpacaAvatar emotion={content.emotion} size="large" />
          </div>
        </div>

        <p className="mt-5 font-accent text-[10px] uppercase tracking-[0.28em] text-[rgba(139,94,60,0.58)]">
          Milestone Perjalanan
        </p>
        <h2 className="mt-3 font-display text-[1.8rem] font-semibold text-[#5C2E0A] sm:text-[2.3rem]">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[540px] font-display text-[1.02rem] leading-8 text-[#6B3D1E]">
          {content.body}
        </p>

        <div className="mx-auto mt-6 max-w-[540px] rounded-[20px] border border-white/45 bg-white/50 px-5 py-4 text-left shadow-[0_16px_36px_rgba(92,46,10,0.08)] content-entering">
          <p className="font-ui text-[0.95rem] leading-7 text-[#6B3D1E]">
            <span className="font-semibold text-[#C67B2D]">💡 Tahukah kamu? </span>
            {content.fact}
          </p>
        </div>

        <div className="mt-8">
          <button type="button" onClick={onContinue} className="primary-cta animate-[alpacaBounce_1.8s_ease-in-out_infinite]">
            {content.button}
          </button>
        </div>
      </div>
    </section>
  );
}
