'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Compass,
  FileSpreadsheet,
  Layers,
  Palette,
  Route,
  Sparkles,
  BookOpen,
  MonitorPlay,
  Award,
  CheckCircle2,
  Users2,
  Lightbulb,
} from 'lucide-react';
import { SafeImage } from '@/components/SafeImage';
import type { LearningProgress, NavRoute } from '@/types/diferensa';

interface BerandaPageProps {
  progress: LearningProgress;
  totalModules: number;
  totalSimulations: number;
  onNavigate: (route: NavRoute) => void;
  onOpenGuide: () => void;
}

export function BerandaPage({
  progress,
  totalModules,
  totalSimulations,
  onNavigate,
  onOpenGuide,
}: BerandaPageProps) {
  const learningStages: {
    step: string;
    route: NavRoute;
    title: string;
    desc: string;
    icon: typeof Compass;
    isDone: boolean;
  }[] = [
    {
      step: '01',
      route: 'tes-diagnostik',
      title: 'Uji Refleksi & Tes Diagnostik',
      desc: 'Tes 6 skenario kelas SD untuk memetakan profil belajar serta titik salah kaprah pada Konten, Proses, dan Produk.',
      icon: Compass,
      isDone: progress.diagnosticResult !== null,
    },
    {
      step: '02',
      route: 'materi-pembelajaran',
      title: 'Materi Pembelajaran & Kasus Riil',
      desc: 'Konsep dasar, karakteristik, serta komparasi sisi-ke-sisi antara miskonsepsi umum vs solusi diferensiasi Kurikulum Merdeka.',
      icon: BookOpen,
      isDone: progress.completedModules.length >= totalModules,
    },
    {
      step: '03',
      route: 'simulasi-kelas',
      title: 'Simulasi Keputusan Kelas SD',
      desc: 'Latihan mengambil keputusan instruksional langsung pada studi kasus kelas dengan beragam tingkat kesiapan murid.',
      icon: MonitorPlay,
      isDone: Object.keys(progress.completedSimulations).length >= totalSimulations,
    },
    {
      step: '04',
      route: 'rencana-ajar',
      title: 'Rencana Ajar Digital (Modul Ajar)',
      desc: 'Lembar kerja terstruktur merumuskan modul berdiferensiasi yang praktis, fleksibel, dan siap cetak untuk administrasi guru.',
      icon: FileSpreadsheet,
      isDone: progress.savedLessonPlans.length > 0,
    },
    {
      step: '05',
      route: 'evaluasi-akhir',
      title: 'Evaluasi & Refleksi Akhir',
      desc: 'Uji pemahaman akhir berjenjang (tiered evaluation) untuk mengukur kemajuan pemahaman pedagogis Anda.',
      icon: Award,
      isDone: progress.evaluationResult !== null,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Landing Page Header (Clean, Standalone, No Dashboard Shell) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-slate-900 block leading-tight">
                DIFERENSA
              </span>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Laboratorium Belajar Berdiferensiasi Guru SD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate('konsultasi-ai')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#1e3a8a] hover:bg-[#f0f4f8] transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#1e3a8a]" />
              <span className="hidden sm:inline">Tanya AI</span>
            </button>
            <button
              type="button"
              onClick={onOpenGuide}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Petunjuk Alur
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tes-diagnostik')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
        {/* Section 1: Hero & Real Classroom Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.18] tracking-tight text-balance">
              Penerapan Pembelajaran Berdiferensiasi yang Realistis di Kelas SD.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Diferensiasi bukan berarti menyiapkan 30 rencana modul ajar berbeda untuk 30 murid, dan bukan pula menghadiahi murid yang cepat selesai dengan tumpukan soal tambahan. DIFERENSA membantu guru membedakan strategi pada <strong>Konten</strong>, <strong>Proses</strong>, dan <strong>Produk</strong> secara proporsional dan ramah anak.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('tes-diagnostik')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
              >
                <span>Mulai Uji Refleksi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('materi-pembelajaran')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Lihat Contoh Kasus</span>
              </button>
            </div>
          </div>

          {/* Hero Classroom Photo from Reference */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-2">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <SafeImage
                  src="/images/hero_teacher_students_1795500961365.jpg"
                  alt="Guru SD mendampingi siswa belajar dengan ragam media di ruang kelas ramah anak"
                  className="w-full h-full object-cover"
                  fallbackTitle="Kelas Berdiferensiasi SD"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-white/95 backdrop-blur-xs border border-white/40 shadow-xs flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">Praktik Kelas Nyata: Pendampingan Sesuai Kesiapan</span>
                  </div>
                  <span className="text-[11px] text-slate-500 shrink-0 hidden sm:inline">Kurikulum Merdeka</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 3 Pillars Overview Matrix */}
        <section className="space-y-6 border-t border-slate-200 pt-12 sm:pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Pilar Utama Diferensiasi
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tiga Sudut Pandang Fleksibilitas Kelas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Guru tidak wajib mendiferensiasikan ketiga pilar ini sekaligus dalam setiap pertemuan. Pilih pilar yang paling relevan dengan karakteristik materi dan kondisi kelas Anda.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('pembelajaran-inklusif')}
              className="text-xs font-bold text-blue-900 hover:text-blue-700 inline-flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Eksplorasi Kelas Inklusif</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Pilar Konten */}
            <div
              onClick={() => onNavigate('diferensiasi-konten')}
              className="border border-slate-200 bg-white p-5 sm:p-6 rounded-2xl space-y-3.5 shadow-xs hover:border-blue-900/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                      Pilar 01
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      Diferensiasi Konten
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100">
                <SafeImage
                  src="/images/konten_differentiation_1795505156521.jpg"
                  alt="Ragam media pembelajaran diferensiasi konten di kelas SD"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  fallbackTitle="Diferensiasi Konten"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Penyesuaian terhadap <strong>input materi pembelajaran</strong>. Murid yang membutuhkan bantuan konkret menggunakan alat manipulatif atau media bergambar, sedangkan murid mandiri dapat menelaah bacaan tingkat lanjut.
              </p>
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                <strong>Contoh SD:</strong> Lembar cerita bergambar vs teks deskripsi bertingkat pada mata pelajaran IPAS.
              </div>
            </div>

            {/* Pilar Proses */}
            <div
              onClick={() => onNavigate('diferensiasi-proses')}
              className="border border-slate-200 bg-white p-5 sm:p-6 rounded-2xl space-y-3.5 shadow-xs hover:border-amber-700/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    <Route className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                      Pilar 02
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      Diferensiasi Proses
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100">
                <SafeImage
                  src="/images/proses_differentiation_1795505156957.jpg"
                  alt="Aktivitas diferensiasi proses kelompok terbimbing di kelas"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  fallbackTitle="Diferensiasi Proses"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Penyesuaian terhadap <strong>aktivitas belajar murid</strong>. Mencakup variasi bimbingan berjenjang (scaffolding), stasiun belajar keliling, hingga tutor sebaya terencana di ruang kelas.
              </p>
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                <strong>Contoh SD:</strong> Guru duduk bersama kelompok terbimbing saat menghitung perkalian bertingkat.
              </div>
            </div>

            {/* Pilar Produk */}
            <div
              onClick={() => onNavigate('diferensiasi-produk')}
              className="border border-slate-200 bg-white p-5 sm:p-6 rounded-2xl space-y-3.5 shadow-xs hover:border-teal-700/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                      Pilar 03
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                      Diferensiasi Produk
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100">
                <SafeImage
                  src="/images/produk_differentiation_1795505159871.jpg"
                  alt="Ragam unjuk kerja produk siswa SD"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  fallbackTitle="Diferensiasi Produk"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Penyesuaian terhadap <strong>cara murid menunjukkan bukti pemahaman</strong>. Bentuk karya akhir dapat beragam (lisan, gambar, catatan), asalkan dinilai dengan kriteria rubrik esensial yang sama.
              </p>
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                <strong>Contoh SD:</strong> Pilihan menyajikan siklus air lewat poster, drama mini, atau rekaman suara.
              </div>
            </div>
          </div>
        </section>

        {/* Section: Diagnostic Lab Banner with Reference Imagery */}
        <section aria-label="Ajakan Uji Refleksi Awal">
          <div className="rounded-2xl bg-blue-900 text-white p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold border border-white/15">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Langkah Awal yang Disarankan</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  Kenali Profil &amp; Kebutuhan Belajar Murid SD Anda
                </h2>
                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-xl">
                  Ambil tes diagnostik interaktif singkat untuk memetakan kecenderungan gaya belajar (Visual, Auditori, Kinestetik) serta tingkat kesiapan murid di kelas Anda.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('tes-diagnostik')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-sky-50 text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Kerjakan Tes Diagnostik Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-white/20 shadow-md">
                  <SafeImage
                    src="/images/banner_diagnostic_lab_1795500960016.jpg"
                    alt="Stasiun belajar interaktif murid SD"
                    className="w-full h-48 sm:h-56 object-cover"
                    fallbackTitle="Stasiun Belajar Diagnostik"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 5-Step Learning Roadmap */}
        <section className="space-y-6 border-t border-slate-200 pt-12 sm:pt-16">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Alur Perjalanan Guru
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tahapan Pembelajaran di Laboratorium DIFERENSA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Alur terstruktur dari tes diagnostik awal, pembedahan konsep &amp; miskonsepsi, latihan simulasi kelas, hingga perancangan modul ajar yang aplikatif.
            </p>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs">
            {learningStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  onClick={() => onNavigate(stage.route)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-mono font-extrabold text-slate-400 group-hover:text-blue-900 mt-0.5 transition-colors">
                      {stage.step}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {stage.title}
                        </h3>
                        {stage.isDone && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Selesai</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {stage.desc}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 sm:self-center shrink-0 group-hover:translate-x-1 transition-transform">
                    <span>Buka Tahap</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Landing Page Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-900 text-sm">DIFERENSA</span>
            <span>&bull;</span>
            <span>Laboratorium Belajar Berdiferensiasi Guru SD</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('materi-pembelajaran')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Materi
            </button>
            <button
              onClick={() => onNavigate('simulasi-kelas')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Simulasi
            </button>
            <button
              onClick={() => onNavigate('rencana-ajar')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Rencana Ajar
            </button>
            <button
              onClick={() => onNavigate('komunitas-guru')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Komunitas
            </button>
            <button
              onClick={() => onNavigate('konsultasi-ai')}
              className="hover:text-blue-900 font-semibold cursor-pointer text-[#1e3a8a]"
            >
              Tanya AI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
