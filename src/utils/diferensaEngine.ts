import type {
  DiagnosticQuestion,
  DiagnosticSummary,
  EvaluationLevel,
  EvaluationQuestion,
  EvaluationResult,
  EvaluationTopicId,
  GeneratedLessonPlan,
  KontenPlanInput,
  LearningProgress,
  LearningStyle,
  LessonPlanInput,
  ProdukPlanInput,
  ProsesPlanInput,
  SavedKontenPlan,
  SavedProdukPlan,
  SavedProsesPlan,
  TieredAnswerEntry,
  TieredLevelResult,
  TieredQuestion,
} from '../types/diferensa';

export function computeDiagnosticSummary(
  questions: DiagnosticQuestion[],
  selectedAnswers: Record<string, string>,
  nowIso: string = new Date().toISOString()
): DiagnosticSummary {
  const styleBreakdown: Record<LearningStyle, number> = {
    Visual: 0,
    Auditori: 0,
    Kinestetik: 0,
  };

  let readinessSum = 0;
  let answeredCount = 0;

  for (const question of questions) {
    const optionId = selectedAnswers[question.id];
    const option = question.options.find((opt) => opt.id === optionId);
    if (option) {
      styleBreakdown[option.styleTag] += 1;
      readinessSum += option.readinessWeight;
      answeredCount += 1;
    }
  }

  const dominantStyle = (Object.keys(styleBreakdown) as LearningStyle[]).reduce((best, current) =>
    styleBreakdown[current] > styleBreakdown[best] ? current : best
  );

  const readinessAverage = answeredCount > 0 ? Number((readinessSum / answeredCount).toFixed(2)) : 0;

  let readinessCategory: DiagnosticSummary['readinessCategory'] = 'Siap dengan Penguatan';
  if (readinessAverage < 1.65) {
    readinessCategory = 'Perlu Bimbingan Intensif';
  } else if (readinessAverage >= 2.35) {
    readinessCategory = 'Mandiri & Siap Pengayaan';
  }

  const recommendationsByStyle: Record<
    LearningStyle,
    { content: string; process: string; product: string }
  > = {
    Visual: {
      content:
        'Sediakan kartu gambar berseri, infografis langkah kerja, dan buku cerita bergambar dengan warna pembeda konsep.',
      process:
        'Gunakan peta pikiran (mind map), papan tempel visual, dan pengkodean warna saat siswa mengelompokkan ide.',
      product:
        'Beri pilihan tugas berupa poster mini, komik strip pembelajaran, atau diagram alur bergambar.',
    },
    Auditori: {
      content:
        'Lengkapi materi dengan rekaman cerita pendek, lagu pengingat konsep SD, dan pembacaan instruksi lisan yang runtut.',
      process:
        'Fasilitasi diskusi berpasangan (think-pair-share), tanya jawab terstruktur, dan bacaan berantai kelompok kecil.',
      product:
        'Izinkan siswa mempresentasikan temuan secara lisan, rekaman suara sederhana, atau bermain peran dialog.',
    },
    Kinestetik: {
      content:
        'Siapkan alat peraga konkret (balok satuan, kartu lipat, benda sekitar) serta lembar kerja eksplorasi langsung.',
      process:
        'Terapkan stasiun belajar keliling (learning stations), simulasi fisik, dan praktik eksperimen meja kelompok.',
      product:
        'Arahkan proyek berupa maket sederhana, peragaan alat, diorama kardus, atau kartu permainan edukatif.',
    },
  };

  const rec = recommendationsByStyle[dominantStyle];

  return {
    completedAt: nowIso,
    dominantStyle,
    styleBreakdown,
    readinessAverage,
    readinessCategory,
    recommendedContent: rec.content,
    recommendedProcess: rec.process,
    recommendedProduct: rec.product,
  };
}

