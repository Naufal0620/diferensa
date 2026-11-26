import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Mic,
  Network,
  Palette,
  PlusCircle,
  Presentation,
  Trash2,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { PRODUK_OUTPUT_OPTIONS } from '../data/extendedContent';
import type { NavRoute, ProdukPlanInput, SavedProdukPlan } from '../types/diferensa';
import { generateProdukPlan } from '../utils/diferensaEngine';

interface DiferensiasiProdukPageProps {
  savedPlans: SavedProdukPlan[];
  onSavePlan: (plan: SavedProdukPlan) => void;
  onDeletePlan: (planId: string) => void;
  onNavigate: (route: NavRoute) => void;
}

const PRODUK_ICONS = [ImageIcon, Presentation, Network, Box, FileText, Mic];

const INITIAL_INPUT: ProdukPlanInput = {
  materi: '',
  tujuanKompetensi: '',
  jenisProduk: ['Poster atau gambar', 'Presentasi sederhana', 'Maket atau model sederhana'],
  kriteriaPenilaian: '',
  indikatorKeberhasilan: '',
};

export function DiferensiasiProdukPage({
  savedPlans,
  onSavePlan,
  onDeletePlan,
  onNavigate,
}: DiferensiasiProdukPageProps) {
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [form, setForm] = useState<ProdukPlanInput>(INITIAL_INPUT);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const activeProduct = PRODUK_OUTPUT_OPTIONS[selectedProductIdx];

  const handleToggleProduct = (label: string) => {
    setForm((prev) => {
      const exists = prev.jenisProduk.includes(label);
      return {
        ...prev,
        jenisProduk: exists
          ? prev.jenisProduk.filter((p) => p !== label)
          : [...prev.jenisProduk, label],
      };
    });
  };

  const handleFillSample = () => {
    setForm({
      materi: 'Menjaga Kelestarian Ekosistem Sungai dan Hutan (Kelas 5 SD)',
      tujuanKompetensi:
        'Siswa mampu menjelaskan hubungan manusia dengan alam serta mengusulkan cara pelestarian lingkungan sekolah.',
      jenisProduk: [
        'Poster atau gambar',
        'Peta konsep',
        'Maket atau model sederhana',
        'Video atau rekaman penjelasan',
      ],
      kriteriaPenilaian:
        'Ketepatan konsep ekosistem, kejelasan pesan pelestarian, dan kebermaknaan contoh tindakan nyata.',
      indikatorKeberhasilan:
        'Karya memuat minimal 2 komponen ekosistem dan 2 langkah menjaga kebersihan lingkungan sekitar.',
    });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.materi.trim() ||
      !form.tujuanKompetensi.trim() ||
      !form.kriteriaPenilaian.trim() ||
      !form.indikatorKeberhasilan.trim() ||
      form.jenisProduk.length === 0
    ) {
      setErrorMsg(
        'Mohon lengkapi materi, tujuan kompetensi, kriteria penilaian, indikator keberhasilan, serta pilih minimal satu jenis produk.'
      );
      return;
    }
    setErrorMsg('');
    const plan = generateProdukPlan(form);
    onSavePlan(plan);
    setSuccessMsg('Rancangan Diferensiasi Produk & Rubrik berhasil disimpan.');
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
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Diferensiasi Proses
          </button>
          <button
            type="button"
            onClick={() => onNavigate('diferensiasi-produk')}
            className="px-3.5 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold cursor-pointer"
          >
            Diferensiasi Produk
          </button>
        </div>
      </div>

      {/* Hero Explanation */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700">
              <Palette className="w-4 h-4" aria-hidden="true" />
              <span>Kategori C · Materi Pembelajaran Berdiferensiasi</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Diferensiasi Produk
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong>Diferensiasi produk</strong> merupakan pemberian pilihan kepada peserta didik
              untuk menunjukkan pemahaman mereka melalui berbagai bentuk hasil karya. Meski wujud
              tugasnya beragam, guru tetap menilai ketuntasan kompetensi menggunakan satu rubrik
              kriteria inti yang adil dan jelas.
            </p>
            <div className="rounded-xl bg-teal-50 border border-teal-100 p-4">
              <h2 className="text-xs font-bold text-teal-900 mb-1">
                Contoh Penerapan di Sekolah Dasar
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pada akhir bab <em>Lingkungan Bersih</em> di Kelas 4 SD, siswa dapat memilih membuat
                poster kampanye, peta konsep, maket rumah hijau dari kardus, atau rekaman suara
                penjelasan berdurasi 2 menit.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-teal-100 bg-teal-50/40">
              <SafeImage
                src="/src/assets/images/produk_differentiation_1795505159871.jpg"
                alt="Ilustrasi siswa SD memamerkan beragam karya akhir: poster lingkungan, peta konsep, maket rumah hijau, buku cerita tertulis, dan papan presentasi"
                className="w-full h-full min-h-[220px] object-cover"
                fallbackTitle="Ilustrasi Diferensiasi Produk SD"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Options */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Pilihan Bentuk Produk Hasil Karya Siswa
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Klik setiap jenis produk di bawah untuk melihat kesesuaian gaya belajar dan contoh SD-nya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRODUK_OUTPUT_OPTIONS.map((item, idx) => {
            const Icon = PRODUK_ICONS[idx] ?? Palette;
            const isSelected = idx === selectedProductIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedProductIdx(idx)}
                aria-pressed={isSelected}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-teal-700 text-white'
                      : 'bg-white text-teal-700 border border-slate-200'
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
            <h3 className="text-sm font-bold text-teal-900">{activeProduct.label}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{activeProduct.summary}</p>
            <p className="text-xs font-semibold text-blue-900 pt-1">
              Praktik SD: {activeProduct.sdExample}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!form.jenisProduk.includes(activeProduct.label)) {
                handleToggleProduct(activeProduct.label);
              }
            }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-teal-50 text-xs font-semibold text-teal-900 whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
          >
            Tambahkan ke Pilihan Karya
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
                Formulir Perancangan Diferensiasi Produk
              </h2>
              <button
                type="button"
                onClick={handleFillSample}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-900 hover:bg-teal-100 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Isi Contoh SD</span>
              </button>
            </div>

            <div>
              <label
                htmlFor="produk-materi"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Materi Pembelajaran
              </label>
              <input
                id="produk-materi"
                type="text"
                placeholder="Contoh: Menjaga Kelestarian Lingkungan"
                value={form.materi}
                onChange={(e) => setForm({ ...form, materi: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="produk-tujuan"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Tujuan atau Kompetensi yang Ingin Dicapai
              </label>
              <textarea
                id="produk-tujuan"
                rows={2}
                placeholder="Tuliskan kompetensi yang harus terbukti dalam karya siswa..."
                value={form.tujuanKompetensi}
                onChange={(e) => setForm({ ...form, tujuanKompetensi: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Jenis Produk yang Dapat Dipilih Siswa
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRODUK_OUTPUT_OPTIONS.map((opt) => {
                  const checked = form.jenisProduk.includes(opt.label);
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer ${
                        checked
                          ? 'bg-teal-50 border-teal-700 text-slate-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleProduct(opt.label)}
                        className="mt-0.5 accent-teal-700"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="produk-kriteria"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Kriteria Penilaian
              </label>
              <textarea
                id="produk-kriteria"
                rows={2}
                placeholder="Contoh: Ketepatan konsep utama, kejelasan penyampaian, dan kreativitas..."
                value={form.kriteriaPenilaian}
                onChange={(e) => setForm({ ...form, kriteriaPenilaian: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="produk-indikator"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Indikator Keberhasilan
              </label>
              <textarea
                id="produk-indikator"
                rows={2}
                placeholder="Contoh: Karya memuat minimal 2 contoh nyata dan kesimpulan sederhana..."
                value={form.indikatorKeberhasilan}
                onChange={(e) => setForm({ ...form, indikatorKeberhasilan: e.target.value })}
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
              Simpan Rancangan Produk
            </button>
          </form>
        </section>

        <section className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Rancangan Produk Tersimpan ({savedPlans.length})
            </h2>

            {savedPlans.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Belum ada rancangan produk tersimpan. Lengkapi formulir di samping untuk menyusun
                pilihan produk dan indikator penilaiannya.
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
                        aria-label={`Hapus rancangan produk ${plan.materi}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                      {plan.ringkasanRubrik}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('pembelajaran-inklusif')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              >
                <span>Lanjut ke Pembelajaran Inklusif</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
