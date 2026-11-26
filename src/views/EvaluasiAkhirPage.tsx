import { useState } from 'react';
import {
  Accessibility,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Eye,
  Headphones,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Puzzle,
  RotateCcw,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  EVALUATION_TOPICS,
  LEVEL_METADATA,
  TIERED_EVALUATION_QUESTIONS,
} from '../data/extendedContent';
import type {
  EvaluationLevel,
  EvaluationTopicId,
  ImageMatchItem,
  NavRoute,
  TieredAnswerEntry,
  TieredLevelResult,
  TieredQuestion,
} from '../types/diferensa';
import {
  computeTieredMasterySummary,
  gradeTieredLevel,
  isTieredQuestionCorrect,
} from '../utils/diferensaEngine';

interface EvaluasiAkhirPageProps {
  tieredEvaluations: Record<string, TieredLevelResult>;
  onSaveTieredResult: (result: TieredLevelResult) => void;
  onNavigate: (route: NavRoute) => void;
}

const MATCH_ICON_MAP: Record<ImageMatchItem['iconKey'], typeof BookOpen> = {
  book: BookOpen,
  headphones: Headphones,
  chart: BarChart3,
  puzzle: Puzzle,
  poster: ImageIcon,
  model: Layers,
  accessibility: Accessibility,
};