export function generateKontenPlan(
  input: KontenPlanInput,
  nowIso: string = new Date().toISOString()
): SavedKontenPlan {
  const mediaList = input.jenisMateri.join(', ');
  const ringkasanRancangan = [
    `Rancangan Konten ${input.mataPelajaran} (${input.kelas}) — Topik: ${input.topik.trim()}`,
    `Tujuan: ${input.tujuanPembelajaran.trim()}`,
    `Pemetaan Kebutuhan Siswa: ${input.karakteristikSiswa.trim()}`,
    `Format Materi Terpilih: ${mediaList} · Tingkat Kompleksitas: ${input.tingkatKesulitan}.`,
    `Strategi Penyajian: Siapkan jalur materi utama dengan kosakata sederhana dan dukungan ilustrasi bagi siswa yang butuh penguatan, lalu lengkapi versi teks/tantangan tambahan bagi siswa yang sudah siap.`,
  ].join('\n');

  return {
    ...input,
    id: `konten-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: nowIso,
    ringkasanRancangan,
  };
}

export function generateProsesPlan(
  input: ProsesPlanInput,
  nowIso: string = new Date().toISOString()
): SavedProsesPlan {
  const aktivitasList = input.bentukAktivitas.join(', ');
  const ringkasanAktivitas = [
    `Rancangan Aktivitas Proses — Materi: ${input.materi.trim()}`,
    `Tujuan Kegiatan: ${input.tujuanKegiatan.trim()}`,
    `Bentuk Aktivitas: ${aktivitasList}`,
    `Pengelompokan: ${input.pengelompokanSiswa.trim()} · Media: ${input.mediaDigunakan.trim()}`,
    `Pendampingan Guru: ${input.pendampinganSiswa.trim()}`,
  ].join('\n');

  return {
    ...input,
    id: `proses-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: nowIso,
    ringkasanAktivitas,
  };
}

export function generateProdukPlan(
  input: ProdukPlanInput,
  nowIso: string = new Date().toISOString()
): SavedProdukPlan {
  const produkList = input.jenisProduk.join(', ');
  const ringkasanRubrik = [
    `Rancangan Pilihan Produk — Materi: ${input.materi.trim()}`,
    `Kompetensi Utama: ${input.tujuanKompetensi.trim()}`,
    `Pilihan Bentuk Karya Siswa: ${produkList}`,
    `Kriteria Penilaian Inti: ${input.kriteriaPenilaian.trim()}`,
    `Indikator Keberhasilan: ${input.indikatorKeberhasilan.trim()}`,
  ].join('\n');

  return {
    ...input,
    id: `produk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: nowIso,
    ringkasanRubrik,
  };
}

export function generateLessonPlan(
  input: LessonPlanInput,
  nowIso: string = new Date().toISOString()
): GeneratedLessonPlan {
  const kelas = input.kelas.trim();
  const mapel = input.mataPelajaran.trim();
  const materi = input.materi.trim();
  const tujuan = input.tujuanPembelajaran.trim();
  const kebutuhan = input.kebutuhanBelajar.trim();

  const focusContext =
    input.fokusDimensi === 'kesiapan'
      ? 'berjenjang berdasarkan kesiapan awal (Perlu Bimbingan, Cakap, Mahir)'
      : input.fokusDimensi === 'minat'
      ? 'berbasis variasi tema minat siswa SD (sains alam, cerita bergambar, permainan angka)'
      : 'beragam sesuai profil belajar (Visual, Auditori, Kinestetik)';

  const diferensiasiKonten = [
    `Materi "${materi}" pada mata pelajaran ${mapel} (${kelas}) disiapkan secara ${focusContext}:`,
    `1. Kelompok Perlu Bimbingan: Kartu konsep bergambar dengan kalimat pendek, glosarium kata kunci, dan contoh terpandu langkah demi langkah.`,
    `2. Kelompok Cakap: Bahan bacaan ringkas disertai ilustrasi utama dan 2 contoh soal kontekstual kehidupan sehari-hari.`,
    `3. Kelompok Mahir: Teks pengayaan analitis dengan tantangan pemecahan masalah terbuka yang mengaitkan "${materi}" dengan situasi nyata di lingkungan sekolah.`,
  ].join('\n');

  const diferensiasiProses = [
    `Strategi pendampingan proses belajar memperhatikan kebutuhan "${kebutuhan}":`,
    `1. Stasiun Visual & Eksplorasi: Siswa mengamati bagan alur dan mencocokkan kartu konsep secara berpasangan.`,
    `2. Pendampingan Terfokus (Scaffolding): Guru mendampingi kelompok yang masih ragu selama 10 menit pertama menggunakan alat peraga konkret.`,
    `3. Diskusi Mandiri Terstruktur: Siswa yang sudah siap mengerjakan tantangan eksplorasi bersama teman sebaya menggunakan lembar panduan pertanyaan pemantik.`,
  ].join('\n');

  const diferensiasiProduk = [
    `Siswa menunjukkan ketercapaian tujuan ("${tujuan}") melalui salah satu bentuk karya berikut:`,
    `1. Produk Visual: Poster mini atau peta konsep berwarna tentang inti materi "${materi}".`,
    `2. Produk Lisan/Audio: Penjelasan singkat berpasangan atau simulasi cerita 2 menit di depan kelompok kecil.`,
    `3. Produk Praktik/Karya Nyata: Model peraga sederhana atau lembar proyek lipat (lapbook) lengkap dengan kesimpulan pribadi.`,
  ].join('\n');

  const langkahPembelajaran = [
    `Pendahuluan (10 menit): Salam ramah anak, apersepsi cerita singkat terkait "${materi}", serta penyampaian tujuan belajar "${tujuan}".`,
    `Kegiatan Inti (45 menit): Pemetaan cepat kesiapan siswa -> eksplorasi konten sesuai kelompok -> aktivitas stasiun belajar berdiferensiasi -> penyusunan produk pilihan siswa.`,
    `Penutup (15 menit): Refleksi bintang belajar (apa yang dipahami & apa yang masih ditanyakan), umpan balik apresiatif guru, dan penguatan konsep kunci.`,
  ].join('\n');

  const asesmenFormatif = [
    `Observasi proses menggunakan rubrik 3 tingkat (Mulai Berkembang, Berkembang Sesuai Harapan, Sangat Berkembang) yang selaras dengan kebutuhan "${kebutuhan}".`,
    `Bukti belajar dinilai dari ketepatan konsep inti "${materi}" pada produk pilihan siswa, bukan dari keseragaman format tugas.`,
  ].join('\n');

  return {
    id: `rpp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: nowIso,
    updatedAt: nowIso,
    kelas,
    mataPelajaran: mapel,
    materi,
    tujuanPembelajaran: tujuan,
    kebutuhanBelajar: kebutuhan,
    fokusDimensi: input.fokusDimensi,
    diferensiasiKonten,
    diferensiasiProses,
    diferensiasiProduk,
    langkahPembelajaran,
    asesmenFormatif,
  };
}

