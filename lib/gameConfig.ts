import {
  AlpacaAccessory,
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

export const RESULT_BACKGROUND_MAP: Record<ProfileType, SceneBackground> = {
  silent_fighter: "night",
  burnout_soul: "twilight",
  growing_butterfly: "dawn",
  warm_hugger: "golden",
  calm_explorer: "dawn",
  cracked_light: "night",
};

export const PROFILE_BADGES: Record<ProfileType, string> = {
  silent_fighter: "Profil Emosi: Pejuang Diam",
  burnout_soul: "Profil Emosi: Jiwa yang Kelelahan",
  growing_butterfly: "Profil Emosi: Kupu-kupu yang Belajar",
  warm_hugger: "Profil Emosi: Pelukan Hangat",
  calm_explorer: "Profil Emosi: Penjelajah Tenang",
  cracked_light: "Profil Emosi: Cahaya yang Retak",
};

export const PROFILE_ACCESSORIES_BY_TYPE: Record<ProfileType, AlpacaAccessory[]> = {
  silent_fighter: ["scarf"],
  burnout_soul: ["broken_heart"],
  growing_butterfly: ["flower_wreath"],
  warm_hugger: ["heart_balloon"],
  calm_explorer: ["backpack", "stars_around"],
  cracked_light: ["broken_heart", "scarf"],
};

export const SCENARIO_SPEECHES: Record<string, string> = {
  scenario_01: "Kadang pagi yang berat memang butuh dimulai pelan-pelan.",
  scenario_02: "Di tengah ramai, rasanya aneh kalau hati malah ingin bersembunyi.",
  scenario_03: "Pesan yang diam bisa terasa lebih keras dari notifikasi apa pun.",
  scenario_04: "Kalau kepala penuh, satu pesan saja bisa terasa seperti longsor kecil.",
  scenario_05: "Ada kata-kata yang mungkin kecil bagi orang lain, tapi besar sekali saat menempel di dada.",
  scenario_06: "Lelah yang paling berat sering datang setelah semua orang mengira kita baik-baik saja.",
  scenario_07: "Kadang pertanyaan paling sederhana justru yang paling sulit dijawab jujur.",
  scenario_08: "Malam sering membuat isi kepala terdengar lebih keras daripada siang.",
};

export const RESOURCE_ITEMS = [
  "Bernapas perlahan selama satu menit sambil menamai perasaan yang sedang muncul.",
  "Menulis tiga kalimat jujur tentang kondisi hari ini tanpa menghakimi diri sendiri.",
  "Menghubungi satu orang yang terasa aman untuk sekadar bilang, 'Aku lagi agak berat hari ini.'",
  "Menyimpan kontak bantuan profesional agar lebih mudah dijangkau saat dibutuhkan.",
];
