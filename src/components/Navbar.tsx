'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';

const STEPS = [
  { id: 1, name: 'Diagnostik', path: '/diagnostic' },
  { id: 2, name: 'Telaah Kasus', path: '/learn' },
  { id: 3, name: 'Simulasi Kelas', path: '/simulation' },
  { id: 4, name: 'Rancang Modul', path: '/planner' },
  { id: 5, name: 'Evaluasi', path: '/evaluation' },
];

export function Navbar() {
  const pathname = usePathname();
  const { progress } = useProgress();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - Clean, authoritative, no quirky pills */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 hover:text-blue-700 transition-colors">
              DIFERENSA
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-600 hidden sm:inline">
              Panduan Pembelajaran Berdiferensiasi SD
            </span>
          </Link>

          {/* Stepper Navigation - Pure typographic clarity */}
          <nav className="hidden md:flex items-center gap-1">
            {STEPS.map((step) => {
              const isActive = pathname === step.path;
              const isCompleted = progress.completedSteps.includes(step.id);

              return (
                <Link
                  key={step.id}
                  href={step.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : isCompleted
                      ? 'text-emerald-700 hover:bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[11px] opacity-75">{step.id}.</span>
                  <span>{step.name}</span>
                  {isCompleted && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 ml-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Assistant Action */}
          <div className="flex items-center gap-2">
            <Link
              href="/assistant"
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                pathname === '/assistant'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Tanya Pendamping AI
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