export function EvaluasiAkhirPage({
  tieredEvaluations,
  onSaveTieredResult,
  onNavigate,
}: EvaluasiAkhirPageProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<EvaluationTopicId>('diferensiasi-konten');
  const [selectedLevel, setSelectedLevel] = useState<EvaluationLevel>(1);
  const [answers, setAnswers] = useState<Record<string, TieredAnswerEntry>>({});
  const [instantFeedbackIds, setInstantFeedbackIds] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isReviewingResult, setIsReviewingResult] = useState<boolean>(false);

  // Inclusive accessibility controls (never alter measured competency)
  const [largeText, setLargeText] = useState<boolean>(false);
  const [showStepHints, setShowStepHints] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<string>('');
  const [spokenMode, setSpokenMode] = useState<boolean>(false);

  const activeKey = `${selectedTopicId}-L${selectedLevel}`;
  const savedLevelResult = tieredEvaluations[activeKey] ?? null;

  const questions = TIERED_EVALUATION_QUESTIONS.filter(
    (q) => q.topicId === selectedTopicId && q.level === selectedLevel
  );

  const activeTopic =
    EVALUATION_TOPICS.find((t) => t.id === selectedTopicId) ?? EVALUATION_TOPICS[0];

  const mastery = computeTieredMasterySummary(tieredEvaluations);

  const handleSelectTopic = (topicId: EvaluationTopicId) => {
    setSelectedTopicId(topicId);
    setSelectedLevel(1);
    setAnswers({});
    setInstantFeedbackIds({});
    setErrorMsg('');
    const existing = tieredEvaluations[`${topicId}-L1`];
    setIsReviewingResult(Boolean(existing));
  };

  const handleSelectLevel = (level: EvaluationLevel) => {
    setSelectedLevel(level);
    setAnswers({});
    setInstantFeedbackIds({});
    setErrorMsg('');
    const existing = tieredEvaluations[`${selectedTopicId}-L${level}`];
    setIsReviewingResult(Boolean(existing));
  };

  const handleSpeakQuestion = (q: TieredQuestion) => {
    const fullText = [
      q.scenarioContext ? `Situasi: ${q.scenarioContext}` : '',
      q.prompt,
      q.options ? `Pilihan: ${q.options.join(', atau ')}` : '',
    ]
      .filter(Boolean)
      .join('. ');

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(fullText);
        utter.lang = 'id-ID';
        utter.rate = 0.92;
        window.speechSynthesis.speak(utter);
        setAudioStatus(`Membacakan soal: "${q.prompt}"`);
        return;
      } catch {
        // Fallback below
      }
    }
    setAudioStatus(`Teks audio soal: "${fullText}"`);
  };

  const isQuestionAnswered = (q: TieredQuestion): boolean => {
    const entry = answers[q.id];
    if (!entry) return false;
    if (q.kind === 'image-match' && q.matchItems) {
      const sel = entry.matchSelections ?? {};
      return q.matchItems.every((item) => Boolean(sel[item.id]));
    }
    return entry.selectedIndex !== undefined;
  };

  const answeredCount = questions.filter(isQuestionAnswered).length;

  const handleSubmitLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < questions.length) {
      setErrorMsg(
        `Mohon selesaikan seluruh ${questions.length} soal pada ${LEVEL_METADATA[selectedLevel].title} (${answeredCount}/${questions.length} terjawab).`
      );
      return;
    }
    setErrorMsg('');
    const result = gradeTieredLevel(selectedTopicId, selectedLevel, questions, answers);
    onSaveTieredResult(result);
    setIsReviewingResult(true);
  };

  const handleRetryLevel = () => {
    setAnswers({});
    setInstantFeedbackIds({});
    setErrorMsg('');
    setIsReviewingResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Overall Level Indicators */}
      <header className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-700 mb-1">
              Tahap 05 · Evaluasi Bertingkat & Ramah Inklusif
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Evaluasi Akhir Bertingkat (Level 1 – Level 3)
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              Setiap materi pembelajaran dilengkapi 3 level evaluasi bertahap mulai dari pemahaman
              dasar, penerapan kasus nyata SD, hingga analisis pemecahan masalah.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 shrink-0">
            <div className="text-[11px] font-semibold text-slate-500">Progres Evaluasi</div>
            <div className="font-display text-lg font-extrabold text-blue-900 tabular-nums">
              {mastery.completedLevelsCount} / {EVALUATION_TOPICS.length * 3} level tuntas
            </div>
            <div className="text-xs text-slate-600 tabular-nums">
              Rata-rata skor: <strong>{mastery.averageScore}/100</strong>
            </div>
          </div>
        </div>

        {/* 3 Level Progression Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {([1, 2, 3] as EvaluationLevel[]).map((lvl) => {
            const avg = mastery.levelAverages[lvl];
            return (
              <div
                key={lvl}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-blue-900">
                    Level {lvl}: {LEVEL_METADATA[lvl].indicatorLabel}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {avg !== null ? `Rata-rata capaian: ${avg}/100` : 'Belum dikerjakan'}
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-teal-700 tabular-nums">
                  {avg !== null ? `${avg}%` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </header>

      {/* Recommendations for Weak Topics (if any) */}
      {mastery.weakTopics.length > 0 && (
        <section
          aria-label="Rekomendasi Materi untuk Dipelajari Kembali"
          className="rounded-2xl bg-amber-50/80 border border-amber-200 p-5 space-y-3"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                Rekomendasi Materi yang Perlu Dipelajari Kembali
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                Berdasarkan hasil evaluasi Anda, topik berikut masih di bawah batas mahir (75) dan
                disarankan untuk ditinjau ulang:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {mastery.weakTopics.map((item) => {
              const topic = EVALUATION_TOPICS.find((t) => t.id === item.topicId);
              if (!topic) return null;
              return (
                <button
                  key={item.topicId}
                  type="button"
                  onClick={() => onNavigate(topic.targetRoute)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/70 text-xs font-semibold text-slate-900 cursor-pointer"
                >
                  <span>
                    Pelajari Ulang: {topic.title} ({item.averageScore}/100)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-800" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Topic Selector */}
      <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
        <h2 className="font-display text-base font-bold text-slate-900">
          1. Pilih Materi Pembelajaran yang Akan Dievaluasi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {EVALUATION_TOPICS.map((topic) => {
            const active = topic.id === selectedTopicId;
            const completedForTopic = ([1, 2, 3] as EvaluationLevel[]).filter(
              (l) => Boolean(tieredEvaluations[`${topic.id}-L${l}`])
            ).length;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSelectTopic(topic.id)}
                aria-pressed={active}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  active
                    ? 'bg-sky-50 border-blue-900 ring-1 ring-blue-900'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{topic.title}</div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{topic.shortDesc}</p>
                </div>
                <div className="text-[11px] font-semibold text-teal-700 tabular-nums">
                  {completedForTopic}/3 level selesai
                </div>
              </button>
            );
          })}
        </div>

        {/* 3 Visual Level Cards for Active Topic */}
        <div className="pt-2">
          <h2 className="font-display text-base font-bold text-slate-900 mb-3">
            2. Pilih Tahapan Level untuk {activeTopic.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {([1, 2, 3] as EvaluationLevel[]).map((lvl) => {
              const meta = LEVEL_METADATA[lvl];
              const res = tieredEvaluations[`${selectedTopicId}-L${lvl}`];
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleSelectLevel(lvl)}
                  aria-pressed={isSelected}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-display text-sm font-bold">{meta.title}</span>
                      {res && (
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md tabular-nums ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {res.score}/100
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-sky-200' : 'text-violet-700'
                      }`}
                    >
                      {meta.indicatorLabel}
                    </p>
                    <p
                      className={`text-xs mt-1.5 leading-relaxed ${
                        isSelected ? 'text-sky-100' : 'text-slate-600'
                      }`}
                    >
                      {meta.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inclusive Accessibility Toolbar */}
      <section
        aria-label="Pengaturan Evaluasi Ramah Inklusif"
        className="rounded-2xl bg-white border border-slate-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Accessibility className="w-4 h-4 text-teal-700" aria-hidden="true" />
          <span>Mode Akses Inklusif (Waktu Fleksibel Aktif):</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setLargeText((v) => !v)}
            aria-pressed={largeText}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
              largeText
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{largeText ? 'Teks Besar: Aktif' : 'Perbesar Teks'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowStepHints((v) => !v)}
            aria-pressed={showStepHints}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
              showStepHints
                ? 'bg-violet-700 text-white border-violet-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{showStepHints ? 'Petunjuk Bertahap: Aktif' : 'Tampilkan Petunjuk'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSpokenMode((v) => !v)}
            aria-pressed={spokenMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
              spokenMode
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{spokenMode ? 'Mode Jawaban Lisan/Catatan: Aktif' : 'Alternatif Cara Jawab'}</span>
          </button>
        </div>

        {audioStatus && (
          <div className="w-full text-xs text-blue-900 bg-sky-50 border border-sky-200 rounded-lg px-3 py-2">
            {audioStatus}
          </div>
        )}
      </section>

      {/* Active Evaluation View OR Level Result View */}
      {isReviewingResult && savedLevelResult ? (
        <section aria-label="Hasil Evaluasi Level" className="space-y-5">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                <Award className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700">
                  {activeTopic.title} · {LEVEL_METADATA[selectedLevel].title}
                </p>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                  Skor Level: <span className="font-mono tabular-nums">{savedLevelResult.score}/100</span>
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Predikat: <strong>{savedLevelResult.predicate}</strong> ·{' '}
                  <span className="tabular-nums">
                    {savedLevelResult.correctCount} dari {savedLevelResult.totalQuestions} soal tepat
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleRetryLevel}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Ulangi Level Ini</span>
              </button>

              {selectedLevel < 3 ? (
                <button
                  type="button"
                  onClick={() => handleSelectLevel((selectedLevel + 1) as EvaluationLevel)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <span>Lanjut ke Level {selectedLevel + 1}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('profil-saya')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <span>Lihat Ringkasan di Profil Saya</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Pembahasan */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Pembahasan Jawaban ({LEVEL_METADATA[selectedLevel].title})
            </h3>
            {questions.map((q, idx) => {
              const ok = savedLevelResult.questionOutcomes[q.id];
              const ans = savedLevelResult.answers[q.id];
              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium text-slate-500">Soal {idx + 1}</span>
                      <h4 className={`font-bold text-slate-900 mt-0.5 ${largeText ? 'text-base' : 'text-sm'}`}>
                        {q.prompt}
                      </h4>
                    </div>
                    {ok ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 shrink-0">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        Tepat
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 shrink-0">
                        <XCircle className="w-4 h-4" aria-hidden="true" />
                        Perlu Tinjau
                      </span>
                    )}
                  </div>

                  {q.kind !== 'image-match' && q.options && (
                    <div className="text-xs space-y-1">
                      <p className="text-slate-600">
                        Jawaban Anda:{' '}
                        <strong className={ok ? 'text-teal-800' : 'text-rose-800'}>
                          {ans?.selectedIndex !== undefined ? q.options[ans.selectedIndex] : '-'}
                        </strong>
                      </p>
                      {!ok && q.correctIndex !== undefined && (
                        <p className="text-slate-600">
                          Jawaban Tepat:{' '}
                          <strong className="text-teal-800">{q.options[q.correctIndex]}</strong>
                        </p>
                      )}
                    </div>
                  )}

                  {ans?.reasonText && (
                    <p className="text-xs text-slate-700 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2">
                      <strong>Alasan Anda:</strong> {ans.reasonText}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-xl p-3">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <form onSubmit={handleSubmitLevel} className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3.5">
            <span className="text-sm font-semibold text-slate-800">
              {activeTopic.title} · {LEVEL_METADATA[selectedLevel].title}
            </span>
            <span className="font-mono text-sm font-semibold text-blue-900 tabular-nums">
              {answeredCount} / {questions.length} terjawab
            </span>
          </div>

          {questions.map((q, idx) => {
            const entry = answers[q.id];
            const instantShown = Boolean(instantFeedbackIds[q.id]);
            const instantCorrect = isTieredQuestionCorrect(q, entry);

            return (
              <fieldset
                key={q.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    Soal {idx + 1} ·{' '}
                    {q.kind === 'true-false'
                      ? 'Benar atau Salah'
                      : q.kind === 'image-match'
                      ? 'Mencocokkan Gambar & Konsep'
                      : q.kind === 'case-mcq'
                      ? 'Studi Kasus Situasional'
                      : q.kind === 'problem-solve'
                      ? 'Pemecahan Masalah & Alasan'
                      : 'Pilihan Ganda'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSpeakQuestion(q)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[11px] font-semibold text-blue-900 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Bacakan Soal</span>
                  </button>
                </div>

                {q.scenarioContext && (
                  <div
                    className={`rounded-xl bg-sky-50/70 border border-sky-100 p-4 text-slate-800 leading-relaxed ${
                      largeText ? 'text-base' : 'text-sm'
                    }`}
                  >
                    <strong>Situasi Kelas:</strong> {q.scenarioContext}
                  </div>
                )}

                <legend
                  className={`font-display font-bold text-slate-900 ${
                    largeText ? 'text-lg sm:text-xl leading-relaxed' : 'text-base leading-snug'
                  }`}
                >
                  {q.prompt}
                </legend>

                {showStepHints && (
                  <div className="rounded-xl bg-violet-50 border border-violet-200 px-3.5 py-2.5 text-xs text-violet-900">
                    <strong>Petunjuk Langkah:</strong> {q.stepHint}
                  </div>
                )}

                {/* Question Type Rendering */}
                {q.kind === 'image-match' && q.matchItems ? (
                  <div className="space-y-3">
                    {q.matchItems.map((item) => {
                      const MatchIcon = MATCH_ICON_MAP[item.iconKey];
                      const selectedTarget = entry?.matchSelections?.[item.id] ?? '';
                      const targetOptions = q.matchItems!.map((m) => m.targetConcept);
                      return (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-sky-100 text-blue-900 flex items-center justify-center shrink-0">
                              <MatchIcon className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              {item.visualLabel}
                            </span>
                          </div>

                          <div className="sm:w-1/2">
                            <label htmlFor={`match-${q.id}-${item.id}`} className="sr-only">
                              Pasangan untuk {item.visualLabel}
                            </label>
                            <select
                              id={`match-${q.id}-${item.id}`}
                              value={selectedTarget}
                              onChange={(e) => {
                                const val = e.target.value;
                                setAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: {
                                    ...prev[q.id],
                                    matchSelections: {
                                      ...(prev[q.id]?.matchSelections ?? {}),
                                      [item.id]: val,
                                    },
                                  },
                                }));
                                if (errorMsg) setErrorMsg('');
                              }}
                              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800"
                            >
                              <option value="">-- Pilih konsep yang sesuai --</option>
                              {targetOptions.map((concept) => (
                                <option key={concept} value={concept}>
                                  {concept}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {(q.options ?? []).map((opt, optIdx) => {
                      const isChosen = entry?.selectedIndex === optIdx;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setAnswers((prev) => ({
                              ...prev,
                              [q.id]: { ...prev[q.id], selectedIndex: optIdx },
                            }));
                            if (selectedLevel === 1) {
                              setInstantFeedbackIds((prev) => ({ ...prev, [q.id]: true }));
                            }
                            if (errorMsg) setErrorMsg('');
                          }}
                          aria-pressed={isChosen}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-colors cursor-pointer ${
                            largeText ? 'text-base leading-relaxed' : 'text-sm'
                          } ${
                            isChosen
                              ? 'bg-sky-50 border-blue-900 text-blue-950 font-semibold ring-1 ring-blue-900'
                              : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Level 3 Reasoning Input OR Alternative Response Input */}
                {(q.kind === 'problem-solve' || spokenMode) && (
                  <div className="pt-1">
                    <label
                      htmlFor={`reason-${q.id}`}
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {q.reasonPrompt ?? 'Catatan atau Alasan Jawaban Anda (Opsional untuk mode lisan/alternatif):'}
                    </label>
                    <textarea
                      id={`reason-${q.id}`}
                      rows={2}
                      placeholder="Tuliskan alasan atau penjelasan singkat pilihan solusi Anda..."
                      value={entry?.reasonText ?? ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: { ...prev[q.id], reasonText: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm"
                    />
                  </div>
                )}

                {/* Level 1 Instant Feedback */}
                {selectedLevel === 1 && (instantShown || (q.kind === 'image-match' && isQuestionAnswered(q))) && (
                  <div
                    role="status"
                    className={`rounded-xl px-4 py-3 text-xs sm:text-sm ${
                      instantCorrect
                        ? 'bg-teal-50 border border-teal-200 text-teal-900'
                        : 'bg-amber-50 border border-amber-200 text-amber-900'
                    }`}
                  >
                    <strong>{instantCorrect ? 'Umpan Balik Langsung (Tepat!): ' : 'Umpan Balik Langsung (Coba Tinjau): '}</strong>
                    {q.explanation}
                  </div>
                )}
              </fieldset>
            );
          })}

          {errorMsg && (
            <div
              role="alert"
              className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm font-medium text-amber-900"
            >
              {errorMsg}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {savedLevelResult && (
              <button
                type="button"
                onClick={() => setIsReviewingResult(true)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200/70 cursor-pointer"
              >
                Lihat Hasil Sebelumnya
              </button>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Kirim Jawaban {LEVEL_METADATA[selectedLevel].title}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
