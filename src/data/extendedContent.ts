import type {
  EvaluationTopicId,
  InclusiveAccommodationOption,
  InclusiveNeedGuide,
  TieredQuestion,
} from '../types/diferensa';

export interface FormatOptionDetail {
  id: string;
  label: string;
  summary: string;
  sdExample: string;
}

export const KONTEN_FORMAT_OPTIONS: FormatOptionDetail[] = [
  {
    id: 'teks',
    label: 'Materi berupa teks atau bacaan',
    summary:
      'Teks bacaan disusun bertingkat (kalimat pendek berilustrasi hingga bacaan pengayaan) dengan kosakata yang akrab bagi siswa SD.',
    sdExample: 'Kelas 2 SD Bahasa Indonesia: Fabel dalam 3 versi panjang paragraf.',
  },
  {
    id: 'gambar',
    label: 'Materi berupa gambar dan infografis',
    summary:
      'Diagram alur berwarna, kartu gambar berseri, dan peta visual membantu siswa menangkap inti konsep dalam sekali pandang.',
    sdExample: 'Kelas 4 SD IPAS: Poster tahapan metamorfosis kupu-kupu berlabel jelas.',
  },
  {
    id: 'video',
    label: 'Materi berupa video pembelajaran',
    summary:
      'Video animasi atau demonstrasi berdurasi 2–4 menit dilengkapi teks penjelas agar siswa dapat memutar ulang bagian penting.',
    sdExample: 'Kelas 5 SD Matematika: Video singkat pembuktian volume kubus satuan.',
  },
  {
    id: 'audio',
    label: 'Materi berupa audio atau penjelasan suara',
    summary:
      'Rekaman suara guru yang ramah anak, lagu pengingat konsep, atau cerita lisan bagi siswa dengan kekuatan auditori dan pembaca pemula.',
    sdExample: 'Kelas 1 SD: Rekaman cerita suku kata yang dapat diputar di pojok dengar.',
  },
  {
    id: 'kompleksitas',
    label: 'Materi dengan tingkat kompleksitas yang dapat disesuaikan',
    summary:
      'Materi inti yang sama dikemas dalam tingkat tantangan bertahap: konsep dasar konkret, latihan terstruktur, hingga pengayaan analitis.',
    sdExample: 'Kelas 3 SD Matematika: Soal penjumlahan dengan balok satuan hingga soal cerita.',
  },
];

export const PROSES_ACTIVITY_OPTIONS: FormatOptionDetail[] = [
  {
    id: 'individu',
    label: 'Belajar secara individu',
    summary:
      'Siswa berlatih mandiri sesuai tempo masing-masing menggunakan lembar panduan langkah demi langkah atau kartu tantangan pribadi.',
    sdExample: 'Membaca senyap teks berjenjang selama 10 menit sesuai pilihan kartu level.',
  },
  {
    id: 'kelompok',
    label: 'Belajar secara berkelompok',
    summary:
      'Kelompok kecil dinamis (3–4 siswa) saling membantu memahami konsep dengan pembagian peran jelas seperti pembaca, pencatat, dan penyaji.',
    sdExample: 'Kelompok eksplorasi sifat magnet menggunakan benda sekitar kelas.',
  },
  {
    id: 'diskusi',
    label: 'Diskusi dan tanya jawab',
    summary:
      'Diskusi berpasangan (Think-Pair-Share) atau tanya jawab terbimbing agar siswa berani mengemukakan alasan dengan bahasanya sendiri.',
    sdExample: 'Berpasangan mendiskusikan mengapa pecahan 1/2 dan 2/4 bernilai sama.',
  },
  {
    id: 'eksperimen',
    label: 'Praktik atau eksperimen sederhana',
    summary:
      'Aktivitas menyentuh dan mencoba langsung benda konkret untuk membuktikan konsep sains maupun matematika secara nyata.',
    sdExample: 'Percobaan perubahan wujud es batu dan pengamatan dengan kaca pembesar.',
  },
  {
    id: 'permainan',
    label: 'Permainan edukatif',
    summary:
      'Kartu pencocokan konsep, ular tangga berhitung, atau kuis papan kelompok yang membuat anak SD antusias tanpa merasa tertekan.',
    sdExample: 'Permainan kartu domino pecahan senilai atau tebak kata baku.',
  },
  {
    id: 'media-interaktif',
    label: 'Kegiatan menggunakan media interaktif',
    summary:
      'Memanfaatkan simulasi digital, papan geser interaktif, atau kuis visual di tablet kelas secara bergilir pada stasiun belajar.',
    sdExample: 'Stasiun tablet untuk menyusun simulasi rantai makanan sawah.',
  },
];

export const PRODUK_OUTPUT_OPTIONS: FormatOptionDetail[] = [
  {
    id: 'poster',
    label: 'Poster atau gambar',
    summary:
      'Karya visual berisi ringkasan gagasan pokok, ilustrasi berlabel, dan alur konsep menggunakan kertas gambar atau kanvas mini.',
    sdExample: 'Poster kampanye hemat air bersih di lingkungan sekolah SD.',
  },
  {
    id: 'presentasi',
    label: 'Presentasi sederhana',
    summary:
      'Penjelasan lisan 2–3 menit di depan kelompok kecil atau kelas menggunakan kartu pengingat atau papan kecil.',
    sdExample: 'Presentasi berpasangan tentang keberagaman rumah adat Nusantara.',
  },
  {
    id: 'peta-konsep',
    label: 'Peta konsep',
    summary:
      'Diagram cabang berwarna yang menghubungkan ide utama, sub-topik, dan contoh nyata secara logis.',
    sdExample: 'Peta konsep bagian tumbuhan beserta fungsinya untuk kelas 4 SD.',
  },
  {
    id: 'maket',
    label: 'Maket atau model sederhana',
    summary:
      'Model 3 dimensi dari bahan ramah anak (kardus bekas, plastisin, stik es krim) untuk memperagakan struktur atau proses.',
    sdExample: 'Maket tata surya sederhana atau model rumah ramah lingkungan.',
  },
  {
    id: 'laporan',
    label: 'Laporan tertulis',
    summary:
      'Tulisan terstruktur dengan templat panduan kalimat (untuk kelompok bimbingan) hingga paragraf analitis mandiri.',
    sdExample: 'Laporan hasil pengamatan pertumbuhan kecambah selama 5 hari.',
  },
  {
    id: 'video-audio',
    label: 'Video atau rekaman penjelasan',
    summary:
      'Rekaman suara atau video pendek 1–2 menit saat siswa memperagakan atau menceritakan kembali konsep yang dipahami.',
    sdExample: 'Rekaman penjelasan cara menghitung keliling meja kelas dengan penggaris.',
  },
];

