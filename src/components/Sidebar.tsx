import {
  Award,
  BookOpen,
  ClipboardList,
  Compass,
  FileSpreadsheet,
  HeartHandshake,
  Home,
  Menu,
  MessageSquareText,
  MonitorPlay,
  UserCircle2,
  X,
} from 'lucide-react';
import type { NavRoute } from '../types/diferensa';

interface SidebarProps {
  activeRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  progressPercent: number;
  completedStages: number;
  totalStages: number;
  teacherName: string;
  mobileOpen: boolean;
  onToggleMobile: (open: boolean) => void;
}

export const NAV_ITEMS: {
  id: NavRoute;
  label: string;
  icon: typeof Home;
}[] = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'tes-diagnostik', label: 'Tes Diagnostik', icon: ClipboardList },
  { id: 'materi-pembelajaran', label: 'Materi Pembelajaran', icon: BookOpen },
  { id: 'pembelajaran-inklusif', label: 'Pembelajaran Inklusif', icon: HeartHandshake },
  { id: 'simulasi-kelas', label: 'Simulasi Kelas', icon: MonitorPlay },
  { id: 'rencana-ajar', label: 'Rencana Ajar Digital', icon: FileSpreadsheet },
  { id: 'evaluasi-akhir', label: 'Evaluasi Akhir', icon: Award },
  { id: 'komunitas-guru', label: 'Komunitas Guru', icon: MessageSquareText },
  { id: 'profil-saya', label: 'Profil Saya', icon: UserCircle2 },
];

export function DiferensaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-violet-700 to-teal-500 flex items-center justify-center shadow-sm shrink-0">
        <Compass className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      {!compact && (
        <div className="min-w-0">
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 block leading-none">
            DIFERENSA
          </span>
          <span className="text-[11px] font-medium text-slate-500 block mt-1 truncate">
            Lab Belajar Berdiferensiasi
          </span>
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  activeRoute,
  onNavigate,
  progressPercent,
  completedStages,
  totalStages,
  teacherName,
  mobileOpen,
  onToggleMobile,
}: SidebarProps) {
  const handleNavClick = (route: NavRoute) => {
    onNavigate(route);
    onToggleMobile(false);
  };

  const isMateriGroupActive =
    activeRoute === 'materi-pembelajaran' ||
    activeRoute === 'diferensiasi-konten' ||
    activeRoute === 'diferensiasi-proses' ||
    activeRoute === 'diferensiasi-produk';

  const navContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick('beranda')}
          className="text-left focus-visible:outline-2 focus-visible:outline-blue-900 rounded-lg"
          aria-label="Kembali ke Beranda DIFERENSA"
        >
          <DiferensaLogo />
        </button>
        <button
          type="button"
          onClick={() => onToggleMobile(false)}
          aria-label="Tutup menu navigasi"
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Menu Navigasi Utama" className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.id === 'materi-pembelajaran' ? isMateriGroupActive : activeRoute === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left focus-visible:outline-2 focus-visible:outline-blue-900 cursor-pointer ${
                isActive
                  ? 'bg-sky-50 text-blue-900 font-semibold border border-sky-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Icon
                className={`w-4.5 h-4.5 shrink-0 ${
                  isActive ? 'text-blue-900' : 'text-slate-400'
                }`}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700">Progres Belajar</span>
            <span className="font-mono font-semibold text-teal-700 tabular-nums">
              {progressPercent}%
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full bg-slate-200 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Persentase progres pembelajaran DIFERENSA"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-violet-600 to-teal-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[140px]">{teacherName}</span>
            <span className="tabular-nums shrink-0">
              {completedStages}/{totalStages} tahap
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 h-14 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-blue-900 rounded-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-900 via-violet-700 to-teal-500 flex items-center justify-center">
            <Compass className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-display font-extrabold text-base text-slate-900">DIFERENSA</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleMobile(true)}
          aria-label="Buka menu navigasi"
          aria-expanded={mobileOpen}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Menu className="w-4 h-4" aria-hidden="true" />
          <span>Menu</span>
        </button>
      </header>

      <aside className="hidden lg:block lg:w-68 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen">
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/40"
            onClick={() => onToggleMobile(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 w-72 max-w-[85vw] h-full">{navContent}</div>
        </div>
      )}
    </>
  );
}
