import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOverallProgress,
  computeDiagnosticSummary,
  computeTieredMasterySummary,
  generateKontenPlan,
  generateLessonPlan,
  generateProdukPlan,
  generateProsesPlan,
  gradeEvaluation,
  gradeTieredLevel,
} from './diferensaEngine';
import {
  CLASSROOM_SCENARIOS,
  DIAGNOSTIC_QUESTIONS,
  EVALUATION_QUESTIONS,
  LEARNING_MODULES,
  TIERED_EVALUATION_QUESTIONS,
} from '../data/educationalContent';
import type { LearningProgress, TieredAnswerEntry } from '../types/diferensa';

test('computeDiagnosticSummary determines dominant learning style and readiness', () => {
  const answers: Record<string, string> = {};
  for (const q of DIAGNOSTIC_QUESTIONS) {
    const visualOpt = q.options.find((opt) => opt.styleTag === 'Visual') ?? q.options[0];
    answers[q.id] = visualOpt.id;
  }

  const summary = computeDiagnosticSummary(DIAGNOSTIC_QUESTIONS, answers, '2026-11-24T00:00:00Z');
  assert.equal(summary.dominantStyle, 'Visual');
  assert.ok(summary.readinessAverage >= 1 && summary.readinessAverage <= 3);
});

test('generateLessonPlan and Konten/Proses/Produk builders format teacher inputs cleanly', () => {
  const plan = generateLessonPlan(
    {
      kelas: 'Kelas 4 SD',
      mataPelajaran: 'Matematika',
      materi: 'Pecahan Senilai',
      tujuanPembelajaran: 'Siswa dapat membandingkan dua pecahan senilai dengan benda konkret',
      kebutuhanBelajar: 'Sebagian siswa masih butuh alat peraga, sebagian siap soal cerita',
      fokusDimensi: 'kesiapan',
    },
    '2026-11-24T00:00:00Z'
  );
  assert.match(plan.diferensiasiKonten, /Pecahan Senilai/);

  const konten = generateKontenPlan({
    mataPelajaran: 'IPAS',
    kelas: 'Kelas 5 SD',
    topik: 'Rantai Makanan',
    tujuanPembelajaran: 'Mengidentifikasi peran produsen dan konsumen',
    karakteristikSiswa: 'Beragam gaya belajar visual dan auditori',
    jenisMateri: ['Materi berupa teks atau bacaan', 'Materi berupa gambar dan infografis'],
    tingkatKesulitan: 'Bertingkat (Dasar - Mahir)',
  });
  assert.match(konten.ringkasanRancangan, /Rantai Makanan/);

  const proses = generateProsesPlan({
    materi: 'Bangun Datar',
    tujuanKegiatan: 'Mengukur keliling bangun persegi panjang',
    bentukAktivitas: ['Praktik atau eksperimen sederhana'],
    pengelompokanSiswa: 'Kelompok campuran 4 orang',
    mediaDigunakan: 'Penggaris dan kertas berpetak',
    pendampinganSiswa: 'Scaffolding 10 menit awal',
  });
  assert.match(proses.ringkasanAktivitas, /Bangun Datar/);

  const produk = generateProdukPlan({
    materi: 'Keberagaman Budaya',
    tujuanKompetensi: 'Menjelaskan sikap saling menghargai budaya daerah',
    jenisProduk: ['Poster atau gambar', 'Presentasi sederhana'],
    kriteriaPenilaian: 'Kejelasan pesan persatuan dan ketepatan contoh',
    indikatorKeberhasilan: 'Minimal 2 contoh sikap toleransi di sekolah',
  });
  assert.match(produk.ringkasanRubrik, /Keberagaman Budaya/);
});

test('gradeEvaluation calculates accurate score and predicate', () => {
  const allCorrect: Record<string, number> = {};
  for (const q of EVALUATION_QUESTIONS) {
    allCorrect[q.id] = q.correctIndex;
  }
  const perfect = gradeEvaluation(EVALUATION_QUESTIONS, allCorrect, '2026-11-24T00:00:00Z');
  assert.equal(perfect.score, 100);
  assert.equal(perfect.predicate, 'Sangat Mahir');
});

test('gradeTieredLevel handles MCQ, True/False, and image-match questions & recommends weak topics', () => {
  const kontenL1 = TIERED_EVALUATION_QUESTIONS.filter(
    (q) => q.topicId === 'diferensiasi-konten' && q.level === 1
  );
  const perfectAnswers: Record<string, TieredAnswerEntry> = {};
  for (const q of kontenL1) {
    if (q.kind === 'image-match' && q.correctMatchMap) {
      perfectAnswers[q.id] = { matchSelections: { ...q.correctMatchMap } };
    } else {
      perfectAnswers[q.id] = { selectedIndex: q.correctIndex };
    }
  }
  const l1Result = gradeTieredLevel('diferensiasi-konten', 1, kontenL1, perfectAnswers);
  assert.equal(l1Result.score, 100);
  assert.equal(l1Result.predicate, 'Sangat Mahir');

  const prosesL2 = TIERED_EVALUATION_QUESTIONS.filter(
    (q) => q.topicId === 'diferensiasi-proses' && q.level === 2
  );
  const wrongAnswers: Record<string, TieredAnswerEntry> = {};
  for (const q of prosesL2) {
    wrongAnswers[q.id] = { selectedIndex: ((q.correctIndex ?? 0) + 1) % (q.options?.length ?? 2) };
  }
  const l2Result = gradeTieredLevel('diferensiasi-proses', 2, prosesL2, wrongAnswers);
  assert.equal(l2Result.score, 0);

  const mastery = computeTieredMasterySummary({
    'diferensiasi-konten-L1': l1Result,
    'diferensiasi-proses-L2': l2Result,
  });
  assert.equal(mastery.completedLevelsCount, 2);
  assert.equal(mastery.weakTopics.length, 1);
  assert.equal(mastery.weakTopics[0].topicId, 'diferensiasi-proses');
});

test('calculateOverallProgress tracks completion safely', () => {
  const emptyProgress: LearningProgress = {
    diagnosticResult: null,
    completedModules: [],
    completedSimulations: {},
    savedLessonPlans: [],
    evaluationResult: null,
    communityPostsCount: 0,
    kontenPlans: [],
    prosesPlans: [],
    produkPlans: [],
    inclusivePlan: null,
    tieredEvaluations: {},
  };
  const start = calculateOverallProgress(
    emptyProgress,
    LEARNING_MODULES.length,
    CLASSROOM_SCENARIOS.length
  );
  assert.equal(start.percent, 0);
  assert.equal(start.completedStages, 0);
});
