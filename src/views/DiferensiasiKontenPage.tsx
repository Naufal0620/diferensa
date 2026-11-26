import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Headphones,
  Image as ImageIcon,
  Layers,
  PlusCircle,
  SlidersHorizontal,
  Trash2,
  Video,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { KONTEN_FORMAT_OPTIONS } from '../data/extendedContent';
import type { KontenPlanInput, NavRoute, SavedKontenPlan } from '../types/diferensa';
import { generateKontenPlan } from '../utils/diferensaEngine';

interface DiferensiasiKontenPageProps {
  savedPlans: SavedKontenPlan[];
  onSavePlan: (plan: SavedKontenPlan) => void;
  onDeletePlan: (planId: string) => void;
  onNavigate: (route: NavRoute) => void;
}

const OPTION_ICONS = [FileText, ImageIcon, Video, Headphones, SlidersHorizontal];

const INITIAL_INPUT: KontenPlanInput = {
  mataPelajaran: 'IPAS',
  kelas: 'Kelas 4 SD',
  topik: '',
  tujuanPembelajaran: '',
  karakteristikSiswa: '',
  jenisMateri: ['Materi berupa teks atau bacaan', 'Materi berupa gambar dan infografis'],
  tingkatKesulitan: 'Bertingkat (Dasar - Mahir)',
};

