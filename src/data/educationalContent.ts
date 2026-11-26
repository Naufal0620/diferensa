import type {
  ClassroomScenario,
  CommunityPost,
  DiagnosticQuestion,
  EvaluationQuestion,
  LearningModule,
  TeacherProfile,
} from '../types/diferensa';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    dimension: 'profil',
    contextLabel: 'Profil Belajar · Kelas 1–3 SD',
    prompt:
      'Saat Anda memperkenalkan konsep penjumlahan atau siklus hidup hewan di kelas, mayoritas siswa lebih cepat menangkap jika...',
    options: [
      {
        id: 'd1-a',
        label: 'Melihat kartu bergambar & poster warna',
        description: 'Siswa fokus pada ilustrasi, bagan warna, dan contoh visual di papan tulis.',
        styleTag: 'Visual',
        readinessWeight: 2,
      },
      {
        id: 'd1-b',
        label: 'Mendengarkan cerita atau lagu pendek guru',
        description: 'Siswa antusias menyimak narasi lisan, tepuk irama, dan tanya jawab kelas.',
        styleTag: 'Auditori',
        readinessWeight: 2,
      },
      {
        id: 'd1-c',
        label: 'Memegang dan menyusun benda konkret langsung',
        description: 'Siswa aktif memindahkan balok, stik es krim, atau kartu kata di meja.',
        styleTag: 'Kinestetik',
        readinessWeight: 2,
      },
    ],
  },
  {
    id: 'diag-2',
    dimension: 'kesiapan',
    contextLabel: 'Kesiapan Belajar · Pemahaman Awal',
    prompt:
      'Ketika Anda memberikan 3 soal pemantik singkat di awal pelajaran, bagaimana kondisi kesiapan rata-rata siswa di kelas Anda?',
    options: [
      {
        id: 'd2-a',
        label: 'Masih perlu bimbingan langkah demi langkah',
        description: 'Banyak siswa belum menguasai prasyarat dasar dan ragu mengerjakan sendiri.',
        styleTag: 'Kinestetik',
        readinessWeight: 1,
      },
      {
        id: 'd2-b',
        label: 'Sebagian besar paham dasar namun butuh contoh',
        description: 'Siswa mengerti instruksi umum, tetapi perlu latihan terpandu sebelum mandiri.',
        styleTag: 'Visual',
        readinessWeight: 2,
      },
      {
        id: 'd2-c',
        label: 'Cepat menuntaskan soal dasar dan minta tantangan',
        description: 'Mayoritas siswa sudah menguasai prasyarat dan siap eksplorasi kasus nyata.',
        styleTag: 'Auditori',
        readinessWeight: 3,
      },
    ],
  },
  {
    id: 'diag-3',
    dimension: 'minat',
    contextLabel: 'Minat Belajar · Konteks Tugas',
    prompt:
      'Saat diberikan proyek kelompok di tema IPAS atau Bahasa Indonesia, aktivitas mana yang paling membuat siswa bersemangat?',
    options: [
      {
        id: 'd3-a',
        label: 'Membuat komik, poster mini, atau buku lipat bergambar',
        description: 'Siswa senang menggambar, mewarnai diagram, dan menata tata letak visual.',
        styleTag: 'Visual',
        readinessWeight: 2,
      },
      {
        id: 'd3-b',
        label: 'Bermain peran, wawancara teman, atau presentasi cerita',
        description: 'Siswa gemar berbicara, berdialog, dan menjelaskan gagasan secara lisan.',
        styleTag: 'Auditori',
        readinessWeight: 3,
      },
      {
        id: 'd3-c',
        label: 'Merakit maket sederhana, percobaan sains, atau jelajah kelas',
        description: 'Siswa menyukai aktivitas fisik, merakit bahan bekas, dan observasi langsung.',
        styleTag: 'Kinestetik',
        readinessWeight: 2,
      },
    ],
  },
  {
    id: 'diag-4',
    dimension: 'kesiapan',
    contextLabel: 'Kesiapan Membaca & Literasi',
    prompt:
      'Bagaimana kemampuan siswa dalam memahami instruksi lembar kerja tertulis secara mandiri?',
    options: [
      {
        id: 'd4-a',
        label: 'Perlu dibacakan perlahan atau disertai ikon petunjuk',
        description: 'Siswa masih kesulitan memahami kalimat panjang tanpa bantuan simbol.',
        styleTag: 'Auditori',
        readinessWeight: 1,
      },
      {
        id: 'd4-b',
        label: 'Mampu memahami jika instruksi dibuat poin bernomor',
        description: 'Siswa terbantu dengan daftar langkah bernomor dan contoh singkat.',
        styleTag: 'Visual',
        readinessWeight: 2,
      },
      {
        id: 'd4-c',
        label: 'Langsung memahami dan berinisiatif membantu teman',
        description: 'Siswa lancar membaca konteks dan siap menjadi tutor sebaya.',
        styleTag: 'Kinestetik',
        readinessWeight: 3,
      },
    ],
  },
  {
    id: 'diag-5',
    dimension: 'profil',
    contextLabel: 'Lingkungan Belajar Ideal',
    prompt:
      'Suasana kelas seperti apa yang membuat siswa Anda paling fokus dan nyaman saat kegiatan inti berlangsung?',
    options: [
      {
        id: 'd5-a',
        label: 'Sudut baca tenang dengan papan pajangan contoh karya',
        description: 'Siswa suka melihat rujukan visual yang tertata rapi di dinding kelas.',
        styleTag: 'Visual',
        readinessWeight: 2,
      },
      {
        id: 'd5-b',
        label: 'Diskusi meja bundar dengan giliran berbicara teratur',
        description: 'Siswa belajar optimal saat bertukar pendapat secara lisan dengan kelompok.',
        styleTag: 'Auditori',
        readinessWeight: 2,
      },
      {
        id: 'd5-c',
        label: 'Stasiun aktivitas berpindah tempat tiap 15 menit',
        description: 'Siswa tetap bersemangat jika tidak duduk diam terlalu lama di satu kursi.',
        styleTag: 'Kinestetik',
        readinessWeight: 2,
      },
    ],
  },
  {
    id: 'diag-6',
    dimension: 'minat',
    contextLabel: 'Evaluasi & Ekspresi Pemahaman',
    prompt:
      'Jika siswa diberi kebebasan menunjukkan hasil belajar di akhir bab, bentuk asesmen apa yang paling mencerminkan potensi mereka?',
    options: [
      {
        id: 'd6-a',
        label: 'Peta konsep berwarna atau infografis langkah',
        description: 'Menyusun ide utama dengan warna, panah hubungan, dan sketsa.',
        styleTag: 'Visual',
        readinessWeight: 3,
      },
      {
        id: 'd6-b',
        label: 'Cerita lisan berpasangan atau tanya jawab reflektif',
        description: 'Menyampaikan pemahaman dengan kata-kata sendiri secara natural.',
        styleTag: 'Auditori',
        readinessWeight: 2,
      },
      {
        id: 'd6-c',
        label: 'Demonstrasi alat peraga atau simulasi praktik nyata',
        description: 'Menunjukkan cara kerja konsep secara langsung dengan tangan.',
        styleTag: 'Kinestetik',
        readinessWeight: 3,
      },
    ],
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-pengertian',
    slug: 'pengertian',
    orderLabel: '01. Pengertian Dasar',
    title: 'Apa Itu Pembelajaran Berdiferensiasi?',
    subtitle: 'Memahami esensi penyesuaian belajar yang berpihak pada setiap siswa SD.',
    durationMinutes: 6,
    coreIdea:
      'Pembelajaran berdiferensiasi adalah usaha guru menyesuaikan proses pembelajaran di kelas untuk memenuhi kebutuhan belajar individu setiap murid. Diferensiasi bukan berarti membuat 30 RPP berbeda untuk 30 siswa, melainkan merancang jalur belajar fleksibel menuju tujuan kompetensi yang sama.',
    keyPoints: [
      {
        heading: 'Satu Tujuan Utama, Banyak Jalur Belajar',
        detail:
          'Semua siswa diarahkan mencapai tujuan pembelajaran inti yang sama, tetapi cara mengakses materi, pendampingan, dan bentuk karyanya disesuaikan.',
      },
      {
        heading: 'Bukan Pelabelan Permanen',
        detail:
          'Pengelompokan siswa bersifat dinamis dan cair. Siswa yang perlu bimbingan pada materi Pecahan bisa jadi masuk kelompok mahir pada materi Bangun Datar.',
      },
      {
        heading: 'Berakar pada Asesmen Awal',
        detail:
          'Guru tidak menebak kebutuhan siswa, melainkan mengamati kesiapan, minat, dan profil belajar mereka sebelum merancang aktivitas.',
      },
    ],
    sdExample: {
      kelas: 'Kelas 2 SD · Bahasa Indonesia',
      topik: 'Mengenal Kalimat Ajakan dan Perintah',
      praktik:
        'Guru menyiapkan kartu bergambar situasi kelas bagi siswa yang masih mengeja lancar, sementara siswa yang sudah lancar membaca menelaah teks dialog pendek dua paragraf.',
    },
    quickCheck: {
      question: 'Manakah pernyataan yang paling tepat menggambarkan pembelajaran berdiferensiasi?',
      options: [
        'Guru membuat jadwal les tambahan terpisah di luar jam sekolah untuk semua siswa.',
        'Guru menyesuaikan konten, proses, atau produk belajar sesuai kesiapan, minat, dan profil belajar siswa.',
        'Guru menurunkan standar tujuan pembelajaran agar semua siswa mendapat nilai sama.',
      ],
      correctIndex: 1,
      explanation:
        'Diferensiasi menyesuaikan cara belajar (konten, proses, produk) berdasarkan pemetaan kebutuhan siswa sambil tetap menjaga tujuan belajar utama.',
    },
  },
  {
    id: 'mod-prinsip',
    slug: 'prinsip',
    orderLabel: '02. Prinsip Utama',
    title: 'Lima Prinsip Kunci di Ruang Kelas SD',
    subtitle: 'Fondasi pedagogis Carol Ann Tomlinson yang ramah diterapkan di sekolah dasar.',
    durationMinutes: 8,
    coreIdea:
      'Pembelajaran berdiferensiasi berdiri di atas lingkungan kelas yang aman secara emosional, kurikulum berkualitas yang bermakna, asesmen berkelanjutan, serta pengajaran responsif yang menghargai keberagaman kecepatan tumbuh anak SD.',
    keyPoints: [
      {
        heading: 'Lingkungan Belajar yang Mengundang (Inviting)',
        detail:
          'Anak SD berani bertanya dan mencoba ketika kesalahan dipandang sebagai bagian wajar dari proses belajar, bukan hal yang memalukan.',
      },
      {
        heading: 'Kurikulum Bermakna & Menantang Tepat Sasaran',
        detail:
          'Tugas tidak boleh terlalu mudah hingga membosankan, maupun terlalu sulit hingga membuat anak frustrasi (Zone of Proximal Development).',
      },
      {
        heading: 'Asesmen Formatif Berkelanjutan',
        detail:
          'Kuis singkat 3 menit, kartu emoji pemahaman, atau observasi diskusi digunakan guru untuk menyesuaikan langkah pengajaran hari itu juga.',
      },
    ],
    sdExample: {
      kelas: 'Kelas 4 SD · Matematika',
      topik: 'Keliling dan Luas Persegi Panjang',
      praktik:
        'Setiap meja diberi kotak persegi satuan. Siswa yang masih bingung menghitung rumus mulai dari menempel ubin kertas, sedangkan kelompok siap langsung merancang denah taman kelas.',
    },
    quickCheck: {
      question: 'Mengapa pengelompokan siswa dalam kelas berdiferensiasi harus bersifat fleksibel?',
      options: [
        'Karena kekuatan dan kesiapan belajar setiap anak berbeda di tiap topik pelajaran.',
        'Agar siswa tidak pernah bekerja bersama teman yang sama sepanjang tahun.',
        'Supaya guru lebih mudah mengisi daftar hadir harian.',
      ],
      correctIndex: 0,
      explanation:
        'Pengelompokan fleksibel mengikuti kesiapan aktual anak pada topik tertentu sehingga mencegah stigma atau pelabelan tetap.',
    },
  },
  {
    id: 'mod-jenis',
    slug: 'jenis',
    orderLabel: '03. Tiga Jenis Diferensiasi',
    title: 'Diferensiasi Konten, Proses, dan Produk',
    subtitle: 'Mengenal tiga tuas utama yang dapat dipadukan guru sesuai kebutuhan kelas.',
    durationMinutes: 10,
    coreIdea:
      'Guru tidak wajib mengubah ketiga aspek sekaligus dalam satu pertemuan. Memilih satu atau dua tuas yang paling relevan—Konten (apa yang dipelajari), Proses (bagaimana memahaminya), atau Produk (bukti belajar)—sudah memberikan dampak besar.',
    keyPoints: [
      {
        heading: 'Diferensiasi Konten (Input Belajar)',
        detail:
          'Menyajikan materi melalui ragam media (video pendek, bacaan bertingkat, kartu gambar, benda nyata) sesuai tingkat kesiapan dan gaya belajar.',
      },
      {
        heading: 'Diferensiasi Proses (Aktivitas Memaknai)',
        detail:
          'Menyediakan variasi cara berlatih: stasiun belajar keliling, pendampingan guru kelompok kecil, lembar pengayaan mandiri, atau diskusi berpasangan.',
      },
      {
        heading: 'Diferensiasi Produk (Unjuk Pemahaman)',
        detail:
          'Memberi kebebasan cara membuktikan penguasaan kompetensi: poster, presentasi lisan, model 3D sederhana, atau laporan tertulis terstruktur.',
      },
    ],
    sdExample: {
      kelas: 'Kelas 5 SD · IPAS',
      topik: 'Rantai Makanan di Ekosistem Sawah',
      praktik:
        'Siswa bebas memilih produk akhir: menggambar bagan rantai makanan lengkap dengan keterangannya, menyusun kartu diorama pop-up, atau menjelaskan alur energi secara lisan.',
    },
    quickCheck: {
      question: 'Ketika guru memberi pilihan antara membuat poster, rekaman cerita, atau maket sederhana untuk topik Siklus Air, strategi apa yang diterapkan?',
      options: [
        'Diferensiasi Konten',
        'Diferensiasi Proses',
        'Diferensiasi Produk',
      ],
      correctIndex: 2,
      explanation:
        'Memberi pilihan bentuk karya akhir sebagai bukti ketercapaian tujuan belajar merupakan contoh Diferensiasi Produk.',
    },
  },
  {
    id: 'mod-karakteristik',
    slug: 'karakteristik',
    orderLabel: '04. Karakteristik Kebutuhan',
    title: 'Memetakan Kesiapan, Minat, dan Profil Belajar',
    subtitle: 'Cara praktis mengenali keberagaman 25–32 siswa SD tanpa beban administrasi berlebih.',
    durationMinutes: 7,
    coreIdea:
      'Tomlinson membagi kebutuhan belajar siswa menjadi tiga dimensi utama: Kesiapan Belajar (Readiness), Minat (Interest), dan Profil Belajar (Learning Profile). Memetakan ketiganya cukup dilakukan lewat pengamatan singkat dan kuesioner ramah anak.',
    keyPoints: [
      {
        heading: 'Kesiapan Belajar (Readiness)',
        detail:
          'Mengukur jarak antara pengetahuan awal siswa saat ini dengan tujuan pembelajaran baru—bukan mengukur kecerdasan bawaan anak.',
      },
      {
        heading: 'Minat Siswa (Interest)',
        detail:
          'Menghubungkan materi pelajaran dengan hal yang disukai anak SD seperti olahraga, hewan peliharaan, kuliner daerah, atau cerita petualangan.',
      },
      {
        heading: 'Profil Belajar (Learning Profile)',
        detail:
          'Mencakup preferensi sensori (visual, auditori, kinestetik), budaya, bahasa ibu di rumah, serta kenyamanan kerja individu vs kelompok.',
      },
    ],
    sdExample: {
      kelas: 'Kelas 3 SD · Matematika',
      topik: 'Soal Cerita Satuan Berat (Gram & Kilogram)',
      praktik:
        'Untuk mengakomodasi minat, guru menyediakan tiga tema soal cerita dengan tingkat kesulitan setara: tema kantin sekolah, tema kebun binatang, dan tema membuat kue.',
    },
    quickCheck: {
      question: 'Seorang guru menyediakan soal cerita matematika dengan pilihan tema sepak bola, berkebun, dan memasak. Dimensi kebutuhan belajar apa yang disasar?',
      options: [
        'Kesiapan Belajar (Readiness)',
        'Minat Belajar (Interest)',
        'Profil Kognitif Lanjut',
      ],
      correctIndex: 1,
      explanation:
        'Menyediakan ragam tema yang dekat dengan kegemaran siswa untuk meningkatkan keterlibatan emosional adalah strategi berbasis Minat Belajar.',
    },
  },
  {
    id: 'mod-penerapan',
    slug: 'penerapan',
    orderLabel: '05. Penerapan Praktis',
    title: 'Langkah Sistematis Menerapkan di Kelas SD',
    subtitle: 'Alur 4 tahap mulai dari asesmen awal hingga refleksi akhir pelajaran.',
    durationMinutes: 9,
    coreIdea:
      'Agar tidak kewalahan, mulailah dari satu mata pelajaran terlebih dahulu. Gunakan pola 4 langkah: Pemetaan Awal -> Perancangan Modul Bertingkat -> Pengelolaan Stasiun Kelas -> Refleksi & Asesmen Formatif.',
    keyPoints: [
      {
        heading: 'Tahap 1: Cek Ombak 5 Menit (Asesmen Diagnostik Ringan)',
        detail:
          'Gunakan 2–3 pertanyaan papan tulis, kartu jempol, atau kuis cepat sehari sebelum materi baru dimulai.',
      },
      {
        heading: 'Tahap 2: Siapkan 2–3 Tier Aktivitas Inti',
        detail:
          'Rancang satu aktivitas inti lalu buat versi dengan bantuan visual tambahan (Perlu Bimbingan) serta satu tantangan perluasan (Mahir).',
      },
      {
        heading: 'Tahap 3: Atur Rutinitas & Sinyal Kelas Ramah Anak',
        detail:
          'Gunakan pengatur waktu visual dan aturan jelas ("tanya 2 teman dulu sebelum angkat tangan ke guru") agar kelas tetap tertib saat guru mendampingi kelompok kecil.',
      },
    ],
    sdExample: {
      kelas: 'Kelas 6 SD · Bahasa Indonesia',
      topik: 'Menulis Teks Eksplanasi Ilmiah',
      praktik:
        'Kelompok A memakai kerangka paragraf rumpang bergambar; Kelompok B memakai daftar kata penghubung kausalitas; Kelompok C meneliti fenomena gerhana dan menulis mandiri.',
    },
    quickCheck: {
      question: 'Apa kunci menjaga ketertiban kelas SD saat guru fokus mendampingi kelompok kecil yang butuh bimbingan?',
      options: [
        'Membuat kesepakatan rutinitas mandiri dan panduan langkah kerja yang jelas di meja kelompok lain.',
        'Meminta kelompok lain diam total tanpa aktivitas sambil menunggu guru selesai.',
        'Membatalkan kerja kelompok dan kembali ke ceramah klasikal penuh.',
      ],
      correctIndex: 0,
      explanation:
        'Rutinitas kelas yang jelas, instruksi visual di meja, dan budaya saling bantu teman sebaya menjaga alur kelas tetap kondusif.',
    },
  },
];