export const INCLUSIVE_PILLARS: {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
}[] = [
  {
    id: 'pengertian',
    title: '1. Pengertian Pembelajaran Inklusif',
    summary:
      'Pembelajaran inklusif memastikan setiap anak—termasuk anak berkebutuhan khusus maupun anak dengan kecepatan belajar berbeda—belajar bersama dalam satu lingkungan kelas yang ramah, setara, dan bermartabat tanpa diskriminasi.',
    highlights: [
      'Menghargai setiap anak sebagai bagian utuh dari komunitas kelas.',
      'Menghilangkan hambatan akses belajar, bukan memisahkan siswa.',
    ],
  },
  {
    id: 'prinsip',
    title: '2. Prinsip Pembelajaran Inklusif',
    summary:
      'Setiap siswa berhak memperoleh tujuan pembelajaran bermakna dengan dukungan akomodasi yang layak, ekspektasi positif, serta kolaborasi hangat antara guru, teman sebaya, dan orang tua.',
    highlights: [
      'Kesetaraan akses dan partisipasi aktif untuk semua murid.',
      'Fleksibilitas cara penyampaian dan cara menunjukkan pemahaman.',
    ],
  },
  {
    id: 'keberagaman',
    title: '3. Mengenali Keberagaman Kebutuhan Belajar',
    summary:
      'Kebutuhan belajar anak SD sangat luas: perbedaan penglihatan, pendengaran, mobilitas fisik, kesulitan memproses teks bacaan, hingga kebutuhan pengaturan fokus dan emosi selama aktivitas kelas.',
    highlights: [
      'Amati cara siswa merespons instruksi visual, suara, maupun gerak.',
      'Fokus pada kekuatan yang dimiliki anak, bukan kekurangannya.',
    ],
  },
  {
    id: 'strategi',
    title: '4. Strategi Mengajar yang Inklusif',
    summary:
      'Terapkan prinsip Universal Design for Learning (UDL): beri banyak cara menyajikan informasi, banyak cara berlatih bersama teman sebaya, dan banyak cara menunjukkan hasil belajar.',
    highlights: [
      'Gunakan instruksi singkat bertahap (1 langkah per instruksi).',
      'Budayakan sistem teman pendamping (buddy system) yang saling menghargai.',
    ],
  },
  {
    id: 'penyesuaian',
    title: '5. Penyesuaian Materi, Aktivitas, Media & Evaluasi',
    summary:
      'Penyesuaian (akomodasi) dilakukan pada format teks/audio, tata letak meja kelas, alat bantu visual atau taktil, serta variasi bentuk evaluasi tanpa menurunkan esensi kompetensi inti.',
    highlights: [
      'Perbesar huruf bacaan, tambah keterangan gambar, atau beri subtitle video.',
      'Sediakan waktu fleksibel dan pilihan menjawab lisan, gambar, atau tulisan.',
    ],
  },
  {
    id: 'contoh-sd',
    title: '6. Contoh Penerapan Nyata di Sekolah Dasar',
    summary:
      'Dalam pelajaran IPAS Kelas 4 tentang Panca Indera, guru memutar video bersubtitle, menyediakan kartu timbul/gambar kontras tinggi, mengatur lorong kursi roda yang lega, dan memberi pilihan jawaban lisan atau kartu tempel.',
    highlights: [
      'Semua anak duduk dalam kelompok meja yang sama dan saling berkontribusi.',
      'Evaluasi mengukur konsep yang sama dengan cara respons yang ramah bagi tiap anak.',
    ],
  },
];

export const INCLUSIVE_NEED_GUIDES: InclusiveNeedGuide[] = [
  {
    id: 'penglihatan',
    title: 'Siswa dengan Hambatan Penglihatan',
    shortDesc: 'Membutuhkan akses non-visual, ukuran huruf besar, kontras tinggi, atau media taktil.',
    classroomExample:
      'Siswa low vision atau tunanetra di kelas 3 SD tetap mengikuti pelajaran bangun datar bersama kelompoknya.',
    materialAdjustment:
      'Sediakan lembar kerja berhuruf besar (minimal 18pt) dengan kontras tinggi atau deskripsi audio yang jelas.',
    activityAdjustment:
      'Gunakan benda konkret bertekstur (balok kayu, kertas timbul) dan deskripsikan secara lisan setiap tulisan di papan tulis.',
    mediaAdjustment:
      'Audio penjelasan guru, kartu timbul/Braille, serta posisi duduk dekat pencahayaan optimal tanpa silau.',
    evaluationAdjustment:
      'Izinkan siswa menjawab soal secara lisan, rekaman audio, atau peragaan benda konkret tanpa batas waktu kaku.',
  },
  {
    id: 'pendengaran',
    title: 'Siswa dengan Hambatan Pendengaran',
    shortDesc: 'Membutuhkan dukungan visual kuat, teks tertulis jelas, dan posisi tatap muka guru.',
    classroomExample:
      'Siswa pengguna alat bantu dengar di kelas 4 SD aktif mengikuti diskusi kelompok IPA.',
    materialAdjustment:
      'Lengkapi setiap penjelasan lisan dengan ringkasan poin tertulis dan gambar berlabel jelas.',
    activityAdjustment:
      'Guru berbicara menghadap siswa dengan artikulasi jelas (tidak membelakangi saat menulis) serta memberi isyarat visual saat ganti kegiatan.',
    mediaAdjustment:
      'Video pembelajaran wajib memiliki subtitle/teks keterangan, kartu langkah bergambar, dan papan kata kunci.',
    evaluationAdjustment:
      'Berikan soal tertulis sederhana dengan contoh visual atau pilihan mencocokkan gambar dan tulisan.',
  },
  {
    id: 'mobilitas',
    title: 'Siswa dengan Hambatan Mobilitas',
    shortDesc: 'Membutuhkan ruang gerak aman, akses meja terjangkau, dan adaptasi tugas motorik.',
    classroomExample:
      'Siswa pengguna kursi roda di kelas 5 SD berpartisipasi penuh dalam kegiatan stasiun belajar.',
    materialAdjustment:
      'Materi disiapkan dalam format ringkas yang mudah diletakkan di meja ergonomis atau perangkat tablet.',
    activityAdjustment:
      'Atur jarak antarmeja minimal 90 cm agar kursi roda leluasa, atau bawa bahan stasiun belajar ke meja kelompok siswa.',
    mediaAdjustment:
      'Papan jepit kertas, alat tulis pegangan besar, atau media digital sentuh yang tidak menuntut perpindahan fisik terus-menerus.',
    evaluationAdjustment:
      'Fokus menilai pemahaman konsep melalui pilihan jawaban klik, lisan, atau kerja kolaboratif tanpa menghukum keterbatasan gerak.',
  },
  {
    id: 'membaca',
    title: 'Kesulitan Membaca & Memahami Informasi',
    shortDesc: 'Membutuhkan kalimat pendek, spasi lega, ikon penanda, serta bantuan audio.',
    classroomExample:
      'Siswa dengan ciri disleksia atau keterlambatan literasi di kelas 3 SD mengerjakan soal cerita.',
    materialAdjustment:
      'Pecah paragraf panjang menjadi poin pendek bernomor, gunakan font tanpa kait yang bersih dan spasi baris 1.6.',
    activityAdjustment:
      'Bacakan instruksi tugas perlahan bersama-sama sebelum kelompok mulai bekerja.',
    mediaAdjustment:
      'Kombinasikan teks pendek dengan audio pendamping dan penggaris penanda baris baca.',
    evaluationAdjustment:
      'Berikan waktu pengerjaan lebih fleksibel, opsi mendengarkan soal via audio, serta pilihan menjawab lisan atau gambar.',
  },
  {
    id: 'konsentrasi',
    title: 'Bantuan Konsentrasi & Pengaturan Belajar',
    shortDesc: 'Membutuhkan instruksi bertahap, target pendek terukur, dan jeda aktivitas terstruktur.',
    classroomExample:
      'Siswa yang mudah teralihkan fokusnya di kelas 2 SD tetap tuntas menyelesaikan 3 bagian tugas.',
    materialAdjustment:
      'Sajikan tugas dalam kartu-kartu mini (1 soal/tugas per kartu) agar tidak terasa menumpuk sekaligus.',
    activityAdjustment:
      'Berikan instruksi satu per satu, gunakan pengatur waktu visual, dan sediakan tugas bergerak positif (seperti membagikan kartu).',
    mediaAdjustment:
      'Checklist langkah belajar yang bisa dicentang anak setiap selesai 1 langkah kecil.',
    evaluationAdjustment:
      'Izinkan jeda singkat antarbagian evaluasi, waktu fleksibel, serta tempat duduk tenang jauh dari sumber gangguan.',
  },
];

