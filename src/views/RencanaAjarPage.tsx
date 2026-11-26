import { useState } from 'react';
import {
  Check,
  Copy,
  FileSpreadsheet,
  PlusCircle,
  Save,
  Trash2,
} from 'lucide-react';
import type { GeneratedLessonPlan, LearningDimension, LessonPlanInput } from '../types/diferensa';
import { generateLessonPlan } from '../utils/diferensaEngine';

interface RencanaAjarPageProps {
  savedPlans: GeneratedLessonPlan[];
  onSavePlan: (plan: GeneratedLessonPlan) => void;
  onDeletePlan: (planId: string) => void;
}

const KELAS_OPTIONS = [
  'Kelas 1 SD',
  'Kelas 2 SD',
  'Kelas 3 SD',
  'Kelas 4 SD',
  'Kelas 5 SD',
  'Kelas 6 SD',
];

const MAPEL_OPTIONS = [
  'Matematika',
  'Bahasa Indonesia',
  'IPAS',
  'Pendidikan Pancasila',
  'Seni Budaya',
  'PJOK',
];

const INITIAL_FORM: LessonPlanInput = {
  kelas: 'Kelas 4 SD',
  mataPelajaran: 'Matematika',
  materi: '',
  tujuanPembelajaran: '',
  kebutuhanBelajar: '',
  fokusDimensi: 'kesiapan',
};

