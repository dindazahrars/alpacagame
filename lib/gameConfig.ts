import { PROFILES } from "@/data/profiles";
import {
  AlpacaAccessory,
  DimensionLevel,
  PsychDimension,
  ProfileType,
  ScenarioSetting,
  SceneBackground,
} from "@/types/game";

export const EMPTY_SCORES = {
  EMOTIONAL_AWARENESS: 0,
  SOCIAL_CONNECTION: 0,
  SELF_COMPASSION: 0,
  STRESS_COPING: 0,
  HELP_SEEKING: 0,
};

export const SETTING_BACKGROUND_MAP: Record<ScenarioSetting, SceneBackground> = {
  bedroom_morning: "golden",
  campus_hallway: "golden",
  cafe_afternoon: "dusk",
  bedroom_night: "night",
  park_sunset: "dusk",
  group_chat: "twilight",
  family_dinner: "golden",
  exam_room: "twilight",
};

export const SETTING_LABELS: Record<ScenarioSetting, string> = {
  bedroom_morning: "Kamar, Pagi Hari",
  campus_hallway: "Koridor Kampus",
  cafe_afternoon: "Kafe, Sore Hari",
  bedroom_night: "Kamar, Malam Hari",
  park_sunset: "Taman Saat Sunset",
  group_chat: "Ruang Obrolan",
  family_dinner: "Makan Malam Keluarga",
  exam_room: "Ruang Ujian",
};

export const DIMENSION_LABELS: Record<PsychDimension, string> = {
  EMOTIONAL_AWARENESS: "Kesadaran Emosi",
  SOCIAL_CONNECTION: "Koneksi Sosial",
  SELF_COMPASSION: "Kasih Sayang pada Diri",
  STRESS_COPING: "Menghadapi Tekanan",
  HELP_SEEKING: "Mencari Dukungan",
};

export const DIMENSION_LEVEL_BADGES: Record<DimensionLevel, string> = {
  critical: "Perlu Perhatian",
  low: "Perlu Dikembangkan",
  developing: "Sedang Berkembang",
  healthy: "Cukup Sehat",
  thriving: "Sangat Sehat",
};

export const DIMENSION_LEVEL_GRADIENTS: Record<DimensionLevel, string> = {
  critical: "linear-gradient(90deg, #E53E3E 0%, #FC8181 100%)",
  low: "linear-gradient(90deg, #DD6B20 0%, #F6AD55 100%)",
  developing: "linear-gradient(90deg, #D69E2E 0%, #FAF089 100%)",
  healthy: "linear-gradient(90deg, #38A169 0%, #9AE6B4 100%)",
  thriving: "linear-gradient(90deg, #3182CE 0%, #90CDF4 100%)",
};

export const DIMENSION_LEVEL_BADGE_STYLES: Record<
  DimensionLevel,
  { background: string; color: string }
> = {
  critical: { background: "rgba(252, 129, 129, 0.18)", color: "#9B2C2C" },
  low: { background: "rgba(246, 173, 85, 0.2)", color: "#C05621" },
  developing: { background: "rgba(250, 240, 137, 0.25)", color: "#B7791F" },
  healthy: { background: "rgba(154, 230, 180, 0.22)", color: "#276749" },
  thriving: { background: "rgba(144, 205, 244, 0.22)", color: "#2B6CB0" },
};

export const RESULT_BACKGROUND_MAP: Record<ProfileType, SceneBackground> = {
  silent_fighter: "night",
  burnout_soul: "twilight",
  growing_butterfly: "dawn",
  warm_hugger: "golden",
  calm_explorer: "dawn",
  cracked_light: "night",
  overthinker_heart: "twilight",
  hidden_helper: "dusk",
  resilient_seed: "dawn",
  numb_wanderer: "night",
};

export const PROFILE_BADGES: Record<ProfileType, string> = {
  silent_fighter: "Profil Emosi: Pejuang Diam",
  burnout_soul: "Profil Emosi: Jiwa yang Kelelahan",
  growing_butterfly: "Profil Emosi: Kupu-kupu yang Belajar",
  warm_hugger: "Profil Emosi: Pelukan Hangat",
  calm_explorer: "Profil Emosi: Penjelajah Tenang",
  cracked_light: "Profil Emosi: Cahaya yang Retak",
  overthinker_heart: "Profil Emosi: Hati yang Terlalu Berpikir",
  hidden_helper: "Profil Emosi: Penolong yang Tersembunyi",
  resilient_seed: "Profil Emosi: Benih yang Tangguh",
  numb_wanderer: "Profil Emosi: Pengembara yang Mati Rasa",
};