export const INCLUSIVE_ACCOMMODATIONS: InclusiveAccommodationOption[] = [
  {
    id: 'acc-font',
    label: 'Teks mudah dibaca & ukuran huruf diperbesar',
    description: 'Menggunakan kalimat pendek, kontras tinggi, spasi lega, dan opsi perbesar huruf.',
  },
  {
    id: 'acc-audio',
    label: 'Audio untuk membantu memahami materi',
    description: 'Menyediakan pemutar narasi suara untuk membacakan materi dan soal secara jelas.',
  },
  {
    id: 'acc-subtitle',
    label: 'Video yang dilengkapi teks atau subtitle',
    description: 'Setiap video pembelajaran disertai takarir teks agar ramah bagi hambatan dengar.',
  },
  {
    id: 'acc-visual-label',
    label: 'Gambar dengan keterangan yang jelas',
    description: 'Menambahkan label singkat dan deskripsi alt yang mudah dimengerti pada ilustrasi.',
  },
  {
    id: 'acc-step-instruction',
    label: 'Instruksi sederhana dan bertahap',
    description: 'Memecah tugas kompleks menjadi Langkah 1, Langkah 2, Langkah 3 yang ringkas.',
  },
  {
    id: 'acc-flex-time',
    label: 'Waktu pengerjaan yang fleksibel',
    description: 'Menghilangkan tekanan hitung mundur agar siswa bekerja sesuai tempo masing-masing.',
  },
  {
    id: 'acc-eval-choice',
    label: 'Pilihan cara menjawab evaluasi',
    description: 'Siswa dapat memilih menjawab via pilihan klik, rekaman/lisan, atau penjelasan singkat.',
  },
];

export const EVALUATION_TOPICS: {
  id: EvaluationTopicId;
  title: string;
  shortDesc: string;
  targetRoute: 'diferensiasi-konten' | 'diferensiasi-proses' | 'diferensiasi-produk' | 'pembelajaran-inklusif' | 'materi-pembelajaran';
}[] = [
  {
    id: 'diferensiasi-konten',
    title: 'Diferensiasi Konten',
    shortDesc: 'Variasi sumber, format media, dan tingkat kompleksitas materi.',
    targetRoute: 'diferensiasi-konten',
  },
  {
    id: 'diferensiasi-proses',
    title: 'Diferensiasi Proses',
    shortDesc: 'Strategi aktivitas kelas, stasiun belajar, dan pendampingan siswa.',
    targetRoute: 'diferensiasi-proses',
  },
  {
    id: 'diferensiasi-produk',
    title: 'Diferensiasi Produk',
    shortDesc: 'Pilihan bentuk hasil karya siswa dan rubrik penilaian adil.',
    targetRoute: 'diferensiasi-produk',
  },
  {
    id: 'pembelajaran-inklusif',
    title: 'Pembelajaran Inklusif',
    shortDesc: 'Akomodasi keberagaman kebutuhan dan akses belajar setara di SD.',
    targetRoute: 'pembelajaran-inklusif',
  },
  {
    id: 'konsep-umum',
    title: 'Konsep Umum Diferensiasi',
    shortDesc: 'Prinsip inti, asesmen diagnostik, dan pengelompokan fleksibel.',
    targetRoute: 'materi-pembelajaran',
  },
];

export const LEVEL_METADATA: Record<
  1 | 2 | 3,
  {
    title: string;
    indicatorLabel: string;
    description: string;
  }
> = {
  1: {
    title: 'Level 1 – Dasar',
    indicatorLabel: 'Pemahaman Dasar',
    description:
      'Mengukur pemahaman konsep dasar melalui pilihan ganda, benar atau salah, serta mencocokkan gambar dan konsep.',
  },
  2: {
    title: 'Level 2 – Menengah',
    indicatorLabel: 'Penerapan Konsep',
    description:
      'Mengukur kemampuan menerapkan konsep pada contoh kasus nyata di ruang kelas SD sehari-hari.',
  },
  3: {
    title: 'Level 3 – Lanjutan',
    indicatorLabel: 'Analisis dan Pemecahan Masalah',
    description:
      'Mengukur analisis strategi dan pemecahan masalah pada situasi kelas baru beserta alasan pedagogisnya.',
  },
};