export function gradeEvaluation(
  questions: EvaluationQuestion[],
  answers: Record<string, number>,
  nowIso: string = new Date().toISOString()
): EvaluationResult {
  let correctCount = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correctIndex) {
      correctCount += 1;
    }
  }

  const totalQuestions = questions.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  let predicate: EvaluationResult['predicate'] = 'Perlu Pendampingan';
  if (score >= 85) {
    predicate = 'Sangat Mahir';
  } else if (score >= 70) {
    predicate = 'Mahir';
  } else if (score >= 50) {
    predicate = 'Berkembang';
  }

  return {
    completedAt: nowIso,
    score,
    correctCount,
    totalQuestions,
    predicate,
    answers,
  };
}

export function isTieredQuestionCorrect(
  q: TieredQuestion,
  entry: TieredAnswerEntry | undefined
): boolean {
  if (!entry) return false;
  if (q.kind === 'image-match' && q.correctMatchMap) {
    const selections = entry.matchSelections ?? {};
    const keys = Object.keys(q.correctMatchMap);
    if (keys.length === 0) return false;
    return keys.every((itemId) => selections[itemId] === q.correctMatchMap?.[itemId]);
  }
  return entry.selectedIndex !== undefined && entry.selectedIndex === q.correctIndex;
}

export function gradeTieredLevel(
  topicId: EvaluationTopicId,
  level: EvaluationLevel,
  questions: TieredQuestion[],
  answers: Record<string, TieredAnswerEntry>,
  nowIso: string = new Date().toISOString()
): TieredLevelResult {
  let correctCount = 0;
  const questionOutcomes: Record<string, boolean> = {};

  for (const q of questions) {
    const ok = isTieredQuestionCorrect(q, answers[q.id]);
    questionOutcomes[q.id] = ok;
    if (ok) correctCount += 1;
  }

  const totalQuestions = questions.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  let predicate: TieredLevelResult['predicate'] = 'Perlu Pendampingan';
  if (score >= 85) {
    predicate = 'Sangat Mahir';
  } else if (score >= 70) {
    predicate = 'Mahir';
  } else if (score >= 50) {
    predicate = 'Berkembang';
  }

  return {
    topicId,
    level,
    completedAt: nowIso,
    score,
    correctCount,
    totalQuestions,
    predicate,
    answers,
    questionOutcomes,
  };
}

