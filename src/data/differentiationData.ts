export type PillarType = 'konten' | 'proses' | 'produk';

export interface QuizQuestion {
  id: string;
  pillar: PillarType;
  gradeLevel: string;
  subject: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isMisconception: boolean;
    explanation: string;
  }[];
}

export interface ConceptCard {
  id: string;
  pillar: PillarType;
  title: string;
  tagline: string;
  misconception: {
    description: string;
    example: string;
    whyWrong: string;
  };
  trueDifferentiation: {
    description: string;
    example: string;
    pedagogicalBenefit: string;
  };
  keyTakeaway: string;
}

export interface SimulationStep {
  stage: number;
  stageTitle: string;
  context: string;
  studentProfiles: {
    name: string;
    readiness: string;
    description: string;
  }[];
  challenge: string;
  choices: {
    id: string;
    label: string;
    action: string;
    consequence: string;
    feedback: string;
    isOptimal: boolean;
    pillarFocus: PillarType;
  }[];
}

export const DIAGNOSTIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 'diag-1',
    pillar: 'konten',
    gradeLevel: 'Kelas 4 SD',
    subject: 'IPAS (Bagian Tubuh Tumbuhan)',
    scenario: 'Ibu Rahma mengajar materi bagian tubuh tumbuhan dan fungsinya. Di kelasnya, terdapat siswa yang belum lancar membaca, siswa yang menyukai observasi langsung, dan siswa yang sudah membaca buku sains tingkat lanjut.',
    question: 'Strategi diferensiasi KONTEN manakah yang paling tepat diterapkan oleh Ibu Rahma?',
    options: [
      {
        id: 'a',
        text: 'Menyediakan materi pembelajaran dalam beragam bentuk: spesimen tumbuhan asli di pot, kartu bergambar berlabel ringkas, dan artikel bacaan bergambar dengan audio.',
        isMisconception: false,
        explanation: 'Tepat! Diferensiasi konten berfokus pada variasi cara murid mengakses konsep yang sama sesuai kesiapan membaca dan modalitas belajar, tanpa menurunkan tujuan pembelajaran inti.'
      },
      {
        id: 'b',
        text: 'Mengubah materi untuk kelompok siswa yang belum lancar membaca menjadi hanya mewarnai gambar buah, bukan mempelajari fungsi bagian tumbuhan.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Mengganti topik esensial atau menurunkan tujuan inti bukanlah diferensiasi konten, melainkan menurunkan ekspektasi akademik secara tidak proporsional.'
      },
      {
        id: 'c',
        text: 'Memberikan teks bacaan panjang yang sama kepada seluruh siswa, lalu meminta siswa yang pandai untuk membacakan keras-keras di depan kelas.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Cara ini tidak membedakan akses materi dan dapat membuat siswa yang lambat membaca merasa terasing atau kehilangan motivasi mandiri.'
      }
    ]
  },
  {
    id: 'diag-2',
    pillar: 'konten',
    gradeLevel: 'Kelas 3 SD',
    subject: 'Matematika (Konsep Perkalian)',
    scenario: 'Pak Budi menyadari ada 8 murid yang masih bingung konsep perkalian sebagai penjumlahan berulang, sementara 10 murid lainnya sudah lancar perkalian 1-10.',
    question: 'Tindakan diferensiasi KONTEN yang akurat untuk kelompok tersebut adalah:',
    options: [
      {
        id: 'a',
        text: 'Memberi 100 lembar soal perkalian angka besar kepada murid yang sudah lancar agar mereka sibuk sendiri selama jam pelajaran.',
        isMisconception: true,
        explanation: 'Miskonsepsi umum! Memberikan beban kuantitas soal ekstra semata-mata sebagai "pengisi waktu" bukan diferensiasi yang bermakna bagi kesiapan belajar.'
      },
      {
        id: 'b',
        text: 'Menyediakan konten representasi berjenjang: benda konkret (biji/stik es krim) untuk murid yang belum paham, diagram larik/grid titik untuk tahap transisi, dan soal pemecahan masalah kontekstual untuk yang sudah lancar.',
        isMisconception: false,
        explanation: 'Tepat! Diferensiasi konten memfasilitasi abstraksi materi dari konkret, semi-konkret, hingga abstrak dengan tujuan pemahaman konsep perkalian yang sama.'
      },
      {
        id: 'c',
        text: 'Meminta kelompok yang belum paham belajar sendiri di pojok kelas dengan buku paket lama.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Membiarkan murid yang membutuhkan dukungan dasar tanpa scaffolding materi terarah justru memperlebar kesenjangan capaian.'
      }
    ]
  },
  {
    id: 'diag-3',
    pillar: 'proses',
    gradeLevel: 'Kelas 5 SD',
    subject: 'Bahasa Indonesia (Menulis Teks Eksplanasi)',
    scenario: 'Ibu Ratna ingin siswa menulis tentang siklus air. Kesiapan menulis siswa bervariasi: ada yang kesulitan menyusun kalimat efektif, ada pula yang sudah mahir merangkai paragraf.',
    question: 'Manakah bentuk diferensiasi PROSES yang tepat untuk kegiatan ini?',
    options: [
      {
        id: 'a',
        text: 'Memberikan bimbingan terstruktur (scaffolding): kelompok pemula diberikan panduan templat kalimat rumpang, kelompok menengah diberikan peta pikiran (mind map), dan kelompok mandiri langsung menyusun esai bebas.',
        isMisconception: false,
        explanation: 'Tepat! Diferensiasi proses mengatur bagaimana murid mengolah ide dan berlatih melalui tingkat pendampingan (scaffolding) yang disesuaikan kesiapannya.'
      },
      {
        id: 'b',
        text: 'Menyuruh siswa menulis teks eksplanasi secara serentak tanpa panduan, dan siapa yang selesai tercepat mendapat nilai 100.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Ini adalah instruksi satu ukuran untuk semua (one-size-fits-all) dengan penekanan keliru pada kecepatan waktu, bukan proses pemahaman bernalar.'
      },
      {
        id: 'c',
        text: 'Memisahkan siswa berdasarkan gender (kelompok laki-laki dan perempuan) dengan tugas aktivitas yang persis sama.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Diferensiasi harus didasarkan pada data asesmen diagnostik (kesiapan, minat, profil belajar), bukan pengelompokan sembarangan tanpa dasar pedagogis.'
      }
    ]
  },
  {
    id: 'diag-4',
    pillar: 'proses',
    gradeLevel: 'Kelas 2 SD',
    subject: 'Matematika (Pengukuran Panjang)',
    scenario: 'Pak Doni mengajarkan cara mengukur panjang meja kelas. Murid memiliki cara belajar yang berbeda: beberapa murid perlu bergerak aktif menyentuh benda, beberapa senang berdiskusi pasangan.',
    question: 'Bagaimana Pak Doni menerapkan diferensiasi PROSES yang bermakna?',
    options: [
      {
        id: 'a',
        text: 'Mengharuskan semua murid duduk tenang di kursi masing-masing dan hanya mencatat ukuran yang dituliskan guru di papan tulis.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Proses pasif menghilangkan kesempatan murid mengalami pengalaman manipulatif indrawi yang sangat vital di fase fondasi kelas rendah.'
      },
      {
        id: 'b',
        text: 'Menyediakan stasiun belajar (*learning stations*): stasiun eksplorasi pengukuran fisik menggunakan jengkal/pita ukur, stasiun diskusi pasangan mengestimasi, dan meja bimbingan intensif bersama guru.',
        isMisconception: false,
        explanation: 'Tepat! Memvariasikan alur aktivitas melalui stasiun belajar dan pendampingan bertingkat merupakan wujud diferensiasi proses yang efektif.'
      },
      {
        id: 'c',
        text: 'Menginstruksikan siswa belajar sendiri tanpa instruksi atau rubrik tahapan aktivitas sama sekali.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Diferensiasi bukan belajar kacau tanpa arah (*chaotic freedom*); guru tetap memegang peranan fasilitator dengan alur aktivitas terencana.'
      }
    ]
  },
  {
    id: 'diag-5',
    pillar: 'produk',
    gradeLevel: 'Kelas 4 SD',
    subject: 'IPAS (Kearifan Lokal Daerahku)',
    scenario: 'Ibu Ningsih ingin mengevaluasi pemahaman murid mengenai kearifan lokal di daerah mereka setelah pembelajaran tema sosial budaya.',
    question: 'Wujud penerapan diferensiasi PRODUK yang autentik dan adil adalah:',
    options: [
      {
        id: 'a',
        text: 'Memberikan kebebasan pilihan bentuk ekspresi pemahaman: membuat komik mini, rekaman wawancara audio, atau presentasi poster mini, yang dinilai dengan RUBRIK kriteria substansi yang sama.',
        isMisconception: false,
        explanation: 'Tepat! Diferensiasi produk memberikan variasi media unjuk kerja murid untuk mendemonstrasikan pemahaman materi, diikat oleh rubrik penilaian kriteria esensial yang sama.'
      },
      {
        id: 'b',
        text: 'Membebaskan siswa membuat apa saja tanpa rubrik penilaian, dan menilai hanya berdasarkan keindahan warna atau hiasan karyanya.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Tanpa rubrik berbasis tujuan pembelajaran, penilaian menjadi bias pada estetika/modal ekonomi murid daripada pemahaman konsep kearifan lokal.'
      },
      {
        id: 'c',
        text: 'Mewajibkan semua siswa membuat video animasi digital tingkat lanjut meskipun sebagian siswa tidak memiliki akses komputer di rumah.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Menyeragamkan produk dengan medium teknologi tinggi tanpa mempertimbangkan aksesitas justru menciptakan ketidakadilan belajar.'
      }
    ]
  },
  {
    id: 'diag-6',
    pillar: 'produk',
    gradeLevel: 'Kelas 6 SD',
    subject: 'Matematika (Pengolahan Data & Diagram)',
    scenario: 'Pak Hendra menilai kemampuan analisis diagram data siswa. Siswa telah mengumpulkan data hobi di lingkungan sekolah.',
    question: 'Manakah diferensiasi PRODUK yang paling mencerminkan prinsip keadilan pedagogis?',
    options: [
      {
        id: 'a',
        text: 'Meminta siswa pintar menggambar 5 diagram, sedangkan siswa yang lemah cukup menggambar 1 diagram tanpa menjelaskan artinya.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Kuantitas tugas bukanlah pembeda kualitas produk. Siswa yang membutuhkan bimbingan tetap perlu mendemonstrasikan pemahaman analisis data.'
      },
      {
        id: 'b',
        text: 'Memberikan opsi produk unjuk kerja: laporan tertulis dengan diagram manual, infografis digital sederhana, atau presentasi lisan dengan diagram batang berukuran besar, semuanya memuat unsur penarikan kesimpulan data.',
        isMisconception: false,
        explanation: 'Tepat! Semua variasi produk tetap menuntut capaian kompetensi utama (penarikan kesimpulan data) melalui sarana ekspresi yang memberdayakan murid.'
      },
      {
        id: 'c',
        text: 'Menilai produk hanya berdasarkan siapa yang mengumpulkan paling cepat di meja guru.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Kecepatan menyetor tugas tidak merefleksikan kedalaman penguasaan kompetensi analisis data.'
      }
    ]
  }
];