export const CLASSROOM_SCENARIOS: ClassroomScenario[] = [
  {
    id: 'sim-pecahan-4',
    kelas: 'Kelas 4 SD',
    mataPelajaran: 'Matematika',
    topik: 'Membandingkan Pecahan Senilai',
    classroomContext:
      'Di kelas IV-B terdapat 28 siswa. Dari asesmen awal 5 menit, terlihat perbedaan mencolok dalam memahami konsep pembilang dan penyebut.',
    challenge:
      'Bagaimana Anda merancang kegiatan inti selama 45 menit agar semua kelompok bertumbuh tanpa ada yang bosan atau tertinggal?',
    studentGroups: {
      perluBimbingan: '8 siswa masih menganggap 1/4 lebih besar dari 1/2 karena angka 4 lebih besar dari 2.',
      cakap: '14 siswa sudah paham pecahan sederhana lewat gambar arsiran, namun perlu latihan membandingkan.',
      mahir: '6 siswa cepat menyelesaikan soal gambar dan mulai bertanya soal cerita pembagian kue.',
    },
    options: [
      {
        id: 'opt-sim1-konten',
        approachType: 'Konten',
        title: 'Variasi Media Pecahan Bertingkat + Pendampingan Meja',
        actionSummary:
          'Kelompok Perlu Bimbingan memakai kertas lipat pecahan fisik; Kelompok Cakap memakai kartu batang pecahan visual; Kelompok Mahir menyelesaikan tantangan soal cerita kontekstual.',
        isOptimal: true,
        effectivenessScore: 95,
        studentImpact: {
          perluBimbingan: 'Melihat langsung bahwa lipatan 1/2 lebih luas daripada 1/4 sehingga miskonsepsi teratasi.',
          cakap: 'Terlatih membandingkan berbagai pasangan pecahan melalui kartu batang secara berpasangan.',
          mahir: 'Tertantang memecahkan pembagian kue untuk 6 dan 8 teman tanpa menunggu instruksi ulang.',
        },
        pedagogicalFeedback:
          'Pilihan sangat tepat! Memadukan media konkret bagi siswa yang mengalami miskonsepsi dan tantangan soal cerita bagi kelompok mahir menjaga seluruh siswa bekerja di zona belajar optimalnya.',
      },
      {
        id: 'opt-sim1-seragam',
        approachType: 'Proses',
        title: 'Latihan LKS Seragam dengan Ceramah Ulang di Papan',
        actionSummary:
          'Guru menjelaskan ulang definisi pecahan di papan tulis selama 25 menit lalu meminta seluruh 28 siswa mengerjakan 15 soal LKS yang sama.',
        isOptimal: false,
        effectivenessScore: 48,
        studentImpact: {
          perluBimbingan: 'Tetap bingung karena penjelasan abstrak di papan belum membuktikan ukuran fisik pecahan.',
          cakap: 'Mengerjakan soal secara mekanis tanpa memahami mengapa dua pecahan bisa senilai.',
          mahir: 'Selesai dalam 7 menit lalu mulai mengobrol karena tidak ada tantangan lanjutan.',
        },
        pedagogicalFeedback:
          'Pendekatan seragam membuat 6 siswa mahir kehilangan tantangan dan 8 siswa dengan miskonsepsi tetap tertinggal karena belum menyentuh media konkret.',
      },
      {
        id: 'opt-sim1-produk',
        approachType: 'Produk',
        title: 'Bebas Membuat Poster Pecahan Tanpa Pemetaan Konsep Awal',
        actionSummary:
          'Seluruh siswa langsung diminta menggambar poster pecahan senilai bebas sesuai kreativitas masing-masing tanpa penguatan konsep dasar terlebih dahulu.',
        isOptimal: false,
        effectivenessScore: 62,
        studentImpact: {
          perluBimbingan: 'Menggambar hiasan poster bagus, tetapi pecahan yang ditulis masih keliru secara matematis.',
          cakap: 'Cukup antusias menghias, namun pemahaman konsep kesetaraan pecahan kurang teruji.',
          mahir: 'Membuat poster rapi, tetapi belum terdorong melakukan penalaran pemecahan masalah.',
        },
        pedagogicalFeedback:
          'Diferensiasi produk efektif sebagai unjuk pemahaman setelah konsep dikuasai, tetapi belum cukup untuk memperbaiki miskonsepsi di awal pembelajaran.',
      },
    ],
  },
  {
    id: 'sim-siklus-air-5',
    kelas: 'Kelas 5 SD',
    mataPelajaran: 'IPAS',
    topik: 'Siklus Air dan Dampaknya pada Lingkungan',
    classroomContext:
      'Siswa kelas V-A memiliki gaya belajar yang sangat beragam: sebagian senang menggambar diagram, sebagian aktif berdiskusi lisan, dan sebagian suka eksperimen langsung.',
    challenge:
      'Di akhir bab, Anda ingin menilai pemahaman siswa tentang tahapan evaporasi, kondensasi, presipitasi, dan infiltrasi secara adil.',
    studentGroups: {
      perluBimbingan: '7 siswa sering tertukar urutan istilah ilmiah evaporasi dan kondensasi.',
      cakap: '15 siswa memahami alur dasar hujan namun butuh wadah mengekspresikan hubungannya dengan aktivitas manusia.',
      mahir: '6 siswa tertarik menganalisis dampak penebangan pohon terhadap proses infiltrasi.',
    },
    options: [
      {
        id: 'opt-sim2-produk',
        approachType: 'Produk',
        title: 'Tiga Jalur Karya Akhir dengan Satu Rubrik Konsep Inti',
        actionSummary:
          'Siswa memilih membuktikan pemahaman lewat: (1) Poster infografis berlabel, (2) Cerita drama mini alur tetesan air, atau (3) Model diorama kantong plastik siklus air, dinilai dengan rubrik konsep yang sama.',
        isOptimal: true,
        effectivenessScore: 96,
        studentImpact: {
          perluBimbingan: 'Terbantu menghafal urutan karena menempel label langsung pada model atau sketsa buatan sendiri.',
          cakap: 'Merasa dihargai bakatnya dan mampu menjelaskan siklus air dengan bahasa sendiri.',
          mahir: 'Menambahkan analisis resapan air (infiltrasi) di proyek pilihan mereka secara mendalam.',
        },
        pedagogicalFeedback:
          'Luar biasa! Diferensiasi produk berbasis minat dan profil belajar dengan satu rubrik kriteria inti menjamin keadilan penilaian sekaligus memicu antusiasme kelas.',
      },
      {
        id: 'opt-sim2-hafalan',
        approachType: 'Konten',
        title: 'Tugas Merangkum Buku Paket & Ujian Isian Tunggal',
        actionSummary:
          'Semua siswa menyalin bagan siklus air dari buku paket ke buku tulis lalu mengikuti tes isian singkat definisi istilah ilmiah.',
        isOptimal: false,
        effectivenessScore: 52,
        studentImpact: {
          perluBimbingan: 'Menghafal kata asing tanpa paham proses fisis perubahan wujud air.',
          cakap: 'Cenderung bosan menyalin teks yang sama persis dari buku.',
          mahir: 'Tidak mendapat ruang mengeksplorasi dampak ekologis penebangan hutan.',
        },
        pedagogicalFeedback:
          'Tugas menyalin dan tes hafalan tunggal gagal menangkap keragaman kekuatan siswa dan hanya mengukur daya ingat jangka pendek.',
      },
      {
        id: 'opt-sim2-proses',
        approachType: 'Proses',
        title: 'Eksperimen Kelompok Besar Tanpa Pembagian Peran',
        actionSummary:
          'Membagi kelas menjadi 2 kelompok besar (14 siswa per kelompok) untuk melihat satu percobaan gelas air panas.',
        isOptimal: false,
        effectivenessScore: 58,
        studentImpact: {
          perluBimbingan: 'Tidak kebagian melihat dari dekat dan hanya menonton dari barisan belakang.',
          cakap: 'Hanya 2–3 anak dominan yang aktif mencatat hasil pengamatan.',
          mahir: 'Kurang tertantang karena tidak ada pertanyaan analisis lanjutan.',
        },
        pedagogicalFeedback:
          'Kelompok yang terlalu besar tanpa peran terstruktur membuat siswa pasif dan kurang efektif memfasilitasi perbedaan kebutuhan belajar.',
      },
    ],
  },
  {
    id: 'sim-membaca-2',
    kelas: 'Kelas 2 SD',
    mataPelajaran: 'Bahasa Indonesia',
    topik: 'Memahami Isi Bacaan Cerita Fabel Pendek',
    classroomContext:
      'Kemampuan membaca siswa kelas II bervariasi mulai dari yang masih mengeja suku kata hingga yang sudah membaca lancar dan gemar menulis ulang cerita.',
    challenge:
      'Bagaimana mengelola kegiatan membaca agar siswa yang masih mengeja tidak minder dan siswa yang sudah lancar tetap terstimulasi?',
    studentGroups: {
      perluBimbingan: '9 siswa masih membaca terbata-bata pada kata berakhiran konsonan.',
      cakap: '13 siswa lancar membaca kalimat pendek dan memahami tokoh cerita.',
      mahir: '6 siswa mampu membaca cepat serta menyimpulkan pesan moral cerita.',
    },
    options: [
      {
        id: 'opt-sim3-konten',
        approachType: 'Konten',
        title: 'Teks Bacaan Berjenjang (3 Level) & Pojok Baca Terpandu',
        actionSummary:
          'Menyediakan cerita fabel yang sama dalam 3 versi panjang teks & ukuran huruf; guru mendampingi kelompok mengeja di sudut baca selama 12 menit sementara kelompok lain berdiskusi berpasangan.',
        isOptimal: true,
        effectivenessScore: 94,
        studentImpact: {
          perluBimbingan: 'Percaya diri membaca teks berkalimat pendek dengan dukungan ilustrasi penuh dan bimbingan hangat guru.',
          cakap: 'Aktif mengurutkan kejadian cerita bersama teman sebaya.',
          mahir: 'Menulis alternatif akhir cerita dari sudut pandang tokoh lain.',
        },
        pedagogicalFeedback:
          'Tepat sekali! Teks berjenjang dengan tema cerita yang sama menjaga rasa kebersamaan kelas sekaligus memberi dukungan tepat bagi pembaca pemula.',
      },
      {
        id: 'opt-sim3-giliran',
        approachType: 'Proses',
        title: 'Membaca Nyaring Bergiliran Satu Kelas (Round Robin)',
        actionSummary:
          'Meminta setiap siswa membaca satu paragraf keras-keras di depan seluruh kelas secara bergantian dari satu teks buku paket.',
        isOptimal: false,
        effectivenessScore: 41,
        studentImpact: {
          perluBimbingan: 'Merasa cemas dan malu saat tersendat di depan teman-temannya.',
          cakap: 'Kehilangan fokus menyimak karena hanya menunggu gilirannya sendiri.',
          mahir: 'Merasa tempo membaca kelas terlalu lambat.',
        },
        pedagogicalFeedback:
          'Membaca bergiliran di depan kelas kurang ramah secara emosional bagi pembaca pemula SD dan tidak efektif melatih pemahaman bacaan.',
      },
      {
        id: 'opt-sim3-audio',
        approachType: 'Konten',
        title: 'Guru Membacakan Seluruh Teks Tanpa Latihan Membaca Mandiri',
        actionSummary:
          'Guru membacakan seluruh cerita dari awal hingga akhir lalu langsung memberi pertanyaan lisan kepada seluruh kelas.',
        isOptimal: false,
        effectivenessScore: 60,
        studentImpact: {
          perluBimbingan: 'Paham isi cerita secara lisan, namun keterampilan membaca mandiri tidak terlatih.',
          cakap: 'Kurang mendapat kesempatan berlatih kelancaran membaca.',
          mahir: 'Tidak mendapat tantangan literasi tingkat lanjut.',
        },
        pedagogicalFeedback:
          'Membacakan nyaring baik untuk apersepsi, tetapi perlu dilanjutkan dengan teks berjenjang agar kemampuan membaca tiap siswa tetap berkembang.',
      },
    ],
  },
];

