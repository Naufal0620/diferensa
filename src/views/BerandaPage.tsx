import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileSpreadsheet,
  HeartHandshake,
  Layers,
  MessageSquareText,
  MonitorPlay,
  Palette,
  Route,
  UserCircle2,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import type { LearningProgress, NavRoute } from '../types/diferensa';

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
    id: NavRoute;
    step: string;
    englishTitle: string;
    indonesianSub: string;
    icon: typeof ClipboardList;
    isDone: boolean;
    accentBg: string;
    accentText: string;
  }[] = [
    {
      id: 'tes-diagnostik',
      step: '01',
      englishTitle: 'Diagnostic Test',
      indonesianSub: 'Kenali profil belajar siswa',
      icon: ClipboardList,
      isDone: progress.diagnosticResult !== null,
      accentBg: 'bg-sky-50',
      accentText: 'text-sky-700',
    },
    {
      id: 'materi-pembelajaran',
      step: '02',
      englishTitle: 'Learning Materials',
      indonesianSub: 'Konsep & prinsip diferensiasi',
      icon: BookOpen,
      isDone: progress.completedModules.length >= totalModules,
      accentBg: 'bg-violet-50',
      accentText: 'text-violet-700',
    },
    {
      id: 'simulasi-kelas',
      step: '03',
      englishTitle: 'Classroom Simulation',
      indonesianSub: 'Latihan studi kasus SD',
      icon: MonitorPlay,
      isDone: Object.keys(progress.completedSimulations).length >= totalSimulations,
      accentBg: 'bg-teal-50',
      accentText: 'text-teal-700',
    },
    {
      id: 'rencana-ajar',
      step: '04',
      englishTitle: 'Digital Lesson Planner',
      indonesianSub: 'Susun modul ajar fleksibel',
      icon: FileSpreadsheet,
      isDone: progress.savedLessonPlans.length > 0,
      accentBg: 'bg-blue-50',
      accentText: 'text-blue-900',
    },
    {
      id: 'evaluasi-akhir',
      step: '05',
      englishTitle: 'Final Evaluation',
      indonesianSub: 'Uji pemahaman & skor akhir',
      icon: Award,
      isDone: progress.evaluationResult !== null,
      accentBg: 'bg-sky-50',
      accentText: 'text-sky-800',
    },
  ];

  const corePillars: {
    id: string;
    route: NavRoute;
    title: string;
    subtitle: string;
    description: string;
    example: string;
    icon: typeof Layers;
    iconBg: string;
  }[] = [
    {
      id: 'konten',
      route: 'diferensiasi-konten',
      title: 'Diferensiasi Konten',
      subtitle: 'Apa yang dipelajari siswa',
      description:
        'Menyajikan materi inti melalui ragam media—kartu gambar, bacaan bertingkat, audio cerita, hingga benda konkret—sesuai kesiapan dan gaya belajar anak SD.',
      example: 'Contoh SD: Bacaan fabel 3 level panjang teks di kelas 2.',
      icon: Layers,
      iconBg: 'bg-sky-100 text-sky-800',
    },
    {
      id: 'proses',
      route: 'diferensiasi-proses',
      title: 'Diferensiasi Proses',
      subtitle: 'Bagaimana siswa memaknai',
      description:
        'Merancang variasi aktivitas pendampingan di kelas seperti stasiun belajar keliling, kelompok kecil terpandu (scaffolding), dan diskusi berpasangan.',
      example: 'Contoh SD: Meja kertas lipat pecahan vs tantangan soal cerita.',
      icon: Route,
      iconBg: 'bg-violet-100 text-violet-800',
    },
    {
      id: 'produk',
      route: 'diferensiasi-produk',
      title: 'Diferensiasi Produk',
      subtitle: 'Bagaimana bukti belajar ditunjukkan',
      description:
        'Memberi pilihan bentuk karya akhir sesuai minat siswa seperti poster mini, presentasi lisan, atau diorama sederhana dengan satu rubrik konsep inti.',
      example: 'Contoh SD: Pilihan poster siklus air, drama mini, atau maket.',
      icon: Palette,
      iconBg: 'bg-teal-100 text-teal-800',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Landing Page Top Navigation Bar (Clean & Independent) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-violet-700 to-teal-500 flex items-center justify-center shadow-xs">
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

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenGuide}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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

      {/* Main Landing Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-5">
                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  Kurikulum Merdeka SD
                </span>
                <span className="hidden sm:inline text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span className="text-xs font-medium text-slate-600">
                  Media Praktis Guru Sekolah Dasar
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight text-balance max-w-2xl">
                Pahami Diferensiasi, Rancang Pembelajaran yang Bermakna
              </h1>

              <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
                Platform belajar interaktif khusus guru Sekolah Dasar untuk mengenali keragaman
                kebutuhan murid, berlatih simulasi kasus kelas nyata, dan menyusun rencana ajar
                berdiferensiasi yang ramah anak.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('tes-diagnostik')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-blue-900 border border-sky-200 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Lihat Panduan</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl overflow-hidden border border-sky-100 bg-sky-50/50">
                <SafeImage
                  src="/images/hero_teacher_students_1795500961365.jpg"
                  alt="Guru SD mendampingi siswa belajar dengan buku bergambar, balok bangun ruang, dan tablet di kelas yang ramah anak"
                  className="w-full h-full min-h-[240px] max-h-[340px] lg:max-h-none object-cover"
                  fallbackTitle="Ilustrasi Guru & Siswa SD DIFERENSA"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lima Tahapan Pembelajaran */}
        <section aria-labelledby="tahapan-heading" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 id="tahapan-heading" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Lima Tahapan Pembelajaran
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Ikuti alur terstruktur dari pemetaan kelas hingga evaluasi pemahaman Anda.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {learningStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onNavigate(stage.id)}
                  className="group text-left rounded-2xl bg-white border border-slate-200 hover:border-sky-300 p-5 transition-all hover:shadow-xs flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${stage.accentBg} ${stage.accentText}`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                        {stage.step}
                      </span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {stage.englishTitle}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {stage.indonesianSub}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    {stage.isDone ? (
                      <span className="inline-flex items-center gap-1.5 text-teal-700">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Selesai</span>
                      </span>
                    ) : (
                      <span className="text-blue-900 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        <span>Buka Tahap</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Tiga Pilar Utama */}
        <section aria-labelledby="tiga-pilar-heading" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 id="tiga-pilar-heading" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Tiga Pilar Utama Diferensiasi
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Eksplorasi strategi mendalam per pilar dilengkapi contoh kasus nyata SD dan lembar kerja.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('pembelajaran-inklusif')}
              className="text-sm font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap cursor-pointer"
            >
              <span>Eksplorasi Pembelajaran Inklusif</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => onNavigate(pillar.route)}
                  className="group text-left rounded-2xl bg-white border border-slate-200 hover:border-blue-900 hover:shadow-xs p-6 flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${pillar.iconBg}`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-900">
                          {pillar.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 w-full">
                    <p className="text-xs font-medium text-slate-700">{pillar.example}</p>
                    <ArrowRight className="w-4 h-4 text-blue-900 shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Banner Ajakan Masuk Lab */}
        <section aria-label="Ajakan Tes Diagnostik">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-violet-800 to-teal-700 text-white p-6 sm:p-8 overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-sky-200 mb-2">
                  Langkah Awal yang Disarankan
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-snug text-balance">
                  Sudah Siap Mengenali Profil Belajar Siswa di Kelas Anda?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-sky-100 leading-relaxed max-w-xl">
                  Kerjakan Tes Diagnostik interaktif berdurasi 3 menit untuk mendapatkan rekomendasi
                  strategi Konten, Proses, dan Produk yang paling cocok bagi murid SD Anda.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('tes-diagnostik')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-sky-50 text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                  >
                    <span>
                      {progress.diagnosticResult
                        ? 'Lihat atau Ulangi Tes Diagnostik'
                        : 'Kerjakan Tes Diagnostik Sekarang'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-white/20 bg-white/10">
                  <SafeImage
                    src="/images/banner_diagnostic_lab_1795500960016.jpg"
                    alt="Ilustrasi tiga stasiun belajar SD: kartu visual, audio headphone, dan balok eksperimen"
                    className="w-full h-44 sm:h-52 object-cover"
                    fallbackTitle="Stasiun Belajar Visual, Auditori, & Kinestetik"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Landing Page Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
