import Link from "next/link";
import { AtmosphericLayers } from "@/components/AtmosphericLayers";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { RESOURCE_ITEMS } from "@/lib/gameConfig";

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AtmosphericLayers variant="dawn" />
      <BackgroundCanvas variant="dawn" />

      <div className="relative z-20 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[760px]">
          <div className="glass-card-strong rounded-[28px] px-5 py-5 sm:px-7 sm:py-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/game"
                className="font-ui text-sm font-semibold text-[rgba(139,94,60,0.72)] transition-colors hover:text-[#E8855A]"
              >
                {"\u2190"} Kembali ke permainan
              </Link>
              <Link
                href="/"
                className="font-ui text-sm font-semibold text-[rgba(139,94,60,0.72)] transition-colors hover:text-[#E8855A]"
              >
                Kembali ke beranda
              </Link>
            </div>

            <p className="mt-5 font-accent text-[10px] uppercase tracking-[0.26em] text-[rgba(139,94,60,0.58)]">
              Ruang Lanjut
            </p>
            <h1 className="mt-3 font-display text-[2rem] font-bold text-[#5C2E0A] sm:text-[2.5rem]">
              Kalau hasilmu terasa dekat, mulai dari yang kecil dulu.
            </h1>
            <p className="mt-4 font-ui text-[1rem] leading-8 text-[#6B3D1E]">
              Tidak semua langkah pemulihan harus besar. Kadang yang paling
              penting adalah memberi ruang kecil agar perasaanmu tidak terus
              dipaksa diam.
            </p>

            <div className="divider-line my-6" />

            <section>
              <h2 className="font-display text-[1.3rem] font-semibold text-[#5C2E0A]">
                Beberapa langkah yang bisa kamu coba
              </h2>
              <ul className="mt-4 space-y-3">
                {RESOURCE_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-ui text-[0.97rem] leading-7 text-[#6B3D1E]"
                  >
                    <span aria-hidden="true" className="mt-1 text-[#F4A636]">
                      {"\u2726"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="divider-line my-6" />

            <section className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[22px] bg-white/56 p-5">
                <h2 className="font-display text-[1.2rem] font-semibold text-[#5C2E0A]">
                  Kapan bantuan profesional layak dipertimbangkan?
                </h2>
                <p className="mt-3 font-ui text-[0.94rem] leading-7 text-[#6B3D1E]">
                  Kalau rasa lelah, kosong, cemas, atau kewalahan mulai bertahan
                  lama dan mengganggu tidur, kuliah, kerja, atau hubunganmu,
                  kamu berhak mendapatkan bantuan yang lebih terarah. Kamu tidak
                  harus menunggu sampai keadaan terasa &quot;cukup parah&quot;.
                </p>
              </div>

              <div className="rounded-[22px] bg-[rgba(255,220,180,0.42)] p-5">
                <h2 className="font-display text-[1.2rem] font-semibold text-[#5C2E0A]">
                  Kalau keadaan terasa sangat berat
                </h2>
                <p className="mt-3 font-ui text-[0.94rem] leading-7 text-[#6B3D1E]">
                  Ceritakan ke orang yang kamu percaya sesegera mungkin. Kamu
                  juga bisa menghubungi konselor kampus, psikolog, rumah sakit,
                  atau layanan bantuan yang tersedia. Jika kamu perlu, simpan
                  juga nomor Into The Light Indonesia: 119 ext 8.
                </p>
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/game" className="primary-cta">
                Kembali ke Alpa
              </Link>
              <Link href="/" className="secondary-cta">
                Lihat Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