export const EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 'eval-1',
    category: 'Konsep Dasar',
    question:
      'Apa tujuan utama penerapan pembelajaran berdiferensiasi di sekolah dasar?',
    options: [
      'Mengelompokkan siswa pintar dan kurang pintar di kelas terpisah permanen',
      'Memenuhi kebutuhan belajar setiap siswa agar dapat bertumbuh optimal mencapai tujuan pembelajaran',
      'Mengurangi jam pelajaran guru dengan memberi tugas rumah berbeda',
      'Menghilangkan asesmen sumatif di akhir semester',
    ],
    correctIndex: 1,
    explanation:
      'Pembelajaran berdiferensiasi bertujuan memfasilitasi perbedaan kesiapan, minat, dan profil belajar agar setiap anak berkembang optimal menuju capaian pembelajaran.',
  },
  {
    id: 'eval-2',
    category: 'Pemetaan Kebutuhan',
    question:
      'Tiga aspek kebutuhan belajar siswa menurut Carol Ann Tomlinson yang menjadi acuan guru adalah...',
    options: [
      'Usia, tinggi badan, dan latar belakang ekonomi',
      'Kesiapan belajar, minat belajar, dan profil belajar siswa',
      'Nilai rapor semester lalu, absensi, dan kecepatan menulis',
      'Gaya bicara, jumlah teman dekat, dan warna kesukaan',
    ],
    correctIndex: 1,
    explanation:
      'Pemetaan diferensiasi berfokus pada Kesiapan Belajar (Readiness), Minat (Interest), dan Profil Belajar (Learning Profile).',
  },
  {
    id: 'eval-3',
    category: 'Jenis Diferensiasi',
    question:
      'Bu Sari menyediakan bacaan bertingkat, kartu gambar, serta rekaman audio cerita untuk topik yang sama di kelas 3 SD. Strategi ini termasuk...',
    options: [
      'Diferensiasi Konten',
      'Diferensiasi Proses',
      'Diferensiasi Produk',
      'Diferensiasi Lingkungan Fisik',
    ],
    correctIndex: 0,
    explanation:
      'Menyediakan ragam sumber dan format materi yang dipelajari siswa merupakan bentuk Diferensiasi Konten.',
  },
  {
    id: 'eval-4',
    category: 'Diferensiasi Proses',
    question:
      'Manakah aktivitas berikut yang merupakan contoh nyata Diferensiasi Proses di kelas SD?',
    options: [
      'Mengubah judul mata pelajaran di rapor',
      'Menyediakan stasiun belajar dan pendampingan terfokus (scaffolding) sesuai tingkat kesiapan kelompok',
      'Meminta semua siswa mengumpulkan laporan dalam format makalah yang sama',
      'Memberikan hukuman tambahan bagi siswa yang belum paham',
    ],
    correctIndex: 1,
    explanation:
      'Diferensiasi Proses berkaitan dengan bagaimana siswa memaknai dan berlatih konsep, termasuk melalui stasiun belajar dan scaffolding.',
  },
  {
    id: 'eval-5',
    category: 'Diferensiasi Produk',
    question:
      'Saat menerapkan Diferensiasi Produk, hal penting apa yang harus tetap dijaga guru agar penilaian adil?',
    options: [
      'Semua siswa wajib membuat video berdurasi sama',
      'Rubrik penilaian tetap mengacu pada penguasaan konsep inti dan tujuan pembelajaran yang sama',
      'Siswa yang memilih poster otomatis mendapat nilai lebih tinggi dari presentasi lisan',
      'Guru tidak perlu membuat kriteria penilaian',
    ],
    correctIndex: 1,
    explanation:
      'Meskipun bentuk produk beragam (poster, lisan, model 3D), rubrik penilaian harus tetap konsisten mengukur ketercapaian kompetensi inti.',
  },
  {
    id: 'eval-6',
    category: 'Asesmen Diagnostik',
    question:
      'Kapan waktu terbaik melaksanakan asesmen diagnostik kognitif ringan sebelum mengajar topik baru?',
    options: [
      'Setelah ujian akhir semester selesai',
      'Di awal unit atau beberapa menit sebelum kegiatan inti agar strategi belajar bisa disesuaikan',
      'Hanya dilakukan satu kali saat penerimaan siswa baru',
      'Saat pembagian rapor kenaikan kelas',
    ],
    correctIndex: 1,
    explanation:
      'Asesmen diagnostik awal dilakukan sebelum materi inti dimulai sehingga hasilnya langsung dipakai untuk menyesuaikan konten dan proses.',
  },
  {
    id: 'eval-7',
    category: 'Pengelolaan Kelas',
    question:
      'Mengapa pengelompokan siswa dalam pembelajaran berdiferensiasi disebut pengelompokan fleksibel?',
    options: [
      'Karena posisi meja harus selalu melingkar setiap hari',
      'Karena komposisi kelompok berubah mengikuti kesiapan dan minat siswa pada masing-masing topik',
      'Karena siswa bebas pindah ke kelas lain',
      'Karena guru tidak perlu mencatat kemajuan siswa',
    ],
    correctIndex: 1,
    explanation:
      'Pengelompokan fleksibel berubah-ubah secara dinamis bergantung pada kebutuhan siswa di setiap materi, sehingga menghindari pelabelan permanen.',
  },
  {
    id: 'eval-8',
    category: 'Praktik SD',
    question:
      'Di kelas 1 SD, ada 5 siswa belum lancar mengenal huruf dan 6 siswa sudah lancar membaca kalimat. Langkah paling bijak guru adalah...',
    options: [
      'Mengajar dengan kecepatan sedang dan mengabaikan kedua kelompok ekstrem tersebut',
      'Memberi kartu suku kata bergambar dengan bimbingan singkat pada 5 siswa dan buku cerita mini pada 6 siswa mahir',
      'Meminta 5 siswa tersebut tidak mengikuti pelajaran Bahasa Indonesia',
      'Memberi PR menyalin 10 halaman bagi siswa yang belum lancar',
    ],
    correctIndex: 1,
    explanation:
      'Memberikan kartu suku kata bergambar + scaffolding untuk pembaca pemula sekaligus pengayaan bacaan mini untuk siswa mahir adalah praktik diferensiasi yang inklusif.',
  },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Ibu Ratna Sari, S.Pd.',
    role: 'Guru Kelas 4',
    school: 'SDN 03 Menteng, Jakarta',
    category: 'Strategi Konten',
    title: 'Trik Kartu Pecahan Lipat untuk Siswa Kelas 4 yang Masih Tertukar Penyebut',
    content:
      'Minggu ini saya coba membagi konten Matematika materi pecahan senilai memakai potongan kertas warna-warni untuk kelompok yang butuh bimbingan konkret. Hasilnya anak-anak langsung paham mengapa 1/2 sama dengan 2/4 tanpa perlu menghafal rumus perkalian silang dulu!',
    createdAt: '2 jam lalu',
    likes: 18,
    replies: [
      {
        id: 'rep-1',
        author: 'Pak Hendra Wijaya, M.Pd.',
        school: 'SDN 12 Sukajadi, Bandung',
        createdAt: '1 jam lalu',
        content:
          'Setuju sekali Bu Ratna! Di kelas saya juga memakai piring kertas yang digunting seperti pizza, anak-anak jauh lebih antusias.',
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Pak Hendra Wijaya, M.Pd.',
    role: 'Guru Kelas 5',
    school: 'SDN 12 Sukajadi, Bandung',
    category: 'Manajemen Kelas',
    title: 'Mengatur Waktu Stasiun Belajar di Kelas Berisi 32 Siswa SD',
    content:
      'Awalnya saya kewalahan saat siswa berpindah antar 3 pos belajar. Kuncinya ternyata memakai pengatur waktu visual di proyektor (12 menit per pos) dan kartu aturan "Tanya 2 Teman Sebelum Angkat Tangan". Suasana kelas jauh lebih tertib dan saya leluasa membimbing kelompok yang perlu perhatian.',
    createdAt: 'Kemarin',
    likes: 24,
    replies: [],
  },
  {
    id: 'post-3',
    author: 'Ibu Dewi Lestari, S.Pd.SD',
    role: 'Guru Kelas 2',
    school: 'SD Muhammadiyah Sleman',
    category: 'Asesmen Diagnostik',
    title: 'Cek Kesiapan Pagi Pakai Kartu Warna Merah-Kuning-Hijau',
    content:
      'Untuk anak kelas rendah (kelas 1–2 SD), kuesioner tertulis terlalu lama. Saya tempel 3 gelas warna di sudut meja saat masuk kelas. Anak menaruh stik nama sesuai rasa percaya dirinya pada materi hari itu. Praktis sekali dan anak merasa senang!',
    createdAt: '3 hari lalu',
    likes: 31,
    replies: [
      {
        id: 'rep-2',
        author: 'Ibu Siti Rahmawati',
        school: 'SDN 07 Harapan Baru',
        createdAt: '2 hari lalu',
        content:
          'Ide gelas warna dan stik nama sangat ramah anak SD kelas rendah. Izin saya adaptasi untuk hari Senin nanti, Bu!',
      },
    ],
  },
];

export const DEFAULT_TEACHER_PROFILE: TeacherProfile = {
  name: 'Ibu Siti Rahmawati, S.Pd.',
  nipOrId: '199104152019032008',
  school: 'SD Negeri 07 Harapan Baru',
  gradeTaught: 'Guru Kelas 4 SD',
  bio: 'Pendidik sekolah dasar yang berfokus menciptakan ruang belajar ramah anak, inklusif, dan bermakna melalui pendekatan pembelajaran berdiferensiasi.',
};

export * from './extendedContent';