export const TIERED_EVALUATION_QUESTIONS: TieredQuestion[] = [
  // ==================== 1. DIFERENSIASI KONTEN ====================
  {
    id: 'k-l1-1',
    topicId: 'diferensiasi-konten',
    level: 1,
    kind: 'mcq',
    prompt: 'Apa yang dimaksud dengan diferensiasi konten dalam pembelajaran di SD?',
    stepHint: 'Ingat kata kunci: "Konten" merujuk pada materi atau sumber belajar yang diterima siswa.',
    options: [
      'Menyesuaikan materi atau sumber belajar sesuai kesiapan, minat, dan kebutuhan siswa',
      'Mengganti jadwal jam pulang sekolah untuk setiap kelompok siswa',
      'Memberikan hukuman tugas menyalin halaman buku yang sama',
    ],
    correctIndex: 0,
    explanation:
      'Diferensiasi konten berfokus pada penyesuaian apa yang dipelajari siswa—mulai dari format media (teks, gambar, video, audio) hingga tingkat kompleksitas bacaan.',
  },
  {
    id: 'k-l1-2',
    topicId: 'diferensiasi-konten',
    level: 1,
    kind: 'true-false',
    prompt:
      'Benar atau Salah: Guru boleh menyajikan materi yang sama dalam bentuk teks bacaan bertingkat dan rekaman audio bagi siswa yang belum lancar membaca.',
    stepHint: 'Pikirkan apakah perbedaan media membantu anak mencapai tujuan yang sama.',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation:
      'Benar. Menyediakan teks bertingkat dan audio membantu siswa dengan tingkat kelancaran baca berbeda tetap memahami inti pelajaran.',
  },
  {
    id: 'k-l1-3',
    topicId: 'diferensiasi-konten',
    level: 1,
    kind: 'image-match',
    prompt: 'Cocokkan ikon media penyajian materi berikut dengan kegunaannya di kelas SD:',
    stepHint: 'Perhatikan simbol telinga/audio, buku teks, dan bagan infografis.',
    matchItems: [
      {
        id: 'km-1',
        visualLabel: 'Headphone & Rekaman Suara',
        iconKey: 'headphones',
        targetConcept: 'Membantu siswa auditori dan pembaca pemula menyimak penjelasan',
      },
      {
        id: 'km-2',
        visualLabel: 'Buku Bacaan Bertingkat',
        iconKey: 'book',
        targetConcept: 'Menyesuaikan panjang kalimat dengan kesiapan literasi siswa',
      },
      {
        id: 'km-3',
        visualLabel: 'Infografis & Gambar Berlabel',
        iconKey: 'chart',
        targetConcept: 'Mempermudah siswa visual menangkap alur konsep dalam sekali lihat',
      },
    ],
    correctMatchMap: {
      'km-1': 'Membantu siswa auditori dan pembaca pemula menyimak penjelasan',
      'km-2': 'Menyesuaikan panjang kalimat dengan kesiapan literasi siswa',
      'km-3': 'Mempermudah siswa visual menangkap alur konsep dalam sekali lihat',
    },
    explanation:
      'Memadukan audio, teks bertingkat, dan infografis berlabel memastikan setiap karakteristik belajar murid terlayani.',
  },
  {
    id: 'k-l2-1',
    topicId: 'diferensiasi-konten',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Bu Ani mengajar IPAS Kelas 4 materi Metamorfosis Hewan. Ada 6 siswa yang masih lambat membaca teks panjang, 15 siswa suka gambar alur, dan 7 siswa gemar membaca ensiklopedia mini.',
    prompt: 'Tindakan diferensiasi konten manakah yang paling tepat dilakukan Bu Ani?',
    stepHint: 'Pilih strategi yang langsung menyesuaikan ragam sumber materi untuk ketiga kelompok.',
    options: [
      'Menyediakan kartu gambar berlabel + audio singkat, bagan infografis kelas, dan artikel pengayaan singkat',
      'Menyuruh 6 siswa yang lambat membaca keluar kelas untuk berlatih mengeja',
      'Hanya memakai satu buku paket teks penuh tanpa gambar untuk semua siswa',
    ],
    correctIndex: 0,
    explanation:
      'Menyediakan kartu bergambar + audio, infografis, dan teks pengayaan membuat seluruh 28 siswa mempelajari konsep metamorfosis melalui pintu masuk yang tepat.',
  },
  {
    id: 'k-l2-2',
    topicId: 'diferensiasi-konten',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Pada pelajaran Matematika Kelas 3 tentang Satuan Berat, sebagian siswa belum paham perbedaan gram dan kilogram, sementara sebagian lain sudah mahir mengonversi keduanya.',
    prompt: 'Bagaimana cara membedakan kompleksitas kontennya secara adil?',
    stepHint: 'Gunakan materi konkret untuk pemahaman dasar dan tantangan kontekstual bagi kelompok siap.',
    options: [
      'Kelompok dasar memakai kartu gambar timbangan nyata, kelompok siap memakai tabel konversi dan soal cerita pasar',
      'Menghapus materi kilogram bagi kelompok dasar agar tidak perlu belajar satuan berat',
      'Memberikan 50 soal hitungan identik agar semuanya sibuk',
    ],
    correctIndex: 0,
    explanation:
      'Penyesuaian kompleksitas konten tetap mengarah pada pemahaman satuan berat, dengan media konkret sebagai jembatan bagi siswa yang masih memerlukan penguatan.',
  },
  {
    id: 'k-l3-1',
    topicId: 'diferensiasi-konten',
    level: 3,
    kind: 'problem-solve',
    scenarioContext:
      'Anda baru dipindahkan mengajar Kelas 5 SD di sekolah dengan keterbatasan proyektor. Di kelas ada siswa yang mudah bosan dengan teks panjang, ada yang penglihatannya agak kabur, dan ada siswa cepat paham.',
    prompt:
      'Solusi diferensiasi konten apa yang paling realistis dan efektif tanpa bergantung pada proyektor?',
    stepHint: 'Pertimbangkan media cetak berhuruf besar, alat bantu benda sekitar, dan kartu baca bertingkat.',
    options: [
      'Menyiapkan 3 set kartu materi meja: kartu teks berhuruf besar & kontras tinggi, kartu diagram gambar tangan, dan lembar tantangan pengayaan',
      'Membacakan seluruh buku paket dengan cepat tanpa menyiapkan media apa pun',
      'Menunda pembelajaran selama satu semester sampai proyektor tersedia',
    ],
    correctIndex: 0,
    reasonPrompt: 'Tuliskan atau pilih alasan singkat mengapa solusi tersebut efektif di kelas:',
    reasonKeywords: ['kontras', 'huruf besar', 'media', 'kebutuhan', 'mandiri', 'visual'],
    explanation:
      'Kartu materi cetak bertingkat dengan huruf besar dan diagram tidak membutuhkan proyektor, ramah penglihatan, dan langsung mengakomodasi variasi kesiapan belajar.',
  },

  // ==================== 2. DIFERENSIASI PROSES ====================
  {
    id: 'p-l1-1',
    topicId: 'diferensiasi-proses',
    level: 1,
    kind: 'mcq',
    prompt: 'Diferensiasi proses berfokus pada penyesuaian...',
    stepHint: 'Kata "Proses" berkaitan dengan kegiatan atau cara siswa mengolah materi.',
    options: [
      'Cara dan aktivitas siswa dalam memahami materi pembelajaran',
      'Harga buku tulis yang dibeli orang tua siswa',
      'Warna seragam sekolah yang dipakai saat praktik',
    ],
    correctIndex: 0,
    explanation:
      'Diferensiasi proses menyesuaikan aktivitas belajar (individu, kelompok, diskusi, eksperimen, permainan, media interaktif) agar siswa memahami konsep secara bermakna.',
  },
  {
    id: 'p-l1-2',
    topicId: 'diferensiasi-proses',
    level: 1,
    kind: 'true-false',
    prompt:
      'Benar atau Salah: Menggunakan permainan edukatif dan eksperimen sederhana di meja kelompok termasuk contoh diferensiasi proses.',
    stepHint: 'Apakah permainan dan eksperimen merupakan cara siswa memproses pemahaman?',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation:
      'Benar! Permainan edukatif dan eksperimen sederhana adalah ragam aktivitas proses untuk membantu siswa membangun pemahaman.',
  },
  {
    id: 'p-l1-3',
    topicId: 'diferensiasi-proses',
    level: 1,
    kind: 'image-match',
    prompt: 'Pasangkan bentuk aktivitas proses belajar berikut dengan tujuan pedagogisnya:',
    stepHint: 'Hubungkan aktivitas dengan manfaatnya bagi cara belajar anak SD.',
    matchItems: [
      {
        id: 'pm-1',
        visualLabel: 'Permainan Kartu Edukatif',
        iconKey: 'puzzle',
        targetConcept: 'Melatih penguasaan konsep secara menyenangkan tanpa tekanan',
      },
      {
        id: 'pm-2',
        visualLabel: 'Diskusi & Tanya Jawab Terbimbing',
        iconKey: 'book',
        targetConcept: 'Mendorong siswa bertukar gagasan dan menalar bersama teman',
      },
      {
        id: 'pm-3',
        visualLabel: 'Praktik / Eksperimen Sederhana',
        iconKey: 'chart',
        targetConcept: 'Membuktikan konsep secara nyata melalui pengamatan langsung',
      },
    ],
    correctMatchMap: {
      'pm-1': 'Melatih penguasaan konsep secara menyenangkan tanpa tekanan',
      'pm-2': 'Mendorong siswa bertukar gagasan dan menalar bersama teman',
      'pm-3': 'Membuktikan konsep secara nyata melalui pengamatan langsung',
    },
    explanation:
      'Variasi aktivitas membuat proses pengolahan informasi cocok untuk anak yang aktif bergerak, gemar berdiskusi, maupun suka belajar lewat permainan.',
  },
  {
    id: 'p-l2-1',
    topicId: 'diferensiasi-proses',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Saat mempelajari perkalian di Kelas 2 SD, 8 siswa cepat bosan jika hanya mengerjakan soal tulis, sementara 7 siswa lain masih ragu menghitung penjumlahan berulang.',
    prompt: 'Bagaimana penataan proses pembelajaran yang paling tepat?',
    stepHint: 'Gunakan stasiun belajar atau pendampingan terfokus (scaffolding) sesuai kesiapan.',
    options: [
      'Membuka stasiun permainan kartu perkalian untuk kelompok siap sambil guru mendampingi kelompok ragu memakai stik es krim',
      'Melarang semua siswa berbicara selama 60 menit penuh',
      'Memberikan tugas menyalin tabel perkalian 1 sampai 10 sebanyak lima kali',
    ],
    correctIndex: 0,
    explanation:
      'Stasiun permainan menjaga motivasi siswa yang sudah siap, sementara pendampingan dengan stik es krim membantu kelompok yang masih membutuhkan jembatan konkret.',
  },
  {
    id: 'p-l2-2',
    topicId: 'diferensiasi-proses',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Dalam diskusi kelompok Bahasa Indonesia Kelas 5, ada 2 siswa pemalu yang jarang bicara di kelompok besar (6–8 orang).',
    prompt: 'Penyesuaian proses apa yang membantu siswa pemalu tersebut ikut aktif?',
    stepHint: 'Ukuran kelompok dan peran yang jelas memengaruhi keberanian anak SD.',
    options: [
      'Mengubah menjadi diskusi berpasangan (2 orang) dengan kartu giliran bicara bergantian',
      'Membiarkan siswa pemalu hanya mencatat tanpa perlu berpendapat',
      'Menunjuk mereka berbicara mendadak di depan seluruh kelas sebagai hukuman',
    ],
    correctIndex: 0,
    explanation:
      'Diskusi berpasangan memberi ruang aman bagi anak pemalu untuk melatih kepercayaan diri sebelum berbagi di kelompok lebih besar.',
  },
  {
    id: 'p-l3-1',
    topicId: 'diferensiasi-proses',
    level: 3,
    kind: 'problem-solve',
    scenarioContext:
      'Saat Anda membimbing 6 siswa yang butuh bantuan khusus di sudut kelas, 20 siswa lainnya mulai ribut dan berkali-kali mendatangi meja Anda untuk bertanya langkah selanjutnya.',
    prompt: 'Strategi manajemen proses apa yang memecahkan masalah kelas tersebut secara berkelanjutan?',
    stepHint: 'Bangun kemandirian kelompok lain melalui instruksi visual bertahap dan tutor sebaya.',
    options: [
      'Menaruh kartu langkah kerja bergambar di tiap meja, menerapkan aturan "Tanya 2 Teman Sebelum Tanya Guru", dan memakai timer visual',
      'Menghentikan pendampingan kelompok kecil selamanya agar semua duduk diam',
      'Memberi nilai pengurangan setiap kali ada siswa yang bertanya',
    ],
    correctIndex: 0,
    reasonPrompt: 'Mengapa langkah tersebut efektif menjaga kelancaran diferensiasi proses?',
    reasonKeywords: ['mandiri', 'instruksi', 'timer', 'teman', 'tertib', 'pendampingan'],
    explanation:
      'Instruksi visual di meja dan kesepakatan bertanya pada teman sebaya memampukan 20 siswa bekerja mandiri sehingga guru leluasa memberi scaffolding.',
  },

  // ==================== 3. DIFERENSIASI PRODUK ====================
  {
    id: 'pr-l1-1',
    topicId: 'diferensiasi-produk',
    level: 1,
    kind: 'mcq',
    prompt: 'Apa inti dari diferensiasi produk bagi siswa SD?',
    stepHint: 'Produk adalah hasil karya atau bukti pemahaman yang ditunjukkan siswa di akhir belajar.',
    options: [
      'Memberi pilihan bentuk karya kepada siswa untuk menunjukkan pemahamannya',
      'Menjual hasil kerajinan siswa di koperasi sekolah',
      'Mengharuskan seluruh siswa mengumpulkan makalah ketikan yang seragam',
    ],
    correctIndex: 0,
    explanation:
      'Diferensiasi produk memberikan pilihan bentuk unjuk karya—seperti poster, presentasi, peta konsep, maket, laporan, atau rekaman—sesuai kekuatan siswa.',
  },
  {
    id: 'pr-l1-2',
    topicId: 'diferensiasi-produk',
    level: 1,
    kind: 'true-false',
    prompt:
      'Benar atau Salah: Meski bentuk produk akhir siswa berbeda-beda, kriteria penilaian inti (rubrik kompetensi) harus tetap mengacu pada tujuan belajar yang sama.',
    stepHint: 'Ingat prinsip keadilan dalam penilaian karya yang beragam.',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation:
      'Benar! Pilihan bentuk karya beragam, tetapi standar konsep yang dinilai harus setara dan jelas untuk semua bentuk produk.',
  },
  {
    id: 'pr-l1-3',
    topicId: 'diferensiasi-produk',
    level: 1,
    kind: 'image-match',
    prompt: 'Cocokkan jenis produk berikut dengan kekuatan minat siswa SD yang paling sesuai:',
    stepHint: 'Amati perbedaan antara karya visual, model 3D, dan peta hubungan konsep.',
    matchItems: [
      {
        id: 'prm-1',
        visualLabel: 'Poster atau Gambar Berwarna',
        iconKey: 'poster',
        targetConcept: 'Siswa yang kuat mengekspresikan ide lewat ilustrasi dan tata warna',
      },
      {
        id: 'prm-2',
        visualLabel: 'Maket atau Model Sederhana',
        iconKey: 'model',
        targetConcept: 'Siswa kinestetik yang gemar merakit bentuk 3 dimensi dengan tangan',
      },
      {
        id: 'prm-3',
        visualLabel: 'Peta Konsep Bercabang',
        iconKey: 'chart',
        targetConcept: 'Siswa yang senang merangkai hubungan sebab-akibat secara ringkas',
      },
    ],
    correctMatchMap: {
      'prm-1': 'Siswa yang kuat mengekspresikan ide lewat ilustrasi dan tata warna',
      'prm-2': 'Siswa kinestetik yang gemar merakit bentuk 3 dimensi dengan tangan',
      'prm-3': 'Siswa yang senang merangkai hubungan sebab-akibat secara ringkas',
    },
    explanation:
      'Menyelaraskan pilihan produk dengan kekuatan siswa meningkatkan motivasi sekaligus kualitas bukti belajar.',
  },
  {
    id: 'pr-l2-1',
    topicId: 'diferensiasi-produk',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Di Kelas 6 SD topik Energi Alternatif, seorang siswa membuat maket kincir angin sederhana dari kardus tetapi belum menulis penjelasan cara kerjanya, sedangkan siswa lain membuat laporan tulis lengkap.',
    prompt: 'Bagaimana guru memastikan penilaian kedua produk tersebut tetap objektif?',
    stepHint: 'Cek apakah indikator kompetensi inti sudah tampak pada kedua karya.',
    options: [
      'Menilai keduanya memakai rubrik konsep yang sama, lalu meminta pembuat maket menjelaskan cara kerja kincir secara lisan 1 menit',
      'Langsung memberi nilai 100 pada laporan tulis dan nilai 50 pada maket karena tidak berbentuk tulisan',
      'Melarang pembuatan maket di tugas berikutnya',
    ],
    correctIndex: 0,
    explanation:
      'Konfirmasi lisan 1 menit memastikan penguasaan konsep energi alternatif benar-benar terukur tanpa merugikan siswa yang memilih karya 3D.',
  },
  {
    id: 'pr-l2-2',
    topicId: 'diferensiasi-produk',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Guru kelas 4 memberi tugas produk "Pilihan Bebas" tanpa memberikan contoh atau kriteria keberhasilan sama sekali, sehingga banyak siswa bingung harus membuat apa.',
    prompt: 'Apa perbaikan paling penting yang perlu ditambahkan guru?',
    stepHint: 'Anak SD butuh pilihan terstruktur (3–4 opsi) beserta indikator yang jelas.',
    options: [
      'Menyediakan menu 3–4 pilihan produk disertai daftar cek indikator keberhasilan yang ramah anak',
      'Menyerahkan sepenuhnya tanpa arahan agar siswa menebak sendiri',
      'Mengembalikan semua tugas ke format LKS pilihan ganda saja',
    ],
    correctIndex: 0,
    explanation:
      'Menu pilihan produk yang terarah dan indikator keberhasilan yang transparan membuat siswa SD percaya diri berkarya.',
  },
  {
    id: 'pr-l3-1',
    topicId: 'diferensiasi-produk',
    level: 3,
    kind: 'problem-solve',
    scenarioContext:
      'Anda mengajar tema "Pahlawan dan Perjuangan Kemerdekaan" di Kelas 5. Terdapat siswa yang kesulitan menulis karangan panjang, siswa yang mahir menggambar, dan siswa yang sangat ekspresif bercerita.',
    prompt:
      'Rancangan diferensiasi produk dan rubrik apa yang paling adil untuk mengukur tujuan "Menjelaskan nilai keteladanan pahlawan"?',
    stepHint: 'Tentukan 3 pilihan produk yang berbeda format namun diukur oleh 2–3 indikator kompetensi inti yang sama.',
    options: [
      'Menawarkan pilihan Komik 4 Panel, Rekaman/Cerita Lisan 2 Menit, atau Kartu Biografi Singkat dengan rubrik: (1) Fakta tokoh tepat, (2) Minimal 2 nilai keteladanan, (3) Contoh penerapan di sekolah',
      'Membuat 3 tujuan pembelajaran berbeda yang tidak saling berkaitan',
      'Menilai keindahan gambar saja untuk komik dan jumlah halaman untuk tulisan',
    ],
    correctIndex: 0,
    reasonPrompt: 'Jelaskan mengapa penyusunan satu rubrik inti tersebut adil bagi semua siswa:',
    reasonKeywords: ['rubrik', 'tujuan', 'sama', 'adil', 'keteladanan', 'kompetensi'],
    explanation:
      'Dengan indikator isi yang sama (fakta tokoh, nilai keteladanan, dan contoh penerapan), setiap siswa dinilai berdasarkan kedalaman pemahaman, bukan kesamaan format.',
  },

  // ==================== 4. PEMBELAJARAN INKLUSIF ====================
  {
    id: 'ink-l1-1',
    topicId: 'pembelajaran-inklusif',
    level: 1,
    kind: 'mcq',
    prompt: 'Apa prinsip utama pembelajaran inklusif di sekolah dasar?',
    stepHint: 'Inklusif berarti merangkul semua anak dalam lingkungan belajar yang setara.',
    options: [
      'Semua siswa dengan beragam kemampuan belajar bersama secara setara dengan dukungan penyesuaian yang sesuai',
      'Memisahkan anak berkebutuhan khusus di ruangan terkunci saat jam pelajaran inti',
      'Menyamakan semua media belajar tanpa memedulikan hambatan penglihatan atau pendengaran siswa',
    ],
    correctIndex: 0,
    explanation:
      'Pembelajaran inklusif menjamin setiap anak belajar bersama dalam suasana ramah, setara, dan didukung penyesuaian akses yang dibutuhkan.',
  },
  {
    id: 'ink-l1-2',
    topicId: 'pembelajaran-inklusif',
    level: 1,
    kind: 'true-false',
    prompt:
      'Benar atau Salah: Memberikan waktu pengerjaan fleksibel dan huruf berukuran besar pada siswa dengan hambatan penglihatan berarti berbuat tidak adil kepada teman lainnya.',
    stepHint: 'Bedakan antara "sama rata" dan "adil sesuai kebutuhan akses".',
    options: ['Benar', 'Salah'],
    correctIndex: 1,
    explanation:
      'Salah! Akomodasi akses seperti huruf besar dan waktu fleksibel bukanlah privilese tidak adil, melainkan jembatan agar siswa memiliki kesempatan setara menunjukkan kompetensinya.',
  },
  {
    id: 'ink-l1-3',
    topicId: 'pembelajaran-inklusif',
    level: 1,
    kind: 'image-match',
    prompt: 'Pasangkan kebutuhan belajar inklusif berikut dengan penyesuaian yang tepat:',
    stepHint: 'Cocokkan hambatan belajar dengan alat bantu akses yang relevan.',
    matchItems: [
      {
        id: 'im-1',
        visualLabel: 'Hambatan Pendengaran',
        iconKey: 'headphones',
        targetConcept: 'Video bersubtitle & instruksi visual tertulis yang jelas',
      },
      {
        id: 'im-2',
        visualLabel: 'Kesulitan Membaca Teks Panjang',
        iconKey: 'book',
        targetConcept: 'Kalimat pendek bertahap, ukuran huruf besar, dan audio soal',
      },
      {
        id: 'im-3',
        visualLabel: 'Hambatan Mobilitas / Kursi Roda',
        iconKey: 'accessibility',
        targetConcept: 'Penataan lorong meja lega & akses aktivitas tanpa hambatan fisik',
      },
    ],
    correctMatchMap: {
      'im-1': 'Video bersubtitle & instruksi visual tertulis yang jelas',
      'im-2': 'Kalimat pendek bertahap, ukuran huruf besar, dan audio soal',
      'im-3': 'Penataan lorong meja lega & akses aktivitas tanpa hambatan fisik',
    },
    explanation:
      'Menyesuaikan media dan tata ruang kelas menghilangkan hambatan teknis sehingga setiap anak dapat berpartisipasi bermakna.',
  },
  {
    id: 'ink-l2-1',
    topicId: 'pembelajaran-inklusif',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Di Kelas 4 SD ada seorang siswa dengan kesulitan membaca (gejala disleksia) dan seorang siswa yang mudah kehilangan fokus jika instruksi diberikan panjang sekaligus.',
    prompt: 'Penyesuaian lembar kerja manakah yang paling membantu kedua siswa tersebut?',
    stepHint: 'Gunakan pemecahan langkah kerja (chunking), huruf bersih, dan dukungan audio.',
    options: [
      'Memecah instruksi menjadi 3 langkah bernomor singkat, memperbesar ukuran huruf, dan menyediakan tombol audio pembaca soal',
      'Menuliskan seluruh instruksi dalam satu paragraf kecil agar hemat kertas',
      'Mengurangi nilai jika mereka bertanya ulang tentang instruksi',
    ],
    correctIndex: 0,
    explanation:
      'Instruksi bertahap dengan huruf lega serta opsi audio menurunkan beban pemrosesan teks dan membantu menjaga fokus siswa.',
  },
  {
    id: 'ink-l2-2',
    topicId: 'pembelajaran-inklusif',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Saat evaluasi IPS, seorang siswa mengalami hambatan motorik halus sehingga menulis tangan sangat lambat dan melelahkan, padahal ia memahami materi dengan sangat baik secara lisan.',
    prompt: 'Penyesuaian evaluasi apa yang menjaga kompetensi tetap terukur secara adil?',
    stepHint: 'Ubah cara merespons (output), bukan tujuan kompetensi yang diukur.',
    options: [
      'Memberi pilihan menjawab lewat klik pilihan, rekaman suara, atau wawancara singkat lisan dengan guru',
      'Tetap memaksa menulis esai 2 halaman dalam 15 menit',
      'Tidak usah menilai siswa tersebut sama sekali',
    ],
    correctIndex: 0,
    explanation:
      'Evaluasi inklusif memisahkan hambatan motorik dari penguasaan konsep dengan memberi alternatif cara menjawab.',
  },
  {
    id: 'ink-l3-1',
    topicId: 'pembelajaran-inklusif',
    level: 3,
    kind: 'problem-solve',
    scenarioContext:
      'Anda merancang kegiatan kelompok di kelas inklusif yang terdiri dari siswa dengan hambatan penglihatan ringan, siswa dengan hambatan pendengaran, dan siswa reguler. Anda ingin semua bekerja setara dalam satu proyek Panca Indera.',
    prompt: 'Strategi lengkap apa yang memastikan kelas inklusif berjalan harmonis dan tidak diskriminatif?',
    stepHint: 'Padukan akses visual, audio/taktil, peran setara dalam kelompok, dan pilihan evaluasi.',
    options: [
      'Menyajikan materi multi-format (kartu berhuruf besar & tekstur + video bersubtitle), membagi peran setara di kelompok meja bersama, dan memberi opsi jawaban evaluasi lisan atau visual',
      'Mengelompokkan seluruh siswa berkebutuhan khusus di pojok belakang dengan tugas mewarnai saja',
      'Menghilangkan kerja kelompok dan hanya memakai metode ceramah satu arah',
    ],
    correctIndex: 0,
    reasonPrompt: 'Tuliskan atau pilih mengapa pendekatan multi-format tersebut menciptakan keadilan inklusif:',
    reasonKeywords: ['setara', 'akses', 'multi-format', 'kolaborasi', 'bersama', 'kebutuhan'],
    explanation:
      'Ketika materi tersedia dalam multi-format dan setiap siswa memegang peran bermakna dalam kelompok yang sama, budaya saling menghargai tumbuh alami di kelas SD.',
  },

  // ==================== 5. KONSEP UMUM DIFERENSIASI ====================
  {
    id: 'u-l1-1',
    topicId: 'konsep-umum',
    level: 1,
    kind: 'mcq',
    prompt: 'Tiga dimensi kebutuhan belajar siswa yang dipetakan guru sebelum merancang diferensiasi adalah...',
    stepHint: 'Ingat kerangka pemetaan Carol Ann Tomlinson.',
    options: [
      'Kesiapan belajar, minat belajar, dan profil belajar',
      'Tinggi badan, usia, dan alamat rumah',
      'Nilai ujian tahun lalu, warna tas, dan hobi orang tua',
    ],
    correctIndex: 0,
    explanation:
      'Pemetaan kesiapan, minat, dan profil belajar membantu guru merancang strategi belajar yang tepat sasaran.',
  },
  {
    id: 'u-l1-2',
    topicId: 'konsep-umum',
    level: 1,
    kind: 'true-false',
    prompt:
      'Benar atau Salah: Pengelompokan siswa dalam pembelajaran berdiferensiasi bersifat fleksibel dan dapat berubah mengikuti topik pelajaran.',
    stepHint: 'Apakah kemampuan seorang anak sama di semua mata pelajaran?',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation:
      'Benar. Pengelompokan fleksibel berubah sesuai kesiapan siswa di masing-masing materi dan mencegah pelabelan permanen.',
  },
  {
    id: 'u-l1-3',
    topicId: 'konsep-umum',
    level: 1,
    kind: 'image-match',
    prompt: 'Cocokkan tiga pilar utama diferensiasi dengan fokus penyesuaiannya:',
    stepHint: 'Konten = materi, Proses = cara memahami, Produk = karya bukti belajar.',
    matchItems: [
      {
        id: 'um-1',
        visualLabel: 'Diferensiasi Konten',
        iconKey: 'book',
        targetConcept: 'Apa yang dipelajari (teks bertingkat, video, gambar, audio)',
      },
      {
        id: 'um-2',
        visualLabel: 'Diferensiasi Proses',
        iconKey: 'puzzle',
        targetConcept: 'Bagaimana memahaminya (stasiun belajar, diskusi, eksperimen)',
      },
      {
        id: 'um-3',
        visualLabel: 'Diferensiasi Produk',
        iconKey: 'poster',
        targetConcept: 'Bagaimana membuktikannya (poster, maket, presentasi, laporan)',
      },
    ],
    correctMatchMap: {
      'um-1': 'Apa yang dipelajari (teks bertingkat, video, gambar, audio)',
      'um-2': 'Bagaimana memahaminya (stasiun belajar, diskusi, eksperimen)',
      'um-3': 'Bagaimana membuktikannya (poster, maket, presentasi, laporan)',
    },
    explanation:
      'Memahami perbedaan Konten, Proses, dan Produk membantu guru memilih tuas diferensiasi paling efektif untuk kelasnya.',
  },
  {
    id: 'u-l2-1',
    topicId: 'konsep-umum',
    level: 2,
    kind: 'case-mcq',
    scenarioContext:
      'Sebelum memulai bab Keliling Bangun Datar di Kelas 4, Pak Budi melakukan cek pemahaman 5 menit. Ternyata 10 siswa lupa perbedaan panjang sisi dan keliling.',
    prompt: 'Apa fungsi hasil asesmen diagnostik awal Pak Budi tersebut?',
    stepHint: 'Asesmen awal dipakai untuk menyesuaikan pembelajaran hari ini, bukan untuk menghukum.',
    options: [
      'Menjadi dasar membentuk kelompok pendampingan awal menggunakan benang/penggaris sebelum masuk rumus keliling',
      'Langsung dimasukkan sebagai nilai rapor akhir semester',
      'Diabaikan karena target kurikulum harus selesai hari ini juga',
    ],
    correctIndex: 0,
    explanation:
      'Asesmen diagnostik awal memandu guru menyusun intervensi cepat (scaffolding) agar miskonsepsi teratasi sebelum materi berlanjut.',
  },
  {
    id: 'u-l3-1',
    topicId: 'konsep-umum',
    level: 3,
    kind: 'problem-solve',
    scenarioContext:
      'Sebagian guru di sekolah Anda khawatir pembelajaran berdiferensiasi berarti harus membuat 30 RPP berbeda setiap hari sehingga kelelahan.',
    prompt: 'Strategi paling efektif apa yang Anda rekomendasikan agar diferensiasi realistis diterapkan guru SD?',
    stepHint: 'Mulai bertahap dari 1 dimensi dan gunakan 3 tingkat kesiapan fleksibel, bukan 30 RPP.',
    options: [
      'Merancang satu tujuan belajar inti lalu menyiapkan 2–3 jalur aktivitas atau media fleksibel sesuai pemetaan kelas, dimulai dari satu mata pelajaran terlebih dahulu',
      'Membuat 30 modul ajar berbeda setiap malam tanpa istirahat',
      'Menghentikan seluruh inovasi dan kembali memakai satu metode ceramah saja',
    ],
    correctIndex: 0,
    reasonPrompt: 'Mengapa pendekatan 2–3 jalur fleksibel lebih berkelanjutan bagi guru SD?',
    reasonKeywords: ['satu tujuan', 'jalur', 'fleksibel', 'bertahap', 'efisien', 'realistis'],
    explanation:
      'Diferensiasi bukanlah 30 RPP individual, melainkan merancang 2–3 jalur fleksibel menuju satu tujuan inti yang sama sehingga realistis dan berdampak tinggi.',
  },
];
