'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  HelpCircle, 
  BookOpen, 
  Gamepad2, 
  FileText, 
  CheckCircle, 
  Bot 
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

const NAV_ITEMS = [
  { id: 0, name: 'Beranda', path: '/', icon: Home, shortName: 'Beranda' },
  { id: 1, name: 'Diagnostik', path: '/diagnostic', icon: HelpCircle, shortName: 'Diagnostik' },
  { id: 2, name: 'Telaah Kasus', path: '/learn', icon: BookOpen, shortName: 'Telaah' },
  { id: 3, name: 'Simulasi Kelas', path: '/simulation', icon: Gamepad2, shortName: 'Simulasi' },
  { id: 4, name: 'Rancang Modul', path: '/planner', icon: FileText, shortName: 'Rancang' },
  { id: 5, name: 'Evaluasi', path: '/evaluation', icon: CheckCircle, shortName: 'Evaluasi' },
];

export function SidebarNavigation() {
  const pathname = usePathname();
  const { progress } = useProgress();

  return (
    <>
      {/* Desktop & Tablet Sidebar (Hidden on mobile < md) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-[#06525c]/10 bg-white sticky top-0 h-screen select-none no-print">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100/90 flex flex-col gap-1.5 bg-[#f7f9f8]/60">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-black text-xl tracking-tight text-[#06525c] group-hover:text-[#086572] transition-colors">
              DIFERENSA
            </span>
          </Link>
          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
            Panduan Pembelajaran Berdiferensiasi Guru SD
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#06525c]/80 px-3 py-2">
            Alur Pembelajaran
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            const isCompleted = item.id > 0 && progress.completedSteps.includes(item.id);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#06525c] text-white shadow-xs'
                    : isCompleted
                    ? 'text-emerald-800 hover:bg-emerald-50/70'
                    : 'text-slate-700 hover:text-[#06525c] hover:bg-[#ebf0ee]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isCompleted ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.id > 0 && isCompleted && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#06525c]/80 px-3 py-2">
              Bantuan Guru
            </div>
            <Link
              href="/assistant"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                pathname === '/assistant'
                  ? 'bg-[#06525c] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#06525c] hover:bg-[#ebf0ee]/60'
              }`}
            >
              <Bot className={`w-4 h-4 ${pathname === '/assistant' ? 'text-white' : 'text-[#06525c]'}`} />
              <span>Tanya Pendamping AI</span>
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-100 text-[11px] text-slate-500 bg-[#f7f9f8]/40">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-600">Kurikulum Merdeka</span>
            <span className="font-bold text-[#06525c] px-2 py-0.5 rounded bg-[#ebf0ee]">SD</span>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 flex items-center justify-between no-print shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-extrabold text-base tracking-tight text-[#06525c]">
            DIFERENSA
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-[11px] text-slate-600 font-semibold truncate max-w-[150px]">
            Guru SD
          </span>
        </Link>
        <Link
          href="/assistant"
          aria-label="Konsultasi Pendamping AI"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border min-h-[38px] touch-manipulation transition-all ${
            pathname === '/assistant'
              ? 'bg-[#06525c] text-white border-[#06525c] shadow-xs'
              : 'bg-[#ebf0ee] text-[#06525c] border-[#06525c]/20 hover:bg-[#ebf0ee]/80'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Tanya AI</span>
        </Link>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed at bottom for easy thumb access on mobile) */}
      <nav aria-label="Navigasi Utama Mobile" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-1 flex items-center justify-around no-print shadow-lg shadow-slate-900/10">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          const isCompleted = item.id > 0 && progress.completedSteps.includes(item.id);

          return (
            <Link
              key={item.id}
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md min-h-[44px] min-w-[44px] flex-1 text-[10px] font-bold transition-all relative touch-manipulation ${
                isActive
                  ? 'text-[#06525c] bg-[#ebf0ee]/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#06525c] stroke-[2.4]' : 'text-slate-500'}`} />
                {isCompleted && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                )}
              </div>
              <span className={`mt-1 leading-none text-[9.5px] ${isActive ? 'font-black text-[#06525c]' : 'font-medium'}`}>{item.shortName}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
