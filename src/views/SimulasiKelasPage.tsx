import { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  MonitorPlay,
  Users,
} from 'lucide-react';
import { CLASSROOM_SCENARIOS } from '../data/educationalContent';
import type { NavRoute } from '../types/diferensa';

interface SimulasiKelasPageProps {
  completedSimulations: Record<string, string>;
  onSelectSimulationDecision: (scenarioId: string, optionId: string) => void;
  onNavigate: (route: NavRoute) => void;
}

export function SimulasiKelasPage({
  completedSimulations,
  onSelectSimulationDecision,
  onNavigate,
}: SimulasiKelasPageProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(CLASSROOM_SCENARIOS[0].id);
  const [pendingOptionId, setPendingOptionId] = useState<string | null>(
    completedSimulations[CLASSROOM_SCENARIOS[0].id] ?? null
  );

  const scenario =
    CLASSROOM_SCENARIOS.find((s) => s.id === activeScenarioId) ?? CLASSROOM_SCENARIOS[0];

  const appliedOptionId = completedSimulations[scenario.id];
  const appliedOption = scenario.options.find((o) => o.id === appliedOptionId);

  const handleSwitchScenario = (id: string) => {
    setActiveScenarioId(id);
    setPendingOptionId(completedSimulations[id] ?? null);
  };

  const handleApplyStrategy = () => {
    if (!pendingOptionId) return;
    onSelectSimulationDecision(scenario.id, pendingOptionId);
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              Tahap 03 · Studi Kasus Interaktif Kelas SD
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Simulasi Pengambilan Keputusan Kelas
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              Analisis kondisi beragam kelompok siswa pada kasus nyata SD, lalu pilih pendekatan
              pembelajaran paling efektif untuk melihat dampaknya di kelas.
            </p>
          </div>
          <div className="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 shrink-0 tabular-nums">
            {Object.keys(completedSimulations).length} / {CLASSROOM_SCENARIOS.length} skenario selesai
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {CLASSROOM_SCENARIOS.map((item) => {
            const active = item.id === scenario.id;
            const done = Boolean(completedSimulations[item.id]);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSwitchScenario(item.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {done && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${active ? 'text-teal-300' : 'text-teal-600'}`}
                    aria-hidden="true"
                  />
                )}
                <span>
                  {item.kelas} · {item.mataPelajaran}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Top Stage: Context & Student Readiness Groups */}
        <section className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <MonitorPlay className="w-4 h-4 text-teal-700" aria-hidden="true" />
              <span>{scenario.kelas}</span>
              <span aria-hidden="true">·</span>
              <span>{scenario.mataPelajaran}</span>
            </div>

            <h2 className="font-display text-xl font-bold text-slate-900">{scenario.topik}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{scenario.classroomContext}</p>

            <div className="rounded-xl bg-sky-50 border border-sky-100 p-4">
              <h3 className="text-xs font-bold text-blue-900 mb-1">Tantangan Guru</h3>
              <p className="text-sm text-slate-800 leading-relaxed">{scenario.challenge}</p>
            </div>

            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-700" aria-hidden="true" />
                <span>Pemetaan Kondisi Murid di Kelas</span>
              </h3>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <span className="text-xs font-bold text-amber-800 block">
                  Kelompok Perlu Bimbingan
                </span>
                <p className="text-xs text-slate-600 mt-1">{scenario.studentGroups.perluBimbingan}</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <span className="text-xs font-bold text-sky-800 block">Kelompok Cakap</span>
                <p className="text-xs text-slate-600 mt-1">{scenario.studentGroups.cakap}</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <span className="text-xs font-bold text-teal-800 block">Kelompok Mahir</span>
                <p className="text-xs text-slate-600 mt-1">{scenario.studentGroups.mahir}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Stage: Decision Selection & Impact Analysis */}
        <section className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Pilih Pendekatan Pembelajaran Anda
            </h2>

            <div className="space-y-3">
              {scenario.options.map((opt) => {
                const isSelected = pendingOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPendingOptionId(opt.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-blue-900 ring-1 ring-blue-900'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{opt.title}</span>
                      <span className="text-xs font-semibold text-violet-700 shrink-0">
                        Fokus {opt.approachType}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {opt.actionSummary}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={!pendingOptionId}
                onClick={handleApplyStrategy}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Terapkan Strategi</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {appliedOption && (
            <div
              aria-live="polite"
              className={`rounded-2xl border p-6 space-y-4 ${
                appliedOption.isOptimal
                  ? 'bg-teal-50/60 border-teal-200'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {appliedOption.isOptimal ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
                  )}
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {appliedOption.isOptimal
                      ? 'Dampak Pembelajaran Sangat Efektif'
                      : 'Perlu Penyesuaian Strategi Diferensiasi'}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-lg tabular-nums">
                  Efektivitas: {appliedOption.effectivenessScore}/100
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {appliedOption.pedagogicalFeedback}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Respon Perlu Bimbingan
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {appliedOption.studentImpact.perluBimbingan}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Respon Kelompok Cakap
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {appliedOption.studentImpact.cakap}
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Respon Kelompok Mahir
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {appliedOption.studentImpact.mahir}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate('rencana-ajar')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-blue-900 cursor-pointer"
                >
                  <span>Susun Rencana Ajar Digital</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
