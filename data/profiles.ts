import {
  AlpacaAccessory,
  MentalHealthProfile,
  ProfileType,
} from "@/types/game";

export const PROFILES: Record<ProfileType, MentalHealthProfile> = {
  silent_fighter: {
    type: "silent_fighter",
    title: "Pejuang Diam",
    subtitle:
      "Kamu menanggung banyak hal sendirian — dan itu sangat melelahkan.",
    description:
      "Kamu adalah seseorang yang terbiasa menyelesaikan segalanya sendiri. Bukan karena kamu tidak butuh bantuan, tapi karena entah sejak kapan, kamu belajar bahwa meminta bantuan terasa lebih berat dari menanggungnya sendiri. Di luar kamu terlihat baik-baik saja. Di dalam, ada kelelahan yang sudah lama menumpuk.",
    strengths: [
      "Kamu sangat tangguh dan mandiri",
      "Kamu jarang menyusahkan orang lain",
      "Kamu tahu cara bertahan dalam situasi sulit",
    ],
    challenges: [
      "Kamu cenderung menyimpan segalanya sendirian",
      "Sulit meminta bantuan meski sangat membutuhkannya",
      "Kelelahan emosional yang tidak disadari bisa menumpuk",
    ],
    gentleMessage:
      "Kamu tidak harus kuat setiap saat. Meminta bantuan bukan kelemahan — itu adalah salah satu bentuk keberanian yang paling nyata.",
    actionSuggestions: [
      "Coba ceritakan satu hal kecil yang kamu rasakan kepada seseorang yang kamu percaya",
      "Pertimbangkan untuk berbicara dengan konselor atau psikolog",
      "Izinkan dirimu istirahat tanpa rasa bersalah",
    ],
    needsProfessionalNote: true,
    alpacaVariant: "tired",
    colorTheme: {
      primary: "#4A6FA5",
      secondary: "#7B9EC7",
      accent: "#B8D4F0",
      bg: "#EEF4FB",
      text: "#1E3A5F",
    },
  },
  burnout_soul: {
    type: "burnout_soul",
    title: "Jiwa yang Kelelahan",
    subtitle:
      "Kamu tahu sesuatu tidak beres — dan itu sudah setengah jalan menuju pemulihan.",
    description:
      "Kamu sangat sadar dengan apa yang kamu rasakan. Kamu tahu kamu lelah, kamu tahu kamu kewalahan, kamu tahu ada yang perlu berubah. Tapi entah kenapa, menerjemahkan kesadaran itu menjadi tindakan terasa sangat berat. Kamu bukan tidak mau — kamu hanya kehabisan energi untuk memulai.",
    strengths: [
      "Kesadaran diri yang tinggi adalah kekuatan besar",
      "Kamu jujur dengan dirimu sendiri",
      "Kamu peka terhadap perasaan — milikmu dan orang lain",
    ],
    challenges: [
      "Energi emosional yang sangat terkuras",
      "Jarak antara 'tahu' dan 'melakukan' terasa sangat jauh",
      "Mudah merasa overwhelmed oleh hal-hal kecil sekalipun",
    ],
    gentleMessage:
      "Kelelahan bukan kegagalan. Kamu tidak perlu sembuh dalam semalam. Satu langkah kecil hari ini sudah lebih dari cukup.",
    actionSuggestions: [
      "Kurangi satu tanggung jawab yang bisa dikurangi minggu ini",
      "Bicara dengan profesional kesehatan mental — kamu layak mendapat ruang untuk didengar",
      "Beri dirimu izin untuk tidak produktif selama satu hari",
    ],
    needsProfessionalNote: true,
    alpacaVariant: "empty",
    colorTheme: {
      primary: "#8B7BA8",
      secondary: "#B09EC7",
      accent: "#D4C9E8",
      bg: "#F5F0FB",
      text: "#3D2B5C",
    },
  },
  growing_butterfly: {
    type: "growing_butterfly",
    title: "Kupu-kupu yang Belajar",
    subtitle: "Kamu sedang dalam proses — dan itu indah.",
    description:
      "Kamu tidak sempurna dalam menghadapi semuanya, tapi kamu mencoba. Kamu mulai belajar bahwa dirimu layak diperlakukan dengan baik — oleh orang lain, dan terutama oleh dirimu sendiri. Ada hari-hari berat, tapi ada juga hari-hari di mana kamu berhasil memilih dirimu sendiri. Itu bukan hal kecil.",
    strengths: [
      "Kamu sedang tumbuh dan itu terlihat jelas",
      "Kamu mulai bisa bersikap lebih lembut pada diri sendiri",
      "Kamu tidak menyerah meski prosesnya tidak mudah",
    ],
    challenges: [
      "Masih ada momen di mana kamu terlalu keras pada diri sendiri",
      "Kadang ragu apakah boleh meminta bantuan",
      "Perjalanan pertumbuhan bisa terasa lambat dan melelahkan",
    ],
    gentleMessage:
      "Kamu tidak harus sudah 'sembuh' untuk layak dicintai dan dihargai. Proses tumbuh itu sendiri adalah pencapaian.",
    actionSuggestions: [
      "Rayakan kemajuan kecil yang sering kamu abaikan",
      "Lanjutkan kebiasaan self-care yang sudah mulai kamu bangun",
      "Pertimbangkan journaling untuk melacak pertumbuhanmu",
    ],
    needsProfessionalNote: false,
    alpacaVariant: "hopeful",
    colorTheme: {
      primary: "#E8855A",
      secondary: "#F4A636",
      accent: "#FFD166",
      bg: "#FFF8EE",
      text: "#5C2E0A",
    },
  },
  warm_hugger: {
    type: "warm_hugger",
    title: "Pelukan Hangat",
    subtitle:
      "Kamu adalah sumber kehangatan — untuk orang lain dan dirimu sendiri.",
    description:
      "Kamu tahu cara terhubung dengan orang lain, dan kamu juga tahu cara merawat dirimu sendiri. Kamu tidak sempurna, tapi kamu punya fondasi emosional yang kuat. Orang-orang di sekitarmu mungkin sering merasa nyaman bersamamu — karena kamu memang memancarkan kehangatan yang tulus.",
    strengths: [
      "Kemampuan berkoneksi yang luar biasa",
      "Self-compassion yang sehat dan nyata",
      "Kamu tahu kapan harus meminta bantuan",
    ],
    challenges: [
      "Kadang terlalu fokus pada orang lain hingga lupa diri sendiri",
      "Perlu menjaga agar kehangatan yang kamu beri tidak menguras dirimu",
    ],
    gentleMessage:
      "Terus jaga dirimu sebaik kamu menjaga orang lain. Kamu juga layak menerima pelukan yang selalu kamu berikan.",
    actionSuggestions: [
      "Pastikan kamu punya waktu untuk dirimu sendiri di tengah kesibukanmu",
      "Terus pertahankan koneksi sosial yang sehat",
      "Sesekali periksa: apakah kamu memberi terlalu banyak?",
    ],
    needsProfessionalNote: false,
    alpacaVariant: "happy",
    colorTheme: {
      primary: "#F4A636",
      secondary: "#FFD166",
      accent: "#FFE8A0",
      bg: "#FFFBEE",
      text: "#5C3A00",
    },
  },
  calm_explorer: {
    type: "calm_explorer",
    title: "Penjelajah Tenang",
    subtitle: "Kamu sedang menemukan ritme hidupmu sendiri.",
    description:
      "Kamu cukup seimbang dalam menghadapi kehidupan. Tidak selalu sempurna, tapi kamu punya cara-cara yang cukup sehat untuk menghadapi tantangan. Kamu penasaran dengan dirimu sendiri dan dunia di sekitarmu, dan itu adalah kualitas yang indah untuk terus dikembangkan.",
    strengths: [
      "Keseimbangan emosional yang cukup stabil",
      "Kemampuan adaptasi yang baik",
      "Rasa ingin tahu yang sehat tentang diri sendiri",
    ],
    challenges: [
      "Mungkin belum menemukan area yang perlu lebih diperhatikan",
      "Keseimbangan yang ada perlu terus dijaga secara aktif",
    ],
    gentleMessage:
      "Terus jelajahi dirimu dengan rasa ingin tahu, bukan penghakiman. Setiap penemuan tentang dirimu adalah hadiah.",
    actionSuggestions: [
      "Lanjutkan kebiasaan sehat yang sudah kamu miliki",
      "Coba eksplorasi praktik mindfulness atau meditasi",
      "Sesekali check-in dengan dirimu sendiri: bagaimana perasaanmu hari ini?",
    ],
    needsProfessionalNote: false,
    alpacaVariant: "peaceful",
    colorTheme: {
      primary: "#6B9E7A",
      secondary: "#8FC49A",
      accent: "#C2E0C8",
      bg: "#F0FAF2",
      text: "#1E4D2B",
    },
  },
  cracked_light: {
    type: "cracked_light",
    title: "Cahaya yang Retak",
    subtitle:
      "Di balik retakan itu, masih ada cahaya — dan kamu tidak harus sendirian.",
    description:
      "Saat ini mungkin terasa sangat berat. Kamu mungkin sudah lama berjalan dengan beban yang terlalu besar, tanpa cukup ruang untuk bernapas. Perasaan kosong, mati rasa, atau kewalahan yang kamu rasakan adalah sinyal penting yang perlu didengarkan — bukan diabaikan.",
    strengths: [
      "Kamu masih di sini, dan itu berarti kamu masih berjuang",
      "Ada bagian dari dirimu yang mencari jalan keluar — itu kekuatan",
    ],
    challenges: [
      "Kelelahan emosional yang sangat dalam",
      "Kesulitan mengenali atau mengekspresikan perasaan",
      "Perlu dukungan yang lebih dari sekadar self-help",
    ],
    gentleMessage:
      "Kamu tidak harus menanggung ini sendirian. Ada orang yang terlatih untuk membantu, dan mencari bantuan adalah tindakan paling berani yang bisa kamu lakukan sekarang.",
    actionSuggestions: [
      "Hubungi konselor atau psikolog sesegera mungkin",
      "Ceritakan perasaanmu kepada seseorang yang kamu percaya hari ini",
      "Jika kamu merasa sangat tidak aman, hubungi Into The Light Indonesia: 119 ext 8",
    ],
    needsProfessionalNote: true,
    alpacaVariant: "sad",
    colorTheme: {
      primary: "#2D4A7A",
      secondary: "#4A6FA5",
      accent: "#8AAFD4",
      bg: "#EEF4FB",
      text: "#0A1E3D",
    },
  },
};

export const PROFILE_ACCESSORIES: Record<ProfileType, AlpacaAccessory[]> = {
  silent_fighter: ["scarf"],
  burnout_soul: ["broken_heart"],
  growing_butterfly: ["flower_wreath"],
  warm_hugger: ["heart_balloon"],
  calm_explorer: ["backpack", "stars_around"],
  cracked_light: ["broken_heart", "scarf"],
};
