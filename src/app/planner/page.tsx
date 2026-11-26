'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SAMPLE_LESSON_PLAN } from '@/data/differentiationData';
import { useProgress } from '@/hooks/useProgress';

export default function PlannerPage() {
  const { progress, saveLessonPlan } = useProgress();

  const [formData, setFormData] = useState({
    subject: progress.customLessonPlan?.subject || '',
    topic: progress.customLessonPlan?.topic || '',
    learningObjective: progress.customLessonPlan?.learningObjective || '',
    targetAudience: progress.customLessonPlan?.targetAudience || '',
    content: progress.customLessonPlan?.content || '',
    process: progress.customLessonPlan?.process || '',
    product: progress.customLessonPlan?.product || '',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleAutoFillSample = () => {
    setFormData({
      subject: SAMPLE_LESSON_PLAN.subject,
      topic: SAMPLE_LESSON_PLAN.topic,
      learningObjective: SAMPLE_LESSON_PLAN.learningObjective,
      targetAudience: SAMPLE_LESSON_PLAN.targetAudience,
      content: SAMPLE_LESSON_PLAN.contentDifferentiation.join('\n\n'),
      process: SAMPLE_LESSON_PLAN.processDifferentiation.join('\n\n'),
      product: SAMPLE_LESSON_PLAN.productDifferentiation.join('\n\n'),
    });
  };

  const handleSave = () => {
    saveLessonPlan(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20 text-xs font-semibold">
            <span>Tahap 04 / Kanvas Administrasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
            Perancang Modul Ajar Berdiferensiasi
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
            Format lembar kerja modul ajar resmi untuk merumuskan diferensiasi Konten, Proses, dan Produk tanpa tumpang tindih. Siap diekspor atau dicetak.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFillSample}
            className="px-3.5 py-2.5 rounded-md text-xs font-bold border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            Muat Contoh Modul SD
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2.5 rounded-md text-xs font-bold border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            Cetak Dokumen
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-md text-xs font-bold bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer shadow-xs"
          >
            {isSaved ? 'Tersimpan!' : 'Simpan Modul'}
          </button>
        </div>
      </div>

      {/* Official Worksheet Document Canvas */}
      <div className="border border-slate-300 bg-white p-6 sm:p-8 rounded-lg shadow-xs space-y-6 print-card">
        {/* Document Header in Print */}
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
            Format Modul Ajar Berdiferensiasi (Kurikulum Merdeka)
          </h2>
          <p className="text-xs text-slate-500">
            Satuan Pendidikan: Sekolah Dasar (SD) &bull; Rencana Pembelajaran Terarah
          </p>
        </div>

        {/* Section 1: Identitas Modul */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">
              Mata Pelajaran:
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Contoh: Matematika"
              className="w-full px-3 py-2 rounded border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">
              Fase / Kelas:
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Contoh: Fase B (Kelas 4 SD)"
              className="w-full px-3 py-2 rounded border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-semibold text-slate-700 block">
              Topik Pembelajaran:
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="Contoh: Konsep Pecahan Senilai Menggunakan Benda Konkret dan Gambar"
              className="w-full px-3 py-2 rounded border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-semibold text-slate-700 block">
              Tujuan Pembelajaran (Capaian Esensial Sama untuk Seluruh Murid):
            </label>
            <textarea
              rows={2}
              value={formData.learningObjective}
              onChange={(e) => setFormData({ ...formData, learningObjective: e.target.value })}
              placeholder="Tuliskan tujuan pembelajaran yang hendak dicapai..."
              className="w-full px-3 py-2 rounded border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900 leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: 3-Pillar Differentiation Matrix */}
        <div className="space-y-4 border-t border-slate-200 pt-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Rancangan Strategi 3 Pilar
            </h3>
            <p className="text-xs text-slate-500">
              Uraikan rencana perlakuan berdasarkan kesiapan atau profil belajar murid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Pilar Konten */}
            <div className="p-4 rounded border border-blue-200 bg-blue-50/20 space-y-2 flex flex-col">
              <div className="border-b border-blue-100 pb-2">
                <span className="font-bold text-blue-900 block">1. Diferensiasi Konten</span>
                <span className="text-[11px] text-slate-500">Variasi akses input materi</span>
              </div>
              <textarea
                rows={9}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Misal: Sediakan balok kayu/kertas lipat untuk murid konkret; infografik untuk visual..."
                className="w-full flex-1 p-2.5 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-900 leading-relaxed text-xs"
              />
            </div>

            {/* Pilar Proses */}
            <div className="p-4 rounded border border-amber-200 bg-amber-50/20 space-y-2 flex flex-col">
              <div className="border-b border-amber-100 pb-2">
                <span className="font-bold text-amber-900 block">2. Diferensiasi Proses</span>
                <span className="text-[11px] text-slate-500">Variasi scaffolding & aktivitas</span>
              </div>
              <textarea
                rows={9}
                value={formData.process}
                onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                placeholder="Misal: Kelompok A didampingi langsung oleh guru langkah demi langkah; Kelompok B bekerja berpasangan..."
                className="w-full flex-1 p-2.5 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-900 leading-relaxed text-xs"
              />
            </div>

            {/* Pilar Produk */}
            <div className="p-4 rounded border border-emerald-200 bg-emerald-50/20 space-y-2 flex flex-col">
              <div className="border-b border-emerald-100 pb-2">
                <span className="font-bold text-emerald-900 block">3. Diferensiasi Produk</span>
                <span className="text-[11px] text-slate-500">Variasi cara unjuk pemahaman</span>
              </div>
              <textarea
                rows={9}
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="Misal: Pilihan demonstrasi alat peraga, poster berarsir pecahan, atau lembar hitung..."
                className="w-full flex-1 p-2.5 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-900 leading-relaxed text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-200/80 pt-6 no-print">
        <Link
          href="/simulation"
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#1e3a8a] transition-colors"
        >
          &larr; Sebelumnya
        </Link>
        <Link
          href="/evaluation"
          className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-md bg-[#1e3a8a] text-white hover:bg-[#1d4ed8] transition-colors shadow-xs"
        >
          Lanjut ke Evaluasi &rarr;
        </Link>
      </div>
    </div>
  );
}
