'use client';

import { useState } from 'react';
import Link from 'next/link';
import { POST_TEST_QUESTIONS, PillarType } from '@/data/differentiationData';
import { useProgress, TestScoreBreakdown } from '@/hooks/useProgress';

export default function EvaluationPage() {
  const { progress, savePostTestResult } = useProgress();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    progress.postTest?.answers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState(Boolean(progress.postTest));

  const questions = POST_TEST_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (qId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  const handleFinishPostTest = () => {
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

    savePostTestResult(result);
    setIsSubmitted(true);
  };

  const handleResetPostTest = () => {
    if (confirm('Ulangi evaluasi akhir dari awal?')) {
      setSelectedAnswers({});
      setCurrentIdx(0);
      setIsSubmitted(false);
    }
  };

  const allAnswered = questions.every((q) => Boolean(selectedAnswers[q.id]));
  const preTest = progress.preTest;
  const postTest = progress.postTest;

  const scoreDiff = postTest && preTest
    ? postTest.percentageScore - preTest.percentageScore
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20 text-xs font-semibold">
          <span>Tahap 05 / Evaluasi Akhir</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
          Evaluasi Pemahaman & Perbandingan Capaian
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
          Uji pemahaman akhir melalui 6 skenario paralel untuk mengukur penurunan miskonsepsi dibandingkan dengan hasil tes diagnostik awal.
        </p>
      </div>

      {!isSubmitted ? (
        /* Question Flow */
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
            <span className="font-semibold text-slate-800">
              Pertanyaan {currentIdx + 1} dari {questions.length}
            </span>
            <span className="text-slate-500 capitalize">
              Fokus: Pilar {currentQ.pillar}
            </span>
          </div>

          <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg space-y-5 shadow-xs">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Skenario Kasus Kelas SD
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {currentQ.scenario}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 pt-1">
                {currentQ.question}
              </p>
            </div>

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
                      className={`w-full text-left p-3.5 sm:p-4 rounded border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
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
                  className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded bg-[#1e3a8a] text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer touch-manipulation shadow-xs"
                >
                  Selanjutnya &rarr;
                </button>
              ) : (
                <button
                  onClick={handleFinishPostTest}
                  disabled={!allAnswered}
                  className={`flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded transition-colors cursor-pointer touch-manipulation ${
                    allAnswered
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Selesaikan Evaluasi
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
        /* Side-by-side Pre vs Post Test Comparison */
        <div className="space-y-6 sm:space-y-8">
          <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg space-y-6">
            <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Hasil Evaluasi Akhir
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Tingkat Ketepatan Konseptual: {postTest?.percentageScore}%
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Menjawab tepat {postTest?.correctCount} dari {postTest?.totalQuestions} skenario evaluasi.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetPostTest}
                  className="flex-1 sm:flex-none px-3 py-2 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  Ulangi Evaluasi
                </button>
                <Link
                  href="/"
                  className="flex-1 sm:flex-none text-center px-5 py-2 text-xs font-semibold rounded bg-[#1e3a8a] text-white hover:bg-[#1d4ed8] transition-colors"
                >
                  Selesai & Ke Beranda
                </Link>
              </div>
            </div>

            {/* Comparison Matrix: Pre vs Post */}
            {preTest && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-900 block">
                  Perbandingan Pemahaman (Sebelum vs Sesudah Belajar):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded border border-slate-200 bg-slate-50 space-y-1.5">
                    <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] block">
                      Refleksi Awal (Pre-Test)
                    </span>
                    <div className="text-2xl font-bold text-slate-800">
                      {preTest.percentageScore}%
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      {preTest.correctCount} tepat dari {preTest.totalQuestions} soal
                    </p>
                  </div>

                  <div className="p-4 rounded border border-emerald-200 bg-emerald-50/50 space-y-1.5">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">
                      Evaluasi Akhir (Post-Test)
                    </span>
                    <div className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
                      <span>{postTest?.percentageScore}%</span>
                      {scoreDiff > 0 && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          +{scoreDiff}% Peningkatan
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-700 text-[11px]">
                      {postTest?.correctCount} tepat dari {postTest?.totalQuestions} soal
                    </p>
                  </div>
                </div>

                {/* Per-Pillar Progress Table (Scrollable on small mobile) */}
                <div className="border border-slate-200 rounded overflow-x-auto text-xs">
                  <table className="w-full text-left min-w-[340px]">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Pilar</th>
                        <th className="p-3">Salah Kaprah Awal</th>
                        <th className="p-3">Salah Kaprah Akhir</th>
                        <th className="p-3">Perubahan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(['konten', 'proses', 'produk'] as PillarType[]).map((pillar) => {
                        const preWrong = preTest.byPillar[pillar].misconceptionRate;
                        const postWrong = postTest?.byPillar[pillar].misconceptionRate ?? 0;
                        const diff = preWrong - postWrong;

                        return (
                          <tr key={pillar} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold capitalize text-slate-900">
                              Pilar {pillar}
                            </td>
                            <td className="p-3 text-slate-600">{preWrong}%</td>
                            <td className="p-3 text-slate-600">{postWrong}%</td>
                            <td className="p-3 font-semibold">
                              {diff > 0 ? (
                                <span className="text-emerald-700">Turun {diff}%</span>
                              ) : diff === 0 ? (
                                <span className="text-slate-500">Tetap</span>
                              ) : (
                                <span className="text-amber-700">Naik {Math.abs(diff)}%</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
