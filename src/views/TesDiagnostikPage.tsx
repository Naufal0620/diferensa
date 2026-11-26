import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Ear,
  Eye,
  Hand,
  RotateCcw,
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/educationalContent';
import type { DiagnosticSummary, LearningStyle, NavRoute } from '../types/diferensa';
import { computeDiagnosticSummary } from '../utils/diferensaEngine';

interface TesDiagnostikPageProps {
  savedResult: DiagnosticSummary | null;
  onSaveResult: (summary: DiagnosticSummary) => void;
  onNavigate: (route: NavRoute) => void;
}

const STYLE_ICON: Record<LearningStyle, typeof Eye> = {
  Visual: Eye,
  Auditori: Ear,
  Kinestetik: Hand,
};

export function TesDiagnostikPage({
  savedResult,
  onSaveResult,
  onNavigate,
}: TesDiagnostikPageProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [showQuiz, setShowQuiz] = useState<boolean>(savedResult === null);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (validationMessage) setValidationMessage('');
  };

  const handleAnalyze = () => {
    if (answeredCount < totalQuestions) {
      setValidationMessage(
        `Mohon lengkapi seluruh ${totalQuestions} skenario terlebih dahulu (${answeredCount}/${totalQuestions} terisi).`
      );
      return;
    }
    const summary = computeDiagnosticSummary(DIAGNOSTIC_QUESTIONS, answers);
    onSaveResult(summary);
    setShowQuiz(false);
  };

  const handleRetake = () => {
    setAnswers({});
    setValidationMessage('');
    setShowQuiz(true);
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-700 mb-1">
              Tahap 01 · Pemetaan Kebutuhan Belajar Siswa SD
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Tes Diagnostik Kelas
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              Jawab 6 situasi pengamatan kelas berikut untuk memetakan kecenderungan profil belajar,
              kesiapan awal, serta rekomendasi strategi Konten, Proses, dan Produk.
            </p>
          </div>
          {savedResult && !showQuiz && (
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Ulangi Pemetaan</span>
            </button>
          )}
        </div>
      </header>

      {!showQuiz && savedResult ? (
        <section aria-label="Hasil Tes Diagnostik" className="space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-teal-700">
                    Hasil Pemetaan Profil Kelas
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    Dominan Gaya Belajar {savedResult.dominantStyle}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Kategori Kesiapan: <strong className="text-slate-900">{savedResult.readinessCategory}</strong>{' '}
                    (Indeks kesiapan <span className="font-mono tabular-nums">{savedResult.readinessAverage}/3.0</span>)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('materi-pembelajaran')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
              >
                <span>Lanjut ke Materi Pembelajaran</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {(['Visual', 'Auditori', 'Kinestetik'] as LearningStyle[]).map((style) => {
                const Icon = STYLE_ICON[style];
                const count = savedResult.styleBreakdown[style];
                const pct = Math.round((count / DIAGNOSTIC_QUESTIONS.length) * 100);
                const isTop = savedResult.dominantStyle === style;
                return (
                  <div
                    key={style}
                    className={`rounded-xl p-4 border ${
                      isTop
                        ? 'bg-sky-50/70 border-sky-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Icon className="w-4 h-4 text-blue-900" aria-hidden="true" />
                        {style}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          style === 'Visual'
                            ? 'bg-sky-600'
                            : style === 'Auditori'
                            ? 'bg-violet-600'
                            : 'bg-teal-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 p-4 bg-white">
                <h3 className="text-sm font-bold text-sky-900 mb-1.5">Rekomendasi Konten</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {savedResult.recommendedContent}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 bg-white">
                <h3 className="text-sm font-bold text-violet-900 mb-1.5">Rekomendasi Proses</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {savedResult.recommendedProcess}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 bg-white">
                <h3 className="text-sm font-bold text-teal-900 mb-1.5">Rekomendasi Produk</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {savedResult.recommendedProduct}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section aria-label="Kuesioner Tes Diagnostik" className="space-y-5">
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3.5">
            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
              <ClipboardList className="w-4 h-4 text-blue-900" aria-hidden="true" />
              <span>Kemajuan Pengisian Skenario</span>
            </div>
            <span className="font-mono text-sm font-semibold text-blue-900 tabular-nums">
              {answeredCount} / {totalQuestions} terjawab
            </span>
          </div>

          {DIAGNOSTIC_QUESTIONS.map((q, index) => {
            const selectedId = answers[q.id];
            return (
              <fieldset
                key={q.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6"
              >
                <div className="text-xs font-medium text-slate-500 mb-1.5">
                  Pertanyaan {index + 1} · {q.contextLabel}
                </div>
                <legend className="font-display text-base sm:text-lg font-bold text-slate-900 mb-4">
                  {q.prompt}
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {q.options.map((opt) => {
                    const isSelected = selectedId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        aria-pressed={isSelected}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-900 ${
                          isSelected
                            ? 'bg-sky-50 border-blue-900 ring-1 ring-blue-900'
                            : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          {validationMessage && (
            <div
              role="alert"
              className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm font-medium text-amber-900"
            >
              {validationMessage}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {savedResult && (
              <button
                type="button"
                onClick={() => setShowQuiz(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                Kembali ke Hasil Sebelumnya
              </button>
            )}
            <button
              type="button"
              onClick={handleAnalyze}
              className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Analisis Profil Belajar</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