export function computeTieredMasterySummary(
  tieredEvaluations: Record<string, TieredLevelResult>
): {
  completedLevelsCount: number;
  averageScore: number;
  levelAverages: Record<EvaluationLevel, number | null>;
  weakTopics: { topicId: EvaluationTopicId; averageScore: number }[];
} {
  const results = Object.values(tieredEvaluations);
  const completedLevelsCount = results.length;

  const averageScore =
    completedLevelsCount > 0
      ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / completedLevelsCount)
      : 0;

  const levelBuckets: Record<EvaluationLevel, number[]> = { 1: [], 2: [], 3: [] };
  const topicBuckets: Partial<Record<EvaluationTopicId, number[]>> = {};

  for (const res of results) {
    levelBuckets[res.level].push(res.score);
    const arr = topicBuckets[res.topicId] ?? [];
    arr.push(res.score);
    topicBuckets[res.topicId] = arr;
  }

  const avgOf = (nums: number[]): number | null =>
    nums.length > 0 ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : null;

  const levelAverages: Record<EvaluationLevel, number | null> = {
    1: avgOf(levelBuckets[1]),
    2: avgOf(levelBuckets[2]),
    3: avgOf(levelBuckets[3]),
  };

  const weakTopics: { topicId: EvaluationTopicId; averageScore: number }[] = [];
  (Object.keys(topicBuckets) as EvaluationTopicId[]).forEach((topicId) => {
    const scores = topicBuckets[topicId] ?? [];
    const topicAvg = avgOf(scores);
    if (topicAvg !== null && topicAvg < 75) {
      weakTopics.push({ topicId, averageScore: topicAvg });
    }
  });

  weakTopics.sort((a, b) => a.averageScore - b.averageScore);

  return {
    completedLevelsCount,
    averageScore,
    levelAverages,
    weakTopics,
  };
}

export function calculateOverallProgress(
  progress: LearningProgress,
  totalModules: number,
  totalSimulations: number
): {
  percent: number;
  completedStages: number;
  totalStages: number;
} {
  const diagnosticDone = progress.diagnosticResult !== null ? 1 : 0;
  const subMateriBonus =
    (progress.kontenPlans.length > 0 ? 1 : 0) +
    (progress.prosesPlans.length > 0 ? 1 : 0) +
    (progress.produkPlans.length > 0 ? 1 : 0);
  const modulesBaseRatio =
    totalModules > 0 ? Math.min(1, progress.completedModules.length / totalModules) : 0;
  const inclusiveBonus = progress.inclusivePlan !== null ? 0.25 : 0;
  const modulesRatio = Math.min(1, modulesBaseRatio * 0.75 + (subMateriBonus / 3) * 0.25 + inclusiveBonus * 0.2);

  const simRatio =
    totalSimulations > 0
      ? Math.min(1, Object.keys(progress.completedSimulations).length / totalSimulations)
      : 0;
  const plannerDone = progress.savedLessonPlans.length > 0 ? 1 : 0;

  const tieredCount = Object.keys(progress.tieredEvaluations ?? {}).length;
  const evaluationDone =
    progress.evaluationResult !== null || tieredCount >= 3 ? 1 : tieredCount > 0 ? Math.min(0.9, tieredCount / 3) : 0;

  const totalStages = 5;
  const completedStages =
    diagnosticDone +
    (modulesBaseRatio >= 1 || subMateriBonus === 3 ? 1 : 0) +
    (simRatio >= 1 ? 1 : 0) +
    plannerDone +
    (evaluationDone >= 1 ? 1 : 0);

  const weightedPercent = Math.round(
    ((diagnosticDone + modulesRatio + simRatio + plannerDone + evaluationDone) / totalStages) * 100
  );

  return {
    percent: Math.min(100, weightedPercent),
    completedStages,
    totalStages,
  };
}