export const POST_TEST_QUESTIONS: QuizQuestion[] = [
  {
    id: 'post-1',
    pillar: 'konten',
    gradeLevel: 'Kelas 5 SD',
    subject: 'IPAS (Ekosistem dan Jaring Makanan)',
    scenario: 'Guru ingin mengajarkan konsep rantai makanan di hutan bakau. Kesiapan literasi murid bervariasi.',
    question: 'Tindakan diferensiasi KONTEN yang tepat sasaran adalah:',
    options: [
      {
        id: 'a',
        text: 'Menyediakan infografis bersuara, diorama visual mini rantai makanan, dan artikel teks berjenjang dengan kosakata terpandu untuk tujuan konsep rantai makanan yang sama.',
        isMisconception: false,
        explanation: 'Tepat! Memvariasikan format aksesibilitas konten tanpa mereduksi konsep esensial jaring makanan.'
      },
      {
        id: 'b',
        text: 'Murid yang belum fasih membaca disuruh menyapu kelas saja daripada pusing belajar ekosistem.',
        isMisconception: true,
        explanation: 'Miskonsepsi fatal! Setiap murid berhak atas akses konten pembelajaran yang bermartabat.'
      },
      {
        id: 'c',
        text: 'Hanya menggunakan satu buku paket tebal dan menyalahkan murid yang tidak paham.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Guru yang berdiferensiasi proaktif merancang variasi materi belajar.'
      }
    ]
  },
  {
    id: 'post-2',
    pillar: 'konten',
    gradeLevel: 'Kelas 4 SD',
    subject: 'Matematika (Keliling & Luas Bangun Datar)',
    scenario: 'Siswa kelas 4 memiliki pemahaman konsep keliling persegi yang beragam.',
    question: 'Strategi diferensiasi KONTEN yang tepat adalah:',
    options: [
      {
        id: 'a',
        text: 'Menyediakan kartu berpola grid kotak petak satuan bagi murid tahap visual, tali/bingkai riil bagi tahap konkret, dan rumus simbolik bagi tahap penalaran abstrak.',
        isMisconception: false,
        explanation: 'Tepat! Mengembangkan variasi jembatan representasi konten dari konkret menuju simbolik.'
      },
      {
        id: 'b',
        text: 'Menghukum murid yang belum hafal rumus matematika di depan kelas.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Menghafal rumus tanpa pemahaman konsep bukan prinsip diferensiasi.'
      },
      {
        id: 'c',
        text: 'Memberi soal yang sama persis sebanyak 50 butir tanpa pendampingan media.',
        isMisconception: true,
        explanation: 'Miskonsepsi kuantitas beban mekanis yang melelahkan murid.'
      }
    ]
  },
  {
    id: 'post-3',
    pillar: 'proses',
    gradeLevel: 'Kelas 3 SD',
    subject: 'Bahasa Indonesia (Menceritakan Kembali Dongeng)',
    scenario: 'Siswa diminta menceritakan kembali isi dongeng nusantara yang telah disimak.',
    question: 'Diferensiasi PROSES diterapkan ketika guru:',
    options: [
      {
        id: 'a',
        text: 'Menyediakan alur bantuan berbeda: kartu kartu urutan gambar cerita untuk murid pemula, peta alur tokoh untuk murid menengah, dan pemantik pertanyaan reflektif untuk murid mandiri.',
        isMisconception: false,
        explanation: 'Tepat! Scaffolding proses mengolah memori dan jalan cerita secara berjenjang.'
      },
      {
        id: 'b',
        text: 'Meminta semua murid menceritakan secara seragam tanpa bantuan apapun dalam waktu 1 menit.',
        isMisconception: true,
        explanation: 'Miskonsepsi penyeragaman proses yang membebani siswa yang lambat memproses verbal.'
      },
      {
        id: 'c',
        text: 'Membiarkan siswa yang kesulitan tidur di kelas.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Guru wajib mendampingi proses belajar setiap peserta didik.'
      }
    ]
  },
  {
    id: 'post-4',
    pillar: 'proses',
    gradeLevel: 'Kelas 5 SD',
    subject: 'Matematika (Pecahan Senilai)',
    scenario: 'Siswa mempelajari pecahan senilai 1/2, 2/4, dan 4/8.',
    question: 'Bentuk diferensiasi PROSES yang interaktif adalah:',
    options: [
      {
        id: 'a',
        text: 'Membagi kegiatan dalam kelompok aktivitas bertingkat: kelompok manipulatif melipat kertas origami berwarna, kelompok investigasi garis bilangan, dan meja klinik bimbingan langsung guru.',
        isMisconception: false,
        explanation: 'Tepat! Diferensiasi proses melalui ragam cara berlatih dan interaksi bimbingan pendidik.'
      },
      {
        id: 'b',
        text: 'Menyalin rumus dari papan tulis sebanyak 3 lembar folio bergaris.',
        isMisconception: true,
        explanation: 'Miskonsepsi tugas menyalin pasif tanpa aktivitas bernalar.'
      },
      {
        id: 'c',
        text: 'Semua siswa mengerjakan soal pilihan ganda di buku LKS secara hening tanpa interaksi.',
        isMisconception: true,
        explanation: 'Miskonsepsi penyeragaman tanpa pemenuhan ragam gaya proses belajar.'
      }
    ]
  },
  {
    id: 'post-5',
    pillar: 'produk',
    gradeLevel: 'Kelas 4 SD',
    subject: 'Seni Rupa & Budaya (Pola Ragam Hias Tradisional)',
    scenario: 'Sebagai asesmen akhir materi motif hias daerah.',
    question: 'Wujud diferensiasi PRODUK yang adil adalah:',
    options: [
      {
        id: 'a',
        text: 'Memperbolehkan siswa memilih media unjuk pemahaman: gambar di buku gambar, kreasi batik jumputan di kain perca, atau relief plastisin, dengan rubrik penilaian kesesuaian pola dan ketelitian yang sama.',
        isMisconception: false,
        explanation: 'Tepat! Variasi produk karya yang diikat oleh tolok ukur kompetensi rubrik yang setara.'
      },
      {
        id: 'b',
        text: 'Hanya memberi nilai 100 kepada siswa yang membeli bahan kain sutra mahal.',
        isMisconception: true,
        explanation: 'Miskonsepsi diskriminasi ekonomi dalam penilaian unjuk kerja murid.'
      },
      {
        id: 'c',
        text: 'Mengharuskan semua siswa membuat patung batu pahatan tanpa memikirkan tingkat keselamatan anak usia SD.',
        isMisconception: true,
        explanation: 'Miskonsepsi penyeragaman yang tidak sesuai tahap perkembangan usia peserta didik.'
      }
    ]
  },
  {
    id: 'post-6',
    pillar: 'produk',
    gradeLevel: 'Kelas 6 SD',
    subject: 'IPAS (Tata Surya dan Karakteristik Planet)',
    scenario: 'Menilai pemahaman siswa tentang orbit dan karakteristik planet tata surya.',
    question: 'Penerapan diferensiasi PRODUK yang berorientasi kompetensi adalah:',
    options: [
      {
        id: 'a',
        text: 'Siswa dapat memilih mempresentasikan hasil penemuannya lewat model 3D barang bekas, podcast rekaman narasi penjelasan, atau buklet flip-book informasi, dengan rubrik penilaian akurasi data planet yang seragam.',
        isMisconception: false,
        explanation: 'Tepat! Fleksibilitas media produk memfasilitasi minat tanpa mengorbankan standar kedalaman materi sains.'
      },
      {
        id: 'b',
        text: 'Hanya meminta tes hafalan pilihan ganda 10 butir tanpa ada produk aplikasi pemikiran murid.',
        isMisconception: true,
        explanation: 'Kurang autentik dan meniadakan ruang diferensiasi produk ekspresi pemahaman.'
      },
      {
        id: 'c',
        text: 'Menyuruh siswa membeli model planet plastik jadi di toko buku lalu menilainya.',
        isMisconception: true,
        explanation: 'Miskonsepsi! Produk harus merupakan hasil unjuk kerja pemikiran dan proses murid sendiri.'
      }
    ]
  }
];