export function DiferensiasiKontenPage({
  savedPlans,
  onSavePlan,
  onDeletePlan,
  onNavigate,
}: DiferensiasiKontenPageProps) {
  const [selectedFormatIndex, setSelectedFormatIndex] = useState(0);
  const [form, setForm] = useState<KontenPlanInput>(INITIAL_INPUT);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const activeFormat = KONTEN_FORMAT_OPTIONS[selectedFormatIndex];

  const handleToggleMedia = (label: string) => {
    setForm((prev) => {
      const exists = prev.jenisMateri.includes(label);
      return {
        ...prev,
        jenisMateri: exists
          ? prev.jenisMateri.filter((m) => m !== label)
          : [...prev.jenisMateri, label],
      };
    });
  };

  const handleFillSample = () => {
    setForm({
      mataPelajaran: 'IPAS',
      kelas: 'Kelas 4 SD',
      topik: 'Metamorfosis Sempurna dan Tidak Sempurna',
      tujuanPembelajaran:
        'Siswa mampu membedakan tahapan metamorfosis kupu-kupu dan belalang secara runtut.',
      karakteristikSiswa:
        '6 siswa terbantu dengan kartu gambar berlabel & rekaman suara, 15 siswa menyukai infografis alur, 7 siswa siap membaca artikel pengayaan.',
      jenisMateri: [
        'Materi berupa teks atau bacaan',
        'Materi berupa gambar dan infografis',
        'Materi berupa audio atau penjelasan suara',
      ],
      tingkatKesulitan: 'Bertingkat (Dasar - Mahir)',
    });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.topik.trim() ||
      !form.tujuanPembelajaran.trim() ||
      !form.karakteristikSiswa.trim() ||
      form.jenisMateri.length === 0
    ) {
      setErrorMsg(
        'Mohon lengkapi topik, tujuan pembelajaran, karakteristik siswa, dan pilih minimal satu jenis materi.'
      );
      return;
    }
    setErrorMsg('');
    const plan = generateKontenPlan(form);
    onSavePlan(plan);
    setSuccessMsg('Rancangan Diferensiasi Konten berhasil disimpan.');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Category Switcher & Back Navigation */}
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
            className="px-3.5 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold cursor-pointer"
          >
            Diferensiasi Konten
          </button>
          <button
            type="button"
            onClick={() => onNavigate('diferensiasi-proses')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
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

      {/* Hero Explanation Card */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Kategori A · Materi Pembelajaran Berdiferensiasi</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Diferensiasi Konten
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong>Diferensiasi konten</strong> merupakan penyesuaian materi atau sumber belajar
              berdasarkan kebutuhan, kesiapan, dan karakteristik peserta didik. Guru tetap menjaga
              tujuan kompetensi inti yang sama, namun membuka pintu akses materi melalui ragam
              media dan tingkat kompleksitas yang ramah bagi siswa SD.
            </p>
            <div className="rounded-xl bg-sky-50 border border-sky-100 p-4">
              <h2 className="text-xs font-bold text-blue-900 mb-1">
                Contoh Penerapan di Sekolah Dasar
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pada materi <em>Siklus Hidup Hewan</em> Kelas 4 SD, guru menyediakan kartu gambar
                berseri bagi pembaca pemula, infografis alur berwarna bagi kelompok cakap, dan artikel
                ringkas pengayaan bagi kelompok mahir.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-sky-100 bg-sky-50/40">
              <SafeImage
                src="/src/assets/images/konten_differentiation_1795505156521.jpg"
                alt="Ilustrasi variasi sumber belajar SD: buku cerita bergambar, infografis, video pembelajaran tablet, headphone audio, dan kartu baca bertingkat"
                className="w-full h-full min-h-[220px] object-cover"
                fallbackTitle="Ilustrasi Diferensiasi Konten SD"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Presentation Formats */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Pilihan Penyajian Materi Pembelajaran
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Klik setiap pilihan penyajian di bawah untuk melihat cara kerja dan contohnya di kelas SD.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {KONTEN_FORMAT_OPTIONS.map((item, idx) => {
            const Icon = OPTION_ICONS[idx] ?? BookOpen;
            const isSelected = idx === selectedFormatIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedFormatIndex(idx)}
                aria-pressed={isSelected}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-sky-50 border-blue-900 ring-1 ring-blue-900'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-900 text-white' : 'bg-white text-sky-700 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-slate-900 leading-snug">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-blue-900">{activeFormat.label}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{activeFormat.summary}</p>
            <p className="text-xs font-semibold text-teal-800 pt-1">
              Praktik SD: {activeFormat.sdExample}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!form.jenisMateri.includes(activeFormat.label)) {
                handleToggleMedia(activeFormat.label);
              }
            }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-sky-50 text-xs font-semibold text-blue-900 whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
          >
            Masukkan ke Formulir
          </button>
        </div>
      </section>

      {/* Teacher Form & Saved Content Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4"
            noValidate
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Formulir Perancangan Diferensiasi Konten
              </h2>
              <button
                type="button"
                onClick={handleFillSample}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold text-blue-900 hover:bg-sky-100 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Isi Contoh SD</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="konten-mapel"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Mata Pelajaran
                </label>
                <select
                  id="konten-mapel"
                  value={form.mataPelajaran}
                  onChange={(e) => setForm({ ...form, mataPelajaran: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
                >
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="IPAS">IPAS</option>
                  <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                  <option value="Seni Budaya">Seni Budaya</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="konten-kelas"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Kelas
                </label>
                <select
                  id="konten-kelas"
                  value={form.kelas}
                  onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
                >
                  {['Kelas 1 SD', 'Kelas 2 SD', 'Kelas 3 SD', 'Kelas 4 SD', 'Kelas 5 SD', 'Kelas 6 SD'].map(
                    (k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="konten-topik"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Topik atau Materi Pembelajaran
              </label>
              <input
                id="konten-topik"
                type="text"
                placeholder="Contoh: Metamorfosis Hewan"
                value={form.topik}
                onChange={(e) => setForm({ ...form, topik: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="konten-tujuan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Tujuan Pembelajaran
              </label>
              <textarea
                id="konten-tujuan"
                rows={2}
                placeholder="Tuliskan kompetensi yang ingin dicapai murid..."
                value={form.tujuanPembelajaran}
                onChange={(e) => setForm({ ...form, tujuanPembelajaran: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="konten-karakteristik"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Karakteristik dan Kebutuhan Belajar Siswa
              </label>
              <textarea
                id="konten-karakteristik"
                rows={2}
                placeholder="Contoh: Ada siswa yang lebih cepat menangkap lewat gambar dan audio, ada yang siap teks lanjutan..."
                value={form.karakteristikSiswa}
                onChange={(e) => setForm({ ...form, karakteristikSiswa: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Jenis Materi yang Ingin Disediakan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {KONTEN_FORMAT_OPTIONS.map((opt) => {
                  const checked = form.jenisMateri.includes(opt.label);
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer ${
                        checked
                          ? 'bg-sky-50 border-blue-900 text-slate-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleMedia(opt.label)}
                        className="mt-0.5 accent-blue-900"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="konten-kesulitan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Tingkat Kesulitan Materi
              </label>
              <select
                id="konten-kesulitan"
                value={form.tingkatKesulitan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tingkatKesulitan: e.target.value as KontenPlanInput['tingkatKesulitan'],
                  })
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              >
                <option value="Dasar (Perlu Bimbingan)">Dasar (Perlu Bimbingan)</option>
                <option value="Bertingkat (Dasar - Mahir)">Bertingkat (Dasar - Mahir)</option>
                <option value="Pengayaan Lanjutan">Pengayaan Lanjutan</option>
              </select>
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
              Simpan Rancangan Konten
            </button>
          </form>
        </section>

        {/* Saved Content Plans */}
        <section className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Rancangan Konten Tersimpan ({savedPlans.length})
            </h2>

            {savedPlans.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Belum ada rancangan konten tersimpan. Lengkapi formulir atau klik{' '}
                <strong>Isi Contoh SD</strong> untuk menyusun rancangan pertama Anda.
              </p>
            ) : (
              <div className="space-y-3">
                {savedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{plan.topik}</h3>
                        <p className="text-xs text-slate-500">
                          {plan.kelas} · {plan.mataPelajaran} · {plan.tingkatKesulitan}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeletePlan(plan.id)}
                        aria-label={`Hapus rancangan konten ${plan.topik}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                      {plan.ringkasanRancangan}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('diferensiasi-proses')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              >
                <span>Lanjut ke Diferensiasi Proses</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
