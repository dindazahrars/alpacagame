import Link from "next/link";
import { AlpacaAvatar } from "@/components/AlpacaAvatar";
import { AtmosphericLayers } from "@/components/AtmosphericLayers";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { SceneIllustration } from "@/components/SceneIllustration";

const FLOATING_DECORATIONS = [
  {
    key: "spark-a",
    className: "left-[9%] top-[13%] hidden md:block",
    delay: "0s",
    content: (
      <svg viewBox="0 0 26 26" className="h-6 w-6 opacity-75" aria-hidden="true">
        <path
          d="M13 2 L15.6 10.4 L24 13 L15.6 15.6 L13 24 L10.4 15.6 L2 13 L10.4 10.4 Z"
          fill="#FFF3E8"
        />
      </svg>
    ),
  },
  {
    key: "spark-b",
    className: "right-[11%] top-[16%]",
    delay: "0.8s",
    content: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-70" aria-hidden="true">
        <path
          d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z"
          fill="#FFE8CC"
        />
      </svg>
    ),
  },
  {
    key: "cloud",
    className: "left-[12%] top-[25%] hidden lg:block",
    delay: "1.1s",
    content: (
      <svg viewBox="0 0 100 42" className="h-9 w-24 opacity-60" aria-hidden="true">
        <ellipse cx="34" cy="25" rx="24" ry="10" fill="#FFF1E4" />
        <ellipse cx="54" cy="18" rx="18" ry="11" fill="#FFF1E4" />
        <ellipse cx="72" cy="24" rx="18" ry="9" fill="#FFF1E4" />
      </svg>
    ),
  },
  {
    key: "moon",
    className: "right-[18%] top-[12%] hidden sm:block",
    delay: "1.6s",
    content: (
      <svg viewBox="0 0 38 38" className="h-8 w-8 opacity-72" aria-hidden="true">
        <defs>
          <mask id="landing-crescent-mask">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="23" cy="14" r="10" fill="black" />
          </mask>
        </defs>
        <circle cx="18" cy="18" r="10" fill="#FFF5EB" mask="url(#landing-crescent-mask)" />
      </svg>
    ),
  },
];

function LandingBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full scale-[1.02]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="landing-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4E3B71" />
            <stop offset="28%" stopColor="#86506E" />
            <stop offset="58%" stopColor="#D87362" />
            <stop offset="76%" stopColor="#F1B273" />
            <stop offset="100%" stopColor="#FFF1DC" />
          </linearGradient>
          <radialGradient id="landing-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6D3" stopOpacity="0.95" />
            <stop offset="48%" stopColor="#FFD88D" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#FFD88D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="landing-river" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE9C8" />
            <stop offset="100%" stopColor="#F7C78C" />
          </linearGradient>
        </defs>

        <rect width="1600" height="1000" fill="url(#landing-sky)" />

        <ellipse cx="1120" cy="310" rx="390" ry="210" fill="url(#landing-sun-glow)" />
        <ellipse cx="1108" cy="430" rx="118" ry="90" fill="#FFD670" opacity="0.95" />

        <g opacity="0.35" fill="#FFF4E8">
          <ellipse cx="250" cy="180" rx="118" ry="28" />
          <ellipse cx="430" cy="142" rx="146" ry="24" />
          <ellipse cx="1170" cy="180" rx="118" ry="22" />
          <ellipse cx="1360" cy="132" rx="150" ry="24" />
        </g>

        <g fill="#FFF6E8" opacity="0.82">
          <circle cx="260" cy="102" r="2.2" />
          <circle cx="380" cy="212" r="1.6" />
          <circle cx="1040" cy="134" r="1.8" />
          <circle cx="1440" cy="168" r="2.1" />
          <circle cx="1260" cy="240" r="1.5" />
        </g>

        <path
          d="M0 670 C120 640 320 620 500 636 C660 650 860 700 1030 682 C1220 662 1410 630 1600 654 L1600 1000 L0 1000 Z"
          fill="#7E647C"
          opacity="0.5"
        />
        <path
          d="M0 704 C180 664 360 680 528 724 C710 770 890 770 1086 736 C1270 704 1446 688 1600 708 L1600 1000 L0 1000 Z"
          fill="#9C7481"
          opacity="0.64"
        />
        <path
          d="M0 752 C164 718 356 736 546 782 C722 826 918 820 1120 786 C1310 754 1466 738 1600 752 L1600 1000 L0 1000 Z"
          fill="#5E4867"
          opacity="0.88"
        />
        <path
          d="M0 812 C182 782 404 814 592 856 C792 900 980 888 1170 854 C1344 822 1476 798 1600 806 L1600 1000 L0 1000 Z"
          fill="#6F875F"
        />

        <path
          d="M912 820 C860 792 818 792 782 828 C742 866 676 884 598 878 C666 900 738 924 818 910 C894 898 972 856 1018 818 C1084 764 1146 744 1240 758 C1144 726 1014 746 912 820 Z"
          fill="url(#landing-river)"
          opacity="0.7"
        />

        <g fill="#4A2C20">
          <rect x="256" y="620" width="18" height="170" rx="9" />
          <ellipse cx="266" cy="594" rx="56" ry="40" />
          <ellipse cx="232" cy="624" rx="40" ry="28" />
          <ellipse cx="304" cy="626" rx="46" ry="30" />

          <rect x="1328" y="606" width="18" height="182" rx="9" />
          <ellipse cx="1338" cy="582" rx="62" ry="42" />
          <ellipse cx="1300" cy="624" rx="48" ry="30" />
          <ellipse cx="1384" cy="626" rx="50" ry="32" />

          <rect x="1102" y="748" width="90" height="12" rx="6" />
          <rect x="1120" y="760" width="10" height="44" rx="5" />
          <rect x="1162" y="760" width="10" height="44" rx="5" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,249,241,0.82)_0%,rgba(255,249,241,0.2)_24%,transparent_42%),linear-gradient(180deg,rgba(34,22,56,0.08)_0%,rgba(255,249,241,0.04)_44%,rgba(255,249,241,0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-[linear-gradient(180deg,transparent_0%,rgba(26,16,53,0.02)_30%,rgba(26,16,53,0.16)_100%)]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <AtmosphericLayers variant="dusk" />
      <BackgroundCanvas variant="dusk" />
      <LandingBackdrop />

      <div className="pointer-events-none absolute inset-0 z-[12]">
        {FLOATING_DECORATIONS.map((item) => (
          <div
            key={item.key}
            className={`floating-token absolute ${item.className}`}
            style={{
              animationDelay: item.delay,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>

      <section className="relative z-20 flex min-h-screen items-center px-5 py-8 sm:px-7 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative">
            <div className="pointer-events-none absolute -left-8 top-8 hidden h-32 w-32 rounded-full bg-[#FFF3E8]/70 blur-[42px] lg:block" />
            <div className="pointer-events-none absolute left-[24%] top-[34%] hidden h-24 w-24 rounded-full bg-[#FFD9A4]/40 blur-[36px] lg:block" />

            <div className="max-w-[640px] rounded-[34px] border border-white/35 bg-[rgba(255,249,243,0.66)] px-5 py-6 backdrop-blur-[18px] shadow-[0_22px_60px_rgba(70,41,35,0.12)] sm:px-7 sm:py-7">
              <p className="font-accent text-[10px] uppercase tracking-[0.34em] text-[rgba(78,59,113,0.72)]">
                {"\u2726"} Sebuah Cerita Interaktif tentang Perasaan {"\u2726"}
              </p>

              <h1
                className="mt-5 font-display text-[2.85rem] font-bold leading-[0.9] tracking-[-0.03em] sm:text-[4.9rem]"
                style={{
                  textShadow: "0 12px 32px rgba(78,59,113,0.08)",
                }}
              >
                <span className="block text-[#7B4B37]">Alpaca</span>
                <span className="block text-[#4D3A74]">Mental Wellness</span>
                <span className="block text-[#CC5F49]">Journey</span>
              </h1>

              <p className="mt-5 max-w-[580px] font-display text-[1.12rem] italic leading-8 text-[#6A4A61] sm:text-[1.3rem]">
                Ikuti perjalanan Alpa si alpaca chibi melewati momen-momen kecil yang
                terasa dekat, lucu, sunyi, dan kadang diam-diam berat.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-[#F7E7D7]/88 px-3 py-1.5 font-ui text-[0.78rem] font-semibold text-[#8B5E3C]">
                  8 skenario cerita
                </span>
                <span className="rounded-full bg-[#E8DEF5]/92 px-3 py-1.5 font-ui text-[0.78rem] font-semibold text-[#5C4379]">
                  5 dimensi refleksi
                </span>
                <span className="rounded-full bg-[#DCECDC]/90 px-3 py-1.5 font-ui text-[0.78rem] font-semibold text-[#4C7752]">
                  Terasa seperti visual novel
                </span>
              </div>

              <div className="mt-7 max-w-[560px] space-y-4 font-ui text-[1rem] leading-8 text-[#5C2E0A]">
                <p>
                  Alpa akan menemanimu melewati pagi yang berat, chat yang sepi,
                  sampai malam ketika isi kepala terasa terlalu penuh.
                </p>
                <p className="text-[rgba(92,46,10,0.78)]">
                  Ini bukan screening yang dingin. Rasanya lebih seperti buku cerita
                  hangat yang diam-diam memantulkan cara kamu menghadapi perasaanmu
                  sendiri.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/game"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#4D3A74_0%,#CC5F49_100%)] px-8 py-4 font-ui text-[1rem] font-bold text-white shadow-[0_14px_38px_rgba(77,58,116,0.28)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(77,58,116,0.34)] active:translate-y-0 active:scale-[0.98]"
                >
                  Mulai Perjalanan
                  <span aria-hidden="true">{"\u2192"}</span>
                </Link>

                <p className="max-w-[250px] font-ui text-[0.84rem] leading-6 text-[rgba(78,59,113,0.72)]">
                  Refleksi yang lembut, personal, dan tetap terasa aman untuk
                  dinikmati pelan-pelan.
                </p>
              </div>

              <div className="mt-7 rounded-[24px] border border-white/45 bg-[rgba(255,255,255,0.5)] px-5 py-4 font-ui text-[0.92rem] leading-7 text-[#6B3D1E] backdrop-blur-[14px]">
                Ini bukan diagnosis klinis. Hasilnya adalah refleksi ringan untuk
                membantu kamu mengenali pola emosi, koneksi, self-compassion, dan
                caramu menghadapi tekanan.
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="pointer-events-none absolute right-[10%] top-[8%] hidden h-52 w-52 rounded-full bg-[#FFD18D]/42 blur-[56px] sm:block" />
            <div className="pointer-events-none absolute left-[12%] bottom-[14%] hidden h-40 w-40 rounded-full bg-[#E8DEF5]/58 blur-[48px] sm:block" />

            <div className="relative w-full max-w-[500px]">
              <div className="relative overflow-hidden rounded-[42px] border border-white/35 bg-[rgba(255,248,241,0.16)] p-3 shadow-[0_30px_80px_rgba(52,28,30,0.18)] backdrop-blur-[12px] sm:p-4">
                <div className="relative h-[400px] overflow-hidden rounded-[34px] sm:h-[500px]">
                  <SceneIllustration setting="park_sunset" background="dusk" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,247,232,0.44)_0%,rgba(255,247,232,0.08)_34%,transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(35,20,40,0.1)_56%,rgba(35,20,40,0.22)_100%)]" />

                  <div className="pointer-events-none absolute right-[12%] top-[18%] hidden h-10 w-10 animate-[twinkle_3s_ease-in-out_infinite] sm:block">
                    <svg viewBox="0 0 28 28" className="h-full w-full opacity-80" aria-hidden="true">
                      <path
                        d="M14 2 L16.8 11.2 L26 14 L16.8 16.8 L14 26 L11.2 16.8 L2 14 L11.2 11.2 Z"
                        fill="#FFE9B5"
                      />
                    </svg>
                  </div>

                  <div className="pointer-events-none absolute left-[14%] top-[30%] hidden h-6 w-6 animate-[twinkle_4s_ease-in-out_infinite] sm:block">
                    <svg viewBox="0 0 20 20" className="h-full w-full opacity-70" aria-hidden="true">
                      <path d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z" fill="#FFF4D2" />
                    </svg>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-0 sm:px-8">
                    <AlpacaAvatar
                      emotion="hopeful"
                      size="hero"
                      accessories={["stars_around"]}
                      className="sm:scale-[0.96]"
                    />
                  </div>
                </div>
              </div>

              <p className="mx-auto mt-4 max-w-[420px] text-center font-ui text-[0.95rem] leading-7 text-[rgba(255,247,241,0.88)] drop-shadow-[0_4px_16px_rgba(48,24,28,0.22)]">
                Rasanya seperti buku cerita hangat yang pelan-pelan membantumu
                memahami emosi, hubungan, dan caramu bertahan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 px-6 text-center font-ui text-[0.82rem] text-[rgba(255,248,241,0.82)] drop-shadow-[0_2px_10px_rgba(47,22,18,0.16)] sm:bottom-2">
        Dibuat dengan {"\uD83D\uDC9B"} untuk kesadaran kesehatan mental
      </footer>
    </main>
  );
}