export const CONCEPT_CARDS: ConceptCard[] = [
  {
    id: 'card-konten-1',
    pillar: 'konten',
    title: 'Diferensiasi Konten',
    tagline: 'Membedakan Akses Materi, BUKAN Menurunkan Tujuan Pembelajaran',
    misconception: {
      description: 'Menganggap diferensiasi konten adalah mengganti tujuan materi atau memberikan materi kelas 1 untuk murid kelas 4 yang lambat belajar tanpa jembatan konsep.',
      example: 'Murid yang belum lancar membaca disuruh mewarnai saja, sementara murid lain belajar siklus rantai makanan.',
      whyWrong: 'Menghalangi hak murid untuk mempelajari Capaian Pembelajaran (CP) yang sama dan menciptakan segregasi kelas yang merugikan perkembangan kognitif anak.'
    },
    trueDifferentiation: {
      description: 'Menyediakan variasi jalur masuk informasi (audio, visual, taktil, teks berjenjang) untuk mencapai tujuan kompetensi inti yang sama.',
      example: 'Topik siklus rantai makanan disajikan lewat spesimen tiruan konkret, video narasi bersuara, dan teks bacaan infografis sederhana dengan glosarium.',
      pedagogicalBenefit: 'Semua anak memahami esensi rantai makanan sesuai kesiapan membaca dan modalitas sensori mereka masing-masing.'
    },
    keyTakeaway: 'Konten adalah "APA yang dipelajari dan BAGAIMANA murid mengakses informasi", bukan menurunkan standar kompetensi esensial.'
  },
  {
    id: 'card-proses-1',
    pillar: 'proses',
    title: 'Diferensiasi Proses',
    tagline: 'Tingkat Dukungan (Scaffolding) Bertingkat, BUKAN Memberi Tugas Ekstra Tanpa Makna',
    misconception: {
      description: 'Memberikan lembar kerja (LKS) lebih banyak kepada siswa cepat selesai, atau membiarkan siswa bekerja tanpa bimbingan.',
      example: 'Siswa cepat disuruh mengerjakan 20 soal tambahan agar tidak ribut di kelas, sementara siswa lambat ditinggal tanpa arahan bertahap.',
      whyWrong: 'Siswa berprestasi merasa "dihukum" dengan tumpukan soal mekanis, sedangkan siswa lambat merasa frustrasi karena tidak mendapatkan scaffolding.'
    },
    trueDifferentiation: {
      description: 'Memvariasikan strategi pendampingan, pemodelan bertahap (I Do, We Do, You Do), stasiun belajar, dan tingkat kemandirian kelompok.',
      example: 'Kelompok pemula mendapat panduan langkah terstruktur langsung bersama guru; kelompok mahir diberi tantangan pemecahan masalah terbuka dan peran tutor sebaya.',
      pedagogicalBenefit: 'Setiap siswa berada dalam Zone of Proximal Development (ZPD) mereka secara optimal dan bermakna.'
    },
    keyTakeaway: 'Proses adalah "BAGAIMANA murid memaknai dan mengolah informasi", bukan sekadar beban kuantitas latihan soal.'
  },
  {
    id: 'card-produk-1',
    pillar: 'produk',
    title: 'Diferensiasi Produk',
    tagline: 'Ragam Media Unjuk Kerja, DIKAWAL OLEH Rubrik Kriteria yang Jelas',
    misconception: {
      description: 'Mengira diferensiasi produk berarti membebaskan siswa tanpa aturan penilaian, atau hanya menilai estetika dan hiasan mahal.',
      example: 'Siswa dibebaskan membuat karya apapun tanpa rubrik penilaian kompetensi, dan guru memberi nilai tinggi hanya pada karya yang paling gemerlap.',
      whyWrong: 'Penilaian menjadi bias pada kekayaan materi keluarga atau keterampilan seni rupa semata, mengabaikan penguasaan kompetensi akademik yang sebenarnya diukur.'
    },
    trueDifferentiation: {
      description: 'Memberikan pilihan bentuk karya atau unjuk performa (misal tulisan, rekaman lisan, infografis, peragaan) dengan rubrik substansi konten yang sama.',
      example: 'Materi siklus air dinilai menggunakan rubrik (kejelasan tahapan evaporasi, kondensasi, presipitasi), baik disajikan dalam bentuk poster, drama singkat, atau rekaman siniar.',
      pedagogicalBenefit: 'Murid dapat merayakan minat dan kekuatan ekspresinya tanpa mengurangi objektivitas evaluasi ketercapaian tujuan pembelajaran.'
    },
    keyTakeaway: 'Produk adalah "BUKTI HASIL BELAJAR yang ditunjukkan murid", harus selalu berakar pada kriteria rubrik tujuan pembelajaran yang sama.'
  }
];

