import { ChoiceWeight, Scenario } from "@/types/game";

function createWeights(weights: Array<[ChoiceWeight["dimension"], number]>): ChoiceWeight[] {
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
          "Alpa mengetik pesan baru. Kali ini ada yang membalas — ternyata mereka memang sibuk tadi.",
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
      "Kalimat itu terasa seperti tamparan kecil. Teman itu mungkin tidak bermaksud jahat. Tapi rasanya... menusuk.",
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
      "Alpa duduk di bangku taman setelah hari yang sangat panjang. Kuliah, rapat organisasi, tugas, dan drama kelompok — semua dalam satu hari.",
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
      "Ada perasaan yang sulit diberi nama. Bukan sedih biasa. Lebih seperti... kosong dan penuh sekaligus.",
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
          "Alpa membaca artikel tentang kelelahan emosional. Untuk pertama kalinya, ada yang terasa... dimengerti.",
      },
    ],
  },
];
