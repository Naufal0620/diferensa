'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CONCEPT_CARDS } from '@/data/differentiationData';
import { useProgress } from '@/hooks/useProgress';

export default function LearnPage() {
  const { markStepComplete } = useProgress();

  useEffect(() => {
    markStepComplete(2);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header - Editorial & Distinctive */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06525c]/10 text-[#06525c] border border-[#06525c]/20 text-xs font-semibold">
          <span>Tahap 02 / Telaah Kasus</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#06525c] tracking-tight">
          Komparasi Kasus: Miskonsepsi vs Praktik Diferensiasi Riil
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
          Pelajari perbandingan sisi-ke-sisi antara kebiasaan yang kerap keliru diterapkan di kelas SD dengan solusi pedagogis yang tepat sesuai panduan Kurikulum Merdeka.
        </p>
      </div>

      {/* Case Comparison Cards */}
      <div className="space-y-6">
        {CONCEPT_CARDS.map((card, idx) => (
          <div
            key={card.id}
            className="border border-slate-200/90 bg-white rounded-xl p-5 sm:p-7 space-y-5 shadow-xs hover:border-[#06525c]/40 transition-colors"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#06525c] bg-[#ebf0ee] px-2.5 py-0.5 rounded">
                  0{idx + 1} &bull; Pilar {card.pillar}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">
                  {card.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{card.tagline}</p>
              </div>
            </div>

            {/* Side-by-side comparison ledger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Misconception side */}
              <div className="p-4 rounded-lg border border-rose-200 bg-rose-50/50 space-y-2">
                <span className="font-extrabold text-rose-900 uppercase tracking-wide text-[10px] block">
                  Pola Miskonsepsi yang Sering Terjadi
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {card.misconception.description}
                </p>
                <div className="text-slate-700 text-xs border-t border-rose-200/60 pt-2 leading-relaxed space-y-1">
                  <div><strong>Contoh Kasus Keliru:</strong> {card.misconception.example}</div>
                  <div className="text-rose-800"><strong>Mengapa Keliru:</strong> {card.misconception.whyWrong}</div>
                </div>
              </div>

              {/* True Differentiation side */}
              <div className="p-4 rounded-lg border border-emerald-300 bg-emerald-50/50 space-y-2">
                <span className="font-extrabold text-emerald-900 uppercase tracking-wide text-[10px] block">
                  Praktik Diferensiasi yang Benar
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {card.trueDifferentiation.description}
                </p>
                <div className="text-slate-700 text-xs border-t border-emerald-300/60 pt-2 leading-relaxed space-y-1">
                  <div><strong>Contoh Solusi Kelas:</strong> {card.trueDifferentiation.example}</div>
                  <div className="text-emerald-800"><strong>Manfaat Pedagogis:</strong> {card.trueDifferentiation.pedagogicalBenefit}</div>
                </div>
              </div>
            </div>

            {/* Pedagogical Takeaway */}
            <div className="text-xs text-[#06525c] bg-[#ebf0ee] p-3.5 rounded-lg leading-relaxed border border-[#06525c]/10">
              <strong>Prinsip Utama:</strong> {card.keyTakeaway}
            </div>
          </div>
        ))}
      </div>

      {/* Next Step Nav */}
      <div className="flex items-center justify-between border-t border-slate-200/80 pt-6">
        <Link
          href="/diagnostic"
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#06525c] transition-colors"
        >
          &larr; Sebelumnya
        </Link>
        <Link
          href="/simulation"
          className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-md bg-[#06525c] text-white hover:bg-[#086572] transition-colors shadow-xs"
        >
          Lanjut ke Simulasi &rarr;
        </Link>
      </div>
    </div>
  );
}
