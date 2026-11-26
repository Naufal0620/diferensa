'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DIAGNOSTIC_QUESTIONS, 
  PillarType 
} from '@/data/differentiationData';
import { useProgress, TestScoreBreakdown } from '@/hooks/useProgress';

export default function DiagnosticPage() {
  const { progress, savePreTestResult } = useProgress();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    progress.preTest?.answers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState(Boolean(progress.preTest));

  const questions = DIAGNOSTIC_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (qId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  const handleFinishTest = () => {
    let correctCount = 0;
    let misconceptionCount = 0;

    const byPillar: TestScoreBreakdown['byPillar'] = {
      konten: { correct: 0, total: 0, misconceptionRate: 0 },
      proses: { correct: 0, total: 0, misconceptionRate: 0 },
      produk: { correct: 0, total: 0, misconceptionRate: 0 },
    };

    questions.forEach((q) => {
      byPillar[q.pillar].total += 1;
      const chosenOptId = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === chosenOptId);

      if (opt && !opt.isMisconception) {
        correctCount += 1;
        byPillar[q.pillar].correct += 1;
      } else {
        misconceptionCount += 1;
      }
    });

    (['konten', 'proses', 'produk'] as PillarType[]).forEach((pillar) => {
      const p = byPillar[pillar];
      const wrong = p.total - p.correct;
      p.misconceptionRate = Math.round((wrong / p.total) * 100);
    });

    const result: TestScoreBreakdown = {
      totalQuestions: questions.length,
      correctCount,
      misconceptionCount,
      percentageScore: Math.round((correctCount / questions.length) * 100),
      byPillar,
      answers: selectedAnswers,
      completedAt: new Date().toLocaleDateString('id-ID'),
    };

    savePreTestResult(result);
    setIsSubmitted(true);
  };

  const handleResetTest = () => {
    if (confirm('Ulangi tes diagnostik dari awal?')) {
      setSelectedAnswers({});
      setCurrentIdx(0);
      setIsSubmitted(false);
    }
  };

  const allAnswered = questions.every((q) => Boolean(selectedAnswers[q.id]));
  const preTest = progress.preTest;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20 text-xs font-semibold">
          <span>Tahap 01 / Refleksi Awal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
          Pemetaan Mandiri Miskonsepsi Pembelajaran Berdiferensiasi
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
          Uji pemahaman Anda melalui 6 skenario kasus kelas SD untuk memetakan kecenderungan salah kaprah pada pilar Konten, Proses, dan Produk.
        </p>
      </div>

      {!isSubmitted ? (
        /* Question Sheet Flow */
        <div className="space-y-5">
          {/* Progress bar and question indicator */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
            <span className="font-semibold text-slate-800">
              Skenario {currentIdx + 1} dari {questions.length}
            </span>
            <span className="text-slate-500 capitalize">
              Fokus: Pilar {currentQ.pillar}
            </span>
          </div>

          {/* Scenario Card */}
          <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg space-y-5 shadow-xs">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Deskripsi Kasus Ruang Kelas
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {currentQ.scenario}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 pt-1">
                {currentQ.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Pilihan Tindakan Guru
              </span>
              <div className="space-y-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === option.id;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(currentQ.id, option.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-md border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 font-medium text-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {optionLetters[optIdx]}
                      </span>
                      <span className="leading-relaxed pt-0.5">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stepper Controls - Responsive on Mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2 order-2 sm:order-1">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className={`flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded border transition-colors cursor-pointer touch-manipulation ${
                  currentIdx === 0
                    ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                &larr; Sebelumnya
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                  className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded bg-[#1e3a8a] text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer touch-manipulation"
                >
                  Selanjutnya &rarr;
                </button>
              ) : (
                <button
                  onClick={handleFinishTest}
                  disabled={!allAnswered}
                  className={`flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded transition-colors cursor-pointer touch-manipulation ${
                    allAnswered
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Selesaikan Tes
                </button>
              )}
            </div>

            {/* Quick Number Jumper with WCAG Touch Target standard */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto order-1 sm:order-2 py-1">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Buka skenario nomor ${idx + 1}`}
                  className={`min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] text-xs font-medium rounded-md transition-colors cursor-pointer touch-manipulation flex items-center justify-center ${
                    currentIdx === idx
                      ? 'bg-[#1e3a8a] text-white font-bold'
                      : selectedAnswers[q.id]
                      ? 'bg-[#f0f4f8] text-[#1e3a8a] font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Results Breakdown Matrix */
        <div className="space-y-6 sm:space-y-8">
          <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Hasil Diagnostik Mandiri
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Tingkat Ketepatan Konseptual: {preTest?.percentageScore}%
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Menjawab tepat {preTest?.correctCount} dari {preTest?.totalQuestions} skenario kelas SD.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetTest}
                  className="flex-1 sm:flex-none px-3 py-2 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  Ulangi Tes
                </button>
                <Link
                  href="/learn"
                  className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-semibold rounded bg-[#1e3a8a] text-white hover:bg-[#1d4ed8]"
                >
                  Lanjut Telaah &rarr;
                </Link>
              </div>
            </div>

            {/* Breakdown per Pilar */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 block">
                Analisis Pemahaman per Pilar Pembelajaran:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(['konten', 'proses', 'produk'] as PillarType[]).map((pillar) => {
                  const data = preTest?.byPillar[pillar];
                  const hasMisconception = (data?.misconceptionRate || 0) > 0;

                  return (
                    <div
                      key={pillar}
                      className={`p-3.5 rounded border text-xs space-y-1.5 ${
                        hasMisconception
                          ? 'border-red-200 bg-red-50/40'
                          : 'border-emerald-200 bg-emerald-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 capitalize">
                          Pilar {pillar}
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            hasMisconception ? 'text-red-700' : 'text-emerald-700'
                          }`}
                        >
                          {data?.correct}/{data?.total} Tepat
                        </span>
                      </div>

                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {hasMisconception
                          ? `Terdapat ${data?.misconceptionRate}% indikasi salah kaprah pada strategi ${pillar}.`
                          : `Pemahaman pada strategi ${pillar} sudah sesuai dengan prinsip Kurikulum Merdeka.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Answers Detail Review - Collapsible for Simplicity */}
            <div className="border-t border-slate-100 pt-5">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none py-2 px-1 text-xs font-bold text-[#1e3a8a] hover:text-[#1d4ed8] transition-colors">
                  <span>Lihat Pembahasan Lengkap Skenario ({questions.length} Kasus)</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">&darr;</span>
                </summary>

                <div className="mt-4 space-y-3">
                  {questions.map((q, idx) => {
                    const chosenOptId = preTest?.answers[q.id];
                    const chosenOpt = q.options.find((o) => o.id === chosenOptId);
                    const isCorrect = chosenOpt && !chosenOpt.isMisconception;

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-lg border border-slate-200 text-xs space-y-2 bg-white"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900">
                            Skenario {idx + 1} ({q.pillar})
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? 'Tepat Sesuai Prinsip' : 'Terindikasi Miskonsepsi'}
                          </span>
                        </div>

                        <p className="text-slate-700 italic">{q.scenario}</p>

                        <div className="p-3 bg-slate-50 rounded space-y-1">
                          <span className="font-semibold text-slate-900 block">
                            Tindakan yang Anda pilih:
                          </span>
                          <p className="text-slate-600">{chosenOpt?.text}</p>
                        </div>

                        <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                          <strong>Catatan Reflektif:</strong> {chosenOpt?.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