export const SIMULATION_DATA: SimulationStep[] = [
  {
    stage: 1,
    stageTitle: 'Tahap 1: Memetakan Kesiapan Belajar & Memilih Materi (Konten)',
    context: 'Anda mengajar Matematika Kelas 4 SD materi "Pecahan Senilai". Setelah asesmen awal 5 menit, Anda menemukan kondisi berikut:',
    studentProfiles: [
      {
        name: 'Kelompok A (Kesiapan Rendah - 6 Siswa)',
        readiness: 'Konkret',
        description: 'Belum memahami makna pecahan sebagai bagian dari satu keutuhan; masih bingung membedakan pembilang dan penyebut.'
      },
      {
        name: 'Kelompok B (Kesiapan Sedang - 16 Siswa)',
        readiness: 'Semi-Konkret / Gambar',
        description: 'Memahami pecahan lewat gambar arsiran lingkaran/persegi, tetapi masih ragu menemukan hubungan pecahan senilai.'
      },
      {
        name: 'Kelompok C (Kesiapan Tinggi - 6 Siswa)',
        readiness: 'Abstrak / Mandiri',
        description: 'Sudah sangat lancar perkalian dasar dan langsung menangkap pola kelipatan pembilang dan penyebut.'
      }
    ],
    challenge: 'Langkah diferensiasi KONTEN apa yang Anda siapkan di awal pembelajaran?',
    choices: [
      {
        id: 'c1-opt1',
        label: 'Opsi 1: Diferensiasi Jalur Representasi Multi-Sensori',
        action: 'Siapkan potongan pizza kertas/kue flannel untuk Kelompok A, kartu bergambar berarsir untuk Kelompok B, dan lembar tantangan pecahan senilai dalam resep masakan untuk Kelompok C.',
        consequence: 'Kelompok A antusias memegang potongan konkret, Kelompok B fokus membandingkan gambar arsiran, dan Kelompok C tertantang memecahkan proporsi resep kue.',
        feedback: 'Luar biasa! Inilah diferensiasi konten yang ideal: menyediakan representasi konkret, piktorial, dan abstrak untuk tujuan konsep pecahan senilai yang sama.',
        isOptimal: true,
        pillarFocus: 'konten'
      },
      {
        id: 'c1-opt2',
        label: 'Opsi 2: Pengurangan Materi Secara Drastis',
        action: 'Menyuruh Kelompok A keluar kelas untuk belajar penjumlahan dasar saja, sementara kelas hanya fokus mengajar Kelompok B dan C.',
        consequence: 'Kelompok A merasa minder, dicap bodoh oleh temannya, dan kehilangan hak belajar topik pecahan di tingkat kelasnya.',
        feedback: 'Miskonsepsi! Mengeluarkan siswa dari topik kelas tanpa jembatan scaffolding merusak rasa percaya diri dan melanggar prinsip inklusivitas.',
        isOptimal: false,
        pillarFocus: 'konten'
      },
      {
        id: 'c1-opt3',
        label: 'Opsi 3: Satu Buku Paket untuk Semua Tanpa Alat Peraga',
        action: 'Menjelaskan rumus pecahan senilai di papan tulis dan menyuruh semua murid mencatat lalu mengerjakan latihan di buku teks halaman 45.',
        consequence: 'Kelompok A kebingungan dan melamun, Kelompok B setengah mengerti, sedangkan Kelompok C selesai dalam 3 menit lalu mulai mengganggu teman lainnya.',
        feedback: 'Miskonsepsi "One-size-fits-all"! Pengajaran seragam mengabaikan kesiapan belajar dan memicu masalah manajemen kelas.',
        isOptimal: false,
        pillarFocus: 'konten'
      }
    ]
  },
  {
    stage: 2,
    stageTitle: 'Tahap 2: Mengelola Aktivitas Belajar di Kelas (Proses)',
    context: 'Setelah materi diperkenalkan, saatnya siswa berlatih dan berdiskusi. Anda perlu mendistribusikan waktu dan perhatian mengajar Anda secara adil.',
    studentProfiles: [
      {
        name: 'Kelompok A',
        readiness: 'Perlu Scaffolding Intensif',
        description: 'Membutuhkan demonstrasi manipulasi langsung dan umpan balik segera.'
      },
      {
        name: 'Kelompok B',
        readiness: 'Pendampingan Terjadwal',
        description: 'Bekerja efektif dalam kelompok kecil dengan panduan lembar kerja terstruktur.'
      },
      {
        name: 'Kelompok C',
        readiness: 'Mandiri / Investigatif',
        description: 'Mampu berkolaborasi memecahkan tantangan dengan sedikit arahan pembuka.'
      }
    ],
    challenge: 'Bagaimana rancangan diferensiasi PROSES yang Anda jalankan selama 30 menit ke depan?',
    choices: [
      {
        id: 'c2-opt1',
        label: 'Opsi 1: Porsi Bimbingan Bertingkat (Tiered Scaffolding)',
        action: 'Berikan pengantar awal singkat pada Kelompok C untuk penyelidikan mandiri, beri LKPD berarah pada Kelompok B, dan alokasikan 15 menit pertama guru mendampingi meja Kelompok A dengan metode manipulatif lipat kertas.',
        consequence: 'Kelas berjalan kondusif! Kelompok A terbantu memahami bahwa 1/2 sama dengan 2/4 melalui lipatan kertas, sementara kelompok lain tetap aktif produktif.',
        feedback: 'Sangat tepat! Diferensiasi proses mengatur alokasi interaksi guru dan kemandirian siswa secara terencana (bukan guru diam di meja pengawas).',
        isOptimal: true,
        pillarFocus: 'proses'
      },
      {
        id: 'c2-opt2',
        label: 'Opsi 2: Hukuman Beban Soal Berlipat Ganda',
        action: 'Memberikan 50 soal pecahan campuran kepada Kelompok C dengan instruksi tidak boleh bersuara sampai jam istirahat tiba.',
        consequence: 'Siswa Kelompok C merasa bosan, jenuh, dan mengeluh karena merasa mendapat beban berlebihan tanpa eksplorasi bermakna.',
        feedback: 'Miskonsepsi! Penambahan volume soal mekanis bukanlah diferensiasi proses, melainkan aktivitas pengisi waktu yang kontraproduktif.',
        isOptimal: false,
        pillarFocus: 'proses'
      },
      {
        id: 'c2-opt3',
        label: 'Opsi 3: Membiarkan Seluruh Kelas Diskusi Bebas Tanpa Arahan',
        action: 'Menyuruh siswa bebas memilih teman sebangku dan bebas mengerjakan apapun tanpa rubrik alur kegiatan.',
        consequence: 'Kelas menjadi riuh dan tidak terkendali. Siswa yang kesulitan hanya bermain alat peraga tanpa memahami konsep.',
        feedback: 'Miskonsepsi! Pembelajaran berdiferensiasi tetap membutuhkan struktur yang terarah dan aturan main yang jelas dari guru.',
        isOptimal: false,
        pillarFocus: 'proses'
      }
    ]
  },
  {
    stage: 3,
    stageTitle: 'Tahap 3: Asesmen dan Unjuk Pemahaman Murid (Produk)',
    context: 'Di akhir pembelajaran, Anda ingin memastikan setiap murid dapat membuktikan pemahaman mereka tentang pecahan senilai sebelum kelas ditutup.',
    studentProfiles: [
      {
        name: 'Semua Kelompok',
        readiness: 'Beragam Gaya Ekspresi',
        description: 'Sebagian siswa percaya diri secara verbal, sebagian visual-spasial, sebagian menyukai penyelesaian tulisan terstruktur.'
      }
    ],
    challenge: 'Bagaimana Anda merancang evaluasi diferensiasi PRODUK yang adil dan dapat dipertanggungjawabkan?',
    choices: [
      {
        id: 'c3-opt1',
        label: 'Opsi 1: Pilihan Ekspresi dengan Rubrik Kriteria Substansi Seragam',
        action: 'Siswa dapat memilih: (1) Menjelaskan lisan dengan peraga lipatan kertas, (2) Menggambar poster warna pecahan senilai, atau (3) Menyelesaikan teka-teki logika pecahan senilai tertulis. Seluruhnya dinilai dengan rubrik: ketepatan pembilang/penyebut dan alasan mengapa nilainya sama.',
        consequence: 'Setiap siswa bangga menunjukkan pemahamannya dengan cara terbaik mereka. Penilaian guru transparan dan objektif berkat rubrik kriteria esensial.',
        feedback: 'Sempurna! Inilah esensi diferensiasi produk: kebebasan media unjuk karya yang tetap mengukur standar kompetensi yang sama melalui rubrik.',
        isOptimal: true,
        pillarFocus: 'produk'
      },
      {
        id: 'c3-opt2',
        label: 'Opsi 2: Mewajibkan Presentasi PowerPoint Canggih',
        action: 'Mewajibkan semua anak SD membuat slide presentasi animasi dengan laptop dan menyewa proyektor sendiri.',
        consequence: 'Banyak orang tua murid mengeluh, dan anak yang tidak memiliki laptop mendapat nilai nol padahal memahami konsep pecahan.',
        feedback: 'Miskonsepsi fatal! Memaksakan satu medium teknologi tinggi tanpa akses setara bukan diferensiasi melainkan diskriminasi penilaian.',
        isOptimal: false,
        pillarFocus: 'produk'
      },
      {
        id: 'c3-opt3',
        label: 'Opsi 3: Tidak Ada Asesmen Sama Sekali',
        action: 'Guru langsung menutup pelajaran dengan salam karena merasa "semua anak sudah senang bermain".',
        consequence: 'Guru tidak memiliki data capaian belajar murid dan tidak tahu siapa yang masih membutuhkan intervensi pada pertemuan berikutnya.',
        feedback: 'Miskonsepsi! Pembelajaran berdiferensiasi berpijak pada data asesmen berkelanjutan (assessment for/of learning), bukan tanpa evaluasi.',
        isOptimal: false,
        pillarFocus: 'produk'
      }
    ]
  }
];

