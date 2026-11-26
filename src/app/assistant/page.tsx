'use client';

import { KonsultasiAiPage } from '@/views/KonsultasiAiPage';
import { useRouter } from 'next/navigation';

export default function AssistantRoutePage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <KonsultasiAiPage onNavigate={(route) => router.push(route === 'beranda' ? '/' : `/${route}`)} />
    </div>
  );
}