export const PROFILE_ACCESSORIES_BY_TYPE: Record<ProfileType, AlpacaAccessory[]> = {
  silent_fighter: PROFILES.silent_fighter.accessories,
  burnout_soul: PROFILES.burnout_soul.accessories,
  growing_butterfly: PROFILES.growing_butterfly.accessories,
  warm_hugger: PROFILES.warm_hugger.accessories,
  calm_explorer: PROFILES.calm_explorer.accessories,
  cracked_light: PROFILES.cracked_light.accessories,
  overthinker_heart: PROFILES.overthinker_heart.accessories,
  hidden_helper: PROFILES.hidden_helper.accessories,
  resilient_seed: PROFILES.resilient_seed.accessories,
  numb_wanderer: PROFILES.numb_wanderer.accessories,
};

export const SCENARIO_SPEECHES: Record<string, string> = {
  scenario_01: "Kadang pagi yang berat memang butuh dimulai pelan-pelan.",
  scenario_02: "Di tengah ramai, rasanya aneh kalau hati malah ingin bersembunyi.",
  scenario_03: "Pesan yang diam bisa terasa lebih keras dari notifikasi apa pun.",
  scenario_04: "Kalau kepala penuh, satu pesan saja bisa terasa seperti longsor kecil.",
  scenario_05:
    "Ada kata-kata yang mungkin kecil bagi orang lain, tapi besar sekali saat menempel di dada.",
  scenario_06:
    "Lelah yang paling berat sering datang setelah semua orang mengira kita baik-baik saja.",
  scenario_07:
    "Kadang pertanyaan paling sederhana justru yang paling sulit dijawab jujur.",
  scenario_08: "Malam sering membuat isi kepala terdengar lebih keras daripada siang.",
  scenario_09:
    "Pikiran yang datang keras bukan selalu kebenaran, kadang cuma ketakutan yang sedang besar.",
  scenario_10:
    "Menolong orang lain itu indah, tapi kadang kita juga perlu ingat kondisi diri sendiri.",
  scenario_11:
    "Nilai buruk bisa melukai harga diri kalau kita lupa bahwa satu angka bukan seluruh cerita.",
  scenario_12:
    "Istirahat sering terasa asing kalau kita terlalu lama hidup dalam mode bertahan.",
  scenario_13:
    "Konflik kecil pun bisa terasa besar saat hati sedang rapuh dan takut tidak dimengerti.",
  scenario_14:
    "Menerima pujian kadang lebih sulit daripada menerima kritik, terutama saat kita terlalu keras pada diri sendiri.",
  scenario_15:
    "Tidak semua kesempatan harus diambil. Kadang keputusan paling berani justru menjaga batas diri.",
  scenario_16:
    "Saat semuanya terasa hambar, bukan berarti kamu malas. Mungkin hatimu sudah terlalu lelah.",
  scenario_17:
    "Perbandingan diam-diam bisa sangat menusuk, bahkan saat semua orang di layar terlihat baik-baik saja.",
  scenario_18:
    "Tubuh sering berbicara lebih jujur daripada kata-kata yang bisa kita ucapkan.",
  scenario_19:
    "Diminta terlihat baik-baik saja bisa terasa berat saat sebenarnya kita hanya ingin dimengerti.",
  scenario_20:
    "Kadang kalimat paling jujur untuk diri sendiri justru jadi pintu pertama menuju pemulihan.",
};

export const RESOURCE_ITEMS = [
  "Bernapas perlahan selama satu menit sambil menamai perasaan yang sedang muncul.",
  "Menulis tiga kalimat jujur tentang kondisi hari ini tanpa menghakimi diri sendiri.",
  "Menghubungi satu orang yang terasa aman untuk sekadar bilang, 'Aku lagi agak berat hari ini.'",
  "Menyimpan kontak bantuan profesional agar lebih mudah dijangkau saat dibutuhkan.",
];
