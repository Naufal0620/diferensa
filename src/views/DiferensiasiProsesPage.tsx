import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Gamepad2,
  Laptop,
  MessageCircle,
  PlusCircle,
  Route,
  Trash2,
  User,
  Users,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { PROSES_ACTIVITY_OPTIONS } from '../data/extendedContent';
import type { NavRoute, ProsesPlanInput, SavedProsesPlan } from '../types/diferensa';
import { generateProsesPlan } from '../utils/diferensaEngine';

interface DiferensiasiProsesPageProps {
  savedPlans: SavedProsesPlan[];
  onSavePlan: (plan: SavedProsesPlan) => void;
  onDeletePlan: (planId: string) => void;
  onNavigate: (route: NavRoute) => void;
}

const ACTIVITY_ICONS = [User, Users, MessageCircle, FlaskConical, Gamepad2, Laptop];

const INITIAL_INPUT: ProsesPlanInput = {
  materi: '',
  tujuanKegiatan: '',
  bentukAktivitas: ['Belajar secara berkelompok', 'Praktik atau eksperimen sederhana'],
  pengelompokanSiswa: '',
  mediaDigunakan: '',
  pendampinganSiswa: '',
};

export function DiferensiasiProsesPage({
  savedPlans,
  onSavePlan,
  onDeletePlan,
  onNavigate,
}: DiferensiasiProsesPageProps) {
  const [selectedActivityIdx, setSelectedActivityIdx] = useState(0);
  const [form, setForm] = useState<ProsesPlanInput>(INITIAL_INPUT);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const activeActivity = PROSES_ACTIVITY_OPTIONS[selectedActivityIdx];

  const handleToggleActivity = (label: string) => {
    setForm((prev) => {
      const exists = prev.bentukAktivitas.includes(label);
      return {
        ...prev,
        bentukAktivitas: exists
          ? prev.bentukAktivitas.filter((a) => a !== label)
          : [...prev.bentukAktivitas, label],
      };
    });
  };

  const handleFillSample = () => {
    setForm({
      materi: 'Perubahan Wujud Benda (Kelas 4 SD IPAS)',
      tujuanKegiatan:
        'Siswa mampu mengamati dan menjelaskan proses mencair serta membeku melalui pengalaman langsung.',
      bentukAktivitas: [
        'Praktik atau eksperimen sederhana',
        'Diskusi dan tanya jawab',
        'Permainan edukatif',
      ],
      pengelompokanSiswa:
        'Kelompok kecil campuran 4 siswa per meja dengan pembagian peran pengamat, pencatat, dan penyaji.',
      mediaDigunakan: 'Gelas plastik bening, es batu, kartu alur gambar, dan papan tempel.',
      pendampinganSiswa:
        'Guru mendampingi meja kelompok yang butuh penguatan kosakata selama 10 menit pertama.',
    });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.materi.trim() ||
      !form.tujuanKegiatan.trim() ||
      !form.pengelompokanSiswa.trim() ||
      !form.mediaDigunakan.trim() ||
      !form.pendampinganSiswa.trim() ||
      form.bentukAktivitas.length === 0
    ) {
      setErrorMsg(
        'Mohon lengkapi seluruh kolom formulir dan pilih minimal satu bentuk aktivitas pembelajaran.'
      );
      return;
    }
    setErrorMsg('');
    const plan = generateProsesPlan(form);
    onSavePlan(plan);
    setSuccessMsg('Rancangan Diferensiasi Proses berhasil disimpan.');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('materi-pembelajaran')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Materi Pembelajaran</span>
        </button>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate('diferensiasi-konten')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Diferensiasi Konten
          </button>
          <button
            type="button"
            onClick={() => onNavigate('diferensiasi-proses')}
            className="px-3.5 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold cursor-pointer"
          >
            Diferensiasi Proses
          </button>
          <button
            type="button"
            onClick={() => onNavigate('diferensiasi-produk')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Diferensiasi Produk
          </button>
        </div>
      </div>

      {/* Hero Explanation */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-700">
              <Route className="w-4 h-4" aria-hidden="true" />
              <span>Kategori B · Materi Pembelajaran Berdiferensiasi</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Diferensiasi Proses
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong>Diferensiasi proses</strong> merupakan penyesuaian cara atau aktivitas peserta
              didik dalam memahami materi pembelajaran. Siswa SD memaknai konsep secara lebih dalam
              ketika diberi beragam jalur berlatih—baik secara mandiri, berdiskusi, bermain kartu
              edukatif, maupun bereksperimen dengan bimbingan terukur.
            </p>
            <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
              <h2 className="text-xs font-bold text-violet-900 mb-1">
                Contoh Penerapan di Sekolah Dasar
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pada pelajaran Matematika Kelas 3 tentang <em>Keliling Bangun Datar</em>, siswa yang
                masih ragu mengukur keliling buku memakai benang dan penggaris bersama guru,
                sementara kelompok siap memainkan kartu tantangan keliling meja kelompok.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-violet-100 bg-violet-50/40">
              <SafeImage
                src="/src/assets/images/proses_differentiation_1795505156957.jpg"
                alt="Ilustrasi siswa SD melakukan beragam aktivitas proses belajar: diskusi meja bundar, percobaan kaca pembesar, dan permainan kartu bersama guru"
                className="w-full h-full min-h-[220px] object-cover"
                fallbackTitle="Ilustrasi Diferensiasi Proses SD"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Activity Selector */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Pilihan Aktivitas Pembelajaran Berdiferensiasi
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pilih bentuk aktivitas di bawah untuk meninjau strategi penerapan dan contoh nyatanya di SD.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROSES_ACTIVITY_OPTIONS.map((item, idx) => {
            const Icon = ACTIVITY_ICONS[idx] ?? Users;
            const isSelected = idx === selectedActivityIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedActivityIdx(idx)}
                aria-pressed={isSelected}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-violet-50 border-violet-700 ring-1 ring-violet-700'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-violet-700 text-white'
                      : 'bg-white text-violet-700 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-violet-900">{activeActivity.label}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{activeActivity.summary}</p>
            <p className="text-xs font-semibold text-teal-800 pt-1">
              Praktik SD: {activeActivity.sdExample}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!form.bentukAktivitas.includes(activeActivity.label)) {
                handleToggleActivity(activeActivity.label);
              }
            }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-violet-50 text-xs font-semibold text-violet-900 whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
          >
            Pilih untuk Rancangan
          </button>
        </div>
      </section>

      {/* Teacher Form & Saved Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4"
            noValidate
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Formulir Perancangan Diferensiasi Proses
              </h2>
              <button
                type="button"
                onClick={handleFillSample}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-900 hover:bg-violet-100 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Isi Contoh SD</span>
              </button>
            </div>

            <div>
              <label
                htmlFor="proses-materi"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Materi yang Diajarkan
              </label>
              <input
                id="proses-materi"
                type="text"
                placeholder="Contoh: Perubahan Wujud Benda"
                value={form.materi}
                onChange={(e) => setForm({ ...form, materi: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="proses-tujuan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Tujuan Kegiatan
              </label>
              <textarea
                id="proses-tujuan"
                rows={2}
                placeholder="Tuliskan tujuan aktivitas belajar siswa..."
                value={form.tujuanKegiatan}
                onChange={(e) => setForm({ ...form, tujuanKegiatan: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Bentuk Aktivitas Pembelajaran
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROSES_ACTIVITY_OPTIONS.map((opt) => {
                  const checked = form.bentukAktivitas.includes(opt.label);
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer ${
                        checked
                          ? 'bg-violet-50 border-violet-700 text-slate-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleActivity(opt.label)}
                        className="mt-0.5 accent-violet-700"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="proses-kelompok"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Pengelompokan Siswa
              </label>
              <input
                id="proses-kelompok"
                type="text"
                placeholder="Contoh: Kelompok kecil 4 siswa berdasarkan kesiapan awal"
                value={form.pengelompokanSiswa}
                onChange={(e) => setForm({ ...form, pengelompokanSiswa: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="proses-media"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Media yang Digunakan
              </label>
              <input
                id="proses-media"
                type="text"
                placeholder="Contoh: Kartu konsep, alat peraga gelas ukur, papan tulis mini"
                value={form.mediaDigunakan}
                onChange={(e) => setForm({ ...form, mediaDigunakan: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="proses-pendampingan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Pendampingan atau Bantuan yang Diperlukan Siswa
              </label>
              <textarea
                id="proses-pendampingan"
                rows={2}
                placeholder="Contoh: Bimbingan langkah demi langkah untuk kelompok yang masih bingung..."
                value={form.pendampinganSiswa}
                onChange={(e) => setForm({ ...form, pendampinganSiswa: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs font-medium text-amber-900"
              >
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="rounded-xl bg-teal-50 border border-teal-200 px-3.5 py-2.5 text-xs font-semibold text-teal-900 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Simpan Rancangan Proses
            </button>
          </form>
        </section>

        <section className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Rancangan Proses Tersimpan ({savedPlans.length})
            </h2>

            {savedPlans.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Belum ada rancangan aktivitas tersimpan. Gunakan formulir di samping untuk menyusun
                rencana aktivitas kelas Anda.
              </p>
            ) : (
              <div className="space-y-3">
                {savedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{plan.materi}</h3>
                      <button
                        type="button"
                        onClick={() => onDeletePlan(plan.id)}
                        aria-label={`Hapus rancangan proses ${plan.materi}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                      {plan.ringkasanAktivitas}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('diferensiasi-produk')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              >
                <span>Lanjut ke Diferensiasi Produk</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
