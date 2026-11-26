import { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Edit3,
  FileSpreadsheet,
  HeartHandshake,
  MonitorPlay,
  RotateCcw,
  Save,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { CLASSROOM_SCENARIOS, LEARNING_MODULES } from '../data/educationalContent';
import { EVALUATION_TOPICS } from '../data/extendedContent';
import type { LearningProgress, NavRoute, TeacherProfile } from '../types/diferensa';
import {
  calculateOverallProgress,
  computeTieredMasterySummary,
} from '../utils/diferensaEngine';

interface ProfilSayaPageProps {
  profile: TeacherProfile;
  progress: LearningProgress;
  onUpdateProfile: (profile: TeacherProfile) => void;
  onResetProgress: () => void;
  onNavigate: (route: NavRoute) => void;
}

export function ProfilSayaPage({
  profile,
  progress,
  onUpdateProfile,
  onResetProgress,
  onNavigate,
}: ProfilSayaPageProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<TeacherProfile>(profile);
  const [confirmReset, setConfirmReset] = useState(false);

  const summary = calculateOverallProgress(
    progress,
    LEARNING_MODULES.length,
    CLASSROOM_SCENARIOS.length
  );

  const tieredSummary = computeTieredMasterySummary(progress.tieredEvaluations ?? {});

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.school.trim()) return;
    onUpdateProfile({
      ...draft,
      name: draft.name.trim(),
      school: draft.school.trim(),
    });
    setEditing(false);
  };

  const totalMateriPlans =
    progress.kontenPlans.length + progress.prosesPlans.length + progress.produkPlans.length;

  const activityItems: {
    label: string;
    detail: string;
    done: boolean;
    route: NavRoute;
    icon: typeof ClipboardList;
  }[] = [
    {
      label: 'Tes Diagnostik Kelas',
      detail: progress.diagnosticResult
        ? `Selesai · Dominan ${progress.diagnosticResult.dominantStyle} (${progress.diagnosticResult.readinessCategory})`
        : 'Belum dikerjakan',
      done: progress.diagnosticResult !== null,
      route: 'tes-diagnostik',
      icon: ClipboardList,
    },
    {
      label: 'Materi Pembelajaran (Konten, Proses, Produk)',
      detail: `${progress.completedModules.length}/${LEARNING_MODULES.length} modul konsep · ${totalMateriPlans} rancangan kategori`,
      done: progress.completedModules.length >= LEARNING_MODULES.length || totalMateriPlans >= 3,
      route: 'materi-pembelajaran',
      icon: BookOpen,
    },
    {
      label: 'Pembelajaran Inklusif',
      detail: progress.inclusivePlan
        ? `${progress.inclusivePlan.enabledAccommodations.length} akomodasi inklusif diaktifkan`
        : 'Belum menyusun pengaturan kelas inklusif',
      done: progress.inclusivePlan !== null,
      route: 'pembelajaran-inklusif',
      icon: HeartHandshake,
    },
    {
      label: 'Simulasi Kelas SD',
      detail: `${Object.keys(progress.completedSimulations).length} dari ${CLASSROOM_SCENARIOS.length} kasus diselesaikan`,
      done: Object.keys(progress.completedSimulations).length >= CLASSROOM_SCENARIOS.length,
      route: 'simulasi-kelas',
      icon: MonitorPlay,
    },
    {
      label: 'Rencana Ajar Digital',
      detail: `${progress.savedLessonPlans.length} rancangan pembelajaran tersimpan`,
      done: progress.savedLessonPlans.length > 0,
      route: 'rencana-ajar',
      icon: FileSpreadsheet,
    },
    {
      label: 'Evaluasi Akhir Bertingkat (Level 1–3)',
      detail:
        tieredSummary.completedLevelsCount > 0
          ? `${tieredSummary.completedLevelsCount} dari ${EVALUATION_TOPICS.length * 3} level selesai · Rata-rata ${tieredSummary.averageScore}/100`
          : 'Belum mengerjakan evaluasi bertingkat',
      done: tieredSummary.completedLevelsCount >= 3,
      route: 'evaluasi-akhir',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-sky-200 bg-sky-50 shrink-0">
              <SafeImage
                src="/src/assets/images/avatar_teacher_profile_1795500961340.jpg"
                alt={`Foto profil ${profile.name}`}
                className="w-full h-full object-cover"
                fallbackTitle="Profil Guru"
              />
            </div>

            {editing ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 w-full max-w-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="prof-name"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      id="prof-name"
                      type="text"
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prof-grade"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Peran / Kelas Diampu
                    </label>
                    <input
                      id="prof-grade"
                      type="text"
                      value={draft.gradeTaught}
                      onChange={(e) => setDraft({ ...draft, gradeTaught: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="prof-school"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Nama Sekolah
                    </label>
                    <input
                      id="prof-school"
                      type="text"
                      value={draft.school}
                      onChange={(e) => setDraft({ ...draft, school: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prof-nip"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      NIP / NUPTK
                    </label>
                    <input
                      id="prof-nip"
                      type="text"
                      value={draft.nipOrId}
                      onChange={(e) => setDraft({ ...draft, nipOrId: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="prof-bio"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Catatan Refleksi Pendidik
                  </label>
                  <textarea
                    id="prof-bio"
                    rows={2}
                    value={draft.bio}
                    onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Simpan Profil</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(profile);
                      setEditing(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="text-xs font-medium text-slate-500">
                  {profile.gradeTaught} · {profile.school} · NIP {profile.nipOrId}
                </div>
                <h1 className="font-display text-2xl font-bold text-slate-900 mt-1">
                  {profile.name}
                </h1>
                <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => {
                setDraft(profile);
                setEditing(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 self-start cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Edit Profil</span>
            </button>
          )}
        </div>
      </section>

      {/* Overall Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Ringkasan Capaian">
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-xs font-semibold text-slate-500">Kemajuan Keseluruhan</div>
          <div className="font-display text-3xl font-extrabold text-blue-900 mt-1 tabular-nums">
            {summary.percent}%
          </div>
          <p className="text-xs text-slate-600 mt-1 tabular-nums">
            {summary.completedStages} dari {summary.totalStages} tahap selesai penuh
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-xs font-semibold text-slate-500">Rencana Ajar & Materi Tersimpan</div>
          <div className="font-display text-3xl font-extrabold text-teal-700 mt-1 tabular-nums">
            {progress.savedLessonPlans.length + totalMateriPlans}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {progress.savedLessonPlans.length} modul RPP · {totalMateriPlans} rancangan kategori
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-xs font-semibold text-slate-500">Rata-rata Evaluasi Bertingkat</div>
          <div className="font-display text-3xl font-extrabold text-violet-700 mt-1 tabular-nums">
            {tieredSummary.completedLevelsCount > 0 ? `${tieredSummary.averageScore}` : '—'}
          </div>
          <p className="text-xs text-slate-600 mt-1 tabular-nums">
            {tieredSummary.completedLevelsCount} level selesai dikerjakan
          </p>
        </div>
      </section>

      {/* Level Breakdown */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
        <h2 className="font-display text-base font-bold text-slate-900">
          Indikator Perkembangan Evaluasi Bertingkat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-4">
            <div className="text-xs font-bold text-blue-900">Level 1: Pemahaman Dasar</div>
            <div className="font-mono text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {tieredSummary.levelAverages[1] !== null ? `${tieredSummary.levelAverages[1]}%` : '—'}
            </div>
          </div>
          <div className="rounded-xl bg-violet-50/70 border border-violet-100 p-4">
            <div className="text-xs font-bold text-violet-900">Level 2: Penerapan Konsep</div>
            <div className="font-mono text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {tieredSummary.levelAverages[2] !== null ? `${tieredSummary.levelAverages[2]}%` : '—'}
            </div>
          </div>
          <div className="rounded-xl bg-teal-50/70 border border-teal-100 p-4">
            <div className="text-xs font-bold text-teal-900">
              Level 3: Analisis dan Pemecahan Masalah
            </div>
            <div className="font-mono text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {tieredSummary.levelAverages[3] !== null ? `${tieredSummary.levelAverages[3]}%` : '—'}
            </div>
          </div>
        </div>
      </section>

      {/* Activity Breakdown */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              Perkembangan Aktivitas Pembelajaran
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Klik salah satu aktivitas untuk melanjutkan atau meninjau ulang hasil Anda.
            </p>
          </div>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50 transition-colors self-start cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Progres</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
              >
                Konfirmasi Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
            </div>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {activityItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      item.done
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{item.label}</h3>
                      {item.done && (
                        <CheckCircle2
                          className="w-4 h-4 text-teal-600 shrink-0"
                          aria-label="Selesai"
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{item.detail}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(item.route)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-200 text-xs font-semibold text-blue-900 whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
                >
                  {item.done ? 'Tinjau Kembali' : 'Kerjakan Sekarang'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