export const SAMPLE_LESSON_PLAN = {
  subject: 'Matematika SD Kelas 4',
  topic: 'Pecahan Senilai',
  learningObjective: 'Peserta didik mampu mengidentifikasi dan membuktikan minimal 2 pasang pecahan senilai melalui representasi konkret, piktorial, atau simbolik secara tepat.',
  targetAudience: 'Fase B (Kelas 4 SD) - 28 Siswa dengan 3 tingkat kesiapan belajar',
  contentDifferentiation: [
    'Kelompok Kesiapan Konkret: Menggunakan alat manipulatif potongan pizza kertas warna-warni dan balok pecahan kayu.',
    'Kelompok Kesiapan Visual: Menggunakan kartu gambar pecahan berarsir persegi dan garis bilangan bernomor.',
    'Kelompok Kesiapan Abstrak: Menggunakan kartu soal kontekstual (resep kue, pembagian luas kebun) dan pola perkalian pecahan.'
  ],
  processDifferentiation: [
    'Scaffolding Bertahap: Guru mendampingi intensif kelompok konkret selama 15 menit pertama (metode I Do, We Do, You Do).',
    'Investigasi Berpasangan: Kelompok visual bekerja dengan panduan LKPD terstruktur mencari pasangan pecahan yang sama luasnya.',
    'Tantangan Terbuka & Tutor Sebaya: Kelompok abstrak mengeksplorasi hubungan pembilang-penyebut dan bersiap membantu kelompok lain bila diperlukan.'
  ],
  productDifferentiation: [
    'Pilihan Produk A: Peragaan lisan menjelaskan kesamaan pecahan menggunakan lipatan kertas origami.',
    'Pilihan Produk B: Buklet mini atau poster komik visual pecahan senilai.',
    'Pilihan Produk C: Lembar laporan analisis data pemecahan masalah kontekstual pecahan senilai.',
    'Rubrik Penilaian Terpadu: Seluruh pilihan dinilai berdasarkan (1) Ketepatan pasangan pecahan senilai, (2) Kejelasan alasan matematis.'
  ],
  antiConfusionChecklist: [
    { check: true, text: 'Tujuan pembelajaran tetap satu dan sama untuk seluruh siswa.' },
    { check: true, text: 'Diferensiasi proses membedakan cara belajar dan pendampingan, bukan sekadar jumlah lembar soal.' },
    { check: true, text: 'Diferensiasi produk dinilai dengan kriteria rubrik kompetensi yang sama, bukan menilai kemewahan hiasan.' }
  ]
};
