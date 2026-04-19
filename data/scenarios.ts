import { PROFILES } from "@/data/profiles";
import { ChoiceWeight, ProfileType, Scenario } from "@/types/game";

function createWeights(
  weights: Array<[ChoiceWeight["dimension"], number]>,
): ChoiceWeight[] {
  return weights.map(([dimension, score]) => ({
    dimension,
    score,
  }));
}

export const SCENARIOS: Scenario[] = [
  {
    id: "scenario_01",
    scenarioNumber: 1,
    setting: "bedroom_morning",
    title: "Senin yang Berat",
    alpacaDefaultEmotion: "tired",
    situation: [
      "Alarm berbunyi jam 6 pagi. Alpa membuka mata, tapi rasanya seperti baru tidur dua jam. Padahal kemarin sudah tidur jam 10 malam.",
      "Hari ini ada presentasi kelompok. Alpa sudah menyiapkan bagiannya, tapi tetap ada perasaan tidak enak di perut sejak semalam.",
      "Alpa duduk di tepi tempat tidur, menatap lantai sebentar.",
    ],
    question: "Apa yang pertama kali Alpa lakukan?",
    choices: [
      {
        id: "s1_a",
        text: "Tarik napas dalam, akui bahwa hari ini terasa berat, lalu bersiap pelan-pelan.",
        subtext: "Tidak apa-apa kalau butuh waktu sebentar.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 3],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa duduk sebentar, membiarkan perasaan itu ada tanpa melawannya. Lalu perlahan berdiri.",
      },
      {
        id: "s1_b",
        text: "Langsung berdiri, paksa diri bergerak. Nanti juga hilang sendiri perasaannya.",
        subtext: "Tidak ada waktu untuk merasa tidak enak.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 1],
          ["STRESS_COPING", 1],
          ["SELF_COMPASSION", 0],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Alpa memaksa senyum ke cermin. Berhasil. Untuk sekarang.",
      },
      {
        id: "s1_c",
        text: "Rebahan lagi. Cek HP dulu, scroll sebentar biar semangat.",
        subtext: "Lima menit saja.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 1],
          ["STRESS_COPING", 0],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "cozy",
        narrativeResponse:
          "Lima menit menjadi dua puluh. Alpa akhirnya berdiri terburu-buru.",
      },
    ],
  },
  {
    id: "scenario_02",
    scenarioNumber: 2,
    setting: "campus_hallway",
    title: "Di Tengah Keramaian",
    alpacaDefaultEmotion: "lonely",
    situation: [
      "Koridor kampus penuh orang. Teman-teman Alpa berkumpul di sudut, tertawa membicarakan sesuatu yang Alpa tidak tahu.",
      "Alpa berdiri agak jauh, memegang tas erat-erat. Ada keinginan untuk mendekat, tapi ada juga sesuatu yang menahan.",
      "Salah satu teman melambaikan tangan ke arah Alpa.",
    ],
    question: "Apa yang Alpa rasakan dan lakukan?",
    choices: [
      {
        id: "s2_a",
        text: "Tersenyum dan mendekat. Mungkin menyenangkan untuk bergabung.",
        subtext: "Coba dulu.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 3],
          ["SELF_COMPASSION", 2],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Alpa melangkah mendekat. Ternyata mereka sedang membicarakan film baru. Alpa ikut tertawa.",
      },
      {
        id: "s2_b",
        text: "Balas lambaian tapi tidak mendekat. Pura-pura ada keperluan lain.",
        subtext: "Tidak ingin mengganggu.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 1],
          ["EMOTIONAL_AWARENESS", 2],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Alpa berjalan ke arah lain. Dalam hati bertanya-tanya, apakah mereka memperhatikan.",
      },
      {
        id: "s2_c",
        text: "Langsung pergi ke kelas. Lebih nyaman sendirian.",
        subtext: "Toh mereka tidak benar-benar membutuhkan Alpa di sana.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 0],
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 1],
        ]),
        alpacaReaction: "lonely",
        narrativeResponse:
          "Alpa duduk sendirian di kelas yang masih kosong. Sunyi. Tapi setidaknya aman.",
      },
    ],
  },
  {
    id: "scenario_03",
    scenarioNumber: 3,
    setting: "group_chat",
    title: "Pesan yang Tidak Dibalas",
    alpacaDefaultEmotion: "nervous",
    situation: [
      "Alpa mengirim pesan ke grup teman-teman: 'Eh, ada yang mau hangout besok?' Pesan terkirim jam 3 sore.",
      "Sekarang sudah jam 7 malam. Pesan sudah dibaca semua orang. Tapi tidak ada yang membalas.",
      "Alpa menatap layar HP, melihat centang dua biru itu.",
    ],
    question: "Apa yang ada di pikiran Alpa?",
    choices: [
      {
        id: "s3_a",
        text: "Mungkin mereka memang sedang sibuk. Tidak apa-apa, lain kali saja.",
        subtext: "Tidak selalu tentang aku.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 2],
          ["STRESS_COPING", 3],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa menaruh HP dan melanjutkan hari. Besok mungkin ada yang balas.",
      },
      {
        id: "s3_b",
        text: "Pasti ada yang salah dengan cara Alpa bertanya. Atau mungkin mereka tidak suka Alpa.",
        subtext: "Kenapa selalu begini.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 2],
          ["STRESS_COPING", 0],
        ]),
        alpacaReaction: "sad",
        narrativeResponse:
          "Alpa membaca ulang pesannya berkali-kali, mencari tahu apa yang salah.",
      },
      {
        id: "s3_c",
        text: "Kirim pesan lagi untuk follow up. Mungkin mereka tidak lihat.",
        subtext: "Coba lagi.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 2],
          ["HELP_SEEKING", 2],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Alpa mengetik pesan baru. Kali ini ada yang membalas - ternyata mereka memang sibuk tadi.",
      },
    ],
  },
  {
    id: "scenario_04",
    scenarioNumber: 4,
    setting: "bedroom_night",
    title: "Malam Sebelum Deadline",
    alpacaDefaultEmotion: "overwhelmed",
    situation: [
      "Jam 11 malam. Deadline tugas jam 8 besok pagi. Alpa baru menyelesaikan 40% dari yang seharusnya.",
      "Kepala terasa berat. Mata mulai perih. Tapi kalau berhenti sekarang, tugas tidak akan selesai.",
      "Notifikasi dari teman sekelompok masuk: 'Lo udah selesai belum? Gue udah dari tadi nunggu bagian lo.'",
    ],
    question: "Apa yang Alpa lakukan?",
    choices: [
      {
        id: "s4_a",
        text: "Balas jujur: belum selesai, minta waktu 1 jam lagi, lanjut kerja dengan fokus.",
        subtext: "Jujur lebih baik dari diam.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 2],
          ["HELP_SEEKING", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Teman membalas: 'Oke, gue tunggu. Semangat!' Alpa merasa sedikit lebih ringan.",
      },
      {
        id: "s4_b",
        text: "Tidak balas dulu. Fokus selesaikan dulu, baru balas nanti.",
        subtext: "Selesaikan dulu.",
        weights: createWeights([
          ["STRESS_COPING", 1],
          ["SOCIAL_CONNECTION", 0],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa mengetik tanpa henti. Jam 1 pagi tugas selesai. Tapi badan terasa hancur.",
      },
      {
        id: "s4_c",
        text: "Minta tolong ke teman: bisa bantu selesaikan bagian ini bareng?",
        subtext: "Tidak apa-apa minta bantuan.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["SOCIAL_CONNECTION", 3],
          ["SELF_COMPASSION", 2],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Teman datang via voice call. Mereka selesaikan bersama. Lebih cepat dari yang Alpa kira.",
      },
    ],
  },
  {
    id: "scenario_05",
    scenarioNumber: 5,
    setting: "cafe_afternoon",
    title: "Kata-kata yang Menempel",
    alpacaDefaultEmotion: "sad",
    situation: [
      "Sore di kafe. Alpa sedang ngobrol dengan teman lama. Di tengah obrolan, teman itu bilang: 'Kamu tuh kayaknya nggak pernah serius deh. Santai mulu.'",
      "Kalimat itu terasa seperti tamparan kecil. Teman itu mungkin tidak bermaksud jahat. Tapi rasanya menusuk.",
      "Obrolan berlanjut seolah tidak terjadi apa-apa.",
    ],
    question: "Bagaimana Alpa merespons perasaan itu?",
    choices: [
      {
        id: "s5_a",
        text: "Bilang ke teman: 'Eh, tadi kalimat itu agak nyelekit lho. Maksudnya gimana?'",
        subtext: "Lebih baik dibicarakan.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["SOCIAL_CONNECTION", 3],
          ["SELF_COMPASSION", 3],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Teman kaget, lalu minta maaf. 'Aku nggak maksud gitu.' Obrolan jadi lebih jujur.",
      },
      {
        id: "s5_b",
        text: "Simpan dalam hati. Senyum saja dan lanjutkan obrolan.",
        subtext: "Tidak mau bikin suasana canggung.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 2],
          ["SOCIAL_CONNECTION", 1],
          ["SELF_COMPASSION", 0],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Alpa tersenyum. Tapi kata-kata itu masih terngiang di perjalanan pulang.",
      },
      {
        id: "s5_c",
        text: "Langsung ganti topik. Pura-pura tidak dengar.",
        subtext: "Buat apa dibahas.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 0],
          ["STRESS_COPING", 0],
          ["SELF_COMPASSION", 0],
        ]),
        alpacaReaction: "empty",
        narrativeResponse:
          "Topik berganti. Tapi ada sesuatu yang sedikit retak di dalam dada Alpa.",
      },
    ],
  },
  {
    id: "scenario_06",
    scenarioNumber: 6,
    setting: "park_sunset",
    title: "Hari yang Terlalu Penuh",
    alpacaDefaultEmotion: "tired",
    situation: [
      "Alpa duduk di bangku taman setelah hari yang sangat panjang. Kuliah, rapat organisasi, tugas, dan drama kelompok - semua dalam satu hari.",
      "Matahari mulai terbenam. Sebentar lagi harus pulang dan mengerjakan tugas lain.",
      "Tapi saat ini, Alpa hanya duduk diam.",
    ],
    question: "Apa yang ada di benak Alpa saat ini?",
    choices: [
      {
        id: "s6_a",
        text: "Ini terlalu banyak. Aku perlu bicara dengan seseorang tentang betapa lelahnya aku.",
        subtext: "Aku butuh didengar.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 2],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Alpa membuka chat dengan sahabat: 'Bisa cerita sebentar?' Balasan datang cepat: 'Tentu.'",
      },
      {
        id: "s6_b",
        text: "Istirahat sebentar di sini, lalu lanjut. Semua orang juga capek.",
        subtext: "Bukan cuma aku.",
        weights: createWeights([
          ["STRESS_COPING", 2],
          ["SELF_COMPASSION", 1],
          ["EMOTIONAL_AWARENESS", 1],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa duduk 15 menit lagi, menikmati angin sore. Lalu berdiri dan pulang.",
      },
      {
        id: "s6_c",
        text: "Tidak ada gunanya mengeluh. Lebih baik langsung pulang dan kerja.",
        subtext: "Perasaan bisa nunggu.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 0],
          ["STRESS_COPING", 1],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa berdiri dan berjalan cepat pulang. Matahari terbenam tanpa sempat dinikmati.",
      },
    ],
  },
  {
    id: "scenario_07",
    scenarioNumber: 7,
    setting: "family_dinner",
    title: "Meja Makan yang Sunyi",
    alpacaDefaultEmotion: "nervous",
    situation: [
      "Makan malam keluarga. Mama bertanya: 'Kamu baik-baik aja? Belakangan kamu kelihatan beda.'",
      "Alpa berhenti sejenak. Ada banyak yang ingin dikatakan. Tentang kelelahan, tentang tekanan, tentang perasaan yang sulit dijelaskan.",
      "Semua orang di meja menunggu jawaban.",
    ],
    question: "Apa yang Alpa katakan?",
    choices: [
      {
        id: "s7_a",
        text: "Jujur: 'Sebenernya lagi agak berat, Ma. Boleh cerita nanti?'",
        subtext: "Keluarga adalah tempat yang aman.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["SOCIAL_CONNECTION", 3],
          ["EMOTIONAL_AWARENESS", 3],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Mama mengangguk pelan. 'Nanti setelah makan ya, kita ngobrol.' Alpa merasa sedikit lebih ringan.",
      },
      {
        id: "s7_b",
        text: "Baik-baik aja kok. Cuma capek biasa.",
        subtext: "Tidak mau membuat mereka khawatir.",
        weights: createWeights([
          ["HELP_SEEKING", 0],
          ["SOCIAL_CONNECTION", 1],
          ["SELF_COMPASSION", 0],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Makan malam berlanjut. Alpa menjawab pertanyaan lain dengan senyum yang sudah terlatih.",
      },
      {
        id: "s7_c",
        text: "Ganti topik: 'Eh, tadi di kampus ada yang lucu lho...'",
        subtext: "Lebih mudah begini.",
        weights: createWeights([
          ["HELP_SEEKING", 0],
          ["SOCIAL_CONNECTION", 1],
          ["EMOTIONAL_AWARENESS", 0],
        ]),
        alpacaReaction: "empty",
        narrativeResponse:
          "Semua tertawa mendengar cerita Alpa. Tapi pertanyaan Mama tadi masih menggantung.",
      },
    ],
  },
  {
    id: "scenario_08",
    scenarioNumber: 8,
    setting: "bedroom_night",
    title: "Malam yang Paling Sunyi",
    alpacaDefaultEmotion: "crying",
    situation: [
      "Jam 1 pagi. Alpa tidak bisa tidur. Pikiran berputar-putar tentang semua yang belum selesai, semua yang salah, semua yang seharusnya berbeda.",
      "Ada perasaan yang sulit diberi nama. Bukan sedih biasa. Lebih seperti kosong dan penuh sekaligus.",
      "Alpa menatap langit-langit kamar dalam gelap.",
    ],
    question: "Apa yang Alpa lakukan dengan perasaan ini?",
    choices: [
      {
        id: "s8_a",
        text: "Tulis semua di jurnal atau notes HP. Keluarkan semuanya.",
        subtext: "Biarkan perasaan itu punya tempat.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa menulis sampai tidak ada lagi yang tersisa di kepala. Lalu menutup mata dengan lebih tenang.",
      },
      {
        id: "s8_b",
        text: "Scroll HP sampai mengantuk. Biar pikirannya teralihkan.",
        subtext: "Tidak mau sendirian dengan pikiran ini.",
        weights: createWeights([
          ["STRESS_COPING", 1],
          ["EMOTIONAL_AWARENESS", 0],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa tertidur jam 3 pagi dengan HP di tangan. Besok pagi terasa lebih berat.",
      },
      {
        id: "s8_c",
        text: "Cari informasi tentang apa yang Alpa rasakan. Mungkin ada yang bisa membantu.",
        subtext: "Aku ingin mengerti diriku sendiri.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 2],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Alpa membaca artikel tentang kelelahan emosional. Untuk pertama kalinya, ada yang terasa dimengerti.",
      },
    ],
  },
  {
    id: "scenario_09",
    scenarioNumber: 9,
    setting: "bedroom_morning",
    title: "Cermin di Pagi Hari",
    alpacaDefaultEmotion: "thinking",
    situation: [
      "Alpa berdiri di depan cermin sebelum berangkat. Hari ini ada presentasi penting. Alpa menatap pantulan dirinya sendiri.",
      "Ada pikiran yang muncul: 'Aku tidak cukup siap. Orang-orang pasti akan menilai aku.' Pikiran itu datang tiba-tiba dan cukup keras.",
      "Alpa masih punya 20 menit sebelum harus berangkat.",
    ],
    question: "Apa yang Alpa lakukan dengan pikiran itu?",
    choices: [
      {
        id: "s9_a",
        text: "Sadari bahwa pikiran itu hanya pikiran, bukan fakta. Tarik napas.",
        subtext: "Aku boleh gugup dan tetap melakukannya.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa mengangguk ke pantulannya. 'Aku sudah cukup siap.' Lalu berangkat.",
      },
      {
        id: "s9_b",
        text: "Mulai latihan presentasi lagi dari awal meski waktunya mepet.",
        subtext: "Harus lebih siap lagi.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 1],
          ["STRESS_COPING", 1],
          ["SELF_COMPASSION", 0],
        ]),
        alpacaReaction: "overwhelmed",
        narrativeResponse:
          "Alpa berlatih terburu-buru. Tiba di tempat presentasi dengan napas tersengal.",
      },
      {
        id: "s9_c",
        text: "Scroll media sosial sebentar untuk mengalihkan pikiran.",
        subtext: "Jangan dipikirin dulu.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 0],
          ["STRESS_COPING", 0],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Alpa membuka Instagram. Lima menit kemudian, pikiran itu masih ada - ditambah rasa tidak percaya diri baru.",
      },
    ],
  },
  {
    id: "scenario_10",
    scenarioNumber: 10,
    setting: "campus_hallway",
    title: "Teman yang Membutuhkan",
    alpacaDefaultEmotion: "thinking",
    situation: [
      "Teman Alpa, Dito, tiba-tiba mengirim pesan: 'Pa, bisa ketemu sekarang? Aku lagi nggak baik-baik aja.'",
      "Alpa sedang punya banyak urusan sendiri hari ini. Ada tugas yang belum selesai dan janji lain yang sudah dibuat.",
      "Tapi Dito jarang sekali minta bantuan seperti ini.",
    ],
    question: "Apa yang Alpa lakukan?",
    choices: [
      {
        id: "s10_a",
        text: "Langsung balas: 'Bisa. Kamu di mana sekarang?' dan temui dia.",
        subtext: "Dito pasti butuh aku sekarang.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 3],
          ["HELP_SEEKING", 3],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Alpa menemui Dito. Mereka duduk lama di kantin. Tugas bisa nanti - ini lebih penting.",
      },
      {
        id: "s10_b",
        text: "Balas: 'Aku ada urusan dulu, nanti ya sekitar jam 3?' dan tepati janji itu.",
        subtext: "Aku mau ada, tapi butuh atur waktu dulu.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 2],
          ["SELF_COMPASSION", 2],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Dito membalas: 'Oke, makasih ya.' Alpa menyelesaikan urusannya dengan lebih fokus karena sudah ada rencana.",
      },
      {
        id: "s10_c",
        text: "Balas: 'Maaf lagi sibuk banget hari ini' dan tidak follow up lagi.",
        subtext: "Aku juga punya masalah sendiri.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 0],
          ["HELP_SEEKING", 0],
          ["SELF_COMPASSION", 1],
        ]),
        alpacaReaction: "sad",
        narrativeResponse:
          "Alpa menyimpan HP. Tapi sepanjang hari ada perasaan mengganjal yang tidak bisa hilang.",
      },
    ],
  },
  {
    id: "scenario_11",
    scenarioNumber: 11,
    setting: "exam_room",
    title: "Nilai yang Mengecewakan",
    alpacaDefaultEmotion: "sad",
    situation: [
      "Nilai ujian keluar. Alpa mendapat 58 dari 100. Jauh di bawah ekspektasi. Alpa sudah belajar keras untuk ujian ini.",
      "Teman sebangku mendapat 85. Dia tidak kelihatan belajar lebih keras dari Alpa.",
      "Dosen mengumumkan bahwa nilai bisa diperbaiki dengan mengerjakan tugas tambahan.",
    ],
    question: "Bagaimana reaksi Alpa?",
    choices: [
      {
        id: "s11_a",
        text: "Kecewa, tapi akui perasaan itu lalu fokus ke tugas tambahan.",
        subtext: "Kecewa itu wajar. Tapi masih ada kesempatan.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["STRESS_COPING", 3],
          ["SELF_COMPASSION", 2],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Alpa menghela napas panjang. Lalu membuka catatan dan mulai merencanakan tugas tambahan.",
      },
      {
        id: "s11_b",
        text: "Membandingkan diri dengan teman dan merasa sangat tidak cukup.",
        subtext: "Kenapa aku selalu kalah?",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 1],
          ["SELF_COMPASSION", 0],
          ["STRESS_COPING", 0],
        ]),
        alpacaReaction: "sad",
        narrativeResponse:
          "Alpa menatap nilai temannya. Pikiran-pikiran negatif mengalir deras sepanjang hari.",
      },
      {
        id: "s11_c",
        text: "Langsung tanya dosen: bagian mana yang salah dan bagaimana memperbaikinya?",
        subtext: "Aku mau tahu apa yang bisa diperbaiki.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["EMOTIONAL_AWARENESS", 2],
          ["STRESS_COPING", 3],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Dosen menjelaskan dengan detail. Alpa pulang dengan pemahaman yang lebih baik dari sebelumnya.",
      },
    ],
  },
  {
    id: "scenario_12",
    scenarioNumber: 12,
    setting: "bedroom_morning",
    title: "Sabtu yang Kosong",
    alpacaDefaultEmotion: "cozy",
    situation: [
      "Akhirnya - hari Sabtu tanpa agenda. Tidak ada kuliah, tidak ada rapat, tidak ada deadline mendesak.",
      "Tapi anehnya, Alpa tidak tahu harus berbuat apa. Ada perasaan aneh saat tidak ada yang 'harus' dikerjakan. Seperti bersalah kalau istirahat.",
      "Jam masih menunjukkan pukul 9 pagi.",
    ],
    question: "Bagaimana Alpa menghabiskan pagi ini?",
    choices: [
      {
        id: "s12_a",
        text: "Nikmati istirahat dengan sadar: baca buku, minum teh, tidak buka laptop.",
        subtext: "Aku berhak istirahat tanpa merasa bersalah.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["STRESS_COPING", 3],
          ["EMOTIONAL_AWARENESS", 2],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa duduk di jendela dengan teh hangat. Untuk pertama kalinya dalam lama, waktu terasa seperti miliknya sendiri.",
      },
      {
        id: "s12_b",
        text: "Buka laptop dan mulai mengerjakan tugas yang belum urgent.",
        subtext: "Lebih baik produktif daripada tidak melakukan apa-apa.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["STRESS_COPING", 1],
          ["EMOTIONAL_AWARENESS", 1],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa bekerja sampai siang. Sabtu berlalu seperti hari biasa. Besok Minggu - mungkin bisa istirahat.",
      },
      {
        id: "s12_c",
        text: "Isi dengan hal yang benar-benar Alpa sukai, apapun itu.",
        subtext: "Ini waktuku.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "happy",
        narrativeResponse:
          "Alpa menghabiskan hari dengan hal yang sudah lama ingin dilakukan. Malam hari, ada rasa penuh yang hangat di dada.",
      },
    ],
  },
  {
    id: "scenario_13",
    scenarioNumber: 13,
    setting: "campus_hallway",
    title: "Konflik Kecil",
    alpacaDefaultEmotion: "nervous",
    situation: [
      "Alpa dan teman satu kelompok, Sari, tidak setuju soal pembagian tugas. Sari merasa Alpa tidak berkontribusi cukup. Alpa merasa sudah berusaha maksimal.",
      "Situasi jadi canggung. Anggota kelompok lain diam-diam memperhatikan.",
      "Sari menunggu respons Alpa.",
    ],
    question: "Apa yang Alpa katakan?",
    choices: [
      {
        id: "s13_a",
        text: "Dengarkan perspektif Sari dulu, lalu jelaskan sudut pandang Alpa dengan tenang.",
        subtext: "Konflik bisa diselesaikan dengan dialog.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["STRESS_COPING", 3],
          ["HELP_SEEKING", 1],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Mereka bicara selama 10 menit. Tidak semua setuju, tapi setidaknya saling mengerti.",
      },
      {
        id: "s13_b",
        text: "Minta maaf meski tidak sepenuhnya merasa salah, demi menghindari konflik.",
        subtext: "Tidak mau ribut.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 1],
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 1],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Situasi mereda. Tapi Alpa pulang dengan perasaan tidak adil yang mengganjal.",
      },
      {
        id: "s13_c",
        text: "Diam dan langsung setuju dengan apapun yang Sari minta.",
        subtext: "Biar cepat selesai.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 0],
          ["SELF_COMPASSION", 0],
          ["STRESS_COPING", 0],
        ]),
        alpacaReaction: "empty",
        narrativeResponse:
          "Konflik selesai secara teknis. Tapi Alpa merasa semakin kecil dari sebelumnya.",
      },
    ],
  },
  {
    id: "scenario_14",
    scenarioNumber: 14,
    setting: "cafe_afternoon",
    title: "Pujian yang Tidak Bisa Diterima",
    alpacaDefaultEmotion: "surprised",
    situation: [
      "Setelah presentasi tadi, dosen bilang di depan kelas: 'Presentasi Alpa tadi sangat baik. Analisisnya tajam.'",
      "Teman-teman bertepuk tangan. Alpa berdiri di depan kelas.",
      "Di dalam hati, Alpa langsung berpikir: 'Pasti dosen cuma basa-basi' atau 'Tadi banyak yang kurang sebenarnya.'",
    ],
    question: "Bagaimana Alpa merespons pujian itu?",
    choices: [
      {
        id: "s14_a",
        text: "Terima dengan tulus: 'Terima kasih, Pak. Saya senang bisa menyampaikannya dengan baik.'",
        subtext: "Aku boleh bangga dengan usahaku.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["SOCIAL_CONNECTION", 2],
        ]),
        alpacaReaction: "proud",
        narrativeResponse:
          "Alpa tersenyum tulus. Untuk sekali ini, dia membiarkan dirinya merasa cukup.",
      },
      {
        id: "s14_b",
        text: "Bilang terima kasih tapi langsung sebutkan kekurangannya: 'Tapi tadi bagian X kurang...'",
        subtext: "Jangan sampai dosen salah nilai.",
        weights: createWeights([
          ["SELF_COMPASSION", 1],
          ["EMOTIONAL_AWARENESS", 2],
          ["SOCIAL_CONNECTION", 1],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Dosen tersenyum. 'Kamu terlalu keras pada dirimu sendiri.' Alpa tidak tahu harus menjawab apa.",
      },
      {
        id: "s14_c",
        text: "Tertawa kecil dan bilang: 'Ah biasa aja kok, banyak yang lebih bagus.'",
        subtext: "Tidak enak kalau terlalu menonjol.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 1],
          ["SOCIAL_CONNECTION", 1],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Teman-teman tertawa. Tapi pujian dosen tadi sudah terkubur sebelum sempat dirasakan.",
      },
    ],
  },
  {
    id: "scenario_15",
    scenarioNumber: 15,
    setting: "campus_hallway",
    title: "Tawaran yang Menggiurkan",
    alpacaDefaultEmotion: "thinking",
    situation: [
      "Ketua organisasi kampus menawarkan posisi penting ke Alpa. Keren, bergengsi, dan bisa menambah CV. Tapi waktunya sangat padat - hampir setiap hari ada kegiatan.",
      "Alpa sudah merasa kewalahan dengan jadwal sekarang. Tapi tawaran ini jarang datang dua kali.",
      "Ketua menunggu jawaban dalam 2 hari.",
    ],
    question: "Apa yang Alpa lakukan?",
    choices: [
      {
        id: "s15_a",
        text: "Jujur evaluasi kondisi diri dulu sebelum memutuskan - dan berani bilang tidak jika memang tidak sanggup.",
        subtext: "Batas diri itu penting.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["STRESS_COPING", 3],
          ["HELP_SEEKING", 1],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Alpa duduk dan menulis pro-kontra dengan jujur. Apapun keputusannya, itu keputusan yang sadar.",
      },
      {
        id: "s15_b",
        text: "Langsung terima karena tidak mau menyia-nyiakan kesempatan.",
        subtext: "Nanti juga bisa diatur.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["STRESS_COPING", 0],
          ["EMOTIONAL_AWARENESS", 0],
        ]),
        alpacaReaction: "nervous",
        narrativeResponse:
          "Alpa menerima. Dua minggu kemudian, jadwal terasa seperti tembok yang semakin tinggi.",
      },
      {
        id: "s15_c",
        text: "Minta waktu untuk berpikir dan konsultasi dengan orang yang dipercaya.",
        subtext: "Butuh perspektif lain.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["EMOTIONAL_AWARENESS", 2],
          ["SELF_COMPASSION", 2],
        ]),
        alpacaReaction: "thinking",
        narrativeResponse:
          "Alpa menghubungi kakak tingkat yang dipercaya. Obrolan itu membuka perspektif baru.",
      },
    ],
  },
  {
    id: "scenario_16",
    scenarioNumber: 16,
    setting: "bedroom_night",
    title: "Ketika Semua Terasa Sia-sia",
    alpacaDefaultEmotion: "empty",
    situation: [
      "Ada momen di mana Alpa tiba-tiba bertanya: 'Untuk apa semua ini?' Bukan dalam artian yang gelap - tapi lebih seperti kehilangan arah dan motivasi.",
      "Kuliah terasa tidak bermakna. Hubungan sosial terasa basa-basi. Bahkan hal-hal yang dulu disukai terasa hambar.",
      "Perasaan ini sudah berlangsung beberapa hari.",
    ],
    question: "Apa yang Alpa lakukan dengan perasaan ini?",
    choices: [
      {
        id: "s16_a",
        text: "Akui bahwa ini bukan kemalasan - ini sinyal penting. Cari tahu apa yang hilang.",
        subtext: "Perasaan ini punya pesan.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "thinking",
        narrativeResponse:
          "Alpa duduk dengan jurnal. Perlahan, beberapa jawaban mulai muncul dari dalam.",
      },
      {
        id: "s16_b",
        text: "Paksa diri tetap produktif. Mungkin kalau sibuk, perasaan ini akan hilang.",
        subtext: "Jangan manja.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 0],
          ["SELF_COMPASSION", 0],
          ["STRESS_COPING", 0],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa mengisi jadwal sampai penuh. Perasaan itu tidak hilang - hanya tertunda.",
      },
      {
        id: "s16_c",
        text: "Ceritakan ke seseorang atau cari bantuan profesional.",
        subtext: "Ini sudah terlalu lama aku tanggung sendiri.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["EMOTIONAL_AWARENESS", 2],
          ["SOCIAL_CONNECTION", 3],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Alpa membuat janji dengan konselor kampus. Untuk pertama kalinya, ada langkah nyata.",
      },
    ],
  },
  {
    id: "scenario_17",
    scenarioNumber: 17,
    setting: "group_chat",
    title: "Perbandingan yang Menyakitkan",
    alpacaDefaultEmotion: "sad",
    situation: [
      "Di grup keluarga, tante Alpa mengirim foto sepupu yang baru saja diterima kerja di perusahaan besar. Dengan caption: 'Bangga banget sama Kak Rendi! Semoga yang lain bisa menyusul ya.'",
      "Semua orang di grup memberikan selamat. Alpa tahu tante tidak bermaksud jahat. Tapi tetap saja rasanya seperti ditusuk jarum kecil.",
      "Alpa masih belum tahu mau kerja apa setelah lulus.",
    ],
    question: "Bagaimana Alpa menghadapi perasaan ini?",
    choices: [
      {
        id: "s17_a",
        text: "Ikut mengucapkan selamat dengan tulus, lalu tutup grup dan fokus pada jalannya sendiri.",
        subtext: "Perjalanan orang lain bukan ukuran perjalananku.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["STRESS_COPING", 3],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa mengetik 'Selamat Kak Rendi!' dengan tulus. Lalu menutup HP dan kembali ke harinya.",
      },
      {
        id: "s17_b",
        text: "Tidak balas apapun dan menyimpan perasaan tidak enak itu sendirian.",
        subtext: "Tidak ada yang perlu tahu.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 1],
          ["SOCIAL_CONNECTION", 0],
          ["SELF_COMPASSION", 0],
        ]),
        alpacaReaction: "lonely",
        narrativeResponse:
          "Grup terus ramai. Alpa menjadi penonton diam yang semakin tenggelam dalam pikirannya sendiri.",
      },
      {
        id: "s17_c",
        text: "Ceritakan ke sahabat: 'Aku nggak kenapa-kenapa sih, tapi tadi ada yang bikin nggak enak.'",
        subtext: "Butuh didengar sebentar.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 3],
          ["HELP_SEEKING", 2],
          ["EMOTIONAL_AWARENESS", 2],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Sahabat membalas: 'Wajar banget ngerasa gitu. Kamu lagi di jalanmu sendiri.' Itu cukup.",
      },
    ],
  },
  {
    id: "scenario_18",
    scenarioNumber: 18,
    setting: "bedroom_morning",
    title: "Tubuh yang Berbicara",
    alpacaDefaultEmotion: "tired",
    situation: [
      "Sudah tiga hari ini Alpa sering sakit kepala, susah tidur meski lelah, dan nafsu makan berkurang. Tidak ada yang sakit secara fisik yang jelas.",
      "Teman menyarankan ke dokter. Tapi Alpa berpikir: 'Nanti juga sembuh sendiri. Mungkin cuma kurang tidur.'",
      "Hari ini sakit kepalanya lebih parah dari biasanya.",
    ],
    question: "Apa yang Alpa lakukan?",
    choices: [
      {
        id: "s18_a",
        text: "Pergi ke dokter atau klinik kampus hari ini juga.",
        subtext: "Tubuhku sedang berbicara dan aku perlu mendengarkan.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 3],
        ]),
        alpacaReaction: "determined",
        narrativeResponse:
          "Dokter bilang: 'Ini tanda-tanda stres yang menumpuk di tubuh.' Alpa akhirnya mengerti.",
      },
      {
        id: "s18_b",
        text: "Minum obat sakit kepala dan lanjutkan aktivitas seperti biasa.",
        subtext: "Tidak ada waktu untuk sakit.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["HELP_SEEKING", 0],
          ["EMOTIONAL_AWARENESS", 0],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Obat bekerja sementara. Sore hari, sakit kepala kembali - lebih keras.",
      },
      {
        id: "s18_c",
        text: "Istirahat total hari ini: tidak kuliah, tidak mengerjakan apapun.",
        subtext: "Tubuhku butuh jeda.",
        weights: createWeights([
          ["SELF_COMPASSION", 2],
          ["STRESS_COPING", 2],
          ["EMOTIONAL_AWARENESS", 2],
        ]),
        alpacaReaction: "cozy",
        narrativeResponse:
          "Alpa tidur siang panjang untuk pertama kalinya dalam berminggu-minggu. Bangun dengan kepala sedikit lebih ringan.",
      },
    ],
  },
  {
    id: "scenario_19",
    scenarioNumber: 19,
    setting: "family_dinner",
    title: "Ketika Diminta Baik-baik Saja",
    alpacaDefaultEmotion: "nervous",
    situation: [
      "Ada acara keluarga besar. Semua orang terlihat bahagia dan bersemangat. Alpa diminta untuk 'tampil ceria' oleh orang tua karena 'jangan bikin suasana jadi berat.'",
      "Padahal hari-hari ini Alpa sedang tidak baik-baik saja. Ada banyak yang sedang diproses dalam diam.",
      "Acara akan berlangsung 3 jam.",
    ],
    question: "Apa yang Alpa lakukan?",
    choices: [
      {
        id: "s19_a",
        text: "Hadir dan berinteraksi secukupnya - tidak perlu pura-pura bahagia, tapi tidak perlu merusak suasana.",
        subtext: "Aku boleh hadir apa adanya.",
        weights: createWeights([
          ["EMOTIONAL_AWARENESS", 3],
          ["SELF_COMPASSION", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa hadir dengan tenang. Tidak semua orang menyadari, tapi Alpa tahu dirinya sudah melakukan yang terbaik.",
      },
      {
        id: "s19_b",
        text: "Paksakan diri tampil ceria sepanjang acara meski sangat melelahkan.",
        subtext: "Ini demi keluarga.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 0],
          ["STRESS_COPING", 0],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa tersenyum selama 3 jam. Pulang ke kamar, langsung terbaring kelelahan - bukan karena fisik.",
      },
      {
        id: "s19_c",
        text: "Bicara pelan-pelan ke orang tua sebelum acara: 'Aku lagi nggak terlalu baik, tapi aku akan tetap hadir ya.'",
        subtext: "Jujur tidak harus dramatis.",
        weights: createWeights([
          ["SOCIAL_CONNECTION", 3],
          ["HELP_SEEKING", 2],
          ["EMOTIONAL_AWARENESS", 3],
        ]),
        alpacaReaction: "hopeful",
        narrativeResponse:
          "Orang tua mengangguk. 'Oke, nggak apa-apa.' Tiga kata itu terasa seperti izin yang selama ini Alpa tunggu.",
      },
    ],
  },
  {
    id: "scenario_20",
    scenarioNumber: 20,
    setting: "bedroom_night",
    title: "Surat untuk Diri Sendiri",
    alpacaDefaultEmotion: "thinking",
    situation: [
      "Di akhir hari yang panjang, Alpa menemukan sebuah tantangan di internet: 'Tulis satu kalimat jujur untuk dirimu sendiri hari ini.'",
      "Alpa duduk dengan selembar kertas kosong. Pena di tangan.",
      "Ada banyak yang ingin ditulis. Ada juga yang tidak tahu harus mulai dari mana.",
    ],
    question: "Kalimat apa yang Alpa tulis?",
    choices: [
      {
        id: "s20_a",
        text: "'Aku sedang berjuang, dan itu tidak apa-apa. Aku tidak harus sempurna.'",
        subtext: "Jujur dan lembut pada diri sendiri.",
        weights: createWeights([
          ["SELF_COMPASSION", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["STRESS_COPING", 2],
        ]),
        alpacaReaction: "peaceful",
        narrativeResponse:
          "Alpa membaca kalimat itu pelan. Ada sesuatu yang mengendur di dadanya.",
      },
      {
        id: "s20_b",
        text: "'Aku harus lebih keras berusaha. Masih banyak yang kurang dari diriku.'",
        subtext: "Harus lebih baik lagi.",
        weights: createWeights([
          ["SELF_COMPASSION", 0],
          ["EMOTIONAL_AWARENESS", 1],
          ["STRESS_COPING", 1],
        ]),
        alpacaReaction: "tired",
        narrativeResponse:
          "Alpa menatap kalimat itu lama. Lalu melipat kertas dan menyimpannya. Besok harus lebih baik.",
      },
      {
        id: "s20_c",
        text: "'Aku ingin didengar. Aku ingin ada yang tahu betapa beratnya ini.'",
        subtext: "Ini yang paling jujur.",
        weights: createWeights([
          ["HELP_SEEKING", 3],
          ["EMOTIONAL_AWARENESS", 3],
          ["SOCIAL_CONNECTION", 2],
        ]),
        alpacaReaction: "crying",
        narrativeResponse:
          "Air mata jatuh tanpa permisi. Alpa membiarkannya. Untuk pertama kalinya dalam lama, dia jujur pada dirinya sendiri.",
      },
    ],
  },
];

export function validateGameData() {
  console.assert(SCENARIOS.length === 20, "Harus ada tepat 20 skenario");

  SCENARIOS.forEach((scenario, index) => {
    console.assert(
      scenario.choices.length === 3,
      `Skenario ${index + 1} harus punya 3 pilihan`,
    );

    scenario.choices.forEach((choice, choiceIndex) => {
      console.assert(
        choice.weights.length >= 2,
        `Skenario ${index + 1} pilihan ${choiceIndex + 1} harus punya minimal 2 weights`,
      );
    });
  });

  const dimensionCount: Record<string, number> = {};

  SCENARIOS.forEach((scenario) => {
    scenario.choices.forEach((choice) => {
      choice.weights.forEach((weight) => {
        dimensionCount[weight.dimension] = (dimensionCount[weight.dimension] || 0) + 1;
      });
    });
  });

  Object.entries(dimensionCount).forEach(([dimension, count]) => {
    console.assert(
      count >= 20,
      `Dimensi ${dimension} hanya diukur ${count} kali - perlu minimal 20`,
    );
  });

  const profileTypes: ProfileType[] = [
    "silent_fighter",
    "burnout_soul",
    "growing_butterfly",
    "warm_hugger",
    "calm_explorer",
    "cracked_light",
    "overthinker_heart",
    "hidden_helper",
    "resilient_seed",
    "numb_wanderer",
  ];

  profileTypes.forEach((type) => {
    console.assert(PROFILES[type] !== undefined, `Profil ${type} tidak ditemukan`);
  });

  console.log("✓ Validasi data game berhasil!");
  console.log("  Skenario:", SCENARIOS.length);
  console.log("  Profil:", profileTypes.length);
  console.log("  Distribusi dimensi:", dimensionCount);
}

if (process.env.NODE_ENV === "development") {
  validateGameData();
}
