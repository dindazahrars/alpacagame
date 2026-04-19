import { DetailedProfile, ProfileType } from "@/types/game";

export const PROFILES: Record<ProfileType, DetailedProfile> = {
  silent_fighter: {
    type: "silent_fighter",
    tagline: "Kamu sudah terlalu lama berjalan sendirian.",
    title: "Pejuang Diam",
    subtitle:
      "Di balik ketenangan itu, ada kelelahan yang tidak pernah benar-benar pergi.",
    description:
      "Kamu adalah seseorang yang terbiasa menyelesaikan segalanya sendiri. Bukan karena kamu tidak butuh bantuan - tapi karena entah sejak kapan, kamu belajar bahwa lebih mudah menanggung sendiri daripada menjelaskan kepada orang lain. Di luar kamu terlihat baik-baik saja. Bahkan mungkin terlihat kuat. Tapi di dalam, ada kelelahan yang sudah lama menumpuk tanpa pernah benar-benar diakui.",
    strengths: [
      "Sangat tangguh dan mampu bertahan dalam situasi sulit",
      "Mandiri dan tidak mudah menyusahkan orang lain",
      "Punya ketahanan yang luar biasa",
    ],
    challenges: [
      "Menyimpan segalanya sendirian hingga mencapai titik jenuh",
      "Sulit meminta bantuan meski sangat membutuhkannya",
      "Kelelahan emosional yang tidak disadari terus menumpuk",
    ],
    blindSpots: [
      "Kamu mungkin tidak sadar betapa lelahnya kamu sebenarnya",
      "Kamu mungkin mengira meminta bantuan adalah beban bagi orang lain - padahal tidak",
    ],
    gentleMessage:
      "Kamu tidak harus kuat setiap saat. Ada orang yang ingin ada untukmu - kamu hanya perlu memberi mereka kesempatan itu.",
    weeklyChallenge:
      "Minggu ini, ceritakan satu hal kecil yang sedang kamu rasakan kepada satu orang yang kamu percaya. Hanya satu hal. Itu sudah cukup.",
    actionSuggestions: [
      "Mulai dengan langkah kecil: ceritakan satu hal ke satu orang",
      "Pertimbangkan berbicara dengan konselor atau psikolog",
      "Izinkan dirimu istirahat tanpa merasa harus 'layak' dulu",
    ],
    affirmation:
      "Meminta bantuan bukan kelemahan. Itu adalah keberanian yang paling nyata.",
    needsProfessionalNote: true,
    urgencyLevel: "recommended",
    alpacaVariant: "tired",
    accessories: ["scarf"],
    colorTheme: {
      primary: "#4A6FA5",
      secondary: "#7B9EC7",
      accent: "#B8D4F0",
      bg: "#EEF4FB",
      text: "#1E3A5F",
    },
    relatedProfiles: ["burnout_soul", "hidden_helper", "overthinker_heart"],
  },
  burnout_soul: {
    type: "burnout_soul",
    tagline: "Kamu tahu sesuatu tidak beres - dan itu sudah setengah jalan.",
    title: "Jiwa yang Kelelahan",
    subtitle: "Kesadaran yang tinggi, energi yang hampir habis.",
    description:
      "Kamu sangat sadar dengan apa yang kamu rasakan. Kamu tahu kamu lelah, kamu tahu kamu kewalahan, kamu tahu ada yang perlu berubah. Tapi menerjemahkan kesadaran itu menjadi tindakan nyata terasa seperti mengangkat beban yang terlalu berat. Bukan karena kamu tidak mau - kamu hanya sudah kehabisan energi untuk memulai. Kamu bukan tidak berdaya. Kamu hanya butuh ruang untuk mengisi ulang.",
    strengths: [
      "Kesadaran diri yang sangat tinggi - ini kekuatan besar",
      "Jujur dengan dirimu sendiri tentang kondisimu",
      "Peka terhadap perasaan diri sendiri dan orang lain",
    ],
    challenges: [
      "Energi emosional yang sangat terkuras",
      "Jarak antara 'tahu' dan 'melakukan' terasa sangat jauh",
      "Mudah overwhelmed bahkan oleh hal-hal kecil",
    ],
    blindSpots: [
      "Kamu mungkin terjebak dalam analisis tanpa aksi karena takut salah langkah",
      "Kesadaran yang tinggi kadang membuat kamu terlalu banyak berpikir sebelum bergerak",
    ],
    gentleMessage:
      "Kelelahan bukan kegagalan. Kamu tidak perlu sembuh dalam semalam. Satu langkah kecil hari ini - sekecil apapun - sudah lebih dari cukup.",
    weeklyChallenge:
      "Pilih SATU hal dari daftar tugasmu yang bisa kamu hapus atau tunda minggu ini. Praktikkan mengatakan tidak pada satu hal.",
    actionSuggestions: [
      "Kurangi satu tanggung jawab yang bisa dikurangi",
      "Bicara dengan profesional - kamu layak punya ruang untuk didengar",
      "Beri dirimu izin untuk tidak produktif selama satu hari penuh",
    ],
    affirmation: "Istirahat adalah bagian dari proses, bukan penghalangnya.",
    needsProfessionalNote: true,
    urgencyLevel: "recommended",
    alpacaVariant: "empty",
    accessories: ["broken_heart"],
    colorTheme: {
      primary: "#8B7BA8",
      secondary: "#B09EC7",
      accent: "#D4C9E8",
      bg: "#F5F0FB",
      text: "#3D2B5C",
    },
    relatedProfiles: ["overthinker_heart", "silent_fighter", "cracked_light"],
  },
  growing_butterfly: {
    type: "growing_butterfly",
    tagline: "Kamu sedang tumbuh - dan itu terlihat jelas.",
    title: "Kupu-kupu yang Belajar",
    subtitle: "Tidak sempurna, tapi terus bergerak maju.",
    description:
      "Kamu tidak selalu berhasil menghadapi segalanya dengan sempurna - tapi kamu mencoba. Kamu mulai belajar bahwa dirimu layak diperlakukan dengan baik, oleh orang lain dan terutama oleh dirimu sendiri. Ada hari-hari berat, tapi ada juga hari-hari di mana kamu berhasil memilih dirimu sendiri. Itu bukan hal kecil. Kamu sedang dalam proses yang indah, meski prosesnya tidak selalu terasa indah.",
    strengths: [
      "Sedang aktif tumbuh dan berkembang",
      "Mulai bisa bersikap lebih lembut pada diri sendiri",
      "Tidak menyerah meski prosesnya tidak mudah",
    ],
    challenges: [
      "Masih ada momen di mana kamu terlalu keras pada dirimu",
      "Kadang ragu apakah kamu 'layak' meminta bantuan",
      "Perjalanan pertumbuhan bisa terasa lambat dan melelahkan",
    ],
    blindSpots: [
      "Kamu mungkin tidak menyadari betapa jauh kamu sudah berkembang",
      "Kamu cenderung fokus pada yang belum berhasil, bukan yang sudah",
    ],
    gentleMessage:
      "Kamu tidak harus sudah 'sembuh' untuk layak dicintai dan dihargai. Proses tumbuh itu sendiri adalah pencapaian yang nyata.",
    weeklyChallenge:
      "Setiap malam minggu ini, tulis SATU hal kecil yang berhasil kamu lakukan dengan baik hari itu. Tidak peduli sekecil apapun.",
    actionSuggestions: [
      "Rayakan kemajuan kecil yang sering kamu abaikan",
      "Lanjutkan kebiasaan self-care yang sudah mulai kamu bangun",
      "Pertimbangkan journaling untuk melacak pertumbuhanmu",
    ],
    affirmation: "Setiap langkah kecil ke depan tetaplah langkah ke depan.",
    needsProfessionalNote: false,
    urgencyLevel: "suggested",
    alpacaVariant: "hopeful",
    accessories: ["flower_wreath"],
    colorTheme: {
      primary: "#E8855A",
      secondary: "#F4A636",
      accent: "#FFD166",
      bg: "#FFF8EE",
      text: "#5C2E0A",
    },
    relatedProfiles: ["resilient_seed", "calm_explorer", "warm_hugger"],
  },
  warm_hugger: {
    type: "warm_hugger",
    tagline: "Kamu adalah sumber kehangatan - untuk orang lain dan dirimu sendiri.",
    title: "Pelukan Hangat",
    subtitle: "Koneksi yang kuat, hati yang terbuka.",
    description:
      "Kamu tahu cara terhubung dengan orang lain secara tulus, dan kamu juga tahu cara merawat dirimu sendiri. Kamu tidak sempurna, tapi kamu punya fondasi emosional yang kuat. Orang-orang di sekitarmu mungkin sering merasa nyaman bersamamu - karena kamu memang memancarkan kehangatan yang tulus. Yang penting sekarang adalah memastikan kehangatan itu tidak menguras dirimu.",
    strengths: [
      "Kemampuan berkoneksi yang luar biasa dan tulus",
      "Self-compassion yang sehat dan nyata",
      "Tahu kapan dan bagaimana mencari dukungan",
    ],
    challenges: [
      "Kadang terlalu fokus pada orang lain hingga lupa diri sendiri",
      "Perlu menjaga agar kehangatan yang diberikan tidak menguras diri",
    ],
    blindSpots: [
      "Kamu mungkin lebih mudah berempati pada orang lain daripada pada dirimu sendiri",
      "Kamu mungkin tidak menyadari bahwa kamu juga butuh menerima, bukan hanya memberi",
    ],
    gentleMessage:
      "Terus jaga dirimu sebaik kamu menjaga orang lain. Kamu juga layak menerima pelukan yang selalu kamu berikan.",
    weeklyChallenge:
      "Minggu ini, lakukan satu hal yang murni untuk dirimu sendiri - bukan untuk produktivitas, bukan untuk orang lain. Hanya untukmu.",
    actionSuggestions: [
      "Pastikan kamu punya waktu untuk dirimu sendiri di tengah kesibukanmu",
      "Periksa: apakah kamu memberi terlalu banyak sampai lupa mengisi ulang dirimu?",
      "Terus pertahankan koneksi sosial yang sehat dan bermakna",
    ],
    affirmation:
      "Kamu layak menerima kebaikan yang sama yang selalu kamu berikan.",
    needsProfessionalNote: false,
    urgencyLevel: "none",
    alpacaVariant: "happy",
    accessories: ["heart_balloon"],
    colorTheme: {
      primary: "#F4A636",
      secondary: "#FFD166",
      accent: "#FFE8A0",
      bg: "#FFFBEE",
      text: "#5C3A00",
    },
    relatedProfiles: ["calm_explorer", "hidden_helper", "growing_butterfly"],
  },
  calm_explorer: {
    type: "calm_explorer",
    tagline: "Kamu sedang menemukan ritme hidupmu sendiri.",
    title: "Penjelajah Tenang",
    subtitle: "Seimbang, penasaran, dan terus berkembang.",
    description:
      "Kamu cukup seimbang dalam menghadapi kehidupan. Tidak selalu sempurna, tapi kamu punya cara-cara yang cukup sehat untuk menghadapi tantangan. Kamu penasaran dengan dirimu sendiri dan dunia di sekitarmu. Kamu tahu kapan harus maju dan kapan harus berhenti sejenak. Ini bukan pencapaian kecil - ini fondasi yang kuat untuk terus tumbuh.",
    strengths: [
      "Keseimbangan emosional yang cukup stabil",
      "Kemampuan adaptasi yang baik",
      "Rasa ingin tahu yang sehat tentang diri sendiri",
    ],
    challenges: [
      "Mungkin belum menemukan area spesifik yang perlu lebih diperhatikan",
      "Keseimbangan yang ada perlu terus dijaga secara aktif, tidak bisa diabaikan",
    ],
    blindSpots: [
      "Karena terlihat baik-baik saja, kamu mungkin mengabaikan sinyal-sinyal kecil",
      "Keseimbangan bisa terganggu saat tekanan meningkat - penting untuk punya rencana",
    ],
    gentleMessage:
      "Terus jelajahi dirimu dengan rasa ingin tahu, bukan penghakiman. Setiap penemuan tentang dirimu adalah hadiah.",
    weeklyChallenge:
      "Coba satu praktik mindfulness baru minggu ini - meditasi 5 menit, journaling, atau sekadar duduk diam tanpa HP selama 10 menit.",
    actionSuggestions: [
      "Lanjutkan kebiasaan sehat yang sudah kamu miliki",
      "Eksplorasi praktik mindfulness atau meditasi",
      "Sesekali check-in dengan dirimu: bagaimana perasaanmu hari ini, sebenarnya?",
    ],
    affirmation:
      "Keseimbanganmu adalah hasil dari pilihan-pilihan kecil yang bijak.",
    needsProfessionalNote: false,
    urgencyLevel: "none",
    alpacaVariant: "peaceful",
    accessories: ["backpack", "stars_around"],
    colorTheme: {
      primary: "#6B9E7A",
      secondary: "#8FC49A",
      accent: "#C2E0C8",
      bg: "#F0FAF2",
      text: "#1E4D2B",
    },
    relatedProfiles: ["warm_hugger", "growing_butterfly", "resilient_seed"],
  },
  cracked_light: {
    type: "cracked_light",
    tagline:
      "Di balik retakan itu, masih ada cahaya - dan kamu tidak harus sendirian.",
    title: "Cahaya yang Retak",
    subtitle: "Saat ini terasa sangat berat, dan itu nyata.",
    description:
      "Saat ini mungkin terasa sangat berat. Kamu mungkin sudah lama berjalan dengan beban yang terlalu besar, tanpa cukup ruang untuk bernapas. Perasaan kosong, mati rasa, atau kewalahan yang kamu rasakan adalah sinyal penting yang perlu didengarkan - bukan diabaikan atau dipaksakan untuk hilang. Kamu tidak harus menanggung ini sendirian. Ada bantuan yang tersedia, dan kamu layak mendapatkannya.",
    strengths: [
      "Kamu masih di sini, dan itu berarti kamu masih berjuang",
      "Ada bagian dari dirimu yang mencari jalan keluar - itu kekuatan",
    ],
    challenges: [
      "Kelelahan emosional yang sangat dalam",
      "Kesulitan mengenali atau mengekspresikan perasaan",
      "Perlu dukungan yang lebih dari sekadar self-help",
    ],
    blindSpots: [
      "Kamu mungkin sudah terbiasa dengan kondisi ini sehingga tidak sadar betapa beratnya",
      "Kamu mungkin mengira ini adalah 'normal' - padahal kamu berhak merasa lebih baik",
    ],
    gentleMessage:
      "Kamu tidak harus menanggung ini sendirian. Mencari bantuan adalah tindakan paling berani yang bisa kamu lakukan sekarang.",
    weeklyChallenge:
      "Satu langkah saja: hubungi satu orang hari ini dan katakan 'Aku sedang tidak baik-baik saja.' Hanya itu. Tidak perlu lebih.",
    actionSuggestions: [
      "Hubungi konselor atau psikolog sesegera mungkin",
      "Ceritakan perasaanmu kepada seseorang yang kamu percaya hari ini",
      "Into The Light Indonesia: 119 ext 8 (tersedia 24 jam)",
    ],
    affirmation:
      "Kamu layak mendapat bantuan. Memintanya adalah keberanian, bukan kelemahan.",
    needsProfessionalNote: true,
    urgencyLevel: "urgent",
    alpacaVariant: "sad",
    accessories: ["broken_heart", "scarf"],
    colorTheme: {
      primary: "#2D4A7A",
      secondary: "#4A6FA5",
      accent: "#8AAFD4",
      bg: "#EEF4FB",
      text: "#0A1E3D",
    },
    relatedProfiles: ["numb_wanderer", "burnout_soul", "silent_fighter"],
  },
  overthinker_heart: {
    type: "overthinker_heart",
    tagline: "Pikiranmu bekerja sangat keras - mungkin terlalu keras.",
    title: "Hati yang Terlalu Berpikir",
    subtitle: "Sadar segalanya, tapi sering terjebak di dalam kepala sendiri.",
    description:
      "Kamu sangat sadar dan peka - terhadap perasaanmu, terhadap orang lain, terhadap situasi di sekitarmu. Tapi kesadaran yang tinggi itu kadang menjadi pedang bermata dua: kamu terlalu banyak menganalisis, terlalu banyak mempertimbangkan, hingga sulit untuk benar-benar bergerak atau beristirahat. Pikiranmu jarang berhenti. Dan itu sangat melelahkan.",
    strengths: [
      "Sangat peka dan empatik",
      "Kemampuan analisis yang tajam",
      "Jarang membuat keputusan sembrono",
    ],
    challenges: [
      "Overthinking yang menguras energi mental",
      "Sulit mematikan pikiran meski sudah lelah",
      "Sering terjebak antara banyak pilihan tanpa bisa memutuskan",
    ],
    blindSpots: [
      "Kamu mungkin mengira berpikir lebih banyak sama dengan lebih aman, padahal sering sebaliknya",
      "Kamu mungkin tidak sadar bahwa tubuhmu sudah minta istirahat sementara pikiranmu masih berlari",
    ],
    gentleMessage:
      "Tidak semua pertanyaan harus dijawab sekarang. Tidak semua masalah harus diselesaikan malam ini. Pikiranmu boleh beristirahat.",
    weeklyChallenge:
      "Setiap kali kamu sadar sedang overthinking, tulis pikirannya di kertas lalu tutup buku itu. Beri pikiran itu 'tempat' - di luar kepalamu.",
    actionSuggestions: [
      "Coba teknik grounding: 5 hal yang bisa dilihat, 4 yang bisa disentuh, dan seterusnya",
      "Journaling untuk mengeluarkan pikiran dari kepala ke kertas",
      "Pertimbangkan terapi kognitif untuk membantu mengelola pola pikir",
    ],
    affirmation:
      "Kamu tidak harus punya semua jawaban. Tidak tahu pun itu valid.",
    needsProfessionalNote: true,
    urgencyLevel: "suggested",
    alpacaVariant: "thinking",
    accessories: ["stars_around"],
    colorTheme: {
      primary: "#7B5EA7",
      secondary: "#9B7EC7",
      accent: "#C9B8E8",
      bg: "#F5F0FB",
      text: "#3D2B5C",
    },
    relatedProfiles: ["burnout_soul", "silent_fighter", "calm_explorer"],
  },
  hidden_helper: {
    type: "hidden_helper",
    tagline:
      "Kamu selalu ada untuk semua orang - tapi siapa yang ada untukmu?",
    title: "Penolong yang Tersembunyi",
    subtitle:
      "Sangat baik merawat orang lain, tapi sering lupa merawat diri sendiri.",
    description:
      "Kamu adalah orang yang selalu ada. Teman-temanmu tahu bisa mengandalkanmu. Kamu tidak keberatan membantu - bahkan kadang kamu yang pertama menawarkan bantuan sebelum diminta. Tapi di balik semua itu, ada sesuatu yang sering kamu abaikan: dirimu sendiri. Kamu tahu cara meminta bantuan untuk orang lain - tapi untuk dirimu sendiri, kata-kata itu terasa sangat sulit keluar.",
    strengths: [
      "Empati yang luar biasa dan tulus",
      "Kemampuan mendukung orang lain dengan sangat baik",
      "Koneksi sosial yang kuat karena orang merasa aman denganmu",
    ],
    challenges: [
      "Menempatkan kebutuhan orang lain jauh di atas kebutuhanmu sendiri",
      "Sulit meminta bantuan atau mengakui bahwa kamu juga butuh sesuatu",
      "Identitasmu mungkin terlalu terikat pada peran 'orang yang selalu kuat'",
    ],
    blindSpots: [
      "Kamu mungkin tidak sadar bahwa kamu juga sedang kelelahan",
      "Kamu mungkin mengira kalau kamu butuh bantuan, itu berarti kamu gagal sebagai 'penolong'",
    ],
    gentleMessage:
      "Kamu tidak bisa terus menuangkan dari cangkir yang kosong. Merawat dirimu sendiri bukan egois - itu adalah syarat agar kamu bisa terus ada untuk orang-orang yang kamu sayangi.",
    weeklyChallenge:
      "Minggu ini, izinkan dirimu meminta bantuan untuk SATU hal - sekecil apapun. Perhatikan bagaimana rasanya.",
    actionSuggestions: [
      "Latih diri untuk mengatakan 'aku juga butuh bantuan' kepada orang yang kamu percaya",
      "Tetapkan satu batas yang jelas minggu ini - dan pertahankan",
      "Pertimbangkan berbicara dengan konselor tentang pola ini",
    ],
    affirmation:
      "Kamu juga layak menerima kebaikan yang selalu kamu berikan kepada orang lain.",
    needsProfessionalNote: true,
    urgencyLevel: "suggested",
    alpacaVariant: "tired",
    accessories: ["heart_balloon", "scarf"],
    colorTheme: {
      primary: "#C0392B",
      secondary: "#E8855A",
      accent: "#FFCBA4",
      bg: "#FFF5EE",
      text: "#5C1A0A",
    },
    relatedProfiles: ["warm_hugger", "silent_fighter", "resilient_seed"],
  },
  resilient_seed: {
    type: "resilient_seed",
    tagline: "Kamu pernah jatuh - dan kamu sedang bangkit.",
    title: "Benih yang Tangguh",
    subtitle: "Perjalananmu tidak mudah, tapi kamu masih di sini.",
    description:
      "Kamu mungkin pernah melewati masa yang sangat berat. Mungkin masih dalam prosesnya sekarang. Tapi ada sesuatu yang berbeda dari sebelumnya: kamu mulai bergerak, meski pelan. Kamu mulai mencoba, meski tidak selalu berhasil. Seperti benih yang tumbuh di tanah yang keras - prosesnya tidak terlihat dari luar, tapi di dalam sedang terjadi sesuatu yang nyata dan penting.",
    strengths: [
      "Ketahanan yang terbentuk dari pengalaman nyata",
      "Sudah mulai mengembangkan beberapa strategi coping yang lebih sehat",
      "Kesadaran bahwa perubahan itu mungkin",
    ],
    challenges: [
      "Proses pemulihan tidak linear - ada kemunduran yang bisa terasa mematahkan semangat",
      "Masih ada area yang perlu dikuatkan, terutama self-compassion",
      "Butuh konsistensi dan dukungan yang berkelanjutan",
    ],
    blindSpots: [
      "Kamu mungkin terlalu fokus pada seberapa jauh yang masih harus ditempuh",
      "Kamu mungkin tidak menghargai seberapa jauh kamu sudah datang",
    ],
    gentleMessage:
      "Bangkit tidak harus dramatis. Kadang bangkit adalah bangun dari tempat tidur hari ini. Kadang bangkit adalah mencoba lagi setelah gagal kemarin. Kamu sudah melakukan itu - dan itu luar biasa.",
    weeklyChallenge:
      "Tulis tiga hal yang sudah berhasil kamu lewati dalam setahun terakhir - hal-hal yang dulu terasa mustahil. Baca ulang saat kamu merasa mundur.",
    actionSuggestions: [
      "Lanjutkan langkah-langkah kecil yang sudah kamu mulai",
      "Pertimbangkan dukungan profesional untuk menemani proses pemulihanmu",
      "Bangun sistem dukungan: minimal satu orang yang tahu perjalananmu",
    ],
    affirmation: "Setiap hari yang kamu lewati adalah bukti ketangguhanmu.",
    needsProfessionalNote: true,
    urgencyLevel: "suggested",
    alpacaVariant: "hopeful",
    accessories: ["flower_wreath", "stars_around"],
    colorTheme: {
      primary: "#6B9E7A",
      secondary: "#8FC49A",
      accent: "#C2E0C8",
      bg: "#F0FAF2",
      text: "#1E4D2B",
    },
    relatedProfiles: ["growing_butterfly", "calm_explorer", "hidden_helper"],
  },
  numb_wanderer: {
    type: "numb_wanderer",
    tagline:
      "Kamu mungkin sudah lama tidak benar-benar merasakan apapun.",
    title: "Pengembara yang Mati Rasa",
    subtitle: "Kosong bukan berarti tidak ada - kamu hanya sangat kelelahan.",
    description:
      "Ada kondisi di mana kita tidak lagi merasa sedih, tidak lagi merasa bahagia - hanya kosong. Seperti berjalan melewati hari-hari tanpa benar-benar hadir di dalamnya. Ini bukan kemalasan, bukan kelemahan karakter. Ini adalah tanda bahwa sistem emosionalmu sudah sangat kelelahan dan butuh perhatian serius. Kamu masih ada. Dan itu berarti masih ada kemungkinan untuk merasakan lagi.",
    strengths: [
      "Kamu masih berfungsi meski dalam kondisi yang sangat berat",
      "Ada bagian dari dirimu yang mencari makna - itu tidak hilang",
    ],
    challenges: [
      "Disconnected dari emosi dan dari orang-orang di sekitar",
      "Sulit menemukan motivasi untuk hal apapun",
      "Kondisi ini perlu penanganan yang lebih dari sekadar self-help",
    ],
    blindSpots: [
      "Kamu mungkin sudah terbiasa dengan rasa kosong ini sehingga tidak sadar itu tidak normal",
      "Kamu mungkin mengira tidak ada yang bisa membantu - tapi itu tidak benar",
    ],
    gentleMessage:
      "Rasa kosong yang kamu rasakan adalah sinyal, bukan identitas. Kamu bukan 'orang yang mati rasa' - kamu adalah seseorang yang butuh bantuan, dan itu sangat valid.",
    weeklyChallenge:
      "Hari ini, hubungi satu profesional kesehatan mental atau ceritakan kondisimu kepada satu orang yang kamu percaya. Hanya satu langkah itu.",
    actionSuggestions: [
      "Segera hubungi konselor atau psikolog - kondisi ini perlu perhatian profesional",
      "Into The Light Indonesia: 119 ext 8 (24 jam)",
      "Yayasan Pulih: (021) 788-42580",
      "Ceritakan kepada seseorang hari ini - siapapun yang kamu percaya",
    ],
    affirmation: "Kamu layak merasakan lagi. Dan bantuan itu ada.",
    needsProfessionalNote: true,
    urgencyLevel: "urgent",
    alpacaVariant: "empty",
    accessories: ["broken_heart"],
    colorTheme: {
      primary: "#4A5568",
      secondary: "#718096",
      accent: "#A0AEC0",
      bg: "#F7FAFC",
      text: "#1A202C",
    },
    relatedProfiles: ["cracked_light", "burnout_soul", "silent_fighter"],
  },
};
