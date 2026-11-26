'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SIMULATION_DATA } from '@/data/differentiationData';
import { useProgress } from '@/hooks/useProgress';

export default function SimulationPage() {
  const { progress, saveSimulationScore } = useProgress();
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(
    Boolean(progress.simulationScore?.completed)
  );

  const stages = SIMULATION_DATA;
  const currentStep = stages[currentStageIdx];
  const currentChoiceId = selectedChoices[currentStep.stage];
  const chosenChoice = currentStep.choices.find((c) => c.id === currentChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [currentStep.stage]: choiceId,
    }));
    setShowFeedback(true);
  };

  const handleNextStage = () => {
    setShowFeedback(false);
    if (currentStageIdx < stages.length - 1) {
      setCurrentStageIdx((prev) => prev + 1);
    } else {
      let optimalCount = 0;
      stages.forEach((st) => {
        const cId = selectedChoices[st.stage];
        const cObj = st.choices.find((c) => c.id === cId);
        if (cObj?.isOptimal) optimalCount++;
      });
      saveSimulationScore(optimalCount, stages.length);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedChoices({});
    setCurrentStageIdx(0);
    setShowFeedback(false);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06525c]/10 text-[#06525c] border border-[#06525c]/20 text-xs font-semibold">
          <span>Tahap 03 / Praktik Simulasi</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#06525c] tracking-tight">
          Simulasi Pengambilan Keputusan Guru: Matematika SD
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
          Hadapi situasi nyata ruang kelas dengan beragam profil kesiapan murid. Ambil keputusan instruksional dan amati respons pedagogisnya secara langsung.
        </p>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Stage Step Indicator */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
            <span className="font-semibold text-slate-700">
              Tahapan {currentStep.stage} dari {stages.length}: {currentStep.stageTitle}
            </span>
            <span className="text-slate-500">
              {currentStep.context}
            </span>
          </div>

          {/* Student Profile Snapshot (FIX.md item 1.5 & 2.1: Aset Visual & Konkret) */}
          <div className="border border-slate-200 bg-white p-5 rounded-lg space-y-4 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Kondisi Kesiapan Murid di Kelas:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {currentStep.studentProfiles.map((prof, idx) => (
                <div key={idx} className="p-3 rounded border border-slate-200 bg-slate-50/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 block">{prof.name}</span>
                    <span className="text-[10px] font-medium text-slate-500">{prof.readiness}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {prof.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              <strong>Tantangan Situasi:</strong> {currentStep.challenge}
            </div>
          </div>

          {/* Decision Choices */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 block">
              Pilih Keputusan Instruksional Guru:
            </span>

            <div className="space-y-2">
              {currentStep.choices.map((choice, idx) => {
                const isSelected = currentChoiceId === choice.id;
                const optionLetters = ['A', 'B', 'C'];

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.id)}
                    className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-[#06525c] bg-[#ebf0ee]/60 ring-1 ring-[#06525c] font-medium text-[#06525c]'
                        : 'border-slate-200/90 bg-white hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-[#06525c] text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {optionLetters[idx]}
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-semibold block text-slate-900">{choice.label}</span>
                      <span className="leading-relaxed text-slate-600 block text-xs">{choice.action}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Section (Instant pedagogical consequence) */}
          {showFeedback && chosenChoice && (
            <div
              className={`p-5 rounded border text-xs space-y-3 ${
                chosenChoice.isOptimal
                  ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
                  : 'border-amber-200 bg-amber-50/50 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  {chosenChoice.isOptimal ? 'Keputusan Tepat' : 'Perlu Dipertimbangkan Kembali'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Fokus Pilar: {chosenChoice.pillarFocus}
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-semibold block text-[11px]">Dampak di Ruang Kelas:</span>
                <p className="leading-relaxed text-slate-800">{chosenChoice.consequence}</p>
              </div>

              <div className="space-y-1 border-t border-slate-200/60 pt-2">
                <span className="font-semibold block text-[11px]">Ulasan Pedagogis:</span>
                <p className="leading-relaxed text-slate-700">{chosenChoice.feedback}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleNextStage}
                  className="px-5 py-2.5 text-xs font-semibold rounded-md bg-[#06525c] text-white hover:bg-[#086572] cursor-pointer shadow-xs transition-colors"
                >
                  {currentStageIdx < stages.length - 1
                    ? 'Lanjut ke Tahapan Berikutnya &rarr;'
                    : 'Lihat Hasil Simulasi &rarr;'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final Simulation Result */
        <div className="border border-slate-200 bg-white p-6 rounded-lg space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Hasil Simulasi Keputusan
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Skor Optimalitas: {progress.simulationScore?.optimalChoices} dari {progress.simulationScore?.totalStages} Tahapan
            </h2>
            <p className="text-xs text-slate-600">
              Evaluasi keputusan Anda dalam mengelola 3 tingkatan kesiapan belajar siswa SD.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-slate-50 text-xs leading-relaxed space-y-2">
            <span className="font-bold text-slate-900 block">Refleksi Praktik Simulasi:</span>
            <p className="text-slate-700">
              Mengajar dengan diferensiasi membutuhkan fleksibilitas guru dalam membagi perhatian (scaffolding). Kelompok yang butuh benda konkret harus dipastikan menguasai konsep dasar terlebih dahulu, sementara kelompok mandiri diberikan ruang eksplorasi tanpa harus terbebani tugas pengisi waktu yang tidak bermakna.
            </p>
          </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleRestart}
                className="px-3.5 py-2 text-xs font-semibold rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                Ulangi Simulasi
              </button>
              <Link
                href="/planner"
                className="px-5 py-2.5 text-xs font-semibold rounded-md bg-[#06525c] text-white hover:bg-[#086572] transition-colors shadow-xs"
              >
                Lanjut ke Rancang Modul &rarr;
              </Link>
            </div>
        </div>
      )}
    </div>
  );
}