export function RencanaAjarPage({
  savedPlans,
  onSavePlan,
  onDeletePlan,
}: RencanaAjarPageProps) {
  const [form, setForm] = useState<LessonPlanInput>(INITIAL_FORM);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activePlan, setActivePlan] = useState<GeneratedLessonPlan | null>(
    savedPlans[0] ?? null
  );
  const [saveToast, setSaveToast] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.materi.trim() ||
      !form.tujuanPembelajaran.trim() ||
      !form.kebutuhanBelajar.trim()
    ) {
      setErrorMsg(
        'Mohon lengkapi Materi Pokok, Tujuan Pembelajaran, dan Kebutuhan Belajar Siswa sebelum menyusun rencana ajar.'
      );
      return;
    }
    setErrorMsg('');
    const plan = generateLessonPlan(form);
    setActivePlan(plan);
    onSavePlan(plan);
    setSaveToast('Rencana ajar berhasil dibuat dan disimpan. Anda dapat mengedit setiap bagiannya.');
    setTimeout(() => setSaveToast(''), 4000);
  };

  const handleFillSample = () => {
    setForm({
      kelas: 'Kelas 4 SD',
      mataPelajaran: 'Matematika',
      materi: 'Pecahan Senilai dan Perbandingan Pecahan',
      tujuanPembelajaran:
        'Siswa mampu membandingkan dan menentukan pecahan senilai menggunakan benda konkret maupun gambar.',
      kebutuhanBelajar:
        '8 siswa membutuhkan alat peraga kertas lipat, 14 siswa siap menggunakan kartu batang pecahan, dan 6 siswa siap mengerjakan soal cerita kontekstual.',
      fokusDimensi: 'kesiapan',
    });
    setErrorMsg('');
  };

  const handleFieldEdit = (
    field: keyof Pick<
      GeneratedLessonPlan,
      | 'diferensiasiKonten'
      | 'diferensiasiProses'
      | 'diferensiasiProduk'
      | 'langkahPembelajaran'
      | 'asesmenFormatif'
    >,
    value: string
  ) => {
    if (!activePlan) return;
    setActivePlan({
      ...activePlan,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSaveEdits = () => {
    if (!activePlan) return;
    onSavePlan({ ...activePlan, updatedAt: new Date().toISOString() });
    setSaveToast('Perubahan rencana ajar berhasil disimpan.');
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleCopyText = async () => {
    if (!activePlan) return;
    const text = [
      `RENCANA AJAR BERDIFERENSIASI (${activePlan.kelas} - ${activePlan.mataPelajaran})`,
      `Materi: ${activePlan.materi}`,
      `Tujuan Pembelajaran: ${activePlan.tujuanPembelajaran}`,
      `Kebutuhan Belajar Siswa: ${activePlan.kebutuhanBelajar}`,
      `\n--- Diferensiasi Konten ---\n${activePlan.diferensiasiKonten}`,
      `\n--- Diferensiasi Proses ---\n${activePlan.diferensiasiProses}`,
      `\n--- Diferensiasi Produk ---\n${activePlan.diferensiasiProduk}`,
      `\n--- Langkah Pembelajaran ---\n${activePlan.langkahPembelajaran}`,
      `\n--- Asesmen Formatif ---\n${activePlan.asesmenFormatif}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setSaveToast('Salin teks gagal pada browser ini. Anda tetap dapat menyimpan rencana ajar.');
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-blue-900 mb-1">
              Tahap 04 · Penyusun Modul Ajar Otomatis
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Rencana Ajar Digital Berdiferensiasi
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              Masukkan data kelas, materi, tujuan pembelajaran, dan profil kebutuhan murid Anda
              untuk menghasilkan rancangan ajar yang dapat disunting langsung.
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-semibold text-blue-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Isi Contoh Cepat SD</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-5 space-y-5">
          <form
            onSubmit={handleGenerate}
            className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
            noValidate
          >
            <h2 className="font-display text-lg font-bold text-slate-900">
              Formulir Rancangan Kelas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rpp-kelas"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Kelas
                </label>
                <select
                  id="rpp-kelas"
                  value={form.kelas}
                  onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-2 focus:outline-blue-900"
                >
                  {KELAS_OPTIONS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="rpp-mapel"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Mata Pelajaran
                </label>
                <select
                  id="rpp-mapel"
                  value={form.mataPelajaran}
                  onChange={(e) => setForm({ ...form, mataPelajaran: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-2 focus:outline-blue-900"
                >
                  {MAPEL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="rpp-materi"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Materi Pokok
              </label>
              <input
                id="rpp-materi"
                type="text"
                placeholder="Contoh: Siklus Air dan Pelestariannya"
                value={form.materi}
                onChange={(e) => setForm({ ...form, materi: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="rpp-tujuan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Tujuan Pembelajaran
              </label>
              <textarea
                id="rpp-tujuan"
                rows={3}
                placeholder="Contoh: Siswa dapat menjelaskan proses penguapan dan pengembunan melalui contoh nyata."
                value={form.tujuanPembelajaran}
                onChange={(e) => setForm({ ...form, tujuanPembelajaran: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="rpp-kebutuhan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Kebutuhan Belajar Siswa
              </label>
              <textarea
                id="rpp-kebutuhan"
                rows={3}
                placeholder="Contoh: Sebagian siswa menyukai gambar visual, sebagian perlu bimbingan membaca instruksi."
                value={form.kebutuhanBelajar}
                onChange={(e) => setForm({ ...form, kebutuhanBelajar: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Fokus Pemetaan Utama
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'kesiapan', label: 'Kesiapan' },
                    { id: 'minat', label: 'Minat' },
                    { id: 'profil', label: 'Profil Belajar' },
                  ] as { id: LearningDimension; label: string }[]
                ).map((dim) => (
                  <button
                    key={dim.id}
                    type="button"
                    onClick={() => setForm({ ...form, fokusDimensi: dim.id })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      form.fokusDimensi === dim.id
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {dim.label}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs font-medium text-amber-900"
              >
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Buat Rencana Ajar
            </button>
          </form>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
            <h3 className="font-display text-sm font-bold text-slate-900">
              Daftar Rancangan Tersimpan ({savedPlans.length})
            </h3>
            {savedPlans.length === 0 ? (
              <p className="text-xs text-slate-500">
                Belum ada rancangan tersimpan. Isi formulir di atas untuk membuat rancangan pertama
                Anda.
              </p>
            ) : (
              <div className="space-y-2">
                {savedPlans.map((plan) => {
                  const isCurrent = activePlan?.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`flex items-center justify-between gap-2 p-3 rounded-xl border ${
                        isCurrent
                          ? 'bg-sky-50 border-sky-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActivePlan(plan)}
                        className="text-left min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {plan.materi}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {plan.kelas} · {plan.mataPelajaran}
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onDeletePlan(plan.id);
                          if (activePlan?.id === plan.id) {
                            setActivePlan(
                              savedPlans.find((p) => p.id !== plan.id) ?? null
                            );
                          }
                        }}
                        aria-label={`Hapus rancangan ${plan.materi}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="lg:col-span-7">
          {activePlan ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {activePlan.kelas} · {activePlan.mataPelajaran} · Fokus {activePlan.fokusDimensi}
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 mt-1">
                    {activePlan.materi}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">{activePlan.tujuanPembelajaran}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdits}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>

              {saveToast && (
                <div
                  role="status"
                  className="rounded-xl bg-teal-50 border border-teal-200 px-4 py-2.5 text-xs font-semibold text-teal-900"
                >
                  {saveToast}
                </div>
              )}

              <p className="text-xs text-slate-500">
                Seluruh bagian rancangan di bawah ini dapat disunting langsung sesuai kondisi murid
                di sekolah Anda.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="edit-konten"
                    className="block text-xs font-bold text-sky-900 mb-1.5"
                  >
                    1. Diferensiasi Konten
                  </label>
                  <textarea
                    id="edit-konten"
                    rows={6}
                    value={activePlan.diferensiasiKonten}
                    onChange={(e) => handleFieldEdit('diferensiasiKonten', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-2 focus:outline-blue-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-proses"
                    className="block text-xs font-bold text-violet-900 mb-1.5"
                  >
                    2. Diferensiasi Proses
                  </label>
                  <textarea
                    id="edit-proses"
                    rows={6}
                    value={activePlan.diferensiasiProses}
                    onChange={(e) => handleFieldEdit('diferensiasiProses', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-2 focus:outline-blue-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-produk"
                    className="block text-xs font-bold text-teal-900 mb-1.5"
                  >
                    3. Diferensiasi Produk
                  </label>
                  <textarea
                    id="edit-produk"
                    rows={6}
                    value={activePlan.diferensiasiProduk}
                    onChange={(e) => handleFieldEdit('diferensiasiProduk', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-2 focus:outline-blue-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-langkah"
                    className="block text-xs font-bold text-slate-800 mb-1.5"
                  >
                    4. Alur Langkah Pembelajaran
                  </label>
                  <textarea
                    id="edit-langkah"
                    rows={5}
                    value={activePlan.langkahPembelajaran}
                    onChange={(e) => handleFieldEdit('langkahPembelajaran', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-2 focus:outline-blue-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-asesmen"
                    className="block text-xs font-bold text-slate-800 mb-1.5"
                  >
                    5. Asesmen Formatif
                  </label>
                  <textarea
                    id="edit-asesmen"
                    rows={3}
                    value={activePlan.asesmenFormatif}
                    onChange={(e) => handleFieldEdit('asesmenFormatif', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-2 focus:outline-blue-900"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-blue-900 flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Siap Menyusun Rencana Ajar Berdiferensiasi
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Lengkapi formulir di sebelah kiri atau klik <strong>Isi Contoh Cepat SD</strong>{' '}
                untuk langsung melihat dan menyunting hasil rancangan modul ajar Anda.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
